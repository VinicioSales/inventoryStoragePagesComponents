import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produtos, Produto, ProdutoDevolucao } from 'src/models/produto/produto.models'
import { PdfResponse } from 'src/models/pdf-response/pdf-response.models'
import { urlBackend, rotaProdutos, rotaPdf, rotaSolicitacao, rotaDevolucaoProdutos, rotaPdfDevolucao } from 'src/app/static'


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
  
  //NOTE - getPdfDevolucao
  getPdfDevolucao(dadosDevolucao: Object) {
    return this.http.post<PdfResponse>(`${urlBackend}${rotaPdfDevolucao}`, {dadosDevolucao});
  }

  //NOTE - revolverProdutos
  devolverProdutos(dados: { produtos: ProdutoDevolucao[]; observacoes: string; nomeUsuario: string; }): Observable<any> {
    return this.http.post<any>(`${urlBackend}${rotaDevolucaoProdutos}`, dados);
  }

  //NOTE - Devolução de produto
  getProdutosDevolucao(){
    return this.http.get<ProdutoDevolucao[]>(`${urlBackend}${rotaDevolucaoProdutos}`);
  }


}
