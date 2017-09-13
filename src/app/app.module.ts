import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

//firebase
import { AngularFireModule } from 'angularfire2';  //angularFire se necesita siempre que se use firebase
import { AngularFireDatabaseModule } from 'angularfire2/database'; // solo necesario para las caracteristicas de database 
import { AngularFireAuthModule } from 'angularfire2/auth';  // solo necesario para las caracteristicas de autenticación
import { firebaseConfig } from '../config/firebase.config'; // variable de ambientes


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SubirPage } from '../pages/subir/subir';




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SubirPage
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
    SubirPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
