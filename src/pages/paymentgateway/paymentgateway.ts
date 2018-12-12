import { Component } from '@angular/core'; 
import { IonicPage, NavController, NavParams,LoadingController,AlertController, ToastController } from 'ionic-angular';
import{bigdata}from'../../app/models'
import{SecurityProvider}from'../../providers/security/security'
import{Observable}from'rxjs/Rx'
import{RightnavigationmenuscreenPage}from'../rightnavigationmenuscreen/rightnavigationmenuscreen'
import{ImagazinespagePage}from'../imagazinespage/imagazinespage'
import{UserloginPage}from'../userlogin/userlogin'
import{FormBuilder,FormGroup,Validators}from'@angular/forms'
import { FormControl, AbstractControl } from '@angular/forms'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import{MyprofileupPage}from'../myprofileup/myprofileup'
import{TeacherprofilepPage}from'../teacherprofilep/teacherprofilep'  
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';

@IonicPage()
@Component({
  selector: 'page-paymentgateway',
  templateUrl: 'paymentgateway.html',
})
export class PaymentgatewayPage {
  ValidateForm: FormGroup
  username
  actualamount
  product
  cardNumber
  cardMonth
  cardYear
  cardCvv
  month
  myYear
  CVV
  currency
  maxDate="2050" 
  event
  subscription
 
  values
  user_magazine
  private minyear : string = (new Date().getFullYear()).toString();
  private minmonth: string = (new Date().getFullYear()+1 + '-' + new Date().getMonth()+1 + '-' + new Date().getDate()).toString();
  cardNumberIf:boolean=true  
   monthIf:boolean=true
    myYearIf:boolean=true 
   CVVIf:boolean=true
   pageNav



   PaypalSelectimg:boolean=false;
   PaypalUnSelectimg:boolean=true;
   StripeSelectimg:boolean=false;
   StripeUnSelectimg:boolean=true;
   NextBtnDisable:boolean=false;
 
   PaypalStripe 
   CardDataShow:boolean=false;
   ActualAmt
   OfflineUser:number=0;
   receiptID:any="";
   HostName
  constructor(public http:Http,public alertCtrl:AlertController,public formbuilder:FormBuilder,public loadingCtrl:LoadingController,public security:SecurityProvider,public bdata:bigdata,public navCtrl: NavController, public navParams: NavParams, public toastCtrl:ToastController,private payPal: PayPal) {
   
    
    this.HostName=this.security.Hostname();  


   this.actualamount="$"+this.navParams.get('actualamount') 
   this.ActualAmt=this.navParams.get('actualamount') 
   this.product=this.navParams.get('product')
   this.event=this.navParams.get('event')
   this.subscription=this.navParams.get('subscription')
   this.pageNav=this.navParams.get('pageNav')

   let cardNumberExpression="^[0-9]{16}$"
   let monthExpression="^[0-9]{2}$"
   let yearExpression="^[0-9]{4}$"
   let cvvExpression="^[0-9]{3}$"

   if(this.navParams.get('receiptID') != undefined){
    this.OfflineUser=this.navParams.get('OfflineUser');     
    this.receiptID= this.navParams.get('receiptID');
   }
 

  }

  PaypalUnSelectBtn()
  {
this.PaypalSelectimg=true;
this.PaypalUnSelectimg=false;
this.StripeSelectimg=false;
this.StripeUnSelectimg=true;

this.NextBtnDisable=true;
this.PaypalStripe="paypal"
this.CardDataShow=true;
  }
  PaypalSelectBtn()
  {
    this.PaypalSelectimg=false;
    this.PaypalUnSelectimg=true;
    this.StripeSelectimg=false;
    this.StripeUnSelectimg=true;

    this.NextBtnDisable=false;
    this.CardDataShow=false;
  }

  StripeSelectBtn()
  {
    this.PaypalSelectimg=false;
    this.PaypalUnSelectimg=true;
    this.StripeSelectimg=false;
    this.StripeUnSelectimg=true;

    this.NextBtnDisable=false;
    this.CardDataShow=false;
  }
  StripeUnSelectBtn()
  {
    this.PaypalSelectimg=false;
    this.PaypalUnSelectimg=true;
    this.StripeSelectimg=true;
    this.StripeUnSelectimg=false;

    this.NextBtnDisable=true;
    this.PaypalStripe="stripe"
    this.CardDataShow=true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentgatewayPage');
  }


  navigatetopayment() {

    this.currency='SGD';
    if(this.PaypalStripe=="stripe") {
    if(this.cardNumber=="" || this.cardNumber==undefined)
    {
      this.toastCtrl.create({ message: `Enter card number`, duration: 3000, position: 'top' }).present();
      return;
    }

    if(this.cardNumber.length<= 15 || this.cardNumber.length >16 )
    {
      this.toastCtrl.create({ message: `Please enter 16 digits card number.`, duration: 3000, position: 'top' }).present();
      return;
    }
    if(this.cardMonth==undefined)
    {
      this.toastCtrl.create({ message: `Please select month`, duration: 3000, position: 'top' }).present();
      return;
    }
    if(this.myYear==undefined)
    {
      this.toastCtrl.create({ message: `Please select year`, duration: 3000, position: 'top' }).present();
      return;
    }
    if(this.CVV=="" || this.CVV==undefined)
    {
      this.toastCtrl.create({ message: `CVV Code is required.`, duration: 3000, position: 'top' }).present();
      return;
    }

    let paymentID="";
    this.CallToAPI(paymentID)
  
  }
  
  if(this.PaypalStripe=="paypal") {
    this.cardNumber="";   
    this.cardMonth="";
    this.myYear="";
    this.CVV="";
    this.PaypalPayment(this.ActualAmt); 
  }

}

  
PaypalPayment(Amounts){
  this.payPal.init({
    PayPalEnvironmentProduction: 'AZ0pKY1B0TdV2NvtihDgaanO22BIHjydaUc55DWGQ8nakr_GQXVJr7Hagr2oStosIinKioa71MB2vQfb',
    PayPalEnvironmentSandbox: 'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R'
  }).then(() => {
    // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
    this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
      // Only needed if you get an "Internal Service Error" after PayPal login!
      //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
    })).then((resrender) => {
      console.log("resrender == ", resrender)    
      let payment = new PayPalPayment(Amounts, this.currency, 'Readsfeed application payment', 'sale'); 
      this.payPal.renderSinglePaymentUI(payment).then((res) => {
        console.log("response == ", res)
        // Successfully paid  
        let paymentid=res.response.id;
          this.CallToAPI(paymentid);  
        // Example sandbox response
        // {
        //   "client": {
        //     "environment": "sandbox",
        //     "product_name": "PayPal iOS SDK",
        //     "paypal_sdk_version": "2.16.0",
        //     "platform": "iOS"
        //   },
        //   "response_type": "payment",
        //   "response": {
        //     "id": "PAY-1AB23456CD789012EF34GHIJ",
        //     "state": "approved",
        //     "create_time": "2016-10-03T13:33:33Z",
        //     "intent": "sale"
        //   }
        // }
      }, (errdialog) => {
        // payment cancelled   
        console.log("errdialog == ", errdialog);
        this.toastCtrl.create({ message: 'Payment cancelled ', duration: 3000, position: 'top' }).present();
        return;
        // Error or render dialog closed without being successful
      });
    }, (errconfig) => {
      console.log("errconfig == ", errconfig)
      // Error in configuration
      this.toastCtrl.create({ message: 'Error in configuration', duration: 3000, position: 'top' }).present();
      return;
    });
  }, (errinitialization) => {
    console.log("errinitialization == ", errinitialization)
    // Error in initialization, maybe PayPal isn't supported or something else
    this.toastCtrl.create({ message: "Error in initialization, maybe PayPal isn't supported or something else", duration: 3000, position: 'top' }).present();   
    return;
  });
}


CallToAPI(paymentID){   
  // Calling Payment API  ..   
  let loading=this.loadingCtrl.create({
    spinner: 'hide',
        content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
        cssClass: 'transparent'
  })
  Observable.of(loading).flatMap(loading=>loading.present())
        .flatMap(() => this.security.payment( 
  this.product,this.ActualAmt,this.cardNumber,this.cardMonth,this.myYear,this.CVV,this.currency,this.event,this.subscription,this.PaypalStripe,this.OfflineUser,paymentID ))
       .subscribe(data=>{
         loading.dismiss()
   
          if(data.status==0){
         let alert = this.alertCtrl.create({
          title:data.message,
          buttons: [ { text: 'OK', role: 'cancel', handler: () => {   }   }]
        });
        alert.present(); 
      }
      else{
  
          // Calling referalCode HTML request .. 
        let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
        let requestOptions=new RequestOptions({headers:headers})
        let param=JSON.stringify( { user_id:localStorage['USERID'], referral_code:localStorage['Refferalcode'],is_offline_user:this.OfflineUser ,receipt_id:this.receiptID  })  
        this.http.post(this.HostName+'/admin/userapi/referalCode', param,requestOptions).subscribe((data)=>{  localStorage['Refferalcode']="";     })
        
        if(this.pageNav =="Parentprofile")
        {
        
          this.toastCtrl.create({ message: data.message, duration: 3000, position: 'top' }).present();
          if(localStorage['usrrole'] == 1)
          {
            this.navCtrl.setRoot(ImagazinespagePage);  return; 
          }
          if(localStorage['usrrole'] == 2)
          {
            this.navCtrl.setRoot(ImagazinespagePage);  return; 
          }
          if(localStorage['usrrole'] == 3)
          {
            this.navCtrl.setRoot(MyprofileupPage);  return; 
          }
        }
        else{
          this.usrlogin(localStorage['loguser'], localStorage['logpass']);
        }
      }
       },
       err =>{  loading.dismiss(); console.log("payment == ",err); }
      ) 
}


usrlogin(usrname,password)
{
    // Calling Login API ..
  let loading=this.loadingCtrl.create({ 
    spinner: 'hide',
    content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
    cssClass: 'transparent'
    })
Observable.of(loading).flatMap(loading=>loading.present())
     .flatMap(() => this.security.login(usrname,password))
    .subscribe(data=>{
      loading.dismiss()
    if(data.status==0)
    {
      let alert = this.alertCtrl.create({
        title: data.message,
        buttons: ['Dismiss']
      });
      alert.present();
    }
    else{
      if(data.user.is_active==1)      {    

   this.bdata.userdata=data.user
   this.user_magazine=data.user_magazine
   this.bdata.UsrTextType=data.user_text_type
   this.bdata.ContentNature=data.content_nature
localStorage['usrrole']=data.user.role
localStorage['USERID']=data.user.id
localStorage['email']=data.user.email
localStorage['token']=data.token
console.log(localStorage['USERID'])
console.log(this.user_magazine)
   for(var i=0;i<this.user_magazine.length;i++){
   this.product.push({
    magazine_id:this.user_magazine[i].magazine_id
        }) 
        console.log('product'+JSON.stringify(this.product))
}
console.log('hi'+this.bdata.userdata)
this.toastCtrl.create({ message: `SignIn Succesfully`, duration: 3000, position: 'top' }).present();
if(localStorage['usrrole'] == 1)
{
  this.navCtrl.setRoot(ImagazinespagePage);  return; 
}
if(localStorage['usrrole'] == 2)
{
  this.navCtrl.setRoot(ImagazinespagePage);  return; 
}
if(localStorage['usrrole'] == 3)
{
  this.navCtrl.setRoot(MyprofileupPage);  return; 
}

    }
else{
  let alert = this.alertCtrl.create({
    title:'User is not active, Please contact Admin.',
    buttons: [
      {
        text: 'OK',
        role: 'cancel',
        handler: () => {
        }
      }]
  });
  alert.present();
}




    }
})
}





MobCheck(vale)
{
  if(vale.length==16) 
  {
    return false;
  }
}

  

CVVCheck(vale)
{
  if(vale.length==3) 
  {
    return false;
  } 
}

}