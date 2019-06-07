import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

/**
 * Generated class for the FilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'filter'
})
@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {

  clientdb:any;
  toppings:any;
  cidade: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private event: Events
    ) {
      this.clientdb = this.navParams.get("clientDb");
      console.log(this.clientdb)
  }



  filtrar(){ 
    let newclientdb = [];
    for(let client in this.clientdb){
      const { categoria } = this.clientdb[client];
      for(let id in categoria){
        if(categoria[id] == this.toppings ){
          newclientdb.push(this.clientdb[client])
        }
      }
  }

  this.event.publish("change.client", newclientdb);
  this.navCtrl.pop()

}
}
