import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Observable, BehaviorSubject , SubscriptionLike as ISubscription } from 'rxjs';
import { AlarmService } from '../../data/alarm.service';
import { Alarm } from '../../data/alarm';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css', './weather.component.scss']
})
export class WeatherComponent implements OnInit {

  panelOpenState = false;

  /** Alarms Ids grouped by Weather Station**/
  public alarmsIds: {
    station: string,
    temperature: string,
    windspeed: string,
    humidity: string
  }[];

  /** Dictionary of Weather Alarms indexed by alarm_id **/
  public alarms: {[core_id: string]: Alarm } = {};

  /** Subscription to changes in the Alarms stored in the {@link AlarmService} */
  private alarmServiceSubscription: ISubscription;

  /**
   * Builds an instance of the component
   * @param {AlarmService} alarmService Service used to get the Alarms
   */
  constructor(
    private alarmService: AlarmService,
  ) { }

  ngOnInit() {
    this.alarmsIds = [
      {
        station: 'Alarm ID STATION 1',
        temperature: 'Alarm ID TEMP 1',
        windspeed: 'Alarm ID WIND 1',
        humidity: 'Alarm ID HUM 1',
      },
      {
        station: 'Alarm ID STATION 1',
        temperature: 'Alarm ID TEMP 1',
        windspeed: 'Alarm ID WIND 1',
        humidity: 'Alarm ID HUM 1',
      },
    ];

    this.alarms['Alarm ID STATION 1'] = Alarm.asAlarm({
      'value': 1,
      'core_id': 'Alarm ID STATION 1',
      'running_id': 'Dummy-cleared-valid',
      'mode': '5',
      'core_timestamp': 1267252440000,
      'validity': '1',
      'ack': false,
      'shelved': false,
      'dependencies': [],
    });
    this.alarms['Alarm ID TEMP 1'] = Alarm.asAlarm({
      'value': 1,
      'core_id': 'Alarm ID TEMP 1',
      'running_id': 'Dummy-cleared-valid',
      'mode': '5',
      'core_timestamp': 1267252440000,
      'validity': '1',
      'ack': false,
      'shelved': false,
      'dependencies': [],
    });
    this.alarms['Alarm ID WIND 1'] = Alarm.asAlarm({
      'value': 1,
      'core_id': 'Alarm ID WIND 1',
      'running_id': 'Dummy-cleared-valid',
      'mode': '5',
      'core_timestamp': 1267252440000,
      'validity': '1',
      'ack': false,
      'shelved': false,
      'dependencies': [],
    });
    this.alarms['Alarm ID HUM 1'] = Alarm.asAlarm({
      'value': 1,
      'core_id': 'Alarm ID HUM 1',
      'running_id': 'Dummy-cleared-valid',
      'mode': '5',
      'core_timestamp': 1267252440000,
      'validity': '1',
      'ack': false,
      'shelved': false,
      'dependencies': [],
    });
    console.log('WeatherComponent, this.alarms = ', this.alarms);
  }

}
