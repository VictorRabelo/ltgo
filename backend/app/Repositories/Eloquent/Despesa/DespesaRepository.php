<?php

namespace App\Repositories\Eloquent\Despesa;

use App\Models\Despesa;
use App\Models\ProdutoVenda;
use App\Repositories\Contracts\Despesa\DespesaRepositoryInterface;
use App\Repositories\Eloquent\AbstractRepository;
use App\Utils\Tools;
use Illuminate\Http\Request;

class DespesaRepository extends AbstractRepository implements DespesaRepositoryInterface
{
    /**
     * @var Despesa
     */
    protected $model = Despesa::class;

    /**
     * @var Tools
     */
    protected $tools = Tools::class;

    public function index($queryParams)
    {
        if (isset($queryParams['despesa']) && $queryParams['despesa'] == 'true') {
            
            if (isset($queryParams['date'])) {
                $date = $this->filterDate($queryParams['date']);
                $model = Despesa::whereBetween('data', [$date['inicio'], $date['fim']])->where('despesa', '=', 1)->orderBy('created_at', 'desc')->get();
            
                
            } else {
                $date = $this->dateMonth();
                $model = Despesa::whereBetween('data', [$date['inicio'], $date['fim']])->where('despesa', '=', 1)->orderBy('created_at', 'desc')->get();

            }
            
        } else {
            
            if (isset($queryParams['date'])) {
                $date = $this->filterDate($queryParams['date']);
                $model = Despesa::whereBetween('data', [$date['inicio'], $date['fim']])->where('despesa', '=', 0)->orderBy('created_at', 'desc')->get();
                
            } else {
                $date = $this->dateMonth();
                $model = Despesa::whereBetween('data', [$date['inicio'], $date['fim']])->where('despesa', '=', 0)->orderBy('created_at', 'desc')->get();
            }
        }
        
        if (!$model) {
            return ['message' => 'Falha ao processar as despesas!', 'code' => 500];
        }

        $saldo = $this->tools->calcularSaldo($model);

        return [
            'response' => $model, 
            'saldo' => $saldo, 
            'date' => is_null($date['inicio'])? date('Y-m-d') : $date['inicio'] 
        ];
    }

    public function movimentacao()
    {
        $despesas = Despesa::where('created_at', 'LIKE', '%' . $this->dateNow() . '%')->get();
        if (!$despesas) {
            return ['message' => 'Falha ao processar as despesas!', 'code' => 500];
        }

        $vendas = ProdutoVenda::where('created_at', 'LIKE', '%' . $this->dateNow() . '%')->orderBy('created_at', 'desc')->get()->groupBy('venda_id');
        if (!$vendas) {
            return ['message' => 'Falha ao processar as vendas!', 'code' => 500];
        }

        return ['despesas' => $despesas, 'vendas' => $vendas];
    }

    public function create($dados)
    {
        if (!$dados['data']) {
            $dados['data'] = $this->dateNow();
        }

        $res = Despesa::create($dados);

        if (!$res->save()) {
            return ['message' => 'Falha ao cadastrar despesa!', 'code' => 500];
        }

        return $res;
    }
}