import { TestBed, inject } from '@angular/core/testing';
import { RoutingService } from '../data/routing.service';
import { SidenavService } from './sidenav.service';

describe('SidenavService', () => {
  const spyRoutingService = jasmine.createSpyObj('RoutingService', ['cleanActionOutlet']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SidenavService,
        { provide: RoutingService, useValue: spyRoutingService }
      ],
    });
  });

  it('should be created', inject([SidenavService], (service: SidenavService) => {
    expect(service).toBeTruthy();
  }));
});
