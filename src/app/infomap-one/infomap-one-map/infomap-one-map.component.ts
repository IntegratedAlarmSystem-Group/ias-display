import { Component, OnInit } from '@angular/core';
import { AlarmService } from '../../data/alarm.service';
import { Alarm, Value, OperationalMode } from '../../data/alarm';
import { MapService } from '../../map/map.service';
import { InfomapOneService } from '../infomap-one.service';
import { Observable, BehaviorSubject , SubscriptionLike as ISubscription } from 'rxjs';

@Component({
  selector: 'app-infomap-one-map',
  templateUrl: './infomap-one-map.component.html',
  styleUrls: ['./infomap-one-map.component.scss']
})
export class InfomapOneMapComponent implements OnInit {

  /** Data for the related map */
  public placemarks = {};
  public placemarksGroups = [];
  public pathsGroups = [];
  public svgPaths = [];

  /** Data for the related map */
  public mapdataAvailable = new BehaviorSubject<any>(false);

  /** Map Configuration */
  /** TODO: Add a class to define the properties */
  public mapConfig = {};

  constructor(
    public service: InfomapOneService,
    public alarmService: AlarmService,
    public mapService: MapService
  ) { }

  ngOnInit() {
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
