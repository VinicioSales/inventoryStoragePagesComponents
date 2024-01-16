import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ModalService } from 'src/app/services/modal/modal.service'

@Component({
  selector: 'app-redefinir-senha',
  templateUrl: './redefinir-senha.component.html',
  styleUrls: ['./redefinir-senha.component.css']
})
export class RedefinirSenhaComponent {
  constructor(    
    private router: Router,
    private authService: AuthService,
    public modalService: ModalService,
  ) {}

  valorNovaSenha: string = '';
  carregando: boolean = false;
  valorCodigoVerificacao: string = '';
  valorConfirmarNovaSenha: string = '';
  corBotao: string = 'var(--cor-botao)';




  //NOTE - onValorInputChange
  onValorInputChange(novoValor: string, inputId: string) {
    switch (inputId) {
      case 'inputNovaSenha':
        this.valorNovaSenha = novoValor;
        break;
        
      case 'inputConfirmarNovaSenha':
        this.valorConfirmarNovaSenha = novoValor;
        break;
      
        case 'inputCodigoVerificacao':
        this.valorCodigoVerificacao = novoValor;
        break;
    }
  }

  //NOTE - validarSenha
  validarSenhas() {
    if (this.valorNovaSenha.length < 8) {
      this.modalService.exibirMensagemModal(ModalService.MENSAGEM_SENHA_CURTA);
      return false;

    } else if (this.valorNovaSenha != this.valorConfirmarNovaSenha) {
      this.modalService.exibirMensagemModal(ModalService.MENSAGEM_SENHAS_DIFERENTES);
      return false;
    }

    return true;
  }

  //NOTE - validarCampos
  validarCampos() {
    if (this.valorNovaSenha.trim() == '' && this.valorConfirmarNovaSenha.trim() == '' && this.valorCodigoVerificacao.trim() == '') {
      this.modalService.exibirMensagemModal(ModalService.MENSAGEM_CAMPOS_VAZIOS);
      return false;
    
    } else if (this.valorNovaSenha.trim() == '') {
      this.modalService.exibirMensagemModal(ModalService.MENSAGEM_NOVA_SENHA_VAZIO);
      return false;

    } else if (this.valorConfirmarNovaSenha.trim() == '') {
      this.modalService.exibirMensagemModal(ModalService.MENSAGEM_CONFIRMAR_NOVA_SENHA_VAZIO);
      return false;

    } else if (this.valorCodigoVerificacao.trim() == '') {
      this.modalService.exibirMensagemModal(ModalService.MENSAGEM_CODIGO_VERIFICACAO_VAZIO);
      return false;
    }

    return true;
  }

  //NOTE - validar
  validar(funcoes: Array<() => boolean>): boolean {
    return funcoes.every(func => func());
  }

  //NOTE - onRedefinirSenha
  onRedefinirSenha() {
    this.carregando = true;
    const validado = this.validar([
      () => this.validarSenhas(),
      () => this.validarCampos()
    ]);
    
    if (validado) {
      this.authService.redefinirSenha(this.valorNovaSenha, this.valorCodigoVerificacao).subscribe({
        next: (response) => {
          this.modalService.exibirMensagemModal(ModalService.MENSAGEM_SENHA_REDEFINIDA);
          this.router.navigate(['/login']);

          this.carregando = false;
        },

        error: (error) => {
          if (error.status === 401) {
            this.modalService.exibirMensagemModal(ModalService.MENSAGEM_CODIGO_VERIFICACAO_INVALIDO);
          
          } else if (error.status === 500) {
            this.modalService.exibirMensagemModal(ModalService.MENSAGEM_ERRO_INTERNO);
          
          } else {
            this.modalService.exibirMensagemModal(`Erro desconhecido: ${error}`);
          }

          this.carregando = false;
        }
      })
    }
  }
}
