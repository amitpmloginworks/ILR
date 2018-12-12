import { Component } from '@angular/core';
import { IonicPage, Platform,NavController,NavParams,LoadingController, MenuController, ToastController, ModalController, ViewController, ActionSheetController ,AlertController, PopoverController, App  } from 'ionic-angular';
import{SecurityProvider}from'../../providers/security/security';
import{Observable}from'rxjs/Rx';
import{bigdata}from'../../app/models'; 
import { Events } from 'ionic-angular';
import * as moment from 'moment';    
import{TeacherprofilepmodelPage}from'../teacherprofilepmodel/teacherprofilepmodel';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import{TeacherrenewPage}from'../teacherrenew/teacherrenew';
import{MyprofileupPage}from'../myprofileup/myprofileup'
import{TeacherprofilemPage}from'../teacherprofilem/teacherprofilem';
import{TeachersuggestionPage}from'../teachersuggestion/teachersuggestion';
import{ProfileaddfamilyPage}from'../profileaddfamily/profileaddfamily';
import{ProfileshowfamilyPage}from'../profileshowfamily/profileshowfamily';
import{SubscribeNowPage}from'../subscribe-now/subscribe-now'
import{RefferalPage}from'../refferal/refferal'
import{AppState}from'../../app/app.global'
import{NotificationsPage}from'../notifications/notifications'
import{HeaderbarComponent}from'../../components/headerbar/headerbar'

/**
 * Generated class for the TeacherprofilepPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teacherprofilep',
  templateUrl: 'teacherprofilep.html',
})
export class TeacherprofilepPage {
  imageval
  userdata

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
    magazineImg=[]
    sendGiftsData
    imageProfile
    IsSibling:number=0
    ProfileType
    EarnPoint:any=""
    borderColor;
    count:number=0;
    PreIndex
    vtopMargin

    StdOnOff
    getfamilylist 
 
    ChildDetail:boolean=false
    ChildDetailBtn:boolean=false
    roleType
    product=[];
    MagazineId=[];  
    SubscribeDates=[];

    flag1
    flag2
    flag3
    flag4
    theme

    TeacherClass 
    TeacherClass1
    TeacherClass2
    TeacherClass3
    ActiveSubstd
    TeacherClassList 
    
    HostName
  constructor(public platform:Platform,public global:AppState,public toastCtrl:ToastController,public bdata:bigdata,public loadingCtrl:LoadingController,public security:SecurityProvider,public navCtrl: NavController, public navParams: NavParams,public events: Events, public menuCtrl: MenuController, public modalCtrl: ModalController,public viewCtrl: ViewController,public filetransfer: FileTransfer,public actionsheetCtrl:ActionSheetController,private camera: Camera,private alertCtrl: AlertController,public popoverCtrl: PopoverController, public appCtrl: App,private file: File) {
    this.global.set('theme', localStorage['currenttheme']);

    this.HostName=this.security.Hostname();  

    // Register for android's system back button
let backAction = platform.registerBackButtonAction(() => { 
  let alert=this.alertCtrl.create({  
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

    this.flag1=true
    this.flag2=false
    this.flag3=false
    this.flag4=false 

    this.userdata=this.bdata.userdata 
    this.roleType=this.bdata.userdata.role 
    this.imageval=this.bdata.userdata.user_image;  
    console.log(this.bdata.userdata.role) 
          this.MagazineId=this.bdata.UserMagazineId
    for(var i=0;i<this.MagazineId.length;i++)   { 
      this.product.push({  magazine_id:this.MagazineId[i].magazineID  }) 
     }

    if(this.roleType==2){  this.ProfileType="Teacher";
    let loading=this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
      cssClass: 'transparent'
    })
    Observable.of(loading).flatMap(loading=>loading.present())
          .flatMap(() => this.security.ClassList())
         .subscribe(data=>{
           loading.dismiss()
          console.log("teacher class==",data);
          this.TeacherClassList=data.class_list;  
         },err=>{ loading.dismiss();})
  } 

  if(this.roleType==1){  this.ProfileType="Student"; } 

    localStorage["country"]=this.bdata.userdata.school_country;

          this.events.publish('user:created', this.imageval, Date.now());
          this.events.publish('usern:usrname', this.bdata.userdata.username, Date.now());
          this.events.publish('usere:email', this.bdata.userdata.email, Date.now());
          this.ViewEmail=0

          this.events.subscribe('user:created', (user, time) => { 
            if(user=="assets/imgs/user.png"){  this.imageval="assets/imgs/user.png";    return;}
            if(user!="assets/imgs/user.png"){  this.imageval=user;     return;}
                 }); 
    
          this.activeSubscription()
          this.events.subscribe('teachearn:earnpoint', (user, time) => {  this.EarnPoint=user;     });  
          if(this.userdata.user_image=="assets/imgs/001-social.png"){  this.imageProfile="assets/imgs/man-user.png";  return;}
          if(this.userdata.user_image!="assets/imgs/001-social.png"){ this.imageProfile=this.userdata.user_image;   return; }
  }
 

   

  ionViewWillEnter(){  
    this.menuCtrl.swipeEnable(false,'menu2');
  }
  NotificationBtn() {   this.popoverCtrl.create(NotificationsPage).present();    }

 
  selectedType(index){
    this.borderColor=document.getElementById('y_'+index).style.border;
    if(this.borderColor =="none"){
      this.count=this.count+1
       this.borderColor=document.getElementById('y_'+index).style.border="3px solid black";
    }
    else if(this.borderColor=="3px solid black"){
      this.count=this.count-1
      this.borderColor=document.getElementById('y_'+index).style.border="";
      this.subscribeExpiry= "";
             
    }
    else if(this.borderColor=="" || this.borderColor == "3px solid black"){
      this.count=this.count+1;
      if(this.count%2==0){
          this.borderColor = document.getElementById('y_'+this.PreIndex).style.border="";
            this.PreIndex=index
              this.borderColor = document.getElementById('y_'+index).style.border="3px solid black";
              this.subscribeExpiry= this.magazineImg[index].expiry_date;
                return;
     }
   else{
    if(index !=0) {
      this.borderColor = document.getElementById('y_'+this.PreIndex).style.border="";
    }
     this.PreIndex=index
      this.borderColor = document.getElementById('y_'+index).style.border="3px solid black";
      this.subscribeExpiry= this.magazineImg[index].expiry_date;
        return;
   }
}
}

  
  activeSubscription() {
    let loading=this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
      cssClass: 'transparent'
    })
    Observable.of(loading).flatMap(loading=>loading.present())
          .flatMap(() => this.security.activeSubscription())
         .subscribe(data=>{
           loading.dismiss()
          console.log("teacher profile==",data);
          this.activesub=data.ActiveSubscription;
          this.stdcomLen=data.ActiveSubscription.studentComment;
          this.sendGiftsData=data.ActiveSubscription.giftsData
          this.subscribeStatus=data.status 
          this.events.publish('teachearn:earnpoint', data.ActiveSubscription.totalPoints, Date.now());
          this.events.publish('subuser:substatus', data.status, Date.now());
          this.ProfileType=data.ActiveSubscription.profile
          this.bdata.GetfamilyProfile =data.ActiveSubscription.getFamilyDetail
          this.getfamilylist=this.bdata.GetfamilyProfile 
          this.SubscribeDates=data.ActiveSubscription.subscribeDate
              console.log("len==",data.ActiveSubscription.getFamilyDetail)  
          if(data.ActiveSubscription.subscribeDate.length==0)
          { 
            this.navCtrl.push(SubscribeNowPage,{product:this.product,NewUser:1,LicenseUser:"no"})
            return;
          }   
          this.bdata.GetActiveMagaine=data.ActiveSubscription.subscribeDate  
          if( data.ActiveSubscription.getFamilyDetail != undefined) {  
          if(data.ActiveSubscription.getFamilyDetail.length==0){
            this.ChildDetail=false;
            this.ChildDetailBtn=true;
          } 
          if(data.ActiveSubscription.getFamilyDetail.length>0 && data.ActiveSubscription.getFamilyDetail.length<3){
            this.ChildDetail=true;
              this.ChildDetailBtn=true;
          }
          if(this.bdata.GetfamilyProfile.length==3){
            this.ChildDetail=true;
            this.ChildDetailBtn=false;
          }
        }

        if(data.ActiveSubscription.profile=="student"){
          let SubExpSplit=data.ActiveSubscription.subscribeDate[0].expiry_date
          this.subscribeExpiry=moment(SubExpSplit).format('DD MMM YYYY');
          let usrImage=data.ActiveSubscription.subscribeDate[0].image;
          this.events.publish('userexp:expdate', this.subscribeExpiry, Date.now());
           this.events.publish('userimg:expimage',usrImage, Date.now());
           this.borderColor="3px solid black";
          for(let i=0;i<data.ActiveSubscription.subscribeDate.length;i++) {
            let SubExpSplit=data.ActiveSubscription.subscribeDate[i].expiry_date;
            let SubDatesExp=moment(SubExpSplit).format('DD MMM YYYY');
            this.subscribeExpiry=SubDatesExp;
         this.magazineImg.push({"expiry_date":SubDatesExp,"id":data.ActiveSubscription.subscribeDate[i].id,"image":data.ActiveSubscription.subscribeDate[i].image  })
          }
          return;
        }
 
      if(data.ActiveSubscription.profile=="teacher") {
        if(data.ActiveSubscription.subscribeDate.length !=0) {
         let SubExpSplit=data.ActiveSubscription.subscribeDate[0].expiry_date
         this.subscribeExpiry=moment(SubExpSplit).format('DD MMM YYYY');
         this.events.publish('userexp:expdate', this.subscribeExpiry, Date.now());
         let usrImage=data.ActiveSubscription.subscribeDate[0].magazine_image;
           this.events.publish('userimg:expimage',usrImage, Date.now()); 
           this.StdOnOff=data.ActiveSubscription.studentStatus;
          for(let i=0;i<data.ActiveSubscription.subscribeDate.length;i++) {
            let SubExpSplit=data.ActiveSubscription.subscribeDate[i].expiry_date;
            let SubDatesExp=moment(SubExpSplit).format('DD MMM YYYY');
            this.subscribeExpiry=SubDatesExp;
            this.magazineImg= data.ActiveSubscription.subscribeDate; 
            this.magazineImg.push({"expiry_date":SubDatesExp,"id":data.ActiveSubscription.subscribeDate[i].id,"image":data.ActiveSubscription.subscribeDate[i].magazine_image  })
          }
        }
        return;
      } 
      if(data.ActiveSubscription.is_sibling !=undefined) {
        if(data.ActiveSubscription.is_sibling=="FALSE")  { this.IsSibling=0;  return; }
        if(data.ActiveSubscription.is_sibling=="True") {  this.IsSibling=1;  return;   }
        if(data.ActiveSubscription.is_sibling=="TRUE") {  this.IsSibling=1;  return;   }
        
      }
         },err=>{ loading.dismiss();})
  }



  ShowFamilyBtn(index) {    
    console.log("this.bdata.GetfamilyProfile==",this.bdata.GetfamilyProfile)
    let arrtemfamily=[];
    for(let i=0;i<this.bdata.GetfamilyProfile.length;i++)
    {
      if(i==index)
      {
        arrtemfamily.push({first_name:this.bdata.GetfamilyProfile[i].first_name,email:this.bdata.GetfamilyProfile[i].email,last_name:this.bdata.GetfamilyProfile[i].last_name
          ,username:this.bdata.GetfamilyProfile[i].username
          ,user_image:this.bdata.GetfamilyProfile[i].user_image
          ,student_class:this.bdata.GetfamilyProfile[i].student_class
          ,shipping_address:this.bdata.GetfamilyProfile[i].shipping_address
          ,shipping_city:this.bdata.GetfamilyProfile[i].shipping_city
          ,shipping_country:this.bdata.GetfamilyProfile[i].shipping_country
          ,shipping_pincode:this.bdata.GetfamilyProfile[i].shipping_pincode
          ,shipping_state:this.bdata.GetfamilyProfile[i].shipping_state
        })
      }
    }
    let modalTips = this.modalCtrl.create(ProfileshowfamilyPage,{arrtemfamily:arrtemfamily});
    modalTips.onDidDismiss(data => {   });  modalTips.present(); 
  }

  AddFamilyBtn()
  {      
    let modalTips = this.modalCtrl.create(ProfileaddfamilyPage); 
    modalTips.onDidDismiss(data => {   
      this.getfamilylist=this.bdata.GetfamilyProfile;
      console.log("this.bdata.GetfamilyProfile dismiss==",this.bdata.GetfamilyProfile)
      if(this.bdata.GetfamilyProfile.length>0 && this.bdata.GetfamilyProfile.length<3){
        this.ChildDetail=true;
        this.ChildDetailBtn=true;
      } 
      if(this.bdata.GetfamilyProfile.length==3){
        this.ChildDetail=true;
        this.ChildDetailBtn=false;
      }
    });  modalTips.present(); 
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

  // CheckmarkPhone() { 
  //   let loading=this.loadingCtrl.create({
  //     spinner: 'hide',
  //     content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
  //     cssClass: 'transparent'
  //   })


  //   Observable.of(loading).flatMap(loading=>loading.present())
  //         .flatMap(() => this.security.updateProfile(this.userdata.email,this.TxtPhone,this.userdata.shipping_address,this.userdata.shipping_city,this.userdata.shipping_state,this.userdata.shipping_country,this.userdata.user_image,this.bdata.userdata.shipping_pincode))
  //        .subscribe(data=>{
  //          loading.dismiss()
  //          this.bdata.userdata=data.getData;
  //          this.TxtPhone=data.getData.phone;
  //          this.ViewPhone=0;
  //          this.hidePhone=false;
  //          this.toastCtrl.create({ message: data.message, duration: 3000, position: 'top' }).present();
         
  //        })
  // }
 
  editAdd() { 
 let modalTips = this.modalCtrl.create(MyprofileupPage,{profileType:"teacher"});
 modalTips.onDidDismiss(data => {   this.userdata=this.bdata.userdata;    });  modalTips.present(); 
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
 
  InviteFriends()
  {
    this.navCtrl.push(RefferalPage)
  }
  
  stdlistClick()
  {
    
this.countstdlist++
   
if(this.countstdlist%2!=1)
{
  this.stdnamelist=true;
  this.itemsstdname=this.activesub.allStudent;
  let stdlen=this.activesub.allStudent.length;
  this.vtopMargin=stdlen*2*21+21;
  document.getElementById('stdcomment').style.marginTop="147px"
}
else{
 this.stdnamelist=false
 document.getElementById('stdcomment').style.marginTop="21px"
}
  }

  stdCommentbtn()
  {
    if(this.stdcomLen.length==0)
    {
      this.toastCtrl.create({ message: `No data found`, duration: 3000, position: 'top' }).present(); 
      return;
    }
    
  }

  close() { this.viewCtrl.dismiss();  }

StdOnlieOffline() 
{
  this.modalCtrl.create(TeacherprofilemPage,{StdOnOff:this.StdOnOff}).present();
}

SuggestionClick() 
{  
  this.modalCtrl.create(TeachersuggestionPage).present();
}
  


  itemSelected()  {  
    this.navCtrl.push(TeacherprofilepmodelPage,{sendGiftsData:this.sendGiftsData,EarnPoint:this.EarnPoint}) 
  
  }

  subcribenew()
  {    
   this.navCtrl.push(TeacherrenewPage,{SubscribeDates:this.SubscribeDates})
  }
  
  
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
            this.ProfileImageUp(imageData)   
            //this.eleRef.nativeElement.querySelector('#imgfile').dispatchEvent(new Event('click')); 
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
  //mediaType: this.camera.MediaType.PICTURE,
  encodingType: this.camera.EncodingType.JPEG,
  targetHeight: 500,
  targetWidth: 500,
  saveToPhotoAlbum: false,
  correctOrientation: true
}).then((imageData) => {
  this.ProfileImageUp(imageData)
  
}, (err) => {
  this.toastCtrl.create({ message:"Image upload fail, Please try again.", duration: 3000, position: 'top' }).present(); 
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
     
       filetransfers.upload(ImgesP,this.HostName+'/admin/userapi/imageUpload', options)
         .then((data) => {
         let imgProfile= JSON.parse(data.response).image
        this.imageval=imgProfile
        this.bdata.userdata.user_image=this.imageval; 
        //this.appCtrl.getRootNav().setRoot(HeaderbarComponent);   
        this.navCtrl.setRoot(this.navCtrl.getActive().component); 
          this.events.publish('user:created', this.imageval, Date.now());
         }, (err) => {
          this.toastCtrl.create({ message:"No internet connection, Please try again.", duration: 3000, position: 'top' }).present(); 
         })
}


ionViewDidLoad() {
  console.log('ionViewDidLoad TeacherprofilepPage');
  if(localStorage['theme']==2)
  {
    this.flag1=false
          this.flag2=true
          this.flag3=false
          this.flag4=false   
  }

 else if(localStorage['theme']==3)
 {
  this.flag1=false
          this.flag2=false
          this.flag3=true
          this.flag4=false 
}
 else if(localStorage['theme']==1)
 {
  this.flag1=true
  this.flag2=false
  this.flag3=false
  this.flag4=false 
}
 else if(localStorage['theme']==4)
 {
  this.flag1=false
          this.flag2=false
          this.flag3=false
          this.flag4=true 
}


}
themechange()
  {
    let prompt = this.alertCtrl.create({
      title: 'Choose Theme',
      message: 'Select option',
      inputs : [
      {
          type:'radio',
          label:'Blue',
          value:'theme-blue'
      },
      {
          type:'radio',
          label:'Grey',
          value:'theme-grey'
      },
      {
        type:'radio',
        label:'Red',
        value:'theme-red'
      }
        ,
    {
      type:'radio',
      label:'Yellow',
      value:'theme-yellow'
  }],
      buttons : [
      {
          text: "Cancel",
          handler: data => {
          console.log("cancel clicked");
          }
      },
      {
          text: "Ok",
          handler: data => {
          console.log("search clicked");
          }
      }]});
      prompt.present();
  }

  
  changeTheme(){
   var theme=this.theme
         localStorage['currenttheme']=theme
        this.global.set('theme', theme);   
            if(theme=='theme-blue')
            {
             localStorage['theme']=4
            this.flag1=false
            this.flag2=true
            this.flag3=false
            this.flag4=false   
            }

           else if(theme=='theme-red')
           {
            localStorage['theme']=3
            this.flag1=false
            this.flag2=false
            this.flag3=true
            this.flag4=false 
          }
           else if(theme=='theme-grey')
           {
            localStorage['theme']=1
            this.flag1=true
            this.flag2=false
            this.flag3=false
            this.flag4=false 
          }
           else if(theme=='theme-yellow')
           {
            localStorage['theme']=2
            this.flag1=false
            this.flag2=false
            this.flag3=false
            this.flag4=true 
          }
      }

      TeacherClasschange(ev){
          
        this.TeacherClass1=[];
        this.TeacherClass2=[]; 
        this.TeacherClass3=[];        
        let classIDteacher=ev;
        console.log("classIDteacher==",classIDteacher)
        let loading=this.loadingCtrl.create({
          spinner: 'hide',
          content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
          cssClass: 'transparent'
        })      
        Observable.of(loading).flatMap(loading=>loading.present())
              .flatMap(() => this.security.ClassBYStudent(classIDteacher))
             .subscribe(data=>{
               loading.dismiss()
               this.ActiveSubstd=[]; 
              console.log("teacher class==",data);

if(data.student_list.length == 0){ 
  this.toastCtrl.create({ message:"No record found.", duration: 3000, position: 'top' }).present();  return;  
}
else{


              this.TeacherClass=data.student_list
                  console.log("TeacherClass== ",this.TeacherClass)
                  for(let z=0;z<this.TeacherClass.length;z++){
                   
                      if(z<20){
                        console.log("z==",z) 
                        this.TeacherClass1.push({ student_class:this.TeacherClass[z].student_class, student_name:this.TeacherClass[z].student_name,student_id:this.TeacherClass[z].student_id }) 
                      }
                        
                      if(z>19 && z<40){          
                        console.log("z==",z)   
                        this.TeacherClass2.push({ student_class:this.TeacherClass[z].student_class, student_name:this.TeacherClass[z].student_name,student_id:this.TeacherClass[z].student_id })  
                      }  

                      if(z>39 && z<50){          
                        console.log("z==",z)     
                       this.TeacherClass3.push({ student_class:this.TeacherClass[z].student_class, student_name:this.TeacherClass[z].student_name,student_id:this.TeacherClass[z].student_id })  
                      }  
                      
                      

                    } 
  
                    console.log("TeacherClass1== ",this.TeacherClass1)  
                    console.log("TeacherClass2== ",this.TeacherClass2)
                    console.log("TeacherClass3== ",this.TeacherClass3)
                  }

             },err=>{ loading.dismiss();})
      }  
  
  
      slideChanged(){
     //  alert("changed") 
      }

     
      
}
