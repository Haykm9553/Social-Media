<?php

namespace App\Http\Controllers;

use App\Events\SendMessageEvent;
use App\Models\Chat;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    public function sendMessage(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'chat_id' => 'required|exists:chats,id',
            'content' => 'required|string',
            'receiver_id' => 'nullable|exists:users,id',
        ]);

        $chat = Chat::with('users')->find($validated['chat_id']);

        if (!$chat->users->contains($user->id)) {
            return response()->json(['error' => 'You are not a member of this chat.'], 403);
        }


        $message = Message::create([
            'sender_id' => $user->id,
            'chat_id' => $chat->id,
            'receiver_id' => $validated['receiver_id'] ?? null,
            'content' => $validated['content'],
        ]);
        broadcast(new SendMessageEvent($message, $user))->toOthers();
        return response()->json($message, 201);
    }

    public function showMessages(Request $request)
    {
        $validated = $request->validate([
            'chat_id' => 'required|exists:chats,id',
        ]);

        $messages = Message::where('chat_id', $validated['chat_id'])
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json($messages);
    }
}
