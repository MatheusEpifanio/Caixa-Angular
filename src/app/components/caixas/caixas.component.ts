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
  status:boolean = true

  constructor(private caixasService:CaixasService
             ) { }

  ngOnInit(): void
  { 
    this.caixas = this.caixasService.atualizarCaixa()     
    // this.smtAtivos()
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
  }

  smtAtivos(event = null)
  {            
    // if(event != null)
    // {
    //   this.status = !this.status 
    // }
    // if(this.status)
    // {
    //   this.caixas = this.caixasService.somenteAtivo()       
    // }
    // else
    // {
    //   this.caixas = this.caixasService.getLocalCaixa()
    // }    
  }


}
