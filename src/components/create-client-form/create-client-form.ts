import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'create-client-form',
  templateUrl: 'create-client-form.html'
})
export class CreateClientFormComponent {

  createClientForm: FormGroup

  constructor(
    public formbuilder: FormBuilder,
    public http: Http
  ) {
    this.createClientForm = this.formbuilder.group({
      razaosocial: [null, [Validators.required, Validators.minLength(10)]],
      fantasia: [null, [Validators.required, Validators.minLength(10)]],
      cnpj: [null, [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      cep: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      rua: [null, [Validators.required, Validators.minLength(10)]],
      numero: [null, [Validators.required]],
      bairro: [null, [Validators.required]],
      cidade: [null, [Validators.required]],
      estado: [null, [Validators.required]],
      telefone: [null, [Validators.required]],
      categoria: [null, [Validators.required]]

    })

  }

  buscaCep() {
    const cepValue = this.createClientForm.controls['cep'].value;
    const isValid = this.createClientForm.controls['cep'].valid;
    if (isValid) {
      this.http.get(`https://viacep.com.br/ws/${cepValue}/json/`)
      .map( res => res.json())
      .subscribe(data => {
        this.insereValoresEndereco(data);
      })
    }
  }

  insereValoresEndereco(dados){
    this.createClientForm.controls['rua'].setValue(dados.logradouro);
    this.createClientForm.controls['bairro'].setValue(dados.bairro);
    this.createClientForm.controls['cidade'].setValue(dados.localidade);
    this.createClientForm.controls['estado'].setValue(dados.uf);

  }

  cadastrarCliente() {
    console.log(this.createClientForm.value);
  }

}
