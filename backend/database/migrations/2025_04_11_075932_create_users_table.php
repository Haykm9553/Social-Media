<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('login')->unique();
            $table->string('password');
            $table->integer('age');
            $table->string('gender');
            $table->boolean('is_editing');
            $table->string('location')->nullable();
            $table->text('bio')->nullable();
            $table->string('profession')->nullable();
            $table->string('hobbies')->nullable();
            $table->text('friend_request')->nullable();
            $table->text('friend_list')->nullable();
            $table->string('image');
            $table->text('photo')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
