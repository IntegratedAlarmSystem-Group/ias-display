import { Component, OnInit } from '@angular/core';
import { TabularModule } from '../../tabular/tabular.module';
import { AlarmComponent, AlarmImageSet } from '../../shared/alarm/alarm.component';
import { Observable, BehaviorSubject , SubscriptionLike as ISubscription } from 'rxjs';
import { AlarmService } from '../../data/alarm.service';
import { Alarm } from '../../data/alarm';
import { Assets } from '../../settings';

@Component({
  selector: 'app-weather-sidebar',
  templateUrl: './weather-sidebar.component.html',
  styleUrls: ['./weather-sidebar.component.css', './weather-sidebar.component.scss']
})
export class WeatherSidebarComponent implements OnInit {

  /** Set of Humidity icons */
  public humidityImageSet: AlarmImageSet;

  /** Set of Temperature icons */
  public tempImageSet: AlarmImageSet;

  /** Set of Wind Speed icons */
  public windsImageSet: AlarmImageSet;

  /** Set of Humidity Unreliable icons */
  public humidityImageUnreliableSet: AlarmImageSet;

  /** Set of Temperature Unreliable icons */
  public tempImageUnreliableSet: AlarmImageSet;

  /** Set of Wind Speed Unreliable icons */
  public windsImageUnreliableSet: AlarmImageSet;

  /** Alarms Ids grouped by Weather Station**/
  public WeatherAlarmsIds: {
    station: string,
    temperature: string,
    windspeed: string,
    humidity: string
  }[];

  /** Dictionary of Weather Alarms indexed by alarm_id **/
  public WeatherAlarms: {} = {};

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
    this.defineAlarmsAndImages();

    this.WeatherAlarms['Alarm ID STATION 1'] = Alarm.asAlarm({
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
    this.WeatherAlarms['Alarm ID TEMP 1'] = Alarm.asAlarm({
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
    this.WeatherAlarms['Alarm ID WIND 1'] = Alarm.asAlarm({
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
    this.WeatherAlarms['Alarm ID HUM 1'] = Alarm.asAlarm({
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

    // this.alarmServiceSubscription = this.alarmService.alarmChangeStream.subscribe(notification => {
    //   // manage the notifications
    // });
  }

  getAlarm(alarm_id): Alarm {
    return this.WeatherAlarms[alarm_id];
  }

  /**
  * Define the alarms that the component should listen to and their respective icons
  */
  defineAlarmsAndImages() {
    this.WeatherAlarmsIds = [
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

    /** Set of Humidity icons */
    this.humidityImageSet = new AlarmImageSet({
      clear: Assets.ICONS + 'hum-valid-clear.svg',
      set_low: Assets.ICONS + 'hum-valid-low.svg',
      set_medium: Assets.ICONS + 'hum-valid-low.svg',
      set_high: Assets.ICONS + 'hum-valid-critical.svg',
      set_critical: Assets.ICONS + 'hum-valid-critical.svg',
      unknown: Assets.ICONS + 'hum-valid-unkn.svg',
      maintenance: Assets.ICONS + 'hum-valid-maint.svg',
      shelved: Assets.ICONS + 'hum-valid-clear.svg',
    });

    /** Set of Temperature icons */
    this.tempImageSet = new AlarmImageSet({
      clear: Assets.ICONS + 'temp-valid-clear.svg',
      set_low: Assets.ICONS + 'temp-valid-low.svg',
      set_medium: Assets.ICONS + 'temp-valid-low.svg',
      set_high: Assets.ICONS + 'temp-valid-critical.svg',
      set_critical: Assets.ICONS + 'temp-valid-critical.svg',
      unknown: Assets.ICONS + 'temp-valid-unkn.svg',
      maintenance: Assets.ICONS + 'temp-valid-maint.svg',
      shelved: Assets.ICONS + 'temp-valid-clear.svg',
    });

    /** Set of Wind Speed icons */
    this.windsImageSet = new AlarmImageSet({
      clear: Assets.ICONS + 'wind_s-valid-clear.svg',
      set_low: Assets.ICONS + 'wind_s-valid-low.svg',
      set_medium: Assets.ICONS + 'wind_s-valid-low.svg',
      set_high: Assets.ICONS + 'wind_s-valid-critical.svg',
      set_critical: Assets.ICONS + 'wind_s-valid-critical.svg',
      unknown: Assets.ICONS + 'wind_s-valid-unkn.svg',
      maintenance: Assets.ICONS + 'wind_s-valid-maint.svg',
      shelved: Assets.ICONS + 'wind_s-valid-clear.svg',
    });

    /** Set of Humidity Unreliable icons */
    this.humidityImageUnreliableSet = new AlarmImageSet({
      clear: Assets.ICONS + 'hum-invalid-clear.svg',
      set_low: Assets.ICONS + 'hum-invalid-low.svg',
      set_medium: Assets.ICONS + 'hum-invalid-low.svg',
      set_high: Assets.ICONS + 'hum-invalid-critical.svg',
      set_critical: Assets.ICONS + 'hum-invalid-critical.svg',
      unknown: Assets.ICONS + 'hum-invalid-unkn.svg',
      maintenance: Assets.ICONS + 'hum-invalid-maint.svg',
      shelved: Assets.ICONS + 'hum-invalid-clear.svg',
    });

    /** Set of Temperature Unreliable icons */
    this.tempImageUnreliableSet = new AlarmImageSet({
      clear: Assets.ICONS + 'temp-invalid-clear.svg',
      set_low: Assets.ICONS + 'temp-invalid-low.svg',
      set_medium: Assets.ICONS + 'temp-invalid-low.svg',
      set_high: Assets.ICONS + 'temp-invalid-critical.svg',
      set_critical: Assets.ICONS + 'temp-invalid-critical.svg',
      unknown: Assets.ICONS + 'temp-invalid-unkn.svg',
      maintenance: Assets.ICONS + 'temp-invalid-maint.svg',
      shelved: Assets.ICONS + 'temp-invalid-clear.svg',
    });

    /** Set of Wind Speed Unreliable icons */
    this.windsImageUnreliableSet = new AlarmImageSet({
      clear: Assets.ICONS + 'wind_s-invalid-clear.svg',
      set_low: Assets.ICONS + 'wind_s-invalid-low.svg',
      set_medium: Assets.ICONS + 'wind_s-invalid-low.svg',
      set_high: Assets.ICONS + 'wind_s-invalid-critical.svg',
      set_critical: Assets.ICONS + 'wind_s-invalid-critical.svg',
      unknown: Assets.ICONS + 'wind_s-invalid-unkn.svg',
      maintenance: Assets.ICONS + 'wind_s-invalid-maint.svg',
      shelved: Assets.ICONS + 'wind_s-invalid-clear.svg',
    });
  }

}
