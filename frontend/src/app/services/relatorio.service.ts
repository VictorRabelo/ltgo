import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({ 
    providedIn: 'root' 
})
export class RelatorioService {
    
    constructor(private http: HttpClient) { }

    getVendas() {
        return this.http.get<any>(`${environment.apiUrl}/relatorios/vendas`).pipe(map(res =>{ return res.response }));
    }

    getEntregas() {
        return this.http.get<any>(`${environment.apiUrl}/relatorios/entregas`).pipe(map(res =>{ return res.response }));
    }

    getEntregaDetalhes(id: number) {
        return this.http.get<any>(`${environment.apiUrl}/relatorios/entrega-detalhes/${id}`).pipe(map(res =>{ return res.response }));
    }

    getEstoque() {
        return this.http.get<any>(`${environment.apiUrl}/relatorios/estoque`).pipe(map(res =>{ return res.response }));
    }

    getVendidos() {
        return this.http.get<any>(`${environment.apiUrl}/relatorios/vendidos`).pipe(map(res =>{ return res.response }));
    }

    getClientes() {
        return this.http.get<any>(`${environment.apiUrl}/relatorios/clientes`).pipe(map(res =>{ return res.response }));
    }
    
    getCatalogo(queryParams: any = {}): Observable<Blob> {
        return this.http.get(`${environment.apiUrl}/relatorios/catalogo`, { params: queryParams, responseType: 'blob' });
    }
    
    getVendaAReceber(id: number) {
        return this.http.get<any>(`${environment.apiUrl}/relatorios/venda-areceber/${id}`).pipe(map(res =>{ return res.response }));
    }

}
