import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import{SecurityProvider}from'../../providers/security/security'
import{Observable}from'rxjs/Rx'
/**
 * Generated class for the LoyalityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loyality',
  templateUrl: 'loyality.html',
})
export class LoyalityPage {
  loyalitypoints
  totalrewards=0
  points:number
  totalPoints:any;
  constructor(public loadingCtrl:LoadingController,public security:SecurityProvider,public navCtrl: NavController, public navParams: NavParams) {

    // Calling loyalty api ..
let loading=this.loadingCtrl.create({
  spinner: 'hide',
  content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
  cssClass: 'transparent'
})
 Observable.of(loading).flatMap(loading=>loading.present())
 .flatMap(()=> this.security.loyalpoints())
 .subscribe(data=>{
   loading.dismiss()
   this.loyalitypoints=data.loyalty_points
    for(var i=0;i<this.loyalitypoints.length;i++)
    {
      this.points=parseInt(data.loyalty_points[i].points)
        this.totalrewards=  this.points+this.totalrewards 
       
    } 

this.totalPoints=data.total_points;


 })
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoyalityPage');
  }

}
