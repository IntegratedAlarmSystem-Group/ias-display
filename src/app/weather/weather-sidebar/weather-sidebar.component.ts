import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlarmComponent } from '../../shared/alarm/alarm.component';
import { AlarmService } from '../../data/alarm.service';
import { CdbService } from '../../data/cdb.service';
import { WeatherService } from '../weather.service';
import { Alarm } from '../../data/alarm';
import { Assets } from '../../settings';

/**
* Component used to display Weather Alarms in an interactive sidebar
*/
@Component({
  selector: 'app-weather-sidebar',
  templateUrl: './weather-sidebar.component.html',
  styleUrls: ['./weather-sidebar.component.scss']
})
export class WeatherSidebarComponent implements OnInit {

  @Output() panelClicked = new EventEmitter<string>();

  selectedAlarm = '';

  /**
  * Builds an instance of the component
  * @param {WeatherService} weatherService Service used to get the configuration needed by the component
  * @param {AlarmService} alarmService Service used to get the Alarms
  * @param {CdbService} cdbService Service used to get configuration from the Configuration Database
   */
  constructor(
    public weatherService: WeatherService,
    public alarmService: AlarmService,
    public cdbService: CdbService,
  ) { }

  /**
  * Executed after the component is instantiated
  */
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
  * Finds and returns the documentation url of an {@link Alarm} by ID in the {@link CdbService}
  * @param {string} alarm_id the ID of the {@link Alarm}
  * @returns {string} the URl
  */
  getAlarmUrl(alarm_id: string): string {
    return this.cdbService.getAlarmsInformationUrl(alarm_id);
  }

  onPanelClose(station: string) {
    if (this.selectedAlarm === station) {
      this.selectedAlarm = '';
      this.panelClicked.emit(this.selectedAlarm);
    }
  }

  onPanelOpen(station: string) {
    this.selectedAlarm = station;
    this.panelClicked.emit(this.selectedAlarm);
  }
}
