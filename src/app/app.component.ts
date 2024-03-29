import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { DatabaseProvider } from '../providers/database/database';
import { HomePage } from '../pages/home/home';
import { FindPlayersPage } from '../pages/find-players/find-players';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = null;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, dbProvider: DatabaseProvider) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      dbProvider.createDatabase()
        .then( () =>{
          this.openHomePage(splashScreen);
        })
        .catch(() => {
          this.openHomePage(splashScreen);
        })
    });
  }

  private openHomePage(splashScreen: SplashScreen){
    splashScreen.hide();
    this.rootPage = FindPlayersPage;
  }
}
