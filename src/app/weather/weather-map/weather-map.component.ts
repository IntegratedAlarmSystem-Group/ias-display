import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { OnInit, OnChanges, OnDestroy } from '@angular/core';
import { Alarm, Value, OperationalMode } from '../../data/alarm';
import { AlarmConfig } from '../../data/alarm-config';
import { AlarmService } from '../../data/alarm.service';
import { WeatherService } from '../weather.service';
import { MapService } from '../../map/map.service';
import { Observable, BehaviorSubject, SubscriptionLike as ISubscription } from 'rxjs';
import { combineLatest } from 'rxjs';

/**
* Main component for the weather station map
*/
@Component({
  selector: 'app-weather-map',
  templateUrl: './weather-map.component.html',
  styleUrls: ['./weather-map.component.scss']
})
export class WeatherMapComponent implements OnInit, OnChanges, OnDestroy {

  /** Variable to manage a placemark selection
   * from the map, or from an external component
   */
  @Input() selectedStation: AlarmConfig = null;

  /** Variable to manage a placemark selection from the map */
  @Output() placemarkClicked = new EventEmitter<AlarmConfig>();

  /**
   * Subscription to changes in alarms related to affected antennas
   */
  affectedAntennasSubscription: ISubscription;

  /**
   * Subscription to follow changes in the pad status
   */
  padStatusSubscription: ISubscription;

  /**
   * Subscription to follow changes in the map data
   */
  mapDataSubscription: ISubscription;

  /** Variable to manage a placemark hover */
  onHoverStation: AlarmConfig = null;

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

  /** Auxiliary viewbox list to locate complementary elements for the map */
  public viewbox = [];

  /** Compass rose location */
  public compassLocation = [0, 0];

   /** Variable to check if the data from the webserver is available  */
  public mapdataAvailable = new BehaviorSubject<any>(false);

  /** Variable to manage map updates  */
  public updatedMap = new BehaviorSubject<any>(false);

  /** Data relations to manage the graphical elements */
  public datarelations: any;

  /** Dictionary to manage the display status of each pad, if free or in use, to locate an antenna */
  public padsDisplayStatus = {};

  /** List to manage the pads in use */
  public padsStatusGroupNames = [];

  public blinkingStatus = {};

  /**
   * Builds an instance of the component
   * @param {WeatherService} service Service used to get the configuration needed by the component
   * @param {AlarmService} alarmService Service used to get the Alarms
   * @param {MapService} mapService Service used to build the interactive map
   * @param {ChangeDetectorRef} cdRef Used for change detection in html
   *
   */
  constructor(
    public service: WeatherService,
    public alarmService: AlarmService,
    public mapService: MapService,
    private cdRef: ChangeDetectorRef
  ) { }

  /**
   * Executed after the component is instantiated and initializes it
   * calling the {@link initialize} method
   */
  ngOnInit() {
    this.initialize();
  }

  /**
   * Executed after any change in the component input
   */
  ngOnChanges() {
    this.updateMap();
  }

  /**
   * Executed on component destroy
   */
  ngOnDestroy() {
    if (this.affectedAntennasSubscription) {
      this.affectedAntennasSubscription.unsubscribe();
    }
    if (this.mapDataSubscription) {
      this.mapDataSubscription.unsubscribe();
    }
    if (this.padStatusSubscription) {
      this.padStatusSubscription.unsubscribe();
    }
  }

  /**
   * Component initialization that involves the initialization of the {@link WeatherService}
   * if not already initialized and the initialization of the related map data source
   */
  initialize() {
    this.service.initialize();
    this.mapDataSubscription = this.service.getMapData().subscribe((mapdata) => {
      this.mapPlacemarks = mapdata['placemarks'];
      // for (const placemark of mapdata['placemarks']['pads']) {
      //   this.padsFreeStatus[placemark.name] = true;
      // }
      let placemarks_list = [];
      placemarks_list = placemarks_list.concat(mapdata['placemarks']['pads']);
      placemarks_list = placemarks_list.concat(mapdata['placemarks']['wstations']);
      for (const placemark of placemarks_list) {
        this.placemarks[placemark.name] = placemark;
      }
      this.placemarksGroups.push(mapdata['placemarks']['pads']);
      this.placemarksGroups.push(mapdata['placemarks']['wstations']);
      this.placemarksGroups.push(mapdata['placemarks']['buildings']);
      this.pathsGroups.push(mapdata['paths']);
      const viewbox = this.mapService.mapdataProcessing(this.placemarksGroups, this.pathsGroups);
      this.viewbox = [viewbox[0], viewbox[1], viewbox[2], viewbox[3]];
      this.mapConfig = {
        'fullHeight': true,
        'viewbox':
          this.viewbox.join(' ')
      };
      this.svgPaths = this.mapService.getSVGPaths(mapdata['paths']);
      this.datarelations = mapdata['relations']['pad_groups'];
      this.mapdataAvailable.next(true);
    });
    this.padStatusSubscription = combineLatest(
      this.service.padsStatusAvailable,
      this.mapdataAvailable,
      this.updatedMap
    ).subscribe(
      ([padsStatusFlag, mapStatusFlag, mapUpToDate]) => {
        if ( padsStatusFlag && mapStatusFlag && !mapUpToDate ) {
          this.updateAntennaPadDisplayStatus();
        }
      }
    );
    this.affectedAntennasSubscription = this.service.affectedAntennasUpdate
      .subscribe((updateMap) => { if (updateMap === true) { this.updateMap(); } } );
  }

  /**
  * Function executed to change the blinking state according to a boolean parameter
  * It is executed when the inner {@link AlarmBlinkComponent} emits a value on its
  * {@link AlarmBlinkComponent#blinkingStatus} {@link EventEmitter}
  * @param {boolean} blinking true if it should blink, false if not
  */
  public changeBlinkingState(blinking: boolean, alarmId: string) {
    this.blinkingStatus[alarmId] = blinking;
    this.cdRef.detectChanges();
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
   * Get the color class for an affected antenna
   */
  getAffectedAntennaColorClasses(alarmId: string) {
    if (this.alarmService.isAlarmIndexAvailable(alarmId)) {
      const alarm = this.alarmService.get(alarmId);
      let colorClass = '';
      if (alarm.shelved === true) {
        colorClass = 'green';
      } else if (alarm.mode === OperationalMode.unknown) {
        colorClass = 'blue';
      } else if (alarm.showAsMaintenance()) {
        colorClass = 'grey';
      } else if (alarm.value === Value.cleared) {
        colorClass = 'green';
      } else if (alarm.value === Value.set_low) {
        colorClass = 'yellow';
      } else if (alarm.value === Value.set_medium) {
        colorClass = 'yellow';
      } else if (alarm.value === Value.set_high) {
        colorClass = 'red';
      } else if (alarm.value === Value.set_critical) {
        colorClass = 'red';
      } else {
        colorClass = 'green';
      }

      if (colorClass !== '') {
        if (alarm.validity === 0) {
          return ['affected-' + colorClass, 'affected-' + 'unreliable'];
        } else {
          return ['affected-' + colorClass];
        }
      }

    } else {
      return ['none'];
    }
  }

  /**
   * Update the status of the pads from webserver data
   */
  updateAntennaPadDisplayStatus() {
    const localPadsDisplayStatus = Object.assign({}, this.padsDisplayStatus);
    this.padsStatusGroupNames = Object.keys(this.service.padsStatus);
    const padGroups = Object.keys(this.service.padsStatus);
    for (let i = 0; i < padGroups.length; i++) {
      const group = padGroups[i];
      let groupStatus = 'not-selected';
      if (this.selectedStation !== null) {
        if (group === this.selectedStation['group']) {
          groupStatus = 'selected';
        }
      }
      if ( !( group in Object.keys(this.padsDisplayStatus) ) ) {
        localPadsDisplayStatus[group] = {};
      }
      const pads = Object.keys(this.service.padsStatus[group]);
      for (let j = 0; j < pads.length; j++) {
        const antenna = this.service.padsStatus[group][pads[j]];
        let freeStatus = 'in-use';
        if (antenna === null) {
          freeStatus = 'free';
        }
        let addClasses = [];
        if (Object.keys(this.service.affectedAntennaHighPriorityAlarm).indexOf(antenna) > -1) {
          const highAlarm: Alarm = this.service.affectedAntennaHighPriorityAlarm[antenna];
          addClasses = this.getAffectedAntennaColorClasses(highAlarm.core_id);
          if (groupStatus === 'selected') {
            addClasses = [...addClasses, 'opacity-100'];
          } else {
            addClasses = [...addClasses, 'opacity-25'];
          }
        }
        localPadsDisplayStatus[group][pads[j]] = [groupStatus, freeStatus, ...addClasses];
      }
    }
    this.padsDisplayStatus = localPadsDisplayStatus;
    this.updatedMap.next(true);
  }

  /**
   * Method to trigger the update of the map according to the pads' status
   */
   updateMap() {
     this.updatedMap.next(false);
   }


  /**
   * Style for the backup weather stations
   * @param {AlarmConfig} stationConfig configuration of the alarm
   * @return {string} class name of the graphical element
   */
  getBackupWeatherStationStyle(stationConfig: AlarmConfig): string {
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
   * @param {AlarmConfig} stationConfig configuration of the alarm
   * @return {string} class name of the graphical element
   */
  getPrimaryWeatherStationStyle(stationConfig: AlarmConfig): string {
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
   * @param {AlarmConfig} stationConfig configuration of the alarm
   * @return {boolean} True if the alarm specified is hover, false if not
   */
   isOnHover(stationConfig: AlarmConfig): boolean {
    if (stationConfig) {
      return stationConfig === this.onHoverStation;
    }
  }

  /**
   * Check if the placemarker related to a main weather station is selected
   * @param {AlarmConfig} stationConfig configuration of the alarm
   * @return {boolean} True if the station alarm is selected, false if it is not
   */
  isSelected(stationConfig: AlarmConfig): boolean {
    if (this.selectedStation === null) {
      return false;
    } else {
      return this.selectedStation.placemark === stationConfig.placemark;
    }
  }

  /**
   * Identify primary weather station group on hover
   * @param {AlarmConfig} stationConfig configuration of the alarm
   */
  mouseEnterPrimaryWeatherStationGroup(stationConfig: AlarmConfig) {
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
   * @param {AlarmConfig} stationConfig configuration of the alarm
   */
  onClick(stationConfig: AlarmConfig) {
    if (this.isSelected(stationConfig)) {
      this.selectedStation = null;
    } else {
      this.selectedStation = stationConfig;
    }
    this.placemarkClicked.emit(this.selectedStation);
  }

}
