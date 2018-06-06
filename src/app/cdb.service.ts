import { Injectable } from '@angular/core';
import { environment } from '../environments/environment'
import { Observable } from 'rxjs/Rx';
import { HttpClientService } from './http-client.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Iasio } from './iasio';


/**
* Service that requests data from the Configuration database to the
* IAS Webserver through HTTP Requests
*/
@Injectable()
export class CdbService {

  /**
  * Cdb api url from environment settings
  */

  /** IAS Webserver URL for IAS configuration requests */
  iasUrl = environment.cdbApiUrl+'/ias';

  /** IAS Webserver URL for IASIO requests */
  iasioUrl = environment.cdbApiUrl+'/iasio';

  /** IAS Webserver URL for requests of IASIOS filtered by Alarms */
  iasioAlarmsUrl = this.iasioUrl+'/filtered_by_alarm';

  /**
  * Twiki url
  * TODO: Provisory link. To get the link from the cdb database when available.
  */
  wikiUrl = environment.wikiUrl;

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
    return Observable.forkJoin(
      this.getConfigurationData().map((res: Response) => res[0]),
      this.getAlarmsIasiosData().map((res: Response) => res),
    )
    .subscribe((data: any[]) => {
      let iasConfigurationData = data[0];
      let alarmsIasiosData = data[1];
      this.iasConfiguration = iasConfigurationData;
      alarmsIasiosData.forEach(iasio => {
        this.iasAlarmsIasios[iasio.io_id] = new Iasio(iasio);
      });
      this.iasDataAvailable.next(true);
    });
  }

  /**
  * Get the ias configuration data from the IAS Webserver
  */
  getConfigurationData() {
    return this.httpClientService.get(this.iasUrl);
  }

  /**
  * Get information of Iasios from the IAS Webserver
  */
  getAlarmsIasiosData() {
    return this.httpClientService.get(this.iasioAlarmsUrl);
  }

  /**
  * Get refresh rate parameters from IAS configuration data
  *
  * These are refresh rate value and related multiplier factor
  */
  getRefreshRateParameters() {
    return {
      'refreshRate': this.iasConfiguration['refresh_rate'],
      'broadcastFactor': this.iasConfiguration['broadcast_factor']
    }
  }

  /**
  * Get short description from Iasios information for a selected alarm id
  *
  * @param {string} alarmCoreID Alarm identifier for the alarm in the core system
  */
  getAlarmDescription(alarmCoreId): string {
    if (alarmCoreId in this.iasAlarmsIasios){
      return this.iasAlarmsIasios[alarmCoreId].short_desc;
    }
    else {
      return "";
    }
  }

  /**
  * Get link with documentation about the alarms
  */
  getAlarmsInformationUrl(): string {
    return this.wikiUrl;
  }

}
