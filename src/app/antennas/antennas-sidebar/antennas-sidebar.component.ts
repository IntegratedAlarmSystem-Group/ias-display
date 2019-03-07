import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { AlarmService } from '../../data/alarm.service';
import { AntennasService } from '../antennas.service';
import { Alarm } from '../../data/alarm';
import { AlarmConfig } from '../../data/alarm-config';

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
  @Input() selectedAntenna: AlarmConfig = null;

  /** Event emitted to notify when an antenna is selected */
  @Output() antennaClicked = new EventEmitter<AlarmConfig>();

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
  * Return the list of antennas Alarm configuration
  * @returns {list} list of {@link AlarmConfig}
  */
  getAntennas(): AlarmConfig [] {
    return this.antennasService.antennasConfig;
  }

  /**
  * Return the list of alarm IDs of the children of the selectedAntenna
  * @returns {string[]} list of alarm IDs
  */
  getChildrenAlarmIds(): string[] {
    const alarm = this.alarmService.getAlarm(this.selectedAntenna);
    console.log('alarm.dependencies: ', alarm.dependencies);
    if (!alarm) {
      return [];
    }
    return alarm.dependencies;
  }

  /**
  * Return the list of Alarm configuration for global devices
  * @returns {list} list of {@link AlarmConfig}
  */
  getDevices(): AlarmConfig [] {
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
  * @param {AlarmConfig} alarmConfig configuration of the alarm
  * @return  {boolean} true if the alarm is selected or false if it is not
  */
  isSelected(alarmConfig: AlarmConfig): boolean {
    return this.selectedAntenna && (this.selectedAntenna.placemark === alarmConfig.placemark);
  }

  /**
  * Action performed when the antenna is clicked
  * @param {AlarmConfig} alarmConfig configuration of the clicked antenna
  */
  onClick(alarmConfig: AlarmConfig) {
    if ( this.selectedAntenna && (this.selectedAntenna.placemark === alarmConfig.placemark) ) {
      this.selectedAntenna = null;
    } else {
      this.selectedAntenna = alarmConfig;
    }
    this.antennaClicked.emit(this.selectedAntenna);
  }

}
