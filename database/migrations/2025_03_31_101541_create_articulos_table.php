<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('articulos', function (Blueprint $table) {
            $table->id();
            $table->string('titulo');
            $table->text('contenido');
            $table->foreignId('user')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });

        // Insert default data
        DB::table('articulos')->insert([
            [
                'titulo' => 'Primer Artículo',
                'contenido' => 'Este es el contenido del primer artículo.',
                'user' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'titulo' => 'Segundo Artículo',
                'contenido' => 'Este es el contenido del segundo artículo.',
                'user' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articulos');
    }
};
