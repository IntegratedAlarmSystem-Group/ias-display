import { Component, OnInit } from '@angular/core';
import { MapModule } from '../../map/map.module';

@Component({
  selector: 'app-antennas-map',
  templateUrl: './antennas-map.component.html',
  styleUrls: ['./antennas-map.component.css']
})
export class AntennasMapComponent implements OnInit {

  public mapConfig = {};

  public mapdataAvailable = false;

  constructor() { }

  ngOnInit() {
  }

}
