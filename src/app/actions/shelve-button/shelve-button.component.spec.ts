import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IasMaterialModule } from '../../ias-material/ias-material.module';
import { DataModule } from '../../data/data.module';
import { RoutingService } from '../../app-routing/routing.service';
import { SidenavService } from '../sidenav.service';
import { ShelveButtonComponent } from './shelve-button.component';
import { Alarm } from '../../data/alarm';

describe('GIVEN a ShelveButtonComponent', () => {
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let component: ShelveButtonComponent;
  let debug: DebugElement;
  const spyRoutingTable = jasmine.createSpyObj('RoutingService', ['goToShelve']);
  const mockAlarm = Alarm.asAlarm({
    'value': 4,
    'core_id': 'coreid$1',
    'running_id': 'coreid$1',
    'mode': 5,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'value_change_timestamp': 0,
    'value_change_transition': [0, 4],
    'validity': 1,
    'description': 'my description',
    'url': 'https://www.alma.cl',
    'sound': 'NONE',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ShelveButtonComponent,
        TestHostComponent
      ],
      imports: [
        IasMaterialModule,
        DataModule,
      ],
      providers: [
        SidenavService,
        { provide: RoutingService, useValue: spyRoutingTable },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    hostComponent = fixture.componentInstance;
    hostComponent.alarm = mockAlarm;
    debug = fixture.debugElement;
    component = fixture
      .debugElement.query(By.directive(ShelveButtonComponent))
      .componentInstance;
    fixture.detectChanges();
  });

  it('THEN it should be created with the given Alarm', () => {
    expect(component).toBeTruthy();
    expect(component.alarm.core_id).toBe('coreid$1');
  });

  describe('AND WHEN the Alarm is unshelved', () => {
    it('THEN its tooltip should be "Shelve"', () => {
      hostComponent.alarm = Alarm.asAlarm(hostComponent.alarm);
      hostComponent.alarm.shelved = false;
      const shelveButton = debug.query(By.css('.shelve-button')).nativeElement;
      fixture.detectChanges();
      expect(component).toBeTruthy();
      expect(component.alarm.core_id).toBe('coreid$1');
      expect(shelveButton.title).toEqual('Shelve');
    });
  });

  describe('AND WHEN the Alarm is shelved', () => {
    it('THEN its tooltip should be "Unshelve"', () => {
      hostComponent.alarm = Alarm.asAlarm(hostComponent.alarm);
      hostComponent.alarm.shelve();
      const shelveButton = debug.query(By.css('.shelve-button')).nativeElement;
      fixture.detectChanges();
      expect(component).toBeTruthy();
      expect(component.alarm.core_id).toBe('coreid$1');
      expect(shelveButton.title).toEqual('Unshelve');
    });
  });

  describe('AND WHEN the user clicks on it', () => {
    it('THEN the sidenav is opened with ShelveComponent as content', () => {
      component.onClick();
      const expectedargs = component.alarm.core_id;
      expect(spyRoutingTable.goToShelve.calls.count()).toBe(1, 'spy method was called once');
      expect(spyRoutingTable.goToShelve.calls.mostRecent().args[0]).
        toEqual(expectedargs, 'spy method was called with the right parameters');
    });
  });
});

/**
 * Mock host component for the alarm tile to check behaviour on change
 */
@Component({
  selector: 'app-host',
  template: `
    <app-shelve-button
      [alarm]="this.alarm"
    ></app-shelve-button>
  `,
})
class TestHostComponent {
  alarm: Alarm;
}
