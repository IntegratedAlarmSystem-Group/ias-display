import { Component, OnInit } from '@angular/core';
import { Alarm } from '../alarm';

@Component({
  selector: 'app-alarms-list',
  templateUrl: './alarms-list.component.html',
  styleUrls: ['./alarms-list.component.css']
})
export class AlarmsListComponent implements OnInit {
  //TODO: Refactor general structure for alarms and components
  alarms: Alarm[];

  constructor() {
    this.alarms = [
      new Alarm({
        pk:1,
        value:0,
        core_id:'ANTENNA_DV1$WVR$AMBIENT_TEMPERATURE',
        running_id:'ANTENNA_DV1$WVR$AMBIENT_TEMPERATURE@ATC',
        core_timestamp:0
      }),
      new Alarm({
        pk:2,
        value:1,
        core_id:'ANTENNA_DV2$WVR$AMBIENT_TEMPERATURE',
        running_id:'ANTENNA_DV2$WVR$AMBIENT_TEMPERATURE@ATC',
        core_timestamp:0
      }),
      new Alarm({
        pk:3,
        value:0,
        core_id:'ANTENNA_DV3$WVR$AMBIENT_TEMPERATURE',
        running_id:'ANTENNA_DV3$WVR$AMBIENT_TEMPERATURE@ATC',
        core_timestamp:0
      })
    ];
  }

  ngOnInit() {
  }

}
