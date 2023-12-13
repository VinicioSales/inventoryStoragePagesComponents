import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service'
import { Produto, Produtos } from 'src/models/produto/produto.models'
import { PdfResponse } from 'src/models/pdf-response/pdf-response.models'
import { RequisicoesService } from '../../services/requisicoes/requisicoes.service';

import { nomeUsuarioStorage } from 'src/app/static';
import { MockServiceProdutosService } from 'src/app/mock/mock-service-produtos.service'


@Component({
  selector: 'app-modal-devolucao',
  templateUrl: './modal-devolucao.component.html',
  styleUrls: ['./modal-devolucao.component.css']
})
export class ModalDevolucaoComponent {
  backgroundBotaoDevolver: string = 'var(--botao-verde)'
  backgroundBotaoCancelar: string = 'var(--botao-vermelho)'
  backgroundBotaoDevolverHover: string = 'var(--botao-verde-hover)'
  backgroundBotaoCancelarHover: string = 'var(--botao-vermelho-hover)'
  
  @Input() listaProdutosParaDevolucao = [
    {
      nomeProduto: 'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet',
      centroCusto: 'Centro',
      codigoProduto: '123456',
      unidadeMedida: 'Kg',
      quantidadeProduto: 0,
      codigoSolicitacao: '123456',
    },
    {
      nomeProduto: 'Lorem ipsum dolor sit amet',
      centroCusto: 'Centro',
      codigoProduto: '123456',
      unidadeMedida: 'Kg',
      quantidadeProduto: 0,
      codigoSolicitacao: '123456',
    },
    {
      nomeProduto: 'Lorem ipsum dolor sit amet',
      centroCusto: 'Centro',
      codigoProduto: '123456',
      unidadeMedida: 'Kg',
      quantidadeProduto: 0,
      codigoSolicitacao: '123456',
    },
    {
      nomeProduto: 'Lorem ipsum dolor sit amet',
      centroCusto: 'Centro',
      codigoProduto: '123456',
      unidadeMedida: 'Kg',
      quantidadeProduto: 0,
      codigoSolicitacao: '123456',
    },
    {
      nomeProduto: 'Lorem ipsum dolor sit amet',
      centroCusto: 'Centro',
      codigoProduto: '123456',
      unidadeMedida: 'Kg',
      quantidadeProduto: 0,
      codigoSolicitacao: '123456',
    },
  ];

  //NOTE - constructor
  constructor(
    private router: Router,
    public modalService: ModalService,
    private requisicoesService: RequisicoesService,
    public mockServiceProdutosService: MockServiceProdutosService,
  ) {}


  //NOTE - home
  home() {
    this.router.navigate(['/home']);
  }
}
