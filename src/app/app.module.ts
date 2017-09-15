import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SubirPage } from '../pages/subir/subir';


// Pipes
import { PlaceholderPipe } from "../pipes/placeholder";

//servicios
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { CargaArchivosService } from '../providers/carga-archivos';



//firebase
import { AngularFireModule } from 'angularfire2';  //angularFire se necesita siempre que se use firebase
import { AngularFireDatabaseModule } from 'angularfire2/database'; // solo necesario para las caracteristicas de database 
import { AngularFireAuthModule } from 'angularfire2/auth';  // solo necesario para las caracteristicas de autenticación
import { firebaseConfig } from '../config/firebase.config'; // variable de ambientes

//loguearse en facebook de forma nativa
import { Facebook } from '@ionic-native/facebook';

//compartir facebook
import { SocialSharing } from '@ionic-native/social-sharing';

//Logueo
import { LoginPage } from '../pages/login/login';
//import { SignupPage } from '../pages/signup/signup';

import { AutenticacionServicioProvider } from '../providers/autenticacion-servicio/autenticacion-servicio';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SubirPage,
    PlaceholderPipe,
    LoginPage
    //SignupPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),

    AngularFireModule.initializeApp(firebaseConfig), // importar firebase/app necesario para todo con firebase
    AngularFireDatabaseModule, //Importar firebase/database, solo necesario para las caracteristicas de database 
    AngularFireAuthModule, // Importar firebase/auth,  para las caracteristicas de auth 

  ],
  bootstrap: [IonicApp], 
  entryComponents: [
    MyApp,
    HomePage,
    SubirPage,
    LoginPage
    //SignupPage    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    ImagePicker,
    CargaArchivosService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Facebook,
    SocialSharing,
    AutenticacionServicioProvider
  ]
})
export class AppModule {}
