import { TestBed, async, inject } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';
import { DataModule } from '../data/data.module';
import { AuthLoginGuard } from './auth-login.guard';
import { AuthService } from './auth.service';

describe('AuthLoginGuard', () => {
  const spyRoutingTable = jasmine.createSpyObj('Router', ['navigate']);
  let guard: AuthLoginGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        DataModule
      ],
      providers: [
        AuthLoginGuard,
        AuthService,
        { provide: Router, useValue: spyRoutingTable },
      ]
    });
  });

  beforeEach(inject([AuthLoginGuard, AuthService, Router], (authGuard, authenticationService, angularRouter) => {
      guard = authGuard;
      authService = authenticationService;
      router = angularRouter;
  }));

  it('should create', () => {
    expect(guard).toBeTruthy();
  });

  describe('should have a checkLogin method that checks if the navigation can be activated', () => {
    it('and when it can be activated, it returns true', () => {
      // Arrange:
      spyOn(authService, 'hasValidToken').and.returnValue(of(true));
      // Act:
      guard.checkLogin('attemptedUrl').subscribe(
        (returnValue) => {
          // Assert:
          expect(returnValue).toBe(true);
          expect(authService.redirectUrl).toBeFalsy();
        }
      );
    });

    it('and when it cannot be activated, it returns false, stores the url and navigates to login', () => {
      // Arrange:
      spyOn(authService, 'hasValidToken').and.returnValue(of(false));
      // Act:
      guard.checkLogin('attemptedUrl').subscribe(
        (returnValue) => {
          // Assert:
          expect(returnValue).toBe(false);
          expect(authService.redirectUrl).toBe('attemptedUrl');
          expect(router.navigate).toHaveBeenCalledWith(['/login']);
        }
      );
    });
  });
});
