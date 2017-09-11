import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AboutusPage } from '../aboutus/aboutus';
import { SigninPage } from "../signin/signin";
import { AuthService } from "../../services/auth";
import { TabsPage } from '../../pages/tabs/tabs';    

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  rootPage:any = TabsPage;
  signinPage = SigninPage;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private authService: AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }  

  onGoToAboutUs(){
  	this.navCtrl.push(AboutusPage); 
  }

  // Sign user out back to sign in page
  onGoToSignOut() {
    this.authService.logout();
    this.rootPage = SigninPage;
  }
}
