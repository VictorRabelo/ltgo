<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Taxa extends Model
{
    protected $table = 'taxas';
    protected $primaryKey = 'id';
    
    public $timestamps = true;

    protected $fillable = [
        'qtd_vezes',
        'porcentagem',
        'bandeira_id'
    ];

    protected $hidden = [];
    
    protected $dates = ['created_at', 'updated_at'];
    
    protected $casts = [
        'created_at' => 'datetime:d-m-Y H:i:s',
        'updated_at' => 'datetime:d-m-Y H:i:s',
    ];
    
    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->setTimezone('America/Sao_Paulo')->format('d/m/Y H:i:s');
    }
    
    public function getUpdatedAtAttribute($value)
    {
        return Carbon::parse($value)->setTimezone('America/Sao_Paulo')->format('d/m/Y H:i:s');
    }
}
