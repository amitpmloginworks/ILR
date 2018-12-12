import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
/*
  Generated class for the SettingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SettingProvider {
  private theme: BehaviorSubject<String>;
  constructor(public http: HttpClient) {
    console.log('Hello SettingProvider Provider');
    this.theme = new BehaviorSubject('mediumfontsize-theme');
  }
  setActiveTheme(val) { 
 
    this.theme.next(val);
}

getActiveTheme() {
    return this.theme.asObservable();
}
}
