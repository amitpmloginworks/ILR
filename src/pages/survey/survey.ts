import { Component } from '@angular/core';
import { IonicPage,AlertController,Platform, NavController, NavParams, MenuController, LoadingController, ToastController } from 'ionic-angular';
import{SecurityProvider}from'../../providers/security/security'
import{Observable}from'rxjs/Rx'
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import{bigdata}from'../../app/models';

/**
 * Generated class for the SurveyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-survey',
  templateUrl: 'survey.html',
})
export class SurveyPage {
  answers
  public AnswersArr = [];
  surveyForm:any;
  GetAnswer

survey_name
SurveyList
PrePageSurveyId
FinalSurveyId
questid
mcqsBtnHide:boolean=true;

SurveyListArr=[]
ContestListArr=[]   
range
  constructor(public platform:Platform,public alertCtrl:AlertController,public bdata:bigdata,public navCtrl: NavController, public navParams: NavParams, private menu: MenuController, public security:SecurityProvider,public loadingCtrl:LoadingController, public toastCtrl:ToastController, private formBuilder:FormBuilder) {
   let loading=this.loadingCtrl.create({
    spinner: 'hide',
    content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
    cssClass: 'transparent'
  })  
  Observable.of(loading).flatMap(loading=>loading.present())
        .flatMap(() => this.security.surveyQuestAll())
       .subscribe(data=>{
         loading.dismiss() 
         console.log("surveyQuestAll ===",data);
         if(data.status==1) 
         {
           for(let i=0;i<data.survey.length;i++)
           {    
             this.SurveyListArr.push({"survey_id":data.survey[i].survey_id,"status":data.survey[i].is_survey_done,"title":data.survey[i].survey_name});
           }
           this.ContestListArr=this.SurveyListArr; 
           console.log("this.ContestListArr==",this.ContestListArr) 
         }
       })

    this.answers=[];
    this.PrePageSurveyId=this.navParams.get("SurveyId");

    if(this.navParams.get("SurveyId")!=undefined)
    {
      this.GetDataById(this.navParams.get("SurveyId"));
      return;
    }
    if(this.navParams.get("SurveyId")==undefined)
    {
      this.GetData();
      return; 
    }

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

  itemSelected(id)
  {
    alert(id)
  }

  GetData()
  {
    this.answers=[]
    let loading=this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
      cssClass: 'transparent'
    })
    Observable.of(loading).flatMap(loading=>loading.present())
          .flatMap(() => this.security.surveyQuestions())
         .subscribe(data=>{
           loading.dismiss()
           console.log(data);
          this.FinalSurveyId=data.survey[0][0].survey_id
          this.survey_name=data.survey[0][0].survey_name
          this.SurveyList=data.survey[0]
          if(data.additional_message!="")
          {
            this.answers=[]
            this.mcqsBtnHide=true;
            this.toastCtrl.create({ message: data.additional_message, duration: 4000, position: 'top' }).present();
            return
          }
          else{
            this.mcqsBtnHide=false;
            let count=0;
            for(let i=0;i<data.survey[0].length;i++)
            {
              if(count==i)
              {
                this.AnswersArr.push({ "id": data.survey[0][i].answer1 });
                this.AnswersArr.push({ "id": data.survey[0][i].answer2 });
                this.AnswersArr.push({ "id": data.survey[0][i].answer3 });
                this.AnswersArr.push({ "id": data.survey[0][i].answer4 });
                this.AnswersArr.push({ "id": data.survey[0][i].answer5 });
                this.AnswersArr.push({ "id": data.survey[0][i].answer6 });
                this.AnswersArr.push({ "id": data.survey[0][i].answer7 });
                 this.AnswersArr.push({ "id": data.survey[0][i].answer8 });
                  this.AnswersArr.push({ "id": data.survey[0][i].answer9 });
                   this.AnswersArr.push({ "id": data.survey[0][i].answer10 });
  this.answers.push({"id":data.survey[0][i].id,"image":data.survey[0][i].image,"max_value":data.survey[0][i].max_value,"min_value":data.survey[0][i].min_value,"createdDate":data.survey[0][i].createdDate,"question":data.survey[0][i].question,"survey_id":data.survey[0][i].survey_id,"survey_name":data.survey[0][i].survey_name,"type":data.survey[0][i].type,"answer1":data.survey[0][i].answer1,"answer2":data.survey[0][i].answer2,"answer3":data.survey[0][i].answer3,"answer4":data.survey[0][i].answer4,"answer5":data.survey[0][i].answer5,"answer6":data.survey[0][i].answer6,"answer7":data.survey[0][i].answer7,"answer8":data.survey[0][i].answer8,"answer9":data.survey[0][i].answer9,"answer10":data.survey[0][i].answer10,"answers":this.AnswersArr });
              }
              this.AnswersArr=[];
              count=count+1;
            }
          this.FormBuilderFn();
          } 
         })
  }

  GetDataById(SurveyId)
  {
    this.FinalSurveyId=SurveyId;
    this.answers=[]
    let loading=this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
      cssClass: 'transparent'
    })
    Observable.of(loading).flatMap(loading=>loading.present()) 
          .flatMap(() => this.security.surveyQuestById(SurveyId))
         .subscribe(data=>{
           loading.dismiss()
          this.survey_name=data.survey[0][0].survey_name
          this.SurveyList=data.survey[0]
          if(data.additional_message!="" )
          {
            this.answers=[];
            this.mcqsBtnHide=true;
            this.toastCtrl.create({ message: data.additional_message, duration: 4000, position: 'top' }).present();
            return
          }
          else{
            this.mcqsBtnHide=false;
            let count=0;
            for(let i=0;i<data.survey[0].length;i++)
            {
              if(count==i)
              {
                this.AnswersArr.push({ "id": data.survey[0][i].answer1 });
                this.AnswersArr.push({ "id": data.survey[0][i].answer2 });
                this.AnswersArr.push({ "id": data.survey[0][i].answer3 });
                this.AnswersArr.push({ "id": data.survey[0][i].answer4 });
                this.AnswersArr.push({ "id": data.survey[0][i].answer5 });
                this.AnswersArr.push({ "id": data.survey[0][i].answer6 });
                this.AnswersArr.push({ "id": data.survey[0][i].answer7 });
                 this.AnswersArr.push({ "id": data.survey[0][i].answer8 });
                  this.AnswersArr.push({ "id": data.survey[0][i].answer9 });
                   this.AnswersArr.push({ "id": data.survey[0][i].answer10 });
  this.answers.push({"id":data.survey[0][i].id,"image":data.survey[0][i].image,"max_value":data.survey[0][i].max_value,"min_value":data.survey[0][i].min_value,"createdDate":data.survey[0][i].createdDate,"question":data.survey[0][i].question,"survey_id":data.survey[0][i].survey_id,"survey_name":data.survey[0][i].survey_name,"type":data.survey[0][i].type,"answer1":data.survey[0][i].answer1,"answer2":data.survey[0][i].answer2,"answer3":data.survey[0][i].answer3,"answer4":data.survey[0][i].answer4,"answer5":data.survey[0][i].answer5,"answer6":data.survey[0][i].answer6,"answer7":data.survey[0][i].answer7,"answer8":data.survey[0][i].answer8,"answer9":data.survey[0][i].answer9,"answer10":data.survey[0][i].answer10,"answers":this.AnswersArr });
              }
              this.AnswersArr=[];
              count=count+1;
            }
          this.FormBuilderFn();
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
          answer_by_user: this.formBuilder.array([]),
          surveytype:[this.answers[i].type, Validators.required]
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
    this.GetAnswer=this.surveyForm.value
  }

  onChangeDrop(dropval,questid,index)
  {
    const answers = <FormArray>this.surveyForm.controls.answers.controls[index].controls.answer_by_user
    for(let i=0;i<answers.value.length;i++){  answers.removeAt(i);    }
    answers.push(new FormControl(dropval))
    this.GetAnswer=this.surveyForm.value
  }

  RadioChange(id,ev,index)
  {
    const answers = <FormArray>this.surveyForm.controls.answers.controls[index].controls.answer_by_user
    for(let i=0;i<answers.value.length;i++){  answers.removeAt(i);    }
    answers.push(new FormControl(ev))
    this.GetAnswer=this.surveyForm.value
  }

  Sliderchange(id,ev,index)
  {
    const answers = <FormArray>this.surveyForm.controls.answers.controls[index].controls.answer_by_user
    for(let i=0;i<answers.value.length;i++){  answers.removeAt(i);    }
    answers.push(new FormControl(ev.value))
    this.GetAnswer=this.surveyForm.value
    document.getElementById('range_'+index).innerHTML=ev.value;
  }

  Openchange(id,ev,index)
  {
    const answers = <FormArray>this.surveyForm.controls.answers.controls[index].controls.answer_by_user
    for(let i=0;i<answers.value.length;i++){  answers.removeAt(i);    }
    answers.push(new FormControl(ev.value))

  
    this.GetAnswer=this.surveyForm.value
  }

  SurveyBtn()
  {
    let MCQSAnswerArr=[];
    let questid1
    let ansarray
    for(let j=0;j<this.GetAnswer.answers.length;j++)
    {
      questid1=this.GetAnswer.answers[j].question_id;
      if(this.GetAnswer.answers[j].surveytype == "checkbox")
      {
        for(let k=0;k<this.GetAnswer.answers[j].answer_by_user.length;k++)
        {
            MCQSAnswerArr.push({ "question_id": questid1 , "answer_by_user":this.GetAnswer.answers[j].answer_by_user[k] }); 
        }
      }
      if(this.GetAnswer.answers[j].surveytype == "dropdown")
      {
        for(let k=0;k<this.GetAnswer.answers[j].answer_by_user.length;k++)
        {
          for(let n=0;n<this.GetAnswer.answers[j].answer_by_user[k].length;n++)
              {
                MCQSAnswerArr.push({ "question_id": questid1 , "answer_by_user":this.GetAnswer.answers[j].answer_by_user[k][n] }); 
              } 
        }
      }
      if(this.GetAnswer.answers[j].surveytype == "mcq")
      {
        for(let k=0;k<this.GetAnswer.answers[j].answer_by_user.length;k++)
        {
            MCQSAnswerArr.push({ "question_id": questid1 , "answer_by_user":this.GetAnswer.answers[j].answer_by_user[k] }); 
        }
      }
      if(this.GetAnswer.answers[j].surveytype == "open")
      {
        for(let k=0;k<this.GetAnswer.answers[j].answer_by_user.length;k++)
        {
            MCQSAnswerArr.push({ "question_id": questid1 , "answer_by_user":this.GetAnswer.answers[j].answer_by_user[k] }); 
        }
        
      }
      if(this.GetAnswer.answers[j].surveytype == "slider")
      {
        for(let k=0;k<this.GetAnswer.answers[j].answer_by_user.length;k++)
        {
            MCQSAnswerArr.push({ "question_id": questid1 , "answer_by_user":this.GetAnswer.answers[j].answer_by_user[k] }); 
        } 
      }
    }

    console.log(this.FinalSurveyId)
    console.log(MCQSAnswerArr)

    let loading=this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="assets/imgs/icons/READSFEED-GIF-LOGO.gif" style="height:100px!important">`,
      cssClass: 'transparent'
    })
    Observable.of(loading).flatMap(loading=>loading.present())
          .flatMap(() => this.security.surveyQuestSubmit(this.FinalSurveyId,MCQSAnswerArr))
         .subscribe(data=>{
           loading.dismiss()
           console.log(data);
           if(data.status==0)
           {
            this.mcqsBtnHide=false;
            this.toastCtrl.create({ message: data.message, duration: 4000, position: 'top' }).present();
            return
           }
            else{

              this.answers=[];
                this.mcqsBtnHide=true;
                for(let i=0;i<this.SurveyListArr.length;i++)
                {
                  if(this.SurveyListArr[i].survey_id==this.FinalSurveyId)
                  {
                    this.SurveyListArr[i].status=1;
                  }
                }
                
                this.ContestListArr=this.SurveyListArr;
              this.toastCtrl.create({ message: data.message, duration: 4000, position: 'top' }).present();
              return
            }
         })
  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad SurveyPage');
  }

  ionViewDidEnter() {    this.menu.swipeEnable(false);      }

    ionViewWillLeave() {    this.menu.swipeEnable(true);       }

    trackByIndex(index: number, obj: any): any {  return index; }


   

}
