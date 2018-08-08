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

  /** Set of Humidity Unreliable icons */
  public humidityImageUnreliableSet: AlarmImageSet;

  /** Set of Temperature Unreliable icons */
  public tempImageUnreliableSet: AlarmImageSet;

  /** Set of Wind Speed Unreliable icons */
  public windsImageUnreliableSet: AlarmImageSet;

  /** Alarms Ids for the weather summary **/
  public weatherSummaryConfig: WeatherStationConfig;

  /** Dictionary of Alarm Ids of the Weather Stations, indexed by placemark **/
  public weatherStationsConfig: {[placemark: string]: WeatherStationConfig } = {};
  // public weatherStationsConfig: WeatherStationConfig[];

  /** Key to retrieve the JSON with coordinates to draw the Weather Map */
  public weatherMapName = WeatherSettings.mapKey;

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
    this.loadWeatherStationsConfig();
    this.loadAlarmsAndImages();
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
  * Transforms the dictionary of weather stations configurations into a list
  * @returns {Object[]} a list with the weather stations configurations
  */
  getArrayValues() {
    return Object.values(this.weatherStationsConfig);
  }

  /**
  * Define the IDs of the alarms that the component should listen to
  */
  loadWeatherStationsConfig() {
    this.weatherStationsConfig =  {
      'Meteo201': {
        placemark: 'Meteo201',
        station: 'Alarmdummy',
        temperature: 'WS-Meteo201-Temperature',
        windspeed: 'WS-Meteo201-WindSpeed',
        humidity: 'WS-Meteo201-Humidity',
      },
      'MeteoCentral': {
        placemark: 'MeteoCentral',
        station: 'WS-MeteoCentral-Temperature',
        temperature: 'WS-MeteoCentral-Temperature',
        windspeed: 'WS-MeteoCentral-WindSpeed',
        humidity: 'WS-MeteoCentral-Humidity',
      },
      'Meteo410': {
        placemark: 'Meteo410',
        station: 'WS-MeteoOSF-Temperature',
        temperature: 'WS-MeteoOSF-Temperature',
        windspeed: 'WS-MeteoOSF-WindSpeed',
        humidity: 'WS-MeteoOSF-Humidity',
      },
      'Meteo309': {
        placemark: 'Meteo309',
        station: 'WS-Meteo309-Temperature',
        temperature: 'WS-Meteo309-Temperature',
        windspeed: 'WS-Meteo309-WindSpeed',
        humidity: 'WS-Meteo309-Humidity',
      },
    };
  }

  /**
  * Define the alarms that the component should listen to and their respective icons
  */
  loadAlarmsAndImages() {
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
      shelved: Assets.ICONS + 'hum-invalid-clear.svg',
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
      shelved: Assets.ICONS + 'temp-invalid-clear.svg',
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
      shelved: Assets.ICONS + 'wind_s-invalid-clear.svg',
    });
  }
}
