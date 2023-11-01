import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputContadorComponent } from './input-contador.component';

fdescribe('InputContadorComponent', () => {
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
    it('deve decrementar o valor quando valor > 0', () => {
      component.valor = 5;
      component.onDiminuir();
      expect(component.valor).toBe(4);
    });
  
    it('não deve alterar o valor quando valor = 0', () => {
      component.valor = 0;
      component.onDiminuir();
      expect(component.valor).toBe(0);
    });
  
    it('não deve alterar o valor quando valor < 0', () => {
      component.valor = -1;
      component.onDiminuir();
      expect(component.valor).toBe(0);
    });
  
    it('deve definir o valor como 0 se o valor atual não for um número', () => {
      component.valor = 'abc' as any;
      component.onDiminuir();
      expect(component.valor).toBe(0);
    });
  });
  
  //!SECTION

  //SECTION - onAumentar
  describe('onAumentar', () => {
    it('deve incrementar o valor', () => {
      component.valor = 0;
      component.onAumentar();
      expect(component.valor).toBe(1);
    });
  
    it('deve definir o valor como 1 se o valor atual não for um número', () => {
      component.valor = 'abc' as any;
      component.onAumentar();
      expect(component.valor).toBe(1);
    });
  
    it('deve funcionar com valores negativos', () => {
      component.valor = -5;
      component.onAumentar();
      expect(component.valor).toBe(-4);
    });
  
    it('deve incrementar o valor mesmo se o valor atual for uma string numérica', () => {
      component.valor = '3' as any;
      component.onAumentar();
      expect(component.valor).toBe(4);
    });
  });
    
    //!SECTION
});
