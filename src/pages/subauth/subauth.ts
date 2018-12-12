import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the SubauthPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subauth',
  templateUrl: 'subauth.html',
})
export class SubauthPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl :ViewController) {
    setTimeout(() => {  viewCtrl.dismiss(); }, 4600);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubauthPage');
  }

}
