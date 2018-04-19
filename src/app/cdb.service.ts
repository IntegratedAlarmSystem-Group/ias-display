import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

import { environment } from '../environments/environment'

import {Observable} from 'rxjs/Rx';


@Injectable()
export class CdbService {

  /**
  * Cdb api url from environment settings
  */
  url = environment.apiUrl;

  /**
  * Variable to store the ias configuration data
  */
  iasConfiguration;

  /** Constructor */
  constructor(private http: HttpClient) {
  }

  /**
  * Method to trigger main request at the beginning
  */
  initialize() {
    return this.getConfigurationData();
  }

  /**
  * Get the ias configuration data from the webserver
  */
  getConfigurationData() {
    return this.http.get(this.url)
      .map(data => this.iasConfiguration = data[0]);
  }

  /**
  * Get refresh rate from ias configuration data
  */
  getRefreshRate() {
    return this.iasConfiguration['refresh_rate'];
  }

}
