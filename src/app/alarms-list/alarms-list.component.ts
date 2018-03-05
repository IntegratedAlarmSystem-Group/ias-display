import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { WebSocketBridge } from 'django-channels';
import { AlarmService } from '../alarm.service';
import { Alarm, OperationalMode, Validity } from '../alarm';

/**
* Basic component to display alarms in boxes
*/
@Component({
  selector: 'app-alarms-list',
  templateUrl: './alarms-list.component.html',
  styleUrls: ['./alarms-list.component.css']
})
export class AlarmsListComponent implements OnInit {

  subscription;

  //TODO: Refactor general structure for alarms and components
  /**
  * Auxiliary list used to store the core_ids of alarms,
  * for displaying purposes
  */
  alarmIds = [];

  /**
  * Auxiliary list with non principal alarm modes
  */

  secondaryModes = [
    OperationalMode.startup,
    OperationalMode.initialization,
    OperationalMode.closing,
    OperationalMode.shuttedown
  ];

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
    this.subscription = this.alarmService.alarmChangeStream.subscribe(notification => {
      this.alarmIds = Object.keys(this.alarmService.alarms);
    });
  }

  /**
  * Function executed when the component is destroyed
  */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
  * Defines the color that should be used to display an Alarm
  * @param {Alarm} alarm The Alarm object to display
  * @returns {string} The color that should be used
  * @example
  * AlarmsListComponent.getAlarmColor(alarm);
  */
  getAlarmColor(alarm: Alarm): string{

    if (alarm.validity == Validity.reliable){

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
      };

    } else {

      // Unreliable validity
      return 'MediumPurple';

    }

  }

  setAlarmStatusDivStyle(alarm: Alarm): object{
    // Color based on alarm mode and value
    // Background color depends on the alarm validity

    let color: string;
    let background: string;
    let opacity: number;

    if (alarm.mode == OperationalMode.maintenance) {
      color = '#9b9797';
    }
    else if (alarm.mode == OperationalMode.unknown) {
      color = '#73adf0';
    }
    else {
      if (alarm.value == 0) {
        color = '#95ff95';
      }
      else {
        color = 'red';
      }
    };

    if (alarm.validity == Validity.reliable){
      background = color;
    } else {
      background = 'none';
    };

    let mode = Number(alarm.mode);  // TODO: check alarm value types

    if (this.secondaryModes.indexOf(mode) > -1){
      opacity = 0.5;
    } else {
      opacity = 1.0;
    }


    let styles = {
      'border': `2px solid ${color}`,
      'background': background,
      'opacity': opacity
    }

    return styles;

  }

  setAlarmStatusSymbolStyle(alarm: Alarm): object{
    // returns a symbol based on the alarm value

    let color : string;
    let visibility : string;

    if (alarm.value == 1) {

      visibility = 'visible';
      color = 'white';
      // if (alarm.validity == Validity.reliable){
      //   color = 'white';
      // }
      // else {
      //   if (alarm.mode == OperationalMode.maintenance) { color = '#9b9797'; }
      //   else if (alarm.mode == OperationalMode.unknown) { color = '#73adf0'; }
      //   else { color = 'red'; };
      // };

    }
    else {
      visibility = 'hidden';
      color = 'black';
    };

    let styles = {
      'visibility': visibility,
      'color': color
    };

    return styles;
  }

}
