import { Injectable } from '@angular/core';
import { forkJoin as observableForkJoin, BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
  * Get refresh broadcast rate from IAS configuration data
  * @returns {number} contains the 'broadcastRate' in seconds
  */
  getBroadcastRate(): number {
    let value;
    try {
      value = Number(this.iasConfiguration['broadcastRate']);
    } catch (e) {
      value = 10;
    }
    return value;
  }

  /**
  * Get refresh broadcast threshold from IAS configuration data
  * @returns {number} contains the 'broadcastThreshold' in seconds
  */
  getBroadcastThreshold(): number {
    let value;
    try {
      value = Number(this.iasConfiguration['broadcastThreshold']);
    } catch (e) {
      value = 11;
    }
    return value;
  }
}
