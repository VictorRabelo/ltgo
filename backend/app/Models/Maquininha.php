<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use App\Models\Bandeira;

class Maquininha extends Model
{
    protected $table = 'maquininhas';
    protected $primaryKey = 'id';
    
    public $timestamps = true;

    protected $fillable = [
        'nome'
    ];

    protected $hidden = [];
    
    protected $dates = ['created_at', 'updated_at'];
    
    protected $casts = [
        'created_at' => 'datetime:d-m-Y H:i:s',
        'updated_at' => 'datetime:d-m-Y H:i:s',
    ];

    public function bandeiras()
    {
        return $this->hasMany(Bandeira::class, 'maquininha_id');
    }
    
    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->setTimezone('America/Sao_Paulo')->format('d/m/Y H:i:s');
    }
    
    public function getUpdatedAtAttribute($value)
    {
        return Carbon::parse($value)->setTimezone('America/Sao_Paulo')->format('d/m/Y H:i:s');
    }
}
