import { Component, OnInit } from '@angular/core';
import { AlarmService } from '../../data/alarm.service';
import { WeatherService } from '../weather.service';


/**
* Dummy component for weather station marker
*/
@Component({
    selector: 'app-test-ws-marker-component',
    template: `
      <div class="ws-marker"> <div class="triangle"></div> </div>
    `,
    styles: [
      `.ws-marker {
        color: #54c073;
        text-align: center;
        height: 100%;
        position: absolute;
        top: 0px;
        left: 5px;
      }`,
      `
      .triangle {
        width: 0;
        height: 0;
        border-top: 20px solid transparent;
        border-left: 20px solid transparent;
        border-right: 20px solid transparent;
        border-bottom: 20px solid #54c073;
        margin-top: -10px;
      }
      `
    ]
})
export class WeatherTestWSMarkerComponent {}


/**
* Dummy component for weather station data
*/
@Component({
    selector: 'app-test-ws-data-component',
    template: `
      <div class="ws-data">  DATA  </div>
    `,
    styles: [
      `
      .ws-data {
        color: white;
        background: #39505f;
        border: 2px solid #39505f;
        border-radius: 4px;
        padding: 10px;
        text-align: center;
        font-size: 16px;
      }
      :host-context(svg .ws-primary-group:hover) .ws-data {
        border: 2px solid #a3bbc6;
      };
      `
    ]
})
export class WeatherTestWSDataComponent {}


/**
* Main component for the weather station map
*/
@Component({
  selector: 'app-weather-map',
  templateUrl: './weather-map.component.html',
  styleUrls: ['./weather-map.component.scss']
})
export class WeatherMapComponent implements OnInit {

  /**
  * Viewbox values to be set after loading the map data
  */
  viewbox;

  /**
  * Display control for the groups of pads defined as 'antenna groups'
  */
  antennaGroupsDisplay = {
    'MORITA_AND_INNER': {'selected': false},
    'W_ARM': {'selected': false},
    'P_ARM': {'selected': false},
    'S_ARM': {'selected': false},
  };


  /**
  * Variables to manage the graphical elements
  */

  pads: any;
  morita_and_inner_pads: any;
  p_arm_pads: any;
  w_arm_pads: any;
  s_arm_pads: any;

  wstations: any;
  primary_wstations: any;
  backup_wstations: any;

  paths: any;
  svgPaths: any;

  ws2AntennaGroup: any;

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
      this.wstations = mapdata['placemarkers']['wstations'];
      this.primary_wstations = mapdata['relations']['wstations_groups']['primary']['wstations'];
      this.backup_wstations = mapdata['relations']['wstations_groups']['backup']['wstations'];
      this.pads = mapdata['placemarkers']['pads'];
      this.morita_and_inner_pads = mapdata['relations']['antenna_groups']['MORITA_AND_INNER']['pads'];
      this.p_arm_pads = mapdata['relations']['antenna_groups']['P_ARM']['pads'];
      this.w_arm_pads = mapdata['relations']['antenna_groups']['W_ARM']['pads'];
      this.s_arm_pads = mapdata['relations']['antenna_groups']['S_ARM']['pads'];
      this.paths = mapdata['paths'];
      this.placemarksAdjustment();
      this.svgPaths = this.getSVGPaths();
      this.ws2AntennaGroup = mapdata['relations']['ws2antennas'];
      this.datarelations = mapdata['relations'];
    });
  }

  placemarksAdjustment() {

    const pointsGroups = [
      this.pads,
      this.wstations,
      this.primary_wstations,
      this.backup_wstations,
      this.morita_and_inner_pads,
      this.p_arm_pads,
      this.w_arm_pads,
      this.s_arm_pads
    ];

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

    const vBoxW = 1.1 * (maxCX - minCX);
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

  updateAntennagroupDisplay(placemark) {
    const selectedGroup = this.ws2AntennaGroup[placemark.name][0];
    this.antennaGroupsDisplay[selectedGroup]['selected'] = !this.antennaGroupsDisplay[selectedGroup]['selected'];
  }

}
