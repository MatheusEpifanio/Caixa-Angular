import { EventEmitter, Injectable } from '@angular/core';
import { ChildActivationStart, Router } from '@angular/router';

import { Caixas } from './Caixas';

@Injectable({
  providedIn: 'root'
})
export class CaixasService {

  usuarios = [
    {
      id: 0,
      nome: 'Matheus'
    },
    {
      id:1,
      nome: 'Maria'
    },
    {
      id:2,
      nome: 'Joao'
    },
    {
      id:3,
      nome: 'Fulano'
    },
    {
      id:4,
      nome: 'adm'
    },
    {
      id:5,
      nome: 'Usuario'
    },
    {
      id:6,
      nome: 'Teste Usuario32'
    },
    {
      id:7,
      nome: 'Epifanio'
    }
  ]
  caixas: Caixas[];
  statusmodal = new EventEmitter();
  alteraritem = new EventEmitter();
  abatrocada = new EventEmitter();
  statusalterar = false
  constructor(private router:Router) { }  

  getLocalCaixa()
  {
    return JSON.parse(localStorage.getItem('cx')) ?? [];
  }
  
  setLocalCaixa(caixas)
  {        
    localStorage.setItem('cx',JSON.stringify(caixas));
  }

  setCaixa(caixa:Caixas, users = [])
  {     
    if(!this.statusalterar)
    {      
        if(this.caixas.length > 0)
      {
        let lastid = this.caixas.at(-1)
        caixa.id = lastid.id     
      }
      caixa.id++ 
    }  
    caixa.usuarios = users        
    this.caixas.push(caixa);
    this.setLocalCaixa(this.caixas);
  }
  
  atualizarCaixa()
  {  
    return this.caixas = this.getLocalCaixa();
  }

  itemCaixa(id:number)
  {  
    for(let i = 0; i <= this.caixas.length ; i++)
    {
      if(id == this.caixas[i].id)
      {        
        return this.caixas[i];
      }
    }  
      return null;
  }

  buscarCaixa(id)
  {     
    for(let i = 0; i <= this.caixas.length; i++)
    {                      
      if(id == this.caixas[i].id)
      {        
        return i
      }
    }
    return -1  
  }

  excluirCaixa(id:number)
  {    
    let index = this.buscarCaixa(id) 
    // console.log(index);
    if(index != -1)
    {
      this.caixas.splice(index, 1); 
    }
    this.setLocalCaixa(this.caixas);
  }

  alterarCaixa(item, id:number, users = [])
  {         
    let index = this.buscarCaixa(id)
    this.statusalterar = !this.statusalterar  
    this.caixas[index] = item;    
    this.caixas[index].id = id 
    this.caixas[index].usuarios =  users
    this.setLocalCaixa(this.caixas);
    this.statusalterar = !this.statusalterar 
  }

  somenteAtivo()
  {
    let ativos = []    
    this.caixas.forEach(caixas => 
      {
        if(caixas.ativo == true)
        {
          ativos.push(caixas);
        }
      })
      return ativos;
  }

  emitirAlterarCaixa(id)
  {    
   this.alteraritem.emit(id);
   this.router.navigate(['/caixasforms']);
  }

  emitirStatusModal(status)
  {
    this.statusmodal.emit(status)
    if(status)
    {
      this.router.navigate(['/caixasforms'])  
    }
    else
    {
      this.router.navigate(['/caixas'])  
    }
  }

}
