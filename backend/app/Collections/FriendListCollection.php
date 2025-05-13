<?php

namespace App\Collections;

use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Collection;

class FriendListCollection extends ResourceCollection
{


    public function withPagination($paginator)
    {
        return [
            'data' => $this->collection->map(function ($item) {
                $user = $item->user;

                return [
                    'id' => $user?->id,
                    'first_name' => $user?->first_name,
                    'last_name' => $user?->last_name,
                    'age' => $user?->age,
                    'gender' => $user?->gender,
                    'hobbies' => $user?->hobbies,
                    'location' => $user?->location,
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
