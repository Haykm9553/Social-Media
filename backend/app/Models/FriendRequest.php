<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

class FriendRequest extends Model
{
    use HasFactory;
    protected $fillable = [
        'from_user_id',
        'to_user_id',
        'status',
    ];


    public function fromUser()
{
    return $this->belongsTo(User::class, 'from_user_id');
}

public function toUser()
{
    return $this->belongsTo(User::class, 'to_user_id');
}
}
