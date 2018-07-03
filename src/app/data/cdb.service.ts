
import { Injectable } from '@angular/core';
import {forkJoin as observableForkJoin,  BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { HttpClientService } from '../data/http-client.service';
import { Iasio } from '../iasio';


/**
* Service that requests data from the Configuration database to the
* IAS Webserver through HTTP Requests
*/
@Injectable()
export class CdbService {

  /** IAS Webserver URL for IAS configuration requests */
  iasUrl = environment.cdbApiUrl + '/ias';

  /** IAS Webserver URL for IASIO requests */
  iasioUrl = environment.cdbApiUrl + '/iasio';

  /** IAS Webserver URL for requests of IASIOS filtered by Alarms */
  iasioAlarmsUrl = this.iasioUrl + '/filtered_by_alarm';

  /**
  * Variable to store the ias configuration data
  */
  iasConfiguration;

  /**
  * Variable to store alarm type iasios information data
  */
  iasAlarmsIasios: {[io_id: string]: Iasio } = {};

  /**
  * Notify changes on the service data
  */
  public iasDataAvailable = new BehaviorSubject<any>(false);

  /**
   * Instantiates the service
   * @param {HttpClientService} httpClientService Service used to perform HTTP requests
   */
  constructor(
    private httpClientService: HttpClientService
  ) {}

  /**
  * Triggers request of general information to the IAS Webserver when
  * the component is initializated
  */
  initialize() {
    return observableForkJoin(
      this.getConfigurationData().pipe(map((res: Response) => res[0])),
      this.getAlarmsIasiosData().pipe(map((res: Response) => res)),
    )
    .subscribe((data: any[]) => {
      const iasConfigurationData = data[0];
      const alarmsIasiosData = data[1];
      this.iasConfiguration = iasConfigurationData;
      alarmsIasiosData.forEach(iasio => {
        this.iasAlarmsIasios[iasio.io_id] = new Iasio(iasio);
      });
      this.iasDataAvailable.next(true);
    });
  }

  /**
  * Get the ias configuration data from the IAS Webserver
  * @returns {string} URL to request the IAS configuration
  */
  getConfigurationData() {
    return this.httpClientService.get(this.iasUrl);
  }

  /**
  * Get information of Iasios from the IAS Webserver
  * @returns {Date} last change timestamp of the {@link Alarm}
  */
  getAlarmsIasiosData() {
    return this.httpClientService.get(this.iasioAlarmsUrl);
  }

  /**
  * Get refresh rate parameters from IAS configuration data
  * These are refresh rate value and related multiplier factor
  * @returns {json} contains the 'refreshRate' and 'broadcastFactor' for the refresh rate
  */
  getRefreshRateParameters() {
    return {
      'refreshRate': this.iasConfiguration['refresh_rate'],
      'broadcastFactor': this.iasConfiguration['broadcast_factor']
    };
  }

  /**
  * Get short description from Iasios information for a selected alarm id
  * @param {string} alarmCoreID Alarm identifier for the alarm in the core system
  * @returns {string} the description of the IASIO
  */
  getAlarmDescription(alarmCoreId: string): string {
    if (alarmCoreId in this.iasAlarmsIasios) {
      return this.iasAlarmsIasios[alarmCoreId].short_desc;
    } else {
      return '';
    }
  }

  /**
  * Get link with documentation about the alarms
  * @returns {string} the documentation URL
  */
  getAlarmsInformationUrl(alarmCoreId: string): string {
    if (alarmCoreId in this.iasAlarmsIasios) {
      return this.iasAlarmsIasios[alarmCoreId].doc_url;
    } else {
      return '';
    }
  }

}
