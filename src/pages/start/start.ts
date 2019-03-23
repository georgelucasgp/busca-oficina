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

  client = [
    { nome: 'Oficina do Rato', telefone: '123123', rua: 'Alagoas', cidade: 'imperatriz'},
    { nome: 'Borracharia do Zé', telefone: '123123', rua: 'Alagoas', cidade: 'imperatriz'},
    { nome: 'Auto Mecânica', telefone: '123123', rua: 'Alagoas', cidade: 'imperatriz'},
    { nome: 'Lanternagem', telefone: '123123', rua: 'Alagoas', cidade: 'imperatriz'}
  ];

  clientDb;
  uid:string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage,
    public http: Http,
    public afAuth: AngularFireAuth
    ) {
  }

  // ionViewDidLoad() {
  //   this.storage.get('user')
  //   .then((resolve) =>{
  //     this.uid = resolve;
  //   })
  // }
  

       // Método de logout
       logout() {
        return this.afAuth.auth.signOut()
        .then (value => {
            this.storage.clear();
            this.navCtrl.setRoot(HomePage);
           });
        }


  ionViewDidLoad(){
    this.pegarDadosFirebase();
   }

   pegarDadosFirebase(){
     this.http.get('https://busca-oficina.firebaseio.com/Client.json')
     .map(res => res.json())
     .subscribe(data => {
      this.trataDados(data);
     })
   }

   trataDados(dados){
     this.clientDb = Object.keys(dados).map( i => dados[i]);


   }
}
