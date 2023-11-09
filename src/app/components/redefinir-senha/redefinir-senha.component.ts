import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-redefinir-senha',
  templateUrl: './redefinir-senha.component.html',
  styleUrls: ['./redefinir-senha.component.css']
})
export class RedefinirSenhaComponent {
  @Input() mensagemModal: string = '';

  valorNovaSenha: string = '';
  mostrarModal: boolean = false;
  valorConfirmarNovaSenha: string = '';


  //NOTE - handleFecharModal
  handleFecharModal() {
    this.mostrarModal = false;
  }

  //NOTE - onValorInputChange
  onValorInputChange(novoValor: string, inputId: string) {
    switch (inputId) {
      case 'inputNovaSenha':
        this.valorNovaSenha = novoValor;
        break;
        
      case 'inputConfirmarNovaSenha':
        this.valorConfirmarNovaSenha = novoValor;
        break;
    }
  }

  //NOTE - onRedefinirSenha
  onRedefinirSenha() {
    
  }
}
