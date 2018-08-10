import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AlarmService } from '../../data/alarm.service';
import { WeatherService } from '../weather.service';


/**
* Main component for the weather station map
*/
@Component({
  selector: 'app-weather-map',
  templateUrl: './weather-map.component.html',
  styleUrls: ['./weather-map.component.scss']
})
export class WeatherMapComponent implements OnInit {

  @Input() selectedStation: string;

  @Output() placemarkClicked = new EventEmitter<string>();

  /**
  * Viewbox values to be set after loading the map data
  */
  viewbox;

  /**
  * Variables to manage the graphical elements
  */

  pads: any;
  antennaGroups = [];
  antennaGroupsPads = {};
  antennaGroup2placemarker: any;

  wstations: any;
  primary_wstations: any;
  backup_wstations: any;

  paths: any;
  svgPaths: any;

  datarelations: any;

  constructor(
    public weatherService: WeatherService,
    public alarmService: AlarmService,
  ) { }

  ngOnInit() {
    this.setUpMap();
  }

  setUpMap() {
    this.weatherService.getMapData().subscribe((mapdata) => {
      for (const group of Object.keys(mapdata['relations']['antenna_groups'])) {
        this.antennaGroups.push(group);
      }
      this.wstations = mapdata['placemarkers']['wstations'];
      this.primary_wstations = mapdata['relations']['wstations_groups']['primary']['wstations'];
      this.backup_wstations = mapdata['relations']['wstations_groups']['backup']['wstations'];
      this.pads = mapdata['placemarkers']['pads'];
      for (const group of this.antennaGroups) {
        this.antennaGroupsPads[group] = mapdata['relations']['antenna_groups'][group]['pads'];
      }
      this.paths = mapdata['paths'];
      this.placemarksAdjustment();
      this.svgPaths = this.getSVGPaths();
      this.antennaGroup2placemarker = mapdata['relations']['antennaGroup2placemarker'];
      this.datarelations = mapdata['relations'];
    });
  }

  placemarksAdjustment() {

    const pointsGroups = [
      this.pads,
      this.wstations,
      this.primary_wstations,
      this.backup_wstations,
    ];

    for (const group of this.antennaGroups) {
      pointsGroups.push(this.antennaGroupsPads[group]);
    }

    const pathsGroups = [
      this.paths,
    ];

    /***
    * Scaling and calculation of max and min values
    * for the bounding box settings
    */

    const X_AXIS_SCALING_FACTOR = 1.1;

    let minCX = Number.MAX_VALUE;
    let minCY = Number.MAX_VALUE;
    let maxCX = Number.MIN_VALUE;
    let maxCY = Number.MIN_VALUE;

    for (let k = 0; k < pointsGroups.length; k++) {
      const group = pointsGroups[k];
      for (let i = 0; i < group.length; i++) {
        const item = group[i];
        item.opt_cx *= X_AXIS_SCALING_FACTOR;
        minCX = Math.min(minCX, item.opt_cx);
        minCY = Math.min(minCY, item.opt_cy);
        maxCX = Math.max(maxCX, item.opt_cx);
        maxCY = Math.max(maxCY, item.opt_cy);
      }

    }

    for (let k = 0; k < pathsGroups.length; k++) {
      const group = pathsGroups[k];
      for (let i = 0; i < group.length; i++) {
        const points = group[i];
        for (let j = 0; j < points.length; j++) {
          const item = points[j];
          item.opt_cx *= X_AXIS_SCALING_FACTOR;
          minCX = Math.min(minCX, item.opt_cx);
          minCY = Math.min(minCY, item.opt_cy);
          maxCX = Math.max(maxCX, item.opt_cx);
          maxCY = Math.max(maxCY, item.opt_cy);
        }
      }

    }

    const vBoxW = 1.25 * (maxCX - minCX);
    const vBoxH = 1.1 * (maxCY - minCY);
    this.viewbox = '0 0 ' + vBoxW + ' ' + vBoxH;

    /***
    * Adjustments for svg coordinates
    */

    /** Translation and correction of signs **/
    const X_AXIS_TRANSLATION_FACTOR = 1.05;
    const Y_AXIS_TRANSLATION_FACTOR = 1.1;

    let dx = 0;
    let dy = 0;
    if (minCX < 0) {
      dx = -1.0 * minCX;
    }
    if (maxCY > 0) {
      dy = -1.0 * maxCY;
    }
    for (let k = 0; k < pointsGroups.length; k++) {
      const group = pointsGroups[k];
      for (let i = 0; i < group.length ; i++) {
        const item = group[i];
        item.opt_cx += X_AXIS_TRANSLATION_FACTOR * dx;
        item.opt_cy += Y_AXIS_TRANSLATION_FACTOR * dy;
        item.opt_cy *= -1;
      }

    }

    for (let k = 0; k < pathsGroups.length; k++) {
      const group = pathsGroups[k];
      for (let i = 0; i < group.length; i++) {
        const points = group[i];
        for (let j = 0; j < points.length; j++) {
          const item = points[j];
          item.opt_cx += X_AXIS_TRANSLATION_FACTOR * dx;
          item.opt_cy += Y_AXIS_TRANSLATION_FACTOR * dy;
          item.opt_cy *= -1;
        }
      }
    }

  }

  getSVGPaths() {
    const svgPaths = [];
    for (let i = 0; i < this.paths.length; i++) {
      const points = this.paths[i];
      let pathString = '';
      for (let j = 0; j < points.length; j++) {
        const item = points[j];
        if (j === 0) {
          pathString += 'M' + item.opt_cx + ' ' + item.opt_cy + ' ';
        } else {
          pathString += 'L' + item.opt_cx + ' ' + item.opt_cy + ' ';
        }
      }
      svgPaths.push(pathString);
    }
    return svgPaths;
  }

  getSVGVirtualConnectorPath(placemark, dx, dy) {
    let pathString = '';
    const origin = [0, 0];
    origin[0] = placemark.opt_cx;
    origin[1] = placemark.opt_cy;
    const target = [origin[0] + dx, origin[1] + dy];
    const intermediary = [
      origin[0] + 0.25 * (target[0] - origin[0]),
      target[1]
    ];
    pathString = 'M ' + origin[0] + ' ' + origin[1] + ' ';
    pathString += 'L ' + intermediary[0] + ' ' + intermediary[1] + ' ';
    pathString += 'L ' + target[0] + ' ' + target[1] + ' ';
    return pathString;
  }

  onClick(placemark) {
    const selectedGroup = this.weatherService.weatherStationsConfig[placemark.name];
    if ( this.selectedStation !== selectedGroup.station) {
      this.selectedStation = selectedGroup.station;
    } else {
      this.selectedStation = '';
    }
    this.placemarkClicked.emit(this.selectedStation);
  }

  isSelected(placemark: string): boolean {
    if (this.weatherService.weatherStationsConfig[placemark]) {
      return this.weatherService.weatherStationsConfig[placemark].station === this.selectedStation;
    }
  }

}
