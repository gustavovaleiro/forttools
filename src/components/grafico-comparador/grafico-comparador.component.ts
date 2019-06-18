import { Component, Input, ViewChild } from '@angular/core';

import { RadialChartOptions, ChartDataSets, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'grafico-comparador',
  templateUrl: 'grafico-comparador.component.html'
})
export class GraficoComparadorComponent {
  @ViewChild("baseChart") chart: BaseChartDirective;
  @Input() public radarChartLabels: String[]= [ ];
  @Input()  public radarChartData: ChartDataSets[];
 
  public radarChartType: ChartType = 'radar';
  loaded = false;
  public radarChartOptions: RadialChartOptions = {
    responsive: true,
    aspectRatio: 1,
    scale: {
      gridLines: {
        color: "black",
        lineWidth: 1
      },
      angleLines: {
        display: true
      },
      ticks: {
        beginAtZero: true,
        min: 0,
        max: 100,
        stepSize: 25

      },
      pointLabels: {
        fontColor: "green"
      }
    },
    legend: {
      position: 'bottom'
    }
    
  };


  constructor() { 
  }

  ngOnInit() {
   
  }
 
  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
