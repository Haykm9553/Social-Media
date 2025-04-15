<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::middleware('auth:sanctum')->get('/profile', function (Request $request) {
    return response()->json($request->user());
});
Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::get('/users/{id}/edit', [UserController::class, 'update']);


Route::post('/upload-photo', [UserController::class, 'uploadPhoto']);
Route::get('/get-photos', [UserController::class, 'getPhotos']);
Route::middleware('auth:sanctum')->patch('/users/{id}', [UserController::class, 'upload']);


Route::middleware('auth:sanctum')->post('/logout', [UserController::class, 'logout']);
;
