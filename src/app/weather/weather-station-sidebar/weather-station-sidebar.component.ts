import { Component, OnInit, Input } from '@angular/core';
import { AlarmService } from '../../data/alarm.service';
import { WeatherService } from '../weather.service';
import { AlarmConfig } from '../../data/alarm-config';

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
  @Input() stationConfig: AlarmConfig;

  /** Selected weather station config object, null if it is nothing selected */
  @Input() selectedAlarm: AlarmConfig = null;

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
  getClass(): string {
    if (this.selectedAlarm && (this.selectedAlarm.alarm_id === this.stationConfig.alarm_id)) {
      return 'highlighted';
    }
    return '';
  }

}
