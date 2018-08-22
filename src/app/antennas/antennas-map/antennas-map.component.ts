import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Alarm, Value, OperationalMode } from '../../data/alarm';
import { AlarmService } from '../../data/alarm.service';
import { AntennasService } from '../antennas.service';
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
  @Input() selectedAntenna = '';

  /** Variable to manage a placemark selection from the map */
  @Output() clickedAntennaMarker = new EventEmitter<string>();

  /** Source data for the map and related configuration settings */

  /** Placemarks to provide the name and coordinates of each identified place */
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
      this.placemarks = mapdata['placemarkers'];
      this.placemarksGroups.push(mapdata['placemarkers']['pads']);
      this.placemarksGroups.push(mapdata['placemarkers']['wstations']);
      this.pathsGroups.push(mapdata['paths']);
      const viewbox = this.mapService.mapdataProcessing(this.placemarksGroups, this.pathsGroups);
      this.mapConfig = {'fullHeight': true, 'viewbox': viewbox};
      this.svgPaths = this.mapService.getSVGPaths(mapdata['paths']);
      this.mapdataAvailable.next(true);
    });
  }

  /**
   * Method to verify if there is an alarm related to the selected placemark
   */
  existsAlarmForPlacemark(placemark) {
    const placemark_id = placemark.name;
    const index = Object.keys(
      this.service.mapAlarmsConfig).indexOf(placemark_id);
    if (index > -1) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Get alarm related ot a placemark
   */
  getAlarmForPlacemark(placemark): Alarm {
    const alarm_id = this.getAlarmConfig(placemark).alarm;
    return this.alarmService.get(alarm_id);
  }

  /**
   * Get the alarm configuration from the alarm service for a selected placemark
   */
  getAlarmConfig(placemark) {
    const hasLocation = this.existsAlarmForPlacemark(placemark);
    if (hasLocation === true) {
      const placemark_id = placemark.name;
      return this.service.mapAlarmsConfig[placemark_id];
    }
  }

  /**
   * Check if an specific antenna marker was selected
   * through its related placemark
   */
  isSelected(placemark) {
    return this.selectedAntenna === placemark.name;
  }

  /**
   * Opacity class name for each antenna marker
   */
  getOpacityClass(placemark) {
    if (this.selectedAntenna === '') {
      return 'opacity-100';
    } else {
      if ( this.isSelected(placemark) === true ) {
        return 'opacity-100';
      } else {
        return 'opacity-40';
      }
    }
  }

  /**
   * On click action for antenna markers
   */
  onClick(placemark) {
    if (this.selectedAntenna === placemark.name) {
      this.selectedAntenna = '';
    } else {
      this.selectedAntenna = placemark.name;
    }
    this.clickedAntennaMarker.emit(this.selectedAntenna);
  }

}
