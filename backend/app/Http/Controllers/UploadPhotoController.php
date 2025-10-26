<?php

namespace App\Http\Controllers;

use App\Models\UploadPhoto;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class UploadPhotoController extends Controller
{
    public function index($id)
    {
        $userId = User::find($id)->id;

        try {
            $photos = UploadPhoto::where('user_id', $userId)
                                 ->select('id', 'url', 'name', 'size', 'created_at')
                                 ->get();

            if ($photos->isEmpty()) {
                return response()->json(['data' => []], 200);
            }
            return response()->json(['data' => $photos]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while fetching photos.'], 500);
        }
    }



    public function upload(Request $request)
    {
        if (!$request->hasFile('image')) {
            return response()->json([
                'message' => 'No file provided',
                'data' => null,
                'success' => false,
            ], 400);
        }

        $file = $request->file('image');

        if (!$file->isValid()) {
            return response()->json([
                'message' => 'Invalid file upload',
                'data' => null,
                'success' => false,
            ], 400);
        }

        $user = Auth::user();
        if (!$user) {
            return response()->json([
                'message' => 'User not authenticated',
                'data' => null,
                'success' => false,
            ], 401);
        }

        try {
            $path = $file->store('Image', 'public');

            $url = asset('storage/' . $path);

            $image = UploadPhoto::create([
                'user_id' => $user->id,
                'url' => $url,
                'path' => $path,
                'type' => $file->getMimeType(),
                'name' => $file->getClientOriginalName(),
                'size' => $file->getSize(),
            ]);

            if (!$image) {
                return response()->json([
                    'message' => 'File upload failed',
                    'data' => null,
                    'success' => false,
                ], 400);
            }

            return response()->json([
                'message' => 'File uploaded successfully',
                'data' => $image,
                'success' => true,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error uploading file',
                'error' => $e->getMessage(),
                'success' => false,
            ], 500);
        }
    }


    public function destroy($id)
    {
        try {
            $photo = UploadPhoto::findOrFail($id);
            $user = Auth::user();

            if ($photo->user_id !== $user->id) {
                return response()->json(['error' => 'Unauthorized'], 403);
            }

            $userImageNormalized = str_replace('storage/', '', $user->image);

            if ($userImageNormalized === $photo->path) {
                $defaultImage = $user->gender === 'Man'
                    ? 'Image/Man-Photo.webp'
                    : 'Image/Woman-Photo.png';

                $user->image = $defaultImage;
                $user->save();
            }


            if (Storage::disk('public')->exists($photo->path)) {
                Storage::disk('public')->delete($photo->path);
            }


            $photo->delete();

            return response()->json(['message' => 'Photo deleted successfully'], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error deleting photo',
                'error' => $e->getMessage(),
                'success' => false,
            ], 500);
        }
    }



}
