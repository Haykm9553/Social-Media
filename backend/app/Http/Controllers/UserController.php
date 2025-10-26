<?php

namespace App\Http\Controllers;

use App\Collections\PeopleKnowCollection;
use App\Http\Resources\PeopleKnowResource;
use App\Models\Chat;
use App\Models\FriendRequest;
use App\Models\UploadPhoto;
use Illuminate\Support\Facades\File;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;


class UserController extends Controller
{
    use HasFactory;
    public function register(Request $request)
    {
        $data = $request->json()->all();

        $validator = Validator::make($data, [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'login' => 'required|string|max:255|unique:users,login',
            'age' => 'required|integer|min:18|max:100',
            'password' => 'required|string',
            'gender' => 'required|string|in:Man,Woman,other',
            'location' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'profession' => 'nullable|string|max:255',
            'hobbies' => 'nullable|string',
            'is_editing' => 'nullable|boolean',
            'image' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $validated = $validator->validated();
        $validated['password'] = Hash::make($validated['password']);

        $user = User::create($validated);
        Auth::login($user);

        return response()->json(['message' => 'User registered']);
    }



    public function login(Request $request)
{
    $data = $request->json()->all();

    $validator = Validator::make($data, [
        'login' => 'required|string|max:255',
        'password' => 'required|string',
        'remember' => 'sometimes|boolean',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'errors' => $validator->errors(),
        ], 422);
    }

    $validated = $validator->validated();

    if (!Auth::attempt([
        'login' => $validated['login'],
        'password' => $validated['password']
    ], $validated['remember'] ?? false)) {
        return response()->json([
            'errors' => ['login' => ['Wrong login or password.']],
        ], 422);
    }

    $user = Auth::user();
    $token = $user->createToken('auth_token')->plainTextToken;
    if ($user->image) {
        $cleanPath = Str::replaceFirst('storage/', '', $user->image);
        $user->image = asset('storage/' . $cleanPath);
    }
    return response()->json([
        'message' => 'Login successful',
        'user' => $user,
        'access_token' => $token,
    ]);
}

public function profile(Request $request)
{
    $user = $request->user();

    if ($user->image) {
        if (!Str::startsWith($user->image, ['http://', 'https://'])) {
            $user->image = asset($user->image);
        }
    }


    return response()->json($user);
}

public function peopleYouMightKnow(Request $request)
{
    $currentUserId = Auth::id();

    $sentRequestUserIds = FriendRequest::where('from_user_id', $currentUserId)
        ->pluck('to_user_id')
        ->toArray();

    $receivedRequestUserIds = FriendRequest::where('to_user_id', $currentUserId)
        ->pluck('from_user_id')
        ->toArray();

    $excludeIds = array_merge([$currentUserId], $sentRequestUserIds, $receivedRequestUserIds);

    $paginatedUsers = User::whereNotIn('id', $excludeIds)->paginate(4);

    return PeopleKnowResource::collection($paginatedUsers);
}

    public function index()
    {
        $users = User::find(1);

        $chats = Chat::find(1);
        return response()->json($users);

    }
    public function show($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
        if ($user->image) {
            if (!Str::startsWith($user->image, ['http://', 'https://'])) {
                $user->image = asset('storage/' . $user->image);
            }
        }
        return response()->json($user);
    }

    public function getPhotos()
    {
        $photos = File::files(storage_path('app/public/Image'));
        $urls = array_map(function ($file) {
            return asset('storage/Image/' . $file->getFilename());
        }, $photos);

        return response()->json($urls);
    }

public function update(User $user, Request $request){

    $validated = $request -> validate([
        'first_name' => 'string|required|max:255',
        'last_name' => 'string|required|max:255',
        'age' => 'required|integer|min:18|max:100',
        'bio' => 'string|max:255',
        'location' => 'string|max:255',
        'profession' => 'string|max:255',
        'hobbies' => 'string|max:255',
    ]);
    $user->update($validated);
    return response()->json($user);
}
public function logout(Request $request)
{

    $request->user()->currentAccessToken()->delete();

    return response()->json(['message' => 'Logged out successfully']);
}

public function upload(Request $request,$id)
{

    $user = User::findOrFail($id);

    $user->update($request->all());

    return response()->json($user);
}


public function sendFriendRequest($id)
{
    $fromUser = Auth::user();
    $toUser = User::findOrFail($id);

    if ($fromUser->id === $toUser->id) {
        return response()->json(['message' => 'You cannot send a friend request to yourself'], 400);
    }



    FriendRequest::create([
        'from_user_id' => $fromUser->id,
        'to_user_id' => $toUser->id,
    ]);

    return response()->json(['message' => 'Friend request sent']);
}



public function setMainPhoto(Request $request)
{
    $request->validate([
        'photo_id' => 'required|exists:upload_photos,id',
    ]);

    $user = Auth::user();
    $photo = UploadPhoto::findOrFail($request->photo_id);

    if ($photo->user_id !== $user->id) {
        return response()->json([
            'error' => 'Unauthorized action: You can only set your own photos as the main one.'
        ], 403);
    }

    if ($user->image === $photo->url) {
        $defaultImage = $user->gender === 'Man'
            ? 'Image/Man-Photo.webp'
            : 'Image/Woman-Photo.png';

        $user->image = $defaultImage;
    } else {
        $user->image = $photo->path;
    }

    $user->save();

    return response()->json([
        'message' => 'Main photo updated successfully.',
        'image' => $photo->path,
    ]);
}


}
