import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CaixasFormsComponent } from './caixas-forms/caixas-forms.component';

import { CaixasService } from './caixas.service';

@Component({
  selector: 'app-caixas',
  templateUrl: './caixas.component.html',
  styleUrls: ['./caixas.component.css']
})
export class CaixasComponent implements OnInit {

  caixas:any[] = [];
  usuarioscaixa:any[] = [];
  statusativos:boolean = false

  constructor(private caixasService:CaixasService
             ) { }

  ngOnInit(): void
  { 
    this.caixas = this.caixasService.atualizarCaixa()
  }
  

  excluirItem(id: number)
  {
    this.caixasService.excluirCaixa(id);
  }

  alterarItem(id)
  {     
    this.caixasService.emitirAlterarCaixa(id)
  }

  verificaStatusCss(item: any)
  {
    if(item)
    {
      return 'fa-check fa-green'
    }
    return 'fa-x fa-red'
  }

  exibir()
  {
    this.caixas = this.caixasService.atualizarCaixa()
    if(this.statusativos)
    {
      this.smtAtivos()
    }
  }

  smtAtivos(event = null)
  {                
    if(event != null)
    {
      this.statusativos = !this.statusativos     
    }
    if(this.statusativos)
    {
      this.caixas = this.caixasService.somenteAtivo()     
    }
    else
    {    
      this.caixas = this.caixasService.getLocalCaixa()
    }    
  }


}
