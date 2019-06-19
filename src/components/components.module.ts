import { NgModule } from '@angular/core';
import { GraficoComparadorComponent } from './grafico-comparador/grafico-comparador.component';
import { PlayerItemListComponent } from './player-item-list/player-item-list.component';
@NgModule({
	declarations: [GraficoComparadorComponent, PlayerItemListComponent],
	imports: [],
	exports: [GraficoComparadorComponent, PlayerItemListComponent]
})
export class ComponentsModule {}
