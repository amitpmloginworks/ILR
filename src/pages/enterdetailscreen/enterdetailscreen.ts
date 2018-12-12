
import { Component,ElementRef  } from '@angular/core';
import { IonicPage, NavController,MenuController, NavParams,ActionSheetController,AlertController,ToastController,LoadingController, ModalController } from 'ionic-angular';
import{SchooldetailsPage}from'../schooldetails/schooldetails'
import{FormBuilder,FormGroup,Validators}from'@angular/forms'
import { FormControl, AbstractControl } from '@angular/forms'
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File, FileEntry, IFile } from '@ionic-native/file';
import{SecurityProvider}from'../../providers/security/security'
import{Observable}from'rxjs/Rx'
import { Http, Headers, RequestOptions } from '@angular/http';
import {  Response } from '@angular/http';
import{ReferalcodesPage}from'../referalcodes/referalcodes';
import{ bigdata}from'../../app/models'

declare var window;
declare var cordova;

/**
 * Generated class for the EnterdetailscreenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-enterdetailscreen',
  templateUrl: 'enterdetailscreen.html',
})
export class EnterdetailscreenPage {
username
password 
validation:FormGroup
Email_Id
FirstName
LastName
PhoneNo
Age
student
gender

image='assets/imgs/001-social.png'

signup_type

fblogin

inputtrue:boolean

googlelogin
existalert:boolean
value=null
LicenseStatus

imgtmp
actionSheet

HostName
constructor(public menuCtrl:MenuController,public http:Http,public security:SecurityProvider,public loadingCtrl:LoadingController,public toastCtrl:ToastController,public alertCtrl:AlertController,public filetransfer: FileTransfer,public actionsheetCtrl:ActionSheetController,private camera: Camera,public navCtrl: NavController, public navParams: NavParams,public formbuilder:FormBuilder,private modalCtrl: ModalController,public bdata:bigdata,private file: File,private eleRef: ElementRef) {

  this.HostName=this.security.Hostname(); 




  this.existalert=false
  let emailRegex =/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;  // Email validation 
let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/; // password validation..
var regex = /[0-9]|\./;

// Getting value from previous page ..
  this.username=this.navParams.get('username')   
   this.password=this.navParams.get('password') 
   this.signup_type=this.navParams.get('signup_type')
   this.fblogin=this.navParams.get('fblogin')
   this.googlelogin=this.navParams.get('googlelogin')
   this.LicenseStatus=this.navParams.get('LicenseStatus')

   if(this.LicenseStatus==true){ 
this.student=this.bdata.userdata.role
this.FirstName=this.bdata.userdata.first_name
this.Email_Id=this.bdata.userdata.email
this.Age=this.bdata.userdata.age
this.gender=this.bdata.userdata.gender
this.LastName=this.bdata.userdata.last_name
this.PhoneNo=this.bdata.userdata.phone

if(this.bdata.userdata.user_image!=this.HostName+"/themes/default/assets/img/deafault_men.jpg") {
this.image=this.bdata.userdata.user_image
this.imgtmp=this.bdata.userdata.user_image
}

    

this.validation=formbuilder.group({
  Email_Id:['',Validators.compose([Validators.maxLength(50), Validators.pattern(emailRegex), Validators.required])],
  FirstName:['',Validators.compose([Validators.required, Validators.maxLength(20),this.noWhitespaceValidator ])],
  LastName:['',Validators.compose([Validators.required,Validators.maxLength(20), this.noWhitespaceValidator])] ,
  PhoneNo:['',Validators.compose([Validators.maxLength(20),this.noWhitespaceValidator,Validators.pattern(regex), Validators.required])],
  Age:['',Validators.compose([Validators.maxLength(3), Validators.required, this.noWhitespaceValidator, Validators.pattern(regex)])]
  })


}


this.inputtrue=true
// if  signup_type==4 , it shows that general type ..
if(this.signup_type==4){

  this.validation=formbuilder.group({
    Email_Id:['',Validators.compose([Validators.maxLength(50), Validators.pattern(emailRegex), Validators.required])],
    FirstName:['',Validators.compose([Validators.required, Validators.maxLength(20),this.noWhitespaceValidator ])],
    LastName:['',Validators.compose([Validators.required,Validators.maxLength(20), this.noWhitespaceValidator])] ,
    PhoneNo:['',Validators.compose([Validators.maxLength(20),this.noWhitespaceValidator,Validators.pattern(regex), Validators.required])],
    Age:['',Validators.compose([Validators.maxLength(3), Validators.required, this.noWhitespaceValidator, Validators.pattern(regex)])]
    }) 
}
// if  signup_type==2 , it shows that Social login  ..
if(this.signup_type==2){
  this.validation=formbuilder.group({
    Email_Id:[Validators.compose([Validators.maxLength(50), Validators.pattern(emailRegex), Validators.required])],
    FirstName:[Validators.compose([Validators.required, Validators.maxLength(20),this.noWhitespaceValidator ])],
    LastName:[Validators.compose([Validators.required,Validators.maxLength(20), this.noWhitespaceValidator])] ,
    PhoneNo:['',Validators.compose([Validators.maxLength(20),this.noWhitespaceValidator,Validators.pattern(regex), Validators.required])],
    Age:['',Validators.compose([Validators.maxLength(3), Validators.required, this.noWhitespaceValidator, Validators.pattern(regex)])]
    }) 
}  
 

 
    if(this.fblogin==1){
     this.image=this.navParams.get('picture')
     this.FirstName=this.navParams.get('first_name')
     this.Email_Id=this.navParams.get('email') 
     this.LastName=this.navParams.get('last_name')
    }

    if(this.googlelogin==1){
     this.image=this.navParams.get('picture')
    this.FirstName=this.navParams.get('first_name')
    this.Email_Id=this.navParams.get('email') 
    this.LastName=this.navParams.get('last_name')
    }    
   
  
  }


  
  
  ionViewWillEnter()  {  
    this.menuCtrl.swipeEnable( false, 'menu2' );
        let modalTips = this.modalCtrl.create(ReferalcodesPage);  modalTips.present();   
    }



  // check duplicate Email validation
  UsrEmailCheck(value)
  { 
    console.log('hi'+value)
    let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
let requestOptions=new RequestOptions({headers:headers})
let param=JSON.stringify( {
  username:this.value,
 email:value   
})
   this.http.post(this.HostName+'/validateEmailUsername',param,requestOptions)
    .subscribe((data)=>{
      console.log(JSON.parse((<any>data)._body).status)
       if(JSON.parse((<any>data)._body).status==0)
       {
      this.existalert=true
       } 
       else{
        this.existalert=false
       }   

    })

  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad EnterdetailscreenPage');
  }
  navigatetoschooldetails()
  {
    if(this.student==undefined || this.student=='0')
    {
 this.alertCtrl.create({ title:'Please Choose the Role', buttons: ['OK'] }).present();
 return;
  }
    if(this.gender==undefined)
    {
 this.alertCtrl.create({ title:'Please Choose the gender', buttons: ['Ok'] }).present();
 return;
  }
              localStorage['email']=this.validation.controls["Email_Id"].value;
                this.navCtrl.setRoot(SchooldetailsPage,{
                  'username':this.username,
                  'password':this.password,
             'Email_Id':this.validation.controls["Email_Id"].value,
            'FirstName':this.validation.controls["FirstName"].value,
            'LastName':this.validation.controls["LastName"].value,
            'PhoneNo':this.validation.controls["PhoneNo"].value,
            'Age':this.validation.controls["Age"].value,
            'student':this.student,
            'gender':this.gender,
            'image':this.image,
            'signup_type':this.signup_type,
            'LicenseStatus':this.LicenseStatus
             })      
}
            
// Upload picture from camera and gallery ..            
      
  uploadpicture(SelectVal)
  {
    
    this.actionSheet = this.actionsheetCtrl.create({
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
    this.actionSheet.present(); 
  

  
  }
  getImageSize(data_url) {
    var head = 'data:image/jpeg;base64,';
    alert("1=="+((data_url.length - head.length) * 3 / 4 / (1024*1024)).toFixed(4))
    alert("2=="+((data_url.length - head.length) * 3 / 4 / (1024)).toFixed(4))
    alert("3=="+((data_url.length - head.length) * 3 / 4 ).toFixed(4))
    return ((data_url.length - head.length) * 3 / 4 / (1024*1024)).toFixed(4);
  }

  gallery() {
    this.camera.getPicture({
      quality: 90,
      destinationType:this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      // encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }).then((imageData) => {
      this.imgtmp= imageData
      //let base64data = 'data:image/jpeg;base64,' + imageData;
      this.file.resolveLocalFilesystemUrl(imageData).then(fileEntry => {
        fileEntry.getMetadata((metadata) => {
               //metadata.size is the size in bytes
            if(metadata.size <= 282600){  
              this.image = imageData; 
              this.uploadpicture(0)
                
                this.actionSheet.dismiss();
                
              //this.eleRef.nativeElement.querySelector('#imgfile').dispatchEvent(new Event('click')); 
            }
            else{ 
              this.toastCtrl.create({ message: `Please upload file less than 300KB. Thanks!!`, duration: 4000, position: 'top' }).present();
            }
        })
    })


      //alert("size=="+this.getImageSize(base64data)); 
      // var imgpath=document.querySelector('#imgfile');
      // var width = imgpath.clientWidth;
      // var height = imgpath.clientHeight;
      //alert(width+"="+height);
      //loading.dismiss() 
      // var imgpath1=document.getElementById('hope');
      //   var img=imgpath1.files[0].size;
      //   var imgsize=img/1024; 
      //   alert(imgsize);


      // var imgsize=<File>event.target.files[0]
      //     alert("imgsize="+imgsize); 


      // const filePath = this.file.dataDirectory; 
      // const fileInfo = {};
  


      // this.file.resolveLocalFilesystemUrl(filePath)
      //   .then((entry: FileEntry) => {
      //     return new Promise((resolve, reject) => {
      //       entry.file(meta => resolve(meta), error => reject(error));
      //     });
      //   })
      //   .then((meta: IFile) => {
      //     alert(meta.size) 
      //   }) 

    //   this.file.listDir(cordova.file.cacheDirectory, "").then((files) => {
    //     alert(JSON.stringify(files)) 
    //     files.forEach((file, index) => {
    //         alert("image name : " + file.name);
    //         alert("image url : " + file.nativeURL);
    //         window.resolveLocalFileSystemURL(file.nativeURL, (fileEntry) => {
    //             fileEntry.getMetadata((metadata) => {
    //                 alert("image size : " + metadata.size);
    //                 alert("image date : " + metadata.modificationTime);
    //             });
    //             // fileEntry.file(function(fileObject){
    //             //     var reader = new FileReader()
    //             //     reader.onloadend = function(evt) {
    //             //         var image = new Image()
    //             //         image.onload = function(evt) {
    //             //       console.log("image resolution: " + this["width"] + " x " + this["height"]);
    //             //             image = null
    //             //         }
    //             //         image.src = evt.target["result"]
    //             //     }
    //             //     reader.readAsDataURL(fileObject)
    //             // }, function(){ console.error("There was an error reading or processing this file.") }) 
    //         }, (error) => { console.error(error); });
    //     });
    // }).catch((error) => { console.error(error) });

  
    }, (err) => {
      this.toastCtrl.create({ message:"Image upload fail, Please try again.", duration: 3000, position: 'top' }).present(); 
    })
  }



  camera1(){
  this.camera.getPicture({
    quality: 100,
    destinationType:this.camera.DestinationType.FILE_URI,
    sourceType:this.camera.PictureSourceType.CAMERA,
    encodingType: this.camera.EncodingType.JPEG,
    targetHeight: 500,
    targetWidth: 500,
    saveToPhotoAlbum: false,
    correctOrientation: true,
    allowEdit: false
  }).then((imageData) => {
    this.image=imageData 
  }, (err) => {
  })
}


public noWhitespaceValidator(control: FormControl) {
  let isWhitespace = (control.value || '').trim().length === 0;
  let isValid = !isWhitespace;
  return isValid ? null : { 'whitespace': true }
}


 //  this.eleRef.nativeElement.querySelector('#imgfile').dispatchEvent(new Event('click')); 
  

}

