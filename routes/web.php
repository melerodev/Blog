<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArticuloController;

Route::get('/', function () {
    return view('home');
})->name('home');

Route::resource('post', controller: ArticuloController::class);