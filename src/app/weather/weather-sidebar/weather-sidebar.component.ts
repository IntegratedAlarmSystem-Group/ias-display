import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ClipboardService } from 'ngx-clipboard';
import { AlarmService } from '../../data/alarm.service';
import { AlarmConfig } from '../../data/alarm-config';
import { Alarm, Value, OperationalMode } from '../../data/alarm';
import { WeatherService } from '../weather.service';
import { SubscriptionLike as ISubscription } from 'rxjs';

/**
* Component used to display Weather Alarms in an interactive sidebar
*/
@Component({
  selector: 'app-weather-sidebar',
  templateUrl: './weather-sidebar.component.html',
  styleUrls: ['./weather-sidebar.component.scss']
})
export class WeatherSidebarComponent implements OnInit {

  /** Selected weather station config object, null if it is nothing selected */
  @Input() selectedStation: AlarmConfig = null;

  /** Event emitted to notify when an weather station is selected */
  @Output() panelClicked = new EventEmitter<AlarmConfig>();

  /**
   * Subscription to changes in alarms related to affected antennas
   */
  affectedAntennasSubscription: ISubscription;

  /** List of affected antennas by some alarm */
  affectedAntennas: string[] = [];

  /** Map to detect the presence of affected antennas */
  groupHasAffectedAntennas = {};

  /**
  * Builds an instance of the component
  * @param {WeatherService} weatherService Service used to get the configuration needed by the component
  * @param {AlarmService} alarmService Service used to get the Alarms
  * @param {ClipboardService} clipboardService Service used to copy text to clipboard
  * @param {MatSnackBar} snackBar Service used to notify user actions
   */
  constructor(
    public weatherService: WeatherService,
    public alarmService: AlarmService,
    private clipboardService: ClipboardService,
    public snackBar: MatSnackBar
  ) { }

  /**
  * Executed after the component is instantiated.
  * Initializes the {@link WeatherService} if not already initialized
  */
  ngOnInit() {
    this.weatherService.initialize();
    this.affectedAntennasSubscription = this.weatherService.affectedAntennasUpdate
      .subscribe((update) => {
        if (update === true) {
          const localAffectedAntennas = [];
          for (const antennaName of Object.keys(this.weatherService.affectedAntennaHighPriorityAlarm)) {
            const antennaAlarm = this.weatherService.affectedAntennaHighPriorityAlarm[antennaName];
            if (antennaAlarm) {
              if (antennaAlarm.value > 0) {
                localAffectedAntennas.push(antennaName);
              }
            }
          }
          this.affectedAntennas = localAffectedAntennas;
          for (const stationConfig of this.weatherService.weatherStationsConfig) {
            this.groupHasAffectedAntennas[stationConfig.group] = (
              this.getAffectedAntennas(stationConfig).length > 0
            );
          }
        }
      }
    );
  }

  /**
  * Copy list of antennas associated to the given weather station
  * @param {string} station the ID of the weather station
  * @returns {boolean} true if the data was copied to the clipboard, false if not
  */
  copyAntennas(stationConfig: AlarmConfig): boolean {
    const antennas = this.getAntennas(stationConfig);
    const result = antennas.join(',');
    const status = this.clipboardService.copyFromContent(result);
    let message = '';
    if (status) {
      message = 'Antennas copied to clipboard';
    } else {
      message = 'ERROR: Antennas were not copied!';
    }
    this.openSnackBar(message, 'Done');
    return status;
  }

  /**
  * Copy list of affected antennas associated to the given weather station
  * @param {string} station the ID of the weather station
  * @returns {boolean} true if the data was copied to the clipboard, false if not
  */
  copyAffectedAntennas(stationConfig: AlarmConfig): boolean {
    const antennas = this.getAffectedAntennas(stationConfig);
    const result = antennas.join(',');
    const status = this.clipboardService.copyFromContent(result);
    let message = '';
    if (status) {
      message = 'Antennas copied to clipboard';
    } else {
      message = 'ERROR: Antennas were not copied!';
    }
    this.openSnackBar(message, 'Done');
    return status;
  }

  /**
  * Return list of antennas associated to the given weather station
  * @param {string} station the ID of the weather station
  * @returns {string[]} a list with the name of nearby antennas
  */
  getAntennas(stationConfig: AlarmConfig): string[] {
    const response = [];
    if ( this.weatherService.padsStatus && stationConfig.group !== '' ) {
        const pads = this.weatherService.padsStatus[stationConfig.group];
        for (const pad_name in pads) {
            if (pads[pad_name]) {
                response.push(pads[pad_name]);
            }
        }
    }
    return response.sort();
  }

  /**
  * Return list of affected antennas associated to the given weather station
  * @param {string} station the ID of the weather station
  * @returns {string[]} a list with the name of nearby antennas
  */
  getAffectedAntennas(stationConfig: AlarmConfig): string[] {
    const stationAntennas = this.getAntennas(stationConfig);
    const allAffectedAntennas = this.affectedAntennas;
    const response = allAffectedAntennas.filter(
      value => stationAntennas.indexOf(value) > -1);
    return response.sort();
  }

  /**
  * Return list of not affected antennas associated to the given weather station
  * @param {string} station the ID of the weather station
  * @returns {string[]} a list with the name of nearby antennas
  */
  getNotAffectedAntennas(stationConfig: AlarmConfig): string[] {
    const stationAntennas = this.getAntennas(stationConfig);
    const allAffectedAntennas = this.affectedAntennas;
    const response = stationAntennas.filter(
      value => allAffectedAntennas.indexOf(value) < 0);
    return response.sort();
  }

  /**
  * Return a classified list of objects for antennas associated to the given weather station
  * @param {string} station the ID of the weather station
  * @returns {object[]} a list of objects with related information
  */
  getAntennasDetailedList(stationConfig: AlarmConfig): string[] {
    const stationAffectedAntennas = this.getAffectedAntennas(stationConfig);
    const stationNotAffectedAntennas = this.getNotAffectedAntennas(stationConfig);
    const response = [];
    for (let i = 0; i < stationAffectedAntennas.length; i++) {
      const antenna = stationAffectedAntennas[i];
      const highAlarm = this.weatherService.affectedAntennaHighPriorityAlarm[antenna];
      if (highAlarm) {
        response.push({
          'value': highAlarm.value,
          'name': antenna,
          'classes': this.getAffectedAntennaColorClasses(highAlarm.core_id),
        });
      } else {
        response.push({
          'value': Value.cleared,
          'name': antenna,
          'classes': [],
        });
      }
    }
    for (let i = 0; i < stationNotAffectedAntennas.length; i++) {
      const antenna = stationNotAffectedAntennas[i];
      response.push({
        'value': Value.cleared,
        'name': antenna,
        'classes': []
      });
    }
    return response.sort((a, b) => a.value < b.value ? 1 : a.value > b.value ? -1 : 0);
  }

  /**
   * Get the color class for an affected antenna
   */
  getAffectedAntennaColorClasses(alarmId: string) {
    if (this.alarmService.isAlarmIndexAvailable(alarmId)) {
      const alarm = this.alarmService.get(alarmId);
      let colorClass = '';
      if (alarm.shelved === true) {
        colorClass = 'green';
      } else if (alarm.mode === OperationalMode.unknown) {
        colorClass = 'blue';
      } else if (alarm.showAsMaintenance()) {
        colorClass = 'grey';
      } else if (alarm.value === Value.cleared) {
        colorClass = 'green';
      } else if (alarm.value === Value.set_low) {
        colorClass = 'yellow';
      } else if (alarm.value === Value.set_medium) {
        colorClass = 'yellow';
      } else if (alarm.value === Value.set_high) {
        colorClass = 'red';
      } else if (alarm.value === Value.set_critical) {
        colorClass = 'red';
      } else {
        colorClass = 'green';
      }

      if (colorClass !== '') {
        if (alarm.validity === 0) {
          return ['text-affected-' + colorClass, 'text-affected-' + 'unreliable'];
        } else {
          return ['text-affected-' + colorClass];
        }
      }

    } else {
      return ['none'];
    }
  }


  /**
  * Indicates if the weather station is selected or not
  * @param {AlarmConfig} stationConfig configuration of the weather station
  * @return  {boolean} true if the alarm is selected or false if it is not
  */
  isSelected(stationConfig: AlarmConfig): boolean {
    return this.selectedStation && (this.selectedStation.placemark === stationConfig.placemark);
  }

  /**
  * Action performed when the weather station is clicked
  * @param {AlarmConfig} stationConfig configuration of the clicked weather station
  */
  onClick(stationConfig: AlarmConfig) {
    if ( this.selectedStation && (this.selectedStation.placemark === stationConfig.placemark) ) {
      this.selectedStation = null;
    } else {
      this.selectedStation = stationConfig;
    }
    this.panelClicked.emit(this.selectedStation);
  }

  /**
   * Triggers the snackBar during 20 seconds and show the information specified
   * @param {string} message Message to show in the snackbar
   * @param {string} action Message to show in the button of the snackbar
   */
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      panelClass: ['snackbar']
    });
  }
}
