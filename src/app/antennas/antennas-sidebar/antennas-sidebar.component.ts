import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { AlarmComponent } from '../../shared/alarm/alarm.component';
import { AlarmService } from '../../data/alarm.service';
import { AntennasService, AntennaConfig } from '../antennas.service';
import { Alarm } from '../../data/alarm';

/**
 * Display used to show the list of antennas' alarms
 */
@Component({
  selector: 'app-antennas-sidebar',
  templateUrl: './antennas-sidebar.component.html',
  styleUrls: ['./antennas-sidebar.component.scss']
})
export class AntennasSidebarComponent implements OnInit {

  /** Selected antenna object, null if it is nothing selected */
  @Input() selectedAntenna = null;

  /** Event emitted to notify when an antenna is selected */
  @Output() antennaClicked = new EventEmitter<AntennaConfig>();

  /**
  * Builds an instance of the component
  * @param {AntennasService} antennasService Service used to get the configuration needed by the component
  * @param {AlarmService} alarmService Service used to get the Alarms
  * @param {RoutingService} routing Service used to redirect to other views
   */
  constructor(
    public antennasService: AntennasService,
    public alarmService: AlarmService
  ) { }

  /**
   * Executed after the component is instantiated.
   * Initializes the {@link AntennasService} if not already initialized
   */
  ngOnInit() {
    this.antennasService.initialize();
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
    return antennaConfig.antenna;
  }

  /**
  * Return the list of antennas groups Ids defined in the configuration
  * @returns {list} List of groups IDS
  */
  getAntennasGroups(): string [] {
    return Object.keys(this.antennasService.antennasConfig);
  }

  /**
  * Return the list of Alarm configuration by group
  * @returns {list} list of {@link AntennaConfig}
  */
  getAntennasByGroup(groupID: string): AntennaConfig [] {
    return this.antennasService.antennasConfig[groupID];
  }

  /**
  * Return the list of antennas Alarm configuration
  * @returns {list} list of {@link AntennaConfig}
  */
  getAntennas(): AntennaConfig [] {
    let antennas = [];
    for (const group of this.getAntennasGroups()) {
      antennas = antennas.concat(this.antennasService.antennasConfig[group]);
    }
    return antennas;
  }

  /**
  * Return the list of Alarm configuration for global devices
  * @returns {list} list of {@link AntennaConfig}
  */
  getDevices(): AntennaConfig [] {
    return this.antennasService.devicesConfig;
  }

  /**
  * If there is a selected antenna it will be unselected
  */
  unselectAntenna() {
    this.selectedAntenna = null;
    this.antennaClicked.emit(this.selectedAntenna);
  }

  /**
  * Indicates if the antenna is selected or not
  * @param {AntennaConfig} alarmConfig configuration of the alarm
  * @return  {boolean} true if the alarm is selected or false if it is not
  */
  isSelected(alarmConfig: AntennaConfig): boolean {
    return this.selectedAntenna && (this.selectedAntenna.placemark === alarmConfig.placemark);
  }

  /**
  * Action performed when the antenna is clicked
  * @param {AntennaConfig} alarmConfig configuration of the clicked antenna
  */
  onClick(alarmConfig: AntennaConfig) {
    if ( this.selectedAntenna && (this.selectedAntenna.placemark === alarmConfig.placemark) ) {
      this.selectedAntenna = null;
    } else {
      this.selectedAntenna = alarmConfig;
    }
    this.antennaClicked.emit(this.selectedAntenna);
  }

}
