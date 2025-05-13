<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;
    use HasFactory;
    protected $casts = [
        'photo' => 'array',
        'friend_list' => 'array',
        'friend_request' => 'array',
    ];
    protected $fillable = [
        'first_name',
        'last_name',
        'login',
        'age',
        'password',
        'gender',
        'location',
        'bio',
        'profession',
        'hobbies',
        'is_editing',
        'friend_request',
        'friend_list',
        'image',
        'photo',
    ];
    protected $visible = [
        'id',
        'first_name',
        'last_name',
        'login',
        'age',
        'gender',
        'location',
        'bio',
        'profession',
        'hobbies',
        'friend_request',
        'friend_list',
        'image',
        'photo',
        'created_at',
        'updated_at',
    ];

    public function posts()
    {
        return $this->hasMany(Post::class);
    }
    public function photos()
    {
        return $this->hasMany(UploadPhoto::class);
    }
    public function sentFriendRequests()
    {
        return $this->hasMany(FriendRequest::class, 'from_user_id');
    }

    public function receivedFriendRequests()
    {
        return $this->hasMany(FriendRequest::class, 'to_user_id');
    }

    public function chats()
    {
        return $this->belongsToMany(Chat::class, 'user_chats', 'user_id', 'chat_id')->withTimestamps();
    }
    protected $appends = ['last_message'];

    public function getLastMessageAttribute()
    {
        return $this->attributes['last_message'] ?? null;
    }
}
