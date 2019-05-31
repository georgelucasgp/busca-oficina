import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from '@angular/fire/database';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
//import { Observable } from 'rxjs';



@Component({
  selector: 'create-client-form',
  templateUrl: 'create-client-form.html',
  providers: [Camera, AngularFireStorage]
})
export class CreateClientFormComponent {

  createClientForm: FormGroup;
  dados:any ;
  key;
  
  constructor(
    public formbuilder: FormBuilder,
    public http: Http,
    public db: AngularFireDatabase,
    public storage: Storage,
    public camera: Camera,
    public Afs: AngularFireStorage,
    public afAuth: AngularFireAuth
  ) {
    console.log(this.afAuth.auth.currentUser.uid);
    

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

  

  getPhoto(){
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType:this.camera.MediaType.PICTURE,
      correctOrientation: true
    };

    this.camera.getPicture(options).then((imageData) => {
      this.savePhotos(imageData)
    }, (err) => {
      alert(err);
    });
  }

  savePhotos(imageData){
    let d = new Date();
    let title = d.getTime();

    this.Afs.storage.ref(title+'.jpg').putString(imageData,'base64').then((image)=>{
      this.db.list('Usuario/'+this.afAuth.auth.currentUser.uid+"/agentePhotos/").push({
        photo: image.downloadURL
      });
    }).catch(e=>{
      alert(JSON.stringify(e));
    })
  }


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
    this.storage.get('user')
    .then((val) => {
      this.dados = this.createClientForm.value;
      this.dados['idclient'] = val;
      
      this.db.database.ref('/Client').push(this.dados)
      .then(() => {
        console.log('salvou');
        this.createClientForm.reset();
      })

    });

    }

 
  }