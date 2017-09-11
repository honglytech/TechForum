import { Component } from '@angular/core';
import { LoadingController, AlertController, NavController } from "ionic-angular";
import { SignupPage } from '../signup/signup';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth';
import CryptoJS from 'crypto-js';

@Component({
  selector: 'page-login',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(private authService: AuthService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private navCtrl: NavController) {
  }

  onSignin(form: NgForm){
      const loading = this.loadingCtrl.create({
        content: 'Signing you in...'
      });
      loading.present();    // Shows loading content once the Log in button is pressed
      
      /* 
         A cryptographic hash (sometimes called ‘digest’) is a kind of ‘signature’ for a text or a data file. 
         SHA-256 generates an almost-unique 256-bit (32-byte) signature for a text
         https://forum.ionicframework.com/t/can-i-use-sha256-function-in-ionic/69418/9
      */
      // CryptoJS.SHA256(form.value.password).toString(CryptoJS.enc.Hex) is hashing the password when user signin using SHA256

      this.authService.signin(form.value.email, CryptoJS.SHA256(form.value.password).toString(CryptoJS.enc.Hex))
        .then(data => {
          // When the login proess is successful then dismisses the loading content
          loading.dismiss();
        })
        // Error handling
        .catch(error => {
          // dismisses the loading content then displays error message
          loading.dismiss();
          const alert = this.alertCtrl.create({
            title: 'Signin failed!',
            message: error.message,
            buttons: ['Ok']
          });
          alert.present();    // Presents the alert to the user
        });      
  }

  onGoToSignUp(){
  	this.navCtrl.push(SignupPage);
  }
}
