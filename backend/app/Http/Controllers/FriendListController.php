<?php

namespace App\Http\Controllers;

use App\Models\FriendList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FriendListController extends Controller
{
    public function getFriends(Request $request)
    {
        $userId = Auth::id();

        $friends = FriendList::where(function ($query) use ($userId) {
                $query->where('user_id', $userId)
                      ->orWhere('friend_id', $userId);
            })
            ->with(['user', 'friend'])
            ->paginate(10);

        $transformed = $friends->getCollection()->transform(function ($item) use ($userId) {
            return $item->user_id === $userId ? $item->friend : $item->user;
        });

        $friends->setCollection($transformed);

        return response()->json($friends);
    }



    public function deleteFriend (Request $request,$friendId){
        $userId = Auth::id();

        $deleted = FriendList::where(function ($query) use ($userId, $friendId) {
            $query->where('user_id', $userId)->where('friend_id', $friendId);
        })->orWhere(function ($query) use ($userId, $friendId) {
            $query->where('user_id', $friendId)->where('friend_id', $userId);
        })->delete();

        if ($deleted) {
            return response()->json(['message' => 'Friend deleted successfully.'], 200);
        }

        return response()->json(['message' => 'Friend not found.'], 404);

    }
}
