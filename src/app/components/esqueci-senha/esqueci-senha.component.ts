import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';
import { ModalService } from 'src/app/services/modal/modal.service'


@Component({
  selector: 'app-esqueci-senha',
  templateUrl: './esqueci-senha.component.html',
  styleUrls: ['./esqueci-senha.component.css']
})
export class EsqueciSenhaComponent {
  constructor(
    private authService: AuthService,
    public modalService: ModalService,
  ) {}

  
  valorEmail: string = '';
  carregando: boolean = false;
  mostrarModal: boolean = false;


  //NOTE - handleFecharModal
  handleFecharModal() {
    this.mostrarModal = false;
  }

  //NOTE - onValorInputChange
  onValorInputChange(novoValor: string) {
    this.valorEmail = novoValor;
  }


  //NOTE - onRecuperarSenha
  onRecuperarSenha() {
    this.carregando = true;
    this.authService.recuperarSenha(this.valorEmail!).subscribe({
      next: (response) => {
      this.modalService.exibirMensagemModal(`Token de recuperação enviado para o email ${this.valorEmail}`);

        this.carregando = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error(error.error.message);
        this.modalService.exibirMensagemModal(error.error.message);

        this.carregando = false;
      }
    });
  }
}
