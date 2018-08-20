import { Component, OnInit } from '@angular/core';
import { MapModule } from '../../map/map.module';

@Component({
  selector: 'app-antennas-map',
  templateUrl: './antennas-map.component.html',
  styleUrls: ['./antennas-map.component.css']
})
export class AntennasMapComponent implements OnInit {

  /** Map Configuration  */
  public mapConfig = {};

   /** Variable to check if the data from the webserver is available  */
  public mapdataAvailable = false;

  constructor() { }

  ngOnInit() {
  }

}
