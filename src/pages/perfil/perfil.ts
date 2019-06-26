

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
declare let google;
export interface Clientdb2 {
  url:string
  fantasia:string
  categoria:string
  rua:string
  bairro:string
  cidade:string
  estado:string
  telefone:string


}


@IonicPage({

  name:'page-perfil'
}
)
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  id:any;
  clientdb2:any={} as Clientdb2;
  coords = [2];
  marker:any;

 
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public db: AngularFireDatabase) {
    this.carregarMapa();
  }

  carregarMapa(){
    navigator.geolocation.getCurrentPosition((pos)=>{
      this.coords[0] = pos.coords.latitude;
      this.coords[1] = pos.coords.longitude;
      console.log(this.coords[0]);
      console.log(this.coords[1]);
      
      let mapa = new google.maps.Map(document.getElementById('map'), {
        center: {lat: pos.coords.latitude, lng: pos.coords.longitude},
        zoom: 15
      });
      this.marker = new google.maps.Marker({position: {lat:pos.coords.latitude,lng:pos.coords.longitude}, map: mapa});
    })
   
  }

ngOnInit(){
  let key = this.navParams.get("key");
  this.db.object('/Client/'+key).snapshotChanges().subscribe(clientes=>{
   
    this.clientdb2 = clientes.payload.val()

  })

}
    

}
