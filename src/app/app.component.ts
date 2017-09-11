import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
import { SigninPage } from "../pages/signin/signin";
import { AuthService } from "../services/auth";
import { TabsPage } from '../pages/tabs/tabs';    // Import TabsPage from tabs

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;  // this is the custom TabsPage imported from tabs page
  isAuthenticated = false;  // default value is false 

  constructor(platform: Platform, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen,
              private authService: AuthService
              ) {

    // Initialzes Firebase with authentication
    firebase.initializeApp({
      apiKey: "AIzaSyAZyzaKQZothriT0c5Sgw0cXWdIVLOJvIg",
      authDomain: "techforum-c6c2a.firebaseapp.com"
    });

    firebase.auth().onAuthStateChanged(user => {
      // If the user is authenticated, the TabsPage appears 
      if (user) {
        this.isAuthenticated = true;
        this.rootPage = TabsPage;
      } else {
        // Otherwise, Signin page is shown to let the user sign in first before using the app
        this.isAuthenticated = false;
        this.rootPage = SigninPage;
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

}

