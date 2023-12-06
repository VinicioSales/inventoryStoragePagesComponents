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

  ngOnInit(){
    this.produtos = [
      {
        codSolicitacao: '',
        codProduto: '',
        produto: '',
        quantidade: '',
        uniMedida: '',
        centroCusto: '',
        usuario: " ",
        data: ''
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
  
    const produtoNorm = this.normalizarTexto(produto.produto);
    const codProdutoNorm = this.normalizarTexto(produto.codProduto);
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
      this.selectedProdutos[produto.codProduto] = produto;
    } else {
      // Remove o produto do objeto selectedProdutos
      delete this.selectedProdutos[produto.codProduto];
    }
  }
  
  modalDevolucao(event: Event){
    this.mostrarModal = true;
    const  produtosSelecionados = Object.values(this.selectedProdutos) 
    .map(produto => ({
      "codSolicitacao": produto.codSolicitacao,
      "codProduto": produto.codProduto,
      "produto": produto.produto,
      "quantidade": produto.quantidade,
      "uniMedida": produto.uniMedida,
      "centroCusto": produto.centroCusto,
      "usuario": produto.usuario,
      "data": produto.data
    }));
        
    this.dadosProdutos = produtosSelecionados;    

  }
    
  
}
