import { Component } from '@angular/core';
import { ViewController, ToastController, Platform, LoadingController } from "ionic-angular";

// plugins
import { Camera, CameraOptions } from '@ionic-native/camera';

import { ImagePicker, ImagePickerOptions  } from '@ionic-native/image-picker';

// servicios personalizado
import { CargaArchivosService } from "../../providers/carga-archivos";


@Component({
  selector: 'page-subir',
  templateUrl: 'subir.html',
})
export class SubirPage {

  titulo:string = "";
  imgPreview:string = null;
  img:string = "";

  constructor( private viewCtrl: ViewController,
               private camera: Camera,  //tomar foto
               private toastCtrl: ToastController,
               private platform: Platform,
               private imagePicker: ImagePicker,  //cargar de las imagenes nativas o del telefono
               private _cas: CargaArchivosService,  
               
               private loadingCtrl: LoadingController
               
               
				
               ) {
  }


  crear_post(){
    console.log("Subiendo imagen...");
    
    let archivo = {
      'titulo': this.titulo,
      'img': this.img
    };

    //aqui inicia el loading
    let loader = this.loadingCtrl.create({
      content: "Subiendo..."
    });
    loader.present();


     //el servicio tiene una promesa y llamará a "then" o a "error"
    this._cas.cargar_imagenes_firebase( archivo )
          .then(
            ()=>{
              loader.dismiss(); //aqui finaliza el loading
              this.cerrar_modal();  //cerramos la modal porq ya termino
            },

            ( error )=>{
              loader.dismiss();  //aqui finaliza el loading
              this.mostrar_toast("Error al cargar: " + error );
              console.log("Error al cargar " + JSON.stringify(error) );
            }

           )
   

  }


  cerrar_modal(){

    this.viewCtrl.dismiss();

  }


  mostrar_camara(){

    if( !this.platform.is("cordova") ){
      this.mostrar_toast("Error: No estamos en un celular");
      return;
    }


    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true //para que no se distorcione la imagen
    }    

    this.camera.getPicture(options).then((imageData) => {
       // imageData is either a base64 encoded string or a file URI
       // If it's base64:
       this.imgPreview = 'data:image/jpeg;base64,' + imageData;   //el string de foto es de base64
       //let base64Image = 'data:image/jpeg;base64,' + imageData;
       this.img = imageData;

      }, (err) => {
       // Handle error
       this.mostrar_toast( "Error: " + err );
       console.error("Error en la camara: ", err);

    });


  }


  seleccionar_fotos(){

        if( !this.platform.is("cordova") ){
          this.mostrar_toast("Error: No estamos en un celular");
          return;
        }

        let opciones: ImagePickerOptions = {
          maximumImagesCount: 1,
          quality: 40,
          outputType: 1
        }


        /*
        this.imagePicker.getPictures(opciones).then((results) => {
          for (var i = 0; i < results.length; i++) {
              console.log('Image URI: ' + results[i]);
          }
        }, (err) => { });
        */


        this.imagePicker.getPictures(opciones).then((results) => {


          for( let img of results ){
            this.imgPreview = 'data:image/jpeg;base64,' + img
            this.img = img;
            break;
          }


        }, (err) => {

          this.mostrar_toast("Error seleccion:" + err);
          console.error(  "Error en seleccion: " + JSON.stringify( err ) );

        });

}



  

  private mostrar_toast( texto:string ){

    this.toastCtrl.create({
      message: texto,
      duration: 2500
    }).present();

  }


}
