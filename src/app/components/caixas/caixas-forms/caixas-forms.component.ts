
import { Component,OnInit, HostListener, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CaixasService } from './../caixas.service';

@Component({
  selector: 'app-caixas-forms',
  templateUrl: './caixas-forms.component.html',
  styleUrls: ['./caixas-forms.component.css']
})
export class CaixasFormsComponent implements OnInit {
  
  formulario: FormGroup;
  usuario;
  usuarioselect:string[];
  
  isEnviado: boolean = false;
  statusmodal: boolean = false;
  alterar: boolean = false;
  idAlterar;
  t = false
  constructor( private formBuilder:FormBuilder,
               private caixasService: CaixasService,
               private router:Router) { }

  ngOnInit(): void 
  {
    this.usuario = this.caixasService.usuarios    
    this.formulario = this.formBuilder.group
    ({
      codigo: [null, Validators.required],
      nome: [null, Validators.required],
      usuarios:[null],      
      ativo: [true],
      id: [null]
    })    
    this.populadados()
    
  }

  // ngOnDestroy()
  // {
  //   this.caixasService.alteraritem.unsubscribe()    
  // }

  modal()
  {     
    this.caixasService.statusmodal.subscribe( s => this.statusmodal = s)    
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
      if(this.alterar)
      { 
        this.alterar = !this.alterar
      }
      console.log(this.statusmodal);
      // this.router.navigate(['/caixasforms'])
  }

  populadados()
  {
    this.caixasService.alteraritem.subscribe(c => 
      {        
        this.modal()
        this.alterar = !this.alterar 
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
        let itemsusarios = JSON.stringify(item.usuarios);
        let users = itemsusarios.split(',');
        users.map(u => {
          if(u != '[]'){              
          u = u.replace(/\W/g, '');
          this.usuarioselect.push(u);
          }
        })         
      });
  }

  setUsuario()
  {
    let formsusers = this.formulario.get('usuarios').value;  
    if(formsusers != null && this.usuarioselect.indexOf(formsusers) == -1)
    {
      this.usuarioselect.push(formsusers)     
    }
  }

  removerUsario(id)
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
