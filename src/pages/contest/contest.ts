import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController,MenuController, LoadingController } from 'ionic-angular';
import{SecurityProvider}from'../../providers/security/security'
import{Observable}from'rxjs/Rx'
import{ContestquestPage}from'../contestquest/contestquest';

/**
 * Generated class for the ContestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contest',
  templateUrl: 'contest.html',
})
export class ContestPage {

  constructor(public alertCtrl:AlertController, public platform:Platform,public navCtrl: NavController, public navParams: NavParams, private menu: MenuController, public security:SecurityProvider,public loadingCtrl:LoadingController) {
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
  GetQuestion()
  {
    this.navCtrl.push(ContestquestPage,{data:""})
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ContestPage');
  }

}
