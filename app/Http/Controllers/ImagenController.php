<?php

namespace App\Http\Controllers;
use App\Models\Imagen;

use Illuminate\Http\Request;

class ImagenController extends Controller
{
    public function store(Request $request) {
        $imagen = Imagen::create($request->all());
        return response()->json($imagen, 201);
    }
    
    public function destroy(Imagen $imagen) {
        $imagen->delete();
        return response()->json(null, 204);
    }
}
