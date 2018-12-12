import { Component } from '@angular/core';
import {ToastController, IonicPage, NavController, NavParams,AlertController,LoadingController,ActionSheetController } from 'ionic-angular';
import{DashboardPage}from'../dashboard/dashboard'
import{TermsandconditionsPage}from'../termsandconditions/termsandconditions'
import { NuclearfamilyPage} from '../nuclearfamily/nuclearfamily';
import { empty } from 'rxjs/observable/empty';
import{Observable}from'rxjs/Rx'
import 'rxjs/add/operator/map';
import { File } from '@ionic-native/file'; 
import { Http, RequestOptions,Headers } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'
import {  Response } from '@angular/http'; 
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the ChilddetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-childdetail',
  templateUrl: 'childdetail.html',
})
export class ChilddetailPage { 
  public emailRegEx: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  public nameRegEx: RegExp = /^([A-Za-z]+[]?[ ]?|[A-Za-z]+[']?)+$/;
  addparents:boolean
  sibilings:boolean
  addrelation1:boolean
  addrelation2:boolean
  count=0
  Email_Id
  FirstName
  LastName
  PhoneNo 
  Age 
  student
  gender
  SchoolName
  SchoolAddress
  City
  State
  Country



  StudentDetails


  user_relation=[]
  user_relation1=[]
  Name=null
  Relation=null
  email=null
  email1=null
  Name1=null
  Relation1=null
  email2=null
  Name2=null
  Relation2=null
  Name3=null
  Relation3=null
  signupdata=[]
  username
  password
  image='assets/imgs/linkuspage/me.png';

  signup_type


  testCheckboxOpen: boolean;
  testCheckboxResult;
  datalist
  student_id=null

  count1=1
  count2=1
  addon:boolean
  addon1
  addon2
  value=null
  existalert:boolean
  existalert2

  countmap
  isenabled:boolean=false;

  ResCountry
ResAdd
ResCity
ResState
ResPinCode

relationtmplist=[]
SilblingFirst:boolean=true;
SilblingSecond:boolean=true;
showInputData:boolean=false;
MainName
MainEmail
relationStatus

SilblingFirstLink1:boolean=false;
SilblingFirstLink2:boolean=false;
SilblingSecLink1:boolean=false;
SilblingSecLink2:boolean=false;
ParentLink:boolean=false;

NextBtnDisable:boolean=true;
ShowDataBtn:boolean=false;
SaveBtnDisable:boolean=false;
SibFirstSec:number;

UploadStatusImg
UploadImg1
UploadImg2
UploadImg3

SibFirstStatus:boolean=false;
SibSecondStatus:boolean=false;
ShowNextSaveBtn:boolean=false;
ShowSkipBtn:boolean=true;
LicenseStatus

actionsheet


SiblingFirstBoolean:boolean=false;
ParentBoolean:boolean=false;
SiblingSecondBoolean:boolean=false; 

HostName

  constructor(public http:Http,public toastCtrl:ToastController,public actionsheetCtrl:ActionSheetController,public security:SecurityProvider,public loadingCtrl:LoadingController,public alertCtrl:AlertController,public navCtrl: NavController, public navParams: NavParams,private camera: Camera,private file: File) {

    this.HostName=this.security.Hostname(); 
 
    this.UploadImg1=this.HostName+"/themes/default/assets/img/add-parent.png";
    this.UploadImg2=this.HostName+"/themes/default/assets/img/add-sib.png";
    this.UploadImg3=this.HostName+"/themes/default/assets/img/add-sib.png";

    this.existalert=false
    this.existalert2=false
    this.addon=false
    this.addon1=false
    this.addon2=false
    this.addparents=false
  this.sibilings=false
  this.addrelation1=false
  this.addrelation2=false 
 
// Getting value from previous page  .. 
  this.username=this.navParams.get("username")
  this.password=this.navParams.get("password")

 this.FirstName=this.navParams.get("FirstName")
 this.Email_Id=this.navParams.get("Email_Id")
 this.LastName=this.navParams.get("LastName")
 this.PhoneNo=this.navParams.get("PhoneNo")
 this.Age=this.navParams.get("Age")
    
 this.student=this.navParams.get("student")  
 //this.student='1'  
 this.gender=this.navParams.get("gender")
 this.SchoolName=this.navParams.get("SchoolName")

 this.SchoolAddress=this.navParams.get("SchoolAddress")
 this.City=this.navParams.get("City")
 this.State=this.navParams.get("State")

 this.Country=this.navParams.get("Country")
  
this.image=this.navParams.get('image')
//this.image="assets/imgs/001-social.png";  

if(this.image=="assets/imgs/001-social.png")  { this.image="assets/imgs/user.png"; }

this.signup_type=this.navParams.get('signup_type')
this.StudentDetails=this.navParams.get('StudentDetails')

  this.ResAdd=this.navParams.get("ResAdd")
  this.ResCity=this.navParams.get("ResCity")
  this.ResState=this.navParams.get("ResState")
  this.ResPinCode=this.navParams.get("ResPinCode")
  this.ResCountry=this.navParams.get("ResCountry")
  this.LicenseStatus=this.navParams.get('LicenseStatus')

  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad ChilddetailPage');
  }

 
navigatetodashboard() {
if(this.student==1) {
this.gotoStudentNav();
}
if(this.student==2) {
  this.gotoTeacherNav();
}
}


// Send value to next page ..
  gotoTeacherNav() {
    this.signupdata.push({'FirstName':this.FirstName,
    'Email_Id':this.Email_Id,
  'LastName':this.LastName,
  'PhoneNo':this.PhoneNo,
  'Age':this.Age,
  'student':this.student,
  'gender':this.gender,
  'SchoolName':this.SchoolName,
  'ResAdd':this.ResAdd,
  'ResCity':this.ResCity,
  'ResState':this.ResState,
  'ResPinCode':this.ResPinCode,
  'ResCountry':this.ResCountry,
  'SchoolAddress':this.SchoolAddress,
  'City':this.City,
  'Country':this.Country,
  'StudentDetails':this.StudentDetails,
  'username':this.username,
  'password':this.password,
  'State':this.State,
  'image':this.image,
  'signup_type':this.signup_type,
  'student_id':this.student_id,
  'parent_name':this.MainName
  ,'parent_email':this.MainEmail,
  'parent_relation':this.relationStatus,
  'LicenseStatus':this.LicenseStatus
  })
     
      console.log("this.signupdata teacher ==",this.signupdata)    
    this.navCtrl.setRoot(TermsandconditionsPage,{signupdata:this.signupdata, user_relation:this.user_relation   })
  }


  gotoStudentNav(){
    if(this.StudentDetails== undefined){
      this.presentAlert('Please Enter Student Class');
    }
    else if(this.StudentDetails.trim()== ''){
      this.presentAlert('Please Enter Student Class');
    }
    else if( this.Name == undefined && this.email == undefined && this.Relation== undefined){
      this.presentAlert('Please Enter Parent Details');
    
    }
    
    else if (this.Name == undefined) {
      this.presentAlert("Please Enter Your Name");
    }
    
    else if (this.Name.trim() == '') {
      this.presentAlert("Please Enter Your Name");
    }
    
    else if (!this.nameRegEx.test(this.Name.trim())) {
      this.presentAlert("Please Enter Valid Name");
    }
    
    else if (this.email == undefined) {
    
      this.presentAlert("Please Enter Email");
    }
    else if (this.email.trim() == '') {
    
      this.presentAlert("Please Enter Email");
    }
    else if (!this.emailRegEx.test(this.email.trim())) {
    
      this.presentAlert("Please Enter Valid Email");
    
    }
    
    
    else if(this.Relation== undefined) {
    
      this.presentAlert('Please Enter Relation');
    }
    else if(this.Relation.trim()== '') {
    
      this.presentAlert('Please Enter Relation');
    }
    
    
    else{
      this.navCtrl.setRoot(NuclearfamilyPage,{signupdata:this.signupdata, user_relation:this.user_relation,countmap:this.countmap })
    }
  }


  presentAlert(msg) {  
    let alert = this.alertCtrl.create({
      title: 'Dear User',
      subTitle: msg,
      buttons: [
        {
          text: 'Okay',
          handler: data => {
            console.log('Okay Clicked');
          }
        }
      ]
    });
    alert.present();
  }



  parentsscreen(parentcheck) {
    this.MainName="";
    this.MainEmail="";
    this.relationStatus="";

    this.relationtmplist=[{ name:"Father",value:"1" },{ name:"Mother",value:"2"},{name:"Local Guardian",value:"3"},{ name:"Brother",value:"4" },{ name:"Sister",value:"5"},{name:"Cousin",value:"6"}];
    this.addparents=true;
      this.showInputData=true;
      this.ShowDataBtn=true;
            this.UploadStatusImg=parentcheck
this.SaveBtnDisable=true;
this.NextBtnDisable=false;
this.ShowNextSaveBtn=true;
this.ShowSkipBtn=false;

// this.SiblingFirstBoolean=true;
// this.SiblingSecondBoolean=true; 
console.log("user_relation1 parentsscreen=",this.user_relation1) 
var arrayfilter =  this.user_relation1.filter((elem)=> {  return elem.UploadStatusImg == parentcheck ;    });
if(arrayfilter.length  != 0){
  this.MainName=arrayfilter[0].name
  this.MainEmail=arrayfilter[0].email
  this.relationStatus=arrayfilter[0].relation
}
console.log("arrayfilter parentsscreen=",arrayfilter) 
}

  SilblingFirstBtn(parentcheck) {
    this.MainName="";
    this.MainEmail="";
    this.relationStatus="";

  this.relationtmplist=[{ name:"Brother",value:"1" },{ name:"Sister",value:"2"},{name:"Cousin",value:"3"},{ name:"Father",value:"4" },{ name:"Mother",value:"5"},{name:"Local Guardian",value:"6"}];
  this.SibFirstSec=1;
  this.showInputData=true;
  this.ShowDataBtn=true;

  this.SaveBtnDisable=true;
  this.NextBtnDisable=false; 

  this.UploadStatusImg=parentcheck
  this.ShowNextSaveBtn=true;
this.ShowSkipBtn=false;

// this.ParentBoolean=true;
// this.SiblingSecondBoolean=true; 
console.log("user_relation1 SilblingFirstBtn=",this.user_relation1)  
var arrayfilter =  this.user_relation1.filter((elem)=> {  return elem.UploadStatusImg == parentcheck ;    });
if(arrayfilter.length  != 0){
  this.MainName=arrayfilter[0].name
  this.MainEmail=arrayfilter[0].email
  this.relationStatus=arrayfilter[0].relation
}
console.log("arrayfilter SilblingFirstBtn=",arrayfilter)    
}

  SilblingSecondBtn(parentcheck) { 
    this.MainName="";
    this.MainEmail="";
    this.relationStatus="";
       
    this.relationtmplist=[{ name:"Brother",value:"1" },{ name:"Sister",value:"2"},{name:"Cousin",value:"3"},{ name:"Father",value:"4" },{ name:"Mother",value:"5"},{name:"Local Guardian",value:"6"}];
 this.SibFirstSec=2;
 this.showInputData=true;
 this.ShowDataBtn=true;

  this.SaveBtnDisable=true;
  this.NextBtnDisable=false;

  this.UploadStatusImg=parentcheck
  this.ShowNextSaveBtn=true;
  this.ShowSkipBtn=false;
   
// this.SiblingFirstBoolean=true;
// this.ParentBoolean=true;
console.log("user_relation1 SilblingSecondBtn=",this.user_relation1) 
var arrayfilter =  this.user_relation1.filter((elem)=> {  return elem.UploadStatusImg == parentcheck ;    });
if(arrayfilter.length  != 0){
  this.MainName=arrayfilter[0].name
  this.MainEmail=arrayfilter[0].email
  this.relationStatus=arrayfilter[0].relation
}
console.log("arrayfilter SilblingSecondBtn=",arrayfilter) 
}

// Upload picture from camera and Gallery ...

  uploadpicture()
  {
    this.actionsheet = this.actionsheetCtrl.create({
      title: 'Image Upload!',
      buttons: [{
        text: 'Upload From Gallery',
        handler: () => {
          this.gallery() 
        },
      } ,
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
              if(this.UploadStatusImg ==1 ) { this.UploadImg1=imageData; }
              if(this.UploadStatusImg ==2 ) { this.UploadImg2=imageData; }
              if(this.UploadStatusImg ==3 ) { this.UploadImg3=imageData; } 
              this.uploadpicture()  
              this.actionsheet.dismiss()
              //this.eleRef.nativeElement.querySelector('#imgfile').dispatchEvent(new Event('click')); 
            }
            else{ 
              this.toastCtrl.create({ message: `Please upload file less than 300KB. Thanks!!`, duration: 4000, position: 'top' }).present();
            }
        })
    })

    

    }, (err) => {
      this.toastCtrl.create({ message:"Image upload fail, Please try again.", duration: 3000, position: 'top' }).present(); return;
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
    if(this.UploadStatusImg ==1 ) { this.UploadImg1=imageData; }
    if(this.UploadStatusImg ==2 ) { this.UploadImg2=imageData; }
    if(this.UploadStatusImg ==3 ) { this.UploadImg3=imageData; }
  }, (err) => {
    this.toastCtrl.create({ message:"Image upload fail, Please try again.", duration: 3000, position: 'top' }).present(); 
      return; 
  })
}


  SaveData()
  {
    if(this.MainName==undefined || this.MainName=="" )
    {
      this.toastCtrl.create({ message: `Name is required.`, duration: 3000, position: 'top'}).present();
      return; 
    }
    if(this.MainEmail==undefined || this.MainEmail=="" )
    {
      this.toastCtrl.create({ message: `Email is required.`, duration: 3000, position: 'top'}).present();
      return; 
    }
    if(!this.validateEmail(this.MainEmail)) {
      this.toastCtrl.create({ message: `Email is invalid.`, duration: 3000, position: 'top'}).present();
      return; 
    }

    if(this.relationStatus==undefined || this.relationStatus=="" )
    {
      this.toastCtrl.create({ message: `Relation is required.`, duration: 3000, position: 'top'}).present();
      return; 
    }

if(this.student==1){

  this.UsrEmailCheck();
 }
}



UsrEmailCheck() {
  let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
  let requestOptions=new RequestOptions({headers:headers})
  let param=JSON.stringify({ username:this.value,email:this.MainEmail    }) 
  return  this.http.post(this.HostName+'/validateEmailUsername',param,requestOptions) .subscribe((data)=>{
    console.log(JSON.parse((<any>data)._body).status)
     if(JSON.parse((<any>data)._body).status==0) {
      this.existalert=true; 
      this.toastCtrl.create({ message: `Email Id already exist.`, duration: 3000, position: 'top'}).present();
    } 
     else{ 
      this.existalert=false; 
      this.SaveLocal();
        }   
  },err =>{
    this.toastCtrl.create({ message: `Internal Server error.`, duration: 3000, position: 'top'}).present();
  })
}


SaveLocal() {
  let UserStatusArr=0;

  if(this.user_relation1.length==0){
    if(this.UploadStatusImg==1) {

      this.user_relation1.push({id:"parent",name:this.MainName,relation:this.relationStatus,email:this.MainEmail,image:this.UploadImg1,UploadStatusImg:this.UploadStatusImg})    
      this.NextBtnDisable=true;
    this.SaveBtnDisable=false;

    this.MainName="";
     this.MainEmail="";
     this.relationStatus="";
    this.showInputData=false;

    var ParentUserFilter =  this.user_relation1.filter((elem)=> {  return elem.id == 'parent' ;    })
    if(ParentUserFilter.length==1){   this.ParentLink=true; }

    if(this.SibFirstStatus==true){  this.SilblingFirstLink2=true;   }
    if(this.SibSecondStatus==true){  this.SilblingSecLink2=true;   } 

    // this.SiblingFirstBoolean=false;
    //   this.ParentBoolean=true;
    //     this.SiblingSecondBoolean=false; 
    }
    if(this.UploadStatusImg==2) {
      this.user_relation1.push({id:"sibling",name:this.MainName,relation:this.relationStatus,email:this.MainEmail,image:this.UploadImg2,UploadStatusImg:this.UploadStatusImg})
      this.NextBtnDisable=true;
      this.SaveBtnDisable=false;

      this.MainName="";
      this.MainEmail="";
      this.relationStatus="";
     this.showInputData=false;

     var ParentUserFilter =  this.user_relation1.filter((elem)=> {  return elem.id == 'parent' ;    })
     if(ParentUserFilter.length==1){  this.SilblingFirstLink2=true; this.ParentLink=true; }
     this.SilblingFirstLink1=true;
     this.SibFirstStatus=true;

    //  this.SiblingFirstBoolean=true;
    //   this.ParentBoolean=false;
    //    this.SiblingSecondBoolean=false;   
     
    }
    if(this.UploadStatusImg==3) {  
      this.user_relation1.push({id:"sibling",name:this.MainName,relation:this.relationStatus,email:this.MainEmail,image:this.UploadImg3,UploadStatusImg:this.UploadStatusImg})
      this.NextBtnDisable=true;
      this.SaveBtnDisable=false;

      this.MainName="";
      this.MainEmail="";
      this.relationStatus="";
     var ParentUserFilter =  this.user_relation1.filter((elem)=> {  return elem.id == 'parent' ;    })
     if(ParentUserFilter.length==1){  this.SilblingSecLink2=true; this.ParentLink=true; }
     this.SilblingSecLink1=true;
     this.SibSecondStatus=true;

     this.showInputData=false;
      
    //  this.SiblingFirstBoolean=false;
    //   this.ParentBoolean=false;
    //     this.SiblingSecondBoolean=true; 

    }
}

else{
this.user_relation1.forEach((elem, index)=>{ 
  if(elem.email==this.MainEmail) {   
    UserStatusArr=1;
  }
  else{
      UserStatusArr=2; 
  }
})

if(UserStatusArr==1) {
  this.toastCtrl.create({ message: `Email Id already exist.`, duration: 3000, position: 'top'}).present();
  UserStatusArr=0; 
  return; 
}

if(UserStatusArr==2) {

   console.log("before user_relation1=",this.user_relation1)
for(let i=0; i<this.user_relation1.length;i++){
  if(this.user_relation1[i].UploadStatusImg == this.UploadStatusImg){
      this.user_relation1.splice(i, 1);       
  }
}   
      
console.log("after user_relation1=",this.user_relation1)
if(this.UploadStatusImg==1) {

this.user_relation1.push({id:"parent",name:this.MainName,relation:this.relationStatus,email:this.MainEmail,image:this.UploadImg3,UploadStatusImg:this.UploadStatusImg})


this.NextBtnDisable=true;
this.SaveBtnDisable=false;

this.MainName="";
this.MainEmail="";
this.relationStatus="";
this.showInputData=false;

var ParentUserFilter =  this.user_relation1.filter((elem)=> {  return elem.id == 'parent' ;    })
if(ParentUserFilter.length==1){   this.ParentLink=true; }
if(this.SibFirstStatus==true){  this.SilblingFirstLink2=true;   }
if(this.SibSecondStatus==true){  this.SilblingSecLink2=true;   }
}

if(this.UploadStatusImg==2) {
this.user_relation1.push({id:"sibling",name:this.MainName,relation:this.relationStatus,email:this.MainEmail,image:this.UploadImg3,UploadStatusImg:this.UploadStatusImg})
this.NextBtnDisable=true;
this.SaveBtnDisable=false;

this.MainName="";
this.MainEmail="";
this.relationStatus="";
this.showInputData=false;

var ParentUserFilter =  this.user_relation1.filter((elem)=> {  return elem.id == 'parent' ;    })
     if(ParentUserFilter.length==1){  this.SilblingFirstLink2=true; this.ParentLink=true; }
     this.SilblingFirstLink1=true;
     this.SibFirstStatus=true;
}
  if(this.UploadStatusImg==3) { 
    this.user_relation1.push({id:"sibling",name:this.MainName,relation:this.relationStatus,email:this.MainEmail,image:this.UploadImg3,UploadStatusImg:this.UploadStatusImg})
    this.NextBtnDisable=true;
    this.SaveBtnDisable=false;

    this.MainName="";
    this.MainEmail="";
    this.relationStatus="";
   this.showInputData=false;

   var ParentUserFilter =  this.user_relation1.filter((elem)=> {  return elem.id == 'parent' ;    })
   if(ParentUserFilter.length==1){  this.SilblingSecLink2=true; this.ParentLink=true; }
   this.SilblingSecLink1=true;
   this.SibSecondStatus=true;

   this.showInputData=false;
  }

  UserStatusArr=0; 
  console.log("this.user_relation1==",this.user_relation1);   
  return;
}


}  
}



  
  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  


  GoToNext() 
  {
  this.signupdata.push({'FirstName':this.FirstName,
  'Email_Id':this.Email_Id,
'LastName':this.LastName,
'PhoneNo':this.PhoneNo,
'Age':this.Age,
'student':this.student,
'gender':this.gender,
'SchoolName':this.SchoolName,
'ResAdd':this.ResAdd,
'ResCity':this.ResCity,
'ResState':this.ResState,
'ResPinCode':this.ResPinCode,
'ResCountry':this.ResCountry,
'SchoolAddress':this.SchoolAddress,
'City':this.City,
'Country':this.Country,
'StudentDetails':this.StudentDetails,
'username':this.username,
'password':this.password,
'State':this.State,
'image':this.image,
'signup_type':this.signup_type,
'student_id':this.student_id,
'parent_name':this.MainName
,'parent_email':this.MainEmail,
'parent_relation':this.relationStatus,
'LicenseStatus':this.LicenseStatus
})

    console.log("this.user_relation new ==",this.user_relation)
 this.navCtrl.setRoot(TermsandconditionsPage,{signupdata:this.signupdata, user_relation:this.user_relation1,parentpic:"" })
  }

  addsibilings(countvalsib){
    if(this.Name==null || this.Relation==null || this.email==null)
    {
      this.sibilings=false; 
      this.toastCtrl.create({
        message: `You have to add first parent data.`,
        duration: 3000,
        position: 'top'
      }).present();
      return; 
    }

    if(countvalsib!=2)
{
  this.count2++
  if(this.count2%2!=1)
  {
this.sibilings=true
this.addon1=true
  }
  else{
    this.sibilings=false
    this.addon1=false
  }
}
else{
  this.toastCtrl.create({
    message: `You can not add more sibiling`,
    duration: 3000,
    position: 'top'
  }).present();
  return;
}
}




  addsiblingscount(countvalsib)
  {
 
    if(countvalsib!=1)
    {  
 this.count++
 if(this.count%2!=0)
 {
this.addrelation1=true
this.addon2=true
 }
 
else{
  this.addrelation1=false
  this.addon2=false
}
    }
    else{
      this.toastCtrl.create({
        message: `You can not add more sibiling`,
        duration: 3000,
        position: 'top'
      }).present();
      return;
    }
  }



  UsrEmailCheck2(value)
  {
    console.log('hi'+value)
    let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
  let requestOptions=new RequestOptions({headers:headers})
  let param=JSON.stringify({
    username:this.value,
   email:value
  })
   this.http.post(this.HostName+'/validateEmailUsername',param,requestOptions)
    .subscribe((data)=>{
      console.log(JSON.parse((<any>data)._body).status)
       if(JSON.parse((<any>data)._body).status==0)
       {
      this.existalert2=true
       } 
       else{
        this.existalert2=false
       }   
    })
  }




  seestudentlist()
  {
    let loading=this.loadingCtrl.create({
      content:'Please Wait..'
    })
    Observable.of(loading=>loading.present(this.StudentDetails))
    .flatMap(()=>this.security.studentlist(this.StudentDetails,this.SchoolName))
    .subscribe(data=>{
      loading.dismiss()
      console.log("data.contents ==",data.contents)
this.datalist=data.contents


      this.openMenu()
    }) 
  }
 
  openMenu() {
   let alert = this.alertCtrl.create();
    alert.setTitle('Choose the number of Students');

 for(var i=0;i<this.datalist.length;i++)
 {
 
    alert.addInput({
      type: 'checkbox',
      label: this.datalist[i].username,
      value: this.datalist[i].id,
      checked: false
    });
  
   }
      alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        console.log('Checkbox data:', data);
        this.testCheckboxOpen = false;
        this.student_id = data;
        
        
      }
    });
    alert.present().then(() => {
      this.testCheckboxOpen = false;
    });
  }


 ParentEmailCheck()
{
  this.signupdata=[];
  let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
  let requestOptions=new RequestOptions({headers:headers})
  let param=JSON.stringify({
    parent_email:this.email
  })
  this.http.post(this.HostName+'/admin/userapi/checkParentemail ',param,requestOptions)
  .subscribe((data)=>{
    //console.log(data)
      console.log("Status==",JSON.parse((<any>data)._body).status)
      console.log("count==",JSON.parse((<any>data)._body).count)
     if(JSON.parse((<any>data)._body).status==0)
     {
      let toast = this.toastCtrl.create({
        message: JSON.parse((<any>data)._body).message,
        duration: 3000,
        position: 'top'
      });
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
      toast.present();
     } 
     else{
      this.countmap=JSON.parse((<any>data)._body).count




console.log(  this.signupdata)
this.MainName="";
this.MainEmail="";
this.relationStatus="";
this.showInputData=false;
this.SaveBtnDisable=false;
this.NextBtnDisable=true;
      if(this.countmap==0){
        this.SilblingSecond=true;
        this.SilblingFirst=true;
        return;
      }
      if(this.countmap==1){
        this.SilblingSecond=false;
        this.SilblingFirst=true;
        return;
      }
      if(this.countmap==2){
        this.SilblingSecond=false;
        this.SilblingFirst=false;
        this.toastCtrl.create({ message: `You can not add more sibiling`, duration: 3000, position: 'top' }).present();
        return;
      }
      
      //this.countmap=1
     }  
  },err=>
  {
    this.toastCtrl.create({ message: `No internet connection.`,  duration: 3000, position: 'top'  }).present();
    return; 
  }
)
}




  
}
