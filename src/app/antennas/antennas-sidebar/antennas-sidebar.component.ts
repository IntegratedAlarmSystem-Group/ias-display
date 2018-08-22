import { Component, OnInit, Input } from '@angular/core';
import { AlarmService } from '../../data/alarm.service';
import { AntennasService, MapAlarmConfig, SidebarAlarmConfig } from '../antennas.service';
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
  getAntennaName(antennaConfig: SidebarAlarmConfig ): string {
    return  antennaConfig.antenna + ' (' + antennaConfig.placemark + ')';
  }

  /**
  * Return the list of antennas groups Ids defined in the configuration
  * @returns {list} List of groups IDS
  */
  getAntennasGroups(): string [] {
    return Object.keys(this.antennasService.sidebarAlarmsConfig);
  }

  /**
  * Return the list of Alarm configuration by group
  * @returns {list} list of {@link SidebarAlarmConfig}
  */
  getAntennasByGroup(groupID: string): SidebarAlarmConfig [] {
    return this.antennasService.sidebarAlarmsConfig[groupID];
  }

}
