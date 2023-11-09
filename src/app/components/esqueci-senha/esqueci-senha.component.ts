import { Component, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';


@Component({
  selector: 'app-esqueci-senha',
  templateUrl: './esqueci-senha.component.html',
  styleUrls: ['./esqueci-senha.component.css']
})
export class EsqueciSenhaComponent {
  constructor(
    private authService: AuthService,
  ) {}

  
  @Input() mensagemModal: string = '';

  valorEmail: string = '';
  mostrarModal: boolean = false;


  //NOTE - handleFecharModal
  handleFecharModal() {
    this.mostrarModal = false;
  }

  //NOTE - onValorInputChange
  onValorInputChange(novoValor: string) {
    this.valorEmail = novoValor;
  }

  //NOTE - exibirMensagemModal
  exibirMensagemModal(mensagem: string): void {
    this.mostrarModal = true;
    this.mensagemModal = mensagem;
  }

  //NOTE - onRecuperarSenha
  onRecuperarSenha() {
    this.authService.recuperarSenha(this.valorEmail!).subscribe({
      next: (response) => {
        this.exibirMensagemModal(`Token de recuperação enviado para o email ${this.valorEmail}`)
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.exibirMensagemModal('Email não encontrado');
        } else {
          this.exibirMensagemModal(`Erro desconhecido: ${error.message}`);
        }
      }
    });
  }
}
