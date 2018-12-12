import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import{Observable}from'rxjs/Rx'
import{SecurityProvider}from'../../providers/security/security'
import{ImagazinespagePage}from'../imagazinespage/imagazinespage'
/**
 * Generated class for the RightnavigationmenuscreenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rightnavigationmenuscreen',
  templateUrl: 'rightnavigationmenuscreen.html',
})
export class RightnavigationmenuscreenPage {

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public loadingCtrl:LoadingController,
    public security:SecurityProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RightnavigationmenuscreenPage');
  }

    choosedailypost(id)
    {
      let loading=this.loadingCtrl.create({content:'Please Wait..'})
Observable.of(loading).flatMap(loading=>loading.present())
      .flatMap(() => this.security.dailypost(

        id

      ))
     .subscribe(data=>{
       loading.dismiss()
        if(data.status==0){
    }
    else{
      this.navCtrl.push(ImagazinespagePage,{daily_posts:data.daily_posts})
  }
 })
    }


}
