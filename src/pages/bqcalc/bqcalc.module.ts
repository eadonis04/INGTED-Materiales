import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BqcalcPage } from './bqcalc';


@NgModule({
  declarations: [
    BqcalcPage,
  ],
  imports: [
    IonicPageModule.forChild(BqcalcPage),
  ],
})
export class BqcalcPageModule {}
