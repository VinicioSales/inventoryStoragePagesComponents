import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockProdutosService {
  getProdutos() {
    return [
        {
            codigoSolicitacao: '123456',
            codigoProduto: '00260',
            nomeProduto: 'Resma de papel a4 500 folhas',
            quantidade: '16',
            unidadeMedida: 'UND',
            centroCusto: '3232',
            usuario: 'Mateus',
            data: '11/12/2023'
          },     
          {
            codigoSolicitacao: '654321',
            codigoProduto: '00370',
            nomeProduto: 'Caixa de grampeador 26/6',
            quantidade: '50',
            unidadeMedida: 'CX',
            centroCusto: '3030',
            usuario: 'João',
            data: '11/12/2023'
          },     
          {
            codigoSolicitacao: '753951',
            codigoProduto: '00380',
            nomeProduto: 'Caixa de caneta com 50 unidades',
            quantidade: '2',
            unidadeMedida: 'CX',
            centroCusto: '2595',
            usuario: 'Maria',
            data: '11/12/2023'
          },     
          {
            codigoSolicitacao: '753258',
            codigoProduto: '00910',
            nomeProduto: 'Canetas hidrocor kit 12',
            quantidade: '10',
            unidadeMedida: 'CX',
            centroCusto: '025874',
            usuario: 'Lucas',
            data: '11/12/2023'
          },     
    ];
  }
}
