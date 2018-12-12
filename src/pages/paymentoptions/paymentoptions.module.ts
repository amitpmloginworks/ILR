import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentoptionsPage } from './paymentoptions';

@NgModule({
  declarations: [
    PaymentoptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentoptionsPage),
  ],
})
export class PaymentoptionsPageModule {}
