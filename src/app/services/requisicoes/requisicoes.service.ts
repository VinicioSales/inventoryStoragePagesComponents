import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlBackend, rotaProdutos, rotaPdf, rotaSolicitacao } from 'src/app/services/static'
import { MockServiceProdutosService } from 'src/app/mock/mock-service-produtos.service'


@Injectable({
  providedIn: 'root'
})
export class RequisicoesService {

  constructor(private http: HttpClient) { }

  //NOTE - criarSolicitacao
  criarSolicitacao(dados: any): Observable<any> {
    return this.http.post(`${urlBackend}${rotaSolicitacao}`, { dados });
  }

  //NOTE - getProdutos
  getProdutos(): Observable<any> {
    return this.http.get(`${urlBackend}${rotaProdutos}`);
  }

  //NOTE - getPdf
  getPdf(produtosSelecionados: any) {
    return this.http.post(`${urlBackend}${rotaPdf}`, {produtosSelecionados});
  }

}
