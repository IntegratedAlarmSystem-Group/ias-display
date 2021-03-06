import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';



/**
* Custom Http Client Service for CRUD operations
* and related actions
*/
@Injectable()
export class HttpClientService {

  /**
  * Builds an instance of the service
  * @param {HttpClient} http Angular HTTP Service used to perform HTTP requests
  * @param {AuthService} authService service used to check and handle authorization
  */
  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
  }

  /**
  * Builds and returns HttpHeaders for the requests, including the token for requests
  * @returns {HttpHeaders} http headers
  */
  getHttpHeaders(): HttpHeaders {
    if (this.authService.getToken()) {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + this.authService.getToken()
      });
    } else {
      return new HttpHeaders({
        'Content-Type': 'application/json',
      });
    }
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
    const httpOptions = {
      headers: this.getHttpHeaders()
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
      headers: this.getHttpHeaders()
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
      headers: this.getHttpHeaders()
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
      headers: this.getHttpHeaders()
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
