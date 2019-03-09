import { Component, OnInit, Input } from '@angular/core';
import { AlarmComponent } from '../../../shared/alarm/alarm.component';
import { AlarmImageSet } from '../../../shared/alarm/alarm.component';
import { AlarmService } from '../../../data/alarm.service';
import { Alarm } from '../../../data/alarm';
import { AlarmConfig } from '../../../data/alarm-config';
import { WeatherService } from '../../weather.service';
import { Assets } from '../../../settings';

/**
 * Marker to display backups weather station in a map
 */
@Component({
  selector: 'app-weather-backup-ws-marker',
  templateUrl: './weather-backup-ws-marker.component.html',
  styleUrls: ['./weather-backup-ws-marker.component.scss']
})
export class WeatherBackupWsMarkerComponent implements OnInit {

  /** ID of the Alarm */
  public alarmId: string;

  /** Station config related to the component */
  @Input() stationConfig: AlarmConfig;

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
  ngOnInit() {
  }

  /**
  * Returns the {@link Alarm} corresponding to the weather station
  * @returns {Alarm} the {@link Alarm}
  */
  getAlarm(): Alarm {
    return this.alarmService.getAlarm(this.stationConfig);
  }

}
