import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, ToastController } from 'ionic-angular';
import{SecurityProvider}from'../../providers/security/security'
import{Observable}from'rxjs/Rx'
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import{bigdata}from'../../app/models';

/**
 * Generated class for the ContestquestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contestquest',
  templateUrl: 'contestquest.html',
})
export class ContestquestPage {
  ContestType:number;
  ContestMCQ:any;
  ContestQuest:any;
  ContestAns:any;
  mcqsBtnHide:boolean=false

  answers
  public AnswersArr = [];
  surveyForm:any;
  
  ContestTypeName
  ContestId
  GetAnswer
 
  mcqBtnHide:boolean=false
  subarrcomma

  selectAnswer:any;
  public MultipleAnsArr=[];
  QuestId:any;

  SurveyListArr=[]
  openBtnHide:boolean=true;
  ContestListArr=[];
  constructor(public bdata:bigdata,public navCtrl: NavController, public navParams: NavParams, private menu: MenuController, public security:SecurityProvider,public loadingCtrl:LoadingController,public santizer: DomSanitizer, public toastCtrl:ToastController, private formBuilder:FormBuilder) {
    console.log("this.SurveyListArr==",this.SurveyListArr); 
    this.answers=[];

       // Calling content List API   .. 
    let loading=this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
      cssClass: 'transparent'
    })
    Observable.of(loading).flatMap(loading=>loading.present())
          .flatMap(() => this.security.ContentsList())
         .subscribe(data=>{
          console.log(data);
         if(data.status==1) 
          {
            for(let i=0;i<data.contests.length;i++)
            {
              this.SurveyListArr.push({"contest_id":data.contests[i].id,"status":data.contests[i].is_played,"title":data.contests[i].contest_name});
            }
            this.ContestListArr=this.SurveyListArr;
          }   
          loading.dismiss()
         },err=>{
          loading.dismiss()
           console.log(err);
         })




    if(this.navParams.get("data") !="")
    {
      this.GetQuestByID(this.navParams.get("data")) 
      return
    }
    if(this.navParams.get("data") ==""){
      this.GetData();
      return
    }


  }

  GetData()
  {
        // Calling contest Question API   .. 
    this.answers=[];
    let loading=this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
      cssClass: 'transparent'
    })
    Observable.of(loading).flatMap(loading=>loading.present())
          .flatMap(() => this.security.contestQuestions())
         .subscribe(data=>{
           loading.dismiss()
          console.log(data);
          if(data.status==0 )
          {
            this.toastCtrl.create({ message: data.message, duration: 4000, position: 'top' }).present();
            return
          }
          else{
            this.ContestId=data.contest.contest_id
            this.ContestTypeName=data.type
          if(data.type=="multiple_choice")
          {
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
          this.AnswersArr=[];
            }
            this.FormBuilderFn();
          }

          if(data.type=="open_ended")
          {
          }
        }
          

         },err=>{
           loading.dismiss()
          console.log(err);
        })
  }


  GetQuestByID(ContestId)
  {
    this.answers=[];
    let loading=this.loadingCtrl.create({ spinner: 'hide',
    content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
    cssClass: 'transparent'})
    Observable.of(loading).flatMap(loading=>loading.present())
          .flatMap(() => this.security.contestQuestById(ContestId))
         .subscribe(data=>{
           loading.dismiss()
          console.log(data);
          if(data.status==0 )
          {
            this.openBtnHide=true;
            this.ContestMCQ=[];
            this.answers=[];
            this.ContestQuest=""
            this.ContestAns=""
            this.toastCtrl.create({ message: data.message, duration: 4000, position: 'top' }).present();
            return
          }
          else{
            this.ContestId=data.contest.contest_id
            this.ContestTypeName=data.type
            if(data.type=="multiple_choice")
            {
              this.ContestType=1;
              this.ContestMCQ=data.contest.question_answers;
            }
  
          
            if(data.type=="mcqs")
            {
              this.ContestType=2;
              this.ContestMCQ=data.contest.question_answers;
              this.ContestId=data.contest.contest_id
            this.ContestTypeName=data.type
              for(let i=0;i<data.contest.question_answers.length;i++)
            {
              this.AnswersArr.push({ "id": data.contest.question_answers[i].answer_a });
             this.AnswersArr.push({ "id": data.contest.question_answers[i].answer_b });
            this.AnswersArr.push({ "id": data.contest.question_answers[i].answer_c });
            this.AnswersArr.push({ "id": data.contest.question_answers[i].answer_d });
          this.answers.push({"id":data.contest.question_answers[i].id,"contest_id":data.contest.question_answers[i].contest_id,"correct_answer1":data.contest.question_answers[i].correct_answer1,"correct_answer2":data.contest.question_answers[i].correct_answer2,"createdDate":data.contest.question_answers[i].createdDate,"answer_a":data.contest.question_answers[i].answer_a,"answer_b":data.contest.question_answers[i].answer_b,"answer_c":data.contest.question_answers[i].answer_c,"answer_d":data.contest.question_answers[i].answer_d,"question":data.contest.question_answers[i].question,"answers":this.AnswersArr });
              this.AnswersArr=[];
            }
            this.FormBuilderFn();
            }
  
            if(data.type=="open_ended")
            {
              this.openBtnHide=false;
              this.ContestType=3;
              this.ContestMCQ=data.contest.question_answers
              this.ContestId=data.contest.contest_id
              this.ContestTypeName=data.type
              for(let i=0;i<data.contest.question_answers.length;i++)
              {
                let valanswer=this.santizer.bypassSecurityTrustHtml(data.contest.question_answers[i].answer);
                this.AnswersArr.push({ "id": valanswer });
            this.answers.push({"id":data.contest.question_answers[i].id,"contest_id":data.contest.question_answers[i].contest_id,"answer_a":data.contest.question_answers[i].answer,"question":data.contest.question_answers[i].question,"answers":this.AnswersArr });
                this.AnswersArr=[];
              }
              this.FormBuilderFn();
            }
          }
         },err=>{
          loading.dismiss()
          console.log(err);
        })
  }



  RadioBtn(QuestId)
  {
    this.QuestId=QuestId;
  }
 
  MCBtnClick()
  {
    this.MultipleAnsArr.push({ "question_id": this.QuestId , "answer_by_user":this.selectAnswer });
    let loading=this.loadingCtrl.create({content:'Please Wait..'})
    Observable.of(loading).flatMap(loading=>loading.present())
          .flatMap(() => this.security.playContest(this.ContestTypeName,this.ContestId, this.MultipleAnsArr))
         .subscribe(data=>{
           loading.dismiss()
          console.log(data);

          if(data.status == 1) {
            this.ContestMCQ= [];
            this.mcqBtnHide=true;  
          for(let i=0;i<this.SurveyListArr.length;i++)
          {
            if(this.SurveyListArr[i].contest_id==this.ContestId)
            {
              this.SurveyListArr[i].status=1;
            }
          }
          
          this.ContestListArr=this.SurveyListArr;
          this.toastCtrl.create({ message: data.message, duration: 4000, position: 'top' }).present();
          return;     }
          if(data.status == 0) {
            this.mcqBtnHide=false;  
            this.toastCtrl.create({ message: data.message, duration: 4000, position: 'top' }).present();
            return;
          }
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
    console.log(this.surveyForm);
  }




  onChange(id, isChecked, index) {
    const answers = <FormArray>this.surveyForm.controls.answers.controls[index].controls.answer_by_user
    if(isChecked) {
      answers.push(new FormControl(id))
    } else {
      let idx = answers.controls.findIndex(x => x.value == id)
      answers.removeAt(idx)
    }
    this.GetAnswer=this.surveyForm.value
  }


  Openchange(id,ev,index)
  {
    const answers = <FormArray>this.surveyForm.controls.answers.controls[index].controls.answer_by_user
    for(let i=0;i<answers.value.length;i++){  answers.removeAt(i);    }
    answers.push(new FormControl(ev.value))

  
    this.GetAnswer=this.surveyForm.value
    
  }


  openBtnClick()
  {
    console.log(this.GetAnswer);
    let MCQSAnswerArr=[];
let ansarray
let questid;
    for(let j=0;j<this.GetAnswer.answers.length;j++)
{
  questid=this.GetAnswer.answers[j].question_id;
ansarray=this.GetAnswer.answers[j].answer_by_user;
MCQSAnswerArr.push({ "question_id": questid , "answer_by_user":ansarray.toString() });
}

console.log(MCQSAnswerArr);

    let loading=this.loadingCtrl.create({content:'Please Wait..'})
    Observable.of(loading).flatMap(loading=>loading.present())
          .flatMap(() => this.security.playContest(this.ContestTypeName,this.ContestId, MCQSAnswerArr))
         .subscribe(data=>{
           loading.dismiss()
          console.log(data);
          this.toastCtrl.create({ message: data.message, duration: 4000, position: 'top' }).present();
          this.answers= [];
          if(data.status == 1) {  this.openBtnHide=true;  
            for(let i=0;i<this.SurveyListArr.length;i++)
            {
              if(this.SurveyListArr[i].contest_id==this.ContestId)
              {
                this.SurveyListArr[i].status=1;
              }
            }
            
            this.ContestListArr=this.SurveyListArr;
          
            return;     }
          if(this.ContestMCQ.length == 0) {  this.openBtnHide=true;   return;     }
         },error=>
         {
          loading.dismiss()
         }
        )  
       

  }



  mcqsBtnClick()
  {  
let MCQSAnswerArr=[];
let ansarray
let questid;
    for(let j=0;j<this.GetAnswer.answers.length;j++)
{
  questid=this.GetAnswer.answers[j].question_id;
ansarray=this.GetAnswer.answers[j].answer_by_user;
MCQSAnswerArr.push({ "question_id": questid , "answer_by_user":ansarray.toString() });
}
    let loading=this.loadingCtrl.create({content:'Please Wait..'})
    Observable.of(loading).flatMap(loading=>loading.present())
          .flatMap(() => this.security.playContest(this.ContestTypeName,this.ContestId, MCQSAnswerArr))
         .subscribe(data=>{
           loading.dismiss()
          console.log(data);
         
          this.answers= [];
          if(data.status == 1) {
              this.mcqsBtnHide=true;  
            for(let i=0;i<this.SurveyListArr.length;i++)
            {
              if(this.SurveyListArr[i].contest_id==this.ContestId)
              {
                this.SurveyListArr[i].status=1;
              }
            }
            
            this.ContestListArr=this.SurveyListArr;
            this.toastCtrl.create({ message: data.message, duration: 4000, position: 'top' }).present();
            return;     }
            if(data.status == 0) {
              this.mcqsBtnHide=false;  
              this.toastCtrl.create({ message: data.message, duration: 4000, position: 'top' }).present();
              return;
            }
         },error=>
         {
          loading.dismiss()
           alert("No internet connection, please try again.")
         }
        )   

  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad ContestquestPage');
  }

  ionViewDidEnter() {   
    
    this.menu.swipeEnable(false);   
  
  }
    ionViewWillLeave() {   
       this.menu.swipeEnable(true);  
         }


}
