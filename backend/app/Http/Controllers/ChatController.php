<?php

namespace App\Http\Controllers;

use App\Collections\ChatCollection;
use App\Http\Resources\ChatResource;
use App\Models\Chat;
use App\Models\FriendList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $chats = $user->chats()->with('users');

        $paginatedChats = $chats->paginate(10);

        $collection = new ChatCollection($paginatedChats->items());

        return response()->json($collection->withPagination($paginatedChats));
    }
    public function findOrCreate(Request $request)
    {
        $user = Auth::user();
        $userId = $user->id;
        $friendId = $request->input('friend_id');
        $friendName = $request->input('friend_first_name');

        $chat = Chat::where('type', 'private')
            ->whereHas('users', function ($q) use ($userId) {
                $q->where('user_id', $userId);
            })
            ->with('users')
            ->get()
            ->first(function ($chat) use ($friendId) {
                return $chat->users->pluck('id')->contains($friendId) && $chat->users->count() === 2;
            });

        if (!$chat) {
            $chat = Chat::create([
                'type' => 'private',
                'name' => $user->first_name . ' ' . $friendName,
                'description' => $user->first_name . ' and ' . $friendName . ' Private Chat',
            ]);
            $chat->users()->attach([$userId, $friendId]);
        }

        return response()->json(['chat_id' => $chat->id]);
    }


public function createGroupChat(Request $request)
{
    $request->validate([
        'type' => 'required|in:group',
        'users' => 'required|array|min:2',
        'users.*' => 'exists:users,id',
    ]);

    $authUser = Auth::user();

    $chat = Chat::create([
        'type' => 'group',
        'name' => $request->name,
        'description' => $request->description,
    ]);

    $allUsers = array_unique(array_merge([$authUser->id], $request->input('users')));
    $chat->users()->attach($allUsers);

    return response()->json([
        'chat_id' => $chat->id,
        'message' => 'Group chat created successfully',
    ]);
}
}
