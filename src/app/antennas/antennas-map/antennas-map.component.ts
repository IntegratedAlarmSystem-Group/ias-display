import { Component, OnInit } from '@angular/core';
import { Alarm, Value, OperationalMode } from '../../data/alarm';
import { AlarmService } from '../../data/alarm.service';
import { AntennasService } from '../antennas.service';
import { MapService } from '../../map/map.service';
import { Observable, BehaviorSubject , SubscriptionLike as ISubscription } from 'rxjs';


@Component({
  selector: 'app-antennas-map',
  templateUrl: './antennas-map.component.html',
  styleUrls: ['./antennas-map.component.css']
})
export class AntennasMapComponent implements OnInit {

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

  alarmHasLocation(placemark) {
    const index = Object.keys(
      this.service.mapAlarmsConfig).indexOf(placemark);
    if (index > -1) {
      return true;
    } else {
      return false;
    }
  }

  getAlarmConfig(placemark) {
    const hasLocation = this.alarmHasLocation(placemark);
    if (hasLocation === true) {
      return this.service.mapAlarmsConfig[placemark];
    }
  }

  getAlarm(alarm_id: string): Alarm {
    return this.alarmService.get(alarm_id);
  }

}
