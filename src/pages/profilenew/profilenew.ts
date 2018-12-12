import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import{ProfileaddfamilyPage}from'../profileaddfamily/profileaddfamily';

/**
 * Generated class for the ProfilenewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
  
@IonicPage()
@Component({
  selector: 'page-profilenew',
  templateUrl: 'profilenew.html',
})
export class ProfilenewPage {
  ChildDetail:boolean=false;
  ChildDetailBtn:boolean=true;
  constructor(public navCtrl: NavController, public navParams: NavParams,private modalCtrl: ModalController) {
  }

  EditProfile()
  {
  }
 
  AddFamilyBtn()
  {
    let modalTips = this.modalCtrl.create(ProfileaddfamilyPage);
    modalTips.onDidDismiss(data => {   });  modalTips.present(); 
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilenewPage');
  }

}
