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

    public function create(Request $request)
    {
        try {
            $articulo = Articulo::create($request->all());
            return response()->json([
                'articulo' => $articulo,
                'result' => true,
                'message' => 'Artículo creado correctamente'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'result' => false,
                'message' => 'Error al crear el artículo: ' . $e->getMessage()
            ], 400);
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