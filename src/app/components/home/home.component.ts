import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @Input() mensagemModal: string = '';
  
  mostrarModal: boolean = false;

  //NOTE - handleFecharModal
  handleFecharModal() {
    this.mostrarModal = false;
  }

  //NOTE - navegarRotaSolicitarProdutos
  navegarRotaSolicitarProdutos() {
  }
  
  //NOTE - navegarRotaDevolverProdutos
  navegarRotaDevolverProdutos() {
  }
  
  //NOTE - onNotion
  onNotion() {
  }
}
