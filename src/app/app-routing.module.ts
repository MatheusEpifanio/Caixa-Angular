import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaixasFormsComponent } from './components/caixas/caixas-forms/caixas-forms.component';

import { CaixasComponent } from './components/caixas/caixas.component';
const routes: Routes = 
[
  {path: 'caixas', component:CaixasComponent},
  {path: 'caixasforms', component:CaixasFormsComponent},
  {path: '', pathMatch:'full', redirectTo:'caixas'},  
  {path: '**', component:CaixasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
