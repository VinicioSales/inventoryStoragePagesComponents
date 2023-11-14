import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class MockServiceProdutosService {

  constructor() { }

  getProdutos(): Observable<any> {
    const produtosSimulados = [
      {codigo_produto: "12345", nome_produto: "Nome Produto1", centro_custo: ["Centro Custo 1", "Centro Custo 1"], unidade_medida: ["Kg", "Uni"], valor: "100.10"},
      {codigo_produto: "12346", nome_produto: "Nome Produto2", centro_custo: ["Centro Custo 2", "Centro Custo 2"], unidade_medida: ["Kg", "Uni"], valor: "100.10"},
      {codigo_produto: "12347", nome_produto: "Nome Produto3", centro_custo: ["Centro Custo 3", "Centro Custo 3"], unidade_medida: ["Kg", "Uni"], valor: "100.10"},
      {codigo_produto: "12348", nome_produto: "Nome Produto4", centro_custo: ["Centro Custo 4", "Centro Custo 4"], unidade_medida: ["Kg", "Uni"], valor: "100.10"},
    ];

    return of(produtosSimulados);
  }
}
