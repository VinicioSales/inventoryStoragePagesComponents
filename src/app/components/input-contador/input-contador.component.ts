import { Subscription } from 'rxjs';
import { TemaService } from 'src/app/services/tema.service'
import { ImagemService } from 'src/app/services/imagem.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-input-contador',
  templateUrl: './input-contador.component.html',
  styleUrls: ['./input-contador.component.css']
})
export class InputContadorComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
    this.subscription.add(
      this.temaService.temaEscuroLigado$.subscribe(() => {
        this.atualizarImg();
      })
    );
  }
  private subscription = new Subscription();

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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  //NOTE - atualizarImg
  atualizarImg() {
    this.imgSrc = this.imagemService.atualizarImg(this.imgTemaClaro, this.imgTemaEscuro);
  }

}
