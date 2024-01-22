import { FormsModule } from '@angular/forms';
import { InputSenhaComponent } from './input-senha.component';
import { TemaService } from 'src/app/services/tema.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';


describe('InputSenhaComponent', () => {
  let component: InputSenhaComponent;
  let fixture: ComponentFixture<InputSenhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
      ],
      declarations: [InputSenhaComponent],
      providers: [TemaService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Testes de Inputs e Outputs', () => {
    it('deve emitir evento valorChange ao chamar onValorChange', () => {
      spyOn(component.valorChange, 'emit');
      const valorTeste = 'teste';
      component.onValorChange(valorTeste);
      expect(component.valorChange.emit).toHaveBeenCalledWith(valorTeste);
    });
  });

  describe('Testes de Alteração de Imagem', () => {
    it('deve alternar a fonte da imagem ao chamar onClickVizualizacao', () => {
      component.mostrarSenha = false;
      component.onClickVizualizacao();
      // Assumindo tema claro como padrão
      const imgVisivelTemaClaro = 'assets/img/botao-visivel-light-mode.png';
      expect(component.imgSrc).toEqual(imgVisivelTemaClaro);
    });
  });

  describe('Testes de Emissão de Eventos', () => {
    it('deve emitir evento mudarVizualizacaoSenha ao chamar onClickVizualizacao', () => {
      spyOn(component.mudarVizualizacaoSenha, 'emit');
      component.onClickVizualizacao();
      expect(component.mudarVizualizacaoSenha.emit).toHaveBeenCalled();
    });
  });
  
  
});