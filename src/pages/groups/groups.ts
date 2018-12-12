import { Component, ViewChild } from '@angular/core';
import { LoadingController,IonicPage, NavController, NavParams,ActionSheetController, ToastController, ModalController, Content } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import{SecurityProvider}from'../../providers/security/security'
import{Observable}from'rxjs/Rx'
import { Http, Headers , RequestOptions } from '@angular/http';
import * as moment from 'moment';
import { elementAt } from 'rxjs/operator/elementAt';
import{ImagazinespagePage}from'../imagazinespage/imagazinespage'
import{ bigdata}from'../../app/models'
import {GroupinfoPage } from '../groupinfo/groupinfo'
import {GroupmodelPage } from '../groupmodel/groupmodel' 
import {  Response } from '@angular/http';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { DomSanitizer } from '@angular/platform-browser';

import { ContactUsPage } from '../contact-us/contact-us';
 
/**
 * Generated class for the GroupsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html',
})
export class GroupsPage {
  @ViewChild(Content) content: Content;
  public group;
  getevents
  badwordlist:any =[];
  doubled
  image='assets/imgs/add.png'
  getdesc
  myTime
  groupData=[]
  isenabled:boolean=false;
  checkabusedata=[]
  resultabsue=[]
  existalert:boolean=false;
  existalert1:boolean=false;
  existalert2:boolean=false;
  existalert3:boolean=false;
  status=0
  textalert
  textalert2
  imagealert
  textalert4
  chooseOptions
  
  Grouplists
  GroupJoins
  EventBtnList:boolean=false;
  GroupIdVal
  groupName;
  groupId;
  groupImage;
  totalGroupNumbers;
  groupDescription;
  IdDisplay
  Preindex
  arravoicelist
  ArrVoiceList
  count=0
  plusORMinus
  displaynone:boolean=false
  CommentTxt
  CommentList=[];     
  ListShowStatus:number=-1
Useridactive
chattimes 

actionsheet

HostName

GroupListIndex:any=0;
CommentsAbsuse:boolean = false;

GrouplistchatFilter:any =[];
  constructor(public filetransfer: FileTransfer,private camera: Camera,
    public actionCtrl:ActionSheetController,
    public security:SecurityProvider,public loadingCtrl:LoadingController,
    public navCtrl: NavController, public navParams: NavParams,
    public toastCtrl:ToastController,public bdata:bigdata, public modalCtrl : ModalController,public http:Http,private file: File, public sanitizer: DomSanitizer ) {

      this.HostName=this.security.Hostname();  
  
     setTimeout(() => {   this.content.scrollToBottom(0);  }, 1000); 

    this.Useridactive=localStorage['USERID']; 

    this.group=0;
    this.IdDisplay="none";
    this.plusORMinus=1;
           
    //this.badwordlist = ["rascal","pussy","fuck", "ass", "asshole", "shit", "nude", "piss", "dick", "bitch", "bastard", "damn", "dickhead", "arse", "arsehole", "fag", "badass", "beaver", "bollock", "boner", "bugger", "bullshit", "bum", "cock", "crap", "creampie", "cunt", "dyke", "fag", "faggot", "fart", "fatass", "Greek", "jerk", "kike", "nigga", "nigger", "suck", "tit", "trap", "twat", "wank"];

    let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
    let requestOptions=new RequestOptions({headers:headers})
    let param=JSON.stringify( {
      user_id:localStorage['USERID'],
      token:localStorage['token']
    })      
    this.http.post(this.HostName+'/abusiveWordList',param,requestOptions )
    .subscribe((data)=>{
      if(JSON.parse((<any>data)._body).status==1){
        this.badwordlist=JSON.parse((<any>data)._body).abusive_words
      }
    },err=> {    }) 
    

    this.chooseOptions="list" 
    this. ListShow();
  }
  

  ChatRefresh(groupId)
  {
    let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
    let requestOptions=new RequestOptions({headers:headers})
    let param=JSON.stringify( {
      user_id:localStorage['USERID'],
      token:localStorage['token'],
      group_id:groupId
    })                       
    this.http.post(this.HostName+'/admin/services/userGroupCommentList',param,requestOptions )
    .subscribe((data)=>{
      console.log(JSON.parse((<any>data)._body).status)
      if(JSON.parse((<any>data)._body).status==1){
        this.groupData=JSON.parse((<any>data)._body).comment; 
        this.GrouplistchatFilter=JSON.parse((<any>data)._body).comment;     
        setTimeout(() => {   this.content.scrollToBottom(300);  }, 1000);  
      }
    })
  }

  openGroup(index){ 
    this.GroupListIndex=index    
    console.log("this.Grouplists==",this.Grouplists)
    console.log('index-----', index);
    console.log('ahasa', this.Grouplists[index]);
    this.groupName= this.Grouplists[index].group_name
    this.groupImage=this.Grouplists[index].group_image
    console.log('image-----', this.groupImage);
    this.groupDescription=this.Grouplists[index].group_description
    this.groupId=this.Grouplists[index].group_id
    this.groupData=this.Grouplists[index].user_comment
    this.GrouplistchatFilter=this.Grouplists[index].user_comment
     this.chattimes =TimerObservable.create(0, (3*1000)).subscribe(t => {  this.ChatRefresh(this.groupId);     });
    console.log('data', this.groupData);
    this.totalGroupNumbers=this.Grouplists[index].group_total_member
    this.group=1; 
  }
 
  ionViewWillLeave() {   
    this.chattimes.unsubscribe();
  }

  groupInfo(){       
   this.navCtrl.push(GroupinfoPage,{ Grouplists:this.Grouplists[this.GroupListIndex] });     
  }

  // Upload picture camera and Gallery 

  uploadpicture()
  {
   this.actionsheet = this.actionCtrl.create({
      title: 'Image Upload!',
      buttons: [{
        text: 'Upload From Gallery',
        handler: () => {
    this.gallery()
        },
      }
        ,
      {
        text: 'Take A Snap',
        handler: () => {
         this.camera1()
        }
      }]
    })
    this.actionsheet.present(); 
  }


  gallery() {
    this.camera.getPicture({
      quality: 90,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.PICTURE,
      // encodingType: this.camera.EncodingType.JPEG,
      // targetHeight: 500,
      // targetWidth: 500,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }).then((imageData) => {
      //this.image=imageData
      this.file.resolveLocalFilesystemUrl(imageData).then(fileEntry => {
        fileEntry.getMetadata((metadata) => {
               //metadata.size is the size in bytes
            if(metadata.size <= 282600){  
              this.image = imageData; 
              this.uploadpicture() 
              this.actionsheet.dismiss()
            }
            else{ 
              this.toastCtrl.create({ message: `Please upload file less than 300KB. Thanks!!`, duration: 4000, position: 'top' }).present();
            }
        })
    })
    }, (err) => {
      this.toastCtrl.create({ message:"Image upload fail, Please try again.", duration: 3000, position: 'top' }).present(); 
    })
  }


  camera1(){
  this.camera.getPicture({
    quality: 75,
    destinationType:this.camera.DestinationType.FILE_URI,
    sourceType:this.camera.PictureSourceType.CAMERA,
    encodingType: this.camera.EncodingType.JPEG,
    targetHeight: 500,
    targetWidth: 500,
    saveToPhotoAlbum: false,
    correctOrientation: true
  }).then((imageData) => {
    this.image=imageData   
  }, (err) => {
    this.toastCtrl.create({ message:"Image upload fail, Please try again.", duration: 3000, position: 'top' }).present(); 
  })
}
  

  getFormatedTime(dateString){
    var date = new Date(dateString);
    var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    var am_pm = date.getHours() >= 12 ? "pm" : "am";
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let time = hours + ":" + minutes + " " + am_pm;
    return time;
 }
  

 dublicateCheck(value) {
  this.existalert=false  
  if(value !=""){
    if(this.getdesc !=undefined || this.getdesc !=""){       
      this.isenabled=true 
    }      
    for(let index=0;index<this.badwordlist.length; index++){  
      var jar=RegExp(this.badwordlist[index],'gi')
        if(value.search(jar)!=-1) {   
          console.log("if con")      
          this.isenabled=false       
          this.existalert=true               
          this.textalert="*You can't use such type of words."
          break;
        }
        else {
          console.log("else con")     
            if(this.getdesc !=undefined || this.getdesc !=""){        
              this.isenabled=true  
              return;      
            }     
        }  
    }
  }
  else{  
    this.textalert="*Please Enter group name"
    this.existalert=true
    this.isenabled=true 
  }
}


dublicateCheck1(value) {  
  this.existalert2=false   
  if(value !=""){
    if(this.getevents !=undefined || this.getevents !=""){     
      this.isenabled=false 
    }
    for(let index=0;index<this.badwordlist.length; index++){    
      var jar=RegExp(this.badwordlist[index],'gi')
        if(value.search(jar)!=-1) {
          this.existalert2=true 
          this.isenabled=false     
          this.textalert4="*You can't use such type of words."
          break ;
        }
        else { 
            if(this.getevents !=undefined || this.getevents !=""){     
              this.isenabled=true;  
              return;  
            }         
        }   
    } 
  }
  else{     
    this.textalert4="*Please Enter group Description"
    this.existalert2=true
    this.isenabled=true  
  }
}
         
 saveevent() {
     
if(this.getevents ==undefined || this.getevents =="") {
  this.textalert="*Please Enter group name"
  this.existalert=true
  return;
}  

for(let index=0;index<this.badwordlist.length; index++){
  var jar=RegExp(this.badwordlist[index],'gi')
  if(this.getevents.search(jar)!=-1) {
    this.isenabled=false
    this.existalert=true
    this.textalert="*You can't use such type of words."
    break;  
      }
      else {  this.existalert=false;   }
} 

if(this.getdesc==undefined||this.getdesc=="") {
  this.textalert4="*Please Enter group Description"
  this.existalert2=true
  return;
}
      
for(let index=0;index<this.badwordlist.length; index++){
  var jar=RegExp(this.badwordlist[index],'gi')
  if(this.getdesc.search(jar)!=-1)   {
    this.isenabled=false  
    this.existalert2=true
    this.textalert4="*You can't use such type of words."
    break
      }
      else  {        
          this.existalert2=false;
    }
}   

if(this.image=='assets/imgs/add.png') {
this.imagealert="*Please Upload the image"
this.existalert3=true
return;
}
this.existalert3=false


    // Calling create group API  
let loading=this.loadingCtrl.create({
  spinner: 'hide',
  content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
  cssClass: 'transparent'
})
Observable.of(loading).flatMap(loading=>loading.present())
.flatMap(()=>this.security.CreateGroup(this.getevents,this.getdesc)).subscribe(data=>{
  loading.dismiss()
console.log(data)
this.fileupload(data.id)
})

}

// Send image data into server ..


  fileupload(event_id)
  {
   
    const filetransfers: FileTransferObject = this.filetransfer.create();
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: 'filename.jpg',
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: {
        group_id: event_id
      }
      
    }
  


    filetransfers.upload(this.image,this.HostName+'/admin/services/groupImageUpload', options)
      .then((data) => {
        let toast = this.toastCtrl.create({
          message: "Group is submitted for review. It will be available after it will be appoved from admin",
          duration: 3000,
          position: 'top'
        });
      
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });
      
        toast.present();
  this.navCtrl.setRoot(ImagazinespagePage)
      }, (err) => {
      })
  }



  segmentChanged(event) {   
    let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
    let requestOptions=new RequestOptions({headers:headers})
    let param=JSON.stringify( {
      user_id:localStorage['USERID'],
      token:localStorage['token']
    })      
    this.http.post(this.HostName+'/abusiveWordList',param,requestOptions )
    .subscribe((data)=>{
      if(JSON.parse((<any>data)._body).status==1){
        this.badwordlist=JSON.parse((<any>data)._body).abusive_words      
      }
    },err=> {    }) 

    
    console.log(event.value)
    if(event.value=="list")
    {
      this. ListShow();
      return;
    }
    if(event.value=="Join")
    {

    this.group=0; 
      this. JoinShow();
      return;
    }

    if(event.value=='Create'){
      this.group=0;
    }
  }



  ListShow()
  {  

    let loading=this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
      cssClass: 'transparent'
    })
    Observable.of(loading).flatMap(loading=>loading.present())
    .flatMap(()=>this.security.GroupCommentShow()).subscribe(data=>{
      loading.dismiss()
    console.log("list show==",data)   
    this.ListShowStatus=data.status;
    if(data.status==1)
    {
  
      this.bdata.GroupCommentList=data.commentList;
      this.Grouplists=this.bdata.GroupCommentList;
      this.CommentList=this.bdata.GroupCommentList
      console.log( this.bdata.GroupCommentList)
      return;
    }
    if(data.status==0)
    {
    
      this.toastCtrl.create({ message: 'No Group is created yet.', duration: 3000, position: 'top' }).present(); 
      return;
    }
    })
  }

  commentsAbuse(val){
    if(val != ""){
    this.badwordlist.forEach((num,index) => {     
      var jar=RegExp(this.badwordlist[index],'gi')
        if(val.search(jar)!=-1) {
          this.toastCtrl.create({ message: "*You can't use such type of words.", duration: 3000, position: 'top' }).present(); 
        }     
      })     
    }       
  }

  SendBtn(id,index) {
if(this.CommentTxt == undefined || this.CommentTxt=="") {
  this.toastCtrl.create({ message: "Comment is required.", duration: 3000, position: 'top' }).present();
  return;
}    
this.CommentsAbsuse=false;  
this.badwordlist.forEach((num,index) => {     
  var jar=RegExp(this.badwordlist[index],'gi')
    if(this.CommentTxt.search(jar)!=-1) {
      this.CommentsAbsuse=true;
      return ;
    }  
})   
if(this.CommentsAbsuse){
  this.toastCtrl.create({ message: "*You can't use such type of words.", duration: 3000, position: 'top' }).present(); 
  return;
}
if(!this.CommentsAbsuse){
let loading=this.loadingCtrl.create({
  spinner: 'hide',
  content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
  cssClass: 'transparent'
})
Observable.of(loading).flatMap(loading=>loading.present())
.flatMap(()=>this.security.GroupCommentSave(id,this.CommentTxt)).subscribe(data=>{
  loading.dismiss()
console.log(data)      
this.toastCtrl.create({ message: data.message, duration: 3000, position: 'top' }).present();

this.groupData.push({"comment":this.CommentTxt,"first_name":this.bdata.userdata.first_name,"group_id":id,"user_id":localStorage['USERID'],"user_image":this.bdata.userdata.user_image,"is_online":"1"})

this.GrouplistchatFilter.push({"comment":this.CommentTxt,"first_name":this.bdata.userdata.first_name,"group_id":id,"user_id":localStorage['USERID'],"user_image":this.bdata.userdata.user_image,"is_online":"1"})
    
this.bdata.GroupCommentList=this.CommentList
this.Grouplists=this.bdata.GroupCommentList;
this.CommentTxt=""; 
setTimeout(() => {   this.content.scrollToBottom(300);  }, 1000);  
})
  return;
}
}
CancelBtn()
{
  this.CommentTxt=""; 
}


  GrouplistAdd(GroupId,index)
  {
    console.log('index',index)
    this.CommentTxt="";
    this.plusORMinus=0;
    this.count++
    this.CommentList=this.bdata.GroupCommentList[index].user_comment
    console.log(this.CommentList)
    let varStyle=document.getElementById("x_"+index).style.display
    if( this.IdDisplay!=varStyle){ 
        document.getElementById("x_"+this.Preindex).style.display="none"
        this.Preindex=index
        document.getElementById("x_"+index).style.display="block";
        document.getElementById("showminus_"+this.Preindex).style.display="inline-table"
        document.getElementById("showadd_"+this.Preindex).style.display="none"
        this.IdDisplay=document.getElementById("x_"+index).style.display
        this.displaynone=true;
        return;
      }


      if(this.displaynone==true){
        document.getElementById("x_"+this.Preindex).style.display="none"
        document.getElementById("showadd_"+this.Preindex).style.display="inline-table"
        document.getElementById("showminus_"+this.Preindex).style.display="none"
        this.IdDisplay=document.getElementById("x_"+this.Preindex).style.display
        this.displaynone=false;
          return;
        }
   

  

    if(this.count%2==0){
      document.getElementById("x_"+this.Preindex).style.display="none"
      document.getElementById("showadd_"+this.Preindex).style.display="inline-table"
      document.getElementById("showminus_"+this.Preindex).style.display="none"
      this.IdDisplay=document.getElementById("x_"+this.Preindex).style.display
    }


  if(this.count%2==1){
  this.ArrVoiceList=[]
  this.Preindex=index
  document.getElementById("x_"+index).style.display="block";
  document.getElementById("showadd_"+this.Preindex).style.display="none"
  document.getElementById("showminus_"+this.Preindex).style.display="inline-table"
  this.IdDisplay=document.getElementById("x_"+index).style.display
}

  }
 


  JoinShow()
  {
    let loading=this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
      cssClass: 'transparent'
    })
    Observable.of(loading).flatMap(loading=>loading.present())
    .flatMap(()=>this.security.GroupJoinShow()).subscribe(data=>{
      loading.dismiss()
    console.log(data)
    if(data.status==1)
    {
      this.GroupJoins=data.groups;
      return;
    }
    if(data.status==0)
    {
      this.toastCtrl.create({ message: 'No Group is created yet.', duration: 3000, position: 'top' }).present(); 
      return;
    }
    })
  }






  JoinEventBtn(EventId,index)
  { 
    let loading=this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
      cssClass: 'transparent'
    })
    Observable.of(loading).flatMap(loading=>loading.present())
    .flatMap(()=>this.security.GroupJoinBtn(EventId)).subscribe(data=>{
      loading.dismiss()
    console.log(data)
     
      if(data.status == 1)
      {
        let modalTips = this.modalCtrl.create(GroupmodelPage); 
         modalTips.onDidDismiss(data => {  
          this.EventBtnList=true;
          document.getElementById('btnclickEvent_'+index).style.display="none"
          document.getElementById('btnjoined_'+index).style.display="block"
            });
         modalTips.present(); 
        return;
      }
      if(data.status == 0)
      {
        this.toastCtrl.create({ message: data.message, duration: 3000, position: 'top' }).present(); 
        this.EventBtnList=false;
        document.getElementById('btnclickEvent_'+index).style.display="block"
        return;
      }
    })
  }  
 
  getItemsChat(ev){    
    var val = ev.target.value;
    if (val && val.trim() != '') {
      let groupchattemp=this.GrouplistchatFilter    
      this.groupData = groupchattemp.filter((item) => {
        return (item.comment.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
     }
     else{
      this.groupData = this.GrouplistchatFilter
     }
  }
  getItems(ev) {
    var val = ev.target.value;
    if (val && val.trim() != '') {
      let grouplisttemp=this.bdata.GroupCommentList   
      this.Grouplists = grouplisttemp.filter((item) => {
        return (item.group_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
     }
     else{     
      this.Grouplists =this.bdata.GroupCommentList
     }  
  }

  getJoinItems(ev){
    var val = ev.target.value;
    if (val && val.trim() != '') {
      this.GroupJoins = this.GroupJoins.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
     }
  }



}
