import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject , SubscriptionLike as ISubscription } from 'rxjs';
import { Alarm } from '../data/alarm';
import { HttpClientService } from '../data/http-client.service';
import { BackendUrls, AntennasSettings } from '../settings';

/**
* Stores the IDs of the antennas and location related to an {@link Alarm}
*/
export class AntennaConfig {

  /** ID of the Antenna associated with the {@link Alarm} */
  public antenna: string;

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
  public mapAlarmsConfig: {[placemark: string]: AntennaConfig } = {};

  /** Dictionary of Alarm configuration indexed by antennas group ID **/
  public sidebarAlarmsConfig: {[group: string]: AntennaConfig [] } = {};

  /** Key to retrieve the JSON with coordinates to draw the Weather Map */
  public antennasMapName = AntennasSettings.mapKey;

  /** Alarms Ids for the antennas summary **/
  public antennasSummaryConfig: string;

  /**
   * Builds an instance of the service and initializes it calling the {@link initialize} method
   */
  constructor(
    private httpClient: HttpClientService
  ) {
    this.initialize();
    console.log(this.sidebarAlarmsConfig);
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

    const url = BackendUrls.ANTENNAS_VIEW;
    this.httpClient.get(url).subscribe((response) => {
      console.log('response: ', response);
      for (const key in response) {
        if (key) {
          this.sidebarAlarmsConfig[key] = response[key] as AntennaConfig[];
        }
      }
    });

    const summary_url = BackendUrls.ANTENNAS_SUMMARY;
    this.httpClient.get(summary_url).subscribe((response) => {
      console.log('response: ', response);
      for (const key in response) {
        if (key) {
          this.antennasSummaryConfig = response as string;
        }
      }
    });
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
