import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { tap, delay } from 'rxjs/operators';
import { SidenavService } from '../actions/sidenav.service';
import { BackendUrls } from '../settings';
import { environment } from '../../environments/environment';


/**
* Service used to request and handle tokens and authorization
*/
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  /**
  * Stream of notifications when the user logs in. Sends true, if the user is logged in, and false if not
  */
  public loginStatusStream = new BehaviorSubject<boolean>(false);

  /**
   * Builds an instance of the service
   * @param {HttpClient} http Angular HttpClient used to request the token for authentication
   */
  constructor(
    private http: HttpClient
    // private sidenavService: SidenavService
  ) { }


  /**
   * Checks wether or not the user is logged-in, which is true if there is a valid token
   * @returns {boolean} true if there is a valid token, false if not
   */
  isLoggedIn(): boolean {
    if (this.getToken()) {
      return true;
    } else {
      return false;
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
      const token = response['token'];
      if (token) {
        this.storeToken(token);
        this.storeUser(username);
        this.loginStatusStream.next(true);
        return true;
      } else {
        this.loginStatusStream.next(false);
        return false;
      }
    }));
  }

  /**
   * Logs out of the server by deleting the token from the local storage
   */
  logout(): void {
    // this.sidenavService.close();
    this.loginStatusStream.next(false);
    this.removeToken();
    this.removeUser();
  }

  /**
  * Returns the token stored in the local storage
  * @returns {string | undefined} the token as a string, or undefined if there is no token
  */
  getToken(): string | undefined {
    const token = localStorage.getItem('token');
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
    const user = localStorage.getItem('user');
    if (user === null) {
      return undefined;
    } else {
      return JSON.parse(user);
    }
  }

  /**
  * Deletes the token from the local storage
  */
  removeToken() {
    localStorage.removeItem('token');
  }

  /**
  * Deletes the user from the local storage
  */
  removeUser() {
    localStorage.removeItem('user');
  }

  /**
  * Stores a given the token in the local storage, replacing the previous token, if any
  * @param {string} token the token to be stored
  */
  storeToken(token: string) {
    localStorage.removeItem('token');
    localStorage.setItem('token', JSON.stringify(token));
  }

  /**
  * Stores a given the user in the local storage, replacing the previous user, if any
  * @param {string} user the user to be stored
  */
  storeUser(user: string) {
    localStorage.removeItem('user');
    localStorage.setItem('user', JSON.stringify(user));
  }


}
