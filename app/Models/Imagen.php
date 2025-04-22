<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Imagen extends Model
{
    protected $fillable = ['ruta', 'articulo'];
    public function articulo() {
        return $this->belongsTo(Articulo::class, 'articulo');
    }
}
