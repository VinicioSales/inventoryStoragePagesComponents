import { of, BehaviorSubject  } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TemaService } from '../../services/tema.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputDropdownComponent } from './input-dropdown.component';

describe('InputDropdownComponent', () => {
  let temaService: TemaService;
  let component: InputDropdownComponent;
  let temaServiceSpy: jasmine.SpyObj<TemaService>;
  let temaEscuroSubject: BehaviorSubject<boolean>;
  let fixture: ComponentFixture<InputDropdownComponent>;

  beforeEach(async () => {
    temaServiceSpy = jasmine.createSpyObj('TemaService', [], {
      temaEscuroLigado$: of(false),
    });
    temaEscuroSubject = new BehaviorSubject<boolean>(false);
  
    await TestBed.configureTestingModule({
      declarations: [InputDropdownComponent],
      imports: [FormsModule],
      providers: [
        { provide: TemaService, useValue: temaServiceSpy }
      ]
    }).compileComponents();
  
    fixture = TestBed.createComponent(InputDropdownComponent);
    component = fixture.componentInstance;
    temaService = TestBed.inject(TemaService);
    
    // Aqui, você está espionando o getter `temaEscuroLigado$` e fazendo-o retornar o valor do BehaviorSubject
    Object.defineProperty(temaService, 'temaEscuroLigado$', {
      get: jasmine.createSpy('temaEscuroLigado$').and.returnValue(temaEscuroSubject.asObservable())
    });
  
    fixture.detectChanges();
  });
  





  //SECTION - handleBorderRadius
  describe('handleBorderRadius', () => {
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
  })
  //!SECTION




  
  //SECTION - handleClick
  describe('handleClick', () => {
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
  })
  //!SECTION





  //SECTION - atualizarImg
  describe('atualizarImg', () => {
    // NOTE - deve atualizar imgSrc para o tema claro
    it('deve atualizar imgSrc para o tema claro', () => {
      component.atualizarImg(false);
      expect(component.imgSrc).toBe(component.imgTemaClaro);
    });
  
    // NOTE - deve atualizar imgSrc para o tema escuro
    it('deve atualizar imgSrc para o tema escuro', () => {
      component.atualizarImg(true);
      expect(component.imgSrc).toBe(component.imgTemaEscuro);
    });
  
    // NOTE - deve atualizar imgSrc quando o tema é alterado
    it('deve atualizar imgSrc quando o tema é alterado', () => {
      component.atualizarImg(false);
      expect(component.imgSrc).toBe(component.imgTemaClaro);
  
      component.atualizarImg(true);
      expect(component.imgSrc).toBe(component.imgTemaEscuro);
    });
  })




  //SECTION - onClick
  describe('onClick', () => {
    //NOTE - deve abrir o dropdown e chamar handleBorderRadius
    it('deve abrir o dropdown e chamar handleBorderRadius', () => {
      component.mostrarDropdown = false;
      spyOn(component, 'handleBorderRadius');
      component.onClick();
      expect(component.mostrarDropdown).toBe(true);
      expect(component.handleBorderRadius).toHaveBeenCalled();
    });

    //NOTE - deve fechar o dropdown e chamar handleBorderRadius
    it('deve fechar o dropdown e chamar handleBorderRadius', () => {
      component.mostrarDropdown = true;
      spyOn(component, 'handleBorderRadius');
      component.onClick();
      expect(component.mostrarDropdown).toBe(false);
      expect(component.handleBorderRadius).toHaveBeenCalled();
    });
  });
  //!SECTION




  //SECTION - onInputFocus
  describe('onInputFocus', () => {
    //NOTE - deve adicionar a classe "focused" ao elemento div
    it('deve adicionar a classe "focused" ao elemento div', () => {
      const div = document.createElement('div');
      component.onInputFocus(div);
      expect(div.classList.contains('focused')).toBeTrue();
    })
  })
  //!SECTION




  //SECTION - filtrarItens
  describe('filtrarItens', () => {
    beforeEach(() => {
      // Configuração inicial do componente, se necessário
      component.itens = ['Maçã', 'Banana', 'Laranja'];
    });
    
    //NOTE - deve retornar todos os itens quando o texto pesquisado é uma string vazia
    it('deve retornar todos os itens quando o texto pesquisado é uma string vazia', () => {
      component.textoPesquisado = '';
      component.filtrarItens();
      expect(component.itensFiltrados).toEqual(component.itens);
    });
  
    //NOTE - deve retornar todos os itens quando o texto pesquisado é apenas espaços
    it('deve retornar todos os itens quando o texto pesquisado é apenas espaços', () => {
      component.textoPesquisado = '    ';
      component.filtrarItens();
      expect(component.itensFiltrados).toEqual(component.itens);
    });
  
    //NOTE - deve filtrar itens com base no texto pesquisado
    it('deve filtrar itens com base no texto pesquisado', () => {
      component.textoPesquisado = 'ma';
      component.filtrarItens();
      expect(component.itensFiltrados).toEqual(['Maçã']);
    });
  
    //NOTE - deve retornar um array vazio quando nenhum item corresponde ao texto pesquisado
    it('deve retornar um array vazio quando nenhum item corresponde ao texto pesquisado', () => {
      component.textoPesquisado = 'xyz';
      component.filtrarItens();
      expect(component.itensFiltrados).toEqual([]);
    });
  
    //NOTE - deve ser insensível a maiúsculas e minúsculas
    it('deve ser insensível a maiúsculas e minúsculas', () => {
      component.textoPesquisado = 'MA';
      component.filtrarItens();
      expect(component.itensFiltrados).toEqual(['Maçã']);
    });
  });
  //!SECTION




  //SECTION - selecionarItem
  describe('selecionarItem', () => {
    let onClickSpy: jasmine.Spy;

    beforeEach(() => {
      onClickSpy = spyOn(component, 'onClick');
    });

    //NOTE - deve definir itemSelecionado corretamente
    it('deve definir itemSelecionado corretamente', () => {
      component.selecionarItem('item');
      expect(component.itemSelecionado).toBe('item');
    });

    //NOTE - deve definir textoPesquisado corretamente
    it('deve definir textoPesquisado corretamente', () => {
      component.selecionarItem('item');
      expect(component.textoPesquisado).toBe('item');
    })

    //NOTE - deve emitir itemSelecionadoChange coretamente
    it('deve emitir o evento itemSelecionadoChange corretamente', () => {
      let itemEmitido: string = '';
      component.itemSelecionadoChange.subscribe(item => itemEmitido = item);
      component.selecionarItem('algumItem');
      expect(itemEmitido).toBe('algumItem');
    });

    //NOTE - deve chamar onClick
    it('deve chamar onClick', () => {
      component.selecionarItem('algumItem');
      expect(onClickSpy).toHaveBeenCalled();
    });
  });
  //!SECTION
});
