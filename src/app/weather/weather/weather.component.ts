import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Observable, BehaviorSubject , SubscriptionLike as ISubscription } from 'rxjs';
import { WeatherService } from '../weather.service';
import { Alarm } from '../../data/alarm';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css', './weather.component.scss']
})
export class WeatherComponent implements OnInit {

  panelOpenState = false;

  /** Dictionary of Weather Alarms indexed by alarm_id **/
  public alarms: {[core_id: string]: Alarm } = {};

  /** Subscription to changes in the Alarms stored in the {@link WeatherService} */
  private weatherServiceSubscription: ISubscription;

  /**
   * Builds an instance of the component
   * @param {WeatherService} weatherService Service used to get the Alarms
   */
  constructor(
    private weatherService: WeatherService,
  ) { }

  ngOnInit() {
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
  }

}
