import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VotePage } from './vote';

@NgModule({
  declarations: [
    VotePage,
  ],
  imports: [
    IonicPageModule.forChild(VotePage),
  ],
  exports:[
    VotePage,
  ]
})
export class VotePageModule {}
