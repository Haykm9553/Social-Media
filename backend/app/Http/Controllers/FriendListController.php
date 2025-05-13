<?php

namespace App\Http\Controllers;

use App\Collections\FriendListCollection;
use App\Models\Chat;
use App\Models\FriendList;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class FriendListController extends Controller
{

    public function index(Request $request)
{
    $userId = $request->id;

    $friends = FriendList::where(function ($query) use ($userId) {
        $query->where('user_id', $userId)
              ->orWhere('friend_id', $userId);
    })
    ->with(['user', 'friend'])
    ->get();

    $friendUsers = $friends->map(function ($friend) use ($userId) {
        $otherUser = $friend->user_id == $userId ? $friend->friend : $friend->user;
        if ($otherUser && $otherUser->image && strpos($otherUser->image, 'http') === false) {
            $otherUser->image = asset('storage/' . ltrim($otherUser->image, '/'));
        }
        return $otherUser;
    })->filter(function ($user) use ($userId) {
        return $user && $user->id !== $userId;
    })->values();



    $perPage = 6;
    $currentPage = LengthAwarePaginator::resolveCurrentPage();

    $paginated = new LengthAwarePaginator(
        $friendUsers->slice(($currentPage - 1) * $perPage, $perPage),
        $friendUsers->count(),
        $perPage,
        $currentPage
    );

    $paginated->withPath(url()->current());

    return response()->json([
        'data' => array_values($paginated->items()),
        'meta' => [
            'current_page' => $paginated->currentPage(),
            'last_page' => $paginated->lastPage(),
            'total' => $paginated->total(),
        ],
    ]);
}
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
            $friend = $item->user_id === $userId ? $item->friend : $item->user;

            if ($friend && $friend->image && strpos($friend->image, 'http') === false) {
                $friend->image = asset('storage/' . ltrim($friend->image, '/'));
            }

            return $friend;
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

    public function getFriendsWithNoChat(Request $request)
{
    $user = Auth::user();

    $friendIds = DB::table('friend_lists')
        ->where('user_id', $user->id)
        ->pluck('friend_id');

    $chatUserIds = Chat::whereHas('users', function ($q) use ($user) {
        $q->where('user_id', $user->id);
    })->with('users')->get()
      ->pluck('users')
      ->flatten()
      ->where('id', '!=', $user->id)
      ->where('type',"private")
      ->pluck('id')
      ->unique();

    $friendsWithoutChatIds = $friendIds->diff($chatUserIds);

    $friends = User::whereIn('id', $friendsWithoutChatIds)->paginate(6);

    $friends->transform(function ($friend) {
        $friend->image = $friend->image ? asset('storage/' . $friend->image) : null;
        return $friend;
    });
    return response()->json($friends);
}

}
