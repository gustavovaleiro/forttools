import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComparaJogadoresPage } from './compara-jogadores';


@NgModule({
  declarations: [
    ComparaJogadoresPage,
  ],
  imports: [
    IonicPageModule.forChild(ComparaJogadoresPage),
  ],
})
export class FindPlayersPageModule {}
