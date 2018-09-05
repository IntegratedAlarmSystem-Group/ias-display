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

  @Input() selectedStation: WeatherStationConfig = null;

  @Output() placemarkClicked = new EventEmitter<WeatherStationConfig>();

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
   * Style for the backup weather stations
   */
  getBackupWeatherStationStyle(stationConfig: WeatherStationConfig) {
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

  getPrimaryWeatherStationConfig(padGroup: string) {
    if (this.datarelations[padGroup]['wstations']['primary'][0]) {
      const placemark = this.datarelations[padGroup]['wstations']['primary'][0];
      return placemark;
    } else {
      return '';
    }
  }

  /**
   * Style for the main weather station group
   */
  getPrimaryWeatherStationStyle(stationConfig: WeatherStationConfig) {
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
   */
   isOnHover(stationConfig: WeatherStationConfig): boolean {
    if (stationConfig) {
      return stationConfig === this.onHoverStation;
    }
  }

  /**
   * Check if the placemarker related to a main weather station is selected
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
