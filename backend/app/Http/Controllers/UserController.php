<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\File;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->json()->all();


        $validated = $request->validate([
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
        $validated['password'] = Hash::make(($validated['password']));
        $validated['friend_request'] = [];
        $validated['friend_list'] = [];
        $validated['photo'] = [];

        $user = User::create($validated);


        Auth::login($user);

        return response()->json(['message' => 'User registered']);
    }



    public function login(Request $request)
    {
        $data = $request->json()->all();


        $validated = $request->validate([
            'login' => 'required|string|max:255',
            'password' => 'required|string',
        ]);


        $user = User::where('login', $data['login'])->first();
        if (Auth::attempt([
            'login' => $validated['login'],
            'password' => $validated['password'],
        ])) {

            $token = $user->createToken('auth_token')->plainTextToken;
            return response()->json([
                'message' => 'Login successful',
                'user' => Auth::user(),
                'access_token' => $token
            ]);
        }

        throw ValidationException::withMessages([
            'login' => ['Sorry, wrong credentials.'],
        ]);

    }

    public function index()
    {
        return response()->json(User::all());

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


}
