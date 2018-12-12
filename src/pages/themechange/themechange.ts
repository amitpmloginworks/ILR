import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import{AppState}from'../../app/app.global'
import { Events } from 'ionic-angular';
import{TeacherprofilepPage}from'../teacherprofilep/teacherprofilep'
/**
 * Generated class for the ThemechangePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-themechange',
  templateUrl: 'themechange.html',
})
export class ThemechangePage {

  theme
  constructor(public platform :Platform, public alertCtrl:AlertController,public global:AppState,public navCtrl: NavController, public navParams: NavParams,public events: Events) {
    
    // Register for android's system back button
    let backAction = platform.registerBackButtonAction(() => {
     let alert=this.alertCtrl.create({  
       message: 'Do you want to exit the app?',
       buttons: [
       {
       text: 'Cancel',
       role: 'cancel',
       handler: () => {
       
       }
       },
       {
       text: 'Exit',
       handler: () => {
       platform.exitApp();
       console.log("Exit App")
       }
       }
       ]
       })
       alert.present()
     },)
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ThemechangePage');
  } 



  changeTheme(id)
  {
 if(id==1)
 {
var theme='theme-grey'

this.global.set('theme', theme);
localStorage['theme']=1
localStorage['currenttheme']='theme-grey'
this.events.publish('user:theme', localStorage['theme'], Date.now());


var x=document.getElementById("grey").style.border="1px solid"
var y=document.getElementById("red").style.border="none"
var q=document.getElementById("yellow").style.border="none"
var z=document.getElementById("blue").style.border="none"
//setTimeout(()=>{this.navCtrl.setRoot(TeacherprofilepPage); },1500)  
 }
else if(id==2)
{
  var theme='theme-blue'
  localStorage['currenttheme']='theme-blue'
  this.global.set('theme', theme);
  localStorage['theme']=2
  this.events.publish('user:theme', localStorage['theme'], Date.now());

  var z=document.getElementById("blue").style.border="1px solid"
  var x=document.getElementById("grey").style.border="none"
  var y=document.getElementById("red").style.border="none"
  var q=document.getElementById("yellow").style.border="none"
//setTimeout(()=>{this.navCtrl.setRoot(TeacherprofilepPage); },1500)
}
else if(id==3)
{
  var theme='theme-red'
  localStorage['currenttheme']='theme-red'
  this.global.set('theme', theme);
  localStorage['theme']=3
  this.events.publish('user:theme', localStorage['theme'], Date.now());

var y=document.getElementById("red").style.border="1px solid"
var q=document.getElementById("yellow").style.border="none"
var x=document.getElementById("grey").style.border="none"
var z=document.getElementById("blue").style.border="none"
//setTimeout(()=>{this.navCtrl.setRoot(TeacherprofilepPage); },1500)

}
else if(id==4)
{
  var theme='theme-yellow'
  localStorage['currenttheme']='theme-yellow'
  this.global.set('theme', theme);
  localStorage['theme']=4
  this.events.publish('user:theme', localStorage['theme'], Date.now());

  var q=document.getElementById("yellow").style.border="1px solid"
  var x=document.getElementById("grey").style.border="none"
  var z=document.getElementById("blue").style.border="none"
  var y=document.getElementById("red").style.border="none"
 
  //setTimeout(()=>{this.navCtrl.setRoot(TeacherprofilepPage); },1500)


}


    
   
 
  }
}
