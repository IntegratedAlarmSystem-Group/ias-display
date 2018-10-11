import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject , SubscriptionLike as ISubscription } from 'rxjs';
import { AlarmComponent, AlarmImageSet } from '../shared/alarm/alarm.component';
import { Alarm } from '../data/alarm';
import { Assets } from '../settings';
import { HttpClientService } from '../data/http-client.service';
import { BackendUrls, WeatherSettings } from '../settings';


/**
* Stores the IDs of the {@link Alarm} objects associated to a WeatherStation
*/
export class WeatherStationConfig {

  /** ID to map the {@link Alarm} to the location on the map */
  public placemark: string;

  /** ID of the main {@link Alarm} of the Weather Station */
  public station: string;

  /** ID of the temperature {@link Alarm} of the Weather Station */
  public temperature: string;

  /** ID of the windspeed {@link Alarm} of the Weather Station */
  public windspeed: string;

  /** ID of the humidity {@link Alarm} of the Weather Station */
  public humidity: string;

  /**
  * Builds a new WeatherStationConfig instance
  * @param {Object} attributes a dictionary containing the attributes to
  * create the object
  */
  constructor(attributes: Object = {}) {
    Object.assign(this, attributes);
  }
}

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
  public weatherSummaryConfig: WeatherStationConfig;

  /** Dictionary of Alarm Ids of the Weather Stations, indexed by placemark **/
  public weatherStationsConfig: WeatherStationConfig[];

  /** Key to retrieve the JSON with coordinates to draw the Weather Map */
  public weatherMapName = WeatherSettings.mapKey;

  public padsStatus = null;

  /** Flag that indicates if the configuration was initialized or if it was not */
  private _initialized = false;

  /**
   * Instantiates the service
   * @param {HttpClientService} httpClient Service used to perform HTTP requests
   */
  constructor(
    private httpClient: HttpClientService
  ) {}

  /**
  * Initializes the Service and getting configuration from Webserver
  */
  initialize() {
    if (this._initialized === false) {
      this.loadWeatherStationsConfig();
      this.loadImages();
      this._initialized = true;
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
  * Return list of antennas associated to the given weather station
  * @param {string} station the ID of the weather station
  * @returns {string[]} a list with the name of nearby antennas
  */
  getAntennas(station: string): string[] {
    return ['A001', 'A002', 'A003'];
  }

  /**
  * Define the IDs of the alarms that the component should listen to
  */
  loadWeatherStationsConfig() {
    this.httpClient.get(BackendUrls.WEATHER_VIEW).subscribe((response) => {
      this.weatherStationsConfig = response as WeatherStationConfig[];
    });
    this.httpClient.get(BackendUrls.WEATHER_SUMMARY).subscribe((response) => {
      this.weatherSummaryConfig = response as WeatherStationConfig;
    });
  }

  /**
  * Define the alarms that the component should listen to and their respective icons
  */
  loadImages() {
    /** Set of Humidity icons */
    this.humidityImageSet = new AlarmImageSet({
      clear: Assets.ICONS + 'hum-valid-clear.svg',
      set_low: Assets.ICONS + 'hum-valid-low.svg',
      set_medium: Assets.ICONS + 'hum-valid-low.svg',
      set_high: Assets.ICONS + 'hum-valid-critical.svg',
      set_critical: Assets.ICONS + 'hum-valid-critical.svg',
      unknown: Assets.ICONS + 'hum-valid-unkn.svg',
      maintenance: Assets.ICONS + 'hum-valid-maint.svg',
      shelved: Assets.ICONS + 'hum-valid-clear.svg',
    });

    /** Set of Temperature icons */
    this.tempImageSet = new AlarmImageSet({
      clear: Assets.ICONS + 'temp-valid-clear.svg',
      set_low: Assets.ICONS + 'temp-valid-low.svg',
      set_medium: Assets.ICONS + 'temp-valid-low.svg',
      set_high: Assets.ICONS + 'temp-valid-critical.svg',
      set_critical: Assets.ICONS + 'temp-valid-critical.svg',
      unknown: Assets.ICONS + 'temp-valid-unkn.svg',
      maintenance: Assets.ICONS + 'temp-valid-maint.svg',
      shelved: Assets.ICONS + 'temp-valid-clear.svg',
    });

    /** Set of Wind Speed icons */
    this.windsImageSet = new AlarmImageSet({
      clear: Assets.ICONS + 'wind_s-valid-clear.svg',
      set_low: Assets.ICONS + 'wind_s-valid-low.svg',
      set_medium: Assets.ICONS + 'wind_s-valid-low.svg',
      set_high: Assets.ICONS + 'wind_s-valid-critical.svg',
      set_critical: Assets.ICONS + 'wind_s-valid-critical.svg',
      unknown: Assets.ICONS + 'wind_s-valid-unkn.svg',
      maintenance: Assets.ICONS + 'wind_s-valid-maint.svg',
      shelved: Assets.ICONS + 'wind_s-valid-clear.svg',
    });

    /** Set of Humidity Unreliable icons */
    this.humidityImageUnreliableSet = new AlarmImageSet({
      clear: Assets.ICONS + 'hum-invalid-clear.svg',
      set_low: Assets.ICONS + 'hum-invalid-low.svg',
      set_medium: Assets.ICONS + 'hum-invalid-low.svg',
      set_high: Assets.ICONS + 'hum-invalid-critical.svg',
      set_critical: Assets.ICONS + 'hum-invalid-critical.svg',
      unknown: Assets.ICONS + 'hum-invalid-unkn.svg',
      maintenance: Assets.ICONS + 'hum-invalid-maint.svg',
      shelved: Assets.ICONS + 'hum-valid-clear.svg',
    });

    /** Set of Temperature Unreliable icons */
    this.tempImageUnreliableSet = new AlarmImageSet({
      clear: Assets.ICONS + 'temp-invalid-clear.svg',
      set_low: Assets.ICONS + 'temp-invalid-low.svg',
      set_medium: Assets.ICONS + 'temp-invalid-low.svg',
      set_high: Assets.ICONS + 'temp-invalid-critical.svg',
      set_critical: Assets.ICONS + 'temp-invalid-critical.svg',
      unknown: Assets.ICONS + 'temp-invalid-unkn.svg',
      maintenance: Assets.ICONS + 'temp-invalid-maint.svg',
      shelved: Assets.ICONS + 'temp-valid-clear.svg',
    });

    /** Set of Wind Speed Unreliable icons */
    this.windsImageUnreliableSet = new AlarmImageSet({
      clear: Assets.ICONS + 'wind_s-invalid-clear.svg',
      set_low: Assets.ICONS + 'wind_s-invalid-low.svg',
      set_medium: Assets.ICONS + 'wind_s-invalid-low.svg',
      set_high: Assets.ICONS + 'wind_s-invalid-critical.svg',
      set_critical: Assets.ICONS + 'wind_s-invalid-critical.svg',
      unknown: Assets.ICONS + 'wind_s-invalid-unkn.svg',
      maintenance: Assets.ICONS + 'wind_s-invalid-maint.svg',
      shelved: Assets.ICONS + 'wind_s-valid-clear.svg',
    });

    /** Set of Marker icons */
    this.markerImageSet = new AlarmImageSet({
      clear: Assets.ICONS + 'weather_s-valid-clear.svg',
      set_low: Assets.ICONS + 'weather_s-valid-medium.svg',
      set_medium: Assets.ICONS + 'weather_s-valid-medium.svg',
      set_high: Assets.ICONS + 'weather_s-valid-critical.svg',
      set_critical: Assets.ICONS + 'weather_s-valid-critical.svg',
      unknown: Assets.ICONS + 'weather_s-valid-unknown.svg',
      maintenance: Assets.ICONS + 'weather_s-valid-maintenance.svg',
      shelved: Assets.ICONS + 'weather_s-valid-clear.svg',
    });

    /** Set of Marker Unreliable icons */
    this.markerImageUnreliableSet = new AlarmImageSet({
      clear: Assets.ICONS + 'weather_s-invalid-clear.svg',
      set_low: Assets.ICONS + 'weather_s-invalid-medium.svg',
      set_medium: Assets.ICONS + 'weather_s-invalid-medium.svg',
      set_high: Assets.ICONS + 'weather_s-invalid-critical.svg',
      set_critical: Assets.ICONS + 'weather_s-invalid-critical.svg',
      unknown: Assets.ICONS + 'weather_s-invalid-unknown.svg',
      maintenance: Assets.ICONS + 'weather_s-invalid-maintenance.svg',
      shelved: Assets.ICONS + 'weather_s-valid-clear.svg',
    });
  }
}
