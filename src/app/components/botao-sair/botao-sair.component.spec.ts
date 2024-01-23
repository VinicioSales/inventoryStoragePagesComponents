import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BotaoSairComponent } from './botao-sair.component';
import { TemaService } from 'src/app/services/tema.service';
import { BehaviorSubject } from 'rxjs';

describe('BotaoSairComponent', () => {
  let component: BotaoSairComponent;
  let fixture: ComponentFixture<BotaoSairComponent>;
  let temaServiceMock: Partial<TemaService> & { _temaEscuroLigado: BehaviorSubject<boolean> };

  beforeEach(() => {
    temaServiceMock = {
      _temaEscuroLigado: new BehaviorSubject<boolean>(false),
      temaEscuroLigado$: new BehaviorSubject<boolean>(false),
      //... (outros métodos e propriedades do serviço, se necessário)
    };

    TestBed.configureTestingModule({
      declarations: [BotaoSairComponent],
      providers: [{ provide: TemaService, useValue: temaServiceMock }]
    });
    fixture = TestBed.createComponent(BotaoSairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //SECTION - atualizarImg
  describe('atualizarImg', () => {
    //NOTE - deve definir imgSrc para o modo claro quando o tema escuro estiver desativado
    it('deve definir imgSrc para o modo claro quando o tema escuro estiver desativado', () => {
      temaServiceMock._temaEscuroLigado.next(false);
      component.atualizarImg();
      expect(component.imgSrc).toBe('assets/img/exit-light-mode.png');
    });
  });
  //!SECTION





  //SECTION - onHover
  describe('onHover', () => {
    it('deve mudar imgSrc para a imagem de hover quando chamado', () => {
      component.onHover();
      expect(component.imgSrc).toBe('assets/img/exit-hover.png');
    });
  });
  //!SECTION




  //SECTION - onLeave
  describe('onLeave', () => {
    it('deve chamar atualizarImg quando chamado', () => {
      spyOn(component, 'atualizarImg');
      component.onLeave();
      expect(component.atualizarImg).toHaveBeenCalled();
    });
  });
  //!SECTION




  //SECTION - onClick
  describe('onClick', () => {
    it('deve emitir o evento botaoClicado quando chamado', () => {
      spyOn(component.botaoClicado, 'emit');
      component.onClick();
      expect(component.botaoClicado.emit).toHaveBeenCalled();
    });
  });
  //!SECTION 
});
