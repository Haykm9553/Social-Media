<?php

namespace App\Http\Controllers;

use App\Models\FriendList;
use App\Models\FriendRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FriendRequestController extends Controller
{
    public function index()
{
    $user = Auth::user();
    $requests = FriendRequest::where('to_user', $user)->with('fromUser')->get();

    return response()->json($requests);
}

public function friendRequest(){

    
}
public function getRequest(Request $request){

    $currentUserId = Auth::id();

    $friendRequests = FriendRequest::where('to_user_id', $currentUserId)
    ->where('status', 'pending')
    ->with('fromUser')
    ->paginate(4);

     return response()->json($friendRequests);
}
public function sentRequests(Request $request)
{
    $user = Auth::user();

    $users = User::where('id', '!=', $user->id)
        ->whereNotIn('id', function ($query) use ($user) {
            $query->select('to_user_id')
                ->from('friend_requests')
                ->where('status', 'pending')
                ->where('from_user_id', $user->id);
        })
        ->whereNotIn('id', function ($query) use ($user) {
            $query->select('from_user_id')
                ->from('friend_requests')
                ->where('status', 'pending')
                ->where('to_user_id', $user->id);
        })
        ->paginate(5);
    return response()->json($users);
}

    public function accept($requestId)
    {
        $request = FriendRequest::findOrFail($requestId);

        if ($request->to_user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->update(['status' => 'accepted']);
        $request->save();

        FriendList::create([
            'user_id' =>$request->to_user_id,
            'friend_id' =>$request->from_user_id,

        ]);

        return response()->json(['message' => 'Friend request accepted']);
    }

    public function decline($requestId)
    {
        $request = FriendRequest::findOrFail($requestId);

        if ($request->to_user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        $request->update(['status' => 'declined']);
        $request->save();
        return response()->json(['message' => 'Friend request declined']);
    }


}


