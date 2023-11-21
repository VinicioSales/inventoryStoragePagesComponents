import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produto } from 'src/models/produto/produto.models'
import { PdfResponse } from 'src/models/pdf-response/pdf-response.models'
import { urlBackend, rotaProdutos, rotaPdf, rotaSolicitacao } from 'src/app/services/static'


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
    return this.http.get<Produto>(`${urlBackend}${rotaProdutos}`);
  }

  //NOTE - getPdf
  getPdf(produtosSelecionados: any) {
    return this.http.post<PdfResponse>(`${urlBackend}${rotaPdf}`, {produtosSelecionados});
  }

}
