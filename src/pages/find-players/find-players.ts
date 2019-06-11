import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlayerService } from '../../services/domain/player.service';
import { PlayerStatusDTO } from '../../models/playerstats.dto';


@IonicPage()
@Component({
  selector: 'page-find-players',
  templateUrl: 'find-players.html',
})
export class FindPlayersPage {
  playerNameToSearch: string;
  loading = false;
  player: PlayerStatusDTO;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public playerService: PlayerService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindPlayersPage');
  }

  searchPlayer(){
       this.playerService.findUuidByName(this.playerNameToSearch)
       .subscribe(responseUid =>{
         this.playerService.findPlayer(responseUid.data.uid)
          .subscribe(responsePlayer => {
             this.player = responsePlayer;
             this.loading=true;
          })
       });
  }
}
