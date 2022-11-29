
import { Component, OnInit } from '@angular/core';

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
  statusmodal
   
  constructor(private caixasService:CaixasService
            ) { }

  ngOnInit(): void
  { 
    this.caixas = this.caixasService.atualizarCaixa()
    this.caixasService.statusmodal.subscribe(s => this.statusmodal = s)
  }
  
  chamarModal()
  {
    this.caixasService.emitirStatusModal(true)
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
