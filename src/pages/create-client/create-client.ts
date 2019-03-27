import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage({
  name:'create-client'
})
@Component({
  selector: 'page-create-client',
  templateUrl: 'create-client.html',
})
export class CreateClientPage {

  uid:string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage
    ) {
  }




}
