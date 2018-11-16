import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

/**
* Guard that is used to verify if navigation should be allowed depending if there is a logged-in user.
*/
@Injectable({
  providedIn: 'root'
})
export class AuthLoginGuard implements CanActivate {

  /**
  * Builds an instance of the guard
  * @param {AuthService} authService service used to check and handle authorization
  * @param {Router} router Angular router used to navigate the application
  */
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  /**
  * Checks wether or not the navigation should be blocked or not, depending if a user is logged in the application
  * @param {ActivatedRouteSnapshot} next the next activated route
  * @param {RouterStateSnapshot} state the next state of router navigation, used to retrieve the url that is going to be navigated
  * @returns {boolean} true if navigation is permitted, false if not
  */
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('Executing AuthLoginGuard.canActivate()');
    const url: string = state.url;
    return this.checkLogin(url);
  }

  /**
  * Checks wether or not the user is logged in.
  * If false, navigates to login and saves the last url the user attempted to navigate, in order to be used after a succesfull login
  * @param {string} url the nexturl to be navigated
  * @returns {boolean} true if navigation is permitted, false if not
  */
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
