import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppModule } from '../app.module';
import { appRoutes } from '../app-routing/app-routing.module';
import { RoutingService } from './routing.service';
import { AuthLoginGuard } from '../auth/auth-login.guard';


describe('GIVEN the RoutingService', () => {
  let location: Location;
  let router: Router;
  let subject;
  let authGuard: AuthLoginGuard;
  const spyGuard = jasmine.createSpyObj('AuthLoginGuard', {'canActivate': true});

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(appRoutes),
        AppModule,
      ],
      providers: [
        RoutingService,
        // { provide: AuthLoginGuard, useValue: spyGuard },
        AuthLoginGuard
      ]
    });
    router = TestBed.get(Router);
    location = TestBed.get(Location);
  });

  beforeEach(inject([RoutingService, AuthLoginGuard], (routingService, authLoginGuard) => {
      subject = routingService;
      authGuard = authLoginGuard;
  }));

  it('THEN, it should be created', () => {
    expect(subject).toBeTruthy();
  });

  describe('IF we are logged in', () => {

    const canActivateValue = true;

    it('WHEN we navigate to "login", THEN it should redirect to /login', fakeAsync(() => {
      spyOn(authGuard, 'checkLogin').and.returnValue(canActivateValue);
      router.navigate(['/login']);
      tick(1);
      expect(location.path()).toBe('/login');
    }));

    it('WHEN we navigate to "", THEN it should redirect to /overview', fakeAsync(() => {
      spyOn(authGuard, 'checkLogin').and.returnValue(canActivateValue);
      router.navigate(['']);
      tick(1);
      expect(location.path()).toBe('/overview');
    }));

    it('WHEN we navigate to /overview, THEN it should go to /overview', fakeAsync(() => {
      spyOn(authGuard, 'checkLogin').and.returnValue(canActivateValue);
      router.navigate(['/overview']);
      tick(1);
      expect(location.path()).toBe('/overview');
    }));

    it('WHEN we navigate to /tabular, THEN it should go to /tabular', fakeAsync(() => {
      spyOn(authGuard, 'checkLogin').and.returnValue(canActivateValue);
      router.navigate(['/tabular']);
      tick(1);
      expect(location.path()).toBe('/tabular');
    }));

    it('WHEN we navigate to /weather, THEN it should go to /weather', fakeAsync(() => {
      spyOn(authGuard, 'checkLogin').and.returnValue(canActivateValue);
      router.navigate(['/weather']);
      tick(1);
      expect(location.path()).toBe('/weather');
    }));

    it('WHEN we navigate to /antennas, THEN it should go to /antennas', fakeAsync(() => {
      spyOn(authGuard, 'checkLogin').and.returnValue(canActivateValue);
      router.navigate(['/antennas']);
      tick(1);
      expect(location.path()).toBe('/antennas');
    }));

    it('WHEN we call goToWeather, THEN it should go to /weather', fakeAsync(() => {
      spyOn(authGuard, 'checkLogin').and.returnValue(canActivateValue);
      subject.goToWeather();
      tick(1);
      expect(location.path()).toBe('/weather');
    }));

    it('WHEN we call goToAntennas, THEN it should go to /antennas', fakeAsync(() => {
      spyOn(authGuard, 'checkLogin').and.returnValue(canActivateValue);
      subject.goToAntennas();
      tick(1);
      expect(location.path()).toBe('/antennas');
    }));

    it('WHEN we call tableWithFilter, THEN it should go to /tabular', fakeAsync(() => {
      spyOn(authGuard, 'checkLogin').and.returnValue(canActivateValue);
      subject.tableWithFilter('');
      tick(1);
      expect(location.path()).toBe('/tabular');
    }));

    it('WHEN we call tableWithFilter with a "filter_value", THEN it should go to /tabular/filter_value', fakeAsync(() => {
      spyOn(authGuard, 'checkLogin').and.returnValue(canActivateValue);
      subject.tableWithFilter('filter_value');
      tick(1);
      expect(location.path()).toBe('/tabular/filter_value');
    }));
  });

  describe('IF we are NOT logged in', () => {

    const canActivateValue = false;

    it('WHEN we navigate to "login", THEN it should redirect to /login', fakeAsync(() => {
      spyOn(authGuard, 'checkLogin').and.returnValue(canActivateValue);
      router.navigate(['/login']);
      tick(1);
      expect(location.path()).toBe('/login');
    }));

    it('WHEN we navigate to "", THEN it should redirect to /login', fakeAsync(() => {
      spyOn(authGuard, 'checkLogin').and.returnValue(canActivateValue);
      router.navigate(['']);
      tick(1);
      expect(location.path()).toBe('');
    }));

    it('WHEN we navigate to /overview, THEN it should go to /login', fakeAsync(() => {
      spyOn(authGuard, 'checkLogin').and.returnValue(canActivateValue);
      router.navigate(['/overview']);
      tick(1);
      expect(location.path()).toBe('');
    }));

    it('WHEN we navigate to /tabular, THEN it should go to /login', fakeAsync(() => {
      spyOn(authGuard, 'checkLogin').and.returnValue(canActivateValue);
      router.navigate(['/tabular']);
      tick(1);
      expect(location.path()).toBe('');
    }));

    it('WHEN we navigate to /weather, THEN it should go to /login', fakeAsync(() => {
      spyOn(authGuard, 'checkLogin').and.returnValue(canActivateValue);
      router.navigate(['/weather']);
      tick(1);
      expect(location.path()).toBe('');
    }));

    it('WHEN we navigate to /antennas, THEN it should go to /login', fakeAsync(() => {
      spyOn(authGuard, 'checkLogin').and.returnValue(canActivateValue);
      router.navigate(['/antennas']);
      tick(1);
      expect(location.path()).toBe('');
    }));

    it('WHEN we call goToWeather, THEN it should go to /login', fakeAsync(() => {
      spyOn(authGuard, 'checkLogin').and.returnValue(canActivateValue);
      subject.goToWeather();
      tick(1);
      expect(location.path()).toBe('');
    }));

    it('WHEN we call goToAntennas, THEN it should go to /login', fakeAsync(() => {
      spyOn(authGuard, 'checkLogin').and.returnValue(canActivateValue);
      subject.goToAntennas();
      tick(1);
      expect(location.path()).toBe('');
    }));

    it('WHEN we call tableWithFilter, THEN it should go to /login', fakeAsync(() => {
      spyOn(authGuard, 'checkLogin').and.returnValue(canActivateValue);
      subject.tableWithFilter('');
      tick(1);
      expect(location.path()).toBe('');
    }));

    it('WHEN we call tableWithFilter with a "filter_value", THEN it should go to /login', fakeAsync(() => {
      spyOn(authGuard, 'checkLogin').and.returnValue(canActivateValue);
      subject.tableWithFilter('filter_value');
      tick(1);
      expect(location.path()).toBe('');
    }));
  });
});
