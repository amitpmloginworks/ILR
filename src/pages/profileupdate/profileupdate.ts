import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ProfileupdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profileupdate',
  templateUrl: 'profileupdate.html',
})
export class ProfileupdatePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileupdatePage');
  }
  close()
  {
    this.viewCtrl.dismiss();
  }

}
