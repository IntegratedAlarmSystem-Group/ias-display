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
  iasData;

  constructor(private http: HttpClient) {
  }

  /**
  * Get the ias configuration data from the webserver
  */
  getData() {
    return this.http.get(this.url)
      .map(data => this.iasData = data);
  }

}
