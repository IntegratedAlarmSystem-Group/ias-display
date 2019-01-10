import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject , SubscriptionLike as ISubscription } from 'rxjs';
import { Alarm } from '../data/alarm';
import { AlarmConfig } from '../data/alarm-config';
import { Assets } from '../settings';
import { AlarmComponent, AlarmImageSet } from '../shared/alarm/alarm.component';
import { HttpClientService } from '../data/http-client.service';
import { BackendUrls, AntennasSettings } from '../settings';

/**
 * Service that stores and handles all configuration needed by the components of the {@link AntennasModule}
 */
@Injectable({
  providedIn: 'root'
})
export class AntennasService {

  /** List of Alarm configuration for each antenna **/
  public antennasConfig: AlarmConfig [] = [];

  /** List of Alarm configuration for other devices related with the array **/
  public devicesConfig: AlarmConfig [] = [];

  /** Key to retrieve the JSON with coordinates to draw the Weather Map */
  public antennasMapName = AntennasSettings.mapKey;

  /** Alarms Ids for the antennas summary **/
  public antennasSummaryConfig: AlarmConfig [] = [];

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
      this.antennasConfig = response['antennas'] as AlarmConfig[];
      this.devicesConfig = response['devices'] as AlarmConfig[];
    });

    const summary_url = BackendUrls.ANTENNAS_SUMMARY;
    this.httpClient.get(summary_url).subscribe((response) => {
      for (const key in response) {
        if (key) {
          this.antennasSummaryConfig = response as AlarmConfig[];
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
