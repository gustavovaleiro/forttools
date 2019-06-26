import { Component, Input } from '@angular/core';
import { PlayerList, PlayerProvider } from '../../providers/player/player';


@Component({
  selector: 'player-item-list',
  templateUrl: 'player-item-list.component.html'
})
export class PlayerItemListComponent {
  @Input() public player: PlayerList = new PlayerList(" ", " ", false, false);
  constructor(public playerDB: PlayerProvider) { 
  }

  ngOnInit() {
   
  }
 public toggleFavorito(){
    this.player.favorite = ! this.player.favorite;
    this.playerDB.setFavorite(this.player.uuid, this.player.favorite);
  }
  public toggleCompare(){
    this.player.compare  = !this.player.compare;
  }
}
