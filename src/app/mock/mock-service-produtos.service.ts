import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class MockServiceProdutosService {

  constructor() { }

  getProdutos(): Observable<any> {
    const produtosSimulados = [
      {codigoProduto: "12345", nomeProduto: "Nome Produto1", centroCusto: ["Centro Custo 1", "Centro Custo 1"], unidadeMedida: ["Kg", "Uni"], valor: "100.10"},
      {codigoProduto: "12346", nomeProduto: "Nome Produto2", centroCusto: ["Centro Custo 2", "Centro Custo 2"], unidadeMedida: ["Kg", "Uni"], valor: "100.10"},
      {codigoProduto: "12347", nomeProduto: "Nome Produto3", centroCusto: ["Centro Custo 3", "Centro Custo 3"], unidadeMedida: ["Kg", "Uni"], valor: "100.10"},
      {codigoProduto: "12348", nomeProduto: "Nome Produto4", centroCusto: ["Centro Custo 4", "Centro Custo 4"], unidadeMedida: ["Kg", "Uni"], valor: "100.10"},
    ];

    return of(produtosSimulados);
  }
}
