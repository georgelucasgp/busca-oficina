import { PerfilPage } from './../perfil/perfil';
import { HomePage } from './../home/home';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { FilterPage } from '../filter/filter';




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
    public afAuth: AngularFireAuth,
    private event: Events
  ) {
    this.event.subscribe("change.client",(data)=> {
      this.clientDb = data
    })
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
        this.clientDb = Object.keys(data).map(i => {
          
          data[i]["key"]=i
          return data[i];
        });
        

      })
  }

 
  navigationtofilter() {
    this.http.get('https://busca-oficina.firebaseio.com/Client.json')
      .map(res => res.json())
      .subscribe(data => {
        this.clientDb = Object.keys(data).map(i => data[i]);
        this.navCtrl.push(FilterPage, {clientDb:this.clientDb})
      })
   
  }

  redirectToPerfil(key){
    this.navCtrl.push(PerfilPage,{key:key})
  }

 
}
