import { Component, OnInit, Input } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  getPath() {
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
