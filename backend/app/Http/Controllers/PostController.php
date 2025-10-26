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

        // Пройдемся по каждому посту и обработаем картинку юзера
        $posts->getCollection()->transform(function ($post) {
            if ($post->user && $post->user->image) {
                if (strpos($post->user->image, 'http') === false) {
                    $post->user->image = asset('storage/' . ltrim($post->user->image, '/'));
                }
            }
            return $post;
        });

        return response()->json($posts);
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

    public function photoPost(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'content' => 'nullable|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $file = $request->file('image');

        $path = $file->store('Image', 'public');

        $fullPath = 'storage/' . $path;

        $imagePost = Post::create([
            'user_id' => $user->id,
            'content' => $validated['content'] ?? '',
            'image' => $fullPath,
        ]);

        return response()->json([
            'message' => "Image post created successfully.",
            'data' => $imagePost,
            'success' => true,
        ]);
    }

}
