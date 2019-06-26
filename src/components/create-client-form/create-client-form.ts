import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
//import { Observable } from 'rxjs';
import firebase from 'firebase';
import { Geolocation } from '@ionic-native/geolocation/ngx';


import { LoadingController, ToastController, NavParams, NavController, AlertController } from 'ionic-angular';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { Camera } from 'ionic-native';
import { StartPage } from '../../pages/start/start';
declare let google;


@Component({
  selector: 'create-client-form',
  templateUrl: 'create-client-form.html',
  providers: [Camera,AngularFireStorage, FileTransfer,Geolocation]
})
export class CreateClientFormComponent {

  createClientForm: FormGroup;
  dados: any;
  key;
  myPhotosRef: any;
  myPhoto: any;
  myPhotoURL: any;
  meuuid:any;
  coords = [2];
  marker:any;

  constructor(
    public formbuilder: FormBuilder,
    public http: Http,
    public db: AngularFireDatabase,
    public storage: Storage,
    public camera: Camera,
    public Afs: AngularFireStorage,
    public afAuth: AngularFireAuth,
    public Afd: AngularFireDatabase,
    public transfer: FileTransfer,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public nvCtrl: NavController,
    public alertctrl: AlertController,
    public geolocation: Geolocation
  ) {
    this.meuuid = this.afAuth.auth.currentUser.uid;
    this.myPhotosRef = firebase.storage().ref('/Photos/');

    navigator.geolocation.getCurrentPosition((pos)=>{
      this.coords[0] = pos.coords.latitude;
      this.coords[1] = pos.coords.longitude;
          
    });


    this.createClientForm = this.formbuilder.group({
      razaosocial: [null, [Validators.required, Validators.minLength(10)]],
      fantasia: [null, [Validators.required, Validators.minLength(10)]],
      cnpj: [null, [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      cep: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      rua: [null, [Validators.required, Validators.minLength(10)]],
      numero: [null, [Validators.required]],
      bairro: [null, [Validators.required]],
      cidade: [null, [Validators.required]],
      estado: [null, [Validators.required]],
      telefone: [null, [Validators.required]],
      categoria: [null, [Validators.required]]

    })

  }

  ionViewDidLoad(){
  
  }



  takePhoto() {
    Camera.getPicture({
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      encodingType: Camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    }).then(imageData => {
      this.myPhoto = imageData;
      this.uploadPhoto();
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

  selectPhoto(): void {
    Camera.getPicture({
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: Camera.DestinationType.DATA_URL,
      quality: 100,
      encodingType: Camera.EncodingType.PNG,
    }).then(imageData => {
      this.myPhoto = imageData;
      this.uploadPhoto();
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

  private uploadPhoto(): void {
    let d = new Date();
    let title = d.getTime();

    this.myPhotosRef.child(this.afAuth.auth.currentUser.uid).child(title+'.png')
      .putString(this.myPhoto, 'base64', { contentType: 'image/png' })
      .then((savedPicture) => {
        savedPicture.ref.getDownloadURL()
        .then(data => {
          console.log(data)
          this.myPhotoURL = data
        });
      
      });
  }

  // private generateUUID(): any {
  //   var d = new Date().getTime();
  //   var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
  //     var r = (d + Math.random() * 16) % 16 | 0;
  //     d = Math.floor(d / 16);
  //     return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  //   });
  //   return uuid;
  // }




  buscaCep() {
    const cepValue = this.createClientForm.controls['cep'].value;
    const isValid = this.createClientForm.controls['cep'].valid;
    if (isValid) {
      this.http.get(`https://viacep.com.br/ws/${cepValue}/json/`)
        .map(res => res.json())
        .subscribe(data => {
          this.insereValoresEndereco(data);
        })
    }
  }

  insereValoresEndereco(dados) {
    this.createClientForm.controls['rua'].setValue(dados.logradouro);
    this.createClientForm.controls['bairro'].setValue(dados.bairro);
    this.createClientForm.controls['cidade'].setValue(dados.localidade);
    this.createClientForm.controls['estado'].setValue(dados.uf);



  }

  cadastrarCliente() {
    
    if(this.myPhotoURL){
        this.dados = this.createClientForm.value;
        this.dados['idclient'] = this.meuuid;
        this.dados['url'] = this.myPhotoURL;
        this.dados['lat'] = this.coords[0];
        this.dados['long'] = this.coords[1];

        this.db.database.ref('/Client').push(this.dados)
          .then(() => {
                this.createClientForm.reset();
                this.nvCtrl.setRoot(StartPage);
                
          })

     
        }else{
          let alert = this.alertctrl.create({
            title: "Insira a foto"
                })
                alert.present();
          
        }
  }

}