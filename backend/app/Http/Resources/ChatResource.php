<?php

namespace App\Http\Resources;

use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class ChatResource extends JsonResource
{
    public function getChatInfo()
    {
        if ($this->type === 'group') {
            $participants = $this->users->map(function ($user) {
                return [
                    'user_id' => $user->id,
                    'first_name' => $user->first_name,
                    'last_name' => $user->last_name,
                    'image' => $user->image ? asset('storage/' . $user->image) : null,
                ];
            });

            $lastMessage = Message::where('chat_id', $this->id)
                ->latest('created_at')
                ->first();

            return [
                'participants' => $participants,
                'last_message' => $lastMessage?->content ?? null,
            ];
        }

        $authUser = Auth::user();

        $participant = $this->users->first(function ($user) use ($authUser) {
            return $user->id !== $authUser->id;
        });

        $lastMessage = Message::where('chat_id', $this->id)
            ->where(function ($query) use ($authUser) {
                $query->where('sender_id', $authUser->id)
                      ->orWhere('receiver_id', $authUser->id);
            })
            ->latest('created_at')
            ->first();

        return [
            'user_id'      => $participant?->id,
            'first_name'   => $participant?->first_name,
            'last_name'    => $participant?->last_name,
            'image'        => $participant?->image
                ? asset('storage/' . $participant->image)
                : null,
            'last_message' => $lastMessage?->content ?? null,
        ];
    }
    /**
     * Transform the resource into   an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $chatInfo = $this->getChatInfo();

        $base = [
            'id'           => $this->id,
            'description'  => $this->description,
            'last_message' => $chatInfo['last_message'] ?? null,
            'type'         => $this->type,
            'name'         => $this->name,
        ];

        if ($this->type === 'private') {
            return array_merge($base, [
                'user_id'     => $chatInfo['user_id'],
                'first_name'  => $chatInfo['first_name'],
                'last_name'   => $chatInfo['last_name'],
                'image'       => $chatInfo['image'],
            ]);
        } else {
            return array_merge($base, [
                'participants' => $chatInfo['participants'],
            ]);
        }
    }
}
