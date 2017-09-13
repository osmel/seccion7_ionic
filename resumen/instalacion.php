comprobando Y ELIMINANDO LA version 7 si la hay
	dpkg --list | grep -i jdk
	sudo apt-get remove openjdk-7-jdk
	sudo apt-get remove openjdk-7-jre*
	sudo apt-get autoremove

instalando JDK de java para q pueda correr sdk
	sudo add-apt-repository ppa:webupd8team/java
	sudo apt-get update
	sudo apt-get install oracle-java8-installer

configurando
	sudo update-alternatives --display java
	sudo update-alternatives --config java
	sudo update-java-alternatives -s java-8-oracle
	sudo apt-get install oracle-java8-set-default
	java -version
	javac -version


COMPROBANDO SI SE ESTABLECIO LAS "Variables de entorno y variables del sistema ""
	echo $JAVA_HOME
	export JAVA_HOME=/usr/lib/jvm/java-8-oracle    


SDK de android
   http://es.wikihow.com/instalar-Android-en-Ubuntu-Linux-con-Eclipse-IDE
	  
  Si ejecutas una versión de Ubuntu de 64 bits, debes instalar algunas bibliotecas de 32 bits con el siguiente comando:
	  sudo apt-get install lib32z1 lib32ncurses5 lib32bz2-1.0 lib32stdc++6


	  descargar https://developer.android.com/studio/index.html
	  cd /home/fidel/Descargas/

	  pasarlo para la carpeta /opt -->(todos los usuarios)   o carpeta /usr/local ->(para un unico usuario)
	  sudo -s cp -r android-studio-ide-162.4069837-linux.zip  /opt/

	  descomprimir
	  cd /opt
	  sudo unzip  android-studio-ide-162.4069837-linux.zip

	  Esto hará que el directorio /opt y el Android SDK se puedan modificar y ejecutar por todos los usuarios en el sistema
	  sudo -s chmod -R 755 /opt/android-studio

	levanta por vez primera android para el proceso de instalacion, que se va a guardar por defecto en "/home/fidel/Android/" :
	  cd /opt/android-studio/bin
	  ./studio.sh


////////////////////////////
configure
  Android SDK
     SDK Platforms 
     SDK Tools
     SDK Update SItes

Crear tu dispositivo virtual Android (AVD)

/////////////////////////
Installing a graphical user interface for KVM
https://github.com/uw-it-aca/spacescout-android/wiki/1.-Setting-Up-Android-Studio-on-Ubuntu#install-intels-kvm-for-better-avd-performance 

instalar para la vitualizacion
  kvm

entrar a la BIOS y Habilitar 
//////////////////////////

sudo nano /etc/profile

JAVA_HOME=/usr/lib/jvm/java-8-oracle
JRE_HOME=$JAVA_HOME/jre
ANDROID_HOME=/home/fidel/Android/Sdk
ANDROID_MIO=/opt/android-studio
PATH=$PATH:$ANDROID_HOME/bin
PATH=$PATH:$ANDROID_HOME/tools
PATH=$PATH:$ANDROID_HOME/platform-tools
PATH=$PATH:$ANDROID_HOME/tools/bin
PATH=$PATH:$ANDROID_MIO/bin
PATH=$PATH:$ANDROID_MIO/gradle
PATH=$PATH:$ANDROID_MIO/gradle/gradle-3.2/bin/
PATH=$PATH:$JAVA_HOME/bin:$JRE_HOME/bin

export JAVA_HOME
export JRE_HOME
export ANDROID_MIO
export ANDROID_HOME
export PATH
//////////////////////////	  		


Iniciar el Administrador de SDK  
	android o studio.sh


actualizar SDK
	//NO LO UTILICE//android update sdk --no-ui	





npm install -g ionic cordova
ionic info
ionic start qrap1 blank
cd qrap1
ionic serve  
////////////////////
ionic cordova platform ls 
ionic cordova platform remove android 
ionic cordova platform add android  
///////////////////////////////////
ionic cordova build android  
///////////////////////////////////
./studio.sh
///////////////////////////////////

ionic g page modal
///////////////////////////////////


#npm install @ionic-native/core --save
#ionic cordova plugin add cordova-plugin-camera


ionic cordova plugin add phonegap-plugin-barcodescanner 
sudo npm install --save @ionic-native/barcode-scanner


ionic cordova plugin add cordova-plugin-inappbrowser
sudo npm install --save @ionic-native/in-app-browser

sudo npm install @agm/core --save


ionic cordova plugin add cordova-plugin-contacts
npm install --save @ionic-native/contacts




https://www.qrcode.es/es/generador-qr-code/

///////////////////////////////////////////

