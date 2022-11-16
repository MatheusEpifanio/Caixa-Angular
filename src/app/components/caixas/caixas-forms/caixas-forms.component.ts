
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Caixas } from '../Caixas';

import { CaixasService } from './../caixas.service';

@Component({
  selector: 'app-caixas-forms',
  templateUrl: './caixas-forms.component.html',
  styleUrls: ['./caixas-forms.component.css']
})
export class CaixasFormsComponent implements OnInit {
  
  formulario: FormGroup;
  usuario;
  usuarioselect:string[] = [];
  
  
  isEnviado: boolean = false;
  statusmodal: boolean = false;
  alterar: boolean = false;
  idAlterar;

  constructor( private formBuilder:FormBuilder,
               private caixasService: CaixasService) { }

  ngOnInit(): void 
  {
    this.usuario = this.caixasService.usuarios    
    this.formulario = this.formBuilder.group
    ({
      codigo: [null, Validators.required],
      nome: [null, Validators.required],
      usuarios:[null],
      ativo: [true]
    })
    this.caixasService.alteraritem.subscribe(c => 
      {
        if(c != null)
        {       
          this.modal()
          console.log('alterar');
          let item = this.caixasService.itemCaixa(c)
          this.idAlterar = c
          this.formulario.patchValue
          (
            {
              codigo: item['codigo'],
              nome: item['nome'],
              ativo: item['ativo']
            }
          );  
            let itemsusarios = JSON.stringify(item.usuarios)
            let users = itemsusarios.split(',')
            users.map(u => {
              u = u.replace(/\W/g, "")
              this.usuarioselect.push(u)
            })
            this.alterar = !this.alterar
        }                      
      });
  }

  ngOnDestroy()
  {
    this.caixasService.alteraritem.unsubscribe()    
  }

  modal()
  { 
    this.statusmodal = !this.statusmodal
    this.caixasService.emitirStatusModal(this.statusmodal)
    this.formulario.get('ativo').setValue(true)
    this.usuarioselect = []
    Object.keys(this.formulario.controls).forEach( campo => 
      {
        if(campo != 'ativo')
        {
          this.formulario.get(campo).reset()
        }
      })
  }

  setUsuario()
  {
    let formsusers = this.formulario.get('usuarios').value;
    if(formsusers != null && this.usuarioselect.indexOf(formsusers) == -1)
    {
      let itemUsuario = this.formulario.get('usuarios').value
      this.usuarioselect.push(itemUsuario)
      console.log(this.usuarioselect);          
    }
  }

  removerUsario( id )
  {
    this.usuarioselect.splice(id, 1)
  }

  onSubmit()
  {
    this.isEnviado = true;
    if(this.formulario.valid)
    {   
      if(this.alterar)
      {
        this.caixasService.alterarCaixa(this.formulario.value, this.idAlterar, this.usuarioselect);
        this.isEnviado = false; 
        this.alterar = !this.alterar;
        this.modal();
      }
      else
      {       
        this.caixasService.setCaixa(this.formulario.value, this.usuarioselect)
        this.isEnviado = false;
        this.modal();
      }
    }
  }

  verificarInvalido(campo: string)
  {
    let form = this.formulario.get(campo)
    if(!form.valid && this.isEnviado)
    {
      return true
    }
    return false
  }

  aplicaCssInvalido(campo)
  {
    if(this.verificarInvalido(campo))
    {
      return 'invalido';
    }
  }
}
