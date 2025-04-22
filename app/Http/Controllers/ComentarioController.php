<?php

namespace App\Http\Controllers;
use App\Models\Comentario;

use Illuminate\Http\Request;

class ComentarioController extends Controller
{
    public function store(Request $request) {
        $comentario = Comentario::create($request->all());
        return response()->json($comentario, 201);
    }

    public function update(Request $request, Comentario $comentario) {
        $comentario->update($request->all());
        return response()->json($comentario);
    }

    public function destroy(Comentario $comentario) {
        $comentario->delete();
        return response()->json(null, 204);
    }
}
