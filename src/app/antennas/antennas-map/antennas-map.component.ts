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
  @Input() selectedAntennaMarker = '';

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

  getAlarmForPlacemark(placemark): Alarm {
    const alarm_id = this.getAlarmConfig(placemark).alarm;
    return this.alarmService.get(alarm_id);
  }

  getAlarmConfig(placemark) {
    const hasLocation = this.existsAlarmForPlacemark(placemark);
    if (hasLocation === true) {
      const placemark_id = placemark.name;
      return this.service.mapAlarmsConfig[placemark_id];
    }
  }

  onClick(placemark) {
    this.selectedAntennaMarker = placemark.name;
    this.clickedAntennaMarker.emit(this.selectedAntennaMarker);
  }

}
