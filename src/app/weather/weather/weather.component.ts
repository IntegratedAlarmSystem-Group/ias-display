import { Component, Input, Output, OnInit } from '@angular/core';

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

  selectedStation = '';

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

  changeSelectedStation(selectedStation: string) {
    this.selectedStation = selectedStation;
  }
}
