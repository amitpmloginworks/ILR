import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,Slides } from 'ionic-angular';
import{Observable}from'rxjs/Rx'
import{SecurityProvider}from'../../providers/security/security'
import{bigdata}from'../../app/models'
import{SubscribeNowPage}from'../subscribe-now/subscribe-now';
import * as moment from 'moment';
import{TeachersubscribePage}from'../teachersubscribe/teachersubscribe';

/**
 * Generated class for the TeacherrenewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teacherrenew',
  templateUrl: 'teacherrenew.html',
})
export class TeacherrenewPage {
  @ViewChild(Slides) slides: Slides;
  magazine_list
 
  user_magazine=[]
  magazine_name=[]
  buttonDisabled
  magazine_name1=[]

  count=0;
  borderColor:any;
  DataArr=[];

  MagazineName
  MagazineExpiry
  FirstName
  SubscribeDates=[];
  ExpDates=[];
  MagName=[];
  UpImgUsr 
  constructor(public bigdata:bigdata,public security:SecurityProvider,public navCtrl: NavController, public navParams: NavParams,public loadingCtrl:LoadingController) {
    this.buttonDisabled=true
this.FirstName=this.bigdata.userdata.first_name
this.UpImgUsr=this.bigdata.userdata.user_image
this.SubscribeDates=this.navParams.get("SubscribeDates");

this.DataArr=[
{image:"https://88.198.133.25/ILR_dev/uploads/magazine/fa6c117bfd18aaf2f762355459e6247f.png",name:"I",expiry_date:"17 Jul 2019" },
{image:"https://88.198.133.25/ILR_dev/uploads/magazine/a2a590b416d4ed6cad029f33bcd0e2f4.png",name:"IThink",expiry_date:"18 Jul 2019"},{image:"https://88.198.133.25/ILR_dev/uploads/magazine/68e49d58957d070d33c15fd6f95ba5a8.png",name:"Inpiry",expiry_date:"19 Jul 2019"}
]


for(let i=0;i<this.SubscribeDates.length;i++)
{
  let SubExpSplit=moment(this.SubscribeDates[i].expiry_date).format('DD MMM YYYY');
this.MagName.push(this.SubscribeDates[i].magazine_name)
this.MagazineExpiry=SubExpSplit.toString()
}


this.MagazineName=this.MagName.toString()

console.log("DataArr==",this.DataArr)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherrenewPage');
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
     })
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
 

  selectedImage(index,magID){
    console.log("index ", index);
    console.log("magID ", magID);
    this.borderColor=document.getElementById('x_'+index).style.border;
    console.log("color", this.borderColor);
    if(this.borderColor =="none"){
      this.count=this.count+1
      console.log('count',this.count);
       this.borderColor=document.getElementById('x_'+index).style.border="2px solid #de0c0c";
    }
    else if(this.borderColor=="" || this.borderColor =="2px solid silver"){
      console.log('else if');
      this.count=this.count+1
      console.log('count',this.count);
      this.borderColor=document.getElementById('x_'+index).style.border="2px solid #de0c0c";
      var magazine_id=index+1;
      this.user_magazine.push({
        magazine_id:magazine_id
        })
       
       this.magazine_name.push({
       name:this.magazine_list[index].name
     })
        this.bigdata.magazine_name=this.magazine_name
        var str=this.magazine_list[index].name
        var res=str.toUpperCase()
        this.magazine_name1.push({
       name:res
       })
       
       localStorage["magzine_name"]=JSON.stringify(this.user_magazine)
       console.log('data',this.user_magazine);
       this.buttonDisabled=false;
    }
    else if(this.borderColor=="2px solid rgb(222, 12, 12)"){
      this.count=this.count-1
      console.log('count',this.count);
      this.borderColor=document.getElementById('x_'+index).style.border="2px solid silver";
       if(this.count==0){
         this.buttonDisabled=true;
      }
    else{
      this.buttonDisabled=false;
    }
      console.log('else');
    }
  }

  test(){
    var x=document.getElementById('change').style.backgroundColor="blue";  
    
    console.log('test')
  }

  next()
  {    
this.navCtrl.push(TeachersubscribePage,{product:this.user_magazine,NewUser:"5",LicenseUser:"no"}); 
  }



}
