import { Component } from '@angular/core';
import { LoadingController,IonicPage,AlertController,Platform, NavController, NavParams,ActionSheetController, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import{SecurityProvider}from'../../providers/security/security'
import{Observable}from'rxjs/Rx'
import * as moment from 'moment';
import { elementAt } from 'rxjs/operator/elementAt';
import{ImagazinespagePage}from'../imagazinespage/imagazinespage'
import { Http, Headers , RequestOptions } from '@angular/http';

/**
 * Generated class for the EventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
  getevents
  badwordlist
  doubled
  image='assets/imgs/add.png'
  myDate
  getdesc
  myTime
  isenabled:boolean=false; 
checkabusedata=[]
resultabsue=[]
existalert:boolean=false;
existalert1:boolean=false;
existalert2:boolean=false;
existalert3:boolean=false;
status=0
textalert
textalert1
textalert2
imagealert
textalert4
chooseOptions

eventlists
EventBtnList:boolean=false;

actionsheet

HostName
  constructor(public alertCtrl:AlertController, public platform:Platform,public filetransfer: FileTransfer,private camera: Camera,public actionCtrl:ActionSheetController,public security:SecurityProvider,public loadingCtrl:LoadingController,public navCtrl: NavController, public navParams: NavParams,public toastCtrl:ToastController,private file: File,public http:Http) {

    this.HostName=this.security.Hostname();  

    //  this.badwordlist = ["rascal","pussy","fuck", "ass", "asshole", "shit", "nude", "piss", "dick", "bitch", "bastard", "damn", "dickhead", "arse", "arsehole", "fag", "badass", "beaver", "bollock", "boner", "bugger", "bullshit", "bum", "cock", "crap", "creampie", "cunt", "dyke", "fag", "faggot", "fart", "fatass", "Greek", "jerk", "kike", "nigga", "nigger", "suck", "tit", "trap", "twat", "wank"];

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
       

     this.chooseOptions="Create"

        // Register for android's system back button
        let backAction = platform.registerBackButtonAction(() => {
          let alert=this.alertCtrl.create({
            title: 'Exit?',
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
            }
            }
            ]
            })
            alert.present()
        
        
          },)
    }

  ionViewDidLoad() { 
    console.log('ionViewDidLoad EventsPage');
  }

  
  dublicateCheck(value){
    
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
      this.textalert="*Please Enter event name"
      this.existalert=true
      this.isenabled=true 
    }

    // if(value == ""){
    //   this.isenabled=false 
    //   this.existalert=true;  
    //   this.textalert="*Please Enter event name" 
    // }
    // else{
    //   this.existalert=false;  
    //   this.isenabled=true 
    // }
  
  }

  dublicateCheck1(value){

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

    // if(value == ""){
    //   this.isenabled=false 
    //   this.existalert2=true   
    //   this.textalert4="*Please Enter event Description"   
    // }
    // else{
    //   this.isenabled=true    
    //   this.existalert2=false   
    // }  
  }
    
  // Upload picture from camera and gallery ..   

  uploadpicture(){
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
              this.existalert3=false
              this.uploadpicture() 
              this.actionsheet.dismiss(); 
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
 


    if(event.value=="Join") {
      this. EventList();
      return;
    } 
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

    this.existalert3=false
     
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
  
  
saveevent(){

if(this.getevents==undefined||this.getevents==""){
  this.textalert="*Please Enter event name"
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

if(this.getdesc==undefined||this.getdesc==""){
  this.textalert4="*Please Enter event Description"
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


if(this.myDate==undefined||this.myDate==""){
  this.textalert1="*Please Enter event date"
  this.existalert1=true 
  return;
}

if(this.image=='assets/imgs/add.png'){
this.imagealert="*Please Upload the image"
this.existalert3=true
return;
}

  // Calling Create event API ..
let loading=this.loadingCtrl.create({
  spinner: 'hide',
  content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
  cssClass: 'transparent'
})
Observable.of(loading).flatMap(loading=>loading.present())
.flatMap(()=>this.security.createvent(moment(this.myDate).format('DD-MM-YY hh:mm A'),this.getdesc,this.getevents)).subscribe(data=>{
  loading.dismiss()
console.log(data)
this.fileupload(data.event_id,data.message)
})
  
}
  
eventDate(ev){
  console.log(ev);  
  this.existalert1=false  
}

// File Upload here ..

  fileupload(event_id,eventMsg) {
    const filetransfers: FileTransferObject = this.filetransfer.create();
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: 'filename.jpg',
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: {
        event_id: event_id
      }
    }
  
    filetransfers.upload(this.image,this.HostName+'/admin/services/eventImageUpload', options)
      .then((data) => {

        let toast = this.toastCtrl.create({
          message: eventMsg,
          duration: 3000,
          position: 'top'
        });   
      
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });
      
        toast.present();
  this.navCtrl.setRoot(ImagazinespagePage)
      }, (err) => {  
       //alert('error'+JSON.stringify(err))    
      })
  }




 

// Show  Event List   
  EventList()
  {
    
    let loading=this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
      cssClass: 'transparent'
    })
    Observable.of(loading).flatMap(loading=>loading.present())
    .flatMap(()=>this.security.EventList()).subscribe(data=>{
      loading.dismiss()
    console.log(data)
    if(data.status==1)
    {
      this.eventlists=data.events;
      return;
    }
    if(data.status==0)
    {
      this.toastCtrl.create({ message: 'No Event is created yet.', duration: 3000, position: 'top' }).present(); 
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
    .flatMap(()=>this.security.EvenJoin(EventId)).subscribe(data=>{
      loading.dismiss()
    console.log(data)
      this.toastCtrl.create({ message: data.message, duration: 3000, position: 'top' }).present(); 
      if(data.status == 1)
      {
        this.EventBtnList=true;
        document.getElementById('btnclickEvent_'+index).style.display="none"
        document.getElementById('btnjoined_'+index).style.display="block"
        return;
      }
      if(data.status == 0)
      {
        this.EventBtnList=false;
        document.getElementById('btnclickEvent_'+index).style.display="block"
        return;
      }
      
    
    })
  }

  


}
