import { Component } from '@angular/core';
import { IonicPage,Platform,AlertController, NavController, NavParams ,LoadingController, MenuController, ToastController } from 'ionic-angular';
import{SecurityProvider}from'../../providers/security/security';
import{Observable}from'rxjs/Rx';
import{bigdata}from'../../app/models';
import{ImagzinedetailPage}from'../imagzinedetail/imagzinedetail';
import{ContestquestPage}from'../contestquest/contestquest';
import{SurveyPage}from'../survey/survey';
import { SelectSearchableComponent } from 'ionic-select-searchable';

import{SocialSharing}from'@ionic-native/social-sharing'

/**
 * Generated class for the TexttypepagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-texttypepage',
  templateUrl: 'texttypepage.html',
})
export class TexttypepagePage {
UsrTxtType
TxtTypeSelect

contents
  contentid
  totalviews
  index
  total_share
  ehappy:number=0;
  eaww:number=0;
  esad:number=0;
  eangry:number=0;
  elol:number=0;

  showreaction:boolean
  count=0
  jindex
  LikeCountTotal
  imageval

  SocialSharemsg 
  type:any="";  
  constructor(public alertCtrl:AlertController, public platform:Platform,public loadingCtrl:LoadingController,public security:SecurityProvider,public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController,public bdata:bigdata,public toastCtrl:ToastController, public socialshare:SocialSharing) {

    this.SocialSharemsg='Hello, '+this.bdata.userdata.first_name+' finds this article interesting, and he/she thinks that you may like it too. Before you can view the content, please sign up a trial account for 14 days.';

    
    let loading=this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
      cssClass: 'transparent'
    }) 
    Observable.of(loading).flatMap(loading=>loading.present())
    .flatMap(() => this.security.contentNatureListSecond())
           .subscribe(data=>{
             loading.dismiss()
            //  let obj=data.text_type_list;   
            //  let field='name';       
          //    console.log(obj.sort((a, b) => (a[field] || "").toString().localeCompare((b[field] || "").toString()))); 
          //  this.UsrTxtType=obj.sort((a, b) => (a[field] || "").toString().localeCompare((b[field] || "").toString())); 
          this.UsrTxtType=data.text_type_list;   
        },err => { loading.dismiss(); })


  //this.UsrTxtType=this.bdata.UsrTextType

this.imageval=this.bdata.userdata.user_image;
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
  }

  onChangeTxtType()
  {
    let loading=this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
      cssClass: 'transparent'
    })
    Observable.of(loading).flatMap(loading=>loading.present())
          .flatMap(() => this.security.getContentsTexttype(this.TxtTypeSelect))
         .subscribe(data=>{
           loading.dismiss()
           console.log("Get==",data) 
           if(data.status==0){
            this.contents="";
            this.toastCtrl.create({ message: data.message, duration: 3000, position: 'top' }).present(); 
             return;
           }
           if(data.status==1) {
            this.contents=data.contents;
             return;
           }
          })
  }


  fabbtnclick(lkcount,index)
  {
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
  portChange(event: { component: SelectSearchableComponent, value: any }) {

    var getContentId=[]
  for(var i=0;i<event.value.length;i++)
  {
console.log(''+event.value[i].id)
  getContentId.push(event.value[i].id)
  console.log('getContentId',getContentId)
  }
  let loading=this.loadingCtrl.create({
    spinner: 'hide',
    content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
    cssClass: 'transparent'
  }) 
  Observable.of(loading).flatMap(loading=>loading.present())  
        .flatMap(() => this.security.getContentsTexttype(getContentId))
       .subscribe(data=>{ 
         loading.dismiss()
         console.log("Nature===",data)
         if(data.status==0) {
          this.contents="";
          this.toastCtrl.create({ message: data.message, duration: 3000, position: 'top' }).present(); 
           console.log(data.message)
           return;
         }
         if(data.status==1){
          this.contents=data.contents;
           return;
         }
        })

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
        this.navCtrl.setRoot(TexttypepagePage)
          console.log(data);
          
      }) 
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

  SurveyBtn(i)
  {
    this.navCtrl.push(SurveyPage,{SurveyId:this.contents[i].survey_id})
  }

  ContestBtn(i)
  {
    this.navCtrl.push(ContestquestPage,{data:this.contents[i].contest_id}) 
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



   

  ionViewDidLoad() {
    console.log('ionViewDidLoad TexttypepagePage');
  }

}
