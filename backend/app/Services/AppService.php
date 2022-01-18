<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;

use App\Repositories\Eloquent\AbstractRepository;
use App\Models\Venda;
use App\Models\User;
use App\Resolvers\ApiCdiResolverInterface;
use App\Resolvers\AppResolverInterface;
use App\Utils\Messages;
use App\Utils\Tools;

class AppService extends AbstractRepository implements AppResolverInterface
{
    /**
     * @var Messages
     */
    protected $messages = Messages::class;

    /**
     * @var Tools
     */
    protected $tools = Tools::class;

    /**
     * @var ApiCdiResolverInterface
     */
    protected $baseApi = ApiCdiResolverInterface::class;

    public function authLogin($credentials){
        unset($credentials['app']);
        
        $tokenApi = $this->baseApi->authLogin($credentials);
        
        if (auth()->attempt($credentials)) {
                
            $user = auth()->user();
            $userCurrent = User::where('id', $user->id)->first();
                    
            if($tokenApi) {
                $userCurrent->update(['tokenApi' => $tokenApi]);
            }

            $userRole = $user->role()->first();
            $user->role = $userRole->role;
            $token = $user->createToken(env('AUTH_TOKEN'), [$userRole->role]);
            $user->token = $token->accessToken;

            return [
                'token' => $token, 
                'user' => $user
            ];
        }
    }

    public function getVendas($queryParams, $date){
        
        $response = $this->baseApi->getVendas($queryParams, $date);
        $userId = Auth::user()->id;

        if(isset($queryParams['date'])) {
            if($queryParams['date'] == 0){
                $dados = Venda::with('produto', 'cliente', 'vendedor')->where('vendedor_id', $userId)->orderBy('id_venda', 'desc')->get()->toArray();
            } else {
                $date = $this->dateFilter($queryParams['date']);
                $dados = Venda::with('produto', 'cliente', 'vendedor')->where('vendedor_id', $userId)->whereBetween('created_at', [$date['inicio'], $date['fim']])->orderBy('id_venda', 'desc')->get()->toArray();
            }

        } else {
            $date = $this->dateMonth();
            $dados = Venda::with('produto', 'cliente', 'vendedor')->where('vendedor_id', $userId)->whereBetween('created_at', [$date['inicio'], $date['fim']])->orderBy('id_venda', 'desc')->get()->toArray();
        }

        $countVendasCdi = count($response['vendas']);
        $countVendasLtgo = count($dados);
        var_dump($countVendasCdi);
        var_dump($countVendasLtgo);
        if($countVendasCdi > 0){
            foreach ($response['vendas'] as $value) {
                $value['typeApi'] = 'cdi';
            }
        }
        
        $resultCalculos = array();
        if($countVendasLtgo > 0){
            $resultCalculos = $this->tools->calculoVendaApp($dados);
            foreach ($dados as $value) {
                $value->typeApi = 'ltgo';
            }
        }

        $dataSource = array();

        if($countVendasLtgo > 0 && $countVendasCdi == 0){
            $dadosComplicated = $this->tools->calculoVenda($response['vendas']);
            array_push($dataSource, $dadosComplicated);
            return $dataSource[0];

        }
        
        if($countVendasCdi > 0 && $countVendasLtgo == 0){
            var_dump($dados);
            $dadosComplicated = $this->tools->calculoVenda($dados);
            return $dadosComplicated;
        }

        if($countVendasCdi > 0 && $countVendasLtgo > 0){
            $dataSource['vendas'] = array_merge($response['vendas'], $dados);
            $resultCalculosApp = $this->tools->somatoriaGeralVendasApp($resultCalculos, $response);
            array_push($dataSource, $resultCalculosApp);
        }

        return $dataSource;
    }

    public function getEntregas($queryParams){

    }
    
    public function getByIdVendas($queryParams){

    }

    public function getByIdEntregas($queryParams){

    }
    
    public function postVendas($queryParams){
        $resultConnection = $this->baseApi->postVendas($queryParams);
        
        $dataSource = array();
        $dataSource['typeApi'] = 'cdi';
        
        array_push($dataSource['dados'], $resultConnection);

        return $dataSource;
    }

    public function postEntregas($request){

    }
    
    public function putVendas($request){

    }

    public function putEntregas($request){

    }
    
    public function deleteVendas($request){

    }

    public function deleteEntregas($request) {

    }
}