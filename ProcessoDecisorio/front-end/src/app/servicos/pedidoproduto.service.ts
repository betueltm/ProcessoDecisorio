import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PedidoProduto } from '../model/pedidoproduto';

@Injectable({
  providedIn: 'root'
})
export class PedidoprodutoService {
  private readonly url: string = "http://localhost:5000/api/pedidoproduto";
  private readonly cabecalho: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json, charset=utf-8' });
  private readonly parametros: HttpParams = new HttpParams({ });
  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<PedidoProduto[]>(this.url,{ headers: this.cabecalho, params: this.parametros });
  }
}
