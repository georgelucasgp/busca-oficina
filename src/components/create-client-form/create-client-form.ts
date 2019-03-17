import { Component } from '@angular/core';


@Component({
  selector: 'create-client-form',
  templateUrl: 'create-client-form.html'
})
export class CreateClientFormComponent {

  text: string;

  constructor() {
    console.log('Hello CreateClientFormComponent Component');
    this.text = 'Hello World';
  }

}
