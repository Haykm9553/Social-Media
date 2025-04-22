<?php

use App\Http\Controllers\FriendListController;
use App\Http\Controllers\FriendRequestController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UploadPhotoController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login'])->name('login');
Route::middleware('auth:sanctum')->get('/profile', function (Request $request) {
    return response()->json($request->user());
});



Route::post('/upload-photo', [UserController::class, 'uploadPhoto']);
Route::get('/get-photos', [UserController::class, 'getPhotos']);
Route::middleware('auth:sanctum')->patch('/users/{id}', [UserController::class, 'upload']);


Route::middleware('auth:sanctum')->post('/logout', [UserController::class, 'logout']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/users', [UserController::class, 'index']);
        Route::get('/users/{id}', [UserController::class, 'show']);
        Route::get('/users/{id}/edit', [UserController::class, 'update']);
        Route::post('/users/{id}/friend-request', [UserController::class, 'sendFriendRequest']);
        Route::post('/friends/accept/{requestId}', [FriendRequestController::class, 'accept']);
        Route::post('/friends/decline/{requestId}', [FriendRequestController::class, 'decline']);
        Route::get('/friends/sent', [FriendRequestController::class, 'sentRequests']);
        Route::get('friends/request', [FriendRequestController::class, 'getRequest']);
        Route::get('friends/list', [FriendListController::class, 'getFriends']);
        Route::post('friends/delete/{friendId}', [FriendListController::class, 'deleteFriend']);
        Route::get('/people-you-might-know', [UserController::class, 'peopleYouMightKnow']);
        Route::get('/posts', [PostController::class, 'index']);
        Route::post('/posts', [PostController::class, 'store']);
        Route::delete('/posts/{id}', [PostController::class, 'destroy']);
        Route::put('/posts/{post}', [PostController::class, 'update']);
        Route::post('/photos', [UploadPhotoController::class, 'upload']);
    });
