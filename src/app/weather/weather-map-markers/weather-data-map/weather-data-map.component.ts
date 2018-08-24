import { Component, OnInit, Input } from '@angular/core';

import { AlarmComponent } from '../../../shared/alarm/alarm.component';
import { AlarmService } from '../../../data/alarm.service';
import { Alarm } from '../../../data/alarm';

import { WeatherService, WeatherStationConfig } from '../../weather.service';


@Component({
  selector: 'app-weather-data-map',
  templateUrl: './weather-data-map.component.html',
  styleUrls: ['./weather-data-map.component.scss']
})
export class WeatherDataMapComponent implements OnInit {


  /** Placemark name related to the data component */
  @Input() placemark;


  /** Local alarm configuration */
  alarmConfig;

  /**
  * Builds an instance of the component
  * @param {WeatherService} weatherService Service used to get the configuration needed by the component
  * @param {AlarmService} alarmService Service used to get the Alarms
   */
  constructor(
    public weatherService: WeatherService,
    public alarmService: AlarmService,
  ) { }


  ngOnInit() {
    this.initialize();
  }

  /**
  * Initialize the component with the related alarm configuration
  *
  * The alarm configuration should be retrieved using the placemark name, to be able
  * to be displayed on the weather map
  */
  initialize () {
    this.alarmConfig = this.getAlarmConfig(this.placemark);
  }

  /**
  * Checks if there is a placemark related to the alarm
  */
  alarmHasLocation(placemark) {
    const index = Object.keys(
      this.weatherService.weatherStationsConfig).indexOf(placemark);
    if (index > -1) {
      return true;
    } else {
      return false;
    }
  }

  /**
  * Retrieves the alarm configuration related to the placemark
  */
  getAlarmConfig(placemark) {
    const hasLocation = this.alarmHasLocation(placemark);
    if (hasLocation === true) {
      return this.weatherService
                .weatherStationsConfig[placemark];
    }
  }

  /**
  * Finds and returns an {@link Alarm} by ID in the {@link AlarmService}
  * @param {string} alarm_id the ID of the {@link Alarm}
  * @returns {Alarm} the {@link Alarm}
  */
  getAlarm(alarm_id: string): Alarm {
    return this.alarmService.get(alarm_id);
  }


}
