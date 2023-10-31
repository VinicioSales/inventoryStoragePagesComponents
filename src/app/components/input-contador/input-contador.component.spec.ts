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

    //NOTE - deve subtrair o valor
    it('deve subtrair o valor', () => {
      component.valor = 1;
      const valorAnterior = component.valor;
      component.onDiminuir();
      expect(component.valor).toBe(valorAnterior - 1);
    })

    //NOTE - nao deve subtrair quando valor for menor ou igual a 0
    it('nao deve subtrair quando valor for menor ou igual a 0', () => {
      component.valor = 0;
      const valorAnterior = component.valor;
      component.onDiminuir();
      expect(component.valor).toBe(valorAnterior);
    })
  });
});
