import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoutingService } from '../routing.service';
import { Observable, BehaviorSubject , SubscriptionLike as ISubscription } from 'rxjs';
import { AlarmComponent, AlarmImageSet } from '../alarm/alarm.component';
import { AlarmService } from '../alarm.service';
import { Alarm } from '../alarm';
import { Assets } from '../settings';

/**
 * Summarized state of the weather alarm subsystem
 */
@Component({
  selector: 'app-overview-weather-card-content',
  templateUrl: './overview-weather-card-content.component.html',
  styleUrls: ['./overview-weather-card-content.component.css']
})
export class OverviewWeatherCardContentComponent implements OnInit, OnDestroy {

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

  /** Humidity Alarm */
  public humidityAlarm: Alarm;

  /** Temperature Alarm */
  public tempAlarm: Alarm;

  /** Wind Speed Alarm */
  public windsAlarm: Alarm;

  /** ID of the Humidity Alarm */
  public humidityAlarmId: string;

  /** ID of the Temperature Alarm */
  public tempAlarmId: string;

  /** Wind ID of the Speed Alarm */
  public windsAlarmId: string;

  /** Subscription to changes in the Alarms stored in the {@link AlarmService} */
  private alarmServiceSubscription: ISubscription;

  /**
   * Builds an instance of the component
   * @param {AlarmService} alarmService Service used to get the Alarms
   * @param {RoutingService} routing Service used to redirect to weather specialized views
   */
  constructor(
    private alarmService: AlarmService,
    private routing: RoutingService,
  ) { }

  /**
   * Creates the component
   * Subscribes to new alarms from the {@link AlarmService}
   */
  ngOnInit() {
    this.defineAlarmsAndImages();
    this.alarmServiceSubscription = this.alarmService.alarmChangeStream.subscribe(notification => {
      if (notification === 'all') {
        this.humidityAlarm = this.alarmService.get(this.humidityAlarmId);
        this.tempAlarm = this.alarmService.get(this.tempAlarmId);
        this.windsAlarm = this.alarmService.get(this.windsAlarmId);

      } else {
        if (notification === this.windsAlarmId) {
          this.windsAlarm = this.alarmService.get(notification);
        }
        if (notification === this.humidityAlarmId) {
          this.humidityAlarm = this.alarmService.get(notification);
        }
        if (notification === this.tempAlarmId) {
          this.tempAlarm = this.alarmService.get(notification);
        }
      }
    });
  }

  /**
  * Unsubscribes from  {@link AlarmService} when the component is destroyed
  */
  ngOnDestroy() {
    this.alarmServiceSubscription.unsubscribe();
  }

  /**
  * Define the alarms that the component should listen to and their respective icons
  */
  defineAlarmsAndImages() {
    this.humidityAlarmId = 'WS-Humidity-Global';
    this.tempAlarmId = 'WS-Temperature-Global';
    this.windsAlarmId = 'WS-WindSpeed-Global';

    /** Set of Humidity icons */
    this.humidityImageSet = new AlarmImageSet({
      clear: Assets.ICONS + 'hum-valid-clear.svg',
      set_low: Assets.ICONS + 'hum-valid-critical.svg',
      set_medium: Assets.ICONS + 'hum-valid-critical.svg',
      set_high: Assets.ICONS + 'hum-valid-critical.svg',
      set_critical: Assets.ICONS + 'hum-valid-critical.svg',
      unknown: Assets.ICONS + 'hum-valid-unkn.svg',
      maintenance: Assets.ICONS + 'hum-valid-maint.svg',
      shelved: Assets.ICONS + 'hum-valid-clear.svg',
    });

    /** Set of Temperature icons */
    this.tempImageSet = new AlarmImageSet({
      clear: Assets.ICONS + 'temp-valid-clear.svg',
      set_low: Assets.ICONS + 'temp-valid-critical.svg',
      set_medium: Assets.ICONS + 'temp-valid-critical.svg',
      set_high: Assets.ICONS + 'temp-valid-critical.svg',
      set_critical: Assets.ICONS + 'temp-valid-critical.svg',
      unknown: Assets.ICONS + 'temp-valid-unkn.svg',
      maintenance: Assets.ICONS + 'temp-valid-maint.svg',
      shelved: Assets.ICONS + 'temp-valid-clear.svg',
    });

    /** Set of Wind Speed icons */
    this.windsImageSet = new AlarmImageSet({
      clear: Assets.ICONS + 'wind_s-valid-clear.svg',
      set_low: Assets.ICONS + 'wind_s-valid-critical.svg',
      set_medium: Assets.ICONS + 'wind_s-valid-critical.svg',
      set_high: Assets.ICONS + 'wind_s-valid-critical.svg',
      set_critical: Assets.ICONS + 'wind_s-valid-critical.svg',
      unknown: Assets.ICONS + 'wind_s-valid-unkn.svg',
      maintenance: Assets.ICONS + 'wind_s-valid-maint.svg',
      shelved: Assets.ICONS + 'wind_s-valid-clear.svg',
    });

    /** Set of Humidity Unreliable icons */
    this.humidityImageUnreliableSet = new AlarmImageSet({
      clear: Assets.ICONS + 'hum-invalid-clear.svg',
      set_low: Assets.ICONS + 'hum-invalid-critical.svg',
      set_medium: Assets.ICONS + 'hum-invalid-critical.svg',
      set_high: Assets.ICONS + 'hum-invalid-critical.svg',
      set_critical: Assets.ICONS + 'hum-invalid-critical.svg',
      unknown: Assets.ICONS + 'hum-invalid-unkn.svg',
      maintenance: Assets.ICONS + 'hum-invalid-maint.svg',
      shelved: Assets.ICONS + 'hum-invalid-clear.svg',
    });

    /** Set of Temperature Unreliable icons */
    this.tempImageUnreliableSet = new AlarmImageSet({
      clear: Assets.ICONS + 'temp-invalid-clear.svg',
      set_low: Assets.ICONS + 'temp-invalid-critical.svg',
      set_medium: Assets.ICONS + 'temp-invalid-critical.svg',
      set_high: Assets.ICONS + 'temp-invalid-critical.svg',
      set_critical: Assets.ICONS + 'temp-invalid-critical.svg',
      unknown: Assets.ICONS + 'temp-invalid-unkn.svg',
      maintenance: Assets.ICONS + 'temp-invalid-maint.svg',
      shelved: Assets.ICONS + 'temp-invalid-clear.svg',
    });

    /** Set of Wind Speed Unreliable icons */
    this.windsImageUnreliableSet = new AlarmImageSet({
      clear: Assets.ICONS + 'wind_s-invalid-clear.svg',
      set_low: Assets.ICONS + 'wind_s-invalid-critical.svg',
      set_medium: Assets.ICONS + 'wind_s-invalid-critical.svg',
      set_high: Assets.ICONS + 'wind_s-invalid-critical.svg',
      set_critical: Assets.ICONS + 'wind_s-invalid-critical.svg',
      unknown: Assets.ICONS + 'wind_s-invalid-unkn.svg',
      maintenance: Assets.ICONS + 'wind_s-invalid-maint.svg',
      shelved: Assets.ICONS + 'wind_s-invalid-clear.svg',
    });
  }

  /**
   * Redirect to table view applying the specified filter
   * @param filter Space-separated String that contains words used to
   * filter the alarms in the table view
   */
  goToTableFilteredBy(filter: string) {
    this.routing.tableWithFilter(filter);
  }
}
