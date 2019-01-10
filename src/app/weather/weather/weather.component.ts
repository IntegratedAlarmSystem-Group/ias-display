import { Component, Input, Output, OnInit } from '@angular/core';
import { AlarmConfig } from '../../data/alarm-config';

/**
* Component used to display Weather Alarms both in a sidebar (instantiated in a {@link WeatherSidebar}),
* and a map (instantiated by a {@link WeatherMap})
*/
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  /** Selected placemark name from the inner map or inner components */
  selectedStation: AlarmConfig = null;

  /**
   * Builds an instance of the component
   */
  constructor(
  ) { }

  /**
   * Executed after the component is instantiated
   */
  ngOnInit() {
  }

  /** Update selected placemark name using events emitted from internal components
   * @param {AlarmConfig}
   */
  changeSelectedStation(selectedStation: AlarmConfig): void {
    this.selectedStation = selectedStation;
  }
}
