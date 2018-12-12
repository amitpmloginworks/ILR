import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,Platform ,Events,LoadingController , ToastController } from 'ionic-angular';
import{Observable}from'rxjs/Rx'
import{SecurityProvider}from'../../providers/security/security'
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the DailypostmagzinecontentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dailypostmagzinecontent',
  templateUrl: 'dailypostmagzinecontent.html',
})
export class DailypostmagzinecontentPage {
  daily_posts


  answers
  public AnswersArr = [];
  surveyForm:any;
  
  ContestType:number;
  ContestMCQ:any;
  ContestQuest:any;
  ContestAns:any;
  
  constructor(public alertCtrl:AlertController, public platform:Platform,public security:SecurityProvider,public loadingCtrl:LoadingController,public navCtrl: NavController, public navParams: NavParams,public events:Events, private formBuilder:FormBuilder, public toastCtrl:ToastController,public santizer: DomSanitizer) {
    this.answers=[];
    let loading=this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
      cssClass: 'transparent'
    })
    Observable.of(loading).flatMap(loading=>loading.present())
          .flatMap(() => this.security.dailypost(localStorage['type']))
         .subscribe(data=>{
           loading.dismiss()
           this.daily_posts=data.daily_posts     
         })


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


  GetData()
  {
    let loading=this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
      cssClass: 'transparent'
    })
    Observable.of(loading).flatMap(loading=>loading.present())
          .flatMap(() => this.security.contestQuestByIds())
         .subscribe(data=>{
           loading.dismiss()
          console.log(data);
          if(data.status==0 )
          {
            this.toastCtrl.create({ message: data.message, duration: 4000, position: 'top' }).present();
            return
          }
          
          else{
          if(data.type=="multiple_choice")
          {
            console.log(data.contest.question_answers);
            this.ContestType=1;
            this.ContestMCQ=data.contest.question_answers;
          }
 
          if(data.type=="mcqs")
          {
            this.ContestType=2;
            this.ContestMCQ=data.contest.question_answers;
            for(let i=0;i<data.contest.question_answers.length;i++)
            {
              this.AnswersArr.push({ "id": data.contest.question_answers[i].answer_a });
             this.AnswersArr.push({ "id": data.contest.question_answers[i].answer_b });
            this.AnswersArr.push({ "id": data.contest.question_answers[i].answer_c });
            this.AnswersArr.push({ "id": data.contest.question_answers[i].answer_d });
          this.answers.push({"id":data.contest.question_answers[i].id,"contest_id":data.contest.question_answers[i].contest_id,"correct_answer1":data.contest.question_answers[i].correct_answer1,"correct_answer2":data.contest.question_answers[i].correct_answer2,"createdDate":data.contest.question_answers[i].createdDate,"answer_a":data.contest.question_answers[i].answer_a,"answer_b":data.contest.question_answers[i].answer_b,"answer_c":data.contest.question_answers[i].answer_c,"answer_d":data.contest.question_answers[i].answer_d,"question":data.contest.question_answers[i].question,"answers":this.AnswersArr });

            }
            console.log("afters==",this.answers);
            this.FormBuilderFn();
          }

          if(data.type=="open_ended")
          {
            console.log(data.contest);
            this.ContestType=3;
            this.ContestQuest=data.contest.question;
            this.ContestAns=this.santizer.bypassSecurityTrustHtml(data.contest.answer);
          }
        }
         },err=>{
          loading.dismiss()
         })
  }
 

  FormBuilderFn()
  {
    this.surveyForm = this.formBuilder.group({
      answers: this.formBuilder.array([])
    })
    for (var i = 0; i < this.answers.length; i++) {
        let question = this.formBuilder.group({
          question_id: [this.answers[i].id, Validators.required],
          answer_by_user: this.formBuilder.array([])
        });
        this.surveyForm.controls['answers'].push(question);
    }
  }

  onChange(id, isChecked, index) {
    const answers = <FormArray>this.surveyForm.controls.answers.controls[index].controls.answer_by_user
    if(isChecked) {
      answers.push(new FormControl(id))
    } else {
      let idx = answers.controls.findIndex(x => x.value == id)
      answers.removeAt(idx)
    }
    console.log(this.surveyForm.value)
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad DailypostmagzinecontentPage');
    
  }


}
