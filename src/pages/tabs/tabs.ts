import { Component } from '@angular/core';

import { FindPlayersPage } from '../find-players/find-players';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = FindPlayersPage;

  constructor() {

  }
}
