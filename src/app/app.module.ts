import { FilterPage } from './../pages/filter/filter';
import { Camera } from 'ionic-native';
import { Crop } from '@ionic-native/crop/ngx';
import { ImagePicker } from '@ionic-native/image-picker';
import { AngularFireDatabase } from '@angular/fire/database';
import { StartPageModule } from './../pages/start/start.module';
import { StartPage } from './../pages/start/start';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from '../environment';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { DataProvider } from '../providers/data/data';
import { PerfilPageModule } from '../pages/perfil/perfil.module';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FilterPage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    StartPageModule,
    HttpModule,
    AngularFireAuthModule,
    PerfilPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    StartPage,
    FilterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireAuth,
    AngularFireDatabase,
    ImagePicker,
    Crop,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider
  ]
})
export class AppModule {}
