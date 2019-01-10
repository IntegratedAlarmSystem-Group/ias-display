import { Component, OnInit } from '@angular/core';
import { RoutingService } from '../../app-routing/routing.service';
import { AlarmComponent } from '../../shared/alarm/alarm.component';
import { AlarmService } from '../../data/alarm.service';
import { WeatherService } from '../weather.service';
import { Alarm } from '../../data/alarm';
import { AlarmConfig } from '../../data/alarm-config';
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

  /**
   * Builds an instance of the component
   * @param {AlarmService} alarmService Service used to get the Alarms
   * @param {WeatherService} weatherService Service used to retrieve and handle weather configuration data
   * @param {RoutingService} routing Service used to redirect to weather specialized views
   */
  constructor(
    private alarmService: AlarmService,
    public weatherService: WeatherService,
    private routing: RoutingService,
  ) { }

  /**
   * Initiates the component, initializes the {@link WeatherService} if not already initialized
   */
  ngOnInit() {
    this.weatherService.initialize();
  }

  /**
  * Returns the instance of the {@link Alarm}
  * @param {AlarmConfig} config the corresponding AlarmConfig from where to get the {@link Alarm}
  * @returns {Alarm} the {@link Alarm} associated to the given {@link AlarmConfig}
  */
  getAlarm(config: AlarmConfig): Alarm {
    if (config) {
      return this.alarmService.get(config.alarm_id);
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
