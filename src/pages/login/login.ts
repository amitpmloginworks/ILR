import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import{UserloginPage}from'../userlogin/userlogin'
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import{EnterdetailscreenPage}from'../enterdetailscreen/enterdetailscreen';
import{Observable}from'rxjs/Rx';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'



/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  userData: any;
  signup_type=2
  referalCode
  constructor(private googlePlus: GooglePlus,public navCtrl: NavController, public navParams: NavParams,private facebook: Facebook,public alertCtrl:AlertController,public http:Http, public toastCtrl:ToastController,public loadingCtrl:LoadingController,public security:SecurityProvider) { 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  navigatetoemail(){
    this.navCtrl.setRoot(UserloginPage)
  }


  
  loginWithFB() { 
    var fblogin=1
    this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
      this.facebook.api('me?fields=id,name,email,first_name,last_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
        this.userData = {email: profile['email'],last_name:profile['last_name'] ,first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name']}
     
      let alert = this.alertCtrl.create({
        title: 'Referral Code (if any):',
        inputs: [
          {
            name: 'Name',
            placeholder: 'Optional'
          }
        ],
        buttons: [
          {
            text: 'Skip',
            role: 'cancel',
            handler: data => {
              console.log('Cancel clicked');
              this.navCtrl.setRoot(EnterdetailscreenPage,{
                signup_type:this.signup_type,
                email: profile['email'],
                first_name:profile['first_name'],
                last_name:profile['last_name'],
                picture:this.userData.picture,
                fblogin:fblogin
              })

            }
          },
          {
            text: 'Submit',
            handler: data => {
              console.log(data);
              this.referalCode=data.Name;
              this.sendToRefferal(data.Name,fblogin);
            }
          }
        ],
        enableBackdropDismiss: false
      });
      alert.present();





      });
    }) .catch((e) =>{
 
    });
  }

  sendToRefferal(Reffercodes,fblogin)
  {

let userid="";
let loading=this.loadingCtrl.create({
  spinner: 'hide',
  content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
  cssClass: 'transparent'
})
        Observable.of(loading).flatMap(loading=>loading.present())
              .flatMap(() => this.security.sendReferralCode(userid,Reffercodes))
             .subscribe(data=>{
               loading.dismiss()
               if(data.status == 0)
               {
                 this.toastCtrl.create({ message: data.message, duration: 5000, position: 'top' }).present();
                 return;
               }
               if(data.status == 1)
               {
                 localStorage['Refferalcode']=Reffercodes;
                 this.toastCtrl.create({ message: data.message, duration: 5000, position: 'top' }).present();
                 this.navCtrl.setRoot(EnterdetailscreenPage,{
                   signup_type:this.signup_type,
                   email: this.userData.email,
                   first_name:this.userData.first_name,
                   last_name:this.userData.last_name,
                   picture:this.userData.picture,
                   fblogin:fblogin
                 }) 
                 return;
               }
             },(error)=>{
              loading.dismiss()
             })
  }
 

  loginWithGoogle()
  {
  var googlelogin=1
  this.googlePlus.login({
    'webClientId': '13821493895-ugpaih9nmmpj5ilbej6acc3tms3somu7.apps.googleusercontent.com'
  }).then((res) => {

    let alert = this.alertCtrl.create({
      title: 'Referral Code (if any):',
      inputs: [
        {
          name: 'Name',
          placeholder: 'Optional'
        }
      ],
      buttons: [
        {
          text: 'Skip',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
            this.navCtrl.setRoot(EnterdetailscreenPage,{
              signup_type:this.signup_type,
              googlelogin:googlelogin,
              first_name:res.givenName,
              picture:res.imageUrl,
              email:res.email
               })
            
          }
        },
        {
          text: 'Submit',
          handler: data => {
            console.log(data);
            this.referalCode=data.Name
            let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
let requestOptions=new RequestOptions({headers:headers})
let param=JSON.stringify( {
  user_id:localStorage['USERID'],
  referral_code: data.Name
})
                   this.http.post('https://www.readsfeed.com/admin/userapi/referalCode', param, requestOptions)
                  .subscribe((data)=>{
                    console.log(JSON.parse((<any>data)._body).status)
                    if(JSON.parse((<any>data)._body).status == 0)
                    {
                      this.toastCtrl.create({ message: JSON.parse((<any>data)._body).message, duration: 3000, position: 'top' }).present();
                      return;
                    }
                    if(JSON.parse((<any>data)._body).status == 1)
                    {
                      localStorage['Refferalcode']=this.referalCode;
                      this.toastCtrl.create({ message: JSON.parse((<any>data)._body).message, duration: 3000, position: 'top' }).present();
                      this.navCtrl.setRoot(EnterdetailscreenPage,{
                        signup_type:this.signup_type,
                        googlelogin:googlelogin,
                        first_name:res.givenName,
                        picture:res.imageUrl,
                        email:res.email
                         }) 
                      return;
                    }
                
                  })

          }
        }
      ],
      enableBackdropDismiss: false
    });
    alert.present();
 


 


    })
    .catch((err) =>{

    });
  }
  testlogin()
  {
    this.navCtrl.setRoot(UserloginPage,{
      signup_type:this.signup_type
    })
  }
}
