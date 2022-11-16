import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CaixasModule } from './components/caixas/caixas.module';
import { CabecalhoComponent } from './components/cabecalho/cabecalho.component';
import { ModalErroComponent } from './components/modal-erro/modal-erro.component';



@NgModule(
{
  declarations: 
  [ 
    AppComponent,
    CabecalhoComponent,
    ModalErroComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CaixasModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
