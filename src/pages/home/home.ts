import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PlayerService } from '../../services/domain/player.service';
import {  PlayerStatusDTO } from '../../models/playerstats.dto';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  player: PlayerStatusDTO;
  loading = false;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public playerStatsService: PlayerService ) {

  }

  ionViewDidLoad(){

    //faço uma chamada assincriona e me inscrevo em subscribe c
    this.playerStatsService.findPlayer(" ")
     .subscribe(response => {
        console.log(response);
        this.player = response;
        this.loading=true;
     }, error =>{
    
       console.log(error);
     });
  }




}
