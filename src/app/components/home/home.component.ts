import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(
    private router: Router,
  ) {}

  @Input() mensagemModal: string = '';
  
  mostrarModal: boolean = false;

  //NOTE - handleFecharModal
  handleFecharModal() {
    this.mostrarModal = false;
  }

  //NOTE - onLogout
  onLogout() {

  }

  //NOTE - navegarRotaSolicitarProdutos
  navegarRotaSolicitarProdutos() {
    this.router.navigate(['/solicitar-produtos']);
  }
  
  //NOTE - navegarRotaDevolverProdutos
  navegarRotaDevolverProdutos() {
    this.router.navigate(['/devolver-produtos']);
  }
  
  //NOTE - onNotion
  onNotion() {
  }
}
