import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage({
  name: 'start-page'
})
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {

  client = [
    { nome: 'Oficina do Rato', telefone: '123123', rua: 'Alagoas', cidade: 'imperatriz'},
    { nome: 'Borracharia do Zé', telefone: '123123', rua: 'Alagoas', cidade: 'imperatriz'},
    { nome: 'Auto Mecânica', telefone: '123123', rua: 'Alagoas', cidade: 'imperatriz'},
    { nome: 'Lanternagem', telefone: '123123', rua: 'Alagoas', cidade: 'imperatriz'}
  ]

  uid:string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage,
    ) {
  }

  ionViewDidLoad() {
    this.storage.get('user')
    .then((resolve) =>{
      this.uid = resolve;
    })
  }

}
