import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParentDataPage } from './parent-data';

@NgModule({
  declarations: [
    ParentDataPage,
  ],
  imports: [
    IonicPageModule.forChild(ParentDataPage),
  ],
})
export class ParentDataPageModule {}
