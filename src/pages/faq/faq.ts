import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController,LoadingController, MenuController} from 'ionic-angular';
import{SecurityProvider}from'../../providers/security/security'
import{Observable}from'rxjs/Rx'
import { DomSanitizer, BrowserModule } from '@angular/platform-browser'
/**
 * Generated class for the FaqPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html',
})
export class FaqPage {
  htmledittexts
  constructor(public alertCtrl:AlertController,public platform:Platform,public santizer: DomSanitizer,public loadingCtrl:LoadingController,public security:SecurityProvider,public navCtrl: NavController, public navParams: NavParams, private menu: MenuController) {
    // Calling FAQ API  ..
    let loading=this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
      cssClass: 'transparent'
    })
    Observable.of(loading).flatMap(loading=>loading.present())
          .flatMap(() => this.security.FAQ())
         .subscribe(data=>{
           loading.dismiss()
           this.htmledittexts = santizer.bypassSecurityTrustHtml(data.faq.faq)
         })

              
    // Register for android's system back button
    let backAction = platform.registerBackButtonAction(() => {
      let alert=this.alertCtrl.create({
        title: 'Exit?',
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
    console.log('ionViewDidLoad FaqPage');
  }

}
