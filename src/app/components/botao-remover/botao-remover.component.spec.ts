import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BotaoRemoverComponent } from './botao-remover.component';
import { TemaService } from '../../services/tema.service';
import { BehaviorSubject } from 'rxjs';

describe('BotaoRemoverComponent', () => {
  let component: BotaoRemoverComponent;
  let fixture: ComponentFixture<BotaoRemoverComponent>;
  let temaServiceMock: Partial<TemaService> & { _temaEscuroLigado: BehaviorSubject<boolean> };

  beforeEach(() => {
    temaServiceMock = {
      _temaEscuroLigado: new BehaviorSubject<boolean>(false),
      temaEscuroLigado$: new BehaviorSubject<boolean>(false),
    };

    TestBed.configureTestingModule({
      declarations: [BotaoRemoverComponent],
      providers: [{ provide: TemaService, useValue: temaServiceMock }]
    });
    fixture = TestBed.createComponent(BotaoRemoverComponent);
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
      expect(component.imgSrc).toBe('assets/img/remover-light-mode.png');
    });
  });
  //!SECTION




  //SECTION - onHover
  describe('onHover', () => {
    //NOTE - deve mudar imgSrc para a imagem de hover quando chamado
    it('deve mudar imgSrc para a imagem de hover quando chamado', () => {
      component.onHover();
      expect(component.imgSrc).toBe('assets/img/remover-hover.png');
    });
  });
  //!SECTION





  //SECTION - onLeave
  describe('onLeave', () => {
    //NOTE - deve chamar atualizarImg quando chamado
    it('deve chamar atualizarImg quando chamado', () => {
      spyOn(component, 'atualizarImg');
      component.onLeave();
      expect(component.atualizarImg).toHaveBeenCalled();
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
