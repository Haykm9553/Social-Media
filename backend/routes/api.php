<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\FriendListController;
use App\Http\Controllers\FriendRequestController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UploadPhotoController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Broadcast;

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login'])->name('login');



Route::middleware('auth:sanctum')->patch('/users/{id}', [UserController::class, 'upload']);


Route::middleware('auth:sanctum')->post('/logout', [UserController::class, 'logout']);

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/profile', [UserController::class, 'profile']);

    // POSTS
    Route::prefix('posts')->group(function () {
        Route::get('', [PostController::class, 'index']);
        Route::post('', [PostController::class, 'store']);
        Route::delete('/{id}', [PostController::class, 'destroy']);
        Route::put('/{post}', [PostController::class, 'update']);
        Route::post('/photo', [PostController::class, 'photoPost']);
    });
    // PHOTOS
    Route::prefix('photos')->group(function () {
        Route::post('/', [UploadPhotoController::class, 'upload']);
        Route::delete('/{id}', [UploadPhotoController::class, 'destroy']);
    });

    // CHATS
    Route::prefix('chats')->group(function () {
        Route::post('/create-group-chat', [ChatController::class, 'createGroupChat']);
        Route::get('/friend-Chat', [ChatController::class, 'FriendChat']);
        Route::get('/', [ChatController::class, 'index']);
        Route::post('/find-or-create', [ChatController::class, 'findOrCreate']);
    });

    // FRIENDS
    Route::prefix('friends')->group(function () {
        Route::get('/request', [FriendRequestController::class, 'index']);
        Route::get('/no-chat-friends', [FriendListController::class, 'getFriendsWithNoChat']);
        Route::post('/accept/{requestId}', [FriendRequestController::class, 'accept']);
        Route::post('/decline/{requestId}', [FriendRequestController::class, 'decline']);
        Route::get('/sent', [FriendRequestController::class, 'sentRequests']);
        Route::get('/list', [FriendListController::class, 'getFriends']);
        Route::post('/delete/{friendId}', [FriendListController::class, 'deleteFriend']);
        Route::get('/{id}', [FriendListController::class, 'index']);
    });

    // PEOPLE YOU MIGHT KNOW
    Route::prefix('people-you-might-know')->group(function () {
        Route::get('/', [UserController::class, 'peopleYouMightKnow']);
    });

    // MESSAGES
    Route::prefix('messages')->group(function () {
        Route::post('/', [MessageController::class, 'sendMessage']);
        Route::get('/', [MessageController::class, 'showMessages']);
    });

    // USERS
    Route::prefix('users')->group(function () {
        Route::get('', [UserController::class, 'index']);
        Route::get('/{id}/edit', [UserController::class, 'update']);
        Route::post('/{id}/friend-request', [UserController::class, 'sendFriendRequest']);
        Route::put('/set-main-photo', [UserController::class, 'setMainPhoto']);
    });
});
Route::get('users/{id}', [UserController::class, 'show']);
Route::get('photos/{id}', [UploadPhotoController::class, 'index']);
Broadcast::routes(['middleware' => ['auth:sanctum']]);
