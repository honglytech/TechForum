import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Import from pages so that the app can be nevigated to those pages from current Page
import { ProfilePage } from '../profile/profile';
import { SigninPage } from '../signin/signin';
import { FollowingPage } from '../following/following';
import { FollowersPage } from '../followers/followers';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  // This constructor will allow the onToGoProfile to naviate to other pages of the application
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  onGoToSignin(){
  	this.navCtrl.push(SigninPage); 
  }

  onGoToProfile(){
  	this.navCtrl.push(ProfilePage); 
  }

  onGoToFollowing(){
  	this.navCtrl.push(FollowingPage); 
  }

  onGoToFollowers(){
  	this.navCtrl.push(FollowersPage); 
  }


}
