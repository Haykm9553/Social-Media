<?php

use App\Events\SendMessageEvent;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', [UserController::class, 'index']);
Route::get('/test-event', function () {
    broadcast(new SendMessageEvent("Hello from Laravel"));
    return 'Event sent';
});
