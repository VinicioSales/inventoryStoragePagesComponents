import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service'
import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  @Input() mensagemModal: string = '';
  
  mostrarModal: boolean = false;

  //NOTE - handleFecharModal
  handleFecharModal() {
    this.mostrarModal = false;
  }

  //NOTE - onLogout
  onLogout() {
    this.authService.logout();
  }

  //NOTE - navegarRotaSolicitarProdutos
  navegarRotaSolicitarProdutos() {
    this.router.navigate(['/solicitar-produtos']);
  }
  
  //NOTE - navegarRotaDevolverProdutos
  navegarRotaDevolverProdutos() {
    this.router.navigate(['/devolver-produtos']);
  }
  
  //FIXME - ADICIONAR LINK DO NOTION
  //NOTE - onNotion
  onNotion() {
    window.open('https://www.google.com/', '_blanc');
  }
}
