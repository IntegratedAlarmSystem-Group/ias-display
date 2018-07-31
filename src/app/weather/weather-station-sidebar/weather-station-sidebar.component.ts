import { Component, OnInit, Input } from '@angular/core';
import { AlarmComponent } from '../../shared/alarm/alarm.component';
import { AlarmService } from '../../data/alarm.service';
import { WeatherService, WeatherStationConfig } from '../weather.service';
import { Alarm } from '../../data/alarm';
import { Assets } from '../../settings';

@Component({
  selector: 'app-weather-station-sidebar',
  templateUrl: './weather-station-sidebar.component.html',
  styleUrls: ['./weather-station-sidebar.component.scss']
})
export class WeatherStationSidebarComponent implements OnInit {

  /* Alarms Ids of the weather station */
  @Input() stationConfig: WeatherStationConfig;

  @Input() selectedAlarm: string;

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
  }

  /**
  * Finds and returns an {@link Alarm} by ID in the {@link AlarmService}
  * @param {string} alarm_id the ID of the {@link Alarm}
  * @returns {Alarm} the {@link Alarm}
  */
  getAlarm(alarm_id: string): Alarm {
    return this.alarmService.get(alarm_id);
  }

  /**
  * Returns the corresponding highlighted class when the component is selected
  * @returns {string} the highlighted class
  */
  getClass() {
      if (this.selectedAlarm === this.stationConfig.station) {
        return 'highlighted';
      }
      return '';
  }

}
