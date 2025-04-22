<?php

namespace App\Http\Controllers;
use App\Models\Articulo;

use Illuminate\Http\Request;

class ArticuloController extends Controller
{
    public function articulo()
    {
        return view('create');
    }
    
    public function create(Request $request) {
        $articulo = Articulo::create($request->all());
        return response()->json($articulo, 201);
    }

    public function edit(Request $request, Articulo $articulo) {
        $articulo->update($request->all());
        return response()->json($articulo);
    }
    
    public function destroy(Articulo $articulo) {
        $articulo->delete();
        return response()->json(null, 204);
    }
}