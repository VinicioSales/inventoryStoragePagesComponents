import { Component, OnInit  } from '@angular/core';
import { TemaService } from '../../services/tema.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import { MockProdutosService } from 'src/app/mock-produtos';
import { RequisicoesService } from 'src/app/services/requisicoes/requisicoes.service';
import { ProdutoDevolucao } from 'src/models/produto/produto.models';



@Component({
  selector: 'app-devolucao-produto',
  templateUrl: './devolucao-produto.component.html',
  styleUrls: ['./devolucao-produto.component.css']
})



export class DevolucaoProdutoComponent implements OnInit{

  produtos: ProdutoDevolucao[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private mockProdutosService: MockProdutosService,
    private requisicoesService: RequisicoesService,
    ) {
    
  }

  //NOTE - Rota home
  navegarParaHome() {
    this.router.navigate(['/home']); 
  }
 
  filtroProduto: string = '';
  filtroData: string = '';
  filtroUsuario: string = '';
  mostrarModal: boolean = false;
  dadosProdutos: any = '' 
  // produtos: any = ''
  mostrarModalDevolucao: boolean = false;
  mostrarModalAviso: boolean = false;
  mensagemModal: string = 'Por favor, selecione ao menos um produto para devolução.'

  ngOnInit(){
    // this.produtos = this.mockProdutosService.getProdutos();
    this.carregarProdutosDevolucao();    
  }  

  carregarProdutosDevolucao() {
    this.requisicoesService.getProdutosDevolucao().subscribe(
      (produtos: ProdutoDevolucao[]) => {
        this.produtos = produtos;
      },
      error => {
        console.error('Erro ao carregar produtos de devolução', error);
      }
    );
  }



  //NOTE - Método para atualizar o valores dos filtros
  atualizarFiltroProduto(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.filtroProduto = valor;
  }

  atualizarFiltroData(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.filtroData = valor;
  }

  atualizarFiltroUsuario(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.filtroUsuario = valor;
  }

  private normalizarTexto(texto: string): string {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  aplicarFiltros(produto: any): boolean {
    const filtroProdutoNorm = this.normalizarTexto(this.filtroProduto);
    const filtroDataNorm = this.normalizarTexto(this.filtroData);
    const filtroUsuarioNorm = this.normalizarTexto(this.filtroUsuario);
  
    const produtoNorm = this.normalizarTexto(produto.nomeProduto);
    const codProdutoNorm = this.normalizarTexto(produto.codigoProduto);
    const usuarioNorm = this.normalizarTexto(produto.usuario);
    const dataNorm = this.normalizarTexto(produto.data);
  
    return (
      (filtroProdutoNorm ? produtoNorm.includes(filtroProdutoNorm) || codProdutoNorm.includes(filtroProdutoNorm) : true) &&
      (filtroDataNorm ? dataNorm.includes(filtroDataNorm) : true) &&
      (filtroUsuarioNorm ? usuarioNorm.includes(filtroUsuarioNorm) : true)
    );
  }

  //NOTE - Armazena os produtos selecionados
  selectedProdutos: { [key: number]: any } = {};

  onCheckboxChange(produto: any, isChecked: boolean) {
    if (isChecked) {
      // Adiciona o produto ao objeto selectedProdutos
      this.selectedProdutos[produto.codigoProduto] = produto;
    } else {
      // Remove o produto do objeto selectedProdutos
      delete this.selectedProdutos[produto.codigoProduto];
    }
  }
  
  modalDevolucao(event: Event){
    if(Object.keys(this.selectedProdutos).length > 0){
        this.mostrarModal = true;
        const  produtosSelecionados = Object.values(this.selectedProdutos) 
        .map(produto => ({
          "codigoSolicitacao": produto.codigoSolicitacao,
          "codigoProduto": produto.codigoProduto,
          "nomeProduto": produto.nomeProduto,
          "quantidade": produto.quantidade,
          "unidadeMedida": produto.unidadeMedida,
          "centroCusto": produto.centroCusto,
          "usuario": produto.usuario,
          "data": produto.data
        }));
          
      this.dadosProdutos = produtosSelecionados; 

    }else{
      this.mostrarModalAviso = true;
    }
       

  }
    
  modalDevolucaoProdutos(event:Event){
    this.mostrarModalDevolucao = true
  }

  onCancelarModalDevolucao(){
    this.mostrarModal = false
  }

  handleFecharModal(){
    this.mostrarModalAviso = false;
  }



}