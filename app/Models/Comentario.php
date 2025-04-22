<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comentario extends Model
{
    protected $fillable = ['texto', 'articulo'];
    public function articulo() {
        return $this->belongsTo(Articulo::class, 'articulo');
    }
}
