import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { CaixasService } from '../caixas/caixas.service';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent implements OnInit {

  statusmodal;
  nomecaixa;
  @ViewChild('abas') abas:ElementRef;
  constructor(private caixasService: CaixasService, private elementRef:ElementRef) { }

  ngOnInit(): void 
  {
    this.caixasService.statusmodal.subscribe(statusmodal => {
      this.statusmodal = statusmodal;
      if(this.statusmodal)
      {
        // if()
        // {

        // }
        this.caixasService.alteraritem.subscribe(statusalterar => {          
            // console.log(statusalterar);
        })
      }
      
    });           
  }
}
