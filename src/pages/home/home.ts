
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loginForm: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formbuilder: FormBuilder,
    public afAuth: AngularFireAuth,
    public alertCtrl: AlertController
    ) {
      this.loginForm = this.formbuilder.group({
        email: [null,[Validators.required,Validators.email]],
        password: [null,[Validators.required,Validators.minLength(6)]]
      })
  }

  submitLogin(){
    this.afAuth.auth.signInWithEmailAndPassword(
      this.loginForm.value.email, this.loginForm.value.password)
      .then(()=> {
        this.showAlert('Usuário autenticado', '');
        this.navCtrl.setRoot('start-page')
      
      })
      .catch((error)=>{
        if(error.code == 'auth/wrong-password'){
          this.showAlert('Erro','Senha incorreta, digite novamente.');
          this.loginForm.controls['password'].setValue(null);
        }
      })
  }

  showAlert(title: string, subtitle: string) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['OK']
    });
    alert.present();
  }

}
