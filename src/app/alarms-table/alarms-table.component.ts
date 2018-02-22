import { Component, Input, OnInit } from '@angular/core';
import { ViewCell, LocalDataSource } from 'ng2-smart-table';


@Component({
  selector: 'status-view',
  template: `
    <span [ngStyle]="getStyleTest(this.value)"> &#9650;  </span>
  `,
})
export class StatusViewComponent implements ViewCell, OnInit {

  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  getStyleTest(value: number): object{

    let color : string;

    if (value < 5) {
      color = 'green';
    } else {
      color = 'red';
    }

    return {'color': color};

  }

  ngOnInit(){
    this.renderValue = this.value.toString().toUpperCase();
  }
}

@Component({
  selector: 'app-alarms-table',
  templateUrl: './alarms-table.component.html',
  styleUrls: ['./alarms-table.component.css', './alarms-table.component.scss']
})
export class AlarmsTableComponent implements OnInit {

  source: LocalDataSource;

  settings = {
    hideSubHeader: true,
    actions: false,
    columns: {
      status: {
        title: 'Status',
        type: 'custom',
        renderComponent: StatusViewComponent
      },
      timestamp: {
        title: 'Core Time'
      },
      core_id: {
        title: 'Core ID'
      },
      mode: {
        title: 'Mode'
      }
    }
  };

  data = [
    {
      status: 4,
      timestamp: "2/2/18, 6:30:51 PM",
      core_id: "AlarmTemperature7",
      mode: "operational"
    },
    {
      status: 2,
      timestamp: "2/2/18, 6:30:54 PM",
      core_id: "AlarmTemperature5",
      mode: "operational"
    },
    {
      status: 11,
      timestamp: "2/2/18, 6:30:57 PM",
      core_id: "AlarmTemperature1",
      mode: "operational"
    },
    {
      status: 20,
      timestamp: "2/2/18, 6:35:57 PM",
      core_id: "AlarmTemperature12",
      mode: "operational"
    },
    {
      status: 3,
      timestamp: "2/2/18, 6:40:57 PM",
      core_id: "AlarmTemperature20",
      mode: "operational"
    }
  ];

  constructor(){
    this.source = new LocalDataSource(this.data);
  }

  onSearch(query: string = ''){
    if (query === ''){

      this.source.setFilter([]);

    } else {

      this.source.setFilter([
          {
            field: 'timestamp',
            search: query
          },
          {
            field: 'core_id',
            search: query
          },
          {
            field: 'mode',
            search: query
          },
      ], false);

    }
  }

  ngOnInit() {
  }

}
