import { Injectable } from '@angular/core';

import { ToastController } from "ionic-angular";

//import { AngularFireModule } from 'angularfire2';  //angularFire se necesita siempre que se use firebase
//import * as firebase from "firebase";
import * as firebase from 'firebase'; 
import { AngularFireDatabase } from 'angularfire2/database'; //, FirebaseListObservable
//import * as firebase from "firebase";


@Injectable()
export class CargaArchivosService {

  private CARPETA_IMAGENES:string = "img";
  private POSTS:string = "posts";   //lugar donde estan todos los post

  imagenes:any[] = [];
  lastKey:string = undefined;  //ultimo registro que tengo en ese momento
  public suscripcion : any;

    // posts: FirebaseListObservable<any[]>;
  constructor( public af: AngularFireDatabase,
               private toastCtrl: ToastController) {}



 

cargar_imagenes_firebase( archivo:archivoSubir ){

     let promesa = new Promise( (resolve, reject)=>{

            this.mostar_toast("Inicio de carga");

            let storageRef = firebase.storage().ref();  //hacer referencia al storage() en firebase
            let nombreArchivo = new Date().valueOf(); //1237128371. Para que sea unico el nombre del archivo tomamos la fecha y la convertimos en numero


            //tarea de firebase para la subida del archivo  "en firebase se define let variable:tipo"
            let uploadTask:firebase.storage.UploadTask =
                    storageRef.child(`${ this.CARPETA_IMAGENES  }/${ nombreArchivo }`)  //referencia a la carpeta donde quiero poner las imagenes seguido del nombre del archivo
                    .putString( archivo.img, 'base64', { contentType: 'image/jpeg' }  );  //
                    

               
            //aqui estaremos pendientes de esa tarea(cuando termino, que porcentaje de avance lleva, etc)        
            uploadTask.on(  firebase.storage.TaskEvent.STATE_CHANGED,   //cuando vaya cambiando quiero hacer las tareas 
                ( snapshot )=>{}, // saber el avance del archivo
                ( error )=> {  // Manejo de errores
                  console.log("Error al subir ", JSON.stringify( error ));
                  this.mostar_toast("Error al cargar: " + JSON.stringify( error ) );
                  reject(error);//enviar un error porque fallo
                },
                ()=>{ // Termino el proceso
                  let url = uploadTask.snapshot.downloadURL;  //toma la url del archivo que acaba de subir
                  this.mostar_toast("Imagen cargada exitosamente!!");
                  this.crear_post( archivo.titulo, url );  //envia para que se guarde en firebase la url y el titulo del archivo
                  resolve(); //enviar resolve porque fue exitoso, termino
                }
              )

      });



       return promesa;

}

 private crear_post( titulo:string, url:string ){

    let objeto:archivoSubir = {
      img: url,
      titulo: titulo
    };

    //let $key = this.af.database.list(`/${ this.POSTS }`).push( post ).key;
    let $key = this.af.list(`/${ this.POSTS }`).push( objeto ).key;  // para obtener el key del objeto
    objeto.$key = $key;  //aqui guardo el key

    this.imagenes.push( objeto );  //y ahora si puedo enviar el objeto, con su (url, titulo, y key)

  }


//aqui hay un "observador dentro de una promesa
 cargar_imagenes(){

    return new Promise(  (resolve, reject)=>{
          
      this.suscripcion = this.af.list("/posts", {

        query: {   //aqui hacemos un query
          limitToLast: 4,   //quiero cargar los ultimos 4
          orderByKey: true,    //
          endAt: this.lastKey 
        }

      })
      .subscribe( posts =>{

        if( this.lastKey ){
          posts.pop(); // Pruebenlo!
        }

        if( posts.length == 0 ){
          console.log("Ya no existe registros");
          resolve(false);
          return;
        }

        this.lastKey = posts[0].$key;

        for( let i = posts.length-1; i>=0; i-- ){

          let post = posts[i];
          this.imagenes.push( post );

        }

        resolve(true);


      })



    });

     


  }


 //esto es muy importante porque todas las suscripciones tienen que eliminarse antes de cerrar session
 quitarsuscripcion() {
     this.suscripcion.unsubscribe(); 
 }



 



  private mostar_toast( texto:string ){
    this.toastCtrl.create({
      message:texto,
      duration: 2500
    }).present();
  }


}


interface archivoSubir{
  $key?:string;  //? para el caso en que no haya
  img:string;
  titulo:string;
}
