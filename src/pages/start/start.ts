import { HomePage } from './../home/home';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';




@IonicPage({
  name: 'start-page'
})
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {

  clientDb;
 

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public http: Http,
    public afAuth: AngularFireAuth
  ) {
    
  }


 
  // Método de logout
  logout() {
    return this.afAuth.auth.signOut()
      .then(value => {
        this.storage.clear();
        this.navCtrl.setRoot(HomePage);
      });
  }


  ionViewDidLoad() {
    
    this.pegarDadosFirebase();
    
   

  }

  pegarDadosFirebase() {
    this.http.get('https://busca-oficina.firebaseio.com/Client.json')
      .map(res => res.json())
      .subscribe(data => {
        this.trataDados(data);
      })
  }

  trataDados(dados) {
    this.clientDb = Object.keys(dados).map(i => dados[i]);


  }

  
}
