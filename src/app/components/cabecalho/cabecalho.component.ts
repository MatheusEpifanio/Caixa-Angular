import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CaixasService } from '../caixas/caixas.service';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent implements OnInit {

  statusmodal;
  nomecaixa;


  constructor(private caixasService: CaixasService) { }

  ngOnInit(): void 
  {
    this.caixasService.statusmodal.subscribe(statusmodal => {
      this.pegaStatus(statusmodal)
      this.pegaNome('Novo Caixa')
    }); 
    
    this.caixasService.alteraritem.subscribe(id => {     
      this.nomecaixa = (this.caixasService.itemCaixa(id).nome)
      console.log('123');
      
    });    
  }
  pegaStatus(status)
  {
    this.statusmodal = status
  } 

  pegaNome(nome)
  {
    console.log('214');
     
    this.nomecaixa = nome

  }
}
