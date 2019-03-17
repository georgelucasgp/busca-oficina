import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'create-client-form',
  templateUrl: 'create-client-form.html'
})
export class CreateClientFormComponent {

  createClientForm: FormGroup

  constructor(
    public formbuilder: FormBuilder,
  ) {
    this.createClientForm = this.formbuilder.group({
      razaosocial:[null,[Validators.required,Validators.minLength(10)]],
      fantasia:[null,[Validators.required,Validators.minLength(10)]],
      cnpj:[null,[Validators.required,Validators.minLength(14),Validators.maxLength(14)]],
      cep:[null,[Validators.required,Validators.minLength(8),Validators.maxLength(8)]],
      endereco:[null,[Validators.required,Validators.minLength(10)]],
      numero:[null,[Validators.required]],
      bairro:[null,[Validators.required]],
      cidade:[null,[Validators.required]],
      estado:[null,[Validators.required]],
      telefone:[null,[Validators.required]],
      categoria:[null,[Validators.required]]
      
    })

  }
  cadastrarCliente(){
    console.log(this.createClientForm.value);
  }

}
