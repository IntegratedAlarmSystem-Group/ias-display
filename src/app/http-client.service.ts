import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

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
  * @param url target url
  */
  get(url){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.get(url, httpOptions);
  }

  /**
  * Custom post method
  * @param url target url
  * @param data json with data
  */
  post(url, data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post(url, data, httpOptions);
  }

  /**
  * Custom put method
  * @param url target url
  * @param data json with data
  */
  put(url, data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.put(url, data, httpOptions);
  }

  /**
  * Custom delete method
  * @param url target url with the selected object id
  */
  delete(url){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.delete(url, httpOptions);
  }

}
