<?php

namespace App\Models;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;
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
}
