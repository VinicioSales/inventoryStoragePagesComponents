import { of, BehaviorSubject  } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputDropdownComponent } from './input-dropdown.component';
import { TemaService } from '../../services/tema.service';
import { ImagemService } from '../../services/imagem.service'; // Importe o serviço de imagem

describe('InputDropdownComponent', () => {
  let temaServiceSpy: jasmine.SpyObj<TemaService>;
  let imagemServiceSpy: jasmine.SpyObj<ImagemService>; // Crie um espião para o ImagemService
  let temaEscuroSubject: BehaviorSubject<boolean>;
  let component: InputDropdownComponent;
  let fixture: ComponentFixture<InputDropdownComponent>;

  beforeEach(async () => {
    temaEscuroSubject = new BehaviorSubject<boolean>(false);
    temaServiceSpy = jasmine.createSpyObj('TemaService', [], {
      temaEscuroLigado$: temaEscuroSubject.asObservable(),
    });
    imagemServiceSpy = jasmine.createSpyObj('ImagemService', ['atualizarImg']); // Inicialize o espião do ImagemService

    await TestBed.configureTestingModule({
      declarations: [InputDropdownComponent],
      imports: [FormsModule],
      providers: [
        { provide: TemaService, useValue: temaServiceSpy },
        { provide: ImagemService, useValue: imagemServiceSpy } // Adicione o ImagemService ao array de providers
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InputDropdownComponent);
    component = fixture.componentInstance;
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
    it('deve atualizar imgSrc corretamente para o tema claro', () => {
      imagemServiceSpy.atualizarImg.and.returnValue('caminho/para/imagem/clara.png');
      component.imgTemaClaro = 'caminho/para/imagem/clara.png';
      component.imgTemaEscuro = 'caminho/para/imagem/escura.png';
      temaEscuroSubject.next(false); // Configura o tema para claro
      component.atualizarImg();
      expect(component.imgSrc).toBe('caminho/para/imagem/clara.png');
    });

    it('deve atualizar imgSrc corretamente para o tema escuro', () => {
      imagemServiceSpy.atualizarImg.and.returnValue('caminho/para/imagem/escura.png');
      component.imgTemaClaro = 'caminho/para/imagem/clara.png';
      component.imgTemaEscuro = 'caminho/para/imagem/escura.png';
      temaEscuroSubject.next(true); // Configura o tema para escuro
      component.atualizarImg();
      expect(component.imgSrc).toBe('caminho/para/imagem/escura.png');
    });
  });
  //!SECTION




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
