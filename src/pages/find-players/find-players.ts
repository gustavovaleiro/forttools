import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { PlayerService } from '../../services/domain/player.service';
import { PlayerList, PlayerProvider } from '../../providers/player/player';
import { PlayerAccountInfoDTO } from '../../models/data.dto';
import { t, r } from '@angular/core/src/render3';
import { HomePage } from '../home/home';
import { ComparaJogadoresPage } from '../compara-jogadores/compara-jogadores';

@IonicPage()
@Component({
  selector: 'page-find-players',
  templateUrl: 'find-players.html',
})
export class FindPlayersPage {
 
  playerNameToSearch: string;
  loaded = false;
  onlyFavorite=false;
  private allPlayers: PlayerList[] = [];
  public players: PlayerList[] = [];

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public playerService: PlayerService, 
     private playerBd: PlayerProvider,
    ) {
      this.getAllPlayers();
  }

  public  ionViewDidLoad() {
    console.log('ionViewDidLoad FindPlayersPage');
  }

  public searchPlayer(){
    if(this.allPlayers && this.allPlayers.filter( p => p.username === this.playerNameToSearch).length > 0  ){
      console.log("Existe player com o nome " + this.playerNameToSearch )

    }else{
      console.log("Não existe player com o nome " + this.playerNameToSearch )
        
        this.playerService.findUuidByName(this.playerNameToSearch).subscribe( player =>{
          this.insert(player);
        }, error => console.error(error));
    }
     
  }

  public compare(){
    let uuidsToCompare: string[] = [];
    console.log("Começando a pegar string de uuids dos jogadores marcados para comparar");
    uuidsToCompare.push(...this.allPlayers.filter( p => p.compare).map( p => p.uuid));
    console.log("Terminei de pegar string de uuids dos jogadores marcados para comparar");
    if(uuidsToCompare.length == 0)
        return;
    else if (uuidsToCompare.length <= 4){
      this.navCtrl.push(ComparaJogadoresPage, {uuids: uuidsToCompare});
    }
  }
  public filtraFavorito(){
      this.onlyFavorite = !this.onlyFavorite;
      if(this.onlyFavorite){
        this.allPlayers.length=0;
        this.allPlayers.push(...this.players);
        this.players.length =0;
        this.players.push(...this.allPlayers.filter(p => p.favorite));
      }else{
        this.players.length =0;
        this.players.push(...this.allPlayers);
      }
    
  }

  private getAllPlayers() {
    this.playerBd.getAll(this.onlyFavorite).then((result: any[]) => {
      this.allPlayers.length = 0;
      this.players.length=0;
      this.allPlayers.push(...result);
      this.players.push(...this.allPlayers);
      console.log(JSON.stringify(this.allPlayers));
    });
  }

  initComparing(){
    this.loaded=true;
    console.log(this.loaded);
  }

  public insert (player: PlayerAccountInfoDTO){
    this.playerBd.insert(player);
    this.allPlayers.push( PlayerList.from(player, false,false) );
  }
  
}
