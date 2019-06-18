import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlayerService } from '../../services/domain/player.service';
import { PlayerStatusDTO } from '../../models/playerstats.dto';
import { RadialChartOptions, ChartDataSets, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Observable } from 'rxjs';
import { PlayerList, PlayerProvider } from '../../providers/player/player';
import { PlayerAccountInfoDTO } from '../../models/data.dto';

@IonicPage()
@Component({
  selector: 'page-find-players',
  templateUrl: 'find-players.html',
})
export class FindPlayersPage {
 
  playerNameToSearch: string;
  loaded = false;

  public players: PlayerList[] = [];

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public playerService: PlayerService, 
     private playerBd: PlayerProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindPlayersPage');
  }

  searchPlayer(){
    if(this.players.filter( p => p.username === this.playerNameToSearch).length == 0  ){
        console.log("Não existe player com o nome " + this.playerNameToSearch )
        
        this.playerService.findUuidByName(this.playerNameToSearch).subscribe( player =>{
          this.insert(player);
        }, error => console.error(error));
    }else{
      console.log("Existe player com o nome " + this.playerNameToSearch )
    }
     
  }

  public calculaDataSetPlayer
  initComparing(){
    this.loaded=true;
    console.log(this.loaded);
  }

  public insert (player: PlayerAccountInfoDTO){
    this.playerBd.insert(player);
    this.players.push(PlayerList.from(player, false,false));
  }
  /*this.player = responsePlayer;
  this.players.push(this.player);
  this.nomes.push(responsePlayer.username);


  let maxMatch = Math.max(...this.players.map(p => p.totals.matchesplayed));
  let maxWins = Math.max(...this.players.map(p => p.totals.wins));
  let maxKills = Math.max(...this.players.map(p => p.totals.kills));
  let maxWinRate = Math.max(...this.players.map(p => p.totals.winrate));
  let maxKd = Math.max(...this.players.map(p => p.totals.kd));

  this.radarChartData.length =0;
  this.players.forEach(p => {
    this.radarChartData.push({data: [p.totals.matchesplayed*100/maxMatch, p.totals.wins*100/maxWins, p.totals.kills*100/maxKills,
                             p.totals.winrate*100/maxWinRate, p.totals.kd*100/maxKd], label: p.username });
  });
  
   if(this.chart !== undefined){
    console.log("Entrou no if pra destruir o chart")
    this.chart.ngOnDestroy();
    this.chart.chart = this.chart.getChartBuilder(this.chart.ctx);  
  }*/
}
