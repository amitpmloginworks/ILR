import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, Alert } from 'ionic-angular';
import{SecurityProvider}from'../../providers/security/security';
import{Observable}from'rxjs/Rx';
import{ImagzinedetailPage}from'../imagzinedetail/imagzinedetail'
import{bigdata}from'../../app/models';
import { SpeechRecognition } from '@ionic-native/speech-recognition';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  chooseLibrarybox='Icons'
  imagzine
  inspiremagzine
  inspiremagzine1
  imagzine1
  ithinkmagzine1
  ithinkmagzine
  items;
  index
  contentid
  totalviews
  total_share
  imageval
  contents
  constructor(public loadingCtrl:LoadingController,public security:SecurityProvider,public navCtrl: NavController, public navParams: NavParams,public bdata:bigdata,private speechRecognition: SpeechRecognition) {
    this.imageval=this.bdata.userdata.user_image;
    this.imagzine=[]
    this.inspiremagzine=[]
    this.ithinkmagzine=[]
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
           for(var i=0;i<this.contents.length;i++)
  {
    if(this.contents[i].content_id==this.contents[i].content_id)
    {
    if(this.contents[i].magazine_name=="i")
    {
     if(this.contents[i].image=="")
     {
      this.contents[i].image="assets/imgs/NoImageAvailable.jpg"
     }
  this.imagzine.push({'index':i,'fav':this.contents[i].is_favorite,'imageval':this.imageval,'contents':this.contents,'content_id':this.contents[i].content_id,'image':this.contents[i].image,'title':this.contents[i].title})     
    }
    else if(this.contents[i].magazine_name=="Inspire")
    {
      if(this.contents[i].image=="")
     {
      this.contents[i].image="assets/imgs/NoImageAvailable.jpg"
     
     }
     this.inspiremagzine.push({'index':i,'fav':this.contents[i].is_favorite,'imageval':this.imageval,'contents':this.contents,'content_id':this.contents[i].content_id,'image':this.contents[i].image,'title':this.contents[i].title})
    }
    else if(this.contents[i].magazine_name=="iThink")
    {
      if(this.contents[i].image=="")
     {
      this.contents[i].image="assets/imgs/NoImageAvailable.jpg"
     }
      this.ithinkmagzine.push({'index':i,'fav':this.contents[i].is_favorite,'imageval':this.imageval,'contents':this.contents,'content_id':this.contents[i].content_id,'image':this.contents[i].image,'title':this.contents[i].title})
    }
  } 
  } 


})
  this.imagzine1=this.imagzine
  this.inspiremagzine1=this.inspiremagzine
 this.ithinkmagzine1=this.ithinkmagzine
this.initializeItems();
this.initializeItems1();
this.initializeItems2();



this.speechRecognition.hasPermission()
.then((hasPermission: boolean) => {

  if (!hasPermission) {
  this.speechRecognition.requestPermission()
    .then(
      () => console.log('Granted'),
      () => console.log('Denied')
    )
  }

});




  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  initializeItems()
  {
    this.imagzine=this.imagzine1
  }
  initializeItems1()
  {
   this.inspiremagzine=this.inspiremagzine1

   console.log('inspire'+JSON.stringify(this.inspiremagzine))
  }
  initializeItems2()
  {
  this.ithinkmagzine=this.ithinkmagzine1
  }
  readmore(i){
    
    this.index=this.inspiremagzine[i].index
    this.contentid=this.inspiremagzine[i].content_id
 
this.views(this.contentid,i)
  }

  readmore1(i)
{
  this.index=this.imagzine[i].index
   console.log('hope'+JSON.stringify(this.imagzine))
    this.contentid=this.imagzine[i].content_id
 
this.views1(this.contentid,i)
}

readmore2(i)
{
  this.index=this.ithinkmagzine[i].index
   this.contentid=this.ithinkmagzine[i].content_id
this.views2(this.contentid,i)
}
views2(i,index)
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
          paramsVar:this.ithinkmagzine[index].fav

    
        }) 
         
          })
  }
views1(i,index)
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
          paramsVar:this.imagzine[index].fav

    
        }) 
         
          })
  }

  views(i,index)
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
          paramsVar:this.inspiremagzine[index].fav
        }) 
          })
  }


  SpeechBtn() 
  {
    this.speechRecognition.startListening()
    .subscribe(
      (matches: Array<string>) => {

        alert(JSON.stringify(matches));
         
        if(this.chooseLibrarybox=='Backgrounds')
        {
          this.initializeItems();
        var val = matches[0];
    
    
        if (val && val.trim() != '') {
          this.imagzine = this.imagzine.filter((item) => {
            return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
         }
         }
         else if(this.chooseLibrarybox=='Icons')
         {
          this.initializeItems1();
          var val = matches[0];
      
      
          if (val && val.trim() != '') {
            this.inspiremagzine = this.inspiremagzine.filter((item) => {
              return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
         }
        }
         else if(this.chooseLibrarybox=='Images')
         {
          this.initializeItems2();
          var val =matches[0];
      
      
          if (val && val.trim() != '') {
            this.ithinkmagzine = this.ithinkmagzine.filter((item) => {
              return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
         }
        }


      },
      (onerror) => {console.log('error:', onerror);
      this.initializeItems();
this.initializeItems1();
this.initializeItems2();
return;
    }
    )
  }




  getItems(ev) {
    // Reset items back to all of the items

if(ev.target.value.length==0)
{
  this.initializeItems();
this.initializeItems1();
this.initializeItems2();
return;

}
    

    // set val to the value of the ev target
    if(this.chooseLibrarybox=='Backgrounds')
    {
      this.initializeItems();
    var val = ev.target.value;


    if (val && val.trim() != '') {
      this.imagzine = this.imagzine.filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
     }
     }
     else if(this.chooseLibrarybox=='Icons')
     {
      this.initializeItems1();
      var val = ev.target.value;
  
  
      if (val && val.trim() != '') {
        this.inspiremagzine = this.inspiremagzine.filter((item) => {
          return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
     }
    }
     else if(this.chooseLibrarybox=='Images')
     {
      this.initializeItems2();
      var val = ev.target.value;
  
  
      if (val && val.trim() != '') {
        this.ithinkmagzine = this.ithinkmagzine.filter((item) => {
          return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
     }
    }
    
  }


  ionViewWillLeave() { 
     this.imagzine=[]
  this.inspiremagzine=[]
this.ithinkmagzine=[]

 this.imagzine1=[]
 this.inspiremagzine1=[]
  this.ithinkmagzine1=[]
     }
 
 
  





}
