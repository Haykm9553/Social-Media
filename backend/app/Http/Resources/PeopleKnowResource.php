<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PeopleKnowResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function getPeopleKnowInfo($authUser)
    {
        $participant = ($this->user && $this->user->id !== $authUser->id) ? $this->user : $this->friend;

        return [
            'first_name'  => $participant->first_name ?? null,
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
        return [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'image' => $this->image ? asset('storage/' . ltrim($this->image, '/')) : null,
        ];
    }
}
