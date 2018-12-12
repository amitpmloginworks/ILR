import { Component } from '@angular/core';
import { IonicPage,Platform, NavController, NavParams,LoadingController,AlertController, ToastController } from 'ionic-angular';
import{SecurityProvider}from'../../providers/security/security'
import{Observable}from'rxjs/Rx'
import{SocialSharing}from'@ionic-native/social-sharing'
import{bigdata}from'../../app/models';

/**
 * Generated class for the RefferalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-refferal',
  templateUrl: 'refferal.html',
})
export class RefferalPage {
  refferalcode
  phonenumber
  allContacts
  url
  giftbox=[];
  userdata 
  UpImgUsr  
  constructor(public platform:Platform,public alertCtrl:AlertController,public socialsharing:SocialSharing,public security:SecurityProvider,public loadingCtrl:LoadingController,public navCtrl: NavController, public navParams: NavParams,public bdata:bigdata,  public toastCtrl: ToastController) {
    this.userdata=this.bdata.userdata 
    this.UpImgUsr=this.userdata.user_image
    this.url="https://play.google.com/store/apps/details?id=com.readsfeed.app";  
  
    this.giftbox=[{'image':'assets/imgs/refferal/jane.png','textheader':'Jane','textcontent':' invites a friend. Copy the referral code under the referral programme.','inviteno':'One'},{'image':'assets/imgs/refferal/marcus.png','textheader':'Jane','textcontent':" invites a friend. Copy the referral code under the referral programme.",'inviteno':'Two'},{'image':'assets/imgs/refferal/bella.png','textheader':'Jane','textcontent':" invites a friend. Copy the referral code under the referral programme.",'inviteno':'Three'}]

// Register for android's system back button
let backAction = platform.registerBackButtonAction(() => {
  let alert=this.alertCtrl.create({
    message: 'Do you want to exit the app?',
    buttons: [
    {
    text: 'Cancel',
    role: 'cancel',
    handler: () => {
    
    }
    },
    {
    text: 'Exit',
    handler: () => {
    platform.exitApp();
    }
    }
    ]
    })
    alert.present()


  },)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RefferalPage');
    this.refferalcontent()
  }


  refferalcontent()
  {
    let loading=this.loadingCtrl.create({ spinner: 'hide',
    content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
    cssClass: 'transparent'})
    Observable.of(loading).flatMap(loading=>loading.present())
          .flatMap(() => this.security.refferalcode())
          .subscribe(data=>{
           loading.dismiss()
           
         
           if(data.referral.referral_code != "")
           {
            this.refferalcode=data.referral.referral_code;
           }
          })
  }

// Share referral code on social networks

  WhatsApp(){
   if(this.refferalcode ==undefined || this.refferalcode =="")
  {
    return;
  } 
  let MegShare="Hello, "+this.bdata.userdata.first_name+" likes Readsfeed, and he/she thinks that you may like it too. Come onboard and sign up a trial account for 14 days. Use Readsfeed code "+this.refferalcode+" to Sign up. Click Here "+this.url+" to download the Readsfeed app.";
this.socialsharing.shareViaWhatsApp(MegShare).then((data)=>{
}).catch((err)=>{
  this.toastCtrl.create({ message: 'App is not installed ,Please Download the app.', duration: 3000, position: 'top' }).present();
});
}



  TwitterShare()
  { 
    if(this.refferalcode ==undefined || this.refferalcode =="")   {    return;     } 
    let MegShare="Hello, "+this.bdata.userdata.first_name+" likes Readsfeed, and he/she thinks that you may like it too. Come onboard and sign up a trial account for 14 days. Use Readsfeed code "+this.refferalcode+" to Sign up. Click Here "+this.url+" to download the Readsfeed app.";
  this.socialsharing.shareViaTwitter(MegShare,'', '').then((data)=>{
  }).catch((err)=>{
    this.toastCtrl.create({ message: 'App is not installed ,Please Download the app.', duration: 3000, position: 'top' }).present();
  }); 
  }
 
  
  Instagram()
  {
   
    if(this.refferalcode ==undefined || this.refferalcode =="")
    {
      return;
    } 
    let MegShare=" Hello, "+this.bdata.userdata.first_name+" likes Readsfeed, and he/she thinks that you may like it too. Come onboard and sign up a trial account for 14 days. Use Readsfeed code "+this.refferalcode+" to Sign up. Click Here "+this.url+" to download the Readsfeed app.";  
  
  this.socialsharing.shareViaInstagram(MegShare,'').then((data)=>{
  }).catch((err)=>{
  this.toastCtrl.create({ message: 'App is not installed ,Please Download the app.', duration: 3000, position: 'top' }).present();
  }); 
  }
  
  
  Messenger()
  {
    if(this.refferalcode ==undefined || this.refferalcode =="")
    {
      return;
    } 
    let MegShare="Hello, "+this.bdata.userdata.first_name+" likes Readsfeed, and he/she thinks that you may like it too. Come onboard and sign up a trial account for 14 days. Use Readsfeed code "+this.refferalcode+" to Sign up. Click Here "+this.url+" to download the Readsfeed app.";
  
  this.socialsharing.shareViaFacebookWithPasteMessageHint(MegShare,null, null, 'Hold the Post input to paste message ').then((data)=>{
  }).catch((err)=>{
    this.toastCtrl.create({ message: 'App is not installed ,Please Download the app.', duration: 3000, position: 'top' }).present();
  });  
  } 
 


getphonember()
{

  if(this.refferalcode ==undefined || this.refferalcode =="")
  {
    return;
  } 

  let MegShare="Hello, "+this.bdata.userdata.first_name+" likes Readsfeed, and he/she thinks that you may like it too. Come onboard and sign up a trial account for 14 days. Use Readsfeed code "+this.refferalcode+" to Sign up. Click Here "+this.url+" to download the Readsfeed app.";
  this.socialsharing.shareViaSMS(MegShare,'').then((data)=>{   
  }).catch((err)=>{
    this.toastCtrl.create({ message: 'App is not supported.', duration: 3000, position: 'top' }).present();
  });
}
}
