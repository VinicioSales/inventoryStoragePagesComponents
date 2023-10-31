import { Component, Input } from '@angular/core';
import { TemaService } from 'src/app/services/tema.service'
import { ImagemService } from 'src/app/services/imagem.service';

@Component({
  selector: 'app-input-contador',
  templateUrl: './input-contador.component.html',
  styleUrls: ['./input-contador.component.css']
})
export class InputContadorComponent {
  @Input() placeholder: string = 'input';

  imgSrc?: string;
  imgTemaEscuro: string = 'assets/img/dropdown-dark-mode.png';
  imgTemaClaro: string = 'assets/img/dropdown-light-mode.png';

  //NOTE - constructor
  constructor(private temaService: TemaService, private imagemService: ImagemService) {
    this.temaService.temaEscuroLigado$.subscribe(() => {
      this.atualizarImg();
    });
  
    this.atualizarImg();
  }

  //NOTE - atualizarImg
  atualizarImg() {
    this.imgSrc = this.imagemService.atualizarImg(this.imgTemaClaro, this.imgTemaEscuro);
  }

}
