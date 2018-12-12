import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController,AlertController, ViewController,ModalController} from 'ionic-angular';
import{PaymentgatewayPage}from'../paymentgateway/paymentgateway'
import{SubscribeNowPage}from'../subscribe-now/subscribe-now'
import{SecurityProvider}from'../../providers/security/security'
import{Observable}from'rxjs/Rx'
import{RightnavigationmenuscreenPage}from'../rightnavigationmenuscreen/rightnavigationmenuscreen'
import{SubauthPage}from'../subauth/subauth'; 
import{AreciptnoPage}from'../areciptno/areciptno'; 

/**
 * Generated class for the AsksubscribePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({  
  selector: 'page-asksubscribe',
  templateUrl: 'asksubscribe.html',
})
export class AsksubscribePage {
  product
  ReciptNumber
  events 
  
  actualamount:number = 0; 

  constructor(public alertCtrl:AlertController,public security:SecurityProvider,public loadingCtrl:LoadingController,public navCtrl: NavController, public navParams: NavParams,private viewCtrl: ViewController,private modalCtrl: ModalController) {  
      this.events='yes'
    this.product=this.navParams.get('product')
  }

  ionViewWillEnter()  {    
}
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AsksubscribePage');
  }
  
  mcqAnswer(event) { 
    this.events=event
     if(this.events=='yes'){
      this.viewCtrl.dismiss();
      let modalTips1 = this.modalCtrl.create(AreciptnoPage,{ product:this.product  }); 
      modalTips1.onDidDismiss(data => {   });  modalTips1.present(); 
     }
     else if(this.events=='no'){
      this.viewCtrl.dismiss();
         //this.navCtrl.push(SubscribeNowPage,{product:this.product,NewUser:"1"}); 

     }
  }


  Subscribe() {
    if(this.events=='no') {  this.navCtrl.push(SubscribeNowPage,{product:this.product});   }
    else{
   // Calling Recipt API  .. 
    let loading=this.loadingCtrl.create({content:'Please Wait..'})
    Observable.of(loading).flatMap(loading=>loading.present()).flatMap(() => this.security.reciptnumber(this.ReciptNumber)).subscribe(data=>{
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

      //  let alert=this.alertCtrl.create({
      //      title: data.message,
      //      buttons: [{
      //        text:'Ok',
      //        role:'dismiss',
      //        handler:()=>{
      //         let modalTips = this.modalCtrl.create(SubauthPage);
      //         modalTips.onDidDismiss(data => { 
      //           this.navCtrl.push(SubscribeNowPage,{product:this.product,NewUser:"2"}) 
      //           });  modalTips.present(); 
      //        }
      //      }]
      //     });
      //     alert.present();

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
}




  showtheamount(actualamount,receiptID) {
    let alert = this.alertCtrl.create({
      title: 'Your Amount is',
      subTitle: actualamount,
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



}
