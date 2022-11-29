import { Component, OnInit } from '@angular/core';

import { CaixasService } from '../caixas/caixas.service';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent implements OnInit {

  statusmodal:boolean = false;
  nomecaixa = 'Novo Caixa';
  constructor(private caixasService: CaixasService) { }

  ngOnInit(): void 
  {
    this.caixasService.statusmodal.subscribe(statusmodal => {
      this.statusmodal = statusmodal
      if(!statusmodal)
      {
        this.nomecaixa = 'Novo Caixa'
      }
    }); 
    this.caixasService.alteraritem.subscribe(id => {   
       this.nomecaixa =  this.caixasService.itemCaixa(id).nome.toUpperCase()
    })   
  }
  modalFechar()
  {
    this.caixasService.emitirStatusModal(false)   
  }

}
