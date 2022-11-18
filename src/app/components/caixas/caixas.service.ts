import { UpperCasePipe } from '@angular/common';
import { EventEmitter, Injectable } from '@angular/core';

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

  constructor() { }  

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
    caixa.usuarios = users        
    this.caixas.push(caixa);    
    this.setLocalCaixa(this.caixas);
  }
  
  // usuarios 
  //buscarUsuario(id)
  // {
  //   for(let i = 0; i<=this.usuarios.length; i++)
  //   {
  //     if(id == i)
  //     {
  //       return this.usuarios[id].nome
  //     }
  //   }  
  //   return null
  // }

  // setUsuarioCaixa(regusuario, id)
  // {
  //   this.caixas[id].usuarios = regusuario
  //   this.setLocalCaixa(this.caixas)
  // }

  atualizarCaixa()
  {  
    return this.caixas = this.getLocalCaixa();
  }
  
  somenteAtivo()
  {
    let ativos = []
    this.caixas.forEach(caixas => 
      {if(caixas.ativo == true)
        {
          ativos.push(caixas);
        }
      })
      return ativos;
  }

  buscarCaixa(id)
  {
    for(let i = 0; i < this.caixas.length ; i++)
    {  
      if(id == i)
      {
        return true;
      }
    }
    return false;
  }

  itemCaixa(id)
  {
    if(this.buscarCaixa(id))
    {
      return this.caixas[id];
    }
  }

  excluirCaixa(id:number)
  {    
    if(this.buscarCaixa(id))
    {
      this.caixas.splice(id, 1); 
    }
    this.setLocalCaixa(this.caixas);
  }

  alterarCaixa(item, id:number, users = [])
  {     
    this.caixas[id] = item;    
    this.caixas[id].usuarios =  users
    this.setLocalCaixa(this.caixas);
  }

  emitirAlterarCaixa(id)
  {    
   this.alteraritem.emit(id);
  }

  emitirStatusModal(status)
  {
    this.statusmodal.emit(status)
  }
  
}
