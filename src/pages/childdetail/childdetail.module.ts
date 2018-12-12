import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChilddetailPage } from './childdetail';

@NgModule({
  declarations: [
    ChilddetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ChilddetailPage),
  ],
})
export class ChilddetailPageModule {}
