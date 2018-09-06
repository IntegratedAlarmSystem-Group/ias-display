import { Component, OnInit } from '@angular/core';
import { RoutingService } from '../../data/routing.service';
import { AlarmComponent } from '../../shared/alarm/alarm.component';
import { AlarmService } from '../../data/alarm.service';
import { WeatherService } from '../weather.service';
import { Alarm } from '../../data/alarm';
import { Assets } from '../../settings';

/**
 * Summarized state of the weather alarm subsystem
 */
@Component({
  selector: 'app-weather-summary',
  templateUrl: './weather-summary.component.html',
  styleUrls: ['./weather-summary.component.scss']
})
export class WeatherSummaryComponent implements OnInit {

  /** ID of the Humidity Alarm */
  public humidityAlarmId: string;

  /** ID of the Temperature Alarm */
  public tempAlarmId: string;

  /** Wind ID of the Speed Alarm */
  public windsAlarmId: string;

  /**
   * Builds an instance of the component
   * @param {AlarmService} alarmService Service used to get the Alarms
   * @param {RoutingService} routing Service used to redirect to weather specialized views
   */
  constructor(
    private alarmService: AlarmService,
    public weatherService: WeatherService,
    private routing: RoutingService,
  ) { }

  /**
   * Creates the component
   */
  ngOnInit() {
    this.weatherService.initialize();
  }

  /** Returns the instance of the {@link Alarm}
  * @returns {Alarm} the {@link Alarm}
  */
  getAlarm(keyword: string): Alarm {
    if (this.weatherService.weatherSummaryConfig) {
      return this.alarmService.get(this.weatherService.weatherSummaryConfig[keyword]);
    }
  }

  /**
   * Redirect to table view applying the specified filter
   * @param filter Space-separated String that contains words used to
   * filter the alarms in the table view
   */
  goToTableFilteredBy(filter: string) {
    this.routing.tableWithFilter(filter);
  }

  /**
   * Redirect to the Weather View
   */
  redirect() {
    this.routing.goToWeather();
  }
}
