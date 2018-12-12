import { Component } from '@angular/core';
import { IonicPage, NavController,MenuController, NavParams,AlertController } from 'ionic-angular';
import{ChilddetailPage}from'../childdetail/childdetail'
import{FormBuilder,FormGroup,Validators}from'@angular/forms'
import { FormControl, AbstractControl } from '@angular/forms'
import{countrylist}from'../../app/countrylist'
import{bigdata}from'../../app/models'
import { SelectSearchableComponent } from 'ionic-select-searchable'; 


/**
 * Generated class for the SchooldetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


class AllCountry {
  public id:number;
  public code: string;
  public name: string;
}

@IonicPage()
@Component({
  selector: 'page-schooldetails',
  templateUrl: 'schooldetails.html',
})
export class SchooldetailsPage {
  private countrylists: AllCountry[] = [
{ id:1,code: 'AF',name: 'Afghanistan'},
{ id:2,code: 'AL',name: 'Albania'},
{ id:3,code: 'DZ',name: 'Algeria'},
{ id:4,code: 'DS',name: 'American Samoa'},
{ id:5,code: 'AD',name: 'Andorra'},
{ id:6,code: 'AO',name: 'Angola'},
{ id:7,code: 'AI',name: 'Anguilla'},
{ id:8,code: 'AQ',name: 'Antarctica'},
{ id:9,code: 'AG',name: 'Antigua and Barbuda'},
{ id:10,code: 'AR',name: 'Argentina'},
{ id:11,code: 'AM',name: 'Armenia'},
{ id:12,code: 'AW',name: 'Aruba'},
{ id:13,code: 'AU',name: 'Australia'},
{ id:14,code: 'AT',name: 'Austria'},
{ id:15,code: 'AZ',name: 'Azerbaijan'},
{ id:16,code: 'BS',name: 'Bahamas'},
{ id:17,code: 'BH',name: 'Bahrain'},
{ id:18,code: 'BD',name: 'Bangladesh'},
{ id:19,code: 'BB',name: 'Barbados'},
{ id:20,code: 'BY',name: 'Belarus'},
{ id:21,code: 'BE',name: 'Belgium'},
{ id:22,code: 'BZ',name: 'Belize'},
{ id:23,code: 'BJ',name: 'Benin'},
{ id:24,code: 'BM',name: 'Bermuda'},
{ id:25,code: 'BT',name: 'Bhutan'},
{ id:26,code: 'BO',name: 'Bolivia'},
{ id:27,code: 'BA',name: 'Bosnia and Herzegovina'},
{ id:28,code: 'BW',name: 'Botswana'},
{ id:29,code: 'BV',name: 'Bouvet Island'},
{ id:30,code: 'BR',name: 'Brazil'},
{ id:31,code: 'IO',name: 'British Indian Ocean Territory'},
{ id:32,code: 'BN',name: 'Brunei Darussalam'},
{ id:33,code: 'BG',name: 'Bulgaria'},
{ id:34,code: 'BF',name: 'Burkina Faso'},
{ id:35,code: 'BI',name: 'Burundi'},
{ id:36,code: 'KH',name: 'Cambodia'},
{ id:37,code: 'CM',name: 'Cameroon'},
{ id:38,code: 'CA',name: 'Canada'},
{ id:39,code: 'CV',name: 'Cape Verde'},
{ id:40,code: 'KY',name: 'Cayman Islands'},
{ id:41,code: 'CF',name: 'Central African Republic'},
{ id:42,code: 'TD',name: 'Chad'},
{ id:43,code: 'CL',name: 'Chile'},
{ id:44,code: 'CN',name: 'China'},
{ id:45,code: 'CX',name: 'Christmas Island'},
{ id:46,code: 'CC',name: 'Cocos (Keeling) Islands'},
{ id:47,code: 'CO',name: 'Colombia'},
{ id:48,code: 'KM',name: 'Comoros'},
{ id:49,code: 'CG',name: 'Congo'},
{ id:50,code: 'CK',name: 'Cook Islands'},
{ id:51,code: 'CR',name: 'Costa Rica'},
{ id:52,code: 'HR',name: 'Croatia (Hrvatska)'},
{ id:53,code: 'CU',name: 'Cuba'},
{ id:54,code: 'CY',name: 'Cyprus'},
{ id:55,code: 'CZ',name: 'Czech Republic'},
{ id:56,code: 'DK',name: 'Denmark'},
{ id:57,code: 'DJ',name: 'Djibouti'},
{ id:58,code: 'DM',name: 'Dominica'},
{ id:59,code: 'DO',name: 'Dominican Republic'},
{ id:60,code: 'TP',name: 'East Timor'},
{ id:61,code: 'EC',name: 'Ecuador'},
{ id:62,code: 'EG',name: 'Egypt'},
{ id:63,code: 'SV',name: 'El Salvador'},
{ id:64,code: 'GQ',name: 'Equatorial Guinea'},
{ id:65,code: 'ER',name: 'Eritrea'},
{ id:66,code: 'EE',name: 'Estonia'},
{ id:67,code: 'ET',name: 'Ethiopia'},
{ id:68,code: 'FK',name: 'Falkland Islands (Malvinas)'},
{ id:69,code: 'FO',name: 'Faroe Islands'},
{ id:70,code: 'FJ',name: 'Fiji'},
{ id:71,code: 'FI',name: 'Finland'},
{ id:72,code: 'FR',name: 'France'},
{ id:73,code: 'FX',name: 'France, Metropolitan'},
{ id:74,code: 'GF',name: 'French Guiana'},
{ id:75,code: 'PF',name: 'French Polynesia'},
{ id:76,code: 'TF',name: 'French Southern Territories'},
{ id:77,code: 'GA',name: 'Gabon'},
{ id:78,code: 'GM',name: 'Gambia'},
{ id:79,code: 'GE',name: 'Georgia'},
{ id:80,code: 'DE',name: 'Germany'},
{ id:81,code: 'GH',name: 'Ghana'},
{ id:82,code: 'GI',name: 'Gibraltar'},
{ id:83,code: 'GK',name: 'Guernsey'},
{ id:84,code: 'GR',name: 'Greece'},
{ id:85,code: 'GL',name: 'Greenland'},
{ id:86,code: 'GD',name: 'Grenada'},
{ id:87,code: 'GP',name: 'Guadeloupe'},
{ id:88,code: 'GU',name: 'Guam'},
{ id:89,code: 'GT',name: 'Guatemala'},
{ id:90,code: 'GN',name: 'Guinea'},
{ id:91,code: 'GW',name: 'Guinea-Bissau'},
{ id:92,code: 'GY',name: 'Guyana'},
{ id:93,code: 'HT',name: 'Haiti'},
{ id:94,code: 'HM',name: 'Heard and Mc Donald Islands'},
{ id:95,code: 'HN',name: 'Honduras'},
{ id:96,code: 'HK',name: 'Hong Kong'},
{ id:97,code: 'HU',name: 'Hungary'},
{ id:98,code: 'IS',name: 'Iceland'},
{ id:99,code: 'IN',name: 'India'},
{ id:100,code: 'IM',name: 'Isle of Man'},
{ id:101,code: 'ID',name: 'Indonesia'},
{ id:102,code: 'IR',name: 'Iran (Islamic Republic of)'},
{ id:103,code: 'IQ',name: 'Iraq'},
{ id:104,code: 'IE',name: 'Ireland'},
{ id:105,code: 'IL',name: 'Israel'},
{ id:106,code: 'IT',name: 'Italy'},
{ id:107,code: 'CI',name: 'Ivory Coast'},
{ id:108,code: 'JE',name: 'Jersey'},
{ id:109,code: 'JM',name: 'Jamaica'},
{ id:110,code: 'JP',name: 'Japan'},
{ id:111,code: 'JO',name: 'Jordan'},
{ id:112,code: 'KZ',name: 'Kazakhstan'},
{ id:113,code: 'KE',name: 'Kenya'},
{ id:114,code: 'KI',name: 'Kiribati'},
{ id:115,code: 'KP',name: "Korea, Democratic People''s Republic of"},
{ id:116,code: 'KR',name: 'Korea, Republic of'},
{ id:117,code: 'XK',name: 'Kosovo'},
{ id:118,code: 'KW',name: 'Kuwait'},
{ id:119,code: 'KG',name: 'Kyrgyzstan'},
{ id:120,code: 'LA',name: "Lao People''s Democratic Republic"},
{ id:121,code: 'LV',name: 'Latvia'},
{ id:122,code: 'LB',name: 'Lebanon'},
{ id:123,code: 'LS',name: 'Lesotho'},
{ id:124,code: 'LR',name: 'Liberia'},
{ id:125,code: 'LY',name: 'Libyan Arab Jamahiriya'},
{ id:126,code: 'LI',name: 'Liechtenstein'},
{ id:127,code: 'LT',name: 'Lithuania'},
{ id:128,code: 'LU',name: 'Luxembourg'},
{ id:129,code: 'MO',name: 'Macau'},
{ id:130,code: 'MK',name: 'Macedonia'},
{ id:131,code: 'MG',name: 'Madagascar'},
{ id:132,code: 'MW',name: 'Malawi'},
{ id:133,code: 'MY',name: 'Malaysia'},
{ id:134,code: 'MV',name: 'Maldives'},
{ id:135,code: 'ML',name: 'Mali'},
{ id:136,code: 'MT',name: 'Malta'},
{ id:137,code: 'MH',name: 'Marshall Islands'},
{ id:138,code: 'MQ',name: 'Martinique'},
{ id:139,code: 'MR',name: 'Mauritania'},
{ id:140,code: 'MU',name: 'Mauritius'},
{ id:141,code: 'TY',name: 'Mayotte'},
{ id:142,code: 'MX',name: 'Mexico'},
{ id:143,code: 'FM',name: 'Micronesia, Federated States of'},
{ id:144,code: 'MD',name: 'Moldova, Republic of'},
{ id:145,code: 'MC',name: 'Monaco'},
{ id:146,code: 'MN',name: 'Mongolia'},
{ id:147,code: 'ME',name: 'Montenegro'},
{ id:148,code: 'MS',name: 'Montserrat'},
{ id:149,code: 'MA',name: 'Morocco'},
{ id:150,code: 'MZ',name: 'Mozambique'},
{ id:151,code: 'MM',name: 'Myanmar'},
{ id:152,code: 'NA',name: 'Namibia'},
{ id:153,code: 'NR',name: 'Nauru'},
{ id:154,code: 'NP',name: 'Nepal'},
{ id:155,code: 'NL',name: 'Netherlands'},
{ id:156,code: 'AN',name: 'Netherlands Antilles'},
{ id:157,code: 'NC',name: 'New Caledonia'},
{ id:158,code: 'NZ',name: 'New Zealand'},
{ id:159,code: 'NI',name: 'Nicaragua'},
{ id:160,code: 'NE',name: 'Niger'},
{ id:161,code: 'NG',name: 'Nigeria'},
{ id:162,code: 'NU',name: 'Niue'},
{ id:163,code: 'NF',name: 'Norfolk Island'},
{ id:164,code: 'MP',name: 'Northern Mariana Islands'},
{ id:165,code: 'NO',name: 'Norway'},
{ id:166,code: 'OM',name: 'Oman'},
{ id:167,code: 'PK',name: 'Pakistan'},
{ id:168,code: 'PW',name: 'Palau'},
{ id:169,code: 'PS',name: 'Palestine'},
{ id:170,code: 'PA',name: 'Panama'},
{ id:171,code: 'PG',name: 'Papua New Guinea'},
{ id:172,code: 'PY',name: 'Paraguay'},
{ id:173,code: 'PE',name: 'Peru'},
{ id:174,code: 'PH',name: 'Philippines'},
{ id:175,code: 'PN',name: 'Pitcairn'},
{ id:176,code: 'PL',name: 'Poland'},
{ id:177,code: 'PT',name: 'Portugal'},
{ id:178,code: 'PR',name: 'Puerto Rico'},
{ id:179,code: 'QA',name: 'Qatar'},
{ id:180,code: 'RE',name: 'Reunion'},
{ id:181,code: 'RO',name: 'Romania'},
{ id:182,code: 'RU',name: 'Russian Federation'},
{ id:183,code: 'RW',name: 'Rwanda'},
{ id:184,code: 'KN',name: 'Saint Kitts and Nevis'},
{ id:185,code: 'LC',name: 'Saint Lucia'},
{ id:186,code: 'VC',name: 'Saint Vincent and the Grenadines'},
{ id:187,code: 'WS',name: 'Samoa'},
{ id:188,code: 'SM',name: 'San Marino'},
{ id:189,code: 'ST',name: 'Sao Tome and Principe'},
{ id:190,code: 'SA',name: 'Saudi Arabia'},
{ id:191,code: 'SN',name: 'Senegal'},
{ id:192,code: 'RS',name: 'Serbia'},
{ id:193,code: 'SC',name: 'Seychelles'},
{ id:194,code: 'SL',name: 'Sierra Leone'},
{ id:195,code: 'SG',name: 'Singapore'},
{ id:196,code: 'SK',name: 'Slovakia'},
{ id:197,code: 'SI',name: 'Slovenia'},
{ id:198,code: 'SB',name: 'Solomon Islands'},
{ id:199,code: 'SO',name: 'Somalia'},
{ id:200,code: 'ZA',name: 'South Africa'},
{ id:201,code: 'GS',name: 'South Georgia South Sandwich Islands'},
{ id:202,code: 'ES',name: 'Spain'},
{ id:203,code: 'LK',name: 'Sri Lanka'},
{ id:204,code: 'SH',name: 'St. Helena'},
{ id:205,code: 'PM',name: 'St. Pierre and Miquelon'},
{ id:206,code: 'SD',name: 'Sudan'},
{ id:207,code: 'SR',name: 'Suricode'},
{ id:208,code: 'SJ',name: 'Svalbard and Jan Mayen Islands'},
{ id:209,code: 'SZ',name: 'Swaziland'},
{ id:210,code: 'SE',name: 'Sweden'},
{ id:211,code: 'CH',name: 'Switzerland'},
{ id:212,code: 'SY',name: 'Syrian Arab Republic'},
{ id:213,code: 'TW',name: 'Taiwan'},
{ id:214,code: 'TJ',name: 'Tajikistan'},
{ id:215,code: 'TZ',name: 'Tanzania, United Republic of'},
{ id:216,code: 'TH',name: 'Thailand'},
{ id:217,code: 'TG',name: 'Togo'},
{ id:218,code: 'TK',name: 'Tokelau'},
{ id:219,code: 'TO',name: 'Tonga'},
{ id:220,code: 'TT',name: 'Trinidad and Tobago'},
{ id:221,code: 'TN',name: 'Tunisia'},
{ id:222,code: 'TR',name: 'Turkey'},
{ id:223,code: 'TM',name: 'Turkmenistan'},
{ id:224,code: 'TC',name: 'Turks and Caicos Islands'},
{ id:225,code: 'TV',name: 'Tuvalu'},
{ id:226,code: 'UG',name: 'Uganda'},
{ id:227,code: 'UA',name: 'Ukraine'},
{ id:228,code: 'AE',name: 'United Arab Emirates'},
{ id:229,code: 'GB',name: 'United Kingdom'},
{ id:230,code: 'US',name: 'United States'},
{ id:231,code: 'UM',name: 'United States minor outlying islands'},
{ id:232,code: 'UY',name: 'Uruguay'},
{ id:233,code: 'UZ',name: 'Uzbekistan'},
{ id:234,code: 'VU',name: 'Vanuatu'},
{ id:235,code: 'VA',name: 'Vatican City State'},
{ id:236,code: 'VE',name: 'Venezuela'},
{ id:237,code: 'VN',name: 'Vietnam'},
{ id:238,code: 'VG',name: 'Virgin Islands (British)'},
{ id:239,code: 'VI',name: 'Virgin Islands (U.S.)'},
{ id:240,code: 'WF',name: 'Wallis and Futuna Islands'},
{ id:241,code: 'EH',name: 'Western Sahara'},
{ id:242,code: 'YE',name: 'Yemen'},
{ id:243,code: 'ZR',name: 'Zaire'},
{ id:244,code: 'ZM',name: 'Zambia'},
{ id:245,code: 'ZW',name: 'Zimbabwe'}
  ];
 
  getPorts(page: number = 1, size: number = 255): AllCountry[] {
    return this.countrylists.slice((page - 1) * size, ((page - 1) * size) + size);
  }
  
  SchoolCountry;
  countryNames: string[];
  ResCountrys: string;


  Email_Id
  FirstName
  LastName
  PhoneNo
  Age
  student
  gender
  validation:FormGroup

  SchoolName
  SchoolAddress

  ResAdd
  ResCity
  ResPinCode
  ResState
  StudentDetails

  City
  State
  Country

  username
password
image

signup_type

items=[];

countryactive:boolean

item=[]
it=[]

searchModel

itemdata=[]
ResCountry
  Rescountryactive:boolean=false;
  LicenseStatus
  constructor(public menuCtrl:MenuController,public bdata:bigdata,public countrylist:countrylist,public alertCtrl:AlertController,public formbuilder:FormBuilder,public navCtrl: NavController, public navParams: NavParams) {
    this.countryactive=false
    this.username=this.navParams.get('username')
    this.password=this.navParams.get('password')  
    this.Email_Id=this.navParams.get('Email_Id')
  this.FirstName=this.navParams.get('FirstName')
  this.LastName=this.navParams.get('LastName') 
 this.PhoneNo=this.navParams.get('PhoneNo')
  this.Age=this.navParams.get('Age')
  this.student=this.navParams.get('student')    
  this.gender=this.navParams.get('gender')
  this.image=this.navParams.get('image')
this.signup_type=this.navParams.get('signup_type')
this.LicenseStatus=this.navParams.get('LicenseStatus')
if(this.LicenseStatus==true){
this.SchoolAddress=this.bdata.userdata.school_address
this.City=this.bdata.userdata.school_city
this.SchoolName=this.bdata.userdata.school_name
this.State=this.bdata.userdata.school_state
this.ResAdd=this.bdata.userdata.shipping_address
this.ResCity=this.bdata.userdata.shipping_city
this.ResPinCode=this.bdata.userdata.shipping_pincode
this.ResState=this.bdata.userdata.shipping_state
this.StudentDetails=this.bdata.userdata.student_class

this.ResCountrys=this.bdata.userdata.shipping_country
this.SchoolCountry=this.bdata.userdata.school_country
}

  this.validation=formbuilder.group({
    SchoolName:['',Validators.compose([Validators.maxLength(100), Validators.required])],
    ResAdd:['',Validators.compose([Validators.maxLength(100), Validators.required])],
    ResCity:['',Validators.compose([Validators.maxLength(100), Validators.required])],
    ResState:['',Validators.compose([Validators.maxLength(100), Validators.required])],
    ResPinCode:['',Validators.compose([Validators.maxLength(20), Validators.required])],
    ResCountry:['',Validators.compose([Validators.maxLength(500), Validators.required])],
    searchModel:['',Validators.compose([Validators.maxLength(500), Validators.required])],
    SchoolAddress:['',Validators.compose([Validators.maxLength(100), Validators.required ])],
    StudentDetails:['',Validators.compose([Validators.maxLength(20), Validators.required ])],
    City:['',Validators.compose([Validators.maxLength(100), Validators.required])] ,
    State:['',Validators.compose([Validators.maxLength(100), Validators.required])]
    })

    for(var i=0;i<this.countrylist.countrylistitem.length;i++)
    {
  this.itemdata.push(this.countrylist.countrylistitem[i].name)
    }
    localStorage['itemdata']=JSON.stringify(this.itemdata)
    this.initializeItems();
    this.countryNames = this.getPorts().map(values => values.name);
  }

  ResCountrysChange(event: { component: SelectSearchableComponent, value: any }) {      }

  SchoolCountryChange(event: {  component: SelectSearchableComponent, value: any  }) {    }

  initializeItems() {
  this.items=JSON.parse(localStorage['itemdata'])
  }  


  getItems(ev) {
    this.countryactive=true
    this.initializeItems(); 
    var val = ev.target.value;
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }


  getItemsRes(ev) {
    this.Rescountryactive=true
    this.initializeItems(); 
    var val = ev.target.value;
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }


  getcountry(item)
  {
    this.countryactive=false
    this.searchModel=item
  }

  
  getcountryRes(item)
  {
    this.Rescountryactive=false
    this.ResCountry=item
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SchooldetailsPage');
  }

  navigatetochilddetail(){    
 this.bdata.country=this.ResCountrys
localStorage["country"]=this.ResCountrys
    this.navCtrl.push(ChilddetailPage,{
      'Email_Id':this.Email_Id,
      'FirstName':this.FirstName,
      'LastName':this.LastName,
      'PhoneNo':this.PhoneNo,
      'Age':this.Age,
      'student':this.student,
      'gender':this.gender, 
      'SchoolName':this.validation.controls["SchoolName"].value,
      'ResAdd':this.validation.controls["ResAdd"].value,
      'ResCity':this.validation.controls["ResCity"].value,
      'ResState':this.validation.controls["ResState"].value,
      'ResPinCode':this.validation.controls["ResPinCode"].value,
      'ResCountry':  this.ResCountrys,
      'SchoolAddress':this.validation.controls["SchoolAddress"].value,
      'StudentDetails':this.validation.controls["StudentDetails"].value,
      'City':this.validation.controls["City"].value,
      'State':this.validation.controls["State"].value,
      'Country': this.SchoolCountry,
      'username':this.username,
      'password':this.password,
      'image':this.image,
      'signup_type':this.signup_type,
      'LicenseStatus':this.LicenseStatus
    })

  }


  ionViewWillEnter () {
    this.menuCtrl.swipeEnable( false, 'menu2' );
    }

 






}
