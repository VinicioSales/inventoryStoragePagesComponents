import { Component } from '@angular/core';
import { TemaService } from './services/tema.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend-BF';
  background?: string;

  constructor(private temaService: TemaService) {
    this.atualizarBackground();

    // Escute as mudanças do tema
    this.temaService.temaEscuroLigado$.subscribe(estaEscuro => {
      this.atualizarBackground();
    });
  }
  
  atualizarBackground() {
    this.background = this.temaService.temaEscuroLigado ? '#262626' : '#FFF';
  }

}
