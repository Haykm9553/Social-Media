<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::with('user')->latest()->paginate(5);
        return response()->json($posts);
    }

    public function update(Post $post, Request $request){
        $validated = $request->validate([
            'content' => 'string|required'
        ]);

        $post->update($validated);
        return response()->json($post);
    }
    public function store(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'content' => 'nullable|string',
            'image' => 'nullable|string',
        ]);

        $post = Post::create([
            'user_id' => $user->id,
            'content' => $validated['content'] ?? '',
            'image' => $validated['image'] ?? null,
        ]);

        $post->load('user');

        return response()->json([
            'message' => 'Post created successfully',
            'post' => $post
        ], 201);
    }


    public function destroy($id)
    {
        $post = Post::findOrFail($id);

        if ($post->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $post->delete();

        return response()->json(['message' => 'Post deleted']);
    }
}
