<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Articulo extends Model
{
    protected $fillable = ['titulo', 'contenido', 'user', 'crate_at'];
    
    public function imagenes() {
        return $this->hasMany(Imagen::class, 'articulo');
    }

    public function comentarios() {
        return $this->hasMany(Comentario::class, 'articulo');
    }
}
