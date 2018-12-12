import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SchooldetailsPage } from './schooldetails';

@NgModule({
  declarations: [
    SchooldetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(SchooldetailsPage),
  ],
})
export class SchooldetailsPageModule {}
