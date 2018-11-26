import { Injectable } from '@angular/core';
import {forkJoin as observableForkJoin,  BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Rx';
import { BackendUrls } from '../settings';
import { HttpClientService } from '../data/http-client.service';
import { Iasio } from '../data/iasio';


/**
* Service that requests data from the Configuration database to the
* IAS Webserver through HTTP Requests
*/
@Injectable()
export class CdbService {

  /** IAS Webserver URL for IAS configuration requests */
  iasUrl = BackendUrls.CDB_IAS;

  /**
  * Variable to store the ias configuration data
  */
  iasConfiguration;

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
    return this.getConfigurationData().subscribe((res) => {
      this.iasConfiguration = res;
      this.iasDataAvailable.next(true);
    });
  }

  /**
  * Get the ias configuration data from the IAS Webserver
  * @returns {json} IAS configuration
  */
  getConfigurationData() {
    return this.httpClientService.get(this.iasUrl);
  }

  /**
  * Get refresh rate parameters from IAS configuration data
  * These are refresh rate value and related multiplier factor
  * @returns {json} contains the 'refreshRate' and 'broadcastFactor' for the refresh rate
  */
  getRefreshRateParameters() {
    return {
      'refreshRate': Number(this.iasConfiguration['refreshRate']),
      'tolerance': Number(this.iasConfiguration['tolerance']),
      'broadcastFactor': Number(this.iasConfiguration['broadcastFactor'])
    };
  }

  /**
  * Get refresh broadcast threshold from IAS configuration data
  * @returns {number} contains the 'broadcastThreshold' in seconds
  */
  getBroadcastThreshold() {
    return Number(this.iasConfiguration['broadcastThreshold']);
  }
}
