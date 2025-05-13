<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{

    protected $fillable = [
        'type',
        'name',
        'description'
    ];
    public function users()
    {
        return $this->belongsToMany(User::class, 'user_chats', 'chat_id', 'user_id')->withTimestamps();;
    }

    public function latestMessage()
    {
        return $this->hasOne(Message::class)->latestOfMany();
    }
}
