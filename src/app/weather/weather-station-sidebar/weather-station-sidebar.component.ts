import { Component, OnInit, Input } from '@angular/core';
import { AlarmComponent } from '../../shared/alarm/alarm.component';
import { AlarmService } from '../../data/alarm.service';
import { WeatherService, WeatherStationConfig } from '../weather.service';
import { Alarm } from '../../data/alarm';
import { Assets } from '../../settings';

/**
 * Component to display an item containing a weather station summary in the interactive Sidebar
 */
@Component({
  selector: 'app-weather-station-sidebar',
  templateUrl: './weather-station-sidebar.component.html',
  styleUrls: ['./weather-station-sidebar.component.scss']
})
export class WeatherStationSidebarComponent implements OnInit {

  /** Weather station config object */
  @Input() stationConfig: WeatherStationConfig;

  /** Selected weather station config object, null if it is nothing selected */
  @Input() selectedAlarm: WeatherStationConfig = null;

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

  /**
  * Returns the corresponding highlighted class when the component is selected
  * @returns {string} the highlighted class
  */
  getClass() {
    if (this.selectedAlarm && (this.selectedAlarm.station === this.stationConfig.station)) {
      return 'highlighted';
    }
    return '';
  }

}
