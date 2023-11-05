import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FormaPagamentoService {

    baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getAll(queryParams: any = {}) {
        let params

        if (queryParams.date) {
            params = new HttpParams().set('date', queryParams.date);
        }

        if (queryParams.aReceber) {
            params = new HttpParams().set('aReceber', queryParams.aReceber);
        }

        return this.http.get<any>(`${this.baseUrl}/forma-pagamento`, { params: params }).pipe(map(res => { return res.response }));
    }

    getById(id: number) {
        return this.http.get<any>(`${this.baseUrl}/forma-pagamento/${id}`);
    }

    store(store: any) {
        return this.http.post<any>(`${this.baseUrl}/forma-pagamento`, store).pipe(map(res => { return res.response }));
    }

    finishSale(dados: any) {
        return this.http.post<any>(`${this.baseUrl}/forma-pagamento/finish`, dados);
    }

    update(id: number, update: any) {
        return this.http.put<any>(`${this.baseUrl}/forma-pagamento/${id}`, update);
    }

    delete(id: number, queryParams: any = {}) {
        return this.http.delete<any>(`${this.baseUrl}/forma-pagamento/${id}`, { params: queryParams });
    }

    //itens
    createItem(dados: any) {
        return this.http.post<any>(`${this.baseUrl}/forma-pagamento/item`, dados);
    }
    getItemById(id) {
        return this.http.get<any>(`${this.baseUrl}/forma-pagamento/item/${id}`);
    }
    updateItem(id, dados) {
        return this.http.put<any>(`${this.baseUrl}/forma-pagamento/item/${id}`, dados);
    }
    deleteItem(id) {
        return this.http.delete<any>(`${this.baseUrl}/forma-pagamento/item/${id}`);
    }
}
