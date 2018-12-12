import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

import{TermsandconditionsPage}from'../termsandconditions/termsandconditions'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

/**
 * Generated class for the NuclearfamilyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nuclearfamily',
  templateUrl: 'nuclearfamily.html',
})
export class NuclearfamilyPage {
  signupdata
  user_relation=[];
  user_relationTmp=[];
  countmap

 mapsibbling:boolean
 mapsibblingforone:boolean
 mapsibblingfortwo:boolean

 imageProfile
 imageProfile1
 imageProfile2='assets/icon/deafault_men.jpg'
 imageProfile3
 imageProfile4
 
  constructor(public navCtrl: NavController, public filetransfer: FileTransfer, public navParams: NavParams, private camera: Camera,public actionsheetCtrl:ActionSheetController) {

    this.signupdata=this.navParams.get('signupdata')
    this.user_relationTmp=this.navParams.get('user_relation')
 this.countmap=this.navParams.get('countmap')

}
// Upload picture from camera and gallery ..
uploadpicture(imgVal)
  {
    this.user_relation=[];
    let actionsheet = this.actionsheetCtrl.create({
      title: 'Image Upload!',
      buttons: [{
        text: 'Upload From Gallery',
        handler: () => {
            this.GetGallery(imgVal)
        },
      }
        ,
      {
        text: 'Take A Snap',
        handler: () => {
              this.GetCamera(imgVal)
        }
      }]
    })
    actionsheet.present(); 
  }


  GetGallery(picIndex) {
    this.camera.getPicture({
      quality: 75,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      targetHeight: 500,
      targetWidth: 500,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }).then((imageData) => {
      if(picIndex==1)   {  this.imageProfile1=imageData;  return;   }
      if(picIndex==2)   {  this.imageProfile2=imageData;  return;   }
      if(picIndex==3)   { 
         this.imageProfile3=imageData;  
        for(let i=0;i<this.user_relationTmp.length;i++)
        {
          if(this.user_relationTmp[i].id==1)
          {
            this.user_relationTmp[i].sibling_image=imageData;
          }
        }
        return; 
      }
      if(picIndex==4)   {  
          this.imageProfile4=imageData; 
        for(let i=0;i<this.user_relationTmp.length;i++)
        {
          if(this.user_relationTmp[i].id==2)
          {
            this.user_relationTmp[i].sibling_image=imageData;
          }
        }

        return;
      
      }
    }, (err) => {
    })
  }
  
  GetCamera(picIndex){
  this.camera.getPicture({
    quality: 75,
    destinationType:this.camera.DestinationType.FILE_URI,
    sourceType:this.camera.PictureSourceType.CAMERA,
    encodingType: this.camera.EncodingType.JPEG,
    targetHeight: 500,
    targetWidth: 500,
    saveToPhotoAlbum: false,
    correctOrientation: true
  }).then((imageData) => {  
      if(picIndex==1)   {  this.imageProfile1=imageData;  return;   }
      if(picIndex==2)   {  this.imageProfile2=imageData;  return;   }
      if(picIndex==3)   { 
        this.imageProfile3=imageData;  
       for(let i=0;i<this.user_relationTmp.length;i++)
       {
         if(this.user_relationTmp[i].id==1)
         {
           this.user_relationTmp[i].sibling_image=imageData;
         }
       }
       return; 
     }
      if(picIndex==4)   {  
        this.imageProfile4=imageData; 
      for(let i=0;i<this.user_relationTmp.length;i++)
      {
        if(this.user_relationTmp[i].id==2)
        {
          this.user_relationTmp[i].sibling_image=imageData;
        }
      }
      return;
    }
  }, (err) => {
  })
  }



  navigateToTermsAndConditions(){
    console.log(this.user_relationTmp)
     console.log(this.user_relation)
    for(let j=0;j<this.user_relationTmp.length;j++)
    {
      this.user_relation.push({ "name":this.user_relationTmp[j].name,"relation":this.user_relationTmp[j].relation,"email":this.user_relationTmp[j].email,"sibling_image":this.user_relationTmp[j].sibling_image })
    }
console.log(this.user_relation)
    this.navCtrl.setRoot(TermsandconditionsPage,{signupdata:this.signupdata, user_relation:this.user_relation,parentpic:this.imageProfile1 });
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad NuclearfamilyPage');
  }

}
