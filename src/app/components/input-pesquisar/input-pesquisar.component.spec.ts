import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TemaService } from '../../services/tema.service';
import { ImagemService } from 'src/app/services/imagem.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputPesquisarComponent } from './input-pesquisar.component';

describe('InputPesquisarComponent', () => {
  let component: InputPesquisarComponent;
  let fixture: ComponentFixture<InputPesquisarComponent>;
  let temaService: TemaService;
  let imagemService: ImagemService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [InputPesquisarComponent],
      providers: [
        { provide: TemaService, useValue: { temaEscuroLigado$: { subscribe: jasmine.createSpy() } } },
        { provide: ImagemService, useValue: { atualizarImg: jasmine.createSpy() } },
      ],
    });

    fixture = TestBed.createComponent(InputPesquisarComponent);
    component = fixture.componentInstance;
    temaService = TestBed.inject(TemaService);
    imagemService = TestBed.inject(ImagemService);

    fixture.detectChanges();
  });

  it('deve criar', () => {
    expect(component).toBeTruthy();
  });

  //SECTION - atualizarImg
  describe('atualizarImg', () => {
    it('deve atualizar a imagem quando o componente é criado', () => {
      expect(imagemService.atualizarImg).toHaveBeenCalled();
    });
  })
  //!SECTION




  //SECTION - onInputFocus
  describe('onInputFocus', () => {
    it('deve adicionar a classe "focused" quando o input recebe o foco', () => {
      const div = fixture.debugElement.query(By.css('.container-input-pesquisar')).nativeElement;
      component.onInputFocus(div);
      expect(div.classList).toContain('focused');
    });
  })
  //!SECTION  
  
  
  
  //SECTION - onInputBlur
  describe('onInputBlur', () => {
    it('deve remover a classe "focused" quando o input perde o foco', () => {
      const div = fixture.debugElement.query(By.css('.container-input-pesquisar')).nativeElement;
      div.classList.add('focused');
      component.onInputBlur(div);
      expect(div.classList).not.toContain('focused');
    });
  })
  //!SECTION
  
  


  //SECTION - onPesquisar
  describe('onPesquisar', () => {
    it('deve emitir o evento "enviarPesquisa" com o valor da pesquisa', () => {
      spyOn(component.enviarPesquisa, 'emit');
      component.pesquisa = 'testando';
      component.onPesquisar();
      expect(component.enviarPesquisa.emit).toHaveBeenCalledWith('testando');
    });
  })
  //!SECTION



  //SECTION - ngOnDestroy
  describe('ngOnDestroy', () => {
    it('deve cancelar a subscrição no ngOnDestroy', () => {
      const spy = spyOn(component['subscription'], 'unsubscribe');
      component.ngOnDestroy();
      expect(spy).toHaveBeenCalled();
    });
  })
  
});
