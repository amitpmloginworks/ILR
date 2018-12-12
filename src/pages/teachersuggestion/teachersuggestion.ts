import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the TeachersuggestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teachersuggestion',
  templateUrl: 'teachersuggestion.html',
})
export class TeachersuggestionPage {

  suggestlist
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController) {
    this.suggestlist=["https://www.loginworks.com/","https://www.loginworks.com/blogs/","https://www.loginworks.com/blogs/use-browser-features-javascript/","https://www.loginworks.com/blogs/use-browser-features-javascript/","https://www.loginworks.com/blogs/use-loops-php/"]
  }


  close() { this.viewCtrl.dismiss();  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TeachersuggestionPage');
  }

}
