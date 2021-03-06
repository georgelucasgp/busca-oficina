import { AngularFireDatabase } from '@angular/fire/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidateConfirmPassword } from '../../validators/confirmPassword';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';



@IonicPage({
  name: 'create-user'
})
@Component({
  selector: 'page-create-user',
  templateUrl: 'create-user.html',
})
export class CreateUserPage {

  registerForm: FormGroup;
  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formbuilder: FormBuilder,
    public afAuth: AngularFireAuth,
    public alertCtrl: AlertController,
    public db: AngularFireDatabase,
    public storage: Storage
    ) {
      this.registerForm = this.formbuilder.group({  
        name: [null,[Validators.required, Validators.minLength(5)]],
        email: [null,[Validators.required, Validators.email]],
        password: [null,[Validators.required, Validators.minLength(6)]],
        confirmPassword: [null,[Validators.required, Validators.minLength(6), ValidateConfirmPassword]]
      });
      
      
  }


  submitForm(){
    this.afAuth.auth.createUserWithEmailAndPassword(
      this.registerForm.value.email, this.registerForm.value.password)
      .then((response) =>{
        this.showAlert('Usuário cadastrado','Usuário cadastrado');
        this.navCtrl.setRoot('start-page')
      })
      .catch((error) => {
      if(error.code == 'auth/email-already-in-use'){
        this.showAlert('Erro','Email já cadastrado');
      }
      });
      this.db.database.ref('/usuarios').push(this.registerForm.value)
      .then(() => {
        
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
