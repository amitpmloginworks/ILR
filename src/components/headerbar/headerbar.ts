import { Component, ViewChild } from '@angular/core';
import { Events ,LoadingController, NavController, PopoverController, App } from 'ionic-angular';
import{SecurityProvider}from'../../providers/security/security';
import{Observable}from'rxjs/Rx';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import{bigdata}from'../../app/models';
import{ImagazinespagePage}from'../../pages/imagazinespage/imagazinespage'
import{NotificationsPage}from'../../pages/notifications/notifications'

/**
 * Generated class for the HeaderbarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'headerbar',
  templateUrl: 'headerbar.html',
})
export class HeaderbarComponent { 
 
  text: string;
  Usrname
  userimage
  count
  notificationcount:boolean=false;
  blackmode:boolean=false
  UpImgUsr

  HostName
  constructor(public http:Http,public security:SecurityProvider,public events: Events,public loadingCtrl:LoadingController,public bdata:bigdata,public navCtrl:NavController,public popoverCtrl: PopoverController,public appCtrl:App) {
    console.log('Hello HeaderbarComponent Component');
    this.text = 'Hello World';
    this.HostName=this.security.Hostname(); 
    this.Usrname=this.bdata.userdata.username

    let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
    let requestOptions=new RequestOptions({headers:headers})
    let param=JSON.stringify({ userid:localStorage['USERID'] })   
    this.http.post(this.HostName+'/services/wecNotificationApp',param,requestOptions).subscribe((data)=>{
       this.count=JSON.parse((<any>data)._body).notifiction_count
       if(this.count==0)
       {
       this.notificationcount=true
       }
       else
       {
        this.notificationcount=false
       }
  })


  if(localStorage['theme']==1)
  {
  this.blackmode=false
  }
  else if(localStorage['theme']==2)
  {
  this.blackmode=true
  }
  else if(localStorage['theme']==3)
  {
  this.blackmode=true
  }
  else if(localStorage['theme']==4)
  {
  this.blackmode=false
  }


  
  setTimeout(()=>{

    if(localStorage['theme']==1)
    {
    this.blackmode=false
    }
    else if(localStorage['theme']==2)
    {
    this.blackmode=true
    var a=document.getElementById("1_x").style.color="#fff"
    
    }
    else if(localStorage['theme']==3)
    {
    this.blackmode=true
    var a=document.getElementById("1_x").style.color="#fff"
    
    }
    else if(localStorage['theme']==4)
    {
    this.blackmode=false
    }
    
    },1000)  

     
    if(this.bdata.userdata.user_image=="assets/imgs/user.png"){ 
      this.userimage="assets/imgs/user.png";    
      return;
     }
   if(this.bdata.userdata.user_image!="assets/imgs/user.png"){  
     this.userimage=this.bdata.userdata.user_image;  
       console.log("this.bdata.userdata.user_image==",this.bdata.userdata.user_image);
     return;
   }

 this.events.subscribe('user:created', (user, time) => { 
   if(user=="assets/imgs/user.png"){  this.userimage="assets/imgs/user.png";    return;}
   if(user!="assets/imgs/user.png"){  this.userimage=user;     return;}
        }); 

  }  


  
  homeNav()
  {
    this.appCtrl.getRootNav().push(ImagazinespagePage)   
  }
       
  presentPopover() {  
    let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
    let requestOptions=new RequestOptions({headers:headers})
    let param=JSON.stringify({ userid:localStorage['USERID'] })
    this.http.post(this.HostName+'/services/wecNotificationViewApp',param,requestOptions).subscribe((data)=>{
      this.count=0;
      this.notificationcount=true
    })  
   this.popoverCtrl.create(NotificationsPage,{},{cssClass: 'custom-popover'}).present();
  }
  
     

         


}
