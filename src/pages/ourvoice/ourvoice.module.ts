import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OurvoicePage } from './ourvoice';

@NgModule({
  declarations: [
    OurvoicePage,
  ],
  imports: [
    IonicPageModule.forChild(OurvoicePage),
  ],
})
export class OurvoicePageModule {}
