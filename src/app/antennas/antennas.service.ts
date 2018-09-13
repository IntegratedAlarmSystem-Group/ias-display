import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject , SubscriptionLike as ISubscription } from 'rxjs';
import { Alarm } from '../data/alarm';
import { Assets } from '../settings';
import { AlarmComponent, AlarmImageSet } from '../shared/alarm/alarm.component';
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

/**
 * Service that stores and handles all configuration needed by the components of the {@link AntennasModule}
 */
@Injectable({
  providedIn: 'root'
})
export class AntennasService {

  /** Dictionary of Alarm configuration indexed by antennas group ID **/
  public antennasConfig: {[group: string]: AntennaConfig [] } = {};

  /** Key to retrieve the JSON with coordinates to draw the Weather Map */
  public antennasMapName = AntennasSettings.mapKey;

  /** Alarms Ids for the antennas summary **/
  public antennasSummaryConfig: string;

  /** Set of antenna icons */
  public antennaImageSet: AlarmImageSet;

  /** Set of antenna Unreliable icons */
  public antennaImageUnreliableSet: AlarmImageSet;

  /** Flag that indicates if the configuration was initialized or if it was not */
  private _initialized = false;

  /**
   * Builds an instance of the service and initializes it calling the {@link initialize} method
   * @param {HttpClientService} httpClient Service used to perform HTTP requests
   */
  constructor(
    private httpClient: HttpClientService
  ) {
  }

  /**
  * Initializes the Service and getting configuration from Webserver
  */
  initialize(): void {
    if (this._initialized === false) {
      this.loadAlarmsConfig();
      this.loadImages();
      this._initialized = true;
    }
  }

  /**
  * Define the IDs of the alarms that the component should listen to
  */
  loadAlarmsConfig(): void {

    const url = BackendUrls.ANTENNAS_VIEW;
    this.httpClient.get(url).subscribe((response) => {
      for (const key in response) {
        if (key) {
          this.antennasConfig[key] = response[key] as AntennaConfig[];
        }
      }
    });

    const summary_url = BackendUrls.ANTENNAS_SUMMARY;
    this.httpClient.get(summary_url).subscribe((response) => {
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

  /**
  * Define the icons used by this module components
  */
  loadImages(): void {
    /** Set of icons */
    this.antennaImageSet = new AlarmImageSet({
      clear: Assets.ICONS + 'antenna-valid-clear.svg',
      set_low: Assets.ICONS + 'antenna-valid-s_low.svg',
      set_medium: Assets.ICONS + 'antenna-valid-s_low.svg',
      set_high: Assets.ICONS + 'antenna-valid-critical.svg',
      set_critical: Assets.ICONS + 'antenna-valid-critical.svg',
      unknown: Assets.ICONS + 'antenna-valid-unknown.svg',
      maintenance: Assets.ICONS + 'antenna-valid-maintenance.svg',
      shelved: Assets.ICONS + 'antenna-valid-clear.svg',
    });

    /** Set of Unreliable icons */
    this.antennaImageUnreliableSet = new AlarmImageSet({
      clear: Assets.ICONS + 'antenna-invalid-clear.svg',
      set_low: Assets.ICONS + 'antenna-invalid-s_low.svg',
      set_medium: Assets.ICONS + 'antenna-invalid-s_low.svg',
      set_high: Assets.ICONS + 'antenna-invalid-critical.svg',
      set_critical: Assets.ICONS + 'antenna-invalid-critical.svg',
      unknown: Assets.ICONS + 'antenna-invalid-unknown.svg',
      maintenance: Assets.ICONS + 'antenna-invalid-maintenance.svg',
      shelved: Assets.ICONS + 'antenna-valid-clear.svg',
    });
  }

}
