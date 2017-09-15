import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import { AutenticacionServicioProvider } from '../providers/autenticacion-servicio/autenticacion-servicio';
import { LoginPage } from '../pages/login/login';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
    //rootPage: any = HomePage;  
    rootPage: any = LoginPage;

  constructor(platform: Platform, private autservicio: AutenticacionServicioProvider, 
    private statusBar: StatusBar, private splashscreen: SplashScreen) {
 

    platform.ready().then(() => {
      
      this.autservicio.Session.subscribe((session: firebase.User)=>{
      //me suscribo al observador del proveedor
            if(session){
                this.rootPage = HomePage;
                
                console.log(session.displayName); //caso de facebook si tiene displayName
            }
              else{
                this.rootPage = LoginPage;
              }
       });



      statusBar.styleDefault();
      splashscreen.hide();
    });

  }



  
}

   
  