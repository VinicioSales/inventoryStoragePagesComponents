import { Component } from '@angular/core';

import { TemaService } from '../../services/tema.service';




@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  public imgSrc?: string;
  private imgTemaClaro: string = 'assets/img/logo-parceiro-vertical-preto-1.png';
  private imgTemaEscuro: string = 'assets/img/imgogo-parceiro-vertical-branco-1.png';
  
  

  
  constructor(private temaService: TemaService) {
    this.atualizarImg();

    // Escute as mudanças do tema
    this.temaService.temaEscuroLigado$.subscribe(estaEscuro => {
      this.atualizarImg();
    });
  }

  //NOTE - atualizarImg
  atualizarImg() {
    this.imgSrc = this.temaService.temaEscuroLigado ? this.imgTemaEscuro : this.imgTemaClaro;
  }


  
  nomeValue: string = ''; 

  onNomeValueChanged(newValue: string) {
    // Esta função será acionada quando o valor do input de nome mudar
    this.nomeValue = newValue;
    
    const hasNumbers = /\d/.test(newValue);
    if (hasNumbers) {
      alert("Por favor, insira apenas letras e espaços no nome."); // Exibe o alerta se houver números
    }
  }
  
  

}
