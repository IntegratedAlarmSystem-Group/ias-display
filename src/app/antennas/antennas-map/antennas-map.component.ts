import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Alarm, Value, OperationalMode } from '../../data/alarm';
import { AlarmService } from '../../data/alarm.service';
import { AntennasService, AntennaConfig } from '../antennas.service';
import { MapService } from '../../map/map.service';
import { Observable, BehaviorSubject , SubscriptionLike as ISubscription } from 'rxjs';

/**
* Main component for the antennas map
*/
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

  /** Auxiliary viewbox list to locate complementary elements for the map */
  public viewbox = [];

  /** Compass rose location */
  public compassLocation = [0, 0];

   /** Variable to check if the data from the webserver is available  */
  public mapdataAvailable = new BehaviorSubject<any>(false);

  /**
   * Builds an instance of the component
   * @param {AntennasService} service Service used to get the configuration needed by the component
   * @param {AlarmService} alarmService Service used to get the Alarms
   * @param {MapService} mapService Service used to build the interactive map
   *
   */
  constructor(
    public service: AntennasService,
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
   * Component initialization that involves the initialization of the {@link AntennasService}
   * if not already initialized and the initialization of the related map data source
   */
  initialize() {
    this.service.initialize();
    this.service.getMapData().subscribe((mapdata) => {
      this.mapPlacemarks = mapdata['placemarks'];
      for (const placemark of mapdata['placemarks']['pads']) {
        this.placemarks[placemark.name] = placemark;
      }
      this.placemarksGroups.push(mapdata['placemarks']['pads']);
      this.placemarksGroups.push(mapdata['placemarks']['wstations']);
      this.placemarksGroups.push(mapdata['placemarks']['buildings']);
      this.pathsGroups.push(mapdata['paths']);
      const viewbox = this.mapService.mapdataProcessing(this.placemarksGroups, this.pathsGroups);
      this.viewbox = [-30 + viewbox[0], viewbox[1], viewbox[2] - 180, viewbox[3]];
      this.mapConfig = {
        'fullHeight': true,
        'viewbox':
          this.viewbox.join(' ')
      };
      this.svgPaths = this.mapService.getSVGPaths(mapdata['paths']);
      this.mapdataAvailable.next(true);
    });
    this.alarmsConfig = this.service.antennasConfig;
  }

  /**
   * Method to verify if there is data available for the placemark id
   * from the alarm configuration
   * @param {string} placemark Id of a graphical element in the map source
   * @return {boolean} True if there is configuration available, false if there is not
   */
  existsPlacemarkData(placemark: string): boolean {
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
   * @param {string} alarm_id id of the alarm
   * @return {Alarm} Alarm object retrieved from the service
   */
  getAlarm(alarm_id: string): Alarm {
    return this.alarmService.get(alarm_id);
  }

  /**
   * Opacity class name for each antenna marker
   * @param {AntennaConfig} antennaConfig configuration of the alarm
   * @return class name that defines the opacity of the graphical element
   */
  getOpacityClass(antennaConfig: AntennaConfig): string {
    if (this.selectedAntenna === null) {
      return 'opacity-100';
    } else {
      if ( this.isSelected(antennaConfig) === true ) {
        return 'opacity-100';
      } else {
        return 'opacity-35';
      }
    }
  }

 /**
  * Get a placemark graphical object from an id
  * @param {string} placemark Id of a graphical element in the map source
  * @return {any} placemark graphical element
  */
  getPlacemarkObject(placemark: string): any {
    const placemark_id = placemark;
    return this.placemarks[placemark_id];
  }

  /**
   * Check if an specific antenna marker was selected through its related
   * alarm configuration
   * @param {AntennaConfig} antennaConfig configuration of the alarm
   * @return {boolean} True if the antenna alarm is selected, false if it is not
   */
  isSelected(antennaConfig: AntennaConfig): boolean {
    if (this.selectedAntenna === null) {
      return false;
    } else {
      return this.selectedAntenna.placemark === antennaConfig.placemark;
    }

  }

  /**
   * On click action for the antenna markers
   * @param {AntennaConfig} antennaConfig configuration of the alarm
   */
  onClick(antennaConfig: AntennaConfig) {
    if (this.isSelected(antennaConfig)) {
      this.selectedAntenna = null;
    } else {
      this.selectedAntenna = antennaConfig;
    }
    this.clickedAntennaMarker.emit(this.selectedAntenna);
  }

}
