import { Component, OnInit, Input } from '@angular/core';

import { AlarmComponent } from '../../../shared/alarm/alarm.component';
import { AlarmService } from '../../../data/alarm.service';
import { Alarm } from '../../../data/alarm';

import { WeatherService, WeatherStationConfig } from '../../weather.service';


@Component({
  selector: 'app-weather-data-marker',
  templateUrl: './weather-data-marker.component.html',
  styleUrls: ['./weather-data-marker.component.scss']
})
export class WeatherDataMarkerComponent implements OnInit {


  /** Station config related to the component */
  @Input() stationConfig: WeatherStationConfig;

  /** Variable to manage if the marker should be highlighted
  * for example after the selection from a parent component
  */
  @Input() selected = false;

  /** Variable to manage if the marker should be highlighted from hover
  */
  @Input() onHover = false;

  /**
  * Builds an instance of the component
  * @param {WeatherService} weatherService Service used to get the configuration needed by the component
  * @param {AlarmService} alarmService Service used to get the Alarms
   */
  constructor(
    public weatherService: WeatherService,
    public alarmService: AlarmService,
  ) { }


  ngOnInit() {  }

  /**
  * Finds and returns an {@link Alarm} by ID in the {@link AlarmService}
  * @param {string} alarm_id the ID of the {@link Alarm}
  * @returns {Alarm} the {@link Alarm}
  */
  getAlarm(alarm_id: string): Alarm {
    return this.alarmService.get(alarm_id);
  }

}
