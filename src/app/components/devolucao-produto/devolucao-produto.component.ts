import { Component } from '@angular/core';
import { TemaService } from '../../services/tema.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';



@Component({
  selector: 'app-devolucao-produto',
  templateUrl: './devolucao-produto.component.html',
  styleUrls: ['./devolucao-produto.component.css']
})



export class DevolucaoProdutoComponent {
 
  produtos = [
    {
      codSolicitacao: '001',
      codProduto: 'A123',
      produto: 'Produto 1',
      quantidade: 10,
      uniMedida: 'Un',
      centroCusto: 'CC1',
      usuario: "teste 1",
      data: "24/11/2023"
    },
    {
      codSolicitacao: '002',
      codProduto: 'A321',
      produto: 'Produto 2',
      quantidade: 15,
      uniMedida: 'Un',
      centroCusto: 'FF1',
      usuario: "teste 2",
      data: "25/11/2023"
    },
    
    {
      codSolicitacao: '003',
      codProduto: 'A852',
      produto: 'Produto 3',
      quantidade: 8,
      uniMedida: 'Un',
      centroCusto: 'DD1',
      usuario: "teste 3",
      data: "26/11/2023"
    },
  ];

  filtroProduto: string = '';
  filtroData: string = '';
  filtroUsuario: string = '';

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


    
  
}
