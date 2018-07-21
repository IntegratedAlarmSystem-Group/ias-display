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
    this.alarms['WS-MeteoCentral'] = Alarm.asAlarm({
      'value': 1,
      'core_id': 'WS-MeteoCentral',
      'running_id': 'Dummy-cleared-valid',
      'mode': '5',
      'core_timestamp': 1267252440000,
      'validity': '1',
      'ack': false,
      'shelved': false,
      'dependencies': [],
    });
    this.alarms['WS-MeteoCentral-Temperature'] = Alarm.asAlarm({
      'value': 1,
      'core_id': 'WS-MeteoCentral-Temperature',
      'running_id': 'Dummy-cleared-valid',
      'mode': '5',
      'core_timestamp': 1267252440000,
      'validity': '1',
      'ack': false,
      'shelved': false,
      'dependencies': [],
    });
    this.alarms['WS-MeteoCentral-WindSpeed'] = Alarm.asAlarm({
      'value': 1,
      'core_id': 'WS-MeteoCentral-WindSpeed',
      'running_id': 'Dummy-cleared-valid',
      'mode': '5',
      'core_timestamp': 1267252440000,
      'validity': '1',
      'ack': false,
      'shelved': false,
      'dependencies': [],
    });
    this.alarms['WS-MeteoCentral-Humidity'] = Alarm.asAlarm({
      'value': 1,
      'core_id': 'WS-MeteoCentral-Humidity',
      'running_id': 'Dummy-cleared-valid',
      'mode': '5',
      'core_timestamp': 1267252440000,
      'validity': '1',
      'ack': false,
      'shelved': false,
      'dependencies': [],
    });
    console.log('Weather Component, alarms = ', this.alarms);
  }

}
