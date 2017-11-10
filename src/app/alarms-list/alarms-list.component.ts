import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { WebSocketBridge } from 'django-channels';
import { AlarmService } from '../alarm.service';
import { Alarm, OperationalMode } from '../alarm';

@Component({
  selector: 'app-alarms-list',
  templateUrl: './alarms-list.component.html',
  styleUrls: ['./alarms-list.component.css']
})
export class AlarmsListComponent implements OnInit {
  //TODO: Refactor general structure for alarms and components
  alarmPks = [];

  constructor(private alarmService: AlarmService) { }

  ngOnInit() {
    this.alarmService.initialize();
    this.alarmService.alarmsObs.subscribe(alarms => {
      this.alarmPks = Object.keys(alarms);
    });
  }

  getAlarmColor(alarm: Alarm){
    if (alarm.mode == OperationalMode.maintenance) {
      return 'gray';
    }
    else if (alarm.mode == OperationalMode.unknown) {
      if (alarm.value == 0) {
        return 'blue';
      }
      else {
        return 'purple';
      }
    }
    else {
      if (alarm.value == 0) {
        return 'green';
      }
      else {
        return 'red';
      }
    }
  }
}
