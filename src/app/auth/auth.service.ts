import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn = false;

  hasValidToken(): Observable<boolean> {
    console.log('Executing AuthService.hasValidToken()');
    return of(false);
  }

}
