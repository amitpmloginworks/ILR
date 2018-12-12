import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import{SignupcategorypopPage}from'../signupcategorypop/signupcategorypop';

/**
 * Generated class for the SignupcategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({ 
  selector: 'page-signupcategory',
  templateUrl: 'signupcategory.html',
})
export class SignupcategoryPage { 

  constructor(public navCtrl: NavController, public navParams: NavParams,private modalCtrl: ModalController) {
  }

  ionViewWillEnter()  {  
    let modalTips = this.modalCtrl.create(SignupcategorypopPage);  modalTips.present();   
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupcategoryPage');
  }

}
