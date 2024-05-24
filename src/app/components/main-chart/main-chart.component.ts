import { Component, Input, OnChanges, SimpleChanges, ViewChild } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ApexLegend,
  ApexFill
} from "ng-apexcharts";
import { getChartConfigs } from "./chart.config";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
};

@Component({
  selector: 'app-main-chart',
  templateUrl: './main-chart.component.html',
  styleUrls: ['./main-chart.component.scss']
})
export class MainChartComponent implements OnChanges {

  @ViewChild("chart") chart!: ChartComponent;
  @Input() generalData: ChartData = {
    serie1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 10],
    serie2: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    xCategories: ["2011 Q1", "2011 Q2", "2011 Q3", "2011 Q4", "2012 Q1", "2012 Q2", "2012 Q3", "2012 Q4"]
  };
  @Input() personalData: ChartData = {
    serie1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 10],
    serie2: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1 ],
    xCategories: ["2011 Q1", "2011 Q2", "2011 Q3", "2011 Q4", "2012 Q1", "2012 Q2", "2012 Q3", "2012 Q4"]
  };
  
  public chartOptions: any = getChartConfigs(this.personalData);
  public allUsersChartOptions: any = getChartConfigs(this.generalData);
  constructor() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      // console.log(changes);
    }
  }
}

export interface ChartData {
  serie1: number[];
  serie2: number[];
  xCategories: string[];
}