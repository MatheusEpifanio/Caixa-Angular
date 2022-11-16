import { Component, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { CaixasService } from './caixas.service';

@Component({
  selector: 'app-caixas',
  templateUrl: './caixas.component.html',
  styleUrls: ['./caixas.component.css']
})
export class CaixasComponent implements OnInit {

  caixas:[] = [];
  usuarioscaixa:any[] = [];
  itemsativos:any[] = [];

  constructor(private caixasService:CaixasService
             ) { }

  ngOnInit(): void
  { 
    this.caixas = this.caixasService.atualizarCaixa()
    // this.usuarioscaixa = this.caixas.map((caixas)=> caixas.usuarios);
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
    this.caixasService.atualizarCaixa()
  }

  smtAtivos()
  {
  
  }


}
