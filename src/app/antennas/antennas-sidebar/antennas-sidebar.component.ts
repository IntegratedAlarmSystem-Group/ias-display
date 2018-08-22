import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { AlarmService } from '../../data/alarm.service';
import { AntennasService, AntennaConfig } from '../antennas.service';
import { Alarm } from '../../data/alarm';

@Component({
  selector: 'app-antennas-sidebar',
  templateUrl: './antennas-sidebar.component.html',
  styleUrls: ['./antennas-sidebar.component.scss']
})
export class AntennasSidebarComponent implements OnInit {

  @Input() selectedAntenna = null;

  @Output() antennaClicked = new EventEmitter<AntennaConfig>();

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
   * @param {MapAntennaConfig} antennaConfig the Antenna configuration
   * @returns {string} the antenna name to display
   */
  getAntennaName(antennaConfig: AntennaConfig ): string {
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
  * @returns {list} list of {@link AntennaConfig}
  */
  getAntennasByGroup(groupID: string): AntennaConfig [] {
    return this.antennasService.sidebarAlarmsConfig[groupID];
  }

  /**
  * Indicates if the antenna is selected or not
  * @param {AntennaConfig} alarmConfig configuration of the alarm
  * @return  {boolean} true if the alarm is selected or false if it is not
  */
  isSelected(alarmConfig: AntennaConfig) {
    return this.selectedAntenna === alarmConfig;
  }

  /**
  * Action performed when the antenna is clicked
  */
  onClick(alarmConfig: AntennaConfig) {
    if ( this.selectedAntenna !== alarmConfig) {
      this.selectedAntenna = alarmConfig;
    } else {
      this.selectedAntenna = null;
    }
    this.antennaClicked.emit(this.selectedAntenna);
  }

}
