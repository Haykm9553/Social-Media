<?php

namespace App\Http\Controllers;

use App\Models\UploadPhoto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UploadPhotoController extends Controller
{
    public function index()
    {
        $posts = UploadPhoto::with('user')->latest()->get();
        return response()->json($posts);
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
        // Сохраняем файл и получаем путь
        $path = $file->store('Image', 'public');
        $url = asset('storage/' . $path); // Генерируем URL файла

        // Создаем запись в базе данных с правильным URL
        $image = UploadPhoto::create([
            'user_id' => $user->id,
            'url' => $url, // Передаем готовый URL
            'path' => $path,
            'type' => $file->getMimeType(),
            'size' => $file->getSize(),
            'name' => $file->getClientOriginalName(),
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


}
