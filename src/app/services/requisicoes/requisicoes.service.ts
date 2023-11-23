import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produtos, Produto } from 'src/models/produto/produto.models'
import { PdfResponse } from 'src/models/pdf-response/pdf-response.models'
import { urlBackend, rotaProdutos, rotaPdf, rotaSolicitacao } from 'src/app/static'


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
  getProdutos(): Observable<Produtos[]> {
    return this.http.get<Produtos[]>(`${urlBackend}${rotaProdutos}`);
  }

  //NOTE - getPdf
  getPdf(dadosSolicitacao: Object) {
    return this.http.post<PdfResponse>(`${urlBackend}${rotaPdf}`, {dadosSolicitacao});
  }

}
