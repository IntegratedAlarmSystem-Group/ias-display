import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppModule, appRoutes } from '../app.module';
import { RoutingService } from './routing.service';


describe('GIVEN the RoutingService', () => {
  let location: Location;
  let router: Router;
  let subject;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(appRoutes),
        AppModule,
      ],
      providers: [
        RoutingService,
      ]
    });
    router = TestBed.get(Router);
    location = TestBed.get(Location);
  });

  beforeEach(inject([RoutingService], (routingService) => {
      subject = routingService;
  }));

  it('THEN, it should be created', () => {
    expect(subject).toBeTruthy();
  });

  it('WHEN we navigate to "", THEN it should redirect to /overview', fakeAsync(() => {
    router.navigate(['']);
    tick(1);
    expect(location.path()).toBe('/overview');
  }));

  it('WHEN we navigate to /overview, THEN it should go to /overview', fakeAsync(() => {
    router.navigate(['/overview']);
    tick(1);
    expect(location.path()).toBe('/overview');
  }));

  it('WHEN we navigate to /tabular, THEN it should go to /tabular', fakeAsync(() => {
    router.navigate(['/tabular']);
    tick(1);
    expect(location.path()).toBe('/tabular');
  }));

  it('WHEN we navigate to /modal, THEN it should go to /modal', fakeAsync(() => {
    router.navigate(['/modal']);
    tick(1);
    expect(location.path()).toBe('/modal');
  }));

  it('WHEN we call tableWithFilter, THEN it should go to /tabular', fakeAsync(() => {
    subject.tableWithFilter('');
    tick(1);
    expect(location.path()).toBe('/tabular');
  }));

  it('WHEN we call tableWithFilter with a "filter_value", THEN it should go to /tabular/filter_value', fakeAsync(() => {
    subject.tableWithFilter('filter_value');
    tick(1);
    expect(location.path()).toBe('/tabular/filter_value');
  }));
});
