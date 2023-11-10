import { Component } from '@angular/core';
import { TemaService } from './services/tema.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //FIXME - REMOVER TESTES
  background?: string;
  title = 'frontend-BF';
  itens: string[] = ['Item Pai 1', 'Item Pai 2', 'Item Pai 3'];


  constructor(private temaService: TemaService) {
    this.atualizarBackground();

    // Escute as mudanças do tema
    this.temaService.temaEscuroLigado$.subscribe(estaEscuro => {
      this.atualizarBackground();
    });
  }
  
  atualizarBackground() {
    this.background = this.temaService.temaEscuroLigado ? 'var(--background)' : 'var(--background)';
  }

  mostrarModal: boolean = true;
  handleModal() {
    this.mostrarModal = false;
  }

}
