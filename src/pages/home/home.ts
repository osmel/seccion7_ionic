import { Component } from '@angular/core';
import {  ModalController } from 'ionic-angular';
import { SubirPage } from "../subir/subir";
import { AngularFireDatabase } from 'angularfire2/database'; //, FirebaseListObservable

// servicios personalizado
import { CargaArchivosService } from "../../providers/carga-archivos";
//
import { AngularFireAuth } from 'angularfire2/auth';

import {  NavController } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';

/*



import { NavController, ModalController, ToastController } from 'ionic-angular';

// servicios
import { CargaArchivosService } from "../../providers/carga-archivos";
import { AuthService } from "../../providers/auth-service";

// Plugins
import { SocialSharing } from '@ionic-native/social-sharing';
*/


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
}) 
export class HomePage {

  hayMas:boolean = true;

   // posts: FirebaseListObservable<any[]>;
  constructor(
            public navCtrl: NavController,
            private modalCtrl:ModalController, 
            private _cas: CargaArchivosService,
            private afAuth: AngularFireAuth,
            
             
            /*
              private af: AngularFireDatabase
               
               private _auth: AuthService,
               private socialSharing: SocialSharing,
               private toastCtrl: ToastController 
              */
               ) {

    //this.posts = af.list('/posts');

    //aprovechanco de la promesa que esta regresando
    this._cas.cargar_imagenes();

  }

  salir() {  //signOut
    

    //this.navCtrl.push(LoginPage);
    this.afAuth.auth.signOut();
    //this.navCtrl.popToRoot();
    //this.navCtrl.pop();
  }

/*

  salir(){

    this._auth.signOut();

  }

  ingresar(): void {
    this._auth.signInWithFacebook()
      .then(() => this.onSignInSuccess());
  }

  compartir( post:any ){

    // Check if sharing via email is supported
    this.socialSharing.shareViaFacebook( post.titulo, post.img ).then(() => {
      // Sharing via email is possible
      this.toastCtrl.create({
        message: "Compartido correctamente",
        duration: 2500
      }).present();

    }).catch(( error ) => {

        this.toastCtrl.create({
          message: error,
          duration: 2500
        }).present();
    });

  }


  private onSignInSuccess(): void {
    console.log("Facebook nombre ",this._auth.displayName());
  }


  




  
  */



cargar_siguientes( infiniteScroll:any ){

    console.log("Siguientes...");

    this._cas.cargar_imagenes()  //esta es una promesa que esta en el servicio
        .then(
          ( existenMas:boolean )=>{  //si ya no hay más que no busque más
            infiniteScroll.complete(); //llamar a este proceso cdo ya terminamos
            console.log( existenMas );
            this.hayMas = existenMas;
          }
        )


  }  

  /*
doInfinite(infiniteScroll) {
    console.log('Acaba de comenzar la sincronizacion async');

    setTimeout(() => {
      for (let i = 0; i < 30; i++) {
        this.items.push( this.items.length );
      }

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

  */

  mostrar_modal(){

    let modal =  this.modalCtrl.create( SubirPage );

    modal.present(); 

  }

}
