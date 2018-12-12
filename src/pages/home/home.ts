import { Component } from '@angular/core';
import { NavController,LoadingController, ModalController,MenuController } from 'ionic-angular';
import{UserloginPage}from'../userlogin/userlogin'
import{SignupPage}from'../signup/signup'
import{LoginPage}from'../login/login'
import{SecurityProvider}from'../../providers/security/security'
import{Observable}from'rxjs/Rx'
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'; 
import { getScrollData } from 'ionic-angular/components/input/input';
import{HomeaboutusPage}from'../homeaboutus/homeaboutus';
import{AsksubscribePage}from'../asksubscribe/asksubscribe'

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import{EnterdetailscreenPage}from'../enterdetailscreen/enterdetailscreen';
import {SettingProvider } from '../../providers/setting/setting';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  strip:boolean
strip1:boolean
cout=0

userData: any;
signup_type=2 
selectedTheme: String;
  constructor(public menuCtrl:MenuController,private settings: SettingProvider,public http: Http,public  loadingCtrl:LoadingController,public navCtrl: NavController,public security:SecurityProvider, public modalCrtl:ModalController,private facebook: Facebook) {
    this.strip=true
 this.strip1=true 
 this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
  }
  changefontsize(theme)
  {
  
    this.settings.setActiveTheme(theme);
  }
  ionViewWillEnter () {
  
    this.menuCtrl.swipeEnable( false, 'menu2' );
    }

  hidebutton()
  {
    this.cout++
    if(this.cout%2==0)
    {
this.strip=true
this.strip1=true
    } 
    else{
      this.strip=false
       this.strip1=false
   
    }
}


loginWithFB() {   
  var fblogin=1
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
  });
}


  sideBar(){
    var withrow= document.getElementById('withrow');
    var withoutright=document.getElementById('withoutright')
if(withoutright.style.display==='none') {
  withoutright.style.display='flex'
  withrow.style.display='none'
  var isVisible= document.getElementById('lngBtns');
  var sideBackgroundColor=document.getElementById('sideCol')
  var sideBelowBackgroundColor=document.getElementById('sideColBelow')
  var lngshow=document.getElementById('lngshow') 

    isVisible.style.visibility='visible'
    sideBackgroundColor.style.backgroundColor="#EEEEEE"
    sideBelowBackgroundColor.style.backgroundColor="#EEEEEE"
    lngshow.style.visibility='visible'
    lngshow.style.color="#c4c4c4"

return;
}
if(withrow.style.display==='none') {
  withrow.style.display='flex'
  withoutright.style.display='none'
return;
}
}


  navigatetologin()
  {
    this.navCtrl.push(UserloginPage)
//this.navCtrl.setRoot(LoginPage)
  }


clicktap()
{
  document.querySelector('button').addEventListener('click',function clickHandler(e){

    this.removeEventListener('click',clickHandler,false);

    e.preventDefault();
    var self = this;
    setTimeout(function(){
        self.className = 'loading';
    },125);

    setTimeout(function(){
        self.className = 'ready';
    },4300);

},false);

}

aboutUsBtn() {  
  // HomeaboutusPage  
this.modalCrtl.create(HomeaboutusPage).present();
}


navigatetoSignup(){
this.navCtrl.push(SignupPage)
// let loader = this.loadingCtrl.create({
//   spinner: 'hide',
//   content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
//   cssClass: 'transparent'
// });
//   let loading=this.loadingCtrl.create({content:'Please Wait..'})
//   Observable.of(loader).flatMap(loader=>loader.present())
//         .flatMap(() => this.security.magzinelist())
//        .subscribe(data=>{
//         loader.dismiss()
//  })
}

 
}
