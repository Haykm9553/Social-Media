<?php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class FriendRequestResource extends JsonResource
{
    /**
     *
     *
     * @return array<string, mixed>
     */
    public function getFriendRequestInfo($authUser)
    {
        $participant = ($this->user && $this->user->id !== $authUser->id) ? $this->user : $this->friend;
        return [
            'first_name'  => $participant->first_name ?? null,
            'age'  => $participant->age ?? null,
            'location'  => $participant->location ?? null,
            'gender'  => $participant->gender ?? null,
            'bio'  => $participant->bio ?? null,
            'profession'  => $participant->profession ?? null,
            'hobbies'  => $participant->hobbies ?? null,
            'last_name'   => $participant->last_name ?? null,
            'image'       => $participant->image ? asset('storage/' . $participant->image) : null,
        ];
    }

    /**
     *
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
{
    return $this->collection->map(function ($item) {
        $fromUser = $item->fromUser;
        $toUser = $item->toUser;
        return [
            'from_user_id' => $fromUser->id,
            'from_user_name' => $fromUser->first_name . ' ' . $fromUser->last_name,
            'to_user_id' => $toUser->id,
            'to_user_name' => $toUser->first_name . ' ' . $toUser->last_name,
            'status' => $item->status,
        ];
    })->all();
}
}
