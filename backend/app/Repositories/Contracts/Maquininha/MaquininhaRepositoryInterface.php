<?php

namespace App\Repositories\Contracts\Maquininha;

use App\Repositories\Contracts\CrudRepositoryInterface;
use Illuminate\Http\Request;

interface MaquininhaRepositoryInterface extends CrudRepositoryInterface
{
    public function index($queryParams);

    public function show($id);
    
    public function create($dados);

    public function update($dados, $id);

    public function deleteMaquininha($id, $params);

    public function finishVenda($dados);

    //Bandeiras
    public function bandeiras($queryParams);

    public function getBandeiraById($id);

    public function createBandeira($dados);

    public function updateBandeira($dados, $id);
    
    public function deleteBandeira($id);
    
    //Taxas
    public function taxas($queryParams);

    public function getTaxaById($id);

    public function createTaxa($dados);

    public function updateTaxa($dados, $id);
    
    public function deleteTaxa($id);
}