import { Component, Input, OnInit } from '@angular/core';
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

  @Input() alarms: {[core_id: string]: Alarm };

  @Input() alarmsIds: {
    station: string,
    temperature: string,
    windspeed: string,
    humidity: string
  }[];


  // /** Dictionary of Weather Alarms indexed by alarm_id **/
  // public WeatherAlarms: {} = {};
  //
  // /** Subscription to changes in the Alarms stored in the {@link AlarmService} */
  // private alarmServiceSubscription: ISubscription;
  //

  /**
   * Builds an instance of the component
   */
  constructor( ) { }

  ngOnInit() {
    console.log('WeatherSidebarComponent, this.alarms = ', this.alarms);
    this.defineAlarmsAndImages();



    // this.alarmServiceSubscription = this.alarmService.alarmChangeStream.subscribe(notification => {
    //   // manage the notifications
    // });
  }

  getAlarm(alarm_id): Alarm {
    return this.alarms[alarm_id];
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
