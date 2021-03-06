import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BackendUrls } from '../settings';
import { environment } from '../../environments/environment';


/**
* Service used to request and handle tokens and authorization
*/
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
  * Name for the browser to use in order to save the token in the local storage
  */
  TOKEN_STORAGE_NAME = 'IAS-TOKEN';

  /**
  * Name for the browser to use in order to save the user in the local storage
  */
  USER_STORAGE_NAME = 'IAS-USER';

  /**
  * Name for the browser to use in order to save the allowed actions in the local storage
  */
  ACTIONS_STORAGE_NAME = 'IAS-ACTIONS';

  /**
  * Store the URL so we can redirect after logging in
  */
  redirectUrl: string;


  /**
  * Store if the user is logged in or not
  */
  loginStatus = false;

  /**
  * Stream of notifications when the user logs in. Sends true, if the user is logged in, and false if not
  */
  public loginStatusStream = new BehaviorSubject<boolean>(null);

  /**
   * Builds an instance of the service
   * @param {HttpClient} http Angular HttpClient used to request the token for authentication
   */
  constructor(
    private http: HttpClient
  ) { }

  /**
   * Changes the {@link loginStatus} and sneds the corresponding update in the {@link loginStatusStream}
   * @param {boolean} status the new login status
   */
  changeLoginStatus(status: boolean) {
    this.loginStatus = status;
    this.loginStatusStream.next(status);
  }

  /**
  * Builds and returns HttpHeaders for the requests, including the token for requests
  * @returns {HttpHeaders} http headers
  */
  getHttpHeaders(): HttpHeaders {
    if (this.getToken()) {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + this.getToken()
      });
    } else {
      return new HttpHeaders({
        'Content-Type': 'application/json',
      });
    }
  }

  /**
   * Checks wether or not the user has a token, which is true if there is a valid token
   * @returns { Observable<boolean>} true if there is a valid token, false if not
   */
  hasToken(): Observable<boolean> {
    const hasToken = this.getToken() !== undefined && this.getToken() !== null;
    this.changeLoginStatus(hasToken);
    return of(hasToken);
  }

  /**
   * Checks wether or not the user is logged-in (has a valid token), which is true if there is a valid token
   * @returns { Observable<boolean>} true if there is a valid token, false if not
   */
  hasValidToken(): Observable<boolean> {
    if (!this.getToken()) {
      this.changeLoginStatus(false);
      return of(false);
    } else {
      const url = `${environment.httpUrl}${BackendUrls.VALIDATE_TOKEN}`;
      return this.http.get(url, {headers: this.getHttpHeaders()} ).pipe(
        map((response: any) => {
          const user_data = response['user_data'];
          const allowed_actions = response['allowed_actions'];
          this.storeUser(user_data['username']);
          this.storeAllowedActions(allowed_actions);
          this.changeLoginStatus(true);
          return true;
        }),
        catchError( error => {
          console.error(error);
          this.logout();
          return of(false);
        }
      ));
    }
  }

  /**
   * Requests a token from the server, sending user and password information.
   * Saves the token in the local storage
   * @param {string} username the name of the user
   * @param {string} password the password of the user
   * @returns {Observable<boolean>} observable of true if the login is successful, observable of false if not
   */
  login(username: string, password: string): Observable<boolean> {
    const url = `${environment.httpUrl}${BackendUrls.TOKEN}`;
    return this.http.post(url, {
      username: username,
      password: password
    }).pipe(map((response: any) => {
      // console.log('Login response:', response);
      const token = response['token'];
      if (token) {
        this.storeToken(token);
        this.storeUser(username);
        this.changeLoginStatus(true);
        const allowed_actions = response['allowed_actions'];
        this.storeAllowedActions(allowed_actions);
        return true;
      } else {
        this.changeLoginStatus(false);
        return false;
      }
    }));
  }

  /**
   * Logs out of the server by deleting the token from the local storage
   */
  logout(): void {
    this.changeLoginStatus(false);
    this.removeToken();
    this.removeUser();
  }

  /**
  * Returns the token stored in the local storage
  * @returns {string | undefined} the token as a string, or undefined if there is no token
  */
  getToken(): string | undefined {
    const token = localStorage.getItem(this.TOKEN_STORAGE_NAME);
    if (token === null) {
      return undefined;
    } else {
      return JSON.parse(token);
    }
  }

  /**
  * Returns the user stored in the local storage
  * @returns {string | undefined} the user name as a string, or undefined if there is no user
  */
  getUser(): string | undefined {
    const user = localStorage.getItem(this.USER_STORAGE_NAME);
    if (user === null) {
      return undefined;
    } else {
      return JSON.parse(user);
    }
  }

  /**
  * Returns the user permission over the specified action stored in the local storage
  * @returns {boolean | undefined} the permission as a boolean
  */
  getAllowedActions(): boolean {
    const allowed_actions = localStorage.getItem(this.ACTIONS_STORAGE_NAME);
    if (allowed_actions === null) {
      return undefined;
    } else {
      return JSON.parse(allowed_actions);
    }
  }

  /**
  * Deletes the token from the local storage
  */
  removeToken() {
    localStorage.removeItem(this.TOKEN_STORAGE_NAME);
  }

  /**
  * Deletes the user from the local storage
  */
  removeUser() {
    localStorage.removeItem(this.USER_STORAGE_NAME);
  }

  /**
  * Deletes the allowed_actions from the local storage
  */
  removeAllowedActions() {
    localStorage.removeItem(this.ACTIONS_STORAGE_NAME);
  }

  /**
  * Stores a given the token in the local storage, replacing the previous token, if any
  * @param {string} token the token to be stored
  */
  storeToken(token: string) {
    localStorage.removeItem(this.TOKEN_STORAGE_NAME);
    localStorage.setItem(this.TOKEN_STORAGE_NAME, JSON.stringify(token));
  }

  /**
  * Stores a given the user in the local storage, replacing the previous user, if any
  * @param {string} user the user to be stored
  */
  storeUser(user: string) {
    localStorage.removeItem(this.USER_STORAGE_NAME);
    localStorage.setItem(this.USER_STORAGE_NAME, JSON.stringify(user));
  }

  /**
  * Stores the user allowed_actions in the local storage, replacing the previous allowed_actions, if any
  * @param {string} permission the user allowed_actions to be stored
  */
  storeAllowedActions(allowed_actions: Object) {
    this.removeAllowedActions();
    localStorage.setItem(this.ACTIONS_STORAGE_NAME, JSON.stringify(allowed_actions));
  }

}
