import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject , SubscriptionLike as ISubscription } from 'rxjs';
import { combineLatest } from 'rxjs';
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

  /** Variable to check if weather stations config is available */
  public weatherStationsConfigAvailable = new BehaviorSubject<any>(false);

  /** Variable to manage subscriptions */
  public subscription: ISubscription;

  /** Map from alarms to affected antennas */
  public alarmIdToAffectedAntennasMap = {};

  /** Map from affected antennas to alarms */
  public affectedAntennasToAlarmIdsMap = {};

  /** Map for affected antennas colors */
  public affectedAntennaHighPriorityAlarm = {};

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
      const combinedSubscription = combineLatest(
        this.weatherStationsConfigAvailable,
        this.alarmService.alarmChangeStream
      );
      this.subscription = combinedSubscription.subscribe(
        ([weatherConfigAvailable, alarmChange]) => {
          if (weatherConfigAvailable) {
            if (weatherConfigAvailable === true) {
              if (Object.keys(this.alarmIdToAffectedAntennasMap).length === 0) {
                this.initializeAntennasRelationMaps();
              } else {
                if (alarmChange) {
                  this.updateAntennasRelationMapsAndAlarmPriorities(alarmChange);
                }
              }
            }
          }
        }
      );
      this._initialized = true;
    }
  }

  /**
  * General update for relation maps and antenna alarm priorities
  */
  updateAntennasRelationMapsAndAlarmPriorities(alarmChange: string) {
    if (alarmChange === 'all') {
      for (const alarmId of Object.keys(this.alarmIdToAffectedAntennasMap)) {
        this.updateAntennasRelationMaps(alarmId);
      }
      this.updateAllAntennaHighPriorityMap();
    } else {
      for (const alarmId of Object.keys(this.alarmIdToAffectedAntennasMap)) {
        this.updateAntennasRelationMaps(alarmId);
      }
      const selectedAlarmId = alarmChange;
      if (Object.keys(this.alarmIdToAffectedAntennasMap).indexOf(selectedAlarmId) > 0) {
        const localMap = Object.assign({}, this.affectedAntennaHighPriorityAlarm);
        for (let i = 0; i < this.alarmIdToAffectedAntennasMap[selectedAlarmId]; i++) {
          const antenna = this.alarmIdToAffectedAntennasMap[selectedAlarmId];
          const highAlarm = this.getAntennaHighPriorityAlarm(antenna);
          localMap[antenna] = highAlarm;
        }
        this.affectedAntennaHighPriorityAlarm = localMap;
      }
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
      this.weatherStationsConfigAvailable.next(true);
    });
    this.httpClient.get(BackendUrls.WEATHER_SUMMARY).subscribe((response) => {
      this.weatherSummaryConfig = response as AlarmConfig[];
    });
  }

  /**
  * Method to obtain a flattened configuration list
  */
  getFlattennedList(configInput: any) {
    const flattennedList = [];
    const configItems = [];
    // first level configurations
    for (const config of configInput) {
      flattennedList.push(config.alarm_id);
      configItems.push(config);
    }
    // other configurations
    while (configItems.length > 0) {
      const config = configItems.pop();
      for (const e of config.children) {
        flattennedList.push(e.alarm_id);
        configItems.push(e);
      }
    }
    return flattennedList;
  }

  /**
  * Initializes alarm to antennas relation maps
  */
  initializeAntennasRelationMaps() {
    const flattennedConfigAlarmIds = this.getFlattennedList(
      this.weatherStationsConfig
    );
    for (const alarmId of flattennedConfigAlarmIds) {
      this.alarmIdToAffectedAntennasMap[alarmId] = [];
    }
    // update alarmId to Antennas Map
    for (const alarmId of Object.keys(this.alarmIdToAffectedAntennasMap)) {
      this.updateAntennasRelationMaps(alarmId);
    }
    this.updateAllAntennaHighPriorityMap();
  }

  /**
  * Update affected antennas high priority alarms
  */
  updateAllAntennaHighPriorityMap() {
    const localMap = Object.assign({}, this.affectedAntennaHighPriorityAlarm);
    for (const antenna of Object.keys(this.affectedAntennasToAlarmIdsMap)) {
      localMap[antenna] = this.getAntennaHighPriorityAlarm(antenna);
    }
    this.affectedAntennaHighPriorityAlarm = localMap;
  }

  /**
  * Update alarm to antennas relation maps
  */
  updateAntennasRelationMaps(alarmId: string) {
    if (this.alarmService.isAlarmIndexAvailable(alarmId)) {
      const antennasString = this.alarmService.get(alarmId).properties['affectedAntennas'];
      if (typeof antennasString !== 'undefined') {
        const antennas = antennasString.split(',')
         .map((antennaString: string) => antennaString.trim());
        for (const antenna of antennas) {
          // alarmId to affectedAntennas
          if (Object.keys(this.alarmIdToAffectedAntennasMap).indexOf(alarmId) > -1) {
            if (this.alarmIdToAffectedAntennasMap[alarmId].indexOf(antenna) < 0) {
              this.alarmIdToAffectedAntennasMap[alarmId].push(antenna);
            }
          } else {
            this.alarmIdToAffectedAntennasMap[alarmId] = [antenna];
          }
          // affectedAntennas to alarmIds
          if (Object.keys(this.affectedAntennasToAlarmIdsMap).indexOf(antenna) > -1) {
            if (this.affectedAntennasToAlarmIdsMap[antenna].indexOf(alarmId) < 0) {
              this.affectedAntennasToAlarmIdsMap[antenna].push(alarmId);
            }
          } else {
            this.affectedAntennasToAlarmIdsMap[antenna] = [alarmId];
          }
        }
      }
    }
  }

  /**
  * Get antenna high priority alarm
  */
  getAntennaHighPriorityAlarm(antenna: string) {
    if (Object.keys(this.affectedAntennasToAlarmIdsMap).indexOf(antenna) > -1) {
      const alarmIds = this.affectedAntennasToAlarmIdsMap[antenna];
      const alarms = alarmIds.map(
        (alarmId: string) => this.alarmService.get(alarmId)
      );
      alarms.sort((a: Alarm, b: Alarm) => a.value < b.value ? 1 : a.value > b.value ? -1 : 0);
      const highPriorityAlarm = alarms[0];
      return highPriorityAlarm;
    } else {
      return null;
    }
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
