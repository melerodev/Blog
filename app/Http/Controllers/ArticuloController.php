<?php

namespace App\Http\Controllers;
use App\Models\Articulo;

use Illuminate\Http\Request;

class ArticuloController extends Controller {
    public function index()
    {
        return response()->json(['articulos' => Articulo::all(), 'result' => true]);
    }
    public function articulo()
    {
        return view('create');
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'titulo' => 'required|string|max:255',
                'contenido' => 'required|string',
                'user' => 'required|integer',
            ]);

            $articulo = Articulo::create($validated);

            return response()->json([
                'result' => true,
                'message' => 'Post creado exitosamente',
                'articulo' => $articulo,
                'articulos' => Articulo::all(), // Devolver la lista actualizada
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'result' => false,
                'message' => 'Error al crear el post: ' . $e->getMessage(),
            ], 422);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                'titulo' => 'required|string|max:255',
                'contenido' => 'required|string',
                'user' => 'required|integer',
            ]);
            
            $articulo = Articulo::find($id)->update($validated);
            
            return response()->json([
                'message' => 'Post actualizado correctamente', 
                'result' => true,
                'articulo' => $articulo,
                'articulos' => Articulo::all() // Devolver la lista actualizada
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'result' => false,
                'message' => 'Error al actualizar el post: ' . $e->getMessage(),
            ], 422);
        }
    }

    public function destroy($id)
    {
        try {
            $articulo = Articulo::find($id);

            if (!$articulo) {
                return response()->json([
                    'message' => 'Post no encontrado',
                    'result' => false
                ], 404);
            }

            $articulo->delete();

            return response()->json([
                'message' => 'Post eliminado correctamente',
                'result' => true,
                'articulos' => Articulo::all()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al eliminar el post: ' . $e->getMessage(),
                'result' => false
            ]);
        }
    }
}