import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject , SubscriptionLike as ISubscription } from 'rxjs';
import { AlarmComponent, AlarmImageSet } from '../shared/alarm/alarm.component';
import { AlarmService } from '../data/alarm.service';
import { Alarm } from '../data/alarm';
import { AlarmConfig } from '../data/alarm-config';
import { Assets } from '../settings';
import { HttpClientService } from '../data/http-client.service';
import { BackendUrls, WeatherSettings } from '../settings';

/**
* Service that stores and handles all configuration needed by the components of the {@link WeatherModule}
*/
@Injectable()
export class WeatherService {

  /** Set of Humidity icons */
  public humidityImageSet: AlarmImageSet;

  /** Set of Temperature icons */
  public tempImageSet: AlarmImageSet;

  /** Set of Wind Speed icons */
  public windsImageSet: AlarmImageSet;

  /** Set of Marker icons for the stations in the map */
  public markerImageSet: AlarmImageSet;

  /** Set of Humidity Unreliable icons */
  public humidityImageUnreliableSet: AlarmImageSet;

  /** Set of Temperature Unreliable icons */
  public tempImageUnreliableSet: AlarmImageSet;

  /** Set of Wind Speed Unreliable icons */
  public windsImageUnreliableSet: AlarmImageSet;

  /** Set of Marker Unreliable icons for the stations in the map */
  public markerImageUnreliableSet: AlarmImageSet;

  /** Alarms Ids for the weather summary **/
  public weatherSummaryConfig: AlarmConfig[];

  /** Dictionary of Alarm Ids of the Weather Stations, indexed by placemark **/
  public weatherStationsConfig: AlarmConfig[];

  /** Key to retrieve the JSON with coordinates to draw the Weather Map */
  public weatherMapName = WeatherSettings.mapKey;

  /** Stores the response of the pads status request to the websver */
  public padsStatus = null;

  /** Variable to check if pads status is available */
  public padsStatusAvailable = new BehaviorSubject<any>(false);

  /** Flag that indicates if the configuration was initialized or if it was not */
  private _initialized = false;

  /**
   * Instantiates the service
   * @param {AlarmService} alarmService Service used to get the Alarms
   * @param {HttpClientService} httpClient Service used to perform HTTP requests
   */
  constructor(
    private alarmService: AlarmService,
    private httpClient: HttpClientService
  ) {}

  /**
  * Initializes the Service and getting configuration from Webserver
  */
  initialize() {
    if (this._initialized === false) {
      this.loadWeatherStationsConfig();
      this.loadImages();
      this.loadPadsStatus('');
      this._initialized = true;
    }
  }

  /**
  * Returns the instance of the {@link Alarm}
  * @param {AlarmConfig} config the corresponding AlarmConfig from where to get the type
  * @returns {string} the type of the {@link Alarm} associated to the given {@link AlarmConfig}
  */
  getIconSet(config: AlarmConfig, reliable: boolean): AlarmImageSet {
    if (!config) {
      return null;
    }
    const type = config.type;
    if (reliable) {
      if (config.type === 'humidity') {
        return this.humidityImageSet;
      } else if (config.type === 'temperature') {
        return this.tempImageSet;
      } else if (config.type === 'windspeed') {
        return this.windsImageSet;
      }
    } else {
      if (config.type === 'humidity') {
        return this.humidityImageUnreliableSet;
      } else if (config.type === 'temperature') {
        return this.tempImageUnreliableSet;
      } else if (config.type === 'windspeed') {
        return this.windsImageUnreliableSet;
      }
    }
  }

  /**
  * Requests data for the weather station map
  * @returns {Observable<Object>} observable of the data in a JSON
  */
  getMapData(): Observable<Object> {
    const url = BackendUrls.FILES_JSON + this.weatherMapName;
    return this.httpClient.get(url);
  }

  /**
  * Requests data for the pads status, to know if each one is in use or not, in order to to locate an antenna
  * @param {string} group the group
  * @returns {Observable<Object>} observable of the data in a JSON
  */
  getPadsStatus(group: string): Observable<Object> {
    const url = BackendUrls.PADS_STATUS + group;
    return this.httpClient.get(url);
  }

  /**
  * Loads the pads status in the related variable of this service
  * @param {string} group the group
  */
  loadPadsStatus(group: string) {
    this.getPadsStatus(group).subscribe(
      (response) => {
        this.padsStatusAvailable.next(false);
        this.padsStatus = response;
        this.padsStatusAvailable.next(true);
    });
  }

  /**
  * Define the IDs of the alarms that the component should listen to
  */
  loadWeatherStationsConfig() {
    this.httpClient.get(BackendUrls.WEATHER_VIEW).subscribe((response) => {
      this.weatherStationsConfig = response as AlarmConfig[];
    });
    this.httpClient.get(BackendUrls.WEATHER_SUMMARY).subscribe((response) => {
      this.weatherSummaryConfig = response as AlarmConfig[];
    });
  }

  /**
  * Define the alarms that the component should listen to and their respective icons
  */
  loadImages() {
    /** Set of Humidity icons */
    this.humidityImageSet = new AlarmImageSet({
      clear: Assets.ICONS + 'humidity-valid-clear.svg',
      set_low: Assets.ICONS + 'humidity-valid-low.svg',
      set_medium: Assets.ICONS + 'humidity-valid-low.svg',
      set_high: Assets.ICONS + 'humidity-valid-critical.svg',
      set_critical: Assets.ICONS + 'humidity-valid-critical.svg',
      unknown: Assets.ICONS + 'humidity-valid-unknown.svg',
      maintenance: Assets.ICONS + 'humidity-valid-maintenance.svg',
      shelved: Assets.ICONS + 'humidity-valid-clear.svg',
    });

    /** Set of Temperature icons */
    this.tempImageSet = new AlarmImageSet({
      clear: Assets.ICONS + 'temperature-valid-clear.svg',
      set_low: Assets.ICONS + 'temperature-valid-low.svg',
      set_medium: Assets.ICONS + 'temperature-valid-low.svg',
      set_high: Assets.ICONS + 'temperature-valid-critical.svg',
      set_critical: Assets.ICONS + 'temperature-valid-critical.svg',
      unknown: Assets.ICONS + 'temperature-valid-unknown.svg',
      maintenance: Assets.ICONS + 'temperature-valid-maintenance.svg',
      shelved: Assets.ICONS + 'temperature-valid-clear.svg',
    });

    /** Set of Wind Speed icons */
    this.windsImageSet = new AlarmImageSet({
      clear: Assets.ICONS + 'wind_speed-clear-valid.svg',
      set_low: Assets.ICONS + 'wind_speed-others-valid-low.svg',
      set_medium: Assets.ICONS + 'wind_speed-others-valid-low.svg',
      set_high: Assets.ICONS + 'wind_speed-critical-valid.svg',
      set_critical: Assets.ICONS + 'wind_speed-critical-valid.svg',
      unknown: Assets.ICONS + 'wind_speed-clear-valid-unknown.svg',
      maintenance: Assets.ICONS + 'wind_speed-clear-valid-maintenance.svg',
      shelved: Assets.ICONS + 'wind_speed-clear-valid.svg',
    });

    /** Set of Humidity Unreliable icons */
    this.humidityImageUnreliableSet = new AlarmImageSet({
      clear: Assets.ICONS + 'humidity-invalid-clear.svg',
      set_low: Assets.ICONS + 'humidity-invalid-low.svg',
      set_medium: Assets.ICONS + 'humidity-invalid-low.svg',
      set_high: Assets.ICONS + 'humidity-invalid-critical.svg',
      set_critical: Assets.ICONS + 'humidity-invalid-critical.svg',
      unknown: Assets.ICONS + 'humidity-invalid-unknown.svg',
      maintenance: Assets.ICONS + 'humidity-invalid-maintenance.svg',
      shelved: Assets.ICONS + 'humidity-valid-clear.svg',
    });

    /** Set of Temperature Unreliable icons */
    this.tempImageUnreliableSet = new AlarmImageSet({
      clear: Assets.ICONS + 'temperature-invalid-clear.svg',
      set_low: Assets.ICONS + 'temperature-invalid-low.svg',
      set_medium: Assets.ICONS + 'temperature-invalid-low.svg',
      set_high: Assets.ICONS + 'temperature-invalid-critical.svg',
      set_critical: Assets.ICONS + 'temperature-invalid-critical.svg',
      unknown: Assets.ICONS + 'temperature-invalid-unknown.svg',
      maintenance: Assets.ICONS + 'temperature-invalid-maintenance.svg',
      shelved: Assets.ICONS + 'temperature-valid-clear.svg',
    });

    /** Set of Wind Speed Unreliable icons */
    this.windsImageUnreliableSet = new AlarmImageSet({
      clear: Assets.ICONS + 'wind_speed-clear-invalid.svg',
      set_low: Assets.ICONS + 'wind_speed-others-invalid-low.svg',
      set_medium: Assets.ICONS + 'wind_speed-others-invalid-low.svg',
      set_high: Assets.ICONS + 'wind_speed-critical-invalid.svg',
      set_critical: Assets.ICONS + 'wind_speed-critical-invalid.svg',
      unknown: Assets.ICONS + 'wind_speed-clear-invalid-unknown.svg',
      maintenance: Assets.ICONS + 'wind_speed-clear-invalid-maintenance.svg',
      shelved: Assets.ICONS + 'wind_speed-clear-valid.svg',
    });

    /** Set of Marker icons */
    this.markerImageSet = new AlarmImageSet({
      clear: Assets.ICONS + 'weather_station-valid-clear.svg',
      set_low: Assets.ICONS + 'weather_station-valid-low.svg',
      set_medium: Assets.ICONS + 'weather_station-valid-low.svg',
      set_high: Assets.ICONS + 'weather_station-valid-critical.svg',
      set_critical: Assets.ICONS + 'weather_station-valid-critical.svg',
      unknown: Assets.ICONS + 'weather_station-valid-unknown.svg',
      maintenance: Assets.ICONS + 'weather_station-valid-maintenance.svg',
      shelved: Assets.ICONS + 'weather_station-valid-clear.svg',
    });

    /** Set of Marker Unreliable icons */
    this.markerImageUnreliableSet = new AlarmImageSet({
      clear: Assets.ICONS + 'weather_station-invalid-clear.svg',
      set_low: Assets.ICONS + 'weather_station-invalid-low.svg',
      set_medium: Assets.ICONS + 'weather_station-invalid-low.svg',
      set_high: Assets.ICONS + 'weather_station-invalid-critical.svg',
      set_critical: Assets.ICONS + 'weather_station-invalid-critical.svg',
      unknown: Assets.ICONS + 'weather_station-invalid-unknown.svg',
      maintenance: Assets.ICONS + 'weather_station-invalid-maintenance.svg',
      shelved: Assets.ICONS + 'weather_station-valid-clear.svg',
    });
  }
}
