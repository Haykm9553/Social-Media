<?php

namespace App\Collections;

use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;

class FriendRequestCollection extends ResourceCollection
{

    public function withPagination($paginator)
    {
        return [
            'data' => $this->map(function ($item) {
                $user = $item->from_user_id === Auth::id()
                    ? $item->toUser
                    : $item->fromUser;

                return [
                    'id' => $user?->id,
                    'age'  => $user->age,
                    'location'  => $user->location,
                    'gender'  => $user->gender,
                    'bio'  => $user->bio,
                    'profession'  => $user->profession,
                    'hobbies'  => $user->hobbies,
                    'first_name' => $user?->first_name,
                    'last_name' => $user?->last_name,
                    'image' => $user?->image ? asset('storage/' . $user->image) : null,
                ];
            })->all(),

            'meta' => [
                'current_page' => $paginator->currentPage(),
                'total_pages' => $paginator->lastPage(),
                'total_items' => $paginator->total(),
            ],
        ];
    }
}
