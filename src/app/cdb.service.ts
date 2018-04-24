import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

import { environment } from '../environments/environment'

import {Observable} from 'rxjs/Rx';

import { HttpClientService } from './http-client.service';


@Injectable()
export class CdbService {

  /**
  * Cdb api url from environment settings
  */
  url = environment.cdbApiUrl+'/ias';

  /**
  * Variable to store the ias configuration data
  */
  iasConfiguration;

  /** Constructor */
  constructor(
    private http: HttpClient,
    private httpClientService: HttpClientService
  ) {}

  /**
  * Method to trigger main request at the beginning
  */
  initialize() {
    return this.getConfigurationData()
      .subscribe(
        data => { this.iasConfiguration = data[0]; }
    )
  }

  /**
  * Get the ias configuration data from the webserver
  */
  getConfigurationData() {
    return this.httpClientService.get(this.url);
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

}
