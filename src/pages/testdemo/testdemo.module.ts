import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestdemoPage } from './testdemo';

@NgModule({
  declarations: [
    TestdemoPage,
  ],
  imports: [
    IonicPageModule.forChild(TestdemoPage),
  ],
})
export class TestdemoPageModule {}
