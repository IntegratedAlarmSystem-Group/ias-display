import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ClipboardService } from 'ngx-clipboard';
import { AlarmService } from '../../data/alarm.service';
import { AlarmConfig } from '../../data/alarm-config';
import { WeatherService } from '../weather.service';

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
