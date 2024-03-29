import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { EsqueciSenhaComponent } from './components/esqueci-senha/esqueci-senha.component';
import { RedefinirSenhaComponent } from './components/redefinir-senha/redefinir-senha.component';
import { RequisitarProdutosComponent } from './components/requisitar-produtos/requisitar-produtos.component';
import {DevolucaoProdutoComponent} from './components/devolucao-produto/devolucao-produto.component';



//FIXME - REMOVER COMENTARIOS DO CANACTIVATE
const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'login', component: LoginComponent},
  {path:'registro', component: RegistroComponent},
  {path:'esqueci-senha', component: EsqueciSenhaComponent},
  {path:'home', component: HomeComponent, /*canActivate: [AuthGuard]*/},
  {path:'redefinir-senha', component: RedefinirSenhaComponent, /*canActivate: [AuthGuard]*/},
  {path:'requisitar-produtos', component: RequisitarProdutosComponent, /*canActivate: [AuthGuard]*/},
  {path:'devolucao-produto', component: DevolucaoProdutoComponent},
];

@NgModule({
  declarations:[],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
