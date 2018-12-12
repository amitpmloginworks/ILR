import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, MenuController,NavParams,LoadingController,Slides, ModalController } from 'ionic-angular';
import{ChoiceofperferencePage}from'../choiceofperference/choiceofperference'
import{Observable}from'rxjs/Rx'
import{SecurityProvider}from'../../providers/security/security'
import { AnimationService, AnimationBuilder } from 'css-animator';

/**
 * Generated class for the Choiceperferncepage2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-choiceperferncepage2',
  templateUrl: 'choiceperferncepage2.html',
})
export class Choiceperferncepage2Page { 
  @ViewChild('myElement') myElem;
  private animator: AnimationBuilder;
  @ViewChild(Slides) slides: Slides;
  sciselection:boolean
  artsselection:boolean
  sportsselection:boolean
  travelselection:boolean
  jokesselection:boolean

  content_list
selectnumber:number


accepted
signupdata
user_relation
parentpic
user_content_nature=[]

content_id
user_magazine

buttonDisabled
borderColor:any;
count
mySlideOptions = {
  initialSlide: 1,
  loop: true
};
ShowPreview:boolean
count1=0
arraytemp
BtnDisable:boolean=true;
  constructor(public menuCtrl:MenuController,public animationService: AnimationService,public security:SecurityProvider, public modalCtrl:ModalController, public loadingCtrl:LoadingController,public navCtrl: NavController, public navParams: NavParams) {
this.arraytemp=[];
    this.animator = animationService.builder();
    this.sciselection=false
    this.artsselection=false
    this.sportsselection=false
    this.travelselection=false
    this.jokesselection=false
        // Getting value from previous page..
    this.accepted=this.navParams.get('accepted')
    this.signupdata=this.navParams.get('signupdata')
    this.user_relation=this.navParams.get('user_relation')
    this.user_magazine=this.navParams.get('user_magazine')
    this.parentpic=this.navParams.get('parentpic')
    
    console.log(this.navParams.get('accepted'))
    console.log(this.navParams.get('signupdata'))
    console.log(this.navParams.get('user_relation'))
    console.log(this.navParams.get('user_magazine'))
    
    this.buttonDisabled=true
    this.animator = animationService.builder();

  }

  // ionViewWillEnter () {
  //   console.log("Menu is restricted to open");
  //   this.menuCtrl.swipeEnable( false, 'menu2' ); 
  //   }

    ionViewDidEnter() {
      this.menuCtrl.swipeEnable(false);
    }
    ionViewWillLeave() {     
      this.menuCtrl.swipeEnable(true);
     }

  ionViewDidLoad() {   
        // Calling Text type API   .. 
    let loading=this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
      cssClass: 'transparent'
    })
    Observable.of(loading).flatMap(loading=>loading.present())
    .flatMap(()=>this.security.contentNatureList())
    .subscribe(data=>{
      loading.dismiss()
      console.log(data)
      this.content_list=data.content_list
        


    })

  }
  
  
  goToNextSlide() {
    let currentIndex = this.slides.getActiveIndex();
    
      var index= currentIndex+1;
    this.slides.slideTo(index, 500);
  }
  contentid(id)
  {
    this.content_id=id+1

    this.user_content_nature.push({
      content_id:this.content_id
    })
    this.buttonDisabled=false

  }
selectintrest(i)
{
if(i==0)
{
this.sciselection=true
}
if(i==1)
{
this.sciselection=true
}
else if(i==2)
{
this.artsselection=true
}
else if(i==3)
{
  this.sportsselection=true
}
else if(i==4)
{
  this.travelselection=true
}

}

next(){
  this.arraytemp.forEach( (item, index) => {
    this.content_id=item+1;
    this.user_content_nature.push({ content_id:this.content_id });
  });
this.navCtrl.setRoot(ChoiceofperferencePage,{
  accepted:this.accepted,
  signupdata:this.signupdata,
  user_relation:this.user_relation,
  user_content_nature:this.user_content_nature,
  user_magazine:this.user_magazine,parentpic:this.parentpic
})
}


SkipBtn(){
  this.navCtrl.setRoot(ChoiceofperferencePage,{
    accepted:this.accepted,
    signupdata:this.signupdata,
    user_relation:this.user_relation,
    user_content_nature:this.user_content_nature,
    user_magazine:this.user_magazine,parentpic:this.parentpic
  })
}

  
selectedImage(index){
  this.borderColor=document.getElementById('x_'+index).style.border;
  if(this.borderColor =="none"){
    this.count=this.count+1
     this.borderColor=document.getElementById('x_'+index).style.border="3px solid black";
   
  }
  else if(this.borderColor=="3px solid black"){
    this.count=this.count-1
    this.borderColor=document.getElementById('x_'+index).style.border="";
    if(this.count==0){
      this.buttonDisabled=true;
        

   }
 else{
   this.buttonDisabled = false;
   
 }
  }

  else if(this.borderColor=="" || this.borderColor == "3px solid black"){
    this.count=this.count+1;
    this.borderColor = document.getElementById('x_'+index).style.border="3px solid black";
     this.buttonDisabled=false;
     this.content_id=index+1
     this.user_content_nature.push({
       content_id:this.content_id
     })   
  }
}


       showImage(id){
     
         var checkstatus=0;
          var x
    for(var i=0;i<this.content_list.length;i++)
    {
      if(id==i)
      {
      if(this.arraytemp.length==0){
    setTimeout(()=>{  this.animator.setType('flipOutY').show(document.getElementById('y_'+id));  },10);
    x=document.getElementById('z_'+id);
    x.style.boxShadow='-2px 2px 27px';
    this.arraytemp.push(id);
   
    this.BtnDisable=false;
      }
      else{
       
        this.arraytemp.forEach((item, index) => {
          if(item === id)  { 
            this.arraytemp.splice(index,1);
            x=document.getElementById('z_'+id);
             x.style.boxShadow='none';
          checkstatus=1; 
           }
        });
        if(this.arraytemp.length==0){ this.BtnDisable=true; }
      if(checkstatus==0)
      {
        this.BtnDisable=false;
        setTimeout(()=>{  this.animator.setType('flipOutY').show(document.getElementById('y_'+id));  },10);
          x=document.getElementById('z_'+id);
          x.style.boxShadow='-2px 2px 27px';
          this.arraytemp.push(id);
      }
      }
    }   
  }
}


slideChanged() {
  let currentIndex = this.slides.getActiveIndex();
  console.log(currentIndex)
  if(currentIndex==3){
    this.slides.stopAutoplay();
  }
}




}
