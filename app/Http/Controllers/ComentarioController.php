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
            $result = $comentario->delete();
            
            return response()->json([
                'result' => $result,
                'message' => 'Comentario eliminado correctamente'
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'result' => false,
                'error' => 'El comentario no existe o ya ha sido eliminado'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'result' => false,
                'error' => 'Error al eliminar el comentario: ' . $e->getMessage()
            ], 500);
        }
    }

    public function index($articuloId = null) {
        try {
            // Si recibimos un ID de artículo específico
            if ($articuloId !== null) {
                $comentarios = Comentario::where('articulo', $articuloId)->get();
                return response()->json($comentarios);
            }
            
            // Si no hay ID, devolver todos los comentarios
            $comentarios = Comentario::all();
            return response()->json($comentarios);
        } catch (\Exception $e) {
            return response()->json([
                'result' => false,
                'error' => 'Error al cargar comentarios: ' . $e->getMessage()
            ], 500);
        }
    }

    public function show($id) {
        try {
            $comentario = Comentario::findOrFail($id);
            return response()->json($comentario);
        } catch (\Exception $e) {
            return response()->json([
                'result' => false,
                'error' => 'Comentario no encontrado'
            ], 404);
        }
    }
}
