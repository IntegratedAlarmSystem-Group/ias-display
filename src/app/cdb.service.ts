import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

import { environment } from '../environments/environment'

import { Observable } from 'rxjs/Rx';

import { HttpClientService } from './http-client.service';


@Injectable()
export class CdbService {

  /**
  * Cdb api url from environment settings
  */
  iasUrl = environment.cdbApiUrl+'/ias';
  iasioUrl = environment.cdbApiUrl+'/iasio';
  iasioAlarmsUrl = this.iasioUrl+'/filtered_by_alarm';

  /**
  * Variable to store the ias configuration data
  */
  iasConfiguration;
  /**
  * Variable to store alarm type iasios information data
  */
  // TODO: Refactor as a dictionary
  iasAlarmsIasios;

  /** Constructor */
  constructor(
    private http: HttpClient,
    private httpClientService: HttpClientService
  ) {}

  /**
  * Method to trigger main request at the beginning
  */
  initialize() {
    return Observable.forkJoin(
      this.getConfigurationData().map((res: Response) => res[0]),
      this.getAlarmsIasiosData().map((res: Response) => res),
    ).subscribe(
      latestValues => {
        this.iasConfiguration = latestValues[0];
        this.iasAlarmsIasios = latestValues[1];
      },
      err => console.error(err)
    );
  }

  /**
  * Get the ias configuration data from the webserver
  */
  getConfigurationData() {
    return this.httpClientService.get(this.iasUrl);
  }

  /**
  * Get information of alarms iasios from the webserver
  */
  getAlarmsIasiosData() {
    return this.httpClientService.get(this.iasioAlarmsUrl);
  }

  /**
  * Get refresh rate parameters from ias configuration data
  *
  * Refresh rate value and related multiplier factor
  */
  getRefreshRateParameters() {
    return {
      'refreshRate': this.iasConfiguration['refresh_rate'],
      'broadcastFactor': this.iasConfiguration['broadcast_factor']
    }
  }

  /**
  * Get short description from iasios information for a selected alarm id
  *
  * @param {string} alarmCoreID Alarm identifier for the alarm in the core system
  */
  getAlarmDescription(alarmCoreId): string {
      let targetIasioAlarm = this.iasAlarmsIasios.find(
        iasio => iasio.io_id === alarmCoreId);
      return targetIasioAlarm.short_desc;
  }

}
