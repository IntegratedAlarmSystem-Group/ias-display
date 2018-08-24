import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Alarm } from '../../data/alarm';
import { AlarmService } from '../../data/alarm.service';
import { WeatherService } from '../weather.service';
import { MapService } from '../../map/map.service';
import { Observable, BehaviorSubject , SubscriptionLike as ISubscription } from 'rxjs';


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

  /** Source data for the map and related configuration settings */

  /** Placemarks list obtained from the webserver */
  public mapPlacemarks = {};

  /** Placemarks objects indexed by name to provide the name and coordinates
  * of each identified place */
  public placemarks = {};

  /** Placemarks listed by group */
  public placemarksGroups = [];

  /** Coordinates related with paths, listed by group */
  public pathsGroups = [];

  /** SVG defitions for the related paths, listed by group */
  public svgPaths = [];

  /** Map Configuration  */
  public mapConfig = {};

  /** Alarms Configuration  */
  public alarmsConfig = {};

   /** Variable to check if the data from the webserver is available  */
  public mapdataAvailable = new BehaviorSubject<any>(false);

  /** Data relations to manage the graphical elements */
  public datarelations: any;

  /**
   * Builds an instance of the component and initializes it calling the {@link initialize} method
   */
  constructor(
    public service: WeatherService,
    public alarmService: AlarmService,
    public mapService: MapService,
  ) { }

  ngOnInit() {
    this.initialize();
  }

  /**
   * Data setup
   */
  initialize() {
    this.service.getMapData().subscribe((mapdata) => {
      this.mapPlacemarks = mapdata['placemarks'];
      let placemarks_list = [];
      placemarks_list = placemarks_list.concat(mapdata['placemarks']['pads']);
      placemarks_list = placemarks_list.concat(mapdata['placemarks']['wstations']);
      for (const placemark of placemarks_list) {
        this.placemarks[placemark.name] = placemark;
      }
      this.placemarksGroups.push(mapdata['placemarks']['pads']);
      this.placemarksGroups.push(mapdata['placemarks']['wstations']);
      this.pathsGroups.push(mapdata['paths']);
      const viewbox = this.mapService.mapdataProcessing(this.placemarksGroups, this.pathsGroups);
      this.mapConfig = {
        'fullHeight': true,
        'viewbox':
          [viewbox[0], viewbox[1], viewbox[2], viewbox[3]].join(' ')
      };
      this.svgPaths = this.mapService.getSVGPaths(mapdata['paths']);
      this.datarelations = mapdata['relations']['pad_groups'];
      this.mapdataAvailable.next(true);
    });
    this.alarmsConfig = this.service.weatherStationsConfig;
  }

  /**
   * Auxiliary method to generate the stations connector
   */
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

  /**
   * Get the groups of pads from the webserver data source
   */
  getPadsGroups() {
    if (this.mapdataAvailable.value === true) {
      return Object.keys(this.datarelations);
    }
  }

  /**
   * Get a placemark object from an id to use position data
   */
   getPlacemarkObject(placemark) {
     const placemark_id = placemark;
     return this.placemarks[placemark_id];
   }

  /**
   * Action after click on a weather station marker
   */
  onClick(placemark) {
    const selectedGroup = this.service.weatherStationsConfig[placemark.name];
    if ( this.selectedStation !== selectedGroup.station) {
      this.selectedStation = selectedGroup.station;
    } else {
      this.selectedStation = '';
    }
    this.placemarkClicked.emit(this.selectedStation);
  }

  /**
   * Check if the placemarker related to a main weather station is selected
   */
  isSelected(placemark: string): boolean {
    if (this.service.weatherStationsConfig[placemark]) {
      return this.service.weatherStationsConfig[placemark].station === this.selectedStation;
    }
  }

}
