import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { InputDropdownComponent } from './input-dropdown.component';
import { TemaService } from '../../services/tema.service';
import { of } from 'rxjs';

describe('InputDropdownComponent', () => {
  let component: InputDropdownComponent;
  let fixture: ComponentFixture<InputDropdownComponent>;
  let temaServiceSpy: jasmine.SpyObj<TemaService>;

  beforeEach(async () => {
    temaServiceSpy = jasmine.createSpyObj('TemaService', [], {
      temaEscuroLigado$: of(false)
    });

    await TestBed.configureTestingModule({
      declarations: [InputDropdownComponent],
      imports: [FormsModule],
      providers: [
        { provide: TemaService, useValue: temaServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InputDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //NOTE - handleClick
  it('Deve fechar o dropdown ao clicar fora do container', () => {
    component.mostrarDropdown = true;
    const event = { target: document.createElement('div') };
    component.handleClick(event as any);
    expect(component.mostrarDropdown).toBe(false);
  });

  it('Não deve fechar o dropdown ao clicar dentro do container', () => {
    component.mostrarDropdown = true;
    const event = { target: component.containerRef.nativeElement };
    component.handleClick(event as any);
    expect(component.mostrarDropdown).toBe(true);
  });
  
  it('Deve chamar handleBorderRadius ao fechar o dropdown', () => {
    const handleBorderRadiusSpy = spyOn(component, 'handleBorderRadius');
    component.mostrarDropdown = true;
    const event = { target: document.createElement('div') };
    component.handleClick(event as any);
    expect(handleBorderRadiusSpy).toHaveBeenCalled();
  });
  
  it('Não deve chamar handleBorderRadius se o dropdown não fechar', () => {
    const handleBorderRadiusSpy = spyOn(component, 'handleBorderRadius');
    component.mostrarDropdown = true;
    const event = { target: component.containerRef.nativeElement };
    component.handleClick(event as any);
    expect(handleBorderRadiusSpy).not.toHaveBeenCalled();
  });

});
