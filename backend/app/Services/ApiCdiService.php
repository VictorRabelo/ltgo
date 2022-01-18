<?php

namespace App\Services;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

use App\Resolvers\ApiCdiResolverInterface;

class ApiCdiService implements ApiCdiResolverInterface
{
    private $baseApi = 'http://0.0.0.0:8888/api/v1/app';

    public function authLogin($credentials){
        $response = Http::post($this->baseApi.'/oauth/login', [
            'login' => $credentials['login'],
            'password' => $credentials['password']
        ]);
        
        return $response->json()['token']['accessToken'];
    }

    public function getVendas($queryParams, $date){
        $response = Http::get($this->baseApi.'/vendas', [
            'app' => $queryParams['app'],
            'userId' => Auth::user()->id,
            'date' => $date,
        ]);
        return $response->json()['response'];
    }

    public function getEntregas($queryParams){

    }
    
    public function getByIdVendas($queryParams){

    }

    public function getByIdEntregas($queryParams){

    }
    
    public function postVendas($queryParams){
        $response = Http::post($this->baseApi.'/vendas', [
            'app' => $queryParams['app'],
            'userId' => Auth::user()->id
        ]);
        return $response->json()['response'];
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