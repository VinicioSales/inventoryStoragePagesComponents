import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputContadorComponent } from './input-contador.component';

describe('InputContadorComponent', () => {
  let component: InputContadorComponent;
  let fixture: ComponentFixture<InputContadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [InputContadorComponent]
    });
    fixture = TestBed.createComponent(InputContadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //SECTION - onDiminuir
  describe('onDiminuir', () => {
    //NOTE - deve decrementar o valor quando valor > 0
    it('deve decrementar o valor quando valor > 0', () => {
      component.valor = 5;
      component.onDiminuir();
      expect(component.valor).toBe(4);
    });
  
    //NOTE - não deve alterar o valor quando valor = 0
    it('não deve alterar o valor quando valor = 0', () => {
      component.valor = 0;
      component.onDiminuir();
      expect(component.valor).toBe(0);
    });
  
    //NOTE - não deve alterar o valor quando valor < 0
    it('não deve alterar o valor quando valor < 0', () => {
      component.valor = -1;
      component.onDiminuir();
      expect(component.valor).toBe(0);
    });
  
    //NOTE - deve definir o valor como 0 se o valor atual não for um número
    it('deve definir o valor como 0 se o valor atual não for um número', () => {
      component.valor = 'abc' as any;
      component.onDiminuir();
      expect(component.valor).toBe(0);
    });
  });
  
  //!SECTION

  //SECTION - onAumentar
  describe('onAumentar', () => {
    //NOTE - deve incrementar o valor
    it('deve incrementar o valor', () => {
      component.valor = 0;
      component.onAumentar();
      expect(component.valor).toBe(1);
    });
  
    //NOTE - deve definir o valor como 1 se o valor atual não for um número
    it('deve definir o valor como 1 se o valor atual não for um número', () => {
      component.valor = 'abc' as any;
      component.onAumentar();
      expect(component.valor).toBe(1);
    });

    //NOTE - deve funcionar com valores negativos
    it('deve funcionar com valores negativos', () => {
      component.valor = -5;
      component.onAumentar();
      expect(component.valor).toBe(-4);
    });
  
    //NOTE - deve incrementar o valor mesmo se o valor atual for uma string numérica
    it('deve incrementar o valor mesmo se o valor atual for uma string numérica', () => {
      component.valor = '3' as any;
      component.onAumentar();
      expect(component.valor).toBe(4);
    });
  });
  //!SECTION




  //SECTION - onInput
  describe('onInput', () => {
    let inputEvent: any;
  
    beforeEach(() => {
      inputEvent = {
        target: {
          value: ''
        }
      };
    });
    
    //NOTE - deve remover caracteres não numéricos
    it('deve remover caracteres não numéricos', () => {
      inputEvent.target.value = 'abc123';
      component.onInput(inputEvent);
      expect(inputEvent.target.value).toBe('123');
      expect(component.valor).toBe(123);
    });
  
    //NOTE - deve remover pontos extras em números decimais
    it('deve remover pontos extras em números decimais', () => {
      inputEvent.target.value = '12.3.4';
      component.onInput(inputEvent);
      expect(inputEvent.target.value).toBe('12.34');
      expect(component.valor).toBe(12.34);
    });
  
    //NOTE - deve remover zeros à esquerda
    it('deve remover zeros à esquerda', () => {
      inputEvent.target.value = '00123';
      component.onInput(inputEvent);
      expect(inputEvent.target.value).toBe('123');
      expect(component.valor).toBe(123);
    });
  
    //NOTE - deve manter um zero à esquerda de um ponto decimal
    it('deve manter um zero à esquerda de um ponto decimal', () => {
      inputEvent.target.value = '0.123';
      component.onInput(inputEvent);
      expect(inputEvent.target.value).toBe('0.123');
      expect(component.valor).toBe(0.123);
    });
  
    //NOTE - deve atualizar o valor para 0 se o resultado não for um número
    it('deve atualizar o valor para 0 se o resultado não for um número', () => {
      inputEvent.target.value = '...';
      component.onInput(inputEvent);
      expect(component.valor).toBe(0);
    });
  
    //NOTE - deve atualizar a propriedade valor com o valor numérico do input
    it('deve atualizar a propriedade valor com o valor numérico do input', () => {
      inputEvent.target.value = '123';
      component.onInput(inputEvent);
      expect(component.valor).toBe(123);
    });
  });
  //!SECTION
});
