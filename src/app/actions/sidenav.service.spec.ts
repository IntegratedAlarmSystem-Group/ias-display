import { TestBed, inject } from '@angular/core/testing';
import { RoutingService } from '../app-routing/routing.service';
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
    subject.lastAlarmId = 'otherAlarmId';
  }));

  it('should be created', () => {
    expect(subject).toBeTruthy();
  });

  it('goToShelve should call routingService.goToShelve and not send true in the shouldReload if called from a different button', () => {
    const old_calls = spyRoutingService.goToShelve.calls.count();
    subject.goToShelve(mockAlarmId);
    expect(spyRoutingService.goToShelve.calls.count()).toEqual(old_calls + 1, 'spy method was called once');
    expect(spyRoutingService.goToShelve.calls.mostRecent().args[0]).
      toEqual(mockAlarmId, 'spy method was called with the right parameters');
    subject.shouldReload.subscribe((value) => {
      expect(value).toEqual(false);
    });
  });

  it('goToShelve should call routingService.goToShelve and send true in the shouldReload if called from a different button', () => {
    const old_calls = spyRoutingService.goToShelve.calls.count();
    subject.lastAlarmId = mockAlarmId;
    subject.goToShelve(mockAlarmId);
    expect(spyRoutingService.goToShelve.calls.count()).toEqual(old_calls + 1, 'spy method was called once');
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
