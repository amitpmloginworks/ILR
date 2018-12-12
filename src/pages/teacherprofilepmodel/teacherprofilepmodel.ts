import { Component } from '@angular/core';
import { IonicPage,MenuController, NavController, NavParams, ViewController,LoadingController, ToastController } from 'ionic-angular';
import{SecurityProvider}from'../../providers/security/security';
import{Observable}from'rxjs/Rx';
import { Events } from 'ionic-angular';
import { InAppBrowser , InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { Stripe } from '@ionic-native/stripe';
import{bigdata}from'../../app/models';
import{LoyalityPage}from'../loyality/loyality'
import { ContactUsPage } from '../contact-us/contact-us';


/**
 * Generated class for the TeacherprofilepmodelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teacherprofilepmodel',
  templateUrl: 'teacherprofilepmodel.html',
})
export class TeacherprofilepmodelPage {

  sendGifts

  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'yes',//Windows only    
};
giftbox=[]
EarnPoint1
userdata
  constructor(public menuCtrl:MenuController,public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,public loadingCtrl:LoadingController,public security:SecurityProvider,public toastCtrl:ToastController,public events: Events, private stripe: Stripe,private theInAppBrowser: InAppBrowser,public bdata:bigdata) {
    this.userdata=this.bdata.userdata 
    this.sendGifts=this.navParams.get("sendGiftsData");
    this.EarnPoint1=this.navParams.get("EarnPoint"); 
    this.giftbox=[
      {'image':'assets/imgs/redemption/item01.png','points':'10,000'},
      {'image':'assets/imgs/redemption/item02.png','points':'15,000'},
      {'image':'assets/imgs/redemption/item01.png','points':'20,000'}
    ]
  
   this.events.subscribe('teachearn:earnpoint', (user, time) => {  this.EarnPoint1=user;   }); 
  }



  public openWithSystemBrowser(url : string){
    let target = "_system";
    this.theInAppBrowser.create(url,target,this.options);
}
public openWithInAppBrowser(url : string){
    let target = "_blank";
    this.theInAppBrowser.create(url,target,this.options);
}
public openWithCordovaBrowser(url : string){
    let target = "_self";
    this.theInAppBrowser.create(url,target,this.options);
} 


stripetest()
{
  this.stripe.setPublishableKey('pk_test_SNoG0U95KsYSEdLIrd05HZZW');
  
let card = {
 number: '4242424242424242',
 expMonth: 12,
 expYear: 2020,
 cvc: '220'
};

this.stripe.createCardToken(card)
   .then((token) =>{ 
  
   }
  )
   .catch((error) =>
     {
   
     }
    );
}
ionViewWillEnter () {
  this.menuCtrl.swipeEnable( true, 'menu2' );
  }
NavPoints()  {
   this.navCtrl.push(LoyalityPage)
}  

  GivePoint(id,totalPoint)  {
    if(this.EarnPoint1 <= totalPoint){   
      this.toastCtrl.create({  message: 'You do not have enough coins to redeem this gift', duration: 5000, position: 'top'  }).present();
      return;  
    }     
    let loading=this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
      cssClass: 'transparent'
    })
    Observable.of(loading).flatMap(loading=>loading.present())
          .flatMap(() => this.security.RedeemPointsBtn(id))
         .subscribe(data=>{
           loading.dismiss()
           console.log(data);  
           this.toastCtrl.create({  message: data.message, duration: 5000, position: 'top'  }).present();
           if(data.status==1)  {  
            this.EarnPoint1=data.total_points
            this.events.publish('teachearn:earnpoint', data.total_points, Date.now());
           }   
}, err=>{
  loading.dismiss();  
  this.toastCtrl.create({ message: `No internet connection, please try again.`, duration: 5000, position: 'top' }).present(); 
}
)  
  }

  close() { this.viewCtrl.dismiss();  }

  HelpBtnClick(){    this.navCtrl.push(ContactUsPage);   }  

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherprofilepmodelPage');
  }

}
