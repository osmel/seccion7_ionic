import { Component } from '@angular/core';
//import { NavController, ToastController, Platform } from 'ionic-angular';
//import { SignupPage } from '../signup/signup';


//import { AngularFireAuth } from 'angularfire2/auth';
//import * as firebase from 'firebase/app';

//import { Facebook } from '@ionic-native/facebook';

import { AutenticacionServicioProvider } from '../../providers/autenticacion-servicio/autenticacion-servicio';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  usuario = {
    email: '',
    password: ''
  }
  constructor(
    //private navCtrl: NavController,
    //private toastCtrl: ToastController,
    //private facebook: Facebook,
    //private platform: Platform,
    private autservicio: AutenticacionServicioProvider
    //private afAuth: AngularFireAuth,
  ) {  }

  //llamamos la funcion registerUser(con los parametros) del proveedor, que no es más que una promesa que nos va a retornar then(exito) o .catch(falla)
  registrate(){
       this.autservicio.registrarUsuario(this.usuario.email,this.usuario.password)
      .then((user) => {
        // El usuario se ha creado correctamente
      })
      .catch(err=>{
       // el usuario no se creo
      })

  }


  //Autenticar usuario y una vez autenticados tenemos que cambiar la página activa por la página misTabsPage.

ingresaCorreo() {
  this.autservicio.ingresarUsuarioCorreo(this.usuario.email,this.usuario.password )
    .then((user) => 
          {
            //nos devuelve el usuario 
          } )
     .catch(err=>{
         //nos devuelve error
    })
}




 /* 


  ingresaFacebook() { //loginFacebook
    if (this.platform.is('cordova')) {
      return this.facebook.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return firebase.auth().signInWithCredential(facebookCredential);
      })
    }
    else {
      return this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => console.log(res));
    }
  }


  registrate_directo() { //signup
    this.navCtrl.push(SignupPage, { email: this.loginData.email });
  }


  ingresaCorreo_directo() {  //login
    this.afAuth.auth.signInWithEmailAndPassword(this.loginData.email, this.loginData.password)
      .then(auth => {
        // Do custom things with auth
      })
      .catch(err => {
        // Handle error
        let toast = this.toastCtrl.create({
          message: err.message,
          duration: 1000
        });
        toast.present();
      });
  }

  salir_directo() {  //signOut
    this.afAuth.auth.signOut();
  }
*/
  

}