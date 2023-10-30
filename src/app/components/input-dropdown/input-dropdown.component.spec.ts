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

  it('Deve fechar o dropdown ao clicar fora do container', () => {
    component.mostrarDropdown = true;
    const event = { target: document.createElement('div') };
    component.handleClick(event as any);
    expect(component.mostrarDropdown).toBe(false);
  });
});
