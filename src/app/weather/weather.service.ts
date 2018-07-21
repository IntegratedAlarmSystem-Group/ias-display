import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject , SubscriptionLike as ISubscription } from 'rxjs';
import { AlarmComponent, AlarmImageSet } from '../shared/alarm/alarm.component';
import { AlarmService } from '../data/alarm.service';
import { Alarm } from '../data/alarm';
import { Assets } from '../settings';

@Injectable()
export class WeatherService {

  /**
  * Stream of notifications of changes in the dictionary of {@link Alarm} objects
  */
  public alarmChangeStream = new BehaviorSubject<any>(true);

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
  ) {
    this.initialize();
  }

  /**
  * Initializes the Service, subscribing to AlarmService and getting configuration from Webserver
  */
  initialize() {
    this.defineAlarmsIds();
    this.defineAlarmsAndImages();
    this.alarmServiceSubscription = this.alarmService.alarmChangeStream.subscribe(notification => {
      // if (notification === 'all') {
      const alarms = {};
        for (const ids of this.alarmsIds) {
          if (ids) {
            for (const id in ids) {
              if (id) {
                const alarm_id = ids[id];
                alarms[alarm_id] = this.alarmService.get(alarm_id);
              }
            }
          }
        }

      // } else {
        // if (notification === this.windsAlarmId) {
        //   this.windsAlarm = this.alarmService.get(notification);
        // }
        // if (notification === this.humidityAlarmId) {
        //   this.humidityAlarm = this.alarmService.get(notification);
        // }
        // if (notification === this.tempAlarmId) {
        //   this.tempAlarm = this.alarmService.get(notification);
        // }
      // }
    });
  }

  /**
  * Define the IDs of the alarms that the component should listen to
  */
  defineAlarmsIds() {
    this.alarmsIds = [
      {
        station: 'WS-MeteoCentral-Temperature',
        temperature: 'WS-MeteoCentral-Temperature',
        windspeed: 'WS-MeteoCentral-WindSpeed',
        humidity: 'WS-MeteoCentral-Humidity',
      },
      {
        station: 'WS-MeteoOSF-Temperature',
        temperature: 'WS-MeteoOSF-Temperature',
        windspeed: 'WS-MeteoOSF-WindSpeed',
        humidity: 'WS-MeteoOSF-Humidity',
      },
    ];

    // this.alarmService.alarms['WS-MeteoCentral'] = Alarm.asAlarm({
    //   'value': 1,
    //   'core_id': 'WS-MeteoCentral',
    //   'running_id': 'Dummy-cleared-valid',
    //   'mode': '5',
    //   'core_timestamp': 1267252440000,
    //   'validity': '1',
    //   'ack': false,
    //   'shelved': false,
    //   'dependencies': [],
    // });
    // this.alarmService.alarms['WS-MeteoCentral-Temperature'] = Alarm.asAlarm({
    //   'value': 1,
    //   'core_id': 'WS-MeteoCentral-Temperature',
    //   'running_id': 'Dummy-cleared-valid',
    //   'mode': '5',
    //   'core_timestamp': 1267252440000,
    //   'validity': '1',
    //   'ack': false,
    //   'shelved': false,
    //   'dependencies': [],
    // });
    // this.alarmService.alarms['WS-MeteoCentral-WindSpeed'] = Alarm.asAlarm({
    //   'value': 1,
    //   'core_id': 'WS-MeteoCentral-WindSpeed',
    //   'running_id': 'Dummy-cleared-valid',
    //   'mode': '5',
    //   'core_timestamp': 1267252440000,
    //   'validity': '1',
    //   'ack': false,
    //   'shelved': false,
    //   'dependencies': [],
    // });
    // this.alarmService.alarms['WS-MeteoCentral-Humidity'] = Alarm.asAlarm({
    //   'value': 1,
    //   'core_id': 'WS-MeteoCentral-Humidity',
    //   'running_id': 'Dummy-cleared-valid',
    //   'mode': '5',
    //   'core_timestamp': 1267252440000,
    //   'validity': '1',
    //   'ack': false,
    //   'shelved': false,
    //   'dependencies': [],
    // });
    // this.alarmService.changeAlarms('all');
  }

  /**
  * Define the alarms that the component should listen to and their respective icons
  */
  defineAlarmsAndImages() {
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
