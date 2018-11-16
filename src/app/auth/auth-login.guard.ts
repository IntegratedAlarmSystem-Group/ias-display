import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginGuard implements CanActivate {

  /**
  * Stream of notifications when the user logs in. Sends true, if the user is logged in, and false if not
  */
  public loginStatusStream = new BehaviorSubject<boolean>(false);

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('Executing AuthLoginGuard.canActivate()');
    const url: string = state.url;
    const loginStatus = this.checkLogin(url);
    this.loginStatusStream.next(loginStatus);
    return loginStatus;
  }

  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }
}
