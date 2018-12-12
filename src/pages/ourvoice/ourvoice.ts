import { Component } from '@angular/core';
import { IonicPage, Platform,AlertController,NavController, NavParams ,LoadingController, MenuController } from 'ionic-angular';
import{SecurityProvider}from'../../providers/security/security';
import{Observable}from'rxjs/Rx';
import{ bigdata}from'../../app/models'
declare var jquery :any;
declare var $:any;
/**
 * Generated class for the OurvoicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ourvoice',
  templateUrl: 'ourvoice.html',
})
export class OurvoicePage {
  public TittleList: Array<string>;
  public ArrVoiceList:Array<string>;
  VoiceStatus:number=0
  VoiceTittle
  plusORMinus:any;
count=0
Preindex
showbox:boolean
checkindex
VoiceListArr
arravoicelist
SlidePrevious
IdDisplay
displaynone:boolean=false

  constructor(public platform:Platform, public alertCtrl:AlertController,public loadingCtrl:LoadingController,public security:SecurityProvider,public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController,public bdata:bigdata) {
    this.IdDisplay="none";
    this.plusORMinus=1;
  this.showbox=true
    this.TittleList = JSON.parse(localStorage.getItem("todos"));
    if(!this.TittleList) {
        this.TittleList = [];
    }
    this.ArrVoiceList = JSON.parse(localStorage.getItem("todos"));
    if(!this.ArrVoiceList) {
        this.ArrVoiceList = [];
    }
    this.GetData();


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

 

 removeDuplicates(arr){
    let unique_array = []
    for(let i = 0;i < arr.length; i++){
        if(unique_array.indexOf(arr[i]) == -1){
            unique_array.push(arr[i])
        }
    }
    return unique_array
}



  GetData()
  {
    let loading=this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
      cssClass: 'transparent'
    })
    Observable.of(loading).flatMap(loading=>loading.present())
          .flatMap(() => this.security.ourVoice())
         .subscribe(data=>{
           loading.dismiss()
           console.log(data)
           this.bdata.temparrVoiceList=data.ourVoiceList
           for(let i=0;i<data.ourVoiceList.length;i++)
           {
             for(let j=0;j<this.TittleList.length;j++)
             {
               if(this.TittleList[j] ===data.ourVoiceList[i].title)
               {
               }
               else{
                this.TittleList.push(data.ourVoiceList[i].title);
               }
             }
             if(this.TittleList.length==0)
             {
              this.TittleList.push(data.ourVoiceList[i].title);
             }
           } 
           this.bdata.temparrayVoice=this.removeDuplicates(this.TittleList)
           this.VoiceStatus=1
           this.VoiceTittle=this.bdata.temparrayVoice
          })
  }

 

  CheckVoiceArr()
  {
    let VoiceList=this.bdata.temparrVoiceList
   
    let VoiceTittleList=this.bdata.temparrayVoice
    if(this.VoiceStatus==1)
    {
      for(let i=0;i<VoiceList.length;i++)
      {
        for(let j=0;j<VoiceTittleList.length;j++)
        {
          if(VoiceList[i].title ==VoiceTittleList[j])
          {
          }
        }
      } 
    }
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad OurvoicePage');
  }

  toggle(index,VoiceTittle)
  {
    this.plusORMinus=0;
    this.count++
    let VoiceList=this.bdata.temparrVoiceList
    let varStyle=document.getElementById("x_"+index).style.display
    if( this.IdDisplay!=varStyle){
      this.ArrVoiceList=[];
        document.getElementById("x_"+this.Preindex).style.display="none"
        for(let i=0;i<VoiceList.length;i++)
        {
          if(VoiceList[i].title ==VoiceTittle){     this.ArrVoiceList.push(VoiceList[i]);   }
        } 
        this.arravoicelist=this.ArrVoiceList
        this.Preindex=index
        document.getElementById("x_"+index).style.display="block";
        document.getElementById("showminus_"+this.Preindex).style.display="inline-table"
        document.getElementById("showadd_"+this.Preindex).style.display="none"
        this.IdDisplay=document.getElementById("x_"+index).style.display
        this.displaynone=true;
        return;
      }


      if(this.displaynone==true){
        this.ArrVoiceList=[];
        document.getElementById("x_"+this.Preindex).style.display="none"
        document.getElementById("showadd_"+this.Preindex).style.display="inline-table"
        document.getElementById("showminus_"+this.Preindex).style.display="none"
        this.IdDisplay=document.getElementById("x_"+this.Preindex).style.display
        this.displaynone=false;
          return;
        }
   

  

    if(this.count%2==0){
    this.ArrVoiceList=[];
      document.getElementById("x_"+this.Preindex).style.display="none"
      document.getElementById("showadd_"+this.Preindex).style.display="inline-table"
      document.getElementById("showminus_"+this.Preindex).style.display="none"
      this.IdDisplay=document.getElementById("x_"+this.Preindex).style.display
    }


  if(this.count%2==1){
  this.ArrVoiceList=[]
  for(let i=0;i<VoiceList.length;i++)
  {
    if(VoiceList[i].title ==VoiceTittle){     this.ArrVoiceList.push(VoiceList[i]);   }
  } 
  this.arravoicelist=this.ArrVoiceList
  this.Preindex=index
  document.getElementById("x_"+index).style.display="block";
  document.getElementById("showadd_"+this.Preindex).style.display="none"
  document.getElementById("showminus_"+this.Preindex).style.display="inline-table"
  this.IdDisplay=document.getElementById("x_"+index).style.display
}



}

ToggleOpen(index,VoiceTittle,VoiceList)
{
  for(let i=0;i<VoiceList.length;i++)
  {
    if(VoiceList[i].title ==VoiceTittle)
    {
      this.ArrVoiceList.push(VoiceList[i]);
    }
   
  } 
  this.arravoicelist=this.ArrVoiceList
}


ToggleOpen1(index,VoiceTittle,VoiceList)
{
  for(let i=0;i<VoiceList.length;i++)
  {
    if(VoiceList[i].title ==VoiceTittle)
    {
      this.ArrVoiceList.push(VoiceList[i]);
    }
  } 
  this.arravoicelist=this.ArrVoiceList

  document.getElementById(".x_"+index).style.visibility="visible"
}





}
