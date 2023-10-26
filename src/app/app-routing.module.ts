import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path:'registro', component: RegistroComponent},
  {path:'login', component: LoginComponent},
];

@NgModule({
  declarations:[],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
