import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController,MenuController, ToastController,Slides } from 'ionic-angular';
import{TrialPeriodPage}from'../trial-period/trial-period'
import{Observable}from'rxjs/Rx'
import{SecurityProvider}from'../../providers/security/security'
import { Jsonp } from '@angular/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import{UserloginPage}from'../userlogin/userlogin'
import { Http, Response } from '@angular/http';
import { Storage } from '@ionic/storage'; 
import { AnimationService, AnimationBuilder } from 'css-animator';
import{AsksubscribePage}from'../asksubscribe/asksubscribe'
import{SubscribeNowPage}from'../subscribe-now/subscribe-now'

import {OtppagePage } from '../otppage/otppage' 

/**
 * Generated class for the ChoiceofperferencePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-choiceofperference',
  templateUrl: 'choiceofperference.html',
})
export class ChoiceofperferencePage { 
  @ViewChild('myElement') myElem;
  private animator: AnimationBuilder;
  @ViewChild(Slides) slides: Slides;

  narrateselection:boolean
  personalselection:boolean
  expositoryselection:boolean
  hybridselection:boolean
  desciptiveselection:boolean
  argumentativeselection:boolean
  situationselection:boolean


contentbox


accepted
signupdata
user_relation=[]
user_content_nature
user_magazine
user_text_type=[]

userid

buttonDisabled
product=[]


borderColor;
count;

type_list
parentpic
arraytemp=[];
BtnDisable:boolean=true;
user_relationTemp=[]
ParentUserFilter
SiblingUserFilter
ArrImageList=[]
NoArrCall:number=0;
HostName
  constructor(public menuCtrl:MenuController,public animationService: AnimationService,public filetransfer: FileTransfer,public alertCtrl:AlertController,public security:SecurityProvider,public loadingCtrl:LoadingController,public navCtrl: NavController, public navParams: NavParams,public http:Http, public str:Storage,public toastCtrl:ToastController) {


    this.menuCtrl.swipeEnable(false,'menu2');     

    this.HostName=this.security.Hostname(); 
   
  this.arraytemp=[];
  this.user_relation=[];
  this.user_relationTemp=this.navParams.get('user_relation');  //// Getting value from previous page  .. 
   this.ParentUserFilter =  this.user_relationTemp.filter((elem)=> {  return elem.id == 'parent' ;    })
   this.SiblingUserFilter =  this.user_relationTemp.filter((elem)=> {  return elem.id == 'sibling' ;    })
  this.user_relationTemp.forEach((elem, index)=>{ 
    if(elem.id=="sibling")
    {
      this.user_relation.push({sibling_name:elem.name,sibling_email:elem.email,sibling_relation:elem.relation,sibling_image:elem.image})
    }
    if(elem.id=="parent")
    {
      this.user_relation.push({parent_name:elem.name,parent_relation:elem.relation,parent_email:elem.email,parent_image:elem.image})
    }
  })

  this.animator = animationService.builder();
  this.buttonDisabled=true
  this.animator = animationService.builder();
// Getting value from previous page  .. 
    this.accepted=this.navParams.get('accepted')
    this.signupdata=this.navParams.get('signupdata')
  
this.user_content_nature=this.navParams.get('user_content_nature')
  this.user_magazine=this.navParams.get('user_magazine')
this.parentpic=this.navParams.get('parentpic')
    this.narrateselection=false
    this.personalselection=false
    this.expositoryselection=false
    this.hybridselection=false
    this.desciptiveselection=false
    this.argumentativeselection=false
    this.situationselection=false

    this.buttonDisabled=true
    console.log( " this.signupdata ==",this.signupdata)
  }


  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    if(currentIndex==3){
      this.slides.stopAutoplay();
    }
  }
  



  showImage(id){
     
    var checkstatus=0;
     var x
for(var i=0;i<this.type_list.length;i++)
{
 if(id==i)
 {
 if(this.arraytemp.length==0){
setTimeout(()=>{  this.animator.setType('flipOutY').show(document.getElementById('y_'+id));  },10);
x=document.getElementById('z_'+id);
x.style.boxShadow='-2px 2px 27px';
this.arraytemp.push(id);

this.BtnDisable=false;
 }
 else{
   this.arraytemp.forEach( (item, index) => {
     if(item === id)  { 
       this.arraytemp.splice(index,1);
       x=document.getElementById('z_'+id);
        x.style.boxShadow='none';
     checkstatus=1; 
      }
   });
   if(this.arraytemp.length==0){ this.BtnDisable=true; }
 if(checkstatus==0)
 {
   this.BtnDisable=false;
   // animation code here..
   setTimeout(()=>{  this.animator.setType('flipOutY').show(document.getElementById('y_'+id));  },10);
     x=document.getElementById('z_'+id);
     x.style.boxShadow='-2px 2px 27px';
     this.arraytemp.push(id);
 }
 }
}   
}
}



  ionViewDidLoad() { 
    // Calling content nature API   ..   
    console.log('ionViewDidLoad ChoiceofperferencePage');
let loading=this.loadingCtrl.create({
  spinner: 'hide',
  content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
  cssClass: 'transparent'
}) 
Observable.of(loading).flatMap(loading=>loading.present())
.flatMap(() => this.security.contentNatureListSecond())
       .subscribe(data=>{
         loading.dismiss()
     this.contentbox=data.text_type_list
     this.type_list=data.text_type_list
    })
  }
  textid(i)
  {
    
    var textid=i+1
    this.user_text_type.push({
      text_id:textid
    }) 
     
    this.buttonDisabled=false
  }
  selctionbox(id)
  {
    if(id==1)
    {
this.narrateselection=true
    }
    else if(id==2)
    {
this.personalselection=true
    }
    else if(id==3)
    {
this.expositoryselection=true
    }
    else if(id==4)
    {
      this.hybridselection=true
    }
    else if(id==5)
    {
      this.desciptiveselection=true
    }
    else if(id==6)
    {
      this.argumentativeselection=true
    }
    else if(id==7)
    {
      this.situationselection=true
    }


  }

  SkipBtn(){
      console.log(this.user_text_type);     
if(this.signupdata[0].LicenseStatus==true) {
   this.LicenseSignUp();
   return;
}
else  {
  if(this.signupdata[0].student==1)  {     this.SendToServer();    return;      }
  if(this.signupdata[0].student==2)    {    this.SendToServerTeacher();    return;     } 
}
}

  next() {

    this.arraytemp.forEach( (item, index) => {
      var textid=item+1;
      this.user_text_type.push({  text_id:textid  });
    });
console.log(this.user_text_type);

if(this.signupdata[0].LicenseStatus==true)
{
   this.LicenseSignUp();
   return;
}
else{
  if(this.signupdata[0].student==1)  {     this.SendToServer();    return;      }
  if(this.signupdata[0].student==2)    {    this.SendToServerTeacher();    return;     } 
}

}

LicenseSignUp()
{

  //var  user_image="http://88.198.133.25/ILR_dev/uploads/Webuser_profilepic/197790b8aeddf696e5376adf97953bfc.jpg"
  var user_image=this.HostName+"/uploads/Webuser_profilepic/197790b8aeddf696e5376adf97953bfc.jpg"
  var terms_checked=1
  var content_type_id=0
  var is_subscribed=0
  var subscription_id=0
  let loading=this.loadingCtrl.create({
    spinner: 'hide',
    content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
    cssClass: 'transparent'
  })
  Observable.of(loading).flatMap(loading=>loading.present())
        .flatMap(() => this.security.Licensesignup(
        this.signupdata[0].student,
        this.signupdata[0].signup_type,
        this.signupdata[0].username,
        this.signupdata[0].password,
        this.signupdata[0].FirstName,
        this.signupdata[0].LastName,
        this.signupdata[0].Email_Id,
        this.signupdata[0].PhoneNo,
        this.signupdata[0].Age,
        this.signupdata[0].gender,
        this.signupdata[0].image,
            this.signupdata[0].SchoolName,
            this.signupdata[0].SchoolAddress,
            this.signupdata[0].City,
            this.signupdata[0].State,
            this.signupdata[0].Country,
            this.signupdata[0].StudentDetails,
          terms_checked,
          content_type_id,
          is_subscribed,
          subscription_id,
         this.user_content_nature,
         this.user_magazine,
         this.user_relation,
         this.user_text_type,
            this.signupdata[0].student_id,
            this.signupdata[0].parent_name,
            this.signupdata[0].parent_email,
            this.signupdata[0].parent_relation,
            this.signupdata[0].image, 
              this.signupdata[0].ResAdd,
              this.signupdata[0].ResCity,
              this.signupdata[0].ResState,
              this.signupdata[0].ResPinCode,
              this.signupdata[0].ResCountry 
         ))
       .subscribe(data=>{
         loading.dismiss()
         console.log("success===",data);
         if(data.status==0){
              this.alertCtrl.create({ title:data.errorData[0], buttons: ['Dismiss'] }).present()
         } 
         else
         {
         
                this.userid=data.userId
                localStorage['USERID']=this.userid
                localStorage['token']=data.token
                this.str.set('USERID',this.userid)
                for(var i=0;i<this.user_magazine.length;i++){
                  this.product.push({ magazine_id:this.user_magazine[i].magazine_id   }) 
                       console.log('product'+JSON.stringify(this.product))
               }



               this.ArrImageList.push({id:data.userId,imageUrl:this.signupdata[0].image,Imgtype:1})
               if(data.siblings_id.length==0 && data.parent_id.length==0)
               {

                this.toastCtrl.create({ message: data.message, duration: 3000, position: 'top'}).present(); 
                this.navCtrl.setRoot(SubscribeNowPage,{product:this.product,LicenseUser:"yes"})
                return;

                // this.alertCtrl.create({  title:data.message,
                //   buttons: [{   text: 'OK',  role: 'cancel', 
                //       handler: () => {
                //         console.log("this.product == ",this.product);
                //         this.navCtrl.setRoot(SubscribeNowPage,{product:this.product,LicenseUser:"yes"})
                //       }     }] 
                // }).present()
                // return;
               }
               if(this.user_relationTemp.length !=0)
               {
                   if(this.ParentUserFilter.length !=0)
                   {
                     this.ArrImageList.push({id:data.parent_id[0],imageUrl:this.ParentUserFilter[0].image,Imgtype:2})
                   }

               if(this.SiblingUserFilter.length !=0)
               {
                 if(this.SiblingUserFilter.length ==1)
                 {
                  this.ArrImageList.push({id:data.siblings_id[0],imageUrl:this.SiblingUserFilter[0].image,Imgtype:3})
                  
                 }
                 if(this.SiblingUserFilter.length ==2)
                 {
                   this.ArrImageList.push({id:data.siblings_id[0],imageUrl:this.SiblingUserFilter[0].image,Imgtype:3})

                   this.ArrImageList.push({id:data.siblings_id[1],imageUrl:this.SiblingUserFilter[1].image,Imgtype:4})
                 }
               }  
               } // end of this.user_relationTemp if connn....


for(let j=0;j<this.ArrImageList.length;j++)
{


if(this.ArrImageList[j].Imgtype==1)
{
if(this.ArrImageList[j].imageUrl !="assets/imgs/user.png"){
const filetransfers: FileTransferObject = this.filetransfer.create();
let options: FileUploadOptions = {
  fileKey: 'file',
  fileName: 'filename.jpg',
  chunkedMode: false,
  mimeType: "multipart/form-data",
  params: {
    user_id: this.ArrImageList[j].id
  } 
}


filetransfers.upload(this.ArrImageList[j].imageUrl,this.HostName+'/admin/userapi/imageUpload', options) .then((data) => {
  }, (err) => {
    this.toastCtrl.create({ message: `Error in image uploading,Please try again.`, duration: 3000, position: 'top'}).present();  
  })
}

}
 



if(this.user_relationTemp.length !=0)  {

  if(this.ParentUserFilter.length !=0) {

    if(this.ArrImageList[i].Imgtype==2) {  
      console.log(" ArrImageList Imgtype 2==",this.ArrImageList[j].Imgtype) 
      if(this.ArrImageList[i].imageUrl !=this.HostName+"/themes/default/assets/img/add-parent.png"){
        console.log("userid 2=="+this.ArrImageList[i].id)
        const filetransfers: FileTransferObject = this.filetransfer.create();
        let options: FileUploadOptions = {
          fileKey: 'file',
          fileName: 'filename.jpg',
          chunkedMode: false,
          mimeType: "multipart/form-data",
          params: {
            user_id: this.ArrImageList[i].id
          } 
        }
        filetransfers.upload(this.ArrImageList[i].imageUrl,this.HostName+'/admin/userapi/imageUpload', options) .then((data) => {
    
          }, (err) => {
            this.toastCtrl.create({ message: `Error in image uploading,Please try again.`, duration: 3000, position: 'top'}).present();  
          })
      }
    }     


  }

if(this.SiblingUserFilter.length !=0)
{
  if(this.SiblingUserFilter.length ==1)
  {
    if(this.ArrImageList[j].Imgtype==3) {

      console.log(" ArrImageList Imgtype 3==",this.ArrImageList[j].Imgtype)  
      if(this.ArrImageList[j].imageUrl !=this.HostName+"/themes/default/assets/img/add-sib.png"){
        const filetransfers: FileTransferObject = this.filetransfer.create();
        let options: FileUploadOptions = {
          fileKey: 'file',
          fileName: 'filename.jpg',
          chunkedMode: false,
          mimeType: "multipart/form-data",
          params: {
            user_id: this.ArrImageList[j].id
          } 
        }
    
        filetransfers.upload(this.ArrImageList[j].imageUrl,this.HostName+'/admin/userapi/imageUpload', options) .then((data) => {
          }, (err) => {
            this.toastCtrl.create({ message: `Error in image uploading,Please try again.`, duration: 3000, position: 'top'}).present();  
          })
      }
   // end of if conditions
    }
  }
  if(this.SiblingUserFilter.length ==2) {
    
    
if(this.ArrImageList[j].Imgtype==4) {
  console.log(" ArrImageList Imgtype 4==",this.ArrImageList[j].Imgtype)  
  if(this.ArrImageList[j].imageUrl !=this.HostName+"/themes/default/assets/img/add-sib.png"){
    const filetransfers: FileTransferObject = this.filetransfer.create();
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: 'filename.jpg',
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: {
        user_id: this.ArrImageList[j].id
      } 
    }
    filetransfers.upload(this.ArrImageList[j].imageUrl,this.HostName+'/admin/userapi/imageUpload', options) .then((data) => {
      }, (err) => {
        this.toastCtrl.create({ message: `Error in image uploading,Please try again.`, duration: 3000, position: 'top'}).present();   
      })
  }
}

if(this.ArrImageList[j].imageUrl !=this.HostName+"/themes/default/assets/img/add-sib.png"){
  const filetransfers: FileTransferObject = this.filetransfer.create();
  let options: FileUploadOptions = {
    fileKey: 'file',
    fileName: 'filename.jpg',
    chunkedMode: false,
    mimeType: "multipart/form-data",
    params: {
      user_id: this.ArrImageList[j].id
    } 
  }

  filetransfers.upload(this.ArrImageList[j].imageUrl,this.HostName+'/admin/userapi/imageUpload', options) .then((data) => {
    }, (err) => {
      this.toastCtrl.create({ message: `Error in image uploading,Please try again.`, duration: 3000, position: 'top'}).present();  
    })
}





  }
} 

}





// if(this.ArrImageList[j].Imgtype==3)
// {
// if(this.ArrImageList[j].imageUrl !=this.HostName+"/themes/default/assets/img/add-sib.png"){
// const filetransfers: FileTransferObject = this.filetransfer.create();
// let options: FileUploadOptions = {
//   fileKey: 'file',
//   fileName: 'filename.jpg',
//   chunkedMode: false,
//   mimeType: "multipart/form-data",
//   params: {
//     user_id: this.ArrImageList[j].id
//   } 
// }

// filetransfers.upload(this.ArrImageList[j].imageUrl,this.HostName+'/admin/userapi/imageUpload', options) .then((data) => {
//   }, (err) => {
//     this.toastCtrl.create({ message: `Error in image uploading,Please try again.`, duration: 3000, position: 'top'}).present(); 
//   })
// }

// }

// if(this.ArrImageList[j].Imgtype==4)
// {
// if(this.ArrImageList[j].imageUrl !=this.HostName+"/themes/default/assets/img/add-sib.png"){
// const filetransfers: FileTransferObject = this.filetransfer.create();
// let options: FileUploadOptions = {
//   fileKey: 'file',
//   fileName: 'filename.jpg',
//   chunkedMode: false,
//   mimeType: "multipart/form-data",
//   params: {
//     user_id: this.ArrImageList[j].id
//   } 
// }

// filetransfers.upload(this.ArrImageList[j].imageUrl,this.HostName+'/admin/userapi/imageUpload', options) .then((data) => {
//   }, (err) => {
//     this.toastCtrl.create({ message: `Error in image uploading,Please try again.`, duration: 3000, position: 'top'}).present(); 
//   })
// }

// }

// if(this.ArrImageList[i].Imgtype==2)
// {
// if(this.ArrImageList[i].imageUrl !=this.HostName+"/themes/default/assets/img/add-parent.png"){
// const filetransfers: FileTransferObject = this.filetransfer.create();
// let options: FileUploadOptions = {
//   fileKey: 'file',
//   fileName: 'filename.jpg',
//   chunkedMode: false,
//   mimeType: "multipart/form-data",
//   params: {
//     user_id: this.ArrImageList[i].id
//   } 
// }

// filetransfers.upload(this.ArrImageList[i].imageUrl,this.HostName+'/admin/userapi/imageUpload', options) .then((data) => {
//   }, (err) => {
//     this.toastCtrl.create({ message: `Error in image uploading,Please try again.`, duration: 3000, position: 'top'}).present();  
//   })
// }

// }



this.NoArrCall=this.NoArrCall+1;
}

if(this.ArrImageList.length==this.NoArrCall)
{

  this.toastCtrl.create({ message: data.message, duration: 3000, position: 'top'}).present(); 
  this.navCtrl.setRoot(SubscribeNowPage,{product:this.product,LicenseUser:"yes"})
  return;

// this.alertCtrl.create({  title:data.message,
// buttons: [{   text: 'OK',  role: 'cancel',
//     handler: () => {
//       console.log("this.product == ",this.product);
//       this.navCtrl.setRoot(SubscribeNowPage,{product:this.product,LicenseUser:"yes"})
//     }     }]
// }).present()


}
         }
 },err=>{  
loading.dismiss(); 
this.toastCtrl.create({ message: `No internet connection.`, duration: 3000, position: 'top'}).present();
return;  
}
)
}

SendToServer()
{
  if(this.signupdata[0].signup_type==4)
     {
      var  user_image=this.HostName+"/uploads/Webuser_profilepic/197790b8aeddf696e5376adf97953bfc.jpg"
      var terms_checked=1
      var content_type_id=0
      var is_subscribed=0
      var subscription_id=0
      let loading=this.loadingCtrl.create({
        spinner: 'hide',
        content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
        cssClass: 'transparent'
      })
      Observable.of(loading).flatMap(loading=>loading.present())
            .flatMap(() => this.security.signup(
            this.signupdata[0].student,
            this.signupdata[0].signup_type,
            this.signupdata[0].username,
            this.signupdata[0].password,
            this.signupdata[0].FirstName,
            this.signupdata[0].LastName,
            this.signupdata[0].Email_Id,
            this.signupdata[0].PhoneNo,
            this.signupdata[0].Age,
            this.signupdata[0].gender,
            this.signupdata[0].image,
                this.signupdata[0].SchoolName,
                this.signupdata[0].SchoolAddress,
                this.signupdata[0].City,
                this.signupdata[0].State,
                this.signupdata[0].Country,
                this.signupdata[0].StudentDetails,
              terms_checked,
              content_type_id,
              is_subscribed,
              subscription_id,
             this.user_content_nature,
             this.user_magazine,
             this.user_relation,
             this.user_text_type,
                this.signupdata[0].student_id,
                this.signupdata[0].parent_name,
                this.signupdata[0].parent_email,
                this.signupdata[0].parent_relation,
                this.signupdata[0].image, 
                  this.signupdata[0].ResAdd,
                  this.signupdata[0].ResCity,
                  this.signupdata[0].ResState,
                  this.signupdata[0].ResPinCode,
                  this.signupdata[0].ResCountry 
             ))
           .subscribe(data=>{
             loading.dismiss()
             if(data.status==0){
                  this.alertCtrl.create({ title:data.errorData[0], buttons: ['Dismiss'] }).present()
             } 
             else
             {
                    this.userid=data.userId
                    localStorage['USERID']=this.userid
                    localStorage['token']=data.token
                    this.str.set('USERID',this.userid)
              
                    for(var i=0;i<this.user_magazine.length;i++){
                      this.product.push({ magazine_id:this.user_magazine[i].magazine_id   }) 
                           console.log('product'+JSON.stringify(this.product))
                   }

                   this.ArrImageList.push({id:data.userId,imageUrl:this.signupdata[0].image,Imgtype:1})

                   if(data.siblings_id.length==0 && data.parent_id.length==0)
                   {
                    this.alertCtrl.create({  title:data.message,
                      buttons: [{   text: 'OK',  role: 'cancel',
                          handler: () => {
                            console.log("this.product == ",this.product);
                      this.navCtrl.setRoot(OtppagePage,{product:this.product})
                          }     }]
                    }).present()
                    return;
                   }

                   if(this.user_relationTemp.length !=0)  {

                       if(this.ParentUserFilter.length !=0) {
                         this.ArrImageList.push({id:data.parent_id[0],imageUrl:this.ParentUserFilter[0].image,Imgtype:2})
                       }

                   if(this.SiblingUserFilter.length !=0)
                   {
                     if(this.SiblingUserFilter.length ==1)
                     {
                      this.ArrImageList.push({id:data.siblings_id[0],imageUrl:this.SiblingUserFilter[0].image,Imgtype:3})
                      
                     }
                     if(this.SiblingUserFilter.length ==2)
                     {
                       this.ArrImageList.push({id:data.siblings_id[0],imageUrl:this.SiblingUserFilter[0].image,Imgtype:3})

                       this.ArrImageList.push({id:data.siblings_id[1],imageUrl:this.SiblingUserFilter[1].image,Imgtype:4})
                     }
                   }  
                   } // end of this.user_relationTemp if connn....

   console.log("this.ArrImageList.length=="+this.ArrImageList.length)
   console.log("this.ArrImageList ==",this.ArrImageList) 
for(let j=0;j<this.ArrImageList.length;j++) {
  console.log(" ArrImageList Imgtype==",this.ArrImageList[j].Imgtype) 
  console.log(" ArrImageList for loop==",this.ArrImageList[j]) 
  
     
if(this.ArrImageList[j].Imgtype==1) {  
  console.log(" ArrImageList Imgtype 1==",this.ArrImageList[j].Imgtype)  
  if(this.ArrImageList[j].imageUrl !="assets/imgs/user.png"){
    const filetransfers: FileTransferObject = this.filetransfer.create();
    let options: FileUploadOptions = {  
      fileKey: 'file',
      fileName: 'filename.jpg',
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: {
        user_id: this.ArrImageList[j].id
      } 
    }
    filetransfers.upload(this.ArrImageList[j].imageUrl,this.HostName+'/admin/userapi/imageUpload', options) .then((data) => {
      }, (err) => {
        this.toastCtrl.create({ message: `Error in image uploading,Please try again.`, duration: 3000, position: 'top'}).present();  
      })
  }
}

if(this.user_relationTemp.length !=0)  {

  if(this.ParentUserFilter.length !=0) {

    if(this.ArrImageList[i].Imgtype==2) {  
      console.log(" ArrImageList Imgtype 2==",this.ArrImageList[j].Imgtype) 
      if(this.ArrImageList[i].imageUrl !=this.HostName+"/themes/default/assets/img/add-parent.png"){
        console.log("userid 2=="+this.ArrImageList[i].id)
        const filetransfers: FileTransferObject = this.filetransfer.create();
        let options: FileUploadOptions = {
          fileKey: 'file',
          fileName: 'filename.jpg',
          chunkedMode: false,
          mimeType: "multipart/form-data",
          params: {
            user_id: this.ArrImageList[i].id
          } 
        }
        filetransfers.upload(this.ArrImageList[i].imageUrl,this.HostName+'/admin/userapi/imageUpload', options) .then((data) => {
    
          }, (err) => {
            this.toastCtrl.create({ message: `Error in image uploading,Please try again.`, duration: 3000, position: 'top'}).present();  
          })
      }
    }     


  }

if(this.SiblingUserFilter.length !=0)
{
  if(this.SiblingUserFilter.length ==1)
  {
    if(this.ArrImageList[j].Imgtype==3) {

      console.log(" ArrImageList Imgtype 3==",this.ArrImageList[j].Imgtype)  
      if(this.ArrImageList[j].imageUrl !=this.HostName+"/themes/default/assets/img/add-sib.png"){
        const filetransfers: FileTransferObject = this.filetransfer.create();
        let options: FileUploadOptions = {
          fileKey: 'file',
          fileName: 'filename.jpg',
          chunkedMode: false,
          mimeType: "multipart/form-data",
          params: {
            user_id: this.ArrImageList[j].id
          } 
        }
    
        filetransfers.upload(this.ArrImageList[j].imageUrl,this.HostName+'/admin/userapi/imageUpload', options) .then((data) => {
          }, (err) => {
            this.toastCtrl.create({ message: `Error in image uploading,Please try again.`, duration: 3000, position: 'top'}).present();  
          })
      }
   // end of if conditions
    }
  }
  if(this.SiblingUserFilter.length ==2) {
    
    
if(this.ArrImageList[j].Imgtype==4) {
  console.log(" ArrImageList Imgtype 4==",this.ArrImageList[j].Imgtype)  
  if(this.ArrImageList[j].imageUrl !=this.HostName+"/themes/default/assets/img/add-sib.png"){
    const filetransfers: FileTransferObject = this.filetransfer.create();
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: 'filename.jpg',
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: {
        user_id: this.ArrImageList[j].id
      } 
    }
    filetransfers.upload(this.ArrImageList[j].imageUrl,this.HostName+'/admin/userapi/imageUpload', options) .then((data) => {
      }, (err) => {
        this.toastCtrl.create({ message: `Error in image uploading,Please try again.`, duration: 3000, position: 'top'}).present();   
      })
  }
}

if(this.ArrImageList[j].imageUrl !=this.HostName+"/themes/default/assets/img/add-sib.png"){
  const filetransfers: FileTransferObject = this.filetransfer.create();
  let options: FileUploadOptions = {
    fileKey: 'file',
    fileName: 'filename.jpg',
    chunkedMode: false,
    mimeType: "multipart/form-data",
    params: {
      user_id: this.ArrImageList[j].id
    } 
  }

  filetransfers.upload(this.ArrImageList[j].imageUrl,this.HostName+'/admin/userapi/imageUpload', options) .then((data) => {
    }, (err) => {
      this.toastCtrl.create({ message: `Error in image uploading,Please try again.`, duration: 3000, position: 'top'}).present();  
    })
}





  }
} 

}

  this.NoArrCall=this.NoArrCall+1;
}


console.log("this.NoArrCall=="+this.NoArrCall) 
if(this.ArrImageList.length==this.NoArrCall) {

  this.toastCtrl.create({ message: data.message, duration: 3000, position: 'top'}).present(); 
  this.navCtrl.setRoot(OtppagePage,{product:this.product })
  return;


  //  this.alertCtrl.create({  title:data.message,
  //   buttons: [{   text: 'OK',  role: 'cancel',
  //       handler: () => {
  //         console.log("this.product == ",this.product);
  //   this.navCtrl.setRoot(OtppagePage,{product:this.product})
  //       }     }]
  // }).present()
}

               


             }
     },err=>{  
    loading.dismiss(); 

    this.toastCtrl.create({ message: `No internet connection.`, duration: 3000, position: 'top'}).present();
    return;  
   }
    )
}  

     else if(this.signupdata[0].signup_type==2)
     {
      var  user_image=this.HostName+"/uploads/Webuser_profilepic/197790b8aeddf696e5376adf97953bfc.jpg"
      var terms_checked=1
      var content_type_id=0
      var is_subscribed=0
      var subscription_id=0
      let loading=this.loadingCtrl.create({
        spinner: 'hide',
        content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
        cssClass: 'transparent'
      })
      Observable.of(loading).flatMap(loading=>loading.present())
            .flatMap(() => this.security.socialsignup(
              this.signupdata[0].student,
              this.signupdata[0].signup_type,
             this.signupdata[0].FirstName,
             this.signupdata[0].LastName,
             this.signupdata[0].Email_Id,
             this.signupdata[0].PhoneNo,
             this.signupdata[0].Age,
              this.signupdata[0].gender,
              this.signupdata[0].image,
               this.signupdata[0].SchoolName,
              this.signupdata[0].SchoolAddress,
              this.signupdata[0].City,
              this.signupdata[0].State,
              this.signupdata[0].Country,
              this.signupdata[0].StudentDetails,
             terms_checked,
              content_type_id,
              is_subscribed,
            subscription_id,
             this.user_content_nature,
             this.user_magazine,
             this.user_relation,
             this.user_text_type,
             this.signupdata[0].student_id,
             this.signupdata[0].parent_name,
             this.signupdata[0].parent_email,
             this.signupdata[0].parent_relation  
              ))
           .subscribe(data=>{
             loading.dismiss()
             if(data.status==0){
             let alert=this.alertCtrl.create({
              title:data.errorData[0],
    
              buttons: ['Dismiss']
             })
             alert.present()
             }
             else
             {
              for(var i=0;i<this.user_magazine.length;i++){
                this.product.push({
                 magazine_id:this.user_magazine[i].magazine_id
                     }) 
                     console.log('product'+JSON.stringify(this.product))
             }
                    this.userid=data.userId
                    localStorage['USERID']=this.userid
                    localStorage['token']=data.token

                      localStorage['loguser']=data.username;  
                    localStorage['logpass']=data.password;  
                    
                    this.str.set('USERID',this.userid)


              // let alert=this.alertCtrl.create({
              //   title:data.message,
              //   buttons: [
              //     {
              //       text: 'OK',
              //       role: 'cancel',
              //       handler: () => {
              //        this.navCtrl.setRoot(OtppagePage,{product:this.product})
              //       }
              //     }]
              //  })
              //  alert.present()
             
               this.toastCtrl.create({ message: data.message, duration: 3000, position: 'top'}).present(); 
               this.navCtrl.setRoot(OtppagePage,{product:this.product })
               return;



             }
    
     })
     }
}

SendToServerTeacher()
{
  if(this.signupdata[0].signup_type==4)
     {
      var  user_image=this.HostName+"/uploads/Webuser_profilepic/197790b8aeddf696e5376adf97953bfc.jpg"
      var terms_checked=1
      var content_type_id=0
      var is_subscribed=0
      var subscription_id=0
      let loading=this.loadingCtrl.create({
        spinner: 'hide',
        content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
        cssClass: 'transparent'
      })
      Observable.of(loading).flatMap(loading=>loading.present())
            .flatMap(() => this.security.signup(
            this.signupdata[0].student,
            this.signupdata[0].signup_type,
            this.signupdata[0].username,
            this.signupdata[0].password,
            this.signupdata[0].FirstName,
            this.signupdata[0].LastName,
            this.signupdata[0].Email_Id,
            this.signupdata[0].PhoneNo,
            this.signupdata[0].Age,
            this.signupdata[0].gender,
            this.signupdata[0].image,
                this.signupdata[0].SchoolName,
                this.signupdata[0].SchoolAddress,
                this.signupdata[0].City,
                this.signupdata[0].State,
                this.signupdata[0].Country,
                this.signupdata[0].StudentDetails,
              terms_checked,
              content_type_id,
              is_subscribed,
              subscription_id,
             this.user_content_nature,
             this.user_magazine,
             this.user_relation,
             this.user_text_type,
                this.signupdata[0].student_id,
                this.signupdata[0].parent_name,
                this.signupdata[0].parent_email,
                this.signupdata[0].parent_relation,
                this.signupdata[0].image ,
                  this.signupdata[0].ResAdd,
                  this.signupdata[0].ResCity,
                  this.signupdata[0].ResState,
                  this.signupdata[0].ResPinCode,
                  this.signupdata[0].ResCountry  
             ))
           .subscribe(data=>{
             loading.dismiss()
             console.log("success===",data);
             //alert("success==="+JSON.stringify(data));
             if(data.status==0){
                  this.alertCtrl.create({ title:data.errorData[0], buttons: ['Dismiss'] }).present()
             }
             else
             {
              loading.dismiss()
                    this.userid=data.userId
                    localStorage['USERID']=this.userid
                    this.str.set('USERID',this.userid)
                    localStorage['token']=data.token

                      // if(localStorage['Refferalcode']!="")
                      // {
                      //   this.http.post('http://88.198.133.25/ILR_dev/admin/userapi/referalCode', { user_id:localStorage['USERID'], referral_code:localStorage['Refferalcode']   }).subscribe((data)=>{  localStorage['Refferalcode']="";     })
                      // }
                   

                    for(var i=0;i<this.user_magazine.length;i++){
                      this.product.push({ magazine_id:this.user_magazine[i].magazine_id   }) 
                           console.log('product'+JSON.stringify(this.product))
                   }



              //       this.alertCtrl.create({  title:data.message,
              //   buttons: [ {   text: 'OK',  role: 'cancel',
              //       handler: () => {
              //         console.log("this.product == ",this.product);
              //         //this.navCtrl.setRoot(TrialPeriodPage,{product:this.product});
              //          if(this.signupdata[0].image=="assets/imgs/user.png" ) { 
              //            console.log('if')
              //           // this.navCtrl.setRoot(TrialPeriodPage,{product:this.product})
              //         }
              //         else{
              //            console.log('else')
              //           this.fileupload(this.signupdata[0].image,data.userId)
              //         }
              //        // this.navCtrl.setRoot(TrialPeriodPage,{product:this.product})
              //       //  this.navCtrl.setRoot(OtppagePage,{product:this.product})
              //       }     }]
              //  }).present()


               if(this.signupdata[0].image=="assets/imgs/user.png" ) { 
                console.log('if')
             }
             else{
                console.log('else')
               this.fileupload(this.signupdata[0].image,data.userId)
             }
 
               this.toastCtrl.create({ message: data.message, duration: 3000, position: 'top'}).present(); 
               this.navCtrl.setRoot(OtppagePage,{product:this.product })
               return;





             }
     },err=>{  
    loading.dismiss(); console.log("error msg===",err); 
    this.toastCtrl.create({ message: `No internet connection.`, duration: 3000, position: 'top'}).present();
    return;  
   }
    )
}   // end of  if conditions ...   this.signupdata[0].signup_type==4  
     
     else if(this.signupdata[0].signup_type==2)
     {
      var  user_image=this.HostName+"/uploads/Webuser_profilepic/197790b8aeddf696e5376adf97953bfc.jpg"
      var terms_checked=1
      var content_type_id=0
      var is_subscribed=0
      var subscription_id=0
      let loading=this.loadingCtrl.create({
        spinner: 'hide',
        content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
        cssClass: 'transparent'
      })
      Observable.of(loading).flatMap(loading=>loading.present())
            .flatMap(() => this.security.socialsignup(
              this.signupdata[0].student,
              this.signupdata[0].signup_type,
             this.signupdata[0].FirstName,
             this.signupdata[0].LastName,
             this.signupdata[0].Email_Id,
             this.signupdata[0].PhoneNo,
             this.signupdata[0].Age,
              this.signupdata[0].gender,
              this.signupdata[0].image,
               this.signupdata[0].SchoolName,
              this.signupdata[0].SchoolAddress,
              this.signupdata[0].City,
              this.signupdata[0].State,
              this.signupdata[0].Country,
              this.signupdata[0].StudentDetails,
             terms_checked,
              content_type_id,
              is_subscribed,
            subscription_id,
             this.user_content_nature,
             this.user_magazine,
             this.user_relation,
             this.user_text_type,
             this.signupdata[0].student_id,
             this.signupdata[0].parent_name,
             this.signupdata[0].parent_email,
             this.signupdata[0].parent_relation  
              ))
           .subscribe(data=>{
             loading.dismiss()
             if(data.status==0){
             let alert=this.alertCtrl.create({
              title:data.errorData[0],
    
              buttons: ['Dismiss']
             })
             alert.present()
             }
             else
             {
              for(var i=0;i<this.user_magazine.length;i++){
                this.product.push({
                 magazine_id:this.user_magazine[i].magazine_id
                     }) 
                     console.log('product'+JSON.stringify(this.product))
             }
                    this.userid=data.userId
                    localStorage['USERID']=this.userid
                    localStorage['token']=data.token
                    this.str.set('USERID',this.userid)

                    localStorage['loguser']=data.username;  
                  localStorage['logpass']=data.password;  

              // let alert=this.alertCtrl.create({
              //   title:data.message,
              //   buttons: [
              //     {
              //       text: 'OK',
              //       role: 'cancel',
              //       handler: () => {
              //          this.fileupload(this.signupdata[0].image,data.userId)  
              //        // this.navCtrl.setRoot(TrialPeriodPage,{product:this.product})
              //        this.navCtrl.setRoot(OtppagePage,{product:this.product})
              //       }
              //     }]
              //  })
              //  alert.present()


               this.toastCtrl.create({ message: data.message, duration: 3000, position: 'top'}).present(); 
               this.fileupload(this.signupdata[0].image,data.userId)   
               this.navCtrl.setRoot(OtppagePage,{product:this.product })
               return;


             
             }
    
     })
     }
}







  fileupload(imgOrgUrl,id)
  {
    const filetransfers: FileTransferObject = this.filetransfer.create();
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: 'filename.jpg',
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: {
        user_id: id
      } 
    }
  



    filetransfers.upload(imgOrgUrl,this.HostName+'/admin/userapi/imageUpload', options) .then((data) => {
      //alert(JSON.stringify(data));
        // alert(JSON.parse(data.response).image);
      }, (err) => {
        this.toastCtrl.create({ message: `Error in image uploading,Please try again.`, duration: 3000, position: 'top'}).present();
      // alert('error'+JSON.stringify(err))    
      })
  }


  testnext()  {    this.navCtrl.setRoot(TrialPeriodPage);       }


  selectedType(index){
    //console.log("index ", index);
    this.borderColor=document.getElementById('x_'+index).style.border;
   // console.log("color", this.borderColor);
    if(this.borderColor =="none"){
      this.count=this.count+1
      //console.log('count',this.count);
       this.borderColor=document.getElementById('x_'+index).style.border="3px solid black";
    }

    else if(this.borderColor=="3px solid black"){
      this.count=this.count-1
      this.borderColor=document.getElementById('x_'+index).style.border="";
      //console.log('count',this.count);
      if(this.count==0){
        this.buttonDisabled=true;
     }
   else{
     this.buttonDisabled = false;
   }
}
  
    else if(this.borderColor=="" || this.borderColor == "3px solid black"){
      //console.log('else if');
      this.count=this.count+1;
      //console.log('count',this.count);
      this.borderColor = document.getElementById('x_'+index).style.border="3px solid black";
       this.buttonDisabled=false;
       var textid=index+1
    this.user_text_type.push({
      text_id:textid
    })
    console.log("this.user_text_type==",this.user_text_type)
    }
}




goToNextSlide() {
  let currentIndex = this.slides.getActiveIndex();
  
    var index= currentIndex+1;
  this.slides.slideTo(index, 500);
}




ionViewDidEnter() {
  this.menuCtrl.swipeEnable(false,'menu2'); 
}
ionViewWillLeave() {     
  this.menuCtrl.swipeEnable(true);
 }
        
  
//  ionViewWillEnter () {
//   this.menuCtrl.swipeEnable( false, 'menu2' );
//   }


}
