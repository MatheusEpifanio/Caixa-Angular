import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Caixas';
  modal: boolean =  false;

  ngOnInit()
  {  
  }
  teste(evento:any)
  {
    this.modal = evento
  }
}
