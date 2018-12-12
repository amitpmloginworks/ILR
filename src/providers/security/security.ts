import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import{ENV}from'../../app/env'  
import{Observable}from'rxjs/Rx'
import { Type } from '@angular/compiler/src/output/output_ast';
import { Storage } from '@ionic/storage';

/*
  Generated class for the SecurityProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SecurityProvider {

  hostname
  Server_userapi
  Server_homeapi
  Server_services
  Server_Homeapi
  Server_Root_Homeapi
  Server_login
  Server_Root_services
  Server_Root_userapi
  
  constructor(public http: Http, public str:Storage) {
        // https://www.readsfeed.com
      
    // this.hostname="http://88.198.133.25/ILR_dev";
    // this.Server_userapi= "http://88.198.133.25/ILR_dev/admin/userapi";
    // this.Server_homeapi="http://88.198.133.25/ILR_dev/admin/homeapi";
    // this.Server_services="http://88.198.133.25/ILR_dev/admin/services";
    // this.Server_Homeapi="http://88.198.133.25/ILR_dev/admin/Homeapi"

    // this.Server_Root_Homeapi="http://88.198.133.25/ILR_dev/Homeapi";
    // this.Server_login="http://88.198.133.25/ILR_dev/login";
    // this.Server_Root_services="http://88.198.133.25/ILR_dev/services";  
    // this.Server_Root_userapi="http://88.198.133.25/ILR_dev/userapi";  
   
         
    this.hostname="https://www.readsfeed.com";
    this.Server_userapi= "https://www.readsfeed.com/admin/userapi";
    this.Server_homeapi="https://www.readsfeed.com/admin/homeapi";
    this.Server_services="https://www.readsfeed.com/admin/services";
    this.Server_Homeapi="https://www.readsfeed.com/admin/Homeapi"

    this.Server_Root_Homeapi="https://www.readsfeed.com/Homeapi";
    this.Server_login="https://www.readsfeed.com/login";
    this.Server_Root_services="https://www.readsfeed.com/services";  
    this.Server_Root_userapi="https://www.readsfeed.com/userapi";  
  
    console.log('Hello SecurityProvider Provider');
	  this.str.get('USERID').then(res => {   localStorage['USERID']=res;   console.log(' USERID Provider==',res);     })
    this.str.get('token').then(res => {   localStorage['token']=res;   console.log(' token Provider==',res);     })
  
  }   
    
  Hostname(){
    return this.hostname;
  }

  checkParentemail(parent_email){
    let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
    let requestOptions=new RequestOptions({headers:headers})
    let param=JSON.stringify({ parent_email:parent_email })

    return this.http.post(this.Server_userapi+'/checkParentemail ',param,requestOptions).timeout(ENV.timeout)
    .map((data)=>{
      return data.json()
    })
  }
  studentlist(studentclass,SchoolName)
  {
    let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
    let requestOptions=new RequestOptions({headers:headers})
    let param=JSON.stringify({ student_class:studentclass,
      school_name:SchoolName })

    return this.http.post(this.Server_userapi+'/getStudents',param,requestOptions).timeout(ENV.timeout)
    .map((data)=>{
      return data.json()
    })
 
  }
  loyalpoints()
  {
    let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
    let requestOptions=new RequestOptions({headers:headers})
    let param=JSON.stringify(  {
      user_id:localStorage['USERID'],
       token:localStorage['token']
      })

    return this.http.post(this.Server_services+'/loyalty',param,requestOptions
).timeout(ENV.timeout)
  .map((data)=>{
    console.log(''+data)
    return data.json()
  })
  }

  fav(content_id)
  {
    let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
    let requestOptions=new RequestOptions({headers:headers})
    let param=JSON.stringify(   {
      user_id:localStorage['USERID'],
       token:localStorage['token'],
       content_id:content_id
    })
 
    return this.http.post(this.Server_homeapi+'/favoriteContent',param,requestOptions
).timeout(ENV.timeout)
  .map((data)=>{
    console.log(''+data)
    return data.json()
  })
  }

refferalcode()
{
  let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
  let requestOptions=new RequestOptions({headers:headers})
  let param=JSON.stringify(   {
    user_id:localStorage['USERID'],
     token:localStorage['token']
  
  
    })
 
  return this.http.post(this.Server_services+'/referral',param,requestOptions
 ).timeout(ENV.timeout)
  .map((data)=>{
    console.log(''+data)
    return data.json()
  })
}




  Sharetotal(i)
  {
    let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
  let requestOptions=new RequestOptions({headers:headers})
  let param=JSON.stringify({
    user_id:localStorage['USERID'],
     token:localStorage['token'],
     content_id:i


    })
 
    return this.http.post(this.Server_homeapi+'/contentShareCounts',
    param,requestOptions).timeout(ENV.timeout)
    .map((data)=>{
      console.log(''+data)
      return data.json()
    })
  }
  ShareCount(i,type)
  {
    let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
    let requestOptions=new RequestOptions({headers:headers})
    let param=JSON.stringify(  {
      user_id:localStorage['USERID'],
       token:localStorage['token'],
       content_id:i,
       type:type
  
  
      })
   
    return this.http.post(this.Server_homeapi+'/socialShareContent',param,requestOptions
  ).timeout(ENV.timeout)
    .map((data)=>{
      console.log(''+data)
      return data.json()  
    })
  }
  totalviews(i) 
  {
    let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
    let requestOptions=new RequestOptions({headers:headers})
    let param=JSON.stringify(   {
      user_id:localStorage['USERID'],
       token:localStorage['token'],
       content_id:i
  
  
      })
   
    return this.http.post(this.Server_homeapi+'/addView',param,requestOptions
  ).timeout(ENV.timeout)
    .map((data)=>{
      console.log(''+data)
      return data.json()
    })
  }
  FAQ()
  {
    let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
    let requestOptions=new RequestOptions({headers:headers})
    let param=JSON.stringify(     {
      user_id:localStorage['USERID'],
       token:localStorage['token']
  
      })
   
    return this.http.post(this.Server_services+'/faq',param,requestOptions
 ).timeout(ENV.timeout)
    .map((data)=>{
      console.log(''+data)
      return data.json()
    })

  }

  ContentsList()
  {
    let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
    let requestOptions=new RequestOptions({headers:headers})
    let param=JSON.stringify(     {
      user_id:localStorage['USERID'],
       token:localStorage['token']
  
      })
   
    return this.http.post(this.Server_services+'/contestList',
    param,requestOptions).timeout(ENV.timeout)
    .map((data)=>{ 
      console.log(''+data)
      return data.json()
    })
  }

  
  getContents() 
  {
  
    let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
    let requestOptions=new RequestOptions({headers:headers})
    let param=JSON.stringify(     {
      user_id:localStorage['USERID'],
       token:localStorage['token']
      })
    return this.http.post(this.Server_Homeapi+'/getContents',
    param,requestOptions).timeout(ENV.timeout)
    .map((data)=>{
      console.log(''+data)
      return data.json()
    })
  

//     return this.http.post('http://88.198.133.25/ILR_dev/admin/Homeapi/getContents',
// { user_id:localStorage['USERID'],
//   token:localStorage['token']  }
// )
// .timeout(ENV.timeout)
// .map((data)=>{
// console.log(''+data)
// return data.json()
// })



  }




  dailypost(type)
  {
    let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
    let requestOptions=new RequestOptions({headers:headers})
    let param=JSON.stringify(     {
      type:type,
      user_id:localStorage['USERID'],
       token:localStorage['token']
  
      })
   
    return this.http.post(this.hostname+'/admin/dailypostapi/getDailyposts',
    param,requestOptions
  )
  .timeout(ENV.timeout)
  .map((data)=>{
    console.log(''+data)
    return data.json()
  })
  }
  reciptnumber(ReciptNumber)
  {
    let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
    let requestOptions=new RequestOptions({headers:headers})
    let param=JSON.stringify(    {
      receipt_number:ReciptNumber,
      email:localStorage['email'] 
    })
   
    return this.http.post(this.Server_userapi+'/officialReceipt',param,
    requestOptions
  )
  .timeout(ENV.timeout)
  .map((data)=>{
    console.log(''+data)
    return data.json()
  })


  }


  payment(product,actualamount,cardNumber,month,myYear,CVV,currency,event,subscription,PaymentType,offlineUser,paymentID)
  {
    let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
    let requestOptions=new RequestOptions({headers:headers})
    let param=JSON.stringify(     { payment_type:PaymentType,
      email:localStorage['email'],
      card_type:"visa",
      payment_method:"credit_card",
      product:product,
      amount:actualamount,    

      card_no:cardNumber,
      exp_month:month,
      exp_year:myYear,
      cvc:CVV,
      
      currency:currency,
      user_id:localStorage['USERID'],
      subscription:event,
      subscription_type:subscription,
      country:localStorage["country"],
      is_offline_user :offlineUser,
      paymentID:paymentID 
    })   
    return this.http.post(this.Server_userapi+'/payment',param,requestOptions)
  .timeout(ENV.timeout)
  .map((data)=>{
    console.log(''+data)
    return data.json()
  })
  }



  getmeamount(plan_type,subscript_type,magzine_name)
  {
var str=localStorage["country"]
let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
let requestOptions=new RequestOptions({headers:headers})
let param=JSON.stringify(    {
  plan_type:plan_type,
  subscript_type:subscript_type,
  magazine_id:magzine_name,
  country:str.toLowerCase()
})
 
    return this.http.post(this.Server_userapi+'/calculateAmount',param,requestOptions
  )
  .timeout(ENV.timeout)
  .map((data)=>{
    console.log(''+data)
    return data.json()
  })
  }

  forgetpassword(email)
  {
    let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
let requestOptions=new RequestOptions({headers:headers})
let param=JSON.stringify(    {email:email})
 
    return this.http.post(this.Server_userapi+'/forgotPassword',param,requestOptions 
  )
  .timeout(ENV.timeout)
  .map((data)=>{
    console.log(''+data)
    return data.json()
  })
  }


login(username,password) { 
  let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
  //let headers = new Headers({ 'Content-Type':'application/json'})
  let requestOptions=new RequestOptions({headers:headers})
  let param=JSON.stringify({username:username,  password:password})
 // return this.http.post('https://www.readsfeed.com/admin/userapi/login',param,requestOptions  
  return this.http.post(this.Server_userapi+'/login',param,requestOptions
)
.timeout(ENV.timeout)
.map((data)=>{
  console.log(''+data)
  return data.json()
})
  
// return this.http.post('http://88.198.133.25/ILR_dev/admin/userapi/login',
// {username:username,  password:password}
// )
// .timeout(ENV.timeout)
// .map((data)=>{
// console.log(''+data)
// return data.json()
// })

}


ClassList() { 
  let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
  let requestOptions=new RequestOptions({headers:headers})
  let param=JSON.stringify({ token:localStorage['token'], user_id:localStorage['USERID'] })
  return this.http.post(this.hostname+'/teacherClassList',param,requestOptions
)
.timeout(ENV.timeout)
.map((data)=>{
  console.log(''+data)
  return data.json()
})


//   return this.http.post('http://88.198.133.25/ILR_dev/teacherClassList',
//   {user_id:localStorage['USERID'],  token:localStorage['token']}
// )
// .timeout(ENV.timeout)
// .map((data)=>{
//   console.log(''+data)
//   return data.json()
// })



}
  

activeSubscription() { 

  let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
  let requestOptions=new RequestOptions({headers:headers})
  let param=JSON.stringify({ token:localStorage['token'], user_id:localStorage['USERID'] })
  return this.http.post(this.Server_Root_Homeapi+'/activeSubscription',param,requestOptions
)
.timeout(ENV.timeout)
.map((data)=>{
  console.log(''+data)
  return data.json()
})
        
// return this.http.post('http://88.198.133.25/ILR_dev/Homeapi/activeSubscription',
// {user_id:localStorage['USERID'],  token:localStorage['token']}
// )
// .timeout(ENV.timeout)
// .map((data)=>{
// console.log(''+data)
// return data.json()
// })

}    

ClassBYStudent(student_class) {
  
  let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
  let requestOptions=new RequestOptions({headers:headers})
  let param=JSON.stringify({ token:localStorage['token'], user_id:localStorage['USERID'] })
  return this.http.post(this.hostname+'/teacherStudentList',param,requestOptions
)
.timeout(ENV.timeout)
.map((data)=>{
  console.log(''+data)
  return data.json()
})

//   return this.http.post('http://88.198.133.25/ILR_dev/teacherStudentList',
// {user_id:localStorage['USERID'],  token:localStorage['token'],student_class:student_class}
// )
// .timeout(ENV.timeout)
// .map((data)=>{
// console.log(''+data)
// return data.json()
// })


}




Licensesignup(student,
  signup_type,
 username,
 password,
 FirstName,
 LastName,
 Email_Id,
 PhoneNo,
 Age,
  gender,
  user_image,
   SchoolName,
  SchoolAddress,
  City,
  State,
  country,
  StudentDetails,
 terms_checked,
  content_type_id,
  is_subscribed,
subscription_id,
 user_content_nature,
 user_magazine,
user_relation,
user_text_type,
student_id,
parent_name,parent_email,parent_relation,
parent_image,
ShipAdd,ShipCity,ShipState,ShipPin,ShipCountry
)
{
  let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
let requestOptions=new RequestOptions({headers:headers})
let param=JSON.stringify(    {
  role:student,
  action:"licensed",
  id:localStorage['USERID'],
  last_name:LastName,
  phone:PhoneNo,

  shipping_address:ShipAdd,
  shipping_country:ShipCountry,
  shipping_state:ShipState,
  shipping_city:ShipCity,
  shipping_pincode:ShipPin,

  school_state:State,
  school_country:country,
  student_class:StudentDetails,
  user_image:user_image,
  terms_checked:terms_checked,

  content_type_id:content_type_id,

  user_content_nature:user_content_nature,
  user_relation:user_relation,
  user_text_type:user_text_type,
student_id:student_id
})
 
  return this.http.post(this.Server_login+'/licensed_signup',param,requestOptions
   )
  .timeout(ENV.timeout)
   .map((data)=>{
     console.log(''+data)
     return data.json()
   })
}

  signup(
   student,
    signup_type,
   username,
   password,
   FirstName,
   LastName,
   Email_Id,
   PhoneNo,
   Age,
    gender,
    user_image,
     SchoolName,
    SchoolAddress,
    City,
    State,
    country,
    StudentDetails,
   terms_checked,
    content_type_id,
    is_subscribed,
  subscription_id,
   user_content_nature,
   user_magazine,
user_relation,
user_text_type,
student_id,
parent_name,parent_email,parent_relation,
parent_image,
ShipAdd,ShipCity,ShipState,ShipPin,ShipCountry
  )
  {
    let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
    let requestOptions=new RequestOptions({headers:headers})
    let param=JSON.stringify(   {
      role:student,
      signup_type:signup_type,
      username:username,
      password:password,
      first_name:FirstName,
      last_name:LastName,
      email:Email_Id,
      phone:PhoneNo,
      age:Age,
      gender:gender,
      school_name:SchoolName,

      shipping_address:ShipAdd,
      shipping_country:ShipCountry,
      shipping_state:ShipState,
      shipping_city:ShipCity,
      shipping_pincode:ShipPin,

      school_address:SchoolAddress,
      school_city:City,
      school_state:State,
      school_country:country,
      student_class:StudentDetails,
      user_image:user_image,
      terms_checked:terms_checked,

      content_type_id:content_type_id,

      user_content_nature:user_content_nature,
      user_magazine:user_magazine,
      user_relation:user_relation,
      user_text_type:user_text_type,

  student_id:student_id  
  })
     
    return this.http.post(this.Server_userapi+'/signup',param,requestOptions
     )
    .timeout(ENV.timeout)
     .map((data)=>{
       console.log(''+data)
       return data.json()
     })
  }

  socialsignup(
    student,
    signup_type,
   FirstName,
   LastName,
   Email_Id,
  PhoneNo,
   Age,
    gender,
    user_image,
     SchoolName,
    SchoolAddress,
    City,
    State,
    country,
    StudentDetails,
   terms_checked,
    content_type_id,
    is_subscribed,
  subscription_id,
   user_content_nature,
   user_magazine,
user_relation,
user_text_type,
student_id,parent_name,parent_email,parent_relation
  )
  {
    let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
    let requestOptions=new RequestOptions({headers:headers})
    let param=JSON.stringify({
      username:null,
      password:null,
      role:student,
      signup_type:signup_type,
      first_name:FirstName,
      last_name:LastName,
      email:Email_Id,
    
      phone:PhoneNo,
      age:Age,
      gender:gender,
      user_image:user_image,
      school_name:SchoolName,
      school_address:SchoolAddress,
      school_city:City,
      school_state:State,
      school_country:country,
      student_class:StudentDetails,
      terms_checked:terms_checked,
      content_type_id:content_type_id,
      is_subscribed:is_subscribed,
      subscription_id:subscription_id,
      user_content_nature:user_content_nature,
      user_magazine:user_magazine,
      user_relation:user_relation,
      user_text_type:user_text_type,
  text_type_id:0,
  student_id:student_id,
  parent_name:parent_name,parent_email:parent_email,parent_relation:parent_relation

  })
 
    return this.http.post(this.Server_userapi+'/signup',param,requestOptions,
     )
    .timeout(ENV.timeout)
     .map((data)=>{
       console.log(''+data)
       return data.json()
     })
    


  }


  validateUserEmail(username,email)
  {
    let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
    let requestOptions=new RequestOptions({headers:headers})
    let param=JSON.stringify({
      username:username,
      email:email
    })
 
return this.http.post(this.hostname+'/validateEmailUsername',param,requestOptions)
.timeout(ENV.timeout)
     .map((data)=>{
       console.log(''+data)
       return data.json()
     })

  }









  magzinelist()
  {
    let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
    let requestOptions=new RequestOptions({headers:headers})
    return this.http.get(ENV.mainApi+'/magazineList',requestOptions)
    .timeout(ENV.timeout)
    .map((data)=>{
      console.log(''+data)
      return data.json()
    })
  }


  contentNatureList()
  {
    let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
    let requestOptions=new RequestOptions({headers:headers})
    return this.http.get(ENV.mainApi+'/contentNatureList',requestOptions)
    .timeout(ENV.timeout)
    .map((data)=>{
      console.log(''+data)
      return data.json()
    })
  }  

  contentNatureListHome()  {  
    let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
    let requestOptions=new RequestOptions({headers:headers})
    return this.http.get(ENV.mainApi+'/contentNatureListHome',requestOptions)
    .timeout(ENV.timeout)
    .map((data)=>{
      console.log(''+data)
      return data.json()
    })
  }

  


  contentNatureListSecond()
  {
    let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
    let requestOptions=new RequestOptions({headers:headers})
  return this.http.get(ENV.mainApi+'/textTypeList',requestOptions) 
 .timeout(ENV.timeout)
.map((data)=>{
  return data.json()
})
  }
  addComment(ContentId,CommentTxt)
  {
    let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
    let requestOptions=new RequestOptions({headers:headers})
    let param=JSON.stringify(   {
      token:localStorage['token'],
      user_id:localStorage['USERID'],
      content_id:ContentId,
      comment:CommentTxt
    })
 
    return this.http.post(this.Server_homeapi+'/addComments',param,requestOptions)
  .timeout(ENV.timeout)
  .map((data)=>{
    console.log(''+data)
    return data.json()
  })
  }

  contentLikeAdd(ContentId,likeId)
  {
    let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
    let requestOptions=new RequestOptions({headers:headers})
    let param=JSON.stringify(   {
      token:localStorage['token'],
      user_id:localStorage['USERID'],
      content_id:ContentId,
      like_id:likeId,
      action:"insert"
    })
 

    return this.http.post(this.Server_Homeapi+'/contentLikeAdd',param,requestOptions
  )
  .timeout(ENV.timeout)
  .map((data)=>{
    console.log(''+data)
    return data.json()
  })
  }

  contentLikeView(ContentId)
  {
    let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
    let requestOptions=new RequestOptions({headers:headers})
    let param=JSON.stringify(       {
      token:localStorage['token'],
      user_id:localStorage['USERID'],
      content_id:ContentId,
      like_id:"6",
      action:"fetch"

    })
 

    return this.http.post(this.Server_Homeapi+'/contentLikeAdd',
    param,requestOptions
  )
  .timeout(ENV.timeout)
  .map((data)=>{
    console.log('er'+data)
    return data.json()
  })
  }

  

  favoriteContent(ContentId)
  {
    let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
    let requestOptions=new RequestOptions({headers:headers})
    let param=JSON.stringify(      {
      token:localStorage['token'],
      user_id:localStorage['USERID'],
      content_id:ContentId,
    })
   
    return this.http.post(this.Server_homeapi+'/favoriteContent',
    param,requestOptions
  )
  .timeout(ENV.timeout)
  .map((data)=>{
    console.log(''+data)
    return data.json()
  })
  }


  
  surveyQuestions()
  {
    let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
    let requestOptions=new RequestOptions({headers:headers})
    let param=JSON.stringify(       {
      token:localStorage['token'],
      user_id:localStorage['USERID'],
      action:"get"
    })
 
    return this.http.post(this.Server_services+'/surveyQuestions',param,requestOptions)
  .timeout(ENV.timeout)
  .map((data)=>{
    console.log(''+data)
    return data.json()
  })
  }

  
  surveyQuestById(SurveyId)
  {
    let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
    let requestOptions=new RequestOptions({headers:headers})
    let param=JSON.stringify(       {
      token:localStorage['token'],
      user_id:localStorage['USERID'],
      survey_id:SurveyId,
      action:"get"
    })
 
    return this.http.post(this.Server_services+'/surveyQuestions',param,requestOptions)
  .timeout(ENV.timeout)
  .map((data)=>{
    console.log(''+data)
    return data.json()
  })
  }

  surveyQuestAll()   
  {
    let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
    let requestOptions=new RequestOptions({headers:headers})
    let param=JSON.stringify(   {
      token:localStorage['token'],
      user_id:localStorage['USERID'],
      action:"list"
    })
 
    return this.http.post(this.Server_services+'/surveyQuestions',param,requestOptions
  )
  .timeout(ENV.timeout)
  .map((data)=>{
    console.log(''+data)
    return data.json()
  })
  }

  contestQuestByIds()
  {
    let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
    let requestOptions=new RequestOptions({headers:headers})
    let param=JSON.stringify(    {
      token:localStorage['token'],
      user_id:localStorage['USERID'],
      contest_id:"33"
    })
 
    return this.http.post(this.Server_services+'/contestQuestions',
    param,requestOptions
  )
  .timeout(ENV.timeout)
  .map((data)=>{
    console.log(''+data)
    return data.json()
  })
  }


  surveyQuestSubmit(SurveyId,QuestAns)
  {
    let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
    let requestOptions=new RequestOptions({headers:headers})
    let param=JSON.stringify(    {
      token:localStorage['token'],
      user_id:localStorage['USERID'],
      survey_id:SurveyId,
      action:"post",
      question_answer:QuestAns
    })
 
    return this.http.post(this.Server_services+'/surveyQuestions',
    param,requestOptions
  )
  .timeout(ENV.timeout)
  .map((data)=>{
    return data.json()
  })
  }


 
  updateProfile(Email,Mob,adds,City,State,Country,UsrImg,pincode,Userbio,updateProfile) {  
    let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
    let requestOptions=new RequestOptions({headers:headers})
    let param=JSON.stringify(   {
      token:localStorage['token'],
      user_id:localStorage['USERID'],
      pincode:pincode,
      email : Email,
      phone : Mob,
      address : adds,
      city : City,   
      state : State,
      country : Country,
      user_image : UsrImg,
      bio:Userbio,  
      password:updateProfile   
    })
 
    return this.http.post(this.Server_Root_userapi+'/updateProfile',param,requestOptions)
  .timeout(ENV.timeout)
  .map((data)=>{
    console.log(''+data)
    return data.json()
  })
  }
 
  


        
  saveRenew(MagazineId,SubscriptionType)
  {  
    let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
    let requestOptions=new RequestOptions({headers:headers})
    let param=JSON.stringify(    {
      product:MagazineId,
      user_id:localStorage['USERID'],
      subscription_type:SubscriptionType
    })
 
    return this.http.post(this.Server_Root_userapi+'/saveRenew', param,requestOptions
  )
  .timeout(ENV.timeout)
  .map((data)=>{
    console.log(''+data)
    return data.json()
  })
  }


  ourVoice()
  {
    let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
    let requestOptions=new RequestOptions({headers:headers})
    let param=JSON.stringify(   {
      token:localStorage['token'],
      user_id:localStorage['USERID'],
      action : "ourVoice"
    })
 
    return this.http.post(this.Server_Homeapi+'/ourVoice',
    param,requestOptions
  )
  .timeout(ENV.timeout)
  .map((data)=>{
    console.log(''+data)
    return data.json()
  })
  }
 
  

  getContentsTexttype(UsrTextType)
  {  
    let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
    let requestOptions=new RequestOptions({headers:headers})
    let param=JSON.stringify( {
      user_id:localStorage['USERID'],
       token:localStorage['token'],
       user_text_type:UsrTextType
      })
 
    return this.http.post(this.Server_Homeapi+'/getContents',param,requestOptions).timeout(ENV.timeout)
    .map((data)=>{
      console.log(''+data)
      return data.json()
    })
  }
  


  getNatureofContent(UsrTextType)
  {
    let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
    let requestOptions=new RequestOptions({headers:headers})
    let param=JSON.stringify( {
      user_id:localStorage['USERID'],
       token:localStorage['token'],
       content_nature:UsrTextType
      })
 
    return this.http.post(this.Server_Homeapi+'/getContents',
    param,requestOptions).timeout(ENV.timeout)
    .map((data)=>{
      console.log(''+data)
      return data.json()
    })
  }


    
  contestQuestions()
  {
    let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
    let requestOptions=new RequestOptions({headers:headers})
    let param=JSON.stringify(  {
      token:localStorage['token'],
      user_id:localStorage['USERID'],
      contest_id:""
    })
 
    return this.http.post(this.Server_services+'/contestQuestions', param,requestOptions
  )
  .timeout(ENV.timeout)
  .map((data)=>{
    return data.json()
  })
  }

  
  contestQuestById(ContestId)
  {
    let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
    let requestOptions=new RequestOptions({headers:headers})
    let param=JSON.stringify( {
      token:localStorage['token'],
      user_id:localStorage['USERID'],
      contest_id:ContestId
    })
 
    return this.http.post(this.Server_services+'/contestQuestions',
    param,requestOptions
  )
  .timeout(ENV.timeout)
  .map((data)=>{
    console.log(''+data)
    return data.json()
  })
  }


  logout()
  {
    let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
    let requestOptions=new RequestOptions({headers:headers})
    let param=JSON.stringify( {
      token:localStorage['token'],
      user_id:localStorage['USERID']
    })
 
    return this.http.post(this.Server_userapi+'/logout',param,requestOptions
  )
  .timeout(ENV.timeout)
  .map((data)=>{
    console.log(''+data)
    return data.json()
  })
  }

  


sendReferralCode(userid,code){
  let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
  let requestOptions=new RequestOptions({headers:headers})
  let param=JSON.stringify( {
    user_id:userid,
    referral_code:code
  })
 
    return this.http.post(this.Server_userapi+'/referalCode',
    param,requestOptions
    )
    .timeout(ENV.timeout)
    .map((data)=>{
      return data.json()
    })
  }


  playContest(QuestType,ContestId,Answers){
    let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
    let requestOptions=new RequestOptions({headers:headers})
    let param=JSON.stringify(  {
      user_id:localStorage['USERID'],
      token:localStorage['token'],
      type:QuestType,
      contest_id:ContestId,
      answers:Answers
    })
   
    return this.http.post(this.Server_services+'/playContest',
    param,requestOptions
    )
    .timeout(ENV.timeout)
    .map((data)=>{
      console.log(''+data)
      return data.json()
    })
  }


  createvent(myDate,getdesc,getevents)
  {
    let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
    let requestOptions=new RequestOptions({headers:headers})
    let param=JSON.stringify( {
      user_id:localStorage['USERID'],
      token:localStorage['token'],
      event_name: getevents,
      event_description: getdesc,
      event_date: myDate
    })
   
    return this.http.post(this.Server_services+'/createEvent',param,requestOptions).timeout(ENV.timeout)
    .map((data)=>{
      return data.json()
    })
  }


  

EventList()
  {
    let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
    let requestOptions=new RequestOptions({headers:headers})
    let param=JSON.stringify({
      user_id:localStorage['USERID'],
      token:localStorage['token']
    })
   
    return this.http.post(this.Server_services+'/eventsList',param,requestOptions).timeout(ENV.timeout)
    .map((data)=>{
      return data.json()
    })
  }

  
EvenJoin(EventId)
{
  let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
  let requestOptions=new RequestOptions({headers:headers})
  let param=JSON.stringify({
    user_id:localStorage['USERID'],
    token:localStorage['token'],
    event_id:EventId
  })
 
  return this.http.post(this.Server_services+'/joinEventByUser',param,requestOptions).timeout(ENV.timeout)
  .map((data)=>{
    return data.json()
  })
}

CreateGroup(GroupName,GroupDes)
{
  let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
  let requestOptions=new RequestOptions({headers:headers})
  let param=JSON.stringify({
    user_id:localStorage['USERID'],
    token:localStorage['token'],
    group_name:GroupName,
    group_description:GroupDes
  })
 
  return this.http.post(this.Server_services+'/createGroup',param,requestOptions).timeout(ENV.timeout)
  .map((data)=>{
    return data.json()
  })
}


GroupListShow()
{
  let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
  let requestOptions=new RequestOptions({headers:headers})
  let param=JSON.stringify({
    user_id:localStorage['USERID'],
    token:localStorage['token']
  })
 
  return this.http.post(this.Server_services+'/groupsList',param,requestOptions).timeout(ENV.timeout)
  .map((data)=>{
    return data.json()
  })
}



GroupJoinShow()
{
  let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
  let requestOptions=new RequestOptions({headers:headers})
  let param=JSON.stringify({
    user_id:localStorage['USERID'],
    token:localStorage['token']
  })
 
  return this.http.post(this.Server_services+'/groupsList',param,requestOptions).timeout(ENV.timeout)
  .map((data)=>{
    return data.json()
  })
}



GroupJoinBtn(GroupId)
{
  let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
  let requestOptions=new RequestOptions({headers:headers})
  let param=JSON.stringify({
    user_id:localStorage['USERID'],
    token:localStorage['token'],
    group_id:GroupId
  })
 
  return this.http.post(this.Server_services+'/userJoinGroup',param,requestOptions).timeout(ENV.timeout)
  .map((data)=>{
    return data.json()
  })
}


GroupCommentSave(GroupId,CommentTxt) 
{
  let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
  let requestOptions=new RequestOptions({headers:headers})
  let param=JSON.stringify({
    user_id:localStorage['USERID'],
    token:localStorage['token'],
    group_id:GroupId,
    comment:CommentTxt
  })
 
  return this.http.post(this.Server_services+'/groupCommentSave',param,requestOptions).timeout(ENV.timeout)
  .map((data)=>{
    return data.json()
  })
}
  
  
GroupCommentShow()
{
  let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
  let requestOptions=new RequestOptions({headers:headers})
  let param=JSON.stringify({
    user_id:localStorage['USERID'],
    token:localStorage['token']
  })
  return this.http.post(this.Server_services+'/userGroupCommentList',param,requestOptions).timeout(ENV.timeout)
  .map((data)=>{
    return data.json()
  })
}
      

GroupCommentShowById(groupid)
{
  let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
  let requestOptions=new RequestOptions({headers:headers})
  let param=JSON.stringify({
    user_id:localStorage['USERID'],
    token:localStorage['token'],
    group_id: groupid
  })
  return this.http.post(this.Server_services+'/userGroupCommentList',param,requestOptions).timeout(ENV.timeout)
  .map((data)=>{
    return data.json()
  })
}


RedeemPointsBtn(GiftId)
{
  let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
  let requestOptions=new RequestOptions({headers:headers})
  let param=JSON.stringify({
    user_id:localStorage['USERID'],
    token:localStorage['token'],
    gift_id:GiftId
  })
  return this.http.post(this.Server_services+'/redeemPoints',param,requestOptions).timeout(ENV.timeout)
  .map((data)=>{
    return data.json()
  })
}

  
TrialAPIBTN()
{
  let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
  let requestOptions=new RequestOptions({headers:headers})
  let param=JSON.stringify({
    user_id:localStorage['USERID'],
    token:localStorage['token']
  })
  return this.http.post(this.hostname+'/setTrialAPI',param,requestOptions).timeout(ENV.timeout)
  .map((data)=>{
    return data.json()
  })
}


addfamilyData(FamilyRelation,FamilyName,FamilyEmail,FamilyImage)
{
  let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
  let requestOptions=new RequestOptions({headers:headers})
  let param=JSON.stringify({
    user_id:localStorage['USERID'],
    token:localStorage['token'],
    family_relation:FamilyRelation,
    family_name:FamilyName,
    family_email:FamilyEmail,
    family_image:FamilyImage
  })
  return this.http.post(this.Server_Root_Homeapi+'/addfamily',param,requestOptions).timeout(ENV.timeout)
  .map((data)=>{
    return data.json()
  })
}


ServerDateTime()
{
  let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
  let requestOptions=new RequestOptions({headers:headers})
  let param=JSON.stringify({})
  return this.http.post(this.hostname+'/serverTime',param,requestOptions).timeout(ENV.timeout)
  .map((data)=>{
    return data.json()
  })
}
 



answerSheet(MagazineId)
{
  let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
  let requestOptions=new RequestOptions({headers:headers})
  let param=JSON.stringify({
    user_id:localStorage['USERID'],
    token:localStorage['token'],
    magazine_id:MagazineId
  })
  return this.http.post(this.Server_Root_services+'/suggestedAnswers',param,requestOptions).timeout(ENV.timeout)
  .map((data)=>{
    return data.json()
  })
}





WECNotification()
{
  let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
  let requestOptions=new RequestOptions({headers:headers})
  let param=JSON.stringify({
    userid:localStorage['USERID']
  })
  return this.http.post(this.Server_Root_services+'/wecNotificationApp',param,requestOptions).timeout(ENV.timeout)
  .map((data)=>{
    return data.json()
  })
}

WECNotificationList()
{
  let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
  let requestOptions=new RequestOptions({headers:headers})
  let param=JSON.stringify({
    userid:localStorage['USERID']
  })
  return this.http.post(this.Server_Root_services+'/wecNotificationListApp',param,requestOptions).timeout(ENV.timeout)
  .map((data)=>{
    return data.json()
  })
}
 
WECNotificationView()
{
  let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
  let requestOptions=new RequestOptions({headers:headers})
  let param=JSON.stringify({
    userid:localStorage['USERID']
  })
  return this.http.post(this.Server_Root_services+'/wecNotificationViewApp',param,requestOptions).timeout(ENV.timeout)
  .map((data)=>{
    return data.json()
  })
}


WECNotificationClear()
{
  let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
  let requestOptions=new RequestOptions({headers:headers})
  let param=JSON.stringify({
    userid:localStorage['USERID']
  })
  return this.http.post(this.Server_Root_services+'/wecNotificationClearApp',param,requestOptions).timeout(ENV.timeout)
  .map((data)=>{
    return data.json()
  })
}

      
    
ArticleTrack(ContentId,ContentTime)
{
  let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
  let requestOptions=new RequestOptions({headers:headers})
  let param=JSON.stringify({
    user_id:localStorage['USERID'],
    token:localStorage['token'],
    content_id:ContentId,
    time:ContentTime
  })
  return this.http.post(this.hostname+'/addArticleTrackTime',param,requestOptions).timeout(ENV.timeout)
  .map((data)=>{
    return data.json()
  })
}


    
AbusiveWordList() {
  let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
  let requestOptions=new RequestOptions({headers:headers})
  let param=JSON.stringify({
    user_id:localStorage['USERID'],
    token:localStorage['token']
   })
  return this.http.post(this.hostname+'/abusiveWordList',param,requestOptions).timeout(ENV.timeout)
  .map((data)=>{
    return data.json()
  })
}  

GroupExit(group_id) {      
  let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
  let requestOptions=new RequestOptions({headers:headers})
  let param=JSON.stringify({
    user_id:localStorage['USERID'],
    token:localStorage['token'],group_id:group_id
   })
  return this.http.post(this.hostname+'/services/groupExit',param,requestOptions).timeout(ENV.timeout)
  .map((data)=>{
    return data.json()
  })
}


UserOTP(otpmsg) {         
  let headers = new Headers({ 'Access-Control-Request-Method':'application/json', 'Content-Type':'application/x-www-form-urlencoded'})
  let requestOptions=new RequestOptions({headers:headers})
  let param=JSON.stringify({
    user_id:localStorage['USERID'],
    token:localStorage['token'],
    otp:otpmsg
   }) 
  return this.http.post(this.hostname+'/userOTP',param,requestOptions).timeout(ENV.timeout)
  .map((data)=>{
    return data.json()
  })
}



}
