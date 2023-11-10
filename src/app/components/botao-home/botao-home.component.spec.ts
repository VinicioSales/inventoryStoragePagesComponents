import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BotaoHomeComponent } from './botao-home.component';
import { TemaService } from '../../services/tema.service';
import { BehaviorSubject } from 'rxjs';

describe('BotaoHomeComponent', () => {
  let component: BotaoHomeComponent;
  let fixture: ComponentFixture<BotaoHomeComponent>;
  let temaServiceMock: Partial<TemaService> & { _temaEscuroLigado: BehaviorSubject<boolean> };

  beforeEach(() => {
    temaServiceMock = {
      _temaEscuroLigado: new BehaviorSubject<boolean>(false),
      temaEscuroLigado$: new BehaviorSubject<boolean>(false),
      // Aqui você pode adicionar outros métodos e propriedades do serviço, se necessário
    };

    TestBed.configureTestingModule({
      declarations: [BotaoHomeComponent],
      providers: [{ provide: TemaService, useValue: temaServiceMock }]
    });
    fixture = TestBed.createComponent(BotaoHomeComponent);
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
      expect(component.imgSrc).toBe('assets/img/home-light-mode.png');
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
