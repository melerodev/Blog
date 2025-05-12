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

    public function edit(Request $request, Articulo $articulo)
    {
        $articulo->update($request->all());
        return response()->json(['message' => 'Artículo actualizado correctamente', 'result' => true]);
    }

    public function destroy($id)
    {
        try {
            $articulo = Articulo::find($id);

            $articulo->delete();

            return response()->json([
                'message' => 'Artículo eliminado correctamente',
                'result' => true,
                'id' => $id
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al eliminar el artículo: ' . $e->getMessage(),
                'result' => false
            ]);
        }
    }
}