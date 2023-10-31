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
      expect(component.valor).toBe(-1);
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
      })

      //NOTE - deve funcionar com valores negativos
      it('deve funcionar com valores negativos', () => {
        component.valor = -5;
        component.onAumentar();
        expect(component.valor).toBe(-4);
      });
      
      
    });
    //!SECTION
});
