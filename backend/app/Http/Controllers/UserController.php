<?php

namespace App\Http\Controllers;

use App\Models\FriendRequest;
use Illuminate\Support\Facades\File;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

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
        $validated['photo'] = [];

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

    return response()->json([
        'message' => 'Login successful',
        'user' => $user,
        'access_token' => $token,
    ]);
}

    public function peopleYouMightKnow(Request $request)
{

    $currentUserId = Auth::id();

    $sentRequestUserIds = FriendRequest::where('from_user_id', $currentUserId)
        ->orWhere('to_user_id', $currentUserId)
        ->orWhere('status',  'pending')
        ->pluck('to_user_id')
        ->toArray();
        
        $receivedRequestUserIds = FriendRequest::where('to_user_id', $currentUserId)
        ->pluck('from_user_id')
        ->toArray();
        $excludeIds = array_merge([$currentUserId], $sentRequestUserIds,$receivedRequestUserIds);
        $users = User::whereNotIn('id', $excludeIds)->paginate(4);


    return response()->json($users);
}

    public function index()
    {
        $users = User::all();

        return response()->json($users);

    }
    public function show($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
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

public function uploadPhoto(Request $request)
{
    $request->validate([
        'photo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    $path = $request->file('photo')->store('public/Image');

    $url = Storage::url($path);

    return response()->json(['url' => $url]);
}
public function sendFriendRequest($id)
{
    $fromUser = Auth::user();
    $toUser = User::findOrFail($id);

    if ($fromUser->id === $toUser->id) {
        return response()->json(['message' => 'You cannot send a friend request to yourself'], 400);
    }

    // Check if already friends
    // if ($fromUser->friends()->where('friend_id', $toUser->id)->exists()) {
    //     return response()->json(['message' => 'Already friends'], 400);
    // }


    FriendRequest::create([
        'from_user_id' => $fromUser->id,
        'to_user_id' => $toUser->id,
    ]);

    return response()->json(['message' => 'Friend request sent']);
}

}
