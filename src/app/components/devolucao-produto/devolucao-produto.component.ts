import { Component, OnInit  } from '@angular/core';
import { TemaService } from '../../services/tema.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';



@Component({
  selector: 'app-devolucao-produto',
  templateUrl: './devolucao-produto.component.html',
  styleUrls: ['./devolucao-produto.component.css']
})



export class DevolucaoProdutoComponent implements OnInit{

  constructor(
    private router: Router,
    private authService: AuthService,
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
  produtos: any = ''
  mostrarModalDevolucao: boolean = false

  ngOnInit(){
    this.produtos = [
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
    ]    
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

  }
    
  modalDevolucaoProdutos(event:Event){
    this.mostrarModalDevolucao = true
  }




}
