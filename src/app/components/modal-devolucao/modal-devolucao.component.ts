import { Router } from '@angular/router';
import { Component, OnInit, } from '@angular/core';
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
  nomeProduto: string = 'Lorem ipsum dolor sit amet';
  centroCusto: string = 'Centro';
  codigoProduto: string = '123456';
  unidadeMedida: string = 'Kg';
  quantidadeProduto: number = 0;
  codigoSolicitacao: string = '123456';

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
