<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'first_name' => fake()->title(),
            'last_name' => fake()->name(),
            'gender' => fake()->randomElement(['Man', 'Woman']),
            'login' => fake()->name(),
            'password' => static::$password ??= Hash::make('password'),
            'created_at' => now(),
            'updated_at' => now(),
            'image' => fake()->randomElement(['http://localhost:8000/storage/Image/Man-Photo.webp', 'http://localhost:8000/storage/Image/Woman-Photo.png']),
            'hobbies' => fake()->randomElement([
                'Photography', 'Painting', 'Gaming', 'Hiking', 'Cooking',
                'Reading', 'Traveling', 'Cycling', 'Music', 'Fishing'
            ]),
            'profession' => fake()->jobTitle,
            'bio' => fake()->text(),
            'location' => fake()->country(),
            'photo' => [],
            'remember_token' => Str::random(10),
            'age' => random_int(18,100)
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
