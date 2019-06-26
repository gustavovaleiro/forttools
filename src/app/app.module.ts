import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {HttpClientModule} from '@angular/common/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PlayerService } from '../services/domain/player.service';
import {  AuthInterceptorProvider } from '../interceptors/auth-interceptor';
import { FindPlayersPage } from '../pages/find-players/find-players';
import { ChartsModule } from 'ng2-charts';
import { GraficoComparadorComponent } from '../components/grafico-comparador/grafico-comparador.component';
import { SQLite } from '@ionic-native/sqlite'
import { PlayerProvider } from '../providers/player/player';
import { DatabaseProvider } from '../providers/database/database';
import { PlayerItemListComponent } from '../components/player-item-list/player-item-list.component';
import { ComparaJogadoresPage } from '../pages/compara-jogadores/compara-jogadores';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    FindPlayersPage,
    GraficoComparadorComponent,
    PlayerItemListComponent,
    ComparaJogadoresPage
  
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    FindPlayersPage,
    ComparaJogadoresPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    AuthInterceptorProvider,
    PlayerService,
    PlayerProvider,
    DatabaseProvider
  ]
})
export class AppModule {}
