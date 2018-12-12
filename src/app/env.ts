const HTTP_TIMEOUT: number = 60000;
export interface Enviroment{
mainApi:string,

timeout:number
}





export const Test:Enviroment={ 
	mainApi:'https://www.readsfeed.com/admin/userapi',
	//mainApi: 'http://88.198.133.25/ILR_dev/admin/userapi',  
	 timeout: HTTP_TIMEOUT  
}
export const ENV:Enviroment=Test;
