import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IasMaterialModule } from '../../ias-material/ias-material.module';
import { DataModule } from '../../data/data.module';
import { RoutingService } from '../../app-routing/routing.service';
import { SidenavService } from '../sidenav.service';
import { AckButtonComponent } from './ack-button.component';
import { Alarm } from '../../data/alarm';


describe('GIVEN an AckButtonComponent', () => {
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let component: AckButtonComponent;
  let button: any;
  const spyRoutingTable = jasmine.createSpyObj('RoutingService', ['goToAcknowledge']);
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
        AckButtonComponent,
        TestHostComponent
      ],
      imports: [
        IasMaterialModule,
        DataModule,
      ],
      providers: [
        SidenavService,
        { provide: RoutingService, useValue: spyRoutingTable }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    hostComponent = fixture.componentInstance;
    hostComponent.alarm = mockAlarm;
    component = fixture
      .debugElement.query(By.directive(AckButtonComponent))
      .componentInstance;
    fixture.detectChanges();
  });

  it('THEN it should be created with the given Alarm', () => {
    expect(component).toBeTruthy();
    expect(component.alarm.core_id).toBe('coreid$1');
  });

  describe('AND IF the alarm is not-acknowledged', () => {
    it('THEN button should be enabled', () => {
      hostComponent.alarm = Alarm.asAlarm(hostComponent.alarm);
      hostComponent.alarm.ack = false;
      hostComponent.alarm.state_change_timestamp = 1267252440000;
      fixture.detectChanges();
      button = fixture.nativeElement.querySelector('.ack-button');
      expect(button.disabled).toBeFalsy();
    });
  });

  describe('AND IF the alarm is acknowledged', () => {
    it('THEN button should be disabled', () => {
      hostComponent.alarm = Alarm.asAlarm(hostComponent.alarm);
      hostComponent.alarm.ack = true;
      hostComponent.alarm.state_change_timestamp = 1267252440000;
      fixture.detectChanges();
      button = fixture.nativeElement.querySelector('.ack-button');
      expect(button.disabled).toBeTruthy();
    });
  });

  describe('AND IF the alarm is not-acknowledged, but the state_change_timestamp is 0', () => {
    it('THEN button should be disabled', () => {
      hostComponent.alarm = Alarm.asAlarm(hostComponent.alarm);
      hostComponent.alarm.ack = false;
      hostComponent.alarm.state_change_timestamp = 0;
      fixture.detectChanges();
      button = fixture.nativeElement.querySelector('.ack-button');
      expect(button.disabled).toBeTruthy();
    });
  });

  describe('AND WHEN the user clicks on it', () => {
    it('THEN the sidenav is opened with the AcknowledgeComponent as content', () => {
      component.onClick();
      const expectedargs = component.alarm.core_id;
      expect(spyRoutingTable.goToAcknowledge.calls.count()).toBe(1, 'spy method was called once');
      expect(spyRoutingTable.goToAcknowledge.calls.mostRecent().args[0]).
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
    <app-ack-button
      [alarm]="this.alarm"
    ></app-ack-button>
  `,
})
class TestHostComponent {
  alarm: Alarm;
}
