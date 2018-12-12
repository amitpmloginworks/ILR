import { Component } from '@angular/core';
import { IonicPage,MenuController, NavController, NavParams } from 'ionic-angular';
import{DashboardPage}from'../dashboard/dashboard'
import{Choiceperferncepage2Page}from'../choiceperferncepage2/choiceperferncepage2'
import{bigdata}from'../../app/models'

/**
 * Generated class for the TermsandconditionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-termsandconditions',
  templateUrl: 'termsandconditions.html',
})
export class TermsandconditionsPage {
  signupdata
  user_relation
  accepted
  buttonDisabled
  parentpic
  constructor(public menuCtrl:MenuController,public navCtrl: NavController, public navParams: NavParams,public bigdata:bigdata) {
this.signupdata=this.navParams.get('signupdata')
this.user_relation=this.navParams.get('user_relation')
this.parentpic=this.navParams.get('parentpic')
this.buttonDisabled = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TermsandconditionsPage');
  }


  validatecheck(ev)
  {
    if(this.accepted==true)
    {
 this.buttonDisabled=false
    }
    if(this.accepted==false)
    {
 this.buttonDisabled=true
    }
  } 


  navigatetodashboard(){  
    console.log("this.signupdata==",this.signupdata)    
    console.log("this.signupdata[0].student==",this.signupdata[0].student)  
    if(this.signupdata[0].student=="1") {
      if(this.signupdata[0].LicenseStatus==true){
        this.navCtrl.setRoot(Choiceperferncepage2Page,{accepted:this.accepted, signupdata:this.signupdata, user_relation:this.user_relation, user_magazine:this.bigdata.UserMagazineId,parentpic:this.parentpic
        })
        return;
      } 
      else{
        this.navCtrl.setRoot(DashboardPage,{accepted:this.accepted,signupdata:this.signupdata,user_relation:this.user_relation,parentpic:this.parentpic})
      }
    } 
    else{
      this.navCtrl.setRoot(DashboardPage,{accepted:this.accepted,signupdata:this.signupdata,user_relation:this.user_relation,parentpic:this.parentpic})
    }  
  }
  ionViewWillEnter () {
    this.menuCtrl.swipeEnable( false, 'menu2' );
    }
}
