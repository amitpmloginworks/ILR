import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController, AlertController } from 'ionic-angular';
import{bigdata}from'../../app/models'
import{SecurityProvider}from'../../providers/security/security'
import{Observable}from'rxjs/Rx'
import{SubscribeNowPage}from'../subscribe-now/subscribe-now'
import{AsksubscribePage}from'../asksubscribe/asksubscribe'
import{UserloginPage}from'../userlogin/userlogin'
import{ImagazinespagePage}from'../imagazinespage/imagazinespage'

/**
 * Generated class for the TrialPeriodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trial-period',
  templateUrl: 'trial-period.html',
})
export class TrialPeriodPage {
  product

  user_magazine:any; 
  constructor(public navCtrl: NavController, public navParams: NavParams,public bdata:bigdata, public toastCtrl:ToastController,public loadingCtrl:LoadingController,public security:SecurityProvider,public alertCtrl:AlertController) {
    this.product=this.navParams.get('product')
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad TrialPeriodPage');
  }
  subscribenow(){ 
    this.navCtrl.push(AsksubscribePage,{product:this.product})
  }



  
  starttrial()
  {
    let loading=this.loadingCtrl.create({ 
      spinner: 'hide',
      content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
      cssClass: 'transparent'
      })
  Observable.of(loading).flatMap(loading=>loading.present())
       .flatMap(() => this.security.login(localStorage['loguser'],localStorage['logpass']))
      .subscribe(data=>{
        loading.dismiss()
      if(data.status==0)
      {
        let alert = this.alertCtrl.create({
          title: data.message,
          buttons: ['Dismiss']
        });
        alert.present();
      }
      else{
     this.bdata.userdata=data.user
     this.user_magazine=data.user_magazine
     this.bdata.UsrTextType=data.user_text_type
     this.bdata.ContentNature=data.content_nature
  localStorage['usrrole']=data.user.role
  localStorage['USERID']=data.user.id
  localStorage['email']=data.user.email
  localStorage['token']=data.token
  console.log(localStorage['USERID'])
  console.log(this.user_magazine)
     for(var i=0;i<this.user_magazine.length;i++){
     this.product.push({
      magazine_id:this.user_magazine[i].magazine_id
          }) 
          console.log('product'+JSON.stringify(this.product))
  }
  console.log('hi'+this.bdata.userdata)
  this.toastCtrl.create({ message: `SignIn Succesfully`, duration: 3000, position: 'top' }).present();
                this.navCtrl.setRoot(ImagazinespagePage);
      }
  })
  }

}
