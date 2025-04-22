<?php

namespace Database\Seeders;

use App\Models\FriendRequest;
use App\Models\Post;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory(100)->create();
        FriendRequest::factory(count: 200)->create();
        Post::factory(50)->create();
    }
}
