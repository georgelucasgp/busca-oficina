import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
//import { AngularFireDatabase } from '@angular/fire/database';

@IonicPage({
  name: 'start-page'
})
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {

  uid:string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage,
    //public db: AngularFireDatabase
    ) {
  }

  ionViewDidLoad() {
    this.storage.get('user')
    .then((resolve) =>{
      this.uid = resolve;
    })
  }

}
