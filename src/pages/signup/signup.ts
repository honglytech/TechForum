import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth';	
import CryptoJS from 'crypto-js';

import { LoadingController, AlertController } from "ionic-angular";

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})

export class SignupPage {
	constructor(private authService: AuthService,
                private loadingCtrl: LoadingController,
                private alertCtrl: AlertController) {}

	onSignup(form: NgForm){

		const loading = this.loadingCtrl.create({
	    	content: 'Signing you up...'
	    });
	    loading.present();	// Shows loading content once the Sign up button is pressed

	    /* 
	       A cryptographic hash (sometimes called ‘digest’) is a kind of ‘signature’ for a text or a data file. 
	       SHA-256 generates an almost-unique 256-bit (32-byte) signature for a text
		   https://forum.ionicframework.com/t/can-i-use-sha256-function-in-ionic/69418/9
		*/
		// CryptoJS.SHA256(form.value.password).toString(CryptoJS.enc.Hex) is hashing the password when user signup using SHA256

		this.authService.signup(form.value.email, CryptoJS.SHA256(form.value.password).toString(CryptoJS.enc.Hex))
			.then(data => {
				// When the signup proess is successful then dismisses the loading content
        		loading.dismiss();
      		})

      		// Error handling 
      		.catch(error => {
        		loading.dismiss();	// dismisses the loading content then displays error message
	        	const alert = this.alertCtrl.create({
		          	title: 'Signup failed!',
		          	message: error.message,	
		          	buttons: ['Ok']
	        	});
	        	// Presents the alert to the user
        		alert.present();
      		});
	}
}
