import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, Platform,ActionSheetController, ToastController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
/**
 * Generated class for the ContactUsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;
@IonicPage()
@Component({
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html',
})
export class ContactUsPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
 name
 email
 subject
 message 
  constructor(public platform:Platform, private socialSharing: SocialSharing,public alertCtrl:AlertController,public navCtrl: NavController, public navParams: NavParams, public toastCtrl:ToastController) {
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
      backAction();
      }
      }
      ]
      })
      alert.present()
  
  
    },)
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactusPage');
this.loadMap();
  }
  
   loadMap(){
 
    let latLng = new google.maps.LatLng(1.326298, 103.879646);   
 
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
  }

  // Contact Popup
conatcttap() {

  let alert = this.alertCtrl.create({
    title: 'Enter your Query',
    inputs: [
      {
        name: 'Name',
        placeholder: 'Name'
      },
      {
        name: 'Subject',
        placeholder: 'Subject',
       
      },
      {
        name: 'Message',
        placeholder: 'Message',
       
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Submit',
        handler: data => {
          console.log(data);
                   this.name=data.Name
                   this.email=data.Email
                   this.subject=data.Subject
                   this.message=data.Message
this.emailsend()


        }
      }
    ],
    enableBackdropDismiss: false
  });
  alert.present();
}

emailsend() {
  if(this.name=="" || this.name==undefined)
  {
    this.toastCtrl.create({ message: `Name is required.`,duration: 4000, position: 'top' }).present();
    return; 
  }
  if(this.email=="" || this.email==undefined)
  {
    this.toastCtrl.create({ message: `Email is required.`,duration: 4000, position: 'top' }).present();
    return; 
  }
  if(this.subject=="" || this.subject==undefined)
  {
    this.toastCtrl.create({ message: `Subject is required.`,duration: 4000, position: 'top' }).present();
    return; 
  }
  if(this.message=="" || this.message==undefined)
  {
    this.toastCtrl.create({ message: `Message is required.`,duration: 4000, position: 'top' }).present();
    return; 
  }
  
  this.socialSharing.shareViaEmail(this.message,this.subject, ['support@readsfeed.com']).then(() => {
  }).catch((err) => {
  });
}



}
