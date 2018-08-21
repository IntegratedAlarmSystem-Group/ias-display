import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject , SubscriptionLike as ISubscription } from 'rxjs';
import { Alarm } from '../data/alarm';
import { HttpClientService } from '../data/http-client.service';
import { BackendUrls, AntennasSettings } from '../settings';

/**
* Stores the IDs of the {@link Alarm} objects associated to a placemark
*/
export class MapAlarmConfig {

  /** ID to map the {@link Alarm} to the location on the map */
  public placemark: string;

  /** ID of the main {@link Alarm} of the Weather Station */
  public alarm: string;

}

@Injectable({
  providedIn: 'root'
})
export class AntennasService {

  /** Dictionary of Alarm Ids indexed by placemark **/
  public mapAlarmsConfig: {[placemark: string]: MapAlarmConfig } = {};

  /** Key to retrieve the JSON with coordinates to draw the Weather Map */
  public antennasMapName = AntennasSettings.mapKey;

  /**
   * Builds an instance of the service and initializes it calling the {@link initialize} method
   */
  constructor(
    private httpClient: HttpClientService
  ) {
    this.initialize();
  }

  /**
  * Initializes the Service and getting configuration from Webserver
  */
  initialize() {
    this.loadAlarmsConfig();
  }

  /**
  * Transforms the dictionary of antennas configurations into a list
  * @returns {Object[]} a list with the antennas configurations
  */
  getArrayValues() {
    return Object.values(this.mapAlarmsConfig);
  }

  /**
  * Define the IDs of the alarms that the component should listen to
  */
  loadAlarmsConfig() {
    this.mapAlarmsConfig =  {
      'A021': {
        placemark: 'A021',
        alarm: 'Alarmdummy',
      },
      'W210': {
        placemark: 'W210',
        alarm: 'WS-MeteoCentral-Temperature',
      },
      'P401': {
        placemark: 'P401',
        alarm: 'Alarmdummy',
      },
      'S306': {
        placemark: 'S306',
        alarm: 'WS-MeteoCentral-Temperature',
      },
      'A124': {
        placemark: 'A124',
        alarm: 'WS-MeteoCentral-Temperature',
      },
      'A130': {
        placemark: 'A130',
        alarm: 'Alarmdummy',
      },
      'W201': {
        placemark: 'W201',
        alarm: 'Alarmdummy',
      },
      'A078': {
        placemark: 'A078',
        alarm: 'Alarmdummy',
      },
      'A077': {
        placemark: 'A077',
        alarm: 'Alarmdummy',
      },
      'P413': {
        placemark: 'P413',
        alarm: 'Alarmdummy',
      },
      'S308': {
        placemark: 'S308',
        alarm: 'Alarmdummy',
      },
      'S309': {
        placemark: 'S309',
        alarm: 'Alarmdummy',
      },
    };
  }

  /**
  * Requests data for the weather station map
  * @returns {Observable<Object>} observable of the data in a JSON
  */
  getMapData(): Observable<Object> {
    const url = BackendUrls.FILES_JSON + this.antennasMapName;
    return this.httpClient.get(url);
  }

}
