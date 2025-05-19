<?php

namespace App\Http\Controllers;
use App\Models\Comentario;

use Illuminate\Http\Request;

class ComentarioController extends Controller
{
    public function store(Request $request) {
        try {
            $validated = $request->validate([
                'texto' => 'required|string',
                'articulo' => 'required|integer',
                'user' => 'required|integer',
            ]);

            $comentario = Comentario::create($validated);

            return response()->json([
                'result' => true,
                'message' => 'Comentario creado exitosamente',
                'comentario' => $comentario,
                'comentarios' => Comentario::all(), // Devolver la lista actualizada
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'result' => false,
                'message' => 'Error al crear el comentario: ' . $e->getMessage(),
            ], 422);
        }
    }

    public function update(Request $request, Comentario $comentario) {
        $comentario->update($request->all());
        return response()->json($comentario);
    }

    public function destroy($id) {
        try {
            $comentario = Comentario::findOrFail($id);
            return response()->json($comentario->delete());
        } catch (\Exception $e) {
            return response()->json(['error' => 'Comentario no encontrado'], 404);
        }
    }

    public function index($articuloId) {
        $comentarios = Comentario::where('articulo_id', $articuloId)->get();
        return response()->json($comentarios);
    }
}
