import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ProfileshowfamilyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profileshowfamily',
  templateUrl: 'profileshowfamily.html',
})
export class ProfileshowfamilyPage {
  arrtemfamily
  userdata
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {
    this.arrtemfamily=this.navParams.get("arrtemfamily");
    console.log("this.arrtemfamily=",this.arrtemfamily)
    this.userdata=this.arrtemfamily[0];
  }



  close()
  {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileshowfamilyPage');
  }

}
