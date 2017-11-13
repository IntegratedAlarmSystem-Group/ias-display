import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { WebSocketBridge } from 'django-channels';
import { AlarmService } from '../alarm.service';
import { Alarm, OperationalMode } from '../alarm';

/**
* Basic component to display alarms in boxes
*/
@Component({
  selector: 'app-alarms-list',
  templateUrl: './alarms-list.component.html',
  styleUrls: ['./alarms-list.component.css']
})
export class AlarmsListComponent implements OnInit {
  //TODO: Refactor general structure for alarms and components
  /**
  * Auxiliary list used to store the primary keys of alarms,
  * for displaying purposes
  */
  alarmPks = [];

  /**
  * The "constructor", injects the {@link AlarmService}
  *
  * @param {AlarmService} alarmService An instance of the AlarmService
  */
  constructor(private alarmService: AlarmService) { }

  /**
  * Function executed when the component is initiated
  *
  * Starts the {@link AlarmService} and subscribes to its messages
  */
  ngOnInit() {
    this.alarmService.initialize();
    this.alarmService.alarmsObs.subscribe(alarms => {
      this.alarmPks = Object.keys(alarms);
    });
  }

  /**
  * Defines the color that should be used to display an Alarm
  * @param {Alarm} alarm The Alarm object to display
  * @returns {string} The color that should be used
  * @example
  * AlarmsListComponent.getAlarmColor(alarm);
  */
  getAlarmColor(alarm: Alarm): string{
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
