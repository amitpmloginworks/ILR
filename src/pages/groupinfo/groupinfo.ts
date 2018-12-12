import { Component } from '@angular/core';
import { LoadingController,IonicPage, NavController, NavParams,ActionSheetController, ToastController, ModalController, Content } from 'ionic-angular';
import{SecurityProvider}from'../../providers/security/security'
import{Observable}from'rxjs/Rx'
import { Http, Headers , RequestOptions } from '@angular/http';
import {GroupsPage } from '../groups/groups'

/**
 * Generated class for the GroupinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-groupinfo',
  templateUrl: 'groupinfo.html',
})
export class GroupinfoPage {
  memberlist
  HostName
  Grouplists:any=[];

  GroupMemberlist
  Groupmemberlen:number=0;
  group_name:any="";
  GroupExit
  groupID
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public security:SecurityProvider,public loadingCtrl:LoadingController,
    public toastCtrl:ToastController) {

      this.HostName=this.security.Hostname();      
         
   this.Grouplists = this.navParams.get('Grouplists');
      this.groupID=this.Grouplists.group_id;     
   console.log( "this.Grouplists=",this.Grouplists) 
   this.GroupMemberlist=this.Grouplists.group_member  
   this.group_name=this.Grouplists.group_name 
   this.Groupmemberlen=this.Grouplists.group_total_member
  }


  ExitGroupBtn(){
    let loading=this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
      cssClass: 'transparent'
    })
    Observable.of(loading).flatMap(loading=>loading.present()).flatMap(()=>this.security.GroupExit(this.groupID)).subscribe(data=>{
      loading.dismiss()
      console.log("group exits =",data)
      if(data.status == 1) {     
        this.toastCtrl.create({ message: data.message, duration: 3000, position: 'top' }).present();
          this.navCtrl.setRoot(GroupsPage);     
      }
      else  {  
        this.toastCtrl.create({ message: data.message, duration: 3000, position: 'top' }).present(); 
      }
    },err => {       loading.dismiss(); })
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupinfoPage');
  }

}
