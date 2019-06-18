import { Component } from '@angular/core';

import { FindPlayersPage } from '../find-players/find-players';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = FindPlayersPage;

  constructor() {

  }
}
