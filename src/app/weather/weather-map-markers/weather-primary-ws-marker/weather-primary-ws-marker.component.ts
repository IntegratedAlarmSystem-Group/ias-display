import { Component, OnInit, Input } from '@angular/core';

import { AlarmComponent } from '../../../shared/alarm/alarm.component';
import { AlarmImageSet } from '../../../shared/alarm/alarm.component';
import { AlarmService } from '../../../data/alarm.service';
import { Alarm } from '../../../data/alarm';

import { WeatherService, WeatherStationConfig } from '../../weather.service';

import { Assets } from '../../../settings';

@Component({
  selector: 'app-weather-primary-ws-marker',
  templateUrl: './weather-primary-ws-marker.component.html',
  styleUrls: ['./weather-primary-ws-marker.component.scss']
})
export class WeatherPrimaryWsMarkerComponent implements OnInit {

  /** ID of the Alarm */
  public alarmId: string;

  /** Station config related to the component */
  @Input() stationConfig: WeatherStationConfig;

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
  * @returns {Alarm} the {@link Alarm}
  */
  getAlarm(): Alarm {
    return this.alarmService.get(this.stationConfig.station);
  }

}
