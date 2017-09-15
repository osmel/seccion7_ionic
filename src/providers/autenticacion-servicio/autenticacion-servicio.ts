import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Injectable()
export class AutenticacionServicioProvider {

  constructor(private afAuth: AngularFireAuth) { }

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
/*
$scope.authObj.$onAuthStateChanged(function(firebaseUser) {
  if (firebaseUser) {
    console.log("Signed in as:", firebaseUser.uid);
  } else {
    console.log("Signed out");
  }
});

$scope.authObj.$createUserWithEmailAndPassword("my@email.com", "mypassword")
  .then(function(firebaseUser) {
    console.log("User " + firebaseUser.uid + " created successfully!");
  }).catch(function(error) {
    console.error("Error: ", error);
  });
*/

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
/*

Si está suscribiendo un observador en el método ngDestroy, debe destruir la suscripción this.subscription = yourservice.method () .subcribe (data ==> {this.mydata = data}); ngDestroy () {this.subcription.unsubscribe (); } Espero que te ayude
*/

}




