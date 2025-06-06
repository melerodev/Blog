<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArticuloController;
use App\Http\Controllers\ComentarioController;

Route::get('/', function () {
    return view('home');
})->name('home');

Route::resource('post', controller: ArticuloController::class);
Route::resource('comment', controller: ComentarioController::class);
// Ruta específica para obtener comentarios por ID de artículo
Route::get('comment/article/{articuloId}', [ComentarioController::class, 'index']);