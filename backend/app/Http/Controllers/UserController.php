<?php

namespace App\Http\Controllers;


use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->json()->all();


        $user = new User();
        $user->first_name = $data['first_name'];
        $user->last_name = $data['last_name'];
        $user->login = $data['login'];
        $user->age = $data['age'];
        $user->password = bcrypt($data['password']);
        $user->gender = $data['gender'];
        $user->location = $data['location'] ?? '';
        $user->bio = $data['bio'] ?? '';
        $user->profession = $data['profession'] ?? '';
        $user->hobbies = $data['hobbies'] ?? '';
        $user->is_editing = $data['is_editing'] ?? '';
        $user->friend_request = json_encode([]);
        $user->friend_list = json_encode([]);
        $user->image = $data['image'] ?? '';
        $user->photo = json_encode([]);

        $user->save();

        return response()->json(['message' => 'User registered']);
    }



    public function login(Request $request)
    {
        $data = $request->json()->all();

        $user = User::where('login', $data['login'])->first();

        if (!$user || !Hash::check($data['pass'], $user->password)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }


        return response()->json([
            'message' => 'Login successful',
            'token_type' => 'Bearer',
            'user' => $user,
        ]);
    }

    public function index()
    {
        $users = User::all();
        // dd($users);
        return response()->json(User::all());
    }
}
