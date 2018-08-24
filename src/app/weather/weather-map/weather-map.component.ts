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

  constructor(
    public service: WeatherService,
    public alarmService: AlarmService,
    public mapService: MapService,
  ) { }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.service.getMapData().subscribe((mapdata) => {
      this.mapPlacemarks = mapdata['placemarkers'];
      for (const placemark of mapdata['placemarkers']['pads']) {
        this.placemarks[placemark.name] = placemark;
      }
      this.placemarksGroups.push(mapdata['placemarkers']['pads']);
      this.placemarksGroups.push(mapdata['placemarkers']['wstations']);
      this.pathsGroups.push(mapdata['paths']);
      const viewbox = this.mapService.mapdataProcessing(this.placemarksGroups, this.pathsGroups);
      this.mapConfig = {
        'fullHeight': true,
        'viewbox':
          [viewbox[0], viewbox[1], viewbox[2], viewbox[3]].join(' ')
      };
      this.svgPaths = this.mapService.getSVGPaths(mapdata['paths']);
      this.mapdataAvailable.next(true);
    });
    this.alarmsConfig = this.service.weatherStationsConfig;
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
    const selectedGroup = this.service.weatherStationsConfig[placemark.name];
    if ( this.selectedStation !== selectedGroup.station) {
      this.selectedStation = selectedGroup.station;
    } else {
      this.selectedStation = '';
    }
    this.placemarkClicked.emit(this.selectedStation);
  }

  isSelected(placemark: string): boolean {
    if (this.service.weatherStationsConfig[placemark]) {
      return this.service.weatherStationsConfig[placemark].station === this.selectedStation;
    }
  }

}
