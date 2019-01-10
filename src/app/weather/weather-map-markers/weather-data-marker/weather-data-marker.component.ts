import { Component, OnInit, Input } from '@angular/core';
import { AlarmComponent } from '../../../shared/alarm/alarm.component';
import { AlarmService } from '../../../data/alarm.service';
import { Alarm } from '../../../data/alarm';
import { AlarmConfig } from '../../../data/alarm-config';
import { WeatherService } from '../../weather.service';


/**
 * Marker to display the weather station summary information in a map
 */
@Component({
  selector: 'app-weather-data-marker',
  templateUrl: './weather-data-marker.component.html',
  styleUrls: ['./weather-data-marker.component.scss']
})
export class WeatherDataMarkerComponent implements OnInit {

  /** Station config related to the component */
  @Input() stationConfig: AlarmConfig;

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

  /**
   * Executed after the component is instantiated.
   */
  ngOnInit() { }

}
