import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, MenuController, ToastController , ModalController, ViewController, ActionSheetController } from 'ionic-angular';
import{bigdata}from'../../app/models'
import{SecurityProvider}from'../../providers/security/security';
import{Observable}from'rxjs/Rx';
import { Events } from 'ionic-angular';
import * as moment from 'moment';
import{MyprofilepmodelPage}from'../myprofilepmodel/myprofilepmodel';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

/**
 * Generated class for the MyprofilepPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myprofilep',
  templateUrl: 'myprofilep.html',
})
export class MyprofilepPage {
userdata

imageval

ViewEmail:number=0;
hideEmail:boolean= false;
TxtEmail:any;

ViewPhone:number=0;
hidePhone:boolean= false;
TxtPhone:any;

ViewAdd:number=0;
TxtAdd
 hideTxtAdd :boolean= false;
 TxtCity 
 hideTxtCity :boolean= false;
 TxtState
  hideTxtState :boolean= false;
TxtCountry 
hideTxtCountry :boolean= false;
hideCancel :boolean= false;
hideAdd :boolean= false;
hideAddImg :boolean= false;
hideCity :boolean= false;
hideCountry:boolean= false;
hideState:boolean= false;

itemsstdname
activesub

countstdlist=1;
  stdnamelist:boolean=false;
  stdcomLen
  subscribeStatus
  subscribeExpiry
  magazineImg
  
  totalPoints:number=0;

  sendGiftsData
imageProfile
  constructor(public bdata:bigdata,public navCtrl: NavController, public navParams: NavParams,public loadingCtrl:LoadingController,public security:SecurityProvider,public events: Events, public menuCtrl: MenuController, public toastCtrl:ToastController, public modalCtrl: ModalController,public viewCtrl: ViewController,public filetransfer: FileTransfer,public actionsheetCtrl:ActionSheetController,private camera: Camera) {
this.userdata=this.bdata.userdata  
this.activeSubscription()
console.log(this.userdata)
if(this.userdata.user_image=="assets/imgs/001-social.png"){  this.imageProfile="assets/imgs/man-user.png";  return;}
if(this.userdata.user_image!="assets/imgs/001-social.png"){ this.imageProfile=this.userdata.user_image;   return; }
}

activeSubscription()
{
  let loading=this.loadingCtrl.create({
    spinner: 'hide',
    content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
    cssClass: 'transparent'
  })
  Observable.of(loading).flatMap(loading=>loading.present())
        .flatMap(() => this.security.activeSubscription())
       .subscribe(data=>{
         loading.dismiss()
        console.log(data);
        this.activesub=data.ActiveSubscription;
        this.stdcomLen=data.ActiveSubscription.studentComment;
        this.subscribeStatus=data.status
        this.events.publish('subuser:substatus', data.status, Date.now());
        this.magazineImg=data.ActiveSubscription.magazine_image
       
          this.totalPoints=data.ActiveSubscription.totalPoints
       this.sendGiftsData=data.ActiveSubscription.giftsData

      
        if(data.ActiveSubscription.childSubscription.length !=0)
        {
          let SubExpSplit=data.ActiveSubscription.childSubscription[0].max_expiry_date
          this.subscribeExpiry=moment(SubExpSplit).format('DD MMM YYYY');
          this.events.publish('userexp:expdate', this.subscribeExpiry, Date.now());
        }
      

       })
}




editEmail()
{
  this.ViewEmail=1;
  this.hideEmail=true;
  this.TxtEmail=this.userdata.email;
}
CancelEmail()
{
  this.ViewEmail=0;
  this.hideEmail=false;
}

editPhone()
{
  this.ViewPhone=1;
  this.hidePhone=true;
  this.TxtPhone=this.userdata.phone;
}

CancelPhone()
{
  this.ViewPhone=0;
  this.hidePhone=false;
}

editAdd()
{
  this.toastCtrl.create({ message: `Address`, duration: 4000, position: 'top' }).present(); 
  this.ViewAdd=1;
  this.hideAdd=true;
  this.hideTxtAdd=true; 
  this.hideAddImg=true;
  this.hideCancel=true;

  this.TxtAdd=this.userdata.school_address;

}
CancelAdd()
{
  this.ViewAdd=0
  this.hideAddImg=false;

  this.hideTxtAdd=false;
  this.hideAddImg=false;
  this.hideCancel=false;

  this.hideTxtCity=false;
  this.hideTxtState=false;
  this.hideTxtCountry=false;

  this.hideAdd=false;
  this.hideCity=false;
  this.hideCountry=false;
  this.hideState=false;
}

close() { this.viewCtrl.dismiss();  }

itemSelected()  {  this.modalCtrl.create(MyprofilepmodelPage,{sendGiftsData:this.sendGiftsData}).present();   }




  
uploadpicture()
{
  let actionsheet = this.actionsheetCtrl.create({
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
  actionsheet.present(); 
}

gallery() {
  this.camera.getPicture({
    quality: 75,
    destinationType: this.camera.DestinationType.FILE_URI,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    encodingType: this.camera.EncodingType.JPEG,
    targetHeight: 500,
    targetWidth: 500,
    saveToPhotoAlbum: false,
    correctOrientation: true
  }).then((imageData) => {
  this.ProfileImageUp(imageData)

  }, (err) => {
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
  this.ProfileImageUp(imageData)
   
}, (err) => {
  alert(err)
})
}

ProfileImageUp(ImgesP)
{
       const filetransfers: FileTransferObject = this.filetransfer.create();
       let options: FileUploadOptions = {
         fileKey: 'file',
         fileName: 'filename.jpg',
         chunkedMode: false,    
         mimeType: "multipart/form-data",
         params: {
           token:localStorage['token'],
      user_id:localStorage['USERID'],
      email : this.userdata.email,
      phone : this.userdata.phone,
      address : this.userdata.school_address,
      city : this.userdata.school_city,
      state : this.userdata.school_state,
      country : this.userdata.school_country,
      user_image : ImgesP
         }
       }
       
       filetransfers.upload(ImgesP,'https://www.readsfeed.com/admin/userapi/imageUpload', options)
         .then((data) => {
         let imgProfile= JSON.parse(data.response).image
        this.imageProfile=imgProfile;  
          this.events.publish('user:created', imgProfile, Date.now());
         }, (err) => {
         })
  
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad MyprofilepPage');
  }

}
