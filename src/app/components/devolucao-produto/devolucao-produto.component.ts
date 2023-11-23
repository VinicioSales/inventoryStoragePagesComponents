import { Component } from '@angular/core';
import { TemaService } from '../../services/tema.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';



@Component({
  selector: 'app-devolucao-produto',
  templateUrl: './devolucao-produto.component.html',
  styleUrls: ['./devolucao-produto.component.css']
})


export class DevolucaoProdutoComponent {

  produto = [
    {
      codSolicitacao: '001',
      codProduto: 'A123',
      produto: 'Produto 1',
      quantidade: 10,
      uniMedida: 'Un',
      centroCusto: 'CC1'
    },
    
  ];

  linhas: any[] = [
    { codSolicitacao: '123456', /* Outros campos da primeira linha */ }
  ];

  adicionarLinha(): void {
    this.linhas.push({ codSolicitacao: 'NovoCodigo', /* Outros campos da nova linha */ });
  }
 
}
