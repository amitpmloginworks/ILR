import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CommentsilrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-commentsilr',
  templateUrl: 'commentsilr.html',
})
export class CommentsilrPage {
  comments
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.comments=this.navParams.get("comments")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentsilrPage');
  }

}
