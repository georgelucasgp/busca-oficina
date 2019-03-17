import { FormGroup } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'create-client-form',
  templateUrl: 'create-client-form.html'
})
export class CreateClientFormComponent {

  createClientForm: FormGroup

  constructor() {

  }

}
