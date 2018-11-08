import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private _isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  hasValidToken(): Observable<boolean> {
    console.log('Executing AuthService.hasValidToken()');
    return of(false);
  }

  isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  login(): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
      tap(val => this._isLoggedIn = true)
    );
  }

  logout(): void {
    this._isLoggedIn = false;
  }

}
