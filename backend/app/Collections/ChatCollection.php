<?php

namespace App\Collections;

use App\Http\Resources\ChatResource;
use Illuminate\Support\Collection;

class ChatCollection extends Collection
{
    // Add pagination metadata to the collection
    public function withPagination($pagination)
    {
        // Transform each item into the ChatResource format
        $data = $this->items ? ChatResource::collection(collect($this->items)) : [];

        // new ChatResource($chat); // FOR 1 ITEM
        return [
            'data' => $data,
            'meta' => [
                'current_page' => $pagination->currentPage(),
                'total_pages' => $pagination->lastPage(),
                'total_items' => $pagination->total(),
            ],
        ];
    }
}
