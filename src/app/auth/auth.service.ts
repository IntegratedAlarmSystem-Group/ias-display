import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { tap, delay } from 'rxjs/operators';
import { HttpClientService } from '../data/http-client.service';
import { BackendUrls } from '../settings';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(
    private httpClientService: HttpClientService,
  ) { }


  hasValidToken(): Observable<boolean> {
    console.log('Executing AuthService.hasValidToken()');
    return of(false);
  }

  isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  login(username: string, password: string): Observable<boolean> {
    return this.httpClientService.post(BackendUrls.TOKEN, {
      username: username,
      password: password
    }).pipe(map((response: any) => {
      const token = response['token'];
      if (token) {
        this.storeToken(token);
        this._isLoggedIn = true;
      } else {
        this._isLoggedIn = false;
      }
      return this._isLoggedIn;
    }));
  }

  // login(): Observable<boolean> {
  //   return of(true).pipe(
  //     delay(1000),
  //     tap(val => this._isLoggedIn = true)
  //   );
  // }

  logout(): void {
    this._isLoggedIn = false;
  }

  getToken(): string | undefined {
    const token = localStorage.getItem('token');
    if (token === null) {
      return undefined;
    } else {
      return JSON.parse(token);
    }
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  storeToken(token: string) {
    localStorage.removeItem('token');
    localStorage.setItem('token', JSON.stringify(token));
    console.log('Token stored: ', this.getToken());
  }


}
