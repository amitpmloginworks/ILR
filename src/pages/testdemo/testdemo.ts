import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser , InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { Stripe } from '@ionic-native/stripe';
/**
 * Generated class for the TestdemoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-testdemo',
  templateUrl: 'testdemo.html',
})
export class TestdemoPage {
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
  constructor(private stripe: Stripe,public navCtrl: NavController, public navParams: NavParams,private theInAppBrowser: InAppBrowser) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestdemoPage');
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
    alert(token.id)
   }
  )
   .catch((error) =>
     {
       alert(error)
     }
    );
}


}
