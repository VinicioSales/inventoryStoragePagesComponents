import { of, BehaviorSubject  } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TemaService } from '../../services/tema.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputDropdownComponent } from './input-dropdown.component';

describe('InputDropdownComponent', () => {
  let component: InputDropdownComponent;
  let temaServiceSpy: jasmine.SpyObj<TemaService>;
  let temaEscuroSubject: BehaviorSubject<boolean>;
  let fixture: ComponentFixture<InputDropdownComponent>;

  beforeEach(async () => {
    temaServiceSpy = jasmine.createSpyObj('TemaService', ['toggleTema'], {
      temaEscuroLigado$: of(false),
    });
    Object.defineProperty(temaServiceSpy, 'temaEscuroLigado$', {
      get: () => temaEscuroSubject.asObservable(),
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

  //SECTION - handleBorderRadius
  //NOTE - deve definir borderRadius como "0px" quando mostrarDropdown for verdadeiro
  it('deve definir borderRadius como "0px" quando mostrarDropdown for verdadeiro', () => {
    component.mostrarDropdown = true;
    component.handleBorderRadius();
    expect(component.borderRadius).toBe('0px');
  });

  //NOTE - deve definir borderRadius como "10px" quando mostrarDropdown for falso
  it('deve definir borderRadius como "10px" quando mostrarDropdown for falso', () => {
    component.mostrarDropdown = false;
    component.handleBorderRadius();
    expect(component.borderRadius).toBe('10px');
  });
  //!SECTION




  
  //SECTION - handleClick
  //NOTE - Deve fechar o dropdown ao clicar fora do container
  it('Deve fechar o dropdown ao clicar fora do container', () => {
    component.mostrarDropdown = true;
    const event = { target: document.createElement('div') };
    component.handleClick(event as any);
    expect(component.mostrarDropdown).toBe(false);
  });

  //NOTE - Não deve fechar o dropdown ao clicar dentro do container
  it('Não deve fechar o dropdown ao clicar dentro do container', () => {
    component.mostrarDropdown = true;
    const event = { target: component.containerRef.nativeElement };
    component.handleClick(event as any);
    expect(component.mostrarDropdown).toBe(true);
  });
  
  //NOTE - Deve chamar handleBorderRadius ao fechar o dropdown
  it('Deve chamar handleBorderRadius ao fechar o dropdown', () => {
    const handleBorderRadiusSpy = spyOn(component, 'handleBorderRadius');
    component.mostrarDropdown = true;
    const event = { target: document.createElement('div') };
    component.handleClick(event as any);
    expect(handleBorderRadiusSpy).toHaveBeenCalled();
  });
  
  //NOTE - Não deve chamar handleBorderRadius se o dropdown não fechar
  it('Não deve chamar handleBorderRadius se o dropdown não fechar', () => {
    const handleBorderRadiusSpy = spyOn(component, 'handleBorderRadius');
    component.mostrarDropdown = true;
    const event = { target: component.containerRef.nativeElement };
    component.handleClick(event as any);
    expect(handleBorderRadiusSpy).not.toHaveBeenCalled();
  });
  //!SECTION





  //SECTION - atualizarImg
  it('deve atualizar imgSrc para o tema claro', () => {
    temaEscuroSubject.next(false);
    component.atualizarImg();
    expect(component.imgSrc).toBe(component.imgTemaClaro);
  });

  //NOTE - deve atualizar imgSrc para o tema escuro
  it('deve atualizar imgSrc para o tema escuro', () => {
    temaEscuroSubject.next(true);
    component.atualizarImg();
    expect(component.imgSrc).toBe(component.imgTemaEscuro);
  });

  //NOTE - deve atualizar imgSrc quando o tema é alterado
  it('deve atualizar imgSrc quando o tema é alterado', () => {
    temaEscuroSubject.next(false);
    component.atualizarImg();
    expect(component.imgSrc).toBe(component.imgTemaClaro);

    temaEscuroSubject.next(true);
    component.atualizarImg();
    expect(component.imgSrc).toBe(component.imgTemaEscuro);
  });
});
