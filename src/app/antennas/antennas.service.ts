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
    this.mapAlarmsConfig = {
      'A021': {
        antenna: 'DV01',
        placemark: 'A021',
        alarm: 'Alarmdummy',
      },
      'W210': {
        antenna: 'DV02',
        placemark: 'W210',
        alarm: 'WS-MeteoCentral-Temperature',
      },
      'P401': {
        antenna: 'DV03',
        placemark: 'P401',
        alarm: 'Alarmdummy',
      },
      'S306': {
        antenna: 'DV04',
        placemark: 'S306',
        alarm: 'WS-MeteoCentral-Temperature',
      },
      'A124': {
        antenna: 'DV05',
        placemark: 'A124',
        alarm: 'WS-MeteoCentral-Temperature',
      },
      'A130': {
        antenna: 'DV06',
        placemark: 'A130',
        alarm: 'Alarmdummy',
      },
      'W201': {
        antenna: 'DV07',
        placemark: 'W201',
        alarm: 'Alarmdummy',
      },
      'A078': {
        antenna: 'DV08',
        placemark: 'A078',
        alarm: 'Alarmdummy',
      },
      'A077': {
        antenna: 'DV09',
        placemark: 'A077',
        alarm: 'Alarmdummy',
      },
      'P413': {
        antenna: 'DV10',
        placemark: 'P413',
        alarm: 'Alarmdummy',
      },
      'S308': {
        antenna: 'DV11',
        placemark: 'S308',
        alarm: 'Alarmdummy',
      },
      'S309': {
        antenna: 'DV12',
        placemark: 'S309',
        alarm: 'Alarmdummy',
      },
    };

    this.sidebarAlarmsConfig = {
      'DV': [
        {
          antenna: 'DV01',
          placemark: 'A021',
          alarm: 'Alarmdummy'
        },
        {
          antenna: 'DV02',
          placemark: 'W210',
          alarm: 'WS-MeteoCentral-Temperature',
        },
        {
          antenna: 'DV03',
          placemark: 'P401',
          alarm: 'Alarmdummy',
        },
        {
          antenna: 'DV04',
          placemark: 'S306',
          alarm: 'WS-MeteoCentral-Temperature',
        },
        {
          antenna: 'DV05',
          placemark: 'A124',
          alarm: 'WS-MeteoCentral-Temperature',
        },
        {
          antenna: 'DV06',
          placemark: 'A130',
          alarm: 'Alarmdummy',
        },
        {
          antenna: 'DV07',
          placemark: 'W201',
          alarm: 'Alarmdummy',
        },
        {
          antenna: 'DV08',
          placemark: 'A078',
          alarm: 'Alarmdummy',
        },
        {
          antenna: 'DV09',
          placemark: 'A077',
          alarm: 'Alarmdummy',
        },
        {
          antenna: 'DV10',
          placemark: 'P413',
          alarm: 'Alarmdummy',
        },
        {
          antenna: 'DV11',
          placemark: 'S308',
          alarm: 'Alarmdummy',
        },
        {
          antenna: 'DV12',
          placemark: 'S309',
          alarm: 'Alarmdummy',
        },
        {
          antenna: 'DV13',
          placemark: 'A021',
          alarm: 'Alarmdummy'
        },
        {
          antenna: 'DV14',
          placemark: 'W210',
          alarm: 'WS-MeteoCentral-Temperature',
        },
        {
          antenna: 'DV15',
          placemark: 'P401',
          alarm: 'Alarmdummy',
        },
        {
          antenna: 'DV16',
          placemark: 'S306',
          alarm: 'WS-MeteoCentral-Temperature',
        },
        {
          antenna: 'DV17',
          placemark: 'A124',
          alarm: 'WS-MeteoCentral-Temperature',
        },
        {
          antenna: 'DV18',
          placemark: 'A130',
          alarm: 'Alarmdummy',
        },
        {
          antenna: 'DV19',
          placemark: 'W201',
          alarm: 'Alarmdummy',
        },
        {
          antenna: 'DV20',
          placemark: 'A078',
          alarm: 'Alarmdummy',
        },
        {
          antenna: 'DV21',
          placemark: 'A077',
          alarm: 'Alarmdummy',
        },
        {
          antenna: 'DV22',
          placemark: 'P413',
          alarm: 'Alarmdummy',
        },
        {
          antenna: 'DV23',
          placemark: 'S308',
          alarm: 'Alarmdummy',
        },
        {
          antenna: 'DV24',
          placemark: 'S309',
          alarm: 'Alarmdummy',
        },
        {
          antenna: 'DV25',
          placemark: 'S309',
          alarm: 'Alarmdummy',
        }
      ],
      'DA': [
        {
          antenna: 'DA41',
          placemark: 'A021',
          alarm: 'Alarmdummy'
        },
        {
          antenna: 'DA42',
          placemark: 'W210',
          alarm: 'WS-MeteoCentral-Temperature',
        },
        {
          antenna: 'DA43',
          placemark: 'P401',
          alarm: 'Alarmdummy',
        },
        {
          antenna: 'DA44',
          placemark: 'S306',
          alarm: 'WS-MeteoCentral-Temperature',
        },
        {
          antenna: 'DA45',
          placemark: 'A124',
          alarm: 'WS-MeteoCentral-Temperature',
        },
        {
          antenna: 'DA46',
          placemark: 'A130',
          alarm: 'Alarmdummy',
        },
        {
          antenna: 'DA47',
          placemark: 'W201',
          alarm: 'Alarmdummy',
        },
        {
          antenna: 'DA48',
          placemark: 'A078',
          alarm: 'Alarmdummy',
        },
        {
          antenna: 'DA49',
          placemark: 'A077',
          alarm: 'Alarmdummy',
        },
        {
          antenna: 'DA50',
          placemark: 'P413',
          alarm: 'Alarmdummy',
        },
        {
          antenna: 'DA51',
          placemark: 'S308',
          alarm: 'Alarmdummy',
        },
        {
          antenna: 'DA52',
          placemark: 'S309',
          alarm: 'Alarmdummy',
        },
        {
          antenna: 'DA53',
          placemark: 'A021',
          alarm: 'Alarmdummy'
        },
        {
          antenna: 'DA54',
          placemark: 'W210',
          alarm: 'WS-MeteoCentral-Temperature',
        },
        {
          antenna: 'DA55',
          placemark: 'P401',
          alarm: 'Alarmdummy',
        },
        {
          antenna: 'DA56',
          placemark: 'S306',
          alarm: 'WS-MeteoCentral-Temperature',
        },
        {
          antenna: 'DA57',
          placemark: 'A124',
          alarm: 'WS-MeteoCentral-Temperature',
        },
        {
          antenna: 'DA58',
          placemark: 'A130',
          alarm: 'Alarmdummy',
        },
        {
          antenna: 'DA59',
          placemark: 'W201',
          alarm: 'Alarmdummy',
        },
        {
          antenna: 'DA60',
          placemark: 'A078',
          alarm: 'Alarmdummy',
        },
        {
          antenna: 'DA61',
          placemark: 'A077',
          alarm: 'Alarmdummy',
        },
        {
          antenna: 'DA62',
          placemark: 'P413',
          alarm: 'Alarmdummy',
        },
        {
          antenna: 'DA63',
          placemark: 'S308',
          alarm: 'Alarmdummy',
        },
        {
          antenna: 'DA64',
          placemark: 'S309',
          alarm: 'Alarmdummy',
        },
        {
          antenna: 'DA65',
          placemark: 'S309',
          alarm: 'Alarmdummy',
        }
      ],
      'CM': [
        {
          antenna: 'CM01',
          placemark: 'A021',
          alarm: 'Alarmdummy'
        },
        {
          antenna: 'CM02',
          placemark: 'W210',
          alarm: 'WS-MeteoCentral-Temperature',
        },
        {
          antenna: 'CM03',
          placemark: 'P401',
          alarm: 'Alarmdummy',
        },
        {
          antenna: 'CM04',
          placemark: 'S306',
          alarm: 'WS-MeteoCentral-Temperature',
        },
        {
          antenna: 'CM05',
          placemark: 'A124',
          alarm: 'WS-MeteoCentral-Temperature',
        },
        {
          antenna: 'CM06',
          placemark: 'A130',
          alarm: 'Alarmdummy',
        },
        {
          antenna: 'CM07',
          placemark: 'W201',
          alarm: 'Alarmdummy',
        },
        {
          antenna: 'CM08',
          placemark: 'A078',
          alarm: 'Alarmdummy',
        },
        {
          antenna: 'CM09',
          placemark: 'A077',
          alarm: 'Alarmdummy',
        },
        {
          antenna: 'CM10',
          placemark: 'P413',
          alarm: 'Alarmdummy',
        },
        {
          antenna: 'CM11',
          placemark: 'S308',
          alarm: 'Alarmdummy',
        },
        {
          antenna: 'CM12',
          placemark: 'S309',
          alarm: 'Alarmdummy',
        }
      ],
      'PM': [
        {
          antenna: 'PM01',
          placemark: 'A021',
          alarm: 'Alarmdummy'
        },
        {
          antenna: 'PM02',
          placemark: 'W210',
          alarm: 'WS-MeteoCentral-Temperature',
        },
        {
          antenna: 'PM03',
          placemark: 'P401',
          alarm: 'Alarmdummy',
        },
        {
          antenna: 'PM04',
          placemark: 'S306',
          alarm: 'WS-MeteoCentral-Temperature',
        }
      ]
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
