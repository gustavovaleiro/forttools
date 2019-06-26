import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { PlayerService } from '../../services/domain/player.service';

import { PlayerStatusDTO } from '../../models/playerstats.dto';
import { ChartDataSets } from 'chart.js';

@IonicPage()
@Component({
  selector: 'compara-jogadores',
  templateUrl: 'compara-jogadores.html',
})
export class ComparaJogadoresPage {
 
   public players:PlayerStatusDTO[] = [];
   public uuids:string[] = [];
   public terminouCarregamento:boolean=false;
   public radarChartLabels: String[]= [ ];
   public radarChartData: ChartDataSets[] = [];

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public playerService: PlayerService, 
   ) {
      this.uuids=navParams.get('uuids');
      this.uuids.map(s => playerService.findPlayer(s).subscribe( (result: PlayerStatusDTO) =>{
            if(result){
                this.players.push(result)
            }

            if(this.players.length ==this.uuids.length ){
                this.terminouCarregamento = true;
                this.inicializaGraficoComponent();
            }
            console.log(' falta buscar ' + (this.uuids.length -  this.players.length).toString(10) + " player" );
       }, (error:any) => { console.log( JSON.stringify(error)   )} ))
       
  }
  inicializaGraficoComponent(){
    this.radarChartLabels =["Partidas", "Vitorias", "Matanças","Tx Vitoria", "K/D"];

    let maxMatch = Math.max(...this.players.map(p => p.totals.matchesplayed));
    let maxWins = Math.max(...this.players.map(p => p.totals.wins));
    let maxKills = Math.max(...this.players.map(p => p.totals.kills));
    let maxWinRate = Math.max(...this.players.map(p => p.totals.winrate));
    let maxKd = Math.max(...this.players.map(p => p.totals.kd));

  
    this.players.forEach(p => {
        this.radarChartData.push({data: [p.totals.matchesplayed*100/maxMatch, p.totals.wins*100/maxWins, p.totals.kills*100/maxKills,
                                p.totals.winrate*100/maxWinRate, p.totals.kd*100/maxKd], label: p.username });
    });

    console.log(this.radarChartLabels);
    console.log( JSON.stringify(this.radarChartData)   )
    

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ComparaJogadores');
  }



}
