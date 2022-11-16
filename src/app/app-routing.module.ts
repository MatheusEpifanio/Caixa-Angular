import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CaixasComponent } from './components/caixas/caixas.component';
const routes: Routes = 
[
  {path: 'caixas', component:CaixasComponent},
  {path: '', pathMatch:'full', redirectTo:'caixas'},  
  {path: '**', component:CaixasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
