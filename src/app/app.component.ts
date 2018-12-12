import { Component,ViewChild } from '@angular/core';
import { Platform,Nav,LoadingController, ToastController, MenuController, AlertController  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';  
import{LoginPage}from'../pages/login/login'
import { HomePage } from '../pages/home/home';
import{UserloginPage}from'../pages/userlogin/userlogin'
import{SignupPage}from'../pages/signup/signup'
import{DashboardPage}from'../pages/dashboard/dashboard'
import{SchooldetailsPage}from'../pages/schooldetails/schooldetails'
import{ChilddetailPage}from'../pages/childdetail/childdetail'
import{EnterdetailscreenPage}from'../pages/enterdetailscreen/enterdetailscreen'
import{TermsandconditionsPage}from'../pages/termsandconditions/termsandconditions'
import{SubscribePage}from'../pages/subscribe/subscribe'
import{SubscribeNowPage}from'../pages/subscribe-now/subscribe-now'
import{PaymentgatewayPage}from'../pages/paymentgateway/paymentgateway'
import{TrialPeriodPage}from'../pages/trial-period/trial-period'
import{TrialPeriodExpiredPage}from'../pages/trial-period-expired/trial-period-expired'
import{AsksubscribePage}from'../pages/asksubscribe/asksubscribe'
import{ChoiceofperferencePage}from'../pages/choiceofperference/choiceofperference'
import{Choiceperferncepage2Page}from'../pages/choiceperferncepage2/choiceperferncepage2'
import{ImagazinespagePage}from'../pages/imagazinespage/imagazinespage'
import{ImagzinedetailPage}from'../pages/imagzinedetail/imagzinedetail'
import{RightnavigationmenuscreenPage}from'../pages/rightnavigationmenuscreen/rightnavigationmenuscreen'
import{NatureofcontentpagePage}from'../pages/natureofcontentpage/natureofcontentpage'
import{NotificationsPage}from'../pages/notifications/notifications'
import{SearchPage}from'../pages/search/search'
import{MyprofilepPage}from'../pages/myprofilep/myprofilep'
import{RefferalPage}from'../pages/refferal/refferal'
import{FaqPage}from'../pages/faq/faq'
import{ContestPage}from'../pages/contest/contest'
import{SurveyPage}from'../pages/survey/survey'
import{LoyalityPage}from'../pages/loyality/loyality'
import{ParentDataPage}from'../pages/parent-data/parent-data'
import{TeacherprofilepPage}from'../pages/teacherprofilep/teacherprofilep'
import{TestdemoPage}from'../pages/testdemo/testdemo'
import{DailypostmagzinecontentPage}from'../pages/dailypostmagzinecontent/dailypostmagzinecontent'
import { Events } from 'ionic-angular';
import{CommentsilrPage}from'../pages/commentsilr/commentsilr'
import { ContactUsPage } from '../pages/contact-us/contact-us';
import{SavefavouritePage}from'../pages/savefavourite/savefavourite';
import{TeacherrenewPage}from'../pages/teacherrenew/teacherrenew';
import{TeachersubscribePage}from'../pages/teachersubscribe/teachersubscribe';
import{OurvoicePage}from'../pages/ourvoice/ourvoice';
import{TexttypepagePage}from'../pages/texttypepage/texttypepage';
import{NatureofcontentPage}from'../pages/natureofcontent/natureofcontent';
import{ bigdata}from'../app/models'
import { Http, Headers, RequestOptions } from '@angular/http';
import {  Response } from '@angular/http';
import{SecurityProvider}from'../providers/security/security'
import{Observable}from'rxjs/Rx'
import{EventsPage}from'../pages/events/events';
import{GroupsPage}from'../pages/groups/groups';
import { Storage } from '@ionic/storage';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import{NuclearfamilyPage}from'../pages/nuclearfamily/nuclearfamily';
import{PaymentoptionsPage}from'../pages/paymentoptions/paymentoptions';
import{SignupcategoryPage}from'../pages/signupcategory/signupcategory';
import{ProfilenewPage}from'../pages/profilenew/profilenew'; 
import{AnswersheetPage}from'../pages/answersheet/answersheet';
import { OneSignal } from '@ionic-native/onesignal';
import{ThemechangePage}from'../pages/themechange/themechange';
import{AppState}from'../app/app.global'
import { SettingProvider } from './../providers/setting/setting';
import {ImagzineflowPage } from '../pages/imagzineflow/imagzineflow'

import {AboutusPage } from '../pages/aboutus/aboutus'   
import {OtppagePage } from '../pages/otppage/otppage'   

@Component({
  templateUrl: 'app.html'
})
export class MyApp {     
                                                                
  @ViewChild(Nav)nav:Nav  
   UpImgUsr:any; Usremails:any; Usrname:any; UsrExpDate:any; UsrSubStatus:any;
  user_magazine:any;
  product=[];
  ExpImg:any;
  pages: Array<{type:string,title: string, component: any,logo:string}>;
  pages1: Array<{title: string, component: any,logo:string,color:string,type:string}>; 
  selectedTheme: String;
  themechange

  icon1
    icon2
    icon3
    icon4
    icon5
    icon6
    icon7
    icon8
    icon9
  icon10
  icon11
  icon12
  icon13
  icon14
  icon15
    icon16
    icon17
    icon18
    icon19
    flag:boolean=false;

    HostName:any;  

  constructor(private settings: SettingProvider,public events: Events,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private http: Http,public bdata:bigdata,public loadingCtrl:LoadingController, public toastCtrl:ToastController, public security:SecurityProvider, public str:Storage, private speechRecognition: SpeechRecognition,private oneSignal: OneSignal,public global:AppState, public menuCtrl:MenuController,public alertCtrl:AlertController) {
    platform.ready().then(() => {
   
this.HostName=this.security.Hostname();  

    

      this.flag=false
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();  
      this.settings.getActiveTheme().subscribe(val =>
        this.selectedTheme = val
       );
 
       if(localStorage['theme']==2)

{     

this.flag=true
}
  
else if(localStorage['theme']==3)
{
  this.flag=true
}
 
     //this.Notifications();   
        //this.Getpermission();  
     
      this.str.get('USERID').then(values => {   
         if(values=="" || values==null ){  this.nav.setRoot(HomePage);    }
        else{
          this.str.get('UsrnameLog').then(values1 => { 
            this.str.get('UsrpassLog').then(values2 => {  
              this.usrlogin(values1,values2); 
              })
          })
        }
       })  

  

    });

    

  
    this.events.subscribe('user:theme', (theme, time) => {
      this.themechange=theme
      setTimeout(()=>{

        if(this.themechange==1)
        {
         
        }
        else if(this.themechange==2)
        {
        
          var a=document.getElementById("1_x").style.color="#fff"
        
         this.flag=true
        
        }
        else if(this.themechange==3)
        {
        
          var a=document.getElementById("1_x").style.color="#fff"
         this.flag=true
       
        }
        else if(this.themechange==4)
        {
         
        }
          
        },1000)
      if(this.themechange==1)
      {
        this.icon1='assets/imgs/greysidebaricon/Asset2.png'
        this.icon2='assets/imgs/greysidebaricon/Asset17.png'
        this.icon3='assets/imgs/greysidebaricon/Asset23.png'
        this.icon4='assets/imgs/greysidebaricon/Asset12.png'
        this.icon5='assets/imgs/greysidebaricon/Asset11.png'
        this.icon6='assets/imgs/greysidebaricon/Asset20.png' 
        this.icon7='assets/imgs/greysidebaricon/Asset18.png'
        this.icon8='assets/imgs/greysidebaricon/Asset3.png'
        this.icon9='assets/imgs/greysidebaricon/calendar-icon.png'
        
        this.icon10='assets/imgs/greysidebaricon/Asset4.png'
        this.icon11='assets/imgs/greysidebaricon/Asset5.png'
        this.icon12='assets/imgs/greysidebaricon/Asset8.png'
        this.icon13='assets/imgs/greysidebaricon/Asset6.png'
        
        this.icon14='assets/imgs/greysidebaricon/Asset7.png'
        this.icon15='assets/imgs/greysidebaricon/Asset10.png'
        
        this.icon16='assets/imgs/greysidebaricon/Asset9.png'
        
        this.icon17='assets/imgs/greysidebaricon/gift.png'
        this.icon18='assets/imgs/greysidebaricon/Asset25.png'
        this.icon19='assets/imgs/greysidebaricon/Asset24.png'
      }



      else if(this.themechange==2)
      {
        this.icon1='assets/imgs/bluesidebar/Asset1.png' 
        this.icon2='assets/imgs/bluesidebar/Asset22.png'
        this.icon3='assets/imgs/bluesidebar/Asset28.png'
        
        this.icon4='assets/imgs/bluesidebar/Asset11.png'
        this.icon5='assets/imgs/bluesidebar/Asset10.png'
        this.icon6='assets/imgs/bluesidebar/Asset25.png'
        this.icon7='assets/imgs/bluesidebar/Asset23.png'
        this.icon8='assets/imgs/bluesidebar/Asset2.png'
        this.icon9='assets/imgs/bluesidebar/calender.png'
        this.icon10='assets/imgs/bluesidebar/Asset2.png'
        this.icon11='assets/imgs/bluesidebar/Asset4.png'
        this.icon12='assets/imgs/bluesidebar/Asset7.png'
        this.icon13='assets/imgs/bluesidebar/Asset5.png'
        this.icon14='assets/imgs/bluesidebar/Asset6.png'
        this.icon15='assets/imgs/bluesidebar/Asset7.png'
        this.icon16='assets/imgs/bluesidebar/Asset8.png'
        this.icon17='assets/imgs/bluesidebar/gift.png'
        this.icon18='assets/imgs/bluesidebar/Asset30.png'
        this.icon19='assets/imgs/bluesidebar/Asset29.png'
      }
      else if(this.themechange==3)
      {
        this.icon1='assets/imgs/redsidebar/Asset1.png'
        this.icon2='assets/imgs/redsidebar/Asset13.png'
        this.icon3='assets/imgs/redsidebar/Asset19.png'
        this.icon4='assets/imgs/redsidebar/Asset10.png'
        this.icon5='assets/imgs/redsidebar/Asset9.png'
        this.icon6='assets/imgs/redsidebar/Asset16.png'
        this.icon7='assets/imgs/redsidebar/Asset14.png'
        this.icon8='assets/imgs/redsidebar/Asset16.png'
        this.icon9='assets/imgs/redsidebar/events.png'
        this.icon10='assets/imgs/redsidebar/Asset4.png'
        this.icon11='assets/imgs/redsidebar/Asset3.png'
        this.icon12='assets/imgs/redsidebar/Asset6.png'
        this.icon13='assets/imgs/redsidebar/Asset7.png'
        this.icon14='assets/imgs/redsidebar/Asset5.png'
        this.icon15='assets/imgs/redsidebar/Asset8.png'
        this.icon16='assets/imgs/redsidebar/Asset7.png'
        this.icon17='assets/imgs/redsidebar/points-earned.png'
        this.icon18='assets/imgs/redsidebar/Asset21.png'
        this.icon19='assets/imgs/redsidebar/Asset20.png'
      }

      else if(this.themechange==4)
      {
        this.icon1='assets/imgs/yellowsidebar/Asset1.png'
        this.icon2='assets/imgs/yellowsidebar/Asset16.png'
        this.icon3='assets/imgs/yellowsidebar/Asset22.png'
        this.icon4='assets/imgs/yellowsidebar/Asset11.png'
        this.icon5='assets/imgs/yellowsidebar/Asset10.png'
        this.icon6='assets/imgs/yellowsidebar/Asset19.png'
        this.icon7='assets/imgs/yellowsidebar/Asset17.png'
        this.icon8='assets/imgs/yellowsidebar/Asset2.png'
        this.icon9='assets/imgs/icons/calendar-icon.png'
        this.icon10='assets/imgs/yellowsidebar/Asset3.png'
        this.icon11='assets/imgs/yellowsidebar/Asset4.png'
        this.icon12='assets/imgs/yellowsidebar/Asset7.png'
        this.icon13='assets/imgs/yellowsidebar/Asset5.png'
        this.icon14='assets/imgs/yellowsidebar/Asset6.png'
        this.icon15='assets/imgs/yellowsidebar/Asset9.png'
        this.icon16='assets/imgs/yellowsidebar/Asset8.png'
        this.icon17='assets/imgs/greysidebaricon/gift.png'
        this.icon18='assets/imgs/yellowsidebar/Asset24.png'
        this.icon19='assets/imgs/yellowsidebar/Asset23.png'
      }

    });

    this.icon1='assets/imgs/bluesidebar/Asset1.png' 
    this.icon2='assets/imgs/bluesidebar/Asset22.png'
    this.icon3='assets/imgs/bluesidebar/Asset28.png'
    
    this.icon4='assets/imgs/bluesidebar/Asset11.png'
    this.icon5='assets/imgs/bluesidebar/Asset10.png'
    this.icon6='assets/imgs/bluesidebar/Asset25.png'
    this.icon7='assets/imgs/bluesidebar/Asset23.png'
    this.icon8='assets/imgs/bluesidebar/Asset2.png'
    this.icon9='assets/imgs/bluesidebar/calender.png'
    this.icon10='assets/imgs/bluesidebar/Asset2.png'
    this.icon11='assets/imgs/bluesidebar/Asset4.png'
    this.icon12='assets/imgs/bluesidebar/Asset7.png'
    this.icon13='assets/imgs/bluesidebar/Asset5.png'
    this.icon14='assets/imgs/bluesidebar/Asset6.png'
    this.icon15='assets/imgs/bluesidebar/Asset7.png'
    this.icon16='assets/imgs/bluesidebar/Asset8.png'
    this.icon17='assets/imgs/bluesidebar/gift.png'
    this.icon18='assets/imgs/bluesidebar/Asset30.png'
    this.icon19='assets/imgs/bluesidebar/Asset29.png'

    this.events.subscribe('userrole:usrrole', (theme, time) => {
      if(theme !=1){

        this.pages = [  
          { type:'0',title: 'My Profile', component:MyprofilepPage, logo:this.icon2},
          { type:'0',title: 'Magazines', component:ImagzineflowPage, logo:this.icon1},
          {type:'0', title: 'Group Chats', component:GroupsPage, logo:this.icon8},
          {type:'0',title:'Nature of Content',component:NatureofcontentPage,logo:this.icon10},
          {type:'0', title: 'Text Type', component:TexttypepagePage, logo:this.icon11},
          // {type:'1',title:'Word of the day',component:DailypostmagzinecontentPage,logo:this.icon13},
          // { type:'2',title: 'Idom of the day', component:DailypostmagzinecontentPage, logo:this.icon14},
          // {type:'3', title: 'Quote of the day', component:DailypostmagzinecontentPage, logo:this.icon12},
          {type:'0',title:'Our Voices',component:OurvoicePage,logo:this.icon16},
          { type:'0',title: 'Save Favourites', component:SavefavouritePage, logo:this.icon15},
          {type:'0', title: 'Contest', component:ContestPage, logo:this.icon5},
          {type:'0',title:'Survey',component:SurveyPage,logo:this.icon4},
          {type:'0',title:'Referral Programme',component:RefferalPage,logo:this.icon6},
          { type:'0',title: 'About Us', component:AboutusPage, logo:this.icon7},
          {type:'0',title:'FAQ',component:FaqPage,logo:this.icon3},
          {type:'0', title: 'Theme Change', component:ThemechangePage, logo:this.icon18},
          {type:'0',title:'Events',component:EventsPage,logo:this.icon9},
          {type:'0',title:'Points Earned',component:LoyalityPage,logo:this.icon17},
          {type:'0', title: 'Answer Sheet', component:AnswersheetPage, logo:this.icon11},
          { type:'0',title: 'Logout', component:1, logo:this.icon19}
        ];

      }
      else{
        this.pages = [ 
          { type:'0',title: 'My Profile', component:MyprofilepPage, logo:this.icon2},
          { type:'0',title: 'Magazines', component:ImagzineflowPage, logo:this.icon1},
          {type:'0', title: 'Group Chats', component:GroupsPage, logo:this.icon8},
          {type:'0',title:'Nature of Content',component:NatureofcontentPage,logo:this.icon10},
          {type:'0', title: 'Text Type', component:TexttypepagePage, logo:this.icon11},
          // {type:'1',title:'Word of the day',component:DailypostmagzinecontentPage,logo:this.icon13},
          // { type:'2',title: 'Idom of the day', component:DailypostmagzinecontentPage, logo:this.icon14},
          // {type:'3', title: 'Quote of the day', component:DailypostmagzinecontentPage, logo:this.icon12},
          {type:'0',title:'Our Voices',component:OurvoicePage,logo:this.icon16},
          { type:'0',title: 'Save Favourites', component:SavefavouritePage, logo:this.icon15},
          {type:'0', title: 'Contest', component:ContestPage, logo:this.icon5},
          {type:'0',title:'Survey',component:SurveyPage,logo:this.icon4},
          {type:'0',title:'Referral Programme',component:RefferalPage,logo:this.icon6},
          { type:'0',title: 'About Us', component:AboutusPage, logo:this.icon7},
          {type:'0',title:'FAQ',component:FaqPage,logo:this.icon3},
          {type:'0', title: 'Theme Change', component:ThemechangePage, logo:this.icon18},
          {type:'0',title:'Events',component:EventsPage,logo:this.icon9},
          {type:'0',title:'Points Earned',component:LoyalityPage,logo:this.icon17},
          //{type:'0', title: 'Answer Sheet', component:AnswersheetPage, logo:this.icon11},
          { type:'0',title: 'Logout', component:1, logo:this.icon19}
        ];
      }
    });


    if(localStorage['usrrole']==1)
    {
    this.pages = [ 
      { type:'0',title: 'My Profile', component:MyprofilepPage, logo:this.icon2},
      { type:'0',title: 'Magazines', component:ImagzineflowPage, logo:this.icon1},
      {type:'0', title: 'Group Chats', component:GroupsPage, logo:this.icon8},
      {type:'0',title:'Nature of Content',component:NatureofcontentPage,logo:this.icon10},
      {type:'0', title: 'Text Type', component:TexttypepagePage, logo:this.icon11},
      // {type:'1',title:'Word of the day',component:DailypostmagzinecontentPage,logo:this.icon13},
      // { type:'2',title: 'Idom of the day', component:DailypostmagzinecontentPage, logo:this.icon14},
      // {type:'3', title: 'Quote of the day', component:DailypostmagzinecontentPage, logo:this.icon12},  
      {type:'0',title:'Our Voices',component:OurvoicePage,logo:this.icon16},
      { type:'0',title: 'Save Favourites', component:SavefavouritePage, logo:this.icon15},
      {type:'0', title: 'Contest', component:ContestPage, logo:this.icon5},
      {type:'0',title:'Survey',component:SurveyPage,logo:this.icon4},
      {type:'0',title:'Referral Programme',component:RefferalPage,logo:this.icon6},
      { type:'0',title: 'About Us', component:AboutusPage, logo:this.icon7},
      {type:'0',title:'FAQ',component:FaqPage,logo:this.icon3},
      {type:'0', title: 'Theme Change', component:ThemechangePage, logo:this.icon18},
      {type:'0',title:'Events',component:EventsPage,logo:this.icon9},
      {type:'0',title:'Points Earned',component:LoyalityPage,logo:this.icon17},
      {type:'0', title: 'Answer Sheet', component:AnswersheetPage, logo:this.icon11},
      { type:'0',title: 'Logout', component:1, logo:this.icon19}
    ];
  }
  else{   
    this.pages = [ 
      { type:'0',title: 'My Profile', component:MyprofilepPage, logo:this.icon2},
      { type:'0',title: 'Magazines', component:ImagzineflowPage, logo:this.icon1},
      {type:'0', title: 'Group Chats', component:GroupsPage, logo:this.icon8},
      {type:'0',title:'Nature of Content',component:NatureofcontentPage,logo:this.icon10},
      {type:'0', title: 'Text Type', component:TexttypepagePage, logo:this.icon11},
      // {type:'1',title:'Word of the day',component:DailypostmagzinecontentPage,logo:this.icon13},
      // { type:'2',title: 'Idom of the day', component:DailypostmagzinecontentPage, logo:this.icon14},
      // {type:'3', title: 'Quote of the day', component:DailypostmagzinecontentPage, logo:this.icon12},  
      {type:'0',title:'Our Voices',component:OurvoicePage,logo:this.icon16},
      { type:'0',title: 'Save Favourites', component:SavefavouritePage, logo:this.icon15},
      {type:'0', title: 'Contest', component:ContestPage, logo:this.icon5},
      {type:'0',title:'Survey',component:SurveyPage,logo:this.icon4},
      {type:'0',title:'Referral Programme',component:RefferalPage,logo:this.icon6},
      { type:'0',title: 'About Us', component:AboutusPage, logo:this.icon7},    
      {type:'0',title:'FAQ',component:FaqPage,logo:this.icon3},
      {type:'0', title: 'Theme Change', component:ThemechangePage, logo:this.icon18},
      {type:'0',title:'Events',component:EventsPage,logo:this.icon9},
      {type:'0',title:'Points Earned',component:LoyalityPage,logo:this.icon17},  
     // {type:'0', title: 'Answer Sheet', component:AnswersheetPage, logo:this.icon11},
      { type:'0',title: 'Logout', component:1, logo:this.icon19}
    ];
  }


    if(localStorage['theme']==1)
    {  
      this.icon1='assets/imgs/greysidebaricon/Asset2.png'
      this.icon2='assets/imgs/greysidebaricon/Asset17.png'
      this.icon3='assets/imgs/greysidebaricon/Asset23.png'
      this.icon4='assets/imgs/greysidebaricon/Asset12.png'
      this.icon5='assets/imgs/greysidebaricon/Asset11.png'
      this.icon6='assets/imgs/greysidebaricon/Asset20.png' 
      this.icon7='assets/imgs/greysidebaricon/Asset18.png'
      this.icon8='assets/imgs/greysidebaricon/Asset3.png'
      this.icon9='assets/imgs/greysidebaricon/calendar-icon.png'
      
      this.icon10='assets/imgs/greysidebaricon/Asset4.png'
      this.icon11='assets/imgs/greysidebaricon/Asset5.png'
      this.icon12='assets/imgs/greysidebaricon/Asset8.png'
      this.icon13='assets/imgs/greysidebaricon/Asset6.png'
      
      this.icon14='assets/imgs/greysidebaricon/Asset7.png'
      this.icon15='assets/imgs/greysidebaricon/Asset10.png'
      
      this.icon16='assets/imgs/greysidebaricon/Asset9.png'
      
      this.icon17='assets/imgs/greysidebaricon/gift.png'
      this.icon18='assets/imgs/greysidebaricon/Asset25.png'
      this.icon19='assets/imgs/greysidebaricon/Asset24.png'
    }
    else if(localStorage['theme']==2)
    {
      this.icon1='assets/imgs/bluesidebar/Asset1.png'
      this.icon2='assets/imgs/bluesidebar/Asset22.png'
      this.icon3='assets/imgs/bluesidebar/Asset28.png'
      
      this.icon4='assets/imgs/bluesidebar/Asset11.png'
      this.icon5='assets/imgs/bluesidebar/Asset10.png'
      this.icon6='assets/imgs/bluesidebar/Asset25.png'
      this.icon7='assets/imgs/bluesidebar/Asset23.png'
      this.icon8='assets/imgs/bluesidebar/Asset2.png'
      this.icon9='assets/imgs/bluesidebar/calender.png'
      this.icon10='assets/imgs/bluesidebar/Asset2.png'
      this.icon11='assets/imgs/bluesidebar/Asset4.png'
      this.icon12='assets/imgs/bluesidebar/Asset7.png'
      this.icon13='assets/imgs/bluesidebar/Asset5.png'
      this.icon14='assets/imgs/bluesidebar/Asset6.png'
      this.icon15='assets/imgs/bluesidebar/Asset7.png'
      this.icon16='assets/imgs/bluesidebar/Asset8.png'
      this.icon17='assets/imgs/bluesidebar/gift.png'
      this.icon18='assets/imgs/bluesidebar/Asset30.png'
      this.icon19='assets/imgs/bluesidebar/Asset29.png'
    }
    else if(localStorage['theme']==3)
    {
      this.icon1='assets/imgs/redsidebar/Asset1.png'
this.icon2='assets/imgs/redsidebar/Asset13.png'
this.icon3='assets/imgs/redsidebar/Asset19.png'
this.icon4='assets/imgs/redsidebar/Asset10.png'
this.icon5='assets/imgs/redsidebar/Asset9.png'
this.icon6='assets/imgs/redsidebar/Asset16.png'
this.icon7='assets/imgs/redsidebar/Asset14.png'
this.icon8='assets/imgs/redsidebar/Asset16.png'
this.icon9='assets/imgs/redsidebar/events.png'
this.icon10='assets/imgs/redsidebar/Asset4.png'
this.icon11='assets/imgs/redsidebar/Asset3.png'
this.icon12='assets/imgs/redsidebar/Asset6.png'
this.icon13='assets/imgs/redsidebar/Asset7.png'
this.icon14='assets/imgs/redsidebar/Asset5.png'
this.icon15='assets/imgs/redsidebar/Asset8.png'
this.icon16='assets/imgs/redsidebar/Asset7.png'
this.icon17='assets/imgs/redsidebar/points-earned.png'
this.icon18='assets/imgs/redsidebar/Asset21.png'
this.icon19='assets/imgs/redsidebar/Asset20.png'
    }
    else if(localStorage['theme']==4)
    {
      this.icon1='assets/imgs/yellowsidebar/Asset1.png'
      this.icon2='assets/imgs/yellowsidebar/Asset16.png'
      this.icon3='assets/imgs/yellowsidebar/Asset22.png'
      this.icon4='assets/imgs/yellowsidebar/Asset11.png'
      this.icon5='assets/imgs/yellowsidebar/Asset10.png'
      this.icon6='assets/imgs/yellowsidebar/Asset19.png'
      this.icon7='assets/imgs/yellowsidebar/Asset17.png'
      this.icon8='assets/imgs/yellowsidebar/Asset2.png'
      this.icon9='assets/imgs/icons/calendar-icon.png'
      this.icon10='assets/imgs/yellowsidebar/Asset3.png'
      this.icon11='assets/imgs/yellowsidebar/Asset4.png'
      this.icon12='assets/imgs/yellowsidebar/Asset7.png'
      this.icon13='assets/imgs/yellowsidebar/Asset5.png'
      this.icon14='assets/imgs/yellowsidebar/Asset6.png'
      this.icon15='assets/imgs/yellowsidebar/Asset9.png'
      this.icon16='assets/imgs/yellowsidebar/Asset8.png'
      this.icon17='assets/imgs/greysidebaricon/gift.png'
      this.icon18='assets/imgs/yellowsidebar/Asset24.png'
      this.icon19='assets/imgs/yellowsidebar/Asset23.png' 
    }

    else 
    {
      this.icon1='assets/imgs/greysidebaricon/Asset2.png'
      this.icon2='assets/imgs/greysidebaricon/Asset17.png'
      this.icon3='assets/imgs/greysidebaricon/Asset23.png'
      this.icon4='assets/imgs/greysidebaricon/Asset12.png'
      this.icon5='assets/imgs/greysidebaricon/Asset11.png'
      this.icon6='assets/imgs/greysidebaricon/Asset20.png' 
      this.icon7='assets/imgs/greysidebaricon/Asset18.png'
      this.icon8='assets/imgs/greysidebaricon/Asset3.png'
      this.icon9='assets/imgs/greysidebaricon/calendar-icon.png'
      
      this.icon10='assets/imgs/greysidebaricon/Asset4.png'
      this.icon11='assets/imgs/greysidebaricon/Asset5.png'
      this.icon12='assets/imgs/greysidebaricon/Asset8.png'
      this.icon13='assets/imgs/greysidebaricon/Asset6.png'
      
      this.icon14='assets/imgs/greysidebaricon/Asset7.png'
      this.icon15='assets/imgs/greysidebaricon/Asset10.png'
      
      this.icon16='assets/imgs/greysidebaricon/Asset9.png'
      
      this.icon17='assets/imgs/greysidebaricon/gift.png'
      this.icon18='assets/imgs/greysidebaricon/Asset25.png'
      this.icon19='assets/imgs/greysidebaricon/Asset24.png'  
    }

    this.pages1 = [ 
      { type:'0',color:'#fff', title: 'Home', component:ImagazinespagePage, logo:'assets/imgs/home.png'},
      {type:'0',color:'#fff', title: 'Groups', component:GroupsPage, logo:'assets/imgs/icons/group.png'},
      {type:'0',color:'#fff',title:'Events',component:EventsPage,logo:'assets/imgs/icons/calendar-icon.png'},
      
      {type:'0',color:'#fff',title:'Nature of Content',component:NatureofcontentPage,logo:'assets/imgs/icons/design.png'},
      {type:'0',color:'#fff', title: 'Text Type', component:TexttypepagePage, logo:'assets/imgs/icons/documents-button.png'},
      {type:'3',color:'#fff', title: 'Quote of the day', component:DailypostmagzinecontentPage, logo:'assets/imgs/icons/tree-of-dots-foliage.png'},
     
      {type:'1',color:'#fff',title:'Word of the day',component:DailypostmagzinecontentPage,logo:'assets/imgs/icons/browser.png'},
      {type:'2',color:'#fff', title: 'Idom of the day', component:DailypostmagzinecontentPage, logo:'assets/imgs/icons/i.png'},
      {type:'0',color:'#fff', title: 'Save Favourites', component:SavefavouritePage, logo:'assets/imgs/icons/favorite-heart-button.png'},
      {type:'0',color:'#fff',title:'Our Voices',component:OurvoicePage,logo:'assets/imgs/icons/megaphone.png'},
      {type:'0',color:'#fff',title:'Points Earned',component:LoyalityPage,logo:'assets/imgs/icons/gift.png'}
    ];
    this. FunEventUp();
  }

  
  usrlogin(usrname,password) {
 
  let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
  let requestOptions=new RequestOptions({headers:headers})
  let param=JSON.stringify({
    username:usrname,
    password:password
  })
  this.http.post(this.HostName+'/admin/userapi/login',param,requestOptions)
  .subscribe((data)=>{
    if((<any>data).status==200) {  
      let jsonstr=data.json();
      let strStringify=JSON.stringify(jsonstr);

    if(jsonstr.status== 0){
      this.nav.setRoot(OtppagePage);     
      }
  else{
    if(jsonstr.user.is_active==1)      {  
    this.bdata.userdata=jsonstr.user
     this.user_magazine=jsonstr.user_magazine
     this.bdata.UsrTextType=jsonstr.user_text_type
     this.bdata.ContentNature=jsonstr.content_nature
   
     this.bdata.UserMagazineId=jsonstr.user_magazine 
     
     for(let i=0; i<jsonstr.user_magazine.length;i++){
       this.product.push({magazine_id: jsonstr.user_magazine[i].magazineID})  
     }


 localStorage['usrrole']=jsonstr.user.role
   this.events.publish('userrole:usrrole', jsonstr.user.role, Date.now());
 this.str.set('token',jsonstr.token)
 localStorage['token']=jsonstr.token
 localStorage['email']=jsonstr.user.email  
 this.CheckSubscriptions(jsonstr.subscriptionExpryDate,jsonstr.is_licensed_user) 
     }
     else{
       let alert = this.alertCtrl.create({
         title:'User is not active, Please contact Admin.',
         buttons: [
           {
             text: 'OK',
             role: 'cancel',
             handler: () => {
               this.nav.setRoot(UserloginPage); 
             }
           }]
       });
       alert.present();
     } 
 return;
}
    
    }
    else
    {
      this.nav.setRoot(HomePage)
      return;
    }
  },err=>{ this.toastCtrl.create({ message: 'No internet connection, Please try again.', duration: 3000, position: 'top' }).present(); })
}
  
 
CheckSubscriptions(ExyDate,LicenseUser)
{ 
  let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
  let requestOptions=new RequestOptions({headers:headers})
  let param=JSON.stringify( {   })
  this.http.post(this.HostName+'/serverTime',param,requestOptions).subscribe((data)=>{
    let jsonstr=data.json();
    if(ExyDate<=jsonstr.serverTime)
    {
      this.nav.setRoot(SubscribeNowPage,{LicenseUser: LicenseUser,product:this.product,NewUser:"4"}); 
    }
    else{
      this.nav.setRoot(ImagazinespagePage);    
    }
  },err=>{ this.toastCtrl.create({ message: 'No internet connection, Please try again.', duration: 3000, position: 'top' }).present(); })
}

  
  FunEventUp()  {  
    this.events.subscribe('user:created', (user, time) => { 
      if(user=="assets/imgs/user.png"){  this.UpImgUsr="assets/imgs/user.png";    return;}
      if(user!="assets/imgs/user.png"){  this.UpImgUsr=user;     return;}
           });  
    this.events.subscribe('usern:usrname', (user, time) => {  this.Usrname=user;      });   
    this.events.subscribe('usere:email', (user, time) => {  this.Usremails=user;      });  
    this.events.subscribe('userexp:expdate', (user, time) => {  this.UsrExpDate=user;      }); 
    this.events.subscribe('subuser:substatus', (user, time) => {  this.UsrSubStatus=user;      }); 
    this.events.subscribe('userimg:expimage', (user, time) => {  this.ExpImg=user;      }); 
    
   } 

  navigatetoimagzine()
  {
    this.nav.setRoot(ImagazinespagePage)
  }

  
  openPage(page) {
    localStorage['type']=page.type
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    console.log("profile")
    if(page.title =="My Profile"){
      console.log("profile")
      if(localStorage['usrrole'] == "2") {  this.nav.setRoot(TeacherprofilepPage);  return;    }
      if(localStorage['usrrole'] == "1") {  this.nav.setRoot(TeacherprofilepPage); return;    }
      if(localStorage['usrrole'] == "3") {  this.nav.setRoot(page.component); return;    }
     
    } 
   else if(page.title =="Logout"){
    console.log("Logout")
    // Logout the active user....
    let loading=this.loadingCtrl.create({ 
      spinner: 'hide',
      content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
      cssClass: 'transparent'
    })
    Observable.of(loading).flatMap(loading=>loading.present())
          .flatMap(() => this.security.logout())
         .subscribe(data=>{
           loading.dismiss()
          console.log(data);
          localStorage.clear();
          this.str.remove('UsrnameLog'); 
            this.str.remove('UsrpassLog');
            this.str.remove('USERID'); 
          this.nav.setRoot(HomePage)
          this.toastCtrl.create({ message: data.message, duration: 4000, position: 'top' }).present();
         
         },error=>
         {
          loading.dismiss()
           this.toastCtrl.create({ message: "No internet connection, please try again.", duration: 4000, position: 'top' }).present();
         }
        )
     return;    
     
    } 
else{
  this.nav.setRoot(page.component); 

}

    
  
  }


   
  openPage1(page,type) {
    this.nav.setRoot(page.component);
    localStorage['type']=type
  } 
 

  // calling push notification ...
      Notifications(){                              
      this.oneSignal.startInit('753a4f20-74d3-46d9-a9f8-4f1ef0190cfb', '1046270538379');
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
          this.oneSignal.handleNotificationReceived().subscribe((jsonData) => {    });
            this.oneSignal.handleNotificationOpened().subscribe((jsonData) => {    });
              this.oneSignal.endInit();      
    }

    Getpermission(){    
      localStorage["GetPermission"]="permissions";
      this.speechRecognition.hasPermission().then((hasPermission: boolean) => {
        if (!hasPermission) {
        this.speechRecognition.requestPermission().then(
            () => console.log('Granted'),
            () => console.log('Denied')
          )
        }
      });
    }

     
     checkMenu() {
      this.menuCtrl.enable(true);
      this.menuCtrl.toggle();
    }


        
}

