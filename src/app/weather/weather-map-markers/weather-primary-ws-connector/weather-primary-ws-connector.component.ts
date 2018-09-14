import { Component, OnInit, Input } from '@angular/core';


/**
 * Line connector between the weather station marker and the summarized weather
 * information marker in a map
 */
@Component({
  selector: 'app-weather-primary-ws-connector',
  templateUrl: './weather-primary-ws-connector.component.html',
  styleUrls: ['./weather-primary-ws-connector.component.scss']
})
export class WeatherPrimaryWsConnectorComponent implements OnInit {

  /** Array of coordinates for the connector path */
  @Input() coords: [[0, 0]];

  /** Value to highlight the connector */
  @Input() selected: false;

  /** Value to highlight the connector for hover related events */
  @Input() onHover: false;

  /**
  * Builds an instance of the component */
  constructor() { }

  /**
   * Executed after the component is instantiated.
   */
  ngOnInit() {
  }

  /**
   * Returns the svg path used to draw the line in the map
   * @returns {string} svg path that represent the line
   */
  getPath(): string {
    let pathString = '';
    let counter = 0;
    for (const coord of this.coords) {
      if (counter > 0) {
        pathString += 'L ' + coord[0] + ' ' + coord[1] + ' ';
      } else {
        pathString += 'M ' + coord[0] + ' ' + coord[1] + ' ';
      }
      counter += 1;
    }
    return pathString;
  }

}
