import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { environment } from '../environments/environment'
import { Observable } from 'rxjs/Rx';
import { HttpClientService } from './http-client.service';
import { Iasio } from './iasio';


@Injectable()
export class CdbService {

  /**
  * Cdb api url from environment settings
  */
  iasUrl = environment.cdbApiUrl+'/ias';
  iasioUrl = environment.cdbApiUrl+'/iasio';
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
    )
    .subscribe((data: any[]) => {
      let iasConfigurationData = data[0];
      let alarmsIasiosData = data[1];
      this.iasConfiguration = iasConfigurationData;
      alarmsIasiosData.forEach(iasio => {
        this.iasAlarmsIasios[iasio.io_id] = new Iasio(iasio);
      });
    });
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
    return this.iasAlarmsIasios[alarmCoreId].short_desc;
  }

  /**
  * Get link with information about the alarms
  */
  getAlarmsInformationUrl(): string {
    return this.wikiUrl;
  }

}
