import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular'; 

/**
 * Generated class for the TeacherprofilemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teacherprofilem',
  templateUrl: 'teacherprofilem.html',
})
export class TeacherprofilemPage {
  sendGifts
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
    this.sendGifts=this.navParams.get("StdOnOff");
  }


  close() { this.viewCtrl.dismiss();  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherprofilemPage'); 
  }

}
