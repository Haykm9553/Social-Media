<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class FriendListResource extends JsonResource
{

    public function getFriendListInfo()
    {
        $authUser = Auth::user();
        $participant = array_find($this->users->toArray(), function($user) use ($authUser) {
            return $user['id'] !== $authUser->id;
        });
        return [
            'first_name'  => $participant['first_name'],
            'last_name'  => $participant['last_name'],
            'age'  => $participant['age'],
            'gender'  => $participant['gender'],
            'hobbies'  => $participant['hobbies'],
            'location'  => $participant['location'],
            'image' => $participant['image'] ? asset('storage/' . $participant['image']) : null,
        ];
    }
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return $this->collection->map(function ($item) {
            $user = $this->getFriendListInfo();

            return [
                'id' => $this->id,
                'first_name' => $user['first_name'],
                'last_name' => $user['last_name'],
                'age' => $user['age'],
                'gender' => $user['gender'],
                'hobbies' => $user['hobbies'],
                'location' => $user['location'],
                'image' => $user['image'] ? asset('storage/' . $user['image'],) : null,
            ];
        });
    }
}
