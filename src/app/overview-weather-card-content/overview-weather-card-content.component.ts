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

  defineAlarmsAndImages() {
    /** Set of Humidity icons */
    this.humidityAlarmId = 'Alarmdummy';
    this.tempAlarmId = 'Alarmdummy';
    this.windsAlarmId = 'Alarmdummy';

    this.humidityImageSet = new AlarmImageSet({
      clear: Assets.ICONS + 'humidity-1.svg',
      set_low: Assets.ICONS + 'humidity-3.svg',
      set_medium: Assets.ICONS + 'humidity-3.svg',
      set_high: Assets.ICONS + 'humidity-3.svg',
      set_critical: Assets.ICONS + 'humidity-3.svg',
      unknown: Assets.ICONS + 'humidity-0.svg',
      maintenance: Assets.ICONS + 'humidity-0.svg',
      shelved: Assets.ICONS + 'humidity-1.svg',
    });

    /** Set of Temperature icons */
    this.tempImageSet = new AlarmImageSet({
      clear: Assets.ICONS + 'temp-1.svg',
      set_low: Assets.ICONS + 'temp-3.svg',
      set_medium: Assets.ICONS + 'temp-3.svg',
      set_high: Assets.ICONS + 'temp-3.svg',
      set_critical: Assets.ICONS + 'temp-3.svg',
      unknown: Assets.ICONS + 'temp-0.svg',
      maintenance: Assets.ICONS + 'temp-0.svg',
      shelved: Assets.ICONS + 'temp-1.svg',
    });

    /** Set of Wind Speed icons */
    this.windsImageSet = new AlarmImageSet({
      clear: Assets.ICONS + 'winds-1.svg',
      set_low: Assets.ICONS + 'winds-3.svg',
      set_medium: Assets.ICONS + 'winds-3.svg',
      set_high: Assets.ICONS + 'winds-3.svg',
      set_critical: Assets.ICONS + 'winds-3.svg',
      unknown: Assets.ICONS + 'winds-0.svg',
      maintenance: Assets.ICONS + 'winds-0.svg',
      shelved: Assets.ICONS + 'winds-1.svg',
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
