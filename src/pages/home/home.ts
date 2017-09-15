import { Component } from '@angular/core';
import { NavController, ModalController, ToastController } from 'ionic-angular';
import { SubirPage } from "../subir/subir";

// servicios personalizado
import { CargaArchivosService } from "../../providers/carga-archivos";



import { AutenticacionServicioProvider } from '../../providers/autenticacion-servicio/autenticacion-servicio';
import { SocialSharing } from '@ionic-native/social-sharing';



//import { AngularFireDatabase } from 'angularfire2/database'; //, FirebaseListObservable
//import { AngularFireAuth } from 'angularfire2/auth';


/*





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
            private toastCtrl: ToastController,
            private modalCtrl:ModalController, 
            private _cas: CargaArchivosService,
            private socialSharing: SocialSharing,  //compartir facebook
            private autservicio: AutenticacionServicioProvider
            
             
            /*
              private afAuth: AngularFireAuth,
              private af: AngularFireDatabase
               
               private _auth: AuthService,
               
               
              */
               ) {

    
    //aprovechanco de la promesa que esta regresando
    this._cas.cargar_imagenes();

  }


  salir(): void { //signOut
         this._cas.quitarsuscripcion();
         this.autservicio.salir();
  }






  compartir( post:any ){ //este es un plugins nativo no lo podemos probar en la pc

    // Check if sharing via email is supported

    //shareViaFacebook(message, image, url) //url es opcional
    this.socialSharing.shareViaFacebook( post.titulo, post.img )
    .then(() => {
                // Sharing via email es possible con canShareViaEmail()
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

/*
  private onSignInSuccess(): void {
    console.log("Facebook nombre ",this._auth.displayName());
  }

*/
  




  
  



///siguientes de scroll infinito
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


  mostrar_modal(){

    let modal =  this.modalCtrl.create( SubirPage );

    modal.present(); 

  }

}
