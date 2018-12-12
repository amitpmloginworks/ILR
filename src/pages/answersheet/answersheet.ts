import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,Slides, Platform, AlertController } from 'ionic-angular';
import{Choiceperferncepage2Page}from'../choiceperferncepage2/choiceperferncepage2'
import{Observable}from'rxjs/Rx'
import{SecurityProvider}from'../../providers/security/security'
import{bigdata}from'../../app/models'
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { DomSanitizer } from '@angular/platform-browser';
import { Http, Response } from '@angular/http';
import { FileOpener } from '@ionic-native/file-opener';

/**
 * Generated class for the AnswersheetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-answersheet',
  templateUrl: 'answersheet.html',
})
export class AnswersheetPage {
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
  magazineitems=[] 
  UrlLink
  private fileTransfers: FileTransferObject;  
  constructor( public alertCtrl:AlertController,public bigdata:bigdata,public security:SecurityProvider,public navCtrl: NavController, public navParams: NavParams,public loadingCtrl:LoadingController,public filetransfer: FileTransfer,public file: File,public platform:Platform,private document: DocumentViewer,private sanitize: DomSanitizer,public http:Http,public bdata:bigdata,private fileOpener: FileOpener) {

this.buttonDisabled=true

this.magazine_list=this.bdata.GetActiveMagaine
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
    console.log("Exit App")
    }
    }
    ]
    })
    alert.present()
  },)



}



  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
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



  selectedImage(index,magazineId){
    let arrcategory=[];
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
      for(var i=0;i<this.magazine_list.length;i++)
{

if(index==i)
{

this.borderColor=document.getElementById('x_'+index).style.border="2px solid red";
}
else
{
this.borderColor=document.getElementById('x_'+i).style.border="2px solid white"; 
}

}
     
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


 // Calling answersheet API  .. 
    let loading=this.loadingCtrl.create({
      spinner: 'hide',
        content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
        cssClass: 'transparent'
     })
     Observable.of(loading).flatMap(loading=>loading.present())
     .flatMap(()=>this.security.answerSheet(magazineId)) 
     .subscribe(data=>{
      loading.dismiss()  
       console.log("dataaa===",data)
       if(data.status==1)
       {
        this.magazineitems=data.suggested_answers
       }
     
     })


  }



  test(){
    var x=document.getElementById('change').style.backgroundColor="blue";  
    console.log('test')
  }
  
  // // Download documents code here  .. 

DownloadPDFDoc(titles,filePath,extensions)
{
 let fileName=''
  let apptypes='';
  
  if(extensions==".pdf")      {    fileName=titles+".pdf";  apptypes= 'application/pdf';     }
  if(extensions==".doc")      {    fileName=titles+".doc";   apptypes = 'application/msword';  }
  if(extensions==".docx")     {   
     fileName=titles+".docx";
       apptypes ='application/vnd.openxmlformats-officedocument.wordprocessingml.document'   
  }

  let filespath=this.file.dataDirectory
  const fileTransfer: FileTransferObject = this.filetransfer.create();      
  fileTransfer.download(filePath,filespath + fileName, true).then((entry) => {
    let url1 =entry.toURL();
    this.fileOpener.open(url1, apptypes).then(() =>  {   }
  ).catch(e => {   } );
  }, (error) => {   
  });
}





DownloadDoc()
{ 
  let filePath="https://www.readsfeed.com/uploads/suggested_answer/16d3665c3aa86ca3e088bbd1345cf574.pdf"
  let fileName="whitepaper-pdfa.pdf"
  let url = encodeURI(filePath); 
  let documents=this.file.dataDirectory 
  this.fileTransfers = this.filetransfer.create();   
  this.fileTransfers.download(url, documents + fileName, true).then((entry) => { 
     let url1 =entry.toURL();
     this.fileOpener.open(url1, 'application/pdf').then(() =>  { 
	 }
    ).catch(e => { 
	} );
  }, (error) => {  
  });
}


  

  DownloadDoc1Copy()
  {  
    let filePath="http://www.loginworks.com/yathashwork/i1-2.doc";
    let fileName="tutorial.doc";  
    let filespath=this.file.dataDirectory
    const fileTransfer: FileTransferObject = this.filetransfer.create();      
    fileTransfer.download(filePath,filespath + fileName, true).then((entry) => {
      let url1 =entry.toURL();
      this.fileOpener.open(url1, 'application/msword').then(() =>  { 
	  }
    ).catch(e => { 
 } );
    }, (error) => {    
    });
  }




}
