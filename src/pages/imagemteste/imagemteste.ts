import { Component } from '@angular/core';
import { NavController, ToastController, normalizeURL, IonicPage, NavParams } from 'ionic-angular';

import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop/ngx';
import { FirebaseService } from '../service/firebase.service';



@IonicPage({
  name:'imagemteste'
})
@Component({
  selector: 'page-imagemteste',
  templateUrl: 'imagemteste.html',
})
export class ImagemtestePage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public imagePicker: ImagePicker,
    public cropService: Crop,
    public toastCtrl: ToastController,
    public firebaseService: FirebaseService
    
    
    ) {
  }

 
  openImagePicker(){
    this.imagePicker.hasReadPermission().then(
      (result) => {
        if(result == false){
          // no callbacks required as this opens a popup which returns async
          this.imagePicker.requestReadPermission();
        }
        else if(result == true){
          this.imagePicker.getPictures({
            maximumImagesCount: 1
          }).then(
            (results) => {
              for (var i = 0; i < results.length; i++) {
                this.uploadImageToFirebase(results[i]);
                console.log("Foiiii")
              }
            }, (err) => console.log(err)
          );
        }
      }, (err) => {
        console.log(err);
      });
  }

  uploadImageToFirebase(image: any){
    image = normalizeURL(image);

    //uploads img to firebase storage
    this.firebaseService.uploadImage(image)
    .then(photoURL => {
      
      let toast = this.toastCtrl.create({
        message: 'Image was updated successfully',
        duration: 3000
      });
      toast.present();
      })
  }

}
