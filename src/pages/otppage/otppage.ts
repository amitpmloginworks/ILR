import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, MenuController,LoadingController } from 'ionic-angular';
import{SecurityProvider}from'../../providers/security/security'
import{Observable}from'rxjs/Rx'
import{SubscribeNowPage}from'../subscribe-now/subscribe-now'

/**
 * Generated class for the OtppagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-otppage',
  templateUrl: 'otppage.html',
})
export class OtppagePage {

  masks: any;
 
  OtpNumber: any = "";
  product  
  constructor(public navCtrl: NavController, public navParams: NavParams,public menuCtrl:MenuController,public loadingCtrl:LoadingController,public security:SecurityProvider, public toastCtrl:ToastController) {

    this.masks = {
      OtpNumber: [/\d/, '-', /\d/,'-',/\d/,'-' ,/\d/,'-' ,/\d/,'-',/\d/]
  };
  this.product=this.navParams.get('product')

  
}
  
save(){


  let unmaskedData = this.OtpNumber.replace(/\D+/g, '');
if(unmaskedData==""){
  this.toastCtrl.create({ message: 'OTP is required.', duration: 5000, position: 'top' }).present(); return;
}
  console.log(unmaskedData);
  let loading=this.loadingCtrl.create({ 
    spinner: 'hide',
    content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
    cssClass: 'transparent'
    })
Observable.of(loading).flatMap(loading=>loading.present())
     .flatMap(() => this.security.UserOTP(unmaskedData))   
    .subscribe(data=>{  
      loading.dismiss()  
      console.log("opt =",data)
      if(data.status ==0){
        this.toastCtrl.create({ message: data.message, duration: 3000, position: 'top'}).present();
        return;
      }
      if(data.status == 1){
        this.navCtrl.push(SubscribeNowPage,{product:this.product,NewUser:"1"}) 
      }
  
},err=>{
  loading.dismiss()
  this.toastCtrl.create({ message: 'No internet connection, Please try again.', duration: 3000, position: 'top' }).present();
})     
}

 
ionViewWillEnter()  { 
  this.menuCtrl.swipeEnable( false, 'menu2' );
} 
  ionViewDidLoad() {
    console.log('ionViewDidLoad OtppagePage');
  }

}
