import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { Storage } from '@ionic/storage';
import{SubscribeNowPage}from'../subscribe-now/subscribe-now'
import{SecurityProvider}from'../../providers/security/security'
import{Observable}from'rxjs/Rx'
import{PaymentgatewayPage}from'../paymentgateway/paymentgateway'

/**
 * Generated class for the AreciptnoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-areciptno',
  templateUrl: 'areciptno.html',
})
export class AreciptnoPage {  

  ReferalCode
  product
  actualamount
  constructor(public navCtrl: NavController, public navParams: NavParams, public view : ViewController,public http:Http, public str:Storage, public toastCtrl:ToastController,public security:SecurityProvider,public loadingCtrl:LoadingController,public alertCtrl:AlertController) {  

    this.product=this.navParams.get('product')
  }

  close(){

    this.view.dismiss();
  }

  submit() {  
    if(this.ReferalCode=="" || this.ReferalCode==undefined){
      this.toastCtrl.create({ message: 'Enter Official Receipt Number.', duration: 5000, position: 'top' }).present(); return;  
    }

    this.Subscribe();  

  }

  
  Subscribe() {
   // Calling Recipt API  .. 
  let loading=this.loadingCtrl.create({ 
    spinner: 'hide',
    content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
    cssClass: 'transparent'
    })
    Observable.of(loading).flatMap(loading=>loading.present()).flatMap(() => this.security.reciptnumber(this.ReferalCode)).subscribe(data=>{
           loading.dismiss()
           console.log("data==",data)  
    if(data.status==0)  {
        let alert=this.alertCtrl.create({
          title: data.message,
          buttons: [{
          text:'Ok',
          role:'dismiss',
          handler:()=>{   }
        }]
      });
   alert.present();
  }
  else{  
       // Calling Calculate amount API  .. 
        let loading=this.loadingCtrl.create({
          spinner: 'hide',
          content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
          cssClass: 'transparent'
        })
        Observable.of(loading).flatMap(loading=>loading.present()) .flatMap(() => this.security.getmeamount("","offline",this.product)).subscribe(data1=>{
               loading.dismiss()
    if(data1.status==1)  {
              this.actualamount=data1.amount
          this.showtheamount(this.actualamount,data.receipt_number[0].id)  
    }
        },err =>{
          loading.dismiss()
        })



     }       
  })

}




  showtheamount(actualamount,receiptID) {  
    let alert = this.alertCtrl.create({
      title: 'Your Amount is $'+actualamount,  
      buttons: [ {
        text: "OK",
        handler: data => {   
        console.log(data);
         this.navCtrl.push(PaymentgatewayPage,{ event:"", actualamount:actualamount, product:this.product,subscription:"offline",pageNav:"login",OfflineUser:"1",receiptID:receiptID})
        }
    }]
    });
    alert.present(); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AreciptnoPage');
  }

}
