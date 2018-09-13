import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Alarm } from '../../data/alarm';
import { AlarmService } from '../../data/alarm.service';
import { WeatherService, WeatherStationConfig } from '../weather.service';
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

  /** Variable to manage a placemark selection
   * from the map, or from an external component
   */
  @Input() selectedStation: WeatherStationConfig = null;

  /** Variable to manage a placemark selection from the map */
  @Output() placemarkClicked = new EventEmitter<WeatherStationConfig>();

  /** Variable to manage a placemark hover */
  onHoverStation: WeatherStationConfig = null;

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

   /** Variable to check if the data from the webserver is available  */
  public mapdataAvailable = new BehaviorSubject<any>(false);

  /** Data relations to manage the graphical elements */
  public datarelations: any;

  /**
   * Builds an instance of the component
   * @param {WeatherService} service Service used to get the configuration needed by the component
   * @param {AlarmService} alarmService Service used to get the Alarms
   * @param {MapService} mapService Service used to build the interactive map
   *
   */
  constructor(
    public service: WeatherService,
    public alarmService: AlarmService,
    public mapService: MapService,
  ) { }

  /**
   * Executed after the component is instantiated and initializes it
   * calling the {@link initialize} method
   */
  ngOnInit() {
    this.initialize();
  }

  /**
   * Component initialization that involves the initialization of the {@link WeatherService}
   * if not already initialized and the initialization of the related map data source
   */
  initialize() {
    this.service.initialize();
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
  }

  /**
   * Get the groups of pads from the webserver data source
   * @return {any} List of pads groups
   */
  getPadsGroups(): any {
    if (this.mapdataAvailable.value === true) {
      return Object.keys(this.datarelations);
    }
  }

  /**
  * Get a placemark object from an id to use position data
  * @param {string} placemark Id of a graphical element in the map source
  * @return {any} placemark graphical element
  */
  getPlacemarkObject(placemark: string): any {
      const placemark_id = placemark;
      return this.placemarks[placemark_id];
    }

  /**
   * Style for the backup weather stations
   * @param {WeatherStationConfig} stationConfig configuration of the alarm
   * @return {string} class name of the graphical element
   */
  getBackupWeatherStationStyle(stationConfig: WeatherStationConfig): string {
    if (this.selectedStation === null || this.selectedStation === undefined) {
      return 'weather-display-hide';
    } else {
      if (this.isSelected(stationConfig)) {
        return 'weather-display-show';
      } else {
        return 'weather-display-hide';
      }
    }
  }

  /**
   * Return the placemark graphical element of the main weather station for the
   * specified group
   * @param {string} padGroup name of the pad group
   * @return {any} placemark graphical element
   */
  getPrimaryWeatherStationConfig(padGroup: string): any {
    if (this.datarelations[padGroup]['wstations']['primary'][0]) {
      const placemark = this.datarelations[padGroup]['wstations']['primary'][0];
      return placemark;
    } else {
      return '';
    }
  }

  /**
   * Style for the main weather station group
   * @param {WeatherStationConfig} stationConfig configuration of the alarm
   * @return {string} class name of the graphical element
   */
  getPrimaryWeatherStationStyle(stationConfig: WeatherStationConfig): string {
    if (this.selectedStation === null || this.selectedStation === undefined) {
      return 'opacity-100';
    } else {
      if (this.isSelected(stationConfig)) {
        return 'opacity-100';
      } else {
        if (this.isOnHover(stationConfig)) {
          return 'opacity-70';
        } else {
          return 'opacity-25';
        }
      }
    }
  }


  /**
   * Check if the placemarker related to a main weather station is hovered
   * @param {WeatherStationConfig} stationConfig configuration of the alarm
   * @return {boolean} True if the alarm specified is hover, false if not
   */
   isOnHover(stationConfig: WeatherStationConfig): boolean {
    if (stationConfig) {
      return stationConfig === this.onHoverStation;
    }
  }

  /**
   * Check if the placemarker related to a main weather station is selected
   * @param {WeatherStationConfig} stationConfig configuration of the alarm
   * @return {boolean} True if the station alarm is selected, false if it is not
   */
  isSelected(stationConfig: WeatherStationConfig): boolean {
    if (this.selectedStation === null) {
      return false;
    } else {
      return this.selectedStation.placemark === stationConfig.placemark;
    }
  }

  /**
   * Identify primary weather station group on hover
   * @param {WeatherStationConfig} stationConfig configuration of the alarm
   */
  mouseEnterPrimaryWeatherStationGroup(stationConfig: WeatherStationConfig) {
    if (stationConfig) {
      this.onHoverStation = stationConfig;
    }
  }

  /** Clear primary weather station hover variable */
  mouseLeavePrimaryWeatherStationGroup() {
    this.onHoverStation = null;
  }

  /**
   * Action after click on a weather station marker
   * @param {WeatherStationConfig} stationConfig configuration of the alarm
   */
  onClick(stationConfig: WeatherStationConfig) {
    if (this.isSelected(stationConfig)) {
      this.selectedStation = null;
    } else {
      this.selectedStation = stationConfig;
    }
    this.placemarkClicked.emit(this.selectedStation);
  }

}
