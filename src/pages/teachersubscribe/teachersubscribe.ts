import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController,LoadingController, ModalController, ToastController } from 'ionic-angular';
import{AsksubscribePage}from'../asksubscribe/asksubscribe'
import{PaymentgatewayPage}from'../paymentgateway/paymentgateway'
import{SecurityProvider}from'../../providers/security/security'
import{Observable}from'rxjs/Rx'
import{SubexpiryPage}from'../subexpiry/subexpiry';
import{bigdata}from'../../app/models'
import{TeacherprofilepPage}from'../teacherprofilep/teacherprofilep'
import{SubauthPage}from'../subauth/subauth'
import{PaymentoptionsPage}from'../paymentoptions/paymentoptions';

/**
 * Generated class for the TeachersubscribePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teachersubscribe',
  templateUrl: 'teachersubscribe.html',
})
export class TeachersubscribePage {  
  magzine_name=[]
Print
Digital
PrintorDigital
id
plan
event

actualamount
product
subscription

ExpiryShow:boolean =false; 
NewUserShow:boolean =false;
ExistUserShow:boolean =false;
NewUser
LicenseUser
trialCon:boolean =false;
NewUserShow1:boolean =false; 

AmtPrintDigital:any=0.00    
AmtDigital:any=0.00  

  constructor(public loadingCtrl:LoadingController,public security:SecurityProvider,public alertCtrl:AlertController,public navCtrl: NavController, public navParams: NavParams,private modalCtrl: ModalController,public bdata:bigdata, public toastCtrl:ToastController) {
    this.product=this.navParams.get('product')
    this.NewUser=this.navParams.get('NewUser') 
    this.LicenseUser=this.navParams.get('LicenseUser') 

    this.getmeamountShow("print_digital","yearly");
    this.getmeamountShow("digital","yearly");

  if(this.LicenseUser ==undefined ||  this.LicenseUser =="no")
  {
    if( this.NewUser ==1   ) { 
      this.NewUserShow1=true;
      this.NewUserShow=true;  
      this.ExpiryShow=true;
      this.trialCon=true; 
       }
  
       if( this.NewUser ==2   ) { 
        this.NewUserShow1=true; 
         this.ExpiryShow=true;  
         this.ExistUserShow=true; 
         this.trialCon=true; 
          }
          return;
  }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeachersubscribePage');
  }

  ionViewWillEnter()  { 
    if(this.LicenseUser =="no")
      {   
    if( this.NewUser ==4 ) {   
      let modalTips = this.modalCtrl.create(SubexpiryPage); 
      modalTips.onDidDismiss(data => { 
        this.trialCon=false; 
         this.ExpiryShow=true; 
         this.ExistUserShow=true;
         this.NewUserShow1=true;
          });  modalTips.present(); 
     }

     if( this.NewUser ==5 ) {           
        this.trialCon=false; 
         this.ExpiryShow=true; 
         this.ExistUserShow=true;
         this.NewUserShow1=true;
     } 


}

if(this.LicenseUser =="yes") 
{    
let modalTips = this.modalCtrl.create(SubauthPage);
modalTips.onDidDismiss(data => {  this.starttrialLogin("Sign In successfully");    });  modalTips.present(); 
}

}


 
TrialPeriodBtn()
{ 
  let loading=this.loadingCtrl.create({ 
    spinner: 'hide',
    content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
    cssClass: 'transparent'
    })
Observable.of(loading).flatMap(loading=>loading.present())
     .flatMap(() => this.security.TrialAPIBTN())
    .subscribe(data=>{
      loading.dismiss()
if(data.status==1)
{
this.starttrialLogin(data.message);
  return;
}
if(data.status==0)
{
  this.toastCtrl.create({ message: data.message, duration: 3000, position: 'top'}).present();
  return;
}
},err=>{
  loading.dismiss()
  this.toastCtrl.create({ message: 'No internet connection, Please try again.', duration: 3000, position: 'top' }).present();
})
}

starttrialLogin(msgShow)
{
  let loading=this.loadingCtrl.create({ 
    spinner: 'hide',
    content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
    cssClass: 'transparent'
    })
Observable.of(loading).flatMap(loading=>loading.present())
     .flatMap(() => this.security.login(localStorage['loguser'],localStorage['logpass']))
    .subscribe(data=>{
      loading.dismiss()
    if(data.status==0) {  this.alertCtrl.create({ title: data.message, buttons: ['Dismiss'] }).present();  }
    else{ 
   this.bdata.userdata=data.user
   this.bdata.UsrTextType=data.user_text_type
   this.bdata.ContentNature=data.content_nature
localStorage['usrrole']=data.user.role
localStorage['USERID']=data.user.id
localStorage['email']=data.user.email
localStorage['token']=data.token
this.toastCtrl.create({ message: msgShow, duration: 3000, position: 'top' }).present();
      this.navCtrl.setRoot(TeacherprofilepPage);
    }
},err=>
{
  loading.dismiss()
  this.toastCtrl.create({ message: 'No internet connection, Please try again.', duration: 3000, position: 'top' }).present();
}
)
}

 
DigitalBtn()
{ 

  let loading=this.loadingCtrl.create({
    spinner: 'hide',
    content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
    cssClass: 'transparent'
  })
  Observable.of(loading).flatMap(loading=>loading.present())
        .flatMap(() => this.security.saveRenew(this.product,"digital"))
       .subscribe(data=>{
         loading.dismiss()
if(data.status==1)
{ 
  this.getmeamount("digital","yearly");
}
  },err =>{
    loading.dismiss()
  })
  

 // this.getmeamount("digital","yearly");
}

 



DigitalPrintBtn()
{

  let loading=this.loadingCtrl.create({
    spinner: 'hide',
    content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
    cssClass: 'transparent'
  })
  Observable.of(loading).flatMap(loading=>loading.present())
        .flatMap(() => this.security.saveRenew(this.product,"print_digital"))
       .subscribe(data=>{
         loading.dismiss()
if(data.status==1)
{
        this.getmeamount("print_digital","yearly");
}
  },err =>{
    loading.dismiss()
  })

  //this.getmeamount("print_digital","yearly");
}


  SelectSelction(i)
  {
   this.id=i
  }


  mcqAnswer(event)
  {
    this.event=event
  }


  subscribe()
  {
  this.magzine_name=JSON.parse(localStorage['magzine_name'])
if(this.event==undefined){
  this.presentAlert('Please Select an Option');
}
else if(this.plan!=null){
  console.log('plan', this.plan);
 // this.getmeamount(this.plan);
}
else
this.presentAlert('please Select Plan');
}


  getmeamount(plans,yrtypes)
  {
    this.subscription=yrtypes
    let loading=this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
      cssClass: 'transparent'
    })
    Observable.of(loading).flatMap(loading=>loading.present())
          .flatMap(() => this.security.getmeamount(yrtypes,plans,this.product))
         .subscribe(data=>{
           loading.dismiss()
     
if(data.status==1)
{
          this.actualamount=data.amount
      this.showtheamount(this.actualamount,plans)  
}
    },err =>{
      loading.dismiss()
    })
  }


  showtheamount(actualamount,plans)
  {
    let alert = this.alertCtrl.create({  
      subTitle:'Your Amount is $'+ this.actualamount,
      buttons: [ {
        text: "OK",
        handler: data => {
        console.log(data);
         this.navCtrl.push(PaymentoptionsPage,{ event:plans, actualamount:actualamount, product:this.product,subscription:this.subscription,pageNav:"Parentprofile"}) 
        }
    }]
    });
    alert.present(); 
  }



  presentAlert(data) {
    let alert = this.alertCtrl.create({
      title: 'Dear user',
      subTitle: data,
      buttons: ['Dismiss']
    });
    alert.present();
  }


  getmeamountShow(plans,yrtypes) {
    // calling calculate amount  api ...
    this.subscription=yrtypes
    let loading=this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
      cssClass: 'transparent'
    })
    Observable.of(loading).flatMap(loading=>loading.present())
          .flatMap(() => this.security.getmeamount(yrtypes,plans,this.product))
         .subscribe(data=>{
           loading.dismiss()
           if(plans=='print_digital'){  
            this.AmtPrintDigital=data.amount 
           }
           if(plans=='digital'){
            this.AmtDigital=data.amount 
           }
         
    },err =>{
      loading.dismiss()
    })
  }




}
