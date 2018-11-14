import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { tap, delay } from 'rxjs/operators';
import { BackendUrls } from '../settings';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(
    private http: HttpClient,
  ) { }


  hasValidToken(): Observable<boolean> {
    return of(false);
  }

  isLoggedIn(): boolean {
    if (this.getToken()) {
      return true;
    } else {
      return false;
    }
  }

  login(username: string, password: string): Observable<boolean> {
    const url = `${environment.httpUrl}${BackendUrls.TOKEN}`;
    return this.http.post(url, {
      username: username,
      password: password
    }).pipe(map((response: any) => {
      const token = response['token'];
      if (token) {
        this.storeToken(token);
        return true;
      } else {
        return false;
      }
    }));
  }

  logout(): void {
    this.removeToken();
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
  }


}
