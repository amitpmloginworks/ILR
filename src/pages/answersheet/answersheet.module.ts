import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnswersheetPage } from './answersheet';

@NgModule({
  declarations: [
    AnswersheetPage,
  ],
  imports: [
    IonicPageModule.forChild(AnswersheetPage),
  ],
})
export class AnswersheetPageModule {}
