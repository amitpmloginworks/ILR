import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import{LoginPage}from'../pages/login/login'
import { MyApp } from './app.component';
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
import{ReactionsPage}from'../pages/reactions/reactions'
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
import { SecurityProvider } from '../providers/security/security';
import{HttpModule}from'@angular/http'
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import{bigdata}from'./models'
import { RecaptchaModule } from 'ng-recaptcha';
import { HttpClientModule } from '@angular/common/http';
import{TestdemoPage}from'../pages/testdemo/testdemo'
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Stripe } from '@ionic-native/stripe';
import{countrylist}from './countrylist'
import{DailypostmagzinecontentPage}from '../pages/dailypostmagzinecontent/dailypostmagzinecontent'
import{MyprofileupPage}from '../pages/myprofileup/myprofileup'
import{SocialSharing}from'@ionic-native/social-sharing'
import{CommentsilrPage}from'../pages/commentsilr/commentsilr'
import { ContactUsPage } from '../pages/contact-us/contact-us';
import{ContestquestPage}from'../pages/contestquest/contestquest';
import{SavefavouritePage}from'../pages/savefavourite/savefavourite';

import{MyprofilepmodelPage}from'../pages/myprofilepmodel/myprofilepmodel';
import{TeacherprofilepmodelPage}from'../pages/teacherprofilepmodel/teacherprofilepmodel';

import{TeacherrenewPage}from'../pages/teacherrenew/teacherrenew';
import{TeachersubscribePage}from'../pages/teachersubscribe/teachersubscribe';
import{OurvoicePage}from'../pages/ourvoice/ourvoice';
import{TexttypepagePage}from'../pages/texttypepage/texttypepage';
import{NatureofcontentPage}from'../pages/natureofcontent/natureofcontent';
import{EventsPage}from'../pages/events/events';
import{GroupsPage}from'../pages/groups/groups';
import{TeacherprofilemPage}from'../pages/teacherprofilem/teacherprofilem';
import { IonicStorageModule } from '@ionic/storage';
import{TeachersuggestionPage}from'../pages/teachersuggestion/teachersuggestion';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import{NuclearfamilyPage}from'../pages/nuclearfamily/nuclearfamily';
import{PaymentoptionsPage}from'../pages/paymentoptions/paymentoptions';
import{ReferalcodesPage}from'../pages/referalcodes/referalcodes';
import{SubexpiryPage}from'../pages/subexpiry/subexpiry';
import{SignupcategoryPage}from'../pages/signupcategory/signupcategory';
import{SignupcategorypopPage}from'../pages/signupcategorypop/signupcategorypop';
import { AnimationService, AnimationBuilder } from 'css-animator';
import{HomeaboutusPage}from'../pages/homeaboutus/homeaboutus';
import { SelectSearchableModule } from 'ionic-select-searchable';
import{ProfilenewPage}from'../pages/profilenew/profilenew';
import{ProfileaddfamilyPage}from'../pages/profileaddfamily/profileaddfamily';
import{SubauthPage}from'../pages/subauth/subauth';
import{ProfileshowfamilyPage}from'../pages/profileshowfamily/profileshowfamily';
import{GroupinfoPage}from'../pages/groupinfo/groupinfo';
import{AnswersheetPage}from'../pages/answersheet/answersheet';
import { OneSignal } from '@ionic-native/onesignal';
import { DocumentViewer } from '@ionic-native/document-viewer';
import{AppState}from'../app/app.global'
import { SettingProvider } from '../providers/setting/setting';
import{ThemechangePage}from'../pages/themechange/themechange';
import {GroupmodelPage } from '../pages/groupmodel/groupmodel'
import {ImagzineflowPage } from '../pages/imagzineflow/imagzineflow' 

import{HeaderbarComponent}from'../components/headerbar/headerbar'
import { FileOpener } from '@ionic-native/file-opener';

import {AboutusPage } from '../pages/aboutus/aboutus' 
import {OtppagePage } from '../pages/otppage/otppage' 
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal'; 
import { TextMaskModule } from 'angular2-text-mask'; 
import{AreciptnoPage}from'../pages/areciptno/areciptno';      

// this is module page where we do linking  
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    UserloginPage,
    SignupPage,
    DashboardPage,
    SchooldetailsPage,
    ChilddetailPage,
    EnterdetailscreenPage,
    TermsandconditionsPage,
    SubscribePage,
    SubscribeNowPage,
    PaymentgatewayPage,
    TrialPeriodPage,
    TrialPeriodExpiredPage,
    AsksubscribePage,
    ChoiceofperferencePage,
    Choiceperferncepage2Page,
    ImagazinespagePage,
    ImagzinedetailPage,
    ReactionsPage,
    RightnavigationmenuscreenPage,
    NatureofcontentpagePage,
    NotificationsPage,
    SearchPage,
    MyprofilepPage,
    RefferalPage,
    FaqPage,
    ContestPage,
    SurveyPage,
    LoyalityPage,
    ParentDataPage,
    TeacherprofilepPage,
    TestdemoPage,
    DailypostmagzinecontentPage,
    CommentsilrPage,
    ContactUsPage,
    ContestquestPage,
    SavefavouritePage,
    TeacherprofilepmodelPage,
    MyprofilepmodelPage,
    TeachersubscribePage,
    TeacherrenewPage,
    OurvoicePage,
    TexttypepagePage,
    NatureofcontentPage,
    MyprofileupPage,
    EventsPage,
    GroupsPage,
    TeacherprofilemPage,
    TeachersuggestionPage ,
    NuclearfamilyPage,
    PaymentoptionsPage,
    ReferalcodesPage,
    SubexpiryPage,
    SignupcategoryPage,
    SignupcategorypopPage,
    HomeaboutusPage,
    ProfilenewPage,
    ProfileaddfamilyPage,
    SubauthPage,
    ProfileshowfamilyPage,
    GroupinfoPage,
    AnswersheetPage,
    ThemechangePage,
    GroupmodelPage,
    HeaderbarComponent,
    ImagzineflowPage,
    AboutusPage,
    OtppagePage,
    AreciptnoPage
    
  ],
  imports: [
    BrowserModule,SelectSearchableModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
    HttpClientModule,
    RecaptchaModule.forRoot(),
    TextMaskModule   
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    UserloginPage,
    SignupPage,
    DashboardPage,
    SchooldetailsPage,
    ChilddetailPage,
    EnterdetailscreenPage,
    TermsandconditionsPage,
    SubscribePage,
    SubscribeNowPage,
    PaymentgatewayPage,
    TrialPeriodPage,
    TrialPeriodExpiredPage,
    AsksubscribePage, 
    ChoiceofperferencePage,
    Choiceperferncepage2Page,
    ImagazinespagePage,
    ImagzinedetailPage,
    ReactionsPage,
    RightnavigationmenuscreenPage,
    NatureofcontentpagePage,
    NotificationsPage,
    SearchPage,
    MyprofilepPage,
    RefferalPage,
    FaqPage,
    ContestPage,
    SurveyPage,
    LoyalityPage,
    ParentDataPage,
    TeacherprofilepPage,
    TestdemoPage,
    DailypostmagzinecontentPage,
    CommentsilrPage,
    ContactUsPage,
    ContestquestPage,
    SavefavouritePage,
    TeacherprofilepmodelPage,
MyprofilepmodelPage,
TeachersubscribePage,
TeacherrenewPage,
OurvoicePage,
TexttypepagePage,
NatureofcontentPage,
MyprofileupPage,
EventsPage,
GroupsPage,
TeacherprofilemPage,
TeachersuggestionPage ,
NuclearfamilyPage,
PaymentoptionsPage,
ReferalcodesPage,
SubexpiryPage,
SignupcategoryPage,
SignupcategorypopPage,
HomeaboutusPage,
ProfilenewPage,
ProfileaddfamilyPage,
SubauthPage,
ProfileshowfamilyPage,
GroupinfoPage,
AnswersheetPage,   
ThemechangePage,
GroupmodelPage,
ImagzineflowPage,
AboutusPage,
OtppagePage ,
AreciptnoPage 
     
  ],
  providers: [
    SocialSharing,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SecurityProvider,
    Camera,
    FileTransfer,
    FileTransferObject,
    File,
    Facebook,
    GooglePlus,
    bigdata,
    InAppBrowser,
    Stripe,
    countrylist,
    SpeechRecognition,
    AnimationService,
    OneSignal,
    DocumentViewer,
    SettingProvider,
    AppState,
    FileOpener,
    PayPal  
  ]
})
export class AppModule {}
