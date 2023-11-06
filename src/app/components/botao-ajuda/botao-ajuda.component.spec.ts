import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BotaoAjudaComponent } from './botao-ajuda.component';
import { TemaService } from '../../services/tema.service';
import { BehaviorSubject } from 'rxjs';

describe('BotaoAjudaComponent', () => {
  let component: BotaoAjudaComponent;
  let fixture: ComponentFixture<BotaoAjudaComponent>;
  let temaServiceMock: Partial<TemaService> & { _temaEscuroLigado: BehaviorSubject<boolean> };

  beforeEach(() => {
    temaServiceMock = {
      _temaEscuroLigado: new BehaviorSubject<boolean>(false),
      temaEscuroLigado$: new BehaviorSubject<boolean>(false),
    };

    TestBed.configureTestingModule({
      declarations: [BotaoAjudaComponent],
      providers: [{ provide: TemaService, useValue: temaServiceMock }]
    });

    fixture = TestBed.createComponent(BotaoAjudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //SECTION - atualizarImg
  describe('atualizarImg', () => {
    //NOTE - deve definir imgSrc corretamente independente do tema
    it('deve definir imgSrc corretamente independente do tema', () => {
      temaServiceMock._temaEscuroLigado.next(false);
      component.atualizarImg();
      expect(component.imgSrc).toBe('assets/img/ajuda.png');

      temaServiceMock._temaEscuroLigado.next(true);
      component.atualizarImg();
      expect(component.imgSrc).toBe('assets/img/ajuda.png');
    });
  });
  //!SECTION

  //SECTION - onClick
  describe('onClick', () => {
    //NOTE - deve emitir o evento botaoClicado quando chamado
    it('deve emitir o evento botaoClicado quando chamado', () => {
      spyOn(component.botaoClicado, 'emit');
      component.onClick();
      expect(component.botaoClicado.emit).toHaveBeenCalled();
    });
  });
  //!SECTION
});
