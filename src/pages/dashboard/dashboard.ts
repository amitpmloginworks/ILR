import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController,Platform,AlertController, NavParams,LoadingController,Slides, MenuController } from 'ionic-angular';
import{Choiceperferncepage2Page}from'../choiceperferncepage2/choiceperferncepage2'
import{Observable}from'rxjs/Rx'
import{SecurityProvider}from'../../providers/security/security'
import{bigdata}from'../../app/models'
/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  @ViewChild(Slides) slides: Slides;
  magazine_list
  accepted
  signupdata
  user_relation
  parentpic
  user_magazine=[]
  magazine_name=[]
  buttonDisabled
  magazine_name1=[]

  count=0;
  borderColor:any;
  constructor(public platform:Platform, public alertCtrl:AlertController,public bigdata:bigdata,public security:SecurityProvider,public navCtrl: NavController, public navParams: NavParams,public loadingCtrl:LoadingController,public menuCtrl:MenuController) {
 this.accepted=this.navParams.get("accepted")
this.signupdata=this.navParams.get("signupdata")
 this.user_relation=this.navParams.get("user_relation")
 this.parentpic=this.navParams.get("parentpic")
this.buttonDisabled=true


  // Register for android's system back button
  let backAction = platform.registerBackButtonAction(() => {
    let alert=this.alertCtrl.create({
      title: 'Exit?',
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
   
      let loading=this.loadingCtrl.create({
        spinner: 'hide',
          content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
          cssClass: 'transparent'
       })
       Observable.of(loading).flatMap(loading=>loading.present())
       .flatMap(()=>this.security.magzinelist())   
       .subscribe(data=>{
        loading.dismiss()  
         this.magazine_list=data.magazine_list
         console.log(data)
       },err=>{    loading.dismiss() ; })

  }
 
  tapcard(id)
  {
var magazine_id=id+1
 this.user_magazine.push({
  magazine_id:magazine_id
 })

this.magazine_name.push({
  name:this.magazine_list[id].name
})

this.bigdata.magazine_name=this.magazine_name

var str=this.magazine_list[id].name
var res=str.toUpperCase()
this.magazine_name1.push({
  name:res
})


localStorage["magzine_name"]=JSON.stringify(this.magazine_name1)
this.buttonDisabled=false



  }
  next()
  {
    console.log('name..'+JSON.stringify(this.magazine_name1))

for(var i=0;i<this.magazine_list.length;i++)
{
  
var x=document.getElementById('x_'+i)
x.style.border
console.log(i+'+'+x.style.border)
if(x.style.border=="2px solid red")
{
  var magazine_id=i+1;
      this.user_magazine.push({
        magazine_id:magazine_id
        })

       this.magazine_name.push({
       name:this.magazine_list[i].name
     })

        this.bigdata.magazine_name=this.magazine_name

        var str=this.magazine_list[i].name
        var res=str.toUpperCase()
        this.magazine_name1.push({
       name:res
       })

 console.log('hi'+JSON.stringify(this.magazine_name1))


}


}
localStorage["magzine_name"]=JSON.stringify(this.magazine_name1)

    this.navCtrl.setRoot(Choiceperferncepage2Page,{accepted:this.accepted,
  signupdata:this.signupdata,
  user_relation:this.user_relation,
  user_magazine:this.user_magazine,parentpic:this.parentpic
})
  }


  onScroll(event)
  {
    console.log('Scroll');
  }

  slideChanged() {
   
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
   
  }

  goToNextSlide() {
    let currentIndex = this.slides.getActiveIndex();
    
      var index= currentIndex+1;
    this.slides.slideTo(index, 500);
  }
  goToPrevious(){
    let currentIndex = this.slides.getActiveIndex();
    var index= currentIndex-1;
  this.slides.slideTo(index, 500);
  }

  selectedImage(index){

    console.log("index ", index);
    this.borderColor=document.getElementById('x_'+index).style.border;
    console.log("color", this.borderColor);
    if(this.borderColor =="none"){
      console.log('if');
      this.count=this.count+1
      console.log('count',this.count);
       this.borderColor=document.getElementById('x_'+index).style.border="2px solid red";
    }
    
    else if(this.borderColor=="" || this.borderColor =="2px solid white"){
      console.log('else if');
      this.count=this.count+1
      console.log('count',this.count);
      this.borderColor=document.getElementById('x_'+index).style.border="2px solid red";
       this.buttonDisabled=false;
    }
    else if(this.borderColor=="2px solid red"){
      this.count=this.count-1
      console.log('count',this.count);
      this.borderColor=document.getElementById('x_'+index).style.border="2px solid white";
       if(this.count==0){
         this.buttonDisabled=true;
      }
    else{
      this.buttonDisabled=false; 
    } 
    }
  }

  test(){
    var x=document.getElementById('change').style.backgroundColor="blue";  
    console.log('test')
  }

  ionViewWillEnter () {
    console.log("Menu is restricted to open");
    this.menuCtrl.swipeEnable( false, 'menu2' ); 
    }


}
