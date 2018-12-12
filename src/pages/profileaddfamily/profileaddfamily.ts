import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,LoadingController, ToastController,ActionSheetController } from 'ionic-angular';
import{SecurityProvider}from'../../providers/security/security';
import{Observable}from'rxjs/Rx';
import{bigdata}from'../../app/models';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import 'rxjs/add/operator/map';
import { Http,Headers, RequestOptions } from '@angular/http';


/**
 * Generated class for the ProfileaddfamilyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profileaddfamily',
  templateUrl: 'profileaddfamily.html',
})
export class ProfileaddfamilyPage {
  MainName
  MainEmail
  relationStatus
  image="";
  relationtmplist
  imageUrl
  loading
   arrlist=[];
   value=null
   actionsheet
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,public actionsheetCtrl:ActionSheetController,private camera: Camera,public filetransfer: FileTransfer,public loadingCtrl:LoadingController,public security:SecurityProvider,public toastCtrl:ToastController,public bdata :bigdata,public http:Http,public file:File) {
    this.relationtmplist=[{ name:"Brother",value:"1" },{ name:"Sister",value:"2"},{name:"Cousin",value:"3"},{ name:"Father",value:"4" },{ name:"Mother",value:"5"},{name:"Local Guardian",value:"6"}];
    this.arrlist=this.bdata.GetfamilyProfile;  
  }

// Check duplicate email ..
  UsrEmailCheck()
{
  let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
      let requestOptions=new RequestOptions({headers:headers})
      let param=JSON.stringify( { username:this.value,email:this.MainEmail    })
  return  this.http.post('https://www.readsfeed.com/validateEmailUsername',param,requestOptions) .subscribe((data)=>{
    console.log(JSON.parse((<any>data)._body).status)
     if(JSON.parse((<any>data)._body).status==0) {
      this.toastCtrl.create({ message: `Email Id already exist.`, duration: 3000, position: 'top'}).present();
    } 
     else{ 
      this.SendtoServer(this.image)
        }   
  },err =>{
    this.toastCtrl.create({ message: `No internet connection.`, duration: 3000, position: 'top'}).present();
  })
}



  GoToNext()
  {
    // Validation
    if(this.MainName=="" || this.MainName==undefined){
      this.toastCtrl.create({ message: `Name is required.`, duration: 4000, position: 'top'}).present();
      return;
    } 
    if(this.MainEmail=="" || this.MainEmail==undefined){
      this.toastCtrl.create({ message: `Email is required.`, duration: 4000, position: 'top'}).present();
      return;
    } 
    if(!this.validateEmail(this.MainEmail)) {
      this.toastCtrl.create({ message: `Email is invalid.`, duration: 3000, position: 'top'}).present();
      return; 
    }
    if(this.relationStatus=="" || this.relationStatus==undefined){
      this.toastCtrl.create({ message: `Relationship is required.`, duration: 4000, position: 'top'}).present();
      return; 
    } 
      this.UsrEmailCheck()
  }


  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  
  // Upload picture from camera and Gallery..
  uploadpicture()
  {
    this.actionsheet = this.actionsheetCtrl.create({
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

      
    this.file.resolveLocalFilesystemUrl(imageData).then(fileEntry => { 
      fileEntry.getMetadata((metadata) => {
             //metadata.size is the size in bytes
          if(metadata.size <= 282600){ 
            this.image=imageData   
            this.uploadpicture()  
            this.actionsheet.dismiss()
            
      this.toastCtrl.create({ message: `Image uploaded successfully.`, duration: 4000, position: 'top'}).present();  
            //this.eleRef.nativeElement.querySelector('#imgfile').dispatchEvent(new Event('click')); 
          }
          else{ 
            this.toastCtrl.create({ message: `Please upload file less than 300KB. Thanks!!`, duration: 4000, position: 'top' }).present();
          }
      })
  })


   


    }, (err) => {
      this.toastCtrl.create({ message: err, duration: 3000, position: 'top'}).present();
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
   this.toastCtrl.create({ message: `Image uploaded successfully.`, duration: 4000, position: 'top'}).present();
  }, (err) => {
    this.toastCtrl.create({ message: err, duration: 3000, position: 'top'}).present();
  })
}

SendtoServer(imgUrl)
{
  if(this.image =="")
  {
    
    imgUrl="https://www.readsfeed.com/themes/default/assets/img/deafault_men.jpg";
  }
   this.loading=this.loadingCtrl.create({
    spinner: 'hide',
    content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
    cssClass: 'transparent'
  }) 
  Observable.of(this.loading).flatMap(loading=>loading.present())   
        .flatMap(() => this.security.addfamilyData(this.relationStatus,this.MainName,this.MainEmail,imgUrl))
       .subscribe(data=>{
             
         if(data.status==1)
         {
           if(this.image =="")
           {
            this.loading.dismiss() 
            this.arrlist.push({  age : "0" ,email : data.familyDetail.email ,first_name : data.familyDetail.first_name, gender : data.familyDetail.gender ,id : data.id,last_name : "", phone : " " ,role : "3" ,school_address : this.bdata.userdata.school_address ,school_city : this.bdata.userdata.school_city ,school_country : this.bdata.userdata.school_country,school_name : "", school_state : this.bdata.userdata.school_state, shipping_address : this.bdata.userdata.shipping_address, shipping_city : this.bdata.userdata.shipping_city, shipping_country : this.bdata.userdata.shipping_country, shipping_pincode : this.bdata.userdata.shipping_pincode, shipping_state : this.bdata.userdata.shipping_state,student_class : " ", terms_checked : "", user_image :  "https://www.readsfeed.com/themes/default/assets/img/deafault_men.jpg", username : data.familyDetail.username}); 
            this.bdata.GetfamilyProfile =this.arrlist;
            this.viewCtrl.dismiss();
            return;
           }
           if(this.image !="")
           {
            this.ProfileImageUp(this.image,data,data.familyDetail.id) 
            return;
           }

         }
       },err=>{   this.loading.dismiss(); 
        this.toastCtrl.create({ message: `No internet connection,Please try again.`, duration: 3000, position: 'top'}).present();
       })
}
 


ProfileImageUp(imgOrgUrl,data,userids)
{ 
  const filetransfers: FileTransferObject = this.filetransfer.create();
  let options: FileUploadOptions = {
    fileKey: 'file',
    fileName: 'filename.jpg',
    chunkedMode: false,
    mimeType: "multipart/form-data",
    params: {
      user_id: userids
    } 
  }
 
  filetransfers.upload(imgOrgUrl,'https://www.readsfeed.com/admin/userapi/imageUpload', options) .then((data1) => {
    this.loading.dismiss() 
          this.imageUrl=JSON.parse(data1.response).image;
this.arrlist.push({  age : "0" ,email : data.familyDetail.email ,first_name : data.familyDetail.first_name, gender : data.familyDetail.gender ,id : data.id,last_name : "", phone : " " ,role : "3" ,school_address : this.bdata.userdata.school_address ,school_city : this.bdata.userdata.school_city ,school_country : this.bdata.userdata.school_country,school_name : "", school_state : this.bdata.userdata.school_state, shipping_address : this.bdata.userdata.shipping_address, shipping_city : this.bdata.userdata.shipping_city, shipping_country : this.bdata.userdata.shipping_country, shipping_pincode : this.bdata.userdata.shipping_pincode, shipping_state : this.bdata.userdata.shipping_state,student_class : " ", terms_checked : "", user_image :  this.imageUrl, username : data.familyDetail.username});
this.bdata.GetfamilyProfile =this.arrlist;
 this.toastCtrl.create({ message: data.message, duration: 3000, position: 'top' }).present();
    this.viewCtrl.dismiss();
    }, (err) => {
      this.loading.dismiss()
      this.toastCtrl.create({ message: `No internet connection,Please try again.`, duration: 3000, position: 'top'}).present();
    })
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileaddfamilyPage');
  }

ClearTxt()
{
  this.MainName="";
    this.MainEmail="";
    this.relationStatus="";
    this.image="";
    this.imageUrl="";
}

  close()
  {
    this.ClearTxt();
    this.viewCtrl.dismiss();
  }

}
