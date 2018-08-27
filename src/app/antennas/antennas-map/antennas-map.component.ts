import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Alarm, Value, OperationalMode } from '../../data/alarm';
import { AlarmService } from '../../data/alarm.service';
import { AntennasService, AntennaConfig } from '../antennas.service';
import { MapService } from '../../map/map.service';
import { Observable, BehaviorSubject , SubscriptionLike as ISubscription } from 'rxjs';


@Component({
  selector: 'app-antennas-map',
  templateUrl: './antennas-map.component.html',
  styleUrls: ['./antennas-map.component.scss']
})
export class AntennasMapComponent implements OnInit {

  /** Variable to manage a placemark selection
   * from the map, or from an external component */
  @Input() selectedAntenna: AntennaConfig = null;

  /** Variable to manage a placemark selection from the map */
  @Output() clickedAntennaMarker = new EventEmitter<AntennaConfig>();

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

  /**
   * Builds an instance of the component and initializes it calling the {@link initialize} method
   */
  constructor(
    public service: AntennasService,
    public alarmService: AlarmService,
    public mapService: MapService,
  ) { }

  ngOnInit() {
    this.initialize();
  }

  /**
   * Component initialization with the related map data source
   */
  initialize() {
    this.service.getMapData().subscribe((mapdata) => {
      this.mapPlacemarks = mapdata['placemarks'];
      for (const placemark of mapdata['placemarks']['pads']) {
        this.placemarks[placemark.name] = placemark;
      }
      this.placemarksGroups.push(mapdata['placemarks']['pads']);
      this.placemarksGroups.push(mapdata['placemarks']['wstations']);
      this.pathsGroups.push(mapdata['paths']);
      const viewbox = this.mapService.mapdataProcessing(this.placemarksGroups, this.pathsGroups);
      this.mapConfig = {
        'fullHeight': true,
        'viewbox':
          [-100 + viewbox[0], viewbox[1], viewbox[2], viewbox[3]].join(' ')
      };
      this.svgPaths = this.mapService.getSVGPaths(mapdata['paths']);
      this.mapdataAvailable.next(true);
    });
    this.alarmsConfig = this.service.sidebarAlarmsConfig;
  }

  /**
   * Method to verify if there is data available for the placemark id
   * from the alarm configuration
   */
  existsPlacemarkData(placemark) {
    const placemark_id = placemark;
    const index = Object.keys(this.placemarks).indexOf(placemark_id);
    if (index > -1) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Get alarm from the alarms service using id
   */
  getAlarm(alarm_id): Alarm {
    return this.alarmService.get(alarm_id);
  }

  /**
   * Get antenna groups from the alarms configuration
   */
  getAntennaGroups() {
    return Object.keys(this.alarmsConfig);
  }

 /**
  * Get a placemark object from an id to use position data
  */
  getPlacemarkObject(placemark) {
    const placemark_id = placemark;
    return this.placemarks[placemark_id];
  }

  /**
   * Check if an specific antenna marker was selected
   * through its related alarm configuration
   */
  isSelected(antennaConfig) {
    if (this.selectedAntenna === null) {
      return false;
    } else {
      return this.selectedAntenna.placemark === antennaConfig.placemark;
    }

  }

  /**
   * Opacity class name for each antenna marker
   */
  getOpacityClass(antennaConfig) {
    if (this.selectedAntenna === null) {
      return 'opacity-100';
    } else {
      if ( this.isSelected(antennaConfig) === true ) {
        return 'opacity-100';
      } else {
        return 'opacity-25';
      }
    }
  }

  /**
   * On click action for the antenna markers
   */
  onClick(antennaConfig) {
    if (this.isSelected(antennaConfig)) {
      this.selectedAntenna = null;
    } else {
      this.selectedAntenna = antennaConfig;
    }
    this.clickedAntennaMarker.emit(this.selectedAntenna);
  }

}
