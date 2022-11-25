import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaixasComponent } from './caixas.component';
import { CaixasFormsComponent } from './caixas-forms/caixas-forms.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule(
{
  declarations:
  [
    CaixasComponent,
    CaixasFormsComponent
  ],
  imports:
  [
    CommonModule,
    ReactiveFormsModule

  ],
  exports: 
  [
    CaixasComponent
  ],

})
export class CaixasModule { }
