import { NgModule, ErrorHandler } from '@angular/core';
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

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    FindPlayersPage

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    FindPlayersPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthInterceptorProvider,
    PlayerService,
    
  ]
})
export class AppModule {}
