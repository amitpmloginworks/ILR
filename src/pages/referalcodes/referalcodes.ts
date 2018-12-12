import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { Storage } from '@ionic/storage';
import{SecurityProvider}from'../../providers/security/security';
import{Observable}from'rxjs/Rx';

/**
 * Generated class for the ReferalcodesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-referalcodes',
  templateUrl: 'referalcodes.html',
})
export class ReferalcodesPage { 

  ReferalCode

  HostName
  constructor(public navCtrl: NavController, public navParams: NavParams, public view : ViewController,public http:Http, public str:Storage, public toastCtrl:ToastController,public security:SecurityProvider) {

    this.HostName=this.security.Hostname();  
  
  }


  close(){
this.view.dismiss();
  }

  submit() {  
    if(this.ReferalCode=="" || this.ReferalCode==undefined){
      this.toastCtrl.create({ message: 'Referal code is required.', duration: 4000, position: 'top' }).present(); return; 
    }
    this.http.post(this.HostName+'/admin/userapi/referalCode', { user_id:"", referral_code:this.ReferalCode   }).subscribe((data)=>{
   console.log(JSON.parse((<any>data)._body).status)
   let jsonstr=data.json();  
    if(jsonstr.status == 0)
    {
      this.toastCtrl.create({ message: jsonstr.message, duration: 4000, position: 'top' }).present(); return;
    } 

    if(jsonstr.status == 1)
    {
      localStorage['Refferalcode']=this.ReferalCode; 
      this.toastCtrl.create({ message: jsonstr.message, duration: 4000, position: 'top' }).present(); 
      this.view.dismiss();
      return;
    } 
  })
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReferalcodesPage');
  }

}
