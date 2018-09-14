import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';



/**
* Custom Http Client Service for CRUD operations
* and related actions
*/
@Injectable()
export class HttpClientService {

  /** The "constructor" */
  constructor(private http: HttpClient) {
  }

  /**
  * Method to manage httpRequest errors
  */
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  /**
  * Custom get method
  * @param {string} url target url
  * @returns {Response} the response of the request
  */
  get(url) {
    console.log('HTTP GET FROM URL: ', url);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.get(this.read_url(url), httpOptions);
  }

  /**
  * Custom post method
  * @param {string} url target url
  * @param data json with data
  * @returns {Response} the response of the request
  */
  post(url, data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post(this.read_url(url), data, httpOptions);
  }

  /**
  * Custom put method
  * @param {string} url target url
  * @param data json with data
  * @returns {Response} the response of the request
  */
  put(url, data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.put(this.read_url(url), data, httpOptions);
  }

  /**
  * Custom delete method
  * @param {string} url target url with the selected object id
  * @returns {Response} the response of the request
  */
  delete(url) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.delete(this.read_url(url), httpOptions);
  }

  /**
  * Proesses the url for the request by adding the base url for http requests
  * @param {string} url target url
  * @returns {string} the processed target url
  */
  read_url(url: string): string {
    return environment.httpUrl + url;
  }

}
