import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginGuard implements CanActivate {

  constructor(private authService: AuthService) { }

  canActivate() {
    console.log('Executing AuthLoginGuard.canActivate()');
    return this.authService.hasValidToken().pipe(map(ok => {
        if (ok) {
          return true;
        } else {
          // this.router.navigate(['/login']);
          return false;
        }
      }
    ));

  }
}
