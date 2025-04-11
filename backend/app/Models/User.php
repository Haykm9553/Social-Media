<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class User extends Model
{
    use HasApiTokens;
    protected $casts = [
        'friend_request' => 'array',
        'friend_list' => 'array',
        'photo' => 'array',
    ];
    protected $fillable = [
        'first_name', 'last_name', 'login', 'password',
        'age', 'gender', 'location', 'bio', 'profession',
        'hobbies', 'friend_request', 'friend_list', 'image', 'photo'
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
