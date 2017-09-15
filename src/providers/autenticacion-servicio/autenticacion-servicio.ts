import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';


@Injectable()
export class AutenticacionServicioProvider {

  constructor(private afAuth: AngularFireAuth, 
  			  private fb: Facebook,
  			  private platform: Platform) { }


	// Registro de usuario.  Función para dar de alta a usuarios.
	//El Método createUserWithEmailAndPassword pasándole como parámetros el email y password creamos un nuevo usuario.
	registrarUsuario(email:string, password:string){
	      return this.afAuth.auth.createUserWithEmailAndPassword( email, password)
	      .then((res)=>{
	       // El usuario se ha creado correctamente. 
	      })
	      .catch(err=>Promise.reject(err))
	}

	// Login de usuario.  Método para autenticarnos con Correo electrónico / Contraseña
	//El Método signInWithEmailAndPassword si todo va bien nos devolverá el usuario, si ha habido algo incorrecto nos devolverá un error.
	ingresarUsuarioCorreo(email:string, password:string){
	     return this.afAuth.auth.signInWithEmailAndPassword(email, password)
	       .then(user=>Promise.resolve(user))
	       .catch(err=>Promise.reject(err))
	}


 //Login de usuarioFacebook
 ingresarUsuarioFacebook() {
    if (this.platform.is('cordova')) {  //caso en que este en el celular
      return this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return firebase.auth().signInWithCredential(facebookCredential);
      })
    }
    else {  //caso en que este en la web
      return this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => console.log(res));
    }
  }

  

	/*			// Devuelve la session
	Entre get y Session() hay un espacio, es una peculiaridad de TypeScript que nos permite hacer "getters y setters" de esta manera: 
	- "Obtener sesión" en lugar de llamar a la función simplemente "llamamos a Session como si fuese un atributo de la clase", es decir sin el get y sin paréntesis de esta manera: 
	    this.auth.Session

	-  this.auth.Session.subscribe(…). en este caso usamos subscribe porque Session devuelve this.afAuth.authState que a su vez devuelve un observable.
	*/
	 get Session(){
	  return this.afAuth.authState;	  //Metodo authState devuelve la session. Que a su vez devuelve un observable
	 }


	 // Logout de usuario. Método para cerrar sesión (logout)
	 salir(){
	 	
	   this.afAuth.auth.signOut().then(()=>{

	     // hemos salido
	   })
	 }

}




