import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,LoadingController ,Events } from 'ionic-angular';
import{SecurityProvider}from'../../providers/security/security';
import{Observable}from'rxjs/Rx';
import{ImagzinedetailPage}from'../imagzinedetail/imagzinedetail'
/**
 * Generated class for the ReactionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reactions',
  templateUrl: 'reactions.html',
})
export class ReactionsPage {
  content_id
  constructor(public events:Events,public security:SecurityProvider,public loadingCtrl:LoadingController,public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
 this.content_id=this.navParams.get("content_id")
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReactionsPage');
  }
  // Calling like api 
  share(reactions){
    let loading=this.loadingCtrl.create({ spinner: 'hide',
    content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
    cssClass: 'transparent'})
    Observable.of(loading).flatMap(loading=>loading.present())
          .flatMap(() => this.security.contentLikeAdd(this.content_id,reactions))
         .subscribe(data=>{
           loading.dismiss()
           this.navCtrl.pop().then(() => {
        });
         })
}
}
