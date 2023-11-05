<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use App\Models\Taxa;

class Bandeira extends Model
{
    protected $table = 'bandeiras';
    protected $primaryKey = 'id';
    
    public $timestamps = true;

    protected $fillable = [
        'nome',
        'maquininha_id'
    ];

    protected $hidden = [];
    
    protected $dates = ['created_at', 'updated_at'];
    
    protected $casts = [
        'created_at' => 'datetime:d-m-Y H:i:s',
        'updated_at' => 'datetime:d-m-Y H:i:s',
    ];

    public function taxas()
    {
        return $this->hasMany(Taxa::class, 'bandeira_id');
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
