import { Component, Input, Output, OnInit } from '@angular/core';
import { WeatherStationConfig } from '../weather.service';

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

  selectedStation: WeatherStationConfig = null;

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

  changeSelectedStation(selectedStation: WeatherStationConfig) {
    this.selectedStation = selectedStation;
  }
}
