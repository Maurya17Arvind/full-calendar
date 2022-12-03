import { Component, OnInit, ViewChild } from '@angular/core';
import { HighchartsChartComponent } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import HC_networkgraph from 'highcharts/modules/networkgraph';
HC_networkgraph(Highcharts);
@Component({
  selector: 'app-network-graph',
  templateUrl: './network-graph.component.html',
  styleUrls: ['./network-graph.component.scss']
})
export class NetworkGraphComponent implements OnInit {


  @ViewChild('char') highchartsChartComponent = HighchartsChartComponent;
  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: any= {
    chart: {
      type: 'networkgraph',
      height: '1000',
      width: '1000'
    },
    title: {
        text: 'Network graph'
      },
    plotOptions: {
      networkgraph: {
        keys: ['from', 'to'],
        // layoutAlgorithm: {
        //   enableSimulation: true,
        //   friction: -0.9
        // }
      },
      series: {
        cursor: 'pointer',
        events: {
          click: (event: any) => {
            console.log('event :>> ', event.point);
          }
        },
        
      }
    },
    series: [
      {
        marker: {
          radius: 15,
        },
        type: 'networkgraph',
        dataLabels: {
          enabled: true,
          linkFormat: '',
          allowOverlap: true
        },
        draggable: false,

        data: []
        // nodes: [{
        //   id: 'Node 1',
        //   color: '#ecb27b',
        // }, {
        //   id: 'Node 2',
        //   color: '#ec7bb6'
        // }, ]
      }
    ],
  };

  constructor() { }

  ngOnInit() {
    const options = Highcharts.getOptions();
    const data:any  = [
      {
        from: 'Category1',
        to: 'Category2',
        id:1,
        custom: 'test'
    }, {
        from: 'Category1',
        to: 'Category3',
        id: 2,
        custom: 'test1'
    }
    ]
    console.log('data[0] :>> ', data);
    // Highcharts.setOptions({
    //   data : data
    // })
    data.forEach((element:any) => {
      this.chartOptions.series[0].data.push(element);
    });
    console.log('options :>> ', options);
  }

  public getNodeValue(event:any){
    console.log('event ---------------------++:>> ', event.point.series.data);
  }

}
