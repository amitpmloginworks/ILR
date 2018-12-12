import { Component,NgZone } from '@angular/core';
import { IonicPage,MenuController,Platform,  NavController, NavParams,LoadingController,AlertController, ToastController, Events } from 'ionic-angular';
import{DashboardPage}from'../dashboard/dashboard'
import{SecurityProvider}from'../../providers/security/security'
import{Observable}from'rxjs/Rx'
import{ImagazinespagePage}from'../imagazinespage/imagazinespage'
import{ bigdata}from'../../app/models'
import { HttpClient } from '@angular/common/http';
import{TrialPeriodPage}from'../trial-period/trial-period'
import{RightnavigationmenuscreenPage}from'../rightnavigationmenuscreen/rightnavigationmenuscreen'

import{MyprofileupPage}from'../myprofileup/myprofileup'
import{TeacherprofilepPage}from'../teacherprofilep/teacherprofilep'
import { Storage } from '@ionic/storage';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import{EnterdetailscreenPage}from'../enterdetailscreen/enterdetailscreen';
import{SubscribeNowPage}from'../subscribe-now/subscribe-now'     


/**
 * Generated class for the UserloginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-userlogin',
  templateUrl: 'userlogin.html',
})
export class UserloginPage {
  username
  password
  userdata
  product=[]
  user_magazine

  private captchaPassed: boolean = false;
    private captchaResponse: string;

    userData: any; 
    signup_type=2  

    TeacherClass=[]; 
    pagenumbernext:boolean=false;
    pagenumberPre:number=1;
    TeacherClassTemp:any=[];
    TeacherClassTemps:any=[];
  constructor(public platform:Platform,public menuCtrl:MenuController,private http: HttpClient, private zone: NgZone,public bdata:bigdata,private alertCtrl: AlertController,public security:SecurityProvider,public navCtrl: NavController, public navParams: NavParams,public  loadingCtrl:LoadingController, public str:Storage, public toastCtrl:ToastController,private googlePlus: GooglePlus,private facebook: Facebook,public events: Events) {

    
    this.TeacherClass=[ 
      { student_class:"12", student_name:"12" },
      { student_class:"13", student_name:"13" },
      { student_class:"12", student_name:"12" },
      { student_class:"12", student_name:"12" },
      { student_class:"12", student_name:"12" },
 
      { student_class:"12", student_name:"12" },
      { student_class:"12", student_name:"12" },
      { student_class:"12", student_name:"12" },
      { student_class:"12", student_name:"12" },
      { student_class:"12", student_name:"12" },

    ] 
 

// Register for android's system back button
let backAction = platform.registerBackButtonAction(() => {
  this.navCtrl.pop();
 
  },)
  }
     

  btnclicks(){
    this.TeacherClassTemp=[];
    this.TeacherClassTemps=[]; 
    console.log("TeacherClass== ",this.TeacherClass)
    for(let z=0;z<this.TeacherClass.length;z++){
     
        if(z<5){
          console.log("z==",z) 
          this.TeacherClassTemp.push({ student_class:this.TeacherClass[z].student_class, student_name:this.TeacherClass[z].student_name }) 
          this.pagenumberPre=z+1 
        }
          
        if(z>4 && z<10){          
          console.log("z==",z)   
          this.TeacherClassTemps.push({ student_class:this.TeacherClass[z].student_class, student_name:this.TeacherClass[z].student_name })  
        }         
      }   
      console.log("TeacherClassTemp 1== ",this.TeacherClassTemp)    
      console.log("TeacherClassTemps 1== ",this.TeacherClassTemps)  
     
    }
   
 

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserloginPage');
  }
  ionViewWillEnter () {
    this.menuCtrl.swipeEnable( false, 'menu2' );
    }
  navigateToLogin(){ 

    if(this.username=="" || this.username==undefined)
    {
      this.toastCtrl.create({ message: `Username is required.`,duration: 4000, position: 'top' }).present();
      return; 
    }
    if(this.password=="" || this.password==undefined)
    {
      this.toastCtrl.create({ message: `Password is required.`,duration: 4000, position: 'top' }).present();
      return; 
    }
 // calling login api ...
       let loading=this.loadingCtrl.create({ 
        spinner: 'hide',
        content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
        cssClass: 'transparent'

        }) 
   Observable.of(loading).flatMap(loading=>loading.present())
         .flatMap(() => this.security.login(this.username,this.password))
        .subscribe(data=>{  
          loading.dismiss()
        if(data.status==0)
        {
   
          let alert = this.alertCtrl.create({
            title: data.message,  
            buttons: ['Dismiss']
          });
          alert.present();


        }
        else{
              let LicensedUserStatus=0;
       this.bdata.userdata=data.user
       this.user_magazine=data.user_magazine
       this.bdata.UserMagazineId=data.user_magazine 
       this.bdata.UsrTextType=data.user_text_type
       this.bdata.ContentNature=data.content_nature

localStorage['usrrole']=data.user.role  
this.events.publish('userrole:usrrole', data.user.role, Date.now());

localStorage['USERID']=data.user.id
localStorage['email']=data.user.email
localStorage['token']=data.token

localStorage['UsrnameLog']=this.username
localStorage['UsrpassLog']=this.password

this.str.set('UsrnameLog',this.username)
this.str.set('UsrpassLog',this.password)
this.str.set('USERID',data.user.id)
this.str.set('token',data.token)

           for(var i=0;i<this.user_magazine.length;i++)   { 
             this.product.push({  magazine_id:this.user_magazine[i].magazine_id  }) 
            }



            if(data.is_licensed_user=="yes")
            {
                    if(data.user.email=="")      {       LicensedUserStatus=1;       }
                    if(data.user.first_name=="")      {       LicensedUserStatus=1;       }
                    if(data.user.last_name=="")      {       LicensedUserStatus=1;       }
                    if(data.user.phone=="")      {       LicensedUserStatus=1;       }
                    if(data.user.role=="")      {       LicensedUserStatus=1;       }
                    if(data.user.school_address=="")      {       LicensedUserStatus=1;       }
                    if(data.user.school_city=="")      {       LicensedUserStatus=1;       }
                    if(data.user.school_country=="")      {       LicensedUserStatus=1;       }
                    if(data.user.school_name=="")      {       LicensedUserStatus=1;       }
                    if(data.user.school_state=="")      {       LicensedUserStatus=1;       }
                    if(data.user.shipping_address=="" || data.user.shipping_address==null)      {       LicensedUserStatus=1;       } 
                    if(data.user.shipping_city=="")      {       LicensedUserStatus=1;       }
                    if(data.user.shipping_country=="")      {       LicensedUserStatus=1;       }
                    if(data.user.shipping_pincode=="")      {       LicensedUserStatus=1;       }
                    if(data.user.student_class=="")      {       LicensedUserStatus=1;       }
                    if(data.user.shipping_state=="")      {       LicensedUserStatus=1;       }
                    if(data.user.student_class=="")      {       LicensedUserStatus=1;       }
                    if(data.user.terms_checked=="")      {       LicensedUserStatus=1;       }
                    if(data.user.user_image=="")      {       LicensedUserStatus=1;       }
            }


            if(data.user.is_active==1)      {      
              localStorage['loguser']=this.username
              localStorage['logpass']=this.password  
              if(LicensedUserStatus == 1) { 
                this.navCtrl.setRoot(EnterdetailscreenPage,{LicenseStatus:true,username:this.username,password:this.password});  
                return;   
               }



               let loading1=this.loadingCtrl.create({
                spinner: 'hide',
                content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
                cssClass: 'transparent'
              })
              Observable.of(loading1).flatMap(loading=>loading1.present())
                    .flatMap(() => this.security.activeSubscription())
                   .subscribe(data=>{
                     loading1.dismiss()
                    console.log("teacher profile==",data);
                    this.events.publish('teachearn:earnpoint', data.ActiveSubscription.totalPoints, Date.now());
                    this.events.publish('subuser:substatus', data.status, Date.now());
                    this.bdata.GetfamilyProfile =data.ActiveSubscription.getFamilyDetail
                   this.bdata.GetActiveMagaine=data.ActiveSubscription.subscribeDate 
                    if(data.ActiveSubscription.subscribeDate.length==0) { 
                      this.navCtrl.push(SubscribeNowPage,{product:this.product,NewUser:1,LicenseUser:"no"})
                      return;
                    } 
                    

                    if(localStorage['usrrole'] == 1){
                      this.navCtrl.setRoot(ImagazinespagePage);  return; 
                    }
                    if(localStorage['usrrole'] == 2){
                      this.navCtrl.setRoot(ImagazinespagePage);  return; 
                    }
      
      
                   if(localStorage['usrrole'] == 3) {    
                     this.navCtrl.setRoot(ImagazinespagePage);  return; 
                   }
                    
                   },err=>{   loading1.dismiss();  })


          // let alert = this.alertCtrl.create({
          //   title:'SignIn Succesfully',
          //   buttons: [
          //     {
          //       text: 'OK',
          //       role: 'cancel',
          //       handler: () => {
          //       }
          //     }]
          // });
          // alert.present();





        }

        else{  
         
          let alert = this.alertCtrl.create({
            title:'User is not active, Please contact Admin.',
            buttons: [
              {
                text: 'OK',
                role: 'cancel',
                handler: () => {
                }
              }]
          });
          alert.present();

        }
 
        }

  },err=>{
    loading.dismiss()
  })

  }



  loginWithFB() {   
    var fblogin=1
    this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
      this.facebook.api('me?fields=id,name,email,first_name,last_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
        console.log("success==",profile);
        this.userData = {email: profile['email'],last_name:profile['last_name'] ,first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name']}
      this.navCtrl.setRoot(EnterdetailscreenPage,{
        signup_type:this.signup_type,
        email: profile['email'],
        first_name:profile['first_name'],
        last_name:profile['last_name'],
        picture:this.userData.picture,
        fblogin:fblogin
      })
      });
    }) .catch((e) =>{
      console.log("error==",e);
      this.toastCtrl.create({ message: `Please try again.`,duration: 4000, position: 'top' }).present();
      return; 
    });
  }

 
  loginWithGoogle()
  {  
    var googlelogin=1
    this.googlePlus.login({})
      .then(res => { 
        console.log("success==",res); 
        this.navCtrl.setRoot(EnterdetailscreenPage,{
          signup_type:this.signup_type,
          googlelogin:googlelogin,
          first_name:res.givenName,
          last_name:res.familyName,
          picture:res.imageUrl,
          email:res.email    
           }) 
      })
      .catch(err => { 
        console.log("error==",err);
        this.toastCtrl.create({ message: `Please try again !`, duration: 4000, position: 'top' }).present(); return;
       } );
  }





  captchaResolved(response: string): void {
 
    this.zone.run(() => {
        this.captchaPassed = true;
        this.captchaResponse = response;
    });

}


sendForm(): void {
 
  let data = {
      captchaResponse: this.captchaResponse
  };     

  this.http.post('http://localhost:8080/test', data).subscribe(res => {
      console.log(res);
  });

}
  forgot(){
    let alert = this.alertCtrl.create({
      title: 'Forget Password',
      inputs: [
        {
          name: 'Email',
          placeholder: 'Enter Email'
        }
       
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Submit',
          handler: data => {
            console.log(data.Email)
            let loading=this.loadingCtrl.create({content:'Please Wait..'})
            Observable.of(loading).flatMap(loading=>loading.present())
                  .flatMap(() => this.security.forgetpassword(data.Email))
                 .subscribe(data=>{
                   loading.dismiss()

              if(data.status==0)
              {
                this.forgetstatus(data.status)
              }

              else{
                this.forgetstatus(data.status)
              }


                 })





          }
        }
      ]
    });
    alert.present();
  }


  forgetstatus(id)
  {

 if(id==0)
 {
  let alert = this.alertCtrl.create({
    title:'Email does not exist',

    buttons: ['Dismiss']
  });
  alert.present();
 }
 else if(id==1){
  let alert = this.alertCtrl.create({
    title:'Password has been sent to your mail',

    buttons: ['Dismiss']
  });
  alert.present();
 }


  }

}
