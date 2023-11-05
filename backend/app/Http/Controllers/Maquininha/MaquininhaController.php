<?php

namespace App\Http\Controllers\Maquininha;

use App\Enums\CodeStatusEnum;
use App\Http\Controllers\Controller;
use App\Repositories\Contracts\Maquininha\MaquininhaRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class MaquininhaController extends Controller
{
    private $maquininhaRepository;

    public function __construct(MaquininhaRepositoryInterface $maquininhaRepository)
    {
        $this->maquininhaRepository = $maquininhaRepository;
    }

    public function index(Request $request)
    {
        try {
            $queryParams = $request->all();
            $res = $this->maquininhaRepository->index($queryParams);

            if (isset($res->code) && $res->code == CodeStatusEnum::ERROR_SERVER) {
                return response()->json(['message' => $res->message], $res->code);
            }

            return response()->json(['response' => $res], 200);

        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => $e->getMessage(), 'message' => 'Erro de servidor'], 500);
        }
    }

    public function show($id)
    {
        try {
            $res = $this->maquininhaRepository->show($id);
            
            if (!$res) {
                return response()->json(['message' => 'Erro de servidor'], 500);
            }
            
            return response()->json($res, 200);


        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => $e->getMessage(), 'message' => 'Erro de servidor'], 500);
        }
    }
    
    public function store(Request $request)
    {
        try {
            $dados = $request->all();
            $res = $this->maquininhaRepository->create($dados);

            if (isset($res['code']) && $res['code'] == 500) {
                return response()->json(['response' => $res], $res['code']);
            } else {
                return response()->json(['response' => $res], 201);
            }
            
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => $e->getMessage(), 'message' => 'Erro de servidor'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $dados = $request->all();

            $res = $this->maquininhaRepository->update($dados, $id);

            if ($res['code'] == 500) {
                return response()->json(['message' => $res['message']], $res['code']);
            }

            return response()->json($res['message'], $res['code']);
            
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => $e->getMessage(), 'message' => 'Erro de servidor'], 500);
        }
    }
    
    public function destroy($id, Request $request)
    {
        try {

            $res = $this->maquininhaRepository->deleteMaquininha($id, $request->all());

            if ($res['code'] == 500) {
                return response()->json(['response' => 'Erro de Servidor'], 500);
            }

            return response()->json($res, 200);
            
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => $e->getMessage(), 'message' => 'Erro de servidor'], 500);
        }
    }

    public function finishVenda(Request $request)
    {
        try {
            $dados = $request->all();

            $res = $this->maquininhaRepository->finishVenda($dados);

            if ($res['code'] == 500) {
                return response()->json(['message' => $res['message']], $res['code']);
            }

            return response()->json($res['message'], $res['code']);
            
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => $e->getMessage(), 'message' => 'Erro de servidor'], 500);
        }
    }

    // Bandeiras
    public function bandeiras(Request $request)
    {
        try {
            $queryParams = $request->all();
            $res = $this->maquininhaRepository->bandeiras($queryParams);

            if (isset($res->code) && $res->code == CodeStatusEnum::ERROR_SERVER) {
                return response()->json(['message' => $res->message], $res->code);
            }

            return response()->json(['response' => $res], 200);

        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => $e->getMessage(), 'message' => 'Erro de servidor'], 500);
        }
    }

    public function showBandeira($id)
    {
        try {
            $res = $this->maquininhaRepository->getBandeiraById($id);
            
            if (!$res) {
                return response()->json(['message' => 'Falha ao processar o produto!'], 500);
            }
            
            return response()->json($res, 200);


        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => $e->getMessage(), 'message' => 'Erro de servidor'], 500);
        }
    }

    public function storeBandeira(Request $request)
    {   
        try {
            $dados = $request->all();
            $res = $this->maquininhaRepository->createBandeira($dados);

            if (isset($res['code']) && $res['code'] == 500) {
                return response()->json($res, 500);
            }

            return response()->json(['response' => $res], 200);

        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => $e->getMessage(), 'message' => 'Erro de servidor'], 500);
        }
    }

    public function updateBandeira(Request $request, $id)
    {
        try {
            $dados = $request->all();

            $res = $this->maquininhaRepository->updateBandeira($dados, $id);

            if (isset($res->code) && $res->code == CodeStatusEnum::ERROR_SERVER) {
                return response()->json(['message' => $res->message], $res->code);
            }

            return response()->json($res, 200);
            
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => $e->getMessage(), 'message' => 'Erro de servidor'], 500);
        }
    }

    public function destroyBandeira($id)
    {
        try {

            $res = $this->maquininhaRepository->deleteBandeira($id);

            if (!$res) {
                return response()->json(['response' => 'Erro de Servidor'], 500);
            }

            return response()->json($res, 200);
            
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => $e->getMessage(), 'message' => 'Erro de servidor'], 500);
        }
    }
    
    // Taxas
    public function taxas(Request $request)
    {
        try {
            $queryParams = $request->all();
            $res = $this->maquininhaRepository->taxas($queryParams);

            if (isset($res->code) && $res->code == CodeStatusEnum::ERROR_SERVER) {
                return response()->json(['message' => $res->message], $res->code);
            }

            return response()->json(['response' => $res], 200);

        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => $e->getMessage(), 'message' => 'Erro de servidor'], 500);
        }
    }

    public function showTaxa($id)
    {
        try {
            $res = $this->maquininhaRepository->getTaxaById($id);
            
            if (!$res) {
                return response()->json(['message' => 'Falha ao processar o produto!'], 500);
            }
            
            return response()->json($res, 200);


        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => $e->getMessage(), 'message' => 'Erro de servidor'], 500);
        }
    }

    public function storeTaxa(Request $request)
    {   
        try {
            $dados = $request->all();
            $res = $this->maquininhaRepository->createTaxa($dados);

            if (isset($res['code']) && $res['code'] == 500) {
                return response()->json($res, 500);
            }

            return response()->json(['response' => $res], 200);

        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => $e->getMessage(), 'message' => 'Erro de servidor'], 500);
        }
    }

    public function updateTaxa(Request $request, $id)
    {
        try {
            $dados = $request->all();

            $res = $this->maquininhaRepository->updateTaxa($dados, $id);

            if (isset($res->code) && $res->code == CodeStatusEnum::ERROR_SERVER) {
                return response()->json(['message' => $res->message], $res->code);
            }

            return response()->json($res, 200);
            
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => $e->getMessage(), 'message' => 'Erro de servidor'], 500);
        }
    }

    public function destroyTaxa($id)
    {
        try {

            $res = $this->maquininhaRepository->deleteTaxa($id);

            if (!$res) {
                return response()->json(['response' => 'Erro de Servidor'], 500);
            }

            return response()->json($res, 200);
            
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => $e->getMessage(), 'message' => 'Erro de servidor'], 500);
        }
    }
}
