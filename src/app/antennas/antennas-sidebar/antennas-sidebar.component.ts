import { Component, OnInit, Input } from '@angular/core';
import { AlarmService } from '../../data/alarm.service';
import { AntennasService, MapAlarmConfig } from '../antennas.service';
import { Alarm } from '../../data/alarm';

@Component({
  selector: 'app-antennas-sidebar',
  templateUrl: './antennas-sidebar.component.html',
  styleUrls: ['./antennas-sidebar.component.scss']
})
export class AntennasSidebarComponent implements OnInit {

  @Input() selectedStation = '';

  /**
  * Builds an instance of the component
  * @param {AntennasService} antennasService Service used to get the configuration needed by the component
  * @param {AlarmService} alarmService Service used to get the Alarms
   */
  constructor(
    public antennasService: AntennasService,
    public alarmService: AlarmService
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
   * Build the antenna name to display. It is built with the Antenna's code and the current associated pad.
   * @param {MapAlarmConfig} antennaConfig the Antenna configuration
   * @returns {string} the antenna name to display
   */
  getAntennaName(antennaConfig: MapAlarmConfig ): string {
    const antennaCode = 'DV01';
    const padCode = antennaConfig.placemark;
    return  antennaCode + ' (' + padCode + ')';
  }

}
