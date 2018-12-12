import { Component } from '@angular/core';
import { IonicPage,MenuController, NavController, Platform,NavParams ,LoadingController,ToastController} from 'ionic-angular';
import{UserloginPage}from'../userlogin/userlogin'
import{EnterdetailscreenPage}from'../enterdetailscreen/enterdetailscreen'
import{FormBuilder,FormGroup,Validators}from'@angular/forms'
import { FormControl, AbstractControl } from '@angular/forms'
import{SecurityProvider}from'../../providers/security/security'
import{Observable}from'rxjs/Rx'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  username
  password
  ValidateForm: FormGroup
  signup_type=4
  email=null
  existalert:boolean
  RefferalMsg
  CodeFalse:boolean=false;
  CodeTrue:boolean=false; 

  userData

  HostName

  constructor(public platform:Platform,public menuCtrl:MenuController,public http:Http,public toastCtrl:ToastController,public loadingCtrl:LoadingController,public security:SecurityProvider,public formbuilder:FormBuilder,public navCtrl: NavController, public navParams: NavParams, public str:Storage,private googlePlus: GooglePlus,private facebook: Facebook) {

    this.HostName=this.security.Hostname();

    this.existalert=false
    let emailRegex =/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let passwordRegex = /^[a-zA-Z0-9-_!@#$%^&*]{4,15}$/;
    
    
    this.ValidateForm=formbuilder.group({
    username:['',Validators.compose([Validators.maxLength(30), Validators.required])],
    password:['',Validators.compose([Validators.maxLength(30), Validators.pattern(passwordRegex), Validators.required])]
    })


    // Register for android's system back button
let backAction = platform.registerBackButtonAction(() => {
  this.navCtrl.pop();
 
  },)

    
  } 

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  ionViewWillEnter () {
    this.menuCtrl.swipeEnable( false, 'menu2' );
    }
  UsrEmailCheck(value)
  {
    console.log('hi'+value.length)

if(value.length !=0)
{
  let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
  let requestOptions=new RequestOptions({headers:headers})
  let param=JSON.stringify( {
    username:value,
   email:this.email
  })
  this.http.post(this.HostName+'/validateEmailUsername',param, requestOptions)
  .subscribe((data)=>{
    console.log(JSON.parse((<any>data)._body).status)
     if(JSON.parse((<any>data)._body).status==0)
     {
    this.existalert=true
     } 
     else{
      this.existalert=false
     }   

  })
}

  }





//   UsrrefferalCheck(event:any)
// {
// if(event.target.value.length > 0)
// {
//   let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
//   let requestOptions=new RequestOptions({headers:headers})
//   let param=JSON.stringify({ user_id:"", referral_code:event.target.value   })
//   //                 https://www.readsfeed.com/
//   this.http.post('https://www.readsfeed.com/admin/userapi/referalCode',param, requestOptions).subscribe((data)=>{
//    console.log(JSON.parse((<any>data)._body).status)
//     if(JSON.parse((<any>data)._body).status == 0)
//     {
//       this.RefferalMsg=JSON.parse((<any>data)._body).message;
//       this.CodeFalse=true;
//     } 
//     if(JSON.parse((<any>data)._body).status == 1)
//     {
//       localStorage['Refferalcode']=event.target.value;
//       this.RefferalMsg=JSON.parse((<any>data)._body).message;
//       this.CodeFalse=true;
//     } 
//   })
// }
// if(event.target.value.length==0)
// {
//   console.log(event.target.value.length)
//   this.CodeFalse=false;
//   this.CodeTrue=false;
//   localStorage['Refferalcode']=""; 
// }
// }

  


  navigateToLogin(){ 
    
    if(this.existalert==true)
    {
    this.toastCtrl.create({ message: "UserName already exist", duration: 3000, position: 'top' }).present();
    return;
    }


    this.str.set('UsrnameLog',this.ValidateForm.controls["username"].value)
this.str.set('UsrpassLog',this.ValidateForm.controls["password"].value)

    localStorage['loguser']=this.ValidateForm.controls["username"].value;
    localStorage['logpass']=this.ValidateForm.controls["password"].value;
    this.navCtrl.setRoot(EnterdetailscreenPage,{signup_type:this.signup_type,username:this.ValidateForm.controls["username"].value,password:this.ValidateForm.controls["password"].value})
   }

  
   
  loginWithFB() {  
    var fblogin=1
    this.signup_type=2 
    this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
      this.facebook.api('me?fields=id,name,email,first_name,last_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
        this.userData = {email: profile['email'],last_name:profile['last_name'] ,first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name']}
      this.navCtrl.setRoot(EnterdetailscreenPage,{
        signup_type:this.signup_type,
        email: profile['email'],
        first_name:profile['first_name'],
        last_name:profile['last_name'],
        picture:this.userData.picture,
        fblogin:fblogin
      })
      });
    }) .catch((e) =>{
      this.toastCtrl.create({ message: `Please try again !`, duration: 4000, position: 'top' }).present(); return;
    });
  }


  loginWithGoogle()
  {
  var googlelogin=1
  this.signup_type=2  
  this.googlePlus.login({}).then((res) => {
    this.navCtrl.setRoot(EnterdetailscreenPage,{
      signup_type:this.signup_type,
      googlelogin:googlelogin,
      first_name:res.givenName,
      picture:res.imageUrl,
      last_name:res.familyName,  
      email:res.email
       }) 
    })
    .catch((err) =>{
      this.toastCtrl.create({ message: `Please try again !`, duration: 4000, position: 'top' }).present(); return;
    });
  }




}
