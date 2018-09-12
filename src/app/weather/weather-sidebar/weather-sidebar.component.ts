import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ClipboardService } from 'ngx-clipboard';
import { AlarmComponent } from '../../shared/alarm/alarm.component';
import { AlarmService } from '../../data/alarm.service';
import { WeatherService, WeatherStationConfig } from '../weather.service';
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

  @Input() selectedStation: WeatherStationConfig = null;

  @Output() panelClicked = new EventEmitter<WeatherStationConfig>();

  /**
  * Builds an instance of the component
  * @param {WeatherService} weatherService Service used to get the configuration needed by the component
  * @param {AlarmService} alarmService Service used to get the Alarms
   */
  constructor(
    public weatherService: WeatherService,
    public alarmService: AlarmService,
    private clipboardService: ClipboardService,
    public snackBar: MatSnackBar
  ) { }

  /**
  * Executed after the component is instantiated. It initializes the weatherService
  * to ensure the weather configuration is ready.
  */
  ngOnInit() {
    this.weatherService.initialize();
  }

  /**
  * Copy list of antennas associated to the given weather station
  * @param {string} station the ID of the weather station
  * @returns {boolean} true if the data was copied to the clipboard, false if not
  */
  copyAntennas(station: string): boolean {
    const antennas = this.getAntennas(station);
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
  getAntennas(station: string): string[] {
    return this.weatherService.getAntennas(station);
  }

  /**
  * Finds and returns an {@link Alarm} by ID in the {@link AlarmService}
  * @param {string} alarm_id the ID of the {@link Alarm}
  * @returns {Alarm} the {@link Alarm}
  */
  getAlarm(alarm_id: string): Alarm {
    return this.alarmService.get(alarm_id);
  }

  isSelected(stationConfig: WeatherStationConfig) {
    return this.selectedStation && (this.selectedStation.placemark === stationConfig.placemark);
  }

  onClick(stationConfig: WeatherStationConfig) {
    if ( this.selectedStation && (this.selectedStation.placemark === stationConfig.placemark) ) {
      this.selectedStation = null;
    } else {
      this.selectedStation = stationConfig;
    }
    this.panelClicked.emit(this.selectedStation);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 20000,
      panelClass: ['snackbar']
    });
  }
}
