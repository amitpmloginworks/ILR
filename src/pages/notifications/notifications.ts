import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, App, ViewController  } from 'ionic-angular';
import { Http, Response, RequestOptions,Headers } from '@angular/http';
import{ContestquestPage}from'../contestquest/contestquest';
import{SurveyPage}from'../survey/survey';
import{ImagzinedetailPage}from'../imagzinedetail/imagzinedetail';
import{bigdata}from'../../app/models';
import{SecurityProvider}from'../../providers/security/security';
import{Observable}from'rxjs/Rx';

/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
}) 
export class NotificationsPage {
  notificationList

  totalviews
  total_share
  imageval
  FirstName
  contents
  index
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,public bdata:bigdata,public loadingCtrl:LoadingController,public security:SecurityProvider,public toastCtrl:ToastController,public appCtrl:App, public viewCtrl:ViewController) {    
    this.imageval=this.bdata.userdata.user_image;
this.FirstName=this.bdata.userdata.first_name;
  }
// Calling API
  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
    let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
             let requestOptions=new RequestOptions({headers:headers})
             let param=JSON.stringify({ userid:localStorage['USERID']  })
    this.http.post('https://www.readsfeed.com/services/wecNotificationListApp', param,requestOptions).subscribe((data)=>{
      console.log(data);
      console.log(JSON.parse((<any>data)._body).notifiction_list);
      this.notificationList=JSON.parse((<any>data)._body).notifiction_list;
    })
  }

  BtnNotification(Types,TypeId)
  {

    if(Types=="content")
    {
      let loading=this.loadingCtrl.create({
        spinner: 'hide',
        content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
        cssClass: 'transparent'
      })
      Observable.of(loading).flatMap(loading=>loading.present())
            .flatMap(() => this.security.getContents())
           .subscribe(data=>{
             
             console.log("getContents ==",data);
             this.contents=data.contents;
             for(let z=0;z<data.contents.length;z++)
             {
               if(data.contents[z].content_id==TypeId)
               {
                 this.index=z;
                 console.log("index==",z)
               }
             }
             let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
             let requestOptions=new RequestOptions({headers:headers})
             let param=JSON.stringify({ user_id:localStorage['USERID'],token:localStorage['token'],content_id:TypeId  })
             this.http.post('https://www.readsfeed.com/admin/homeapi/addView',param,requestOptions ).subscribe((data)=>{
              console.log("addView ==",data);
              loading.dismiss()
              this.totalviews=JSON.parse((<any>data)._body).total_views
                this.total_share=JSON.parse((<any>data)._body).total_share
                this.appCtrl.getRootNav().push(ImagzinedetailPage,{data:this.contents, imageval:this.imageval, i:this.index,  views:this.totalviews,  total_share:this.total_share, paramsVar:this.contents[this.index].is_favorite  })
                    this.viewCtrl.dismiss()  
            },err =>{
              loading.dismiss()
              this.toastCtrl.create({  message: "No internet connection, please try again.", duration: 3000  }).present();
            })
        },err =>{
          loading.dismiss()
          this.toastCtrl.create({  message: "No internet connection, please try again.", duration: 3000  }).present();
        }) 
    }
    if(Types=="contest")
    {
      this.appCtrl.getRootNav().push(ContestquestPage,{data:TypeId})
      this.viewCtrl.dismiss()    
    }
    if(Types=="survey")
    {   
      this.appCtrl.getRootNav().push(SurveyPage,{SurveyId:TypeId})
      this.viewCtrl.dismiss() 
    } 
  }


  clearBtn()
  {
    let loading3=this.loadingCtrl.create({
      spinner: 'hide',
        content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
        cssClass: 'transparent'
     })
     Observable.of(loading3).flatMap(loading=>loading3.present())
     .flatMap(()=>this.security.WECNotificationClear())
     .subscribe(data=>{
      let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
      let requestOptions=new RequestOptions({headers:headers})
      let param=JSON.stringify({ userid:localStorage['USERID']  })
      this.http.post('https://www.readsfeed.com/services/wecNotificationListApp',param,requestOptions).subscribe((data1)=>{
        loading3.dismiss()  
        this.notificationList=JSON.parse((<any>data1)._body).notifiction_list;
      })
     },err => {   loading3.dismiss();   })
  }



}
