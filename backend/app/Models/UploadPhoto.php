<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UploadPhoto extends Model
{
    protected $fillable = ['user_id', 'image'];

    public function user()
{
    return $this->belongsTo(User::class);
}
}
