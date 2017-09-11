import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LegalPage } from '../legal/legal';

/**
 * Generated class for the AboutusPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-aboutus',
  templateUrl: 'aboutus.html',
})
export class AboutusPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutusPage');
  }

  onGoToLegal(){
  	this.navCtrl.push(LegalPage);
  }
}
