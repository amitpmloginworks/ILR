import { Component, style } from '@angular/core';
import { IonicPage, NavController, Platform, AlertController,NavParams ,LoadingController,ActionSheetController, ActionSheet, MenuController, ToastController } from 'ionic-angular';
import{SecurityProvider}from'../../providers/security/security';
import{Observable}from'rxjs/Rx';
import{ImagzinedetailPage}from'../imagzinedetail/imagzinedetail';
import{bigdata}from'../../app/models';
import { Events } from 'ionic-angular';
import{SearchPage}from'../search/search'
import * as moment from 'moment';
import{ContestquestPage}from'../contestquest/contestquest';
import{SurveyPage}from'../survey/survey';
import{UserloginPage}from'../userlogin/userlogin'
import{SocialSharing}from'@ionic-native/social-sharing'
import { SpeechRecognition } from '@ionic-native/speech-recognition';

/**
 * Generated class for the ImagazinespagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-imagazinespage',
  templateUrl: 'imagazinespage.html',
})
export class ImagazinespagePage {
 contents
  contentid
  totalviews
  index
  total_share
  imageval
  ehappy:number=0;
  eaww:number=0;
  esad:number=0;
  eangry:number=0;
  elol:number=0;
  showreaction:boolean
  count=0
  jindex
  imagzine=[]
  inspiremagzine=[]
  ithinkmagzine=[]
  LikeCountTotal

  subscribeExpiry

  SurveyListArr=[]
  ContestListArr=[]

  FirstName 
  type
  PermanentArray:any=[];
  SocialSharemsg:any;
  EventBtnList:boolean=false;    
  constructor(public alertCtrl:AlertController, public platform:Platform,public bdata:bigdata,public actionCtrl:ActionSheetController,public loadingCtrl:LoadingController,public security:SecurityProvider,public navCtrl: NavController, public navParams: NavParams,public events: Events, public menuCtrl: MenuController,public toastCtrl:ToastController, public socialshare:SocialSharing,private speechRecognition: SpeechRecognition) { 
    console.log(localStorage['USERID'])
    
this.SocialSharemsg='Hello, '+this.bdata.userdata.first_name+' finds this article interesting, and he/she thinks that you may like it too. Before you can view the content, please sign up a trial account for 14 days.';    

    this.showreaction=false


    let loading=this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
      cssClass: 'transparent'
    })
    Observable.of(loading).flatMap(loading=>loading.present())
          .flatMap(() => this.security.getContents())  
         .subscribe(data=>{
           loading.dismiss()
           console.log(data);
           this.contents=data.contents;
           if(data.status==1)
           {
         for(let i=0;i<data.contents.length;i++) { 
           let searchWord=data.contents[i].title; 
           //let foundWord=searchWord.search(/Play Now /i);

           this.contents=data.contents
           this.PermanentArray=data.contents
           if(searchWord.search(/Play Now /i) != -1)
           {
            this.ContestListArr.push({"contest_id":data.contents[i].contest_id,"image":data.contents[i].image,"title":data.contents[i].title});

               
           }
           if(searchWord.search(/Take Survey /i) != -1)
           {
            this.SurveyListArr.push({"survey_id":data.contents[i].survey_id,"image":data.contents[i].image,"title":data.contents[i].title});

           
           }  
     



         }

         this.activeSubscription();
        }
        // if(data.status==0)
        // {
     
        //   this.toastCtrl.create({  message: "Session is expiry, please login again.", duration: 3000  }).present();
        //  this.navCtrl.setRoot(UserloginPage);
        //  return;
        // }




      })

      this.bdata.ContestListArr=this.ContestListArr;
      this.bdata.SurveyListArr=this.SurveyListArr;
      console.log("this.bdata.ContestListArr==",this.bdata.ContestListArr);
      console.log("this.bdata.SurveyListArr==",this.bdata.SurveyListArr);
this.imageval=this.bdata.userdata.user_image;
this.FirstName=this.bdata.userdata.first_name;


          this.events.publish('user:created', this.imageval, Date.now());
          this.events.publish('usern:usrname', this.bdata.userdata.username, Date.now());
          this.events.publish('usere:email', this.bdata.userdata.email, Date.now());


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
       
    

      if(localStorage["GetPermission"] =="permissions"){
        this.speechRecognition.hasPermission().then((hasPermission: boolean) => {
          if (!hasPermission) {
          this.speechRecognition.requestPermission().then(
              () => console.log('Granted'),
              () => console.log('Denied')
            )
          }
        });
       }
      
  
     
      

  }
  searchMagazines(ev){        
    if(ev.target.value !="")  {
      let messagearray=  this.PermanentArray;           
      this.contents = messagearray.filter((item) => {   
        return (item.title.toLowerCase().indexOf(ev.target.value.toLowerCase()) > -1);
      })       
    }
    if(ev.target.value =="" || ev.target.value ==undefined) {    
      this.contents=this.PermanentArray;    
    } 
  }

fav(id)
{
  
  let loading=this.loadingCtrl.create({   
    spinner: 'hide',
    content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
    cssClass: 'transparent'
    })
  Observable.of(loading=>loading.present())
  .flatMap(()=>this.security.favoriteContent(this.contents[id].content_id))
  .subscribe(data=>{
    loading.dismiss()
    this.navCtrl.setRoot(ImagazinespagePage)
      console.log(data);
      
  }) 
}



mic(){     
  this.contents="";   
  this.contents = this.PermanentArray;     
  this.speechRecognition.startListening().subscribe((matches: Array<string>) => {
      let messagearray=  this.PermanentArray;           
      this.contents = messagearray.filter((item) => {   
        return (item.title.toLowerCase().indexOf(matches[0].toLowerCase()) > -1);
      })  
      this.contents=matches[0]  
    },(onerror) => {  this.contents=this.PermanentArray;  
     this.contents="";    
     }
  )
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
        if(data.ActiveSubscription.profile=="parent")
        {
          if(data.ActiveSubscription.childSubscription.length !=0)
          {
            this.events.publish('subuser:substatus', data.status, Date.now());
            let SubExpSplit=data.ActiveSubscription.childSubscription[0].max_expiry_date
            this.subscribeExpiry=moment(SubExpSplit).format('DD MMM YYYY');
            this.events.publish('userexp:expdate', this.subscribeExpiry, Date.now());
          }
          return;
        }
        if(data.ActiveSubscription.profile=="teacher")
        {
          if(data.ActiveSubscription.subscribeDate.length !=0)
          {
            this.events.publish('subuser:substatus', data.status, Date.now());
           let SubExpSplit=data.ActiveSubscription.subscribeDate[0].expiry_date
           this.subscribeExpiry=moment(SubExpSplit).format('DD MMM YYYY');
           this.events.publish('userexp:expdate', this.subscribeExpiry, Date.now());
           let usrImage=data.ActiveSubscription.subscribeDate[0].magazine_image;
           this.events.publish('userimg:expimage',usrImage, Date.now()); 
          }
          return;  
        }
        if(data.ActiveSubscription.profile=="student")
        {
          if(data.ActiveSubscription.subscribeDate.length !=0)
          {
            this.events.publish('subuser:substatus', data.status, Date.now());
           let SubExpSplit=data.ActiveSubscription.subscribeDate[0].expiry_date
           this.subscribeExpiry=moment(SubExpSplit).format('DD MMM YYYY');
           let usrImage=data.ActiveSubscription.subscribeDate[0].image;
           this.events.publish('userexp:expdate', this.subscribeExpiry, Date.now());
          
           this.events.publish('userimg:expimage',usrImage, Date.now());
          }
          return;
        }
       },err=>{ loading.dismiss(); })
}


SearchMagazine(contentdata)
{
  for(var i=0;i<contentdata.length;i++)
  {
   
    if(contentdata[i].content_id)
    {
    if(contentdata[i].magazine_name=="i")
    {
     if(contentdata[i].image=="")
     {
      contentdata[i].image="assets/imgs/NoImageAvailable.jpg"
     }
  this.imagzine.push({'index':i,'fav':contentdata[i].is_favorite,'imageval':this.imageval,'contents':contentdata,'content_id':contentdata[i].content_id,'image':contentdata[i].image,'title':contentdata[i].title})
        
    }
    else if(contentdata[i].magazine_name=="Inspire")
    {
      if(contentdata[i].image=="")
     {
      contentdata[i].image="assets/imgs/NoImageAvailable.jpg"
     
     }
     this.inspiremagzine.push({'index':i,'fav':contentdata[i].is_favorite,'imageval':this.imageval,'contents':contentdata,'content_id':contentdata[i].content_id,'image':contentdata[i].image,'title':contentdata[i].title})
    }
    else if(contentdata[i].magazine_name=="iThink")
    {
      if(contentdata[i].image=="")
     {
      contentdata[i].image="assets/imgs/NoImageAvailable.jpg"
     }
      this.ithinkmagzine.push({'index':i,'fav':contentdata[i].is_favorite,'imageval':this.imageval,'contents':contentdata,'content_id':contentdata[i].content_id,'image':contentdata[i].image,'title':contentdata[i].title})
    }
  }
   
  } 
}


  navigatetoSearchPage(){
    alert("click") 
  this.navCtrl.push(SearchPage) 
}


  ionViewDidLoad() {
    this.menuCtrl.close();
    console.log('ionViewDidLoad ImagazinespagePage');
  }
  views(i)
  {
    
    let loading=this.loadingCtrl.create({

      spinner: 'hide',
      content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
      cssClass: 'transparent'
    })
    Observable.of(loading).flatMap(loading=>loading.present())
          .flatMap(() => this.security.totalviews(i))
         .subscribe(data=>{
           loading.dismiss()
console.log(data);
         this.totalviews=data.total_views  
         this.total_share=data.total_share
 
         this.navCtrl.setRoot(ImagzinedetailPage,{data:this.contents,
          imageval:this.imageval,
          i:this.index,
          views:this.totalviews,
          total_share:this.total_share,
          paramsVar:this.contents[this.index].is_favorite
        }) 
         
          })
  }
  readmore(i){
    this.index=i
    this.contentid=this.contents[i].content_id 
this.views(this.contentid)
  }




  fabbtnclick(lkcount,index)
  {
    console.log(index)
    console.log(lkcount)
this.LikeCountTotal=lkcount
this.count++
if(this.count%2==0)
{ 
  this.showreaction=false
  this.LikeCountTotal=""
  var x=document.getElementById(index+'_y').style.marginLeft="156px"
}
else{
  this.jindex=index
var x=document.getElementById(index+'_y').style.marginLeft="0px"
  this.showreaction=true
let arrlen=this.LikeCountTotal.length;
for(let i=0;i<arrlen;i++)
{ 
  if(this.LikeCountTotal[i].like_id == 1)
  {
    this.ehappy=this.LikeCountTotal[i].total;
  }
  if(this.LikeCountTotal[i].like_id == 2)
  {
    this.eaww=this.LikeCountTotal[i].total;
  }
  if(this.LikeCountTotal[i].like_id == 3)
  {
    this.esad=this.LikeCountTotal[i].total;
  }
  if(this.LikeCountTotal[i].like_id == 4)
  {
    this.eangry=this.LikeCountTotal[i].total;
  }
  if(this.LikeCountTotal[i].like_id == 5)
  {
    this.elol=this.LikeCountTotal[i].total;
  }
  }
  }
  }




// Share Content 

  
WhatsAppShare(index)
{
  var options = {
    message: this.SocialSharemsg, // not supported on some apps (Facebook, Instagram)
    subject: this.contents[index].title, // fi. for email
    files: ['', ''], // an array of filenames either locally or remotely
    url: this.contents[index].share_url,
    chooserTitle: 'Pick an app', // Android only, you can override the default share sheet title,
    appPackageName: 'com.whatsapp' // Android only, you can provide id of the App you want to share with
  };  
  this.socialshare.shareWithOptions(options).then(()=>{ 
    this.type='whatsapp'; 
    this.ShareCount(index); 
    },
  (err)=>{
    this.type=""; 
    this.toastCtrl.create({ message: 'App is not installed, Please Download the app.', duration: 3000, position: 'top' }).present();
  })
}

InstagramShare(index)
{ 
  this.socialshare.shareViaInstagram(this.SocialSharemsg+this.contents[index].share_url,"")
  .then(()=>{
      this.type='instagram'
      this.ShareCount(index)
    },
    ()=>{
      this.type=""; 
      this.toastCtrl.create({ message: 'App is not installed ,Please Download the app.', duration: 3000, position: 'top' }).present();
    })
}
  
TumblrShare(index) 
{ 
 
}


twitterShare(index){
this.socialshare.shareViaTwitter(null,null,this.SocialSharemsg+this.contents[index].share_url)
.then(()=>{
    this.type='twitter'
    this.ShareCount(index)
  },
  ()=>{
    this.type=""; 
    this.toastCtrl.create({ message: 'App is not installed ,Please Download the app.', duration: 3000, position: 'top' }).present();
  })
}

facebookShare(index){
let MegShare=this.SocialSharemsg+this.contents[index].share_url;
  this.socialshare.shareViaFacebookWithPasteMessageHint(MegShare,null, null, 'Hold the Post input to paste message ').then((data)=>{
    this.type='facebook'
    this.ShareCount(index)
  }).catch((err)=>{
    this.type=""; 
    this.toastCtrl.create({ message: 'App is not installed ,Please Download the app.', duration: 3000, position: 'top' }).present();
  }); 
  

// this.socialshare.shareViaFacebook("Message via Facebook",null,this.SocialSharemsg+this.contents[index].share_url)
// .then(()=>{
//     this.type='facebook'
//     this.ShareCount(index)
//   },
//   ()=>{
//     this.type='twitter'
//     this.toastCtrl.create({ message: 'App is not installed ,Please Download the app.', duration: 3000, position: 'top' }).present();
//   }) 
  
  
}  



ShareCount(index){
let loading=this.loadingCtrl.create({
  spinner: 'hide',
  content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
  cssClass: 'transparent'
})  
Observable.of(loading).flatMap(loading=>loading.present())
      .flatMap(() => this.security.ShareCount(this.contents[index].content_id,this.type))
     .subscribe(data=>{
       loading.dismiss()
       this.sharetotal(index)
     })
} 


sharetotal(index){
let loading=this.loadingCtrl.create({
  spinner: 'hide',
  content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
  cssClass: 'transparent'
})
Observable.of(loading).flatMap(loading=>loading.present())
      .flatMap(() => this.security.Sharetotal(this.contents[index].content_id))
     .subscribe(data=>{
       loading.dismiss()
       
     })
}



  SurveyBtn(i)
  {
    this.navCtrl.push(SurveyPage,{SurveyId:this.contents[i].survey_id})
  }

  ContestBtn(i)
  {
    this.navCtrl.push(ContestquestPage,{data:this.contents[i].contest_id}) 
  }

  JoinEventBtn(EventId,index) {     
    console.log(EventId)   
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
      if(data.status == 1)  {
        this.EventBtnList=true;
        document.getElementById('btnclickEvent_'+index).style.display="none"
        document.getElementById('btnjoined_'+index).style.display="block"
        return;
      }
      if(data.status == 0)   {
        this.EventBtnList=false;  
        document.getElementById('btnclickEvent_'+index).style.display="block"
        return;
      }
    })
  }

 
}

  