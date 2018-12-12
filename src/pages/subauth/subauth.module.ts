import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubauthPage } from './subauth';

@NgModule({
  declarations: [
    SubauthPage,
  ],
  imports: [
    IonicPageModule.forChild(SubauthPage),
  ],
})
export class SubauthPageModule {}
