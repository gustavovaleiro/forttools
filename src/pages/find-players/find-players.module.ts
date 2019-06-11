import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FindPlayersPage } from './find-players';

@NgModule({
  declarations: [
    FindPlayersPage,
  ],
  imports: [
    IonicPageModule.forChild(FindPlayersPage),
  ],
})
export class FindPlayersPageModule {}
