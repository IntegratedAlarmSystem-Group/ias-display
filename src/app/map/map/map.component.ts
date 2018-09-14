import { Component, OnInit, Input, Output } from '@angular/core';

/**
* Reusable component used to display a map
*/
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  /**
  * Defines wether or no there is data available to draw the map
  */
  @Input() mapdataAvailable = false;

  /**
  * contains the configuration to draw the map
  */
  @Input() mapConfig = {};

  /**
  * Builds an instance of the component
  */
  constructor() { }

  /**
  * Initiates the component when it is displayed
  */
  ngOnInit() {
  }

}
