import { Component } from '@angular/core';
import {Events, ModalController,IonicPage, NavController, NavParams,PopoverController,ActionSheetController,LoadingController, ToastController } from 'ionic-angular';
import{ReactionsPage}from'../reactions/reactions'
import { DomSanitizer, BrowserModule } from '@angular/platform-browser'
import{SocialSharing}from'@ionic-native/social-sharing'
import{SecurityProvider}from'../../providers/security/security'
import{Observable}from'rxjs/Rx'
import{CommentsilrPage}from'../commentsilr/commentsilr'
import{ImagazinespagePage}from'../imagazinespage/imagazinespage'
import{bigdata}from'../../app/models';
import { TimerObservable } from 'rxjs/observable/TimerObservable';   
import { Http, Headers , RequestOptions } from '@angular/http';


/**
 * Generated class for the ImagzinedetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()   
@Component({
  selector: 'page-imagzinedetail',
  templateUrl: 'imagzinedetail.html',
})
export class ImagzinedetailPage {
 
data
htmledittexts
i
type
totalviews
total_share
reactions
fav
paramsVar
totalcomment
comments
show:boolean

items: any = [];
itemExpandHeight: number = 100;
hide:boolean = false;
msginput:any;
UpImgUsr:any;
public todoList: Array<string>;
todoItem:any;
totalLike:any;
chattimes
timertime:number=0;
popover
public countlike:number
emoji1
emoji2
emoji3
emoji4
emoji5
heart:boolean
isfav

HostName
badwordlist:any=[];

CommentsAbsuse:boolean = false;
constructor(public modalCtrl:ModalController,public security:SecurityProvider,public loadingCtrl:LoadingController,public socialshare:SocialSharing,public actionCtrl:ActionSheetController,public santizer: DomSanitizer,public navCtrl: NavController, public navParams: NavParams,private popoverCtrl: PopoverController,public toastCtrl: ToastController,public events: Events,public bdata:bigdata,public http:Http) {

  this.HostName=this.security.Hostname();  

  let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
  let requestOptions=new RequestOptions({headers:headers})
  let param=JSON.stringify( {
    user_id:localStorage['USERID'],
    token:localStorage['token']
  })      
  this.http.post(this.HostName+'/abusiveWordList',param,requestOptions )
  .subscribe((data)=>{
    if(JSON.parse((<any>data)._body).status==1){
      this.badwordlist=JSON.parse((<any>data)._body).abusive_words
    }
  },err=> {    }) 


  window.addEventListener("contextmenu", (e) => { 
    e.preventDefault();
   });
   this.paramsVar=this.navParams.get('paramsVar')
this.data=this.navParams.get("data")
this.i=this.navParams.get('i')
this.countlike=this.data[this.i].likesCount

this.emoji1=this.data[this.i].likesCount[0].total
this.emoji2=this.data[this.i].likesCount[1].total
this.emoji3=this.data[this.i].likesCount[2].total
this.emoji4=this.data[this.i].likesCount[3].total
this.emoji5=this.data[this.i].likesCount[4].total
this.isfav=this.data[this.i].is_favorite
console.log('fav'+this.isfav)
if(this.isfav==0)
{
  console.log('unfav')
this.heart=false
}
else if(this.isfav==1){
this.heart=true
}


this.htmledittexts = santizer.bypassSecurityTrustHtml(this.data[this.i].content)
setTimeout(()=>{
this.like()
},50)


this.totalviews=this.navParams.get("views")
this.total_share=this.navParams.get("total_share")
this.totalcomment=this.data[this.i].comment.length;
this.comments=this.data[this.i].comment;
console.log(this.comments)
this.items = [
{expanded: false},
{expanded: false}
];

console.log(this.navParams.get("imageval"));
this.UpImgUsr=this.navParams.get("imageval");  
this.viewss();

}


changefontsize(id) {
  var textfont=document.getElementById('content_data').getElementsByTagName('p');
  textfont[0].style.fontSize=id+'px'
  // var allImages = document.getElementById('content_data').getElementsByTagName('img');
}
 
tap() {
  this.popover=true
  // let profileModal = this.modalCtrl.create(FontchangepopoverPage, { userId: 8675309 });
  // profileModal.present();
  // var myEvent
  // let popover = this.popoverCtrl.create(FontchangepopoverPage);
  // popover.present({
  //   ev: myEvent
  // });
}

ionViewWillLeave()
{     
  let loading=this.loadingCtrl.create({   
    spinner: 'hide',
    content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
    cssClass: 'transparent'
     })
  Observable.of(loading=>loading.present())
  .flatMap(()=>this.security.ArticleTrack(this.data[this.i].content_id,this.timertime))
  .subscribe(data=>{
   
    loading.dismiss()
      console.log("leavesss===",data);
      if(data.status==1)
      {

      }
  },err=>{loading.dismiss();}) 
  this.chattimes.unsubscribe();
}
ionViewWillEnter()
{  
  this.chattimes =TimerObservable.create(0, (1000)).subscribe(t => {  this.timertime=t;  });
  // this.showReactions()
}




expandItem1(){
  this.hide = !this.hide;
}

expandItem(item){
  this.items.map((listItem) => {
      if(item == listItem){
          listItem.expanded = !listItem.expanded;
      } else {
          listItem.expanded = false;
      }
      return listItem;
  });
}

navigatetocomment() {  
this.navCtrl.push(CommentsilrPage,{comments:this.data[this.i].comment})
}

msgclick() {
console.log(this.UpImgUsr);
if(this.msginput==undefined || this.msginput=="") {
  this.toastCtrl.create({  message: `Comment is required.`, duration: 4000  }).present(); return;
}
  
this.CommentsAbsuse=false;  
this.badwordlist.forEach((num,index) => {     
  var jar=RegExp(this.badwordlist[index],'gi')
    if(this.msginput.search(jar)!=-1) {
      this.CommentsAbsuse=true;
      return ;
    }  
})   
if(this.CommentsAbsuse){
  this.toastCtrl.create({ message: "*You can't use such type of words.", duration: 3000, position: 'top' }).present(); 
  return;
}




this.todoItem= { "comment": this.msginput,
  "content_id":this.data[this.i].content_id,
  "createdDate":"2018-05-23 18:50:19",
  "id":"",
  "user_id":localStorage['USERID'],
  "user_image":this.UpImgUsr,
  "first_name":this.bdata.userdata.first_name
}


  let loading=this.loadingCtrl.create({   
    spinner: 'hide',
    content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
    cssClass: 'transparent'
     })
  Observable.of(loading=>loading.present())
  .flatMap(()=>this.security.addComment(this.data[this.i].content_id,this.msginput))
  .subscribe(data=>{
    loading.dismiss()
      console.log(data);
      this.toastCtrl.create({  message: data.message, duration: 3000  }).present();
          this.msginput="";
      this.data[this.i].comment.push(this.todoItem);
      console.log(this.data[this.i].comment.length);
      this.totalcomment=this.data[this.i].comment.length;
 
  },err=>{loading.dismiss();}) 
  
}

contentFav()
{
let loading=this.loadingCtrl.create({   
  spinner: 'hide',
  content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
  cssClass: 'transparent'
  })
Observable.of(loading=>loading.present())
.flatMap(()=>this.security.favoriteContent(this.data[this.i].content_id))
.subscribe(data=>{
  loading.dismiss()
    console.log(data);
    this.paramsVar=data.is_favorite;
    if(this.paramsVar==0)
    {
      this.heart=false
    }
    else{
      this.heart=true
    }
}) 
}

showReactions(){
let ev

  let reactions = this.popoverCtrl.create(ReactionsPage,{content_id:this.data[this.i].content_id});
reactions.present({  ev: ev });
}



likes(ev){
 let loading=this.loadingCtrl.create({  
  spinner: 'hide',
  content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
  cssClass: 'transparent'
   })
 Observable.of(loading=>loading.present())
 .flatMap(()=>this.security.contentLikeAdd(this.data[this.i].content_id,"6"))
 .subscribe(data=>{
   loading.dismiss()
     console.log(data);
 }) 



}
viewss()
{
let loading=this.loadingCtrl.create({  
  spinner: 'hide',
  content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
  cssClass: 'transparent'
   })
Observable.of(loading=>loading.present())
.flatMap(()=>this.security.contentLikeView(this.data[this.i].content_id))
.subscribe(data=>{
  loading.dismiss()
    console.log(data);
    this.totalLike=data.total_likes.length;
}) 
}


ionViewDidLoad() {
  console.log('ionViewDidLoad ImagzinedetailPage');

}



like(){
 var allImages = document.getElementById('content_data').getElementsByTagName('img');
 for(var i = 0; i < allImages.length ; i++) {
   allImages[i].style.width = '100%';
   allImages[i].style.height = '100%';
 }
 var videoFrame = (<HTMLElement>document.querySelector("#content_data iframe"));
 if(videoFrame){
     videoFrame.style.width="100%";
 }
}

// Share content 

sharevia()
{
let actionsheet=this.actionCtrl.create({
title: 'Share Content!',
  buttons: [{
    text: 'Share Via Twitter',
    handler: () => {
    this.twitterShare()
    },
  },
  {
    text: 'Share Via Facebook',
    handler: () => {
    
      this.facebookShare()
    }}  ,
    {
      text: 'Share Via WhatsApp',
      handler: () => {  this.WhatsAppShare()  }
    }  ,
    {
      text: 'Share Via Instagram',
      handler: () => {  this.InstagramShare()  }
    }
]
})
actionsheet.present()
}



WhatsAppShare()
{
  this.socialshare.shareViaWhatsApp("Message via WhatsApp ",null,this.data[this.i].share_url)
  .then(()=>{
      this.type='whatsapp'
      this.ShareCount()
    },
    ()=>{
      this.type='twitter'
       alert("App is not available")
    })
}

InstagramShare()
{
  this.socialshare.shareViaInstagram("Message via Instagram",this.data[this.i].share_url)
  .then(()=>{
      this.type='instagram'
      this.ShareCount()
    },
    ()=>{
      this.type='twitter'
       alert("App is not available")
    })
}

TumblrShare()
{
  this.socialshare.canShareVia('com.tumblr', "Message via Tumblr", null, this.data[this.i].share_url)
  .then((data) =>{      
   this.type='tumblr';
  this.ShareCount();    
})
  .catch((err) =>  {   alert("App is not available")   });
}


twitterShare(){
this.socialshare.shareViaTwitter("Message via Twitter",null /*Image*/,this.data[this.i].share_url)
.then(()=>{
    this.type='twitter'
    this.ShareCount()
  },
  ()=>{
    this.type='twitter'
     alert("App is not available")
  })
}



facebookShare(){
this.socialshare.shareViaFacebook("Message via Twitter",null /*Image*/,this.data[this.i].share_url)
.then(()=>{
    this.type='facebook'
    this.ShareCount()
  },
  ()=>{
    this.type='twitter'
     alert("App is not available")
  })
}



ShareCount()
{
let loading=this.loadingCtrl.create({
  spinner: 'hide',
  content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
  cssClass: 'transparent'
})
Observable.of(loading).flatMap(loading=>loading.present())
      .flatMap(() => this.security.ShareCount(this.data[this.i].content_id,this.type))
     .subscribe(data=>{
       loading.dismiss()
       this.sharetotal()
     })


}
sharetotal(){
let loading=this.loadingCtrl.create({
  spinner: 'hide',
  content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
  cssClass: 'transparent'
})
Observable.of(loading).flatMap(loading=>loading.present())
      .flatMap(() => this.security.Sharetotal(this.data[this.i].content_id))
     .subscribe(data=>{
       loading.dismiss()
       
     })
}
share(reactions){
  let loading=this.loadingCtrl.create({ spinner: 'hide',
  content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
  cssClass: 'transparent'})
  Observable.of(loading).flatMap(loading=>loading.present())
        .flatMap(() => this.security.contentLikeAdd(this.data[this.i].content_id,reactions))
       .subscribe(data=>{
         loading.dismiss()
      if(reactions==1)
      {
        this.emoji1=1
        this.emoji2=0
        this.emoji3=0
        this.emoji4=0
        this.emoji5=0
       }
      else if(reactions==5)
      {
        this.emoji1=0
        this.emoji2=1
        this.emoji3=0
        this.emoji4=0
        this.emoji5=0
      }
     else if(reactions==2)
      {
        this.emoji1=0
        this.emoji2=0
        this.emoji3=1
        this.emoji4=0
        this.emoji5=0
      }
    else  if(reactions==3)
      {
        this.emoji1=0
        this.emoji2=0
        this.emoji3=0
        this.emoji4=1
        this.emoji5=0
      }
     else if(reactions==4)
      {
        this.emoji1=0
        this.emoji2=0
        this.emoji3=0
        this.emoji4=0
        this.emoji5=1
      }






       })
}

backbutton()
{
  console.log(localStorage['USERID'])
  this.navCtrl.setRoot(ImagazinespagePage)

}

commentsAbuse(val){
  if(val != ""){

  this.badwordlist.forEach((num,index) => {     
    var jar=RegExp(this.badwordlist[index],'gi')
      if(val.search(jar)!=-1) {
        this.toastCtrl.create({ message: "*You can't use such type of words.", duration: 3000, position: 'top' }).present(); 
      }     
    })

  }       
}


}
