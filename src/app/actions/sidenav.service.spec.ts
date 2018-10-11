import { TestBed, inject } from '@angular/core/testing';
import { RoutingService } from '../data/routing.service';
import { SidenavService } from './sidenav.service';

describe('SidenavService', () => {
  const spyRoutingService = jasmine.createSpyObj('RoutingService', ['cleanActionOutlet', 'goToShelve', 'goToAcknowledge']);
  let subject: SidenavService;
  const mockAlarmId = 'mockAlarmID';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SidenavService,
        { provide: RoutingService, useValue: spyRoutingService }
      ],
    });
  });

  beforeEach(inject([SidenavService], (service: SidenavService) => {
    subject = service;
  }));

  it('should be created', () => {
    expect(subject).toBeTruthy();
  });

  it('goToShelve() should call routingService.goToShelve() and throw a true in the shouldReload BehaviorSubject', () => {
    subject.goToShelve(mockAlarmId);
    expect(spyRoutingService.goToShelve.calls.count()).toBe(1, 'spy method was called once');
    expect(spyRoutingService.goToShelve.calls.mostRecent().args[0]).
      toEqual(mockAlarmId, 'spy method was called with the right parameters');
    subject.shouldReload.subscribe((value) => {
      expect(value).toEqual(true);
    });
  });

  it('goToAcknowledge() should call routingService.goToAcknowledge()', () => {
    subject.goToAcknowledge(mockAlarmId);
    expect(spyRoutingService.goToAcknowledge.calls.count()).toBe(1, 'spy method was called once');
    expect(spyRoutingService.goToAcknowledge.calls.mostRecent().args[0]).
      toEqual(mockAlarmId, 'spy method was called with the right parameters');
  });

});
