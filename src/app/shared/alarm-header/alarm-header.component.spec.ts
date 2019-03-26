import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlarmHeaderComponent } from './alarm-header.component';
import { AlarmLabelComponent } from '../alarm-label/alarm-label.component';
import { AlarmTooltipComponent } from '../alarm-tooltip/alarm-tooltip.component';
import { AlarmBlinkComponent } from '../alarm-blink/alarm-blink.component';
import { PropsTableComponent } from '../props-table/props-table.component';
import { Alarm } from '../../data/alarm';
import { MockAlarms } from './fixtures';

const expected_classes = {
  'critical': ['red'],
  'high': ['red'],
  'medium': ['yellow'],
  'low': ['yellow'],
  'clear': ['green'],
  'unknown': ['blue'],
  'maintenance': ['gray'],
  'shutteddown': ['gray'],
  'malfunctioning': ['gray'],
  'critical_unreliable': ['red', 'unreliable'],
  'high_unreliable': ['red', 'unreliable'],
  'medium_unreliable': ['yellow', 'unreliable'],
  'low_unreliable': ['yellow', 'unreliable'],
  'clear_unreliable': ['green', 'unreliable'],
  'unknown_unreliable': ['blue', 'unreliable'],
  'maintenance_unreliable': ['gray', 'unreliable'],
  'shutteddown_unreliable': ['gray', 'unreliable'],
  'malfunctioning_unreliable': ['gray', 'unreliable'],
  'shelved': ['green'],
  'shelved_unreliable': ['green', 'unreliable'],
};

describe('AlarmHeaderComponent', () => {
  let hostComponent: TestHostComponent;
  let component: AlarmHeaderComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AlarmHeaderComponent,
        AlarmLabelComponent,
        AlarmTooltipComponent,
        AlarmBlinkComponent,
        TestHostComponent,
        PropsTableComponent
      ],
      imports: [ NgbModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    const mockAlarm = Alarm.asAlarm(MockAlarms[0]);
    hostComponent = fixture.componentInstance;
    hostComponent.alarm = mockAlarm;
    component = fixture
      .debugElement.query(By.directive(AlarmHeaderComponent))
      .componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    hostComponent.alarm = Alarm.asAlarm(MockAlarms[0]);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display the color of the alarms according to each alarm properties', () => {
    for (const alarm of MockAlarms) {
      hostComponent.alarm = Alarm.asAlarm(alarm);
      fixture.detectChanges();
      expect(component).toBeTruthy();
      expect(component.getClass()).toContain(expected_classes[alarm.core_id][0]);
    }
  });

  it('should display the shelved alarms accordingly', () => {
    for (const alarm of MockAlarms) {
      hostComponent.alarm = Alarm.asAlarm(alarm);
      hostComponent.alarm.shelve();
      fixture.detectChanges();
      expect(component).toBeTruthy();
      if (hostComponent.alarm.validity) {
        expect(component.getClass()).toContain(expected_classes['shelved'][0]);
      } else {
        expect(component.getClass()).toContain(expected_classes['shelved'][0]);
      }
    }
  });

  describe('should have an attribute to determine if the alarm must be shown as acknoledged or not', () => {
    it('based on the alarm ack value when the showActionBadges is true (by default)', () => {
      let newAlarm = Alarm.asAlarm(Object.assign({}, component.alarm));
      newAlarm.ack = true;
      hostComponent.alarm = newAlarm;
      fixture.detectChanges();
      expect(component.showAsPendingAck).toEqual(false);
      newAlarm = Alarm.asAlarm(Object.assign({}, component.alarm));
      newAlarm.ack = false;
      hostComponent.alarm = newAlarm;
      fixture.detectChanges();
      expect(component.showAsPendingAck).toEqual(true);
    });

    it('that if false when the showActionBadges is set to false', () => {
      let newAlarm = Alarm.asAlarm(Object.assign({}, component.alarm));
      newAlarm.ack = false;
      newAlarm.state_change_timestamp = 0;
      hostComponent.alarm = newAlarm;
      fixture.detectChanges();
      expect(component.showAsPendingAck).toEqual(false);
      newAlarm = Alarm.asAlarm(Object.assign({}, component.alarm));
      newAlarm.ack = false;
      newAlarm.state_change_timestamp = 1231231;
      hostComponent.alarm = newAlarm;
      fixture.detectChanges();
      expect(component.showAsPendingAck).toEqual(true);
    });
  });

  describe('should have an attribute to determine if the alarm must be shown as shelved or not', () => {
    it('based on the alarm shelved value when the showActionBadges is true (by default)', () => {
      let newAlarm = Alarm.asAlarm(Object.assign({}, component.alarm));
      newAlarm.shelved = false;
      hostComponent.alarm = newAlarm;
      fixture.detectChanges();
      expect(component.showAsShelved).toEqual(false);
      newAlarm = Alarm.asAlarm(Object.assign({}, component.alarm));
      newAlarm.shelved = true;
      hostComponent.alarm = newAlarm;
      fixture.detectChanges();
      expect(component.showAsShelved).toEqual(true);
    });

    it('that return false when the showActionBadges is set to false', () => {
      component.showActionBadges = false;
      let newAlarm = Alarm.asAlarm(Object.assign({}, component.alarm));
      newAlarm.shelved = false;
      hostComponent.alarm = newAlarm;
      fixture.detectChanges();
      expect(component.showAsShelved).toEqual(false);
      newAlarm = Alarm.asAlarm(Object.assign({}, component.alarm));
      newAlarm.shelved = true;
      hostComponent.alarm = newAlarm;
      fixture.detectChanges();
      expect(component.showAsShelved).toEqual(false);
    });
  });

  it('should show the action badges images when the showActionBadges is true (by default)', () => {
    hostComponent.alarm = Alarm.asAlarm(MockAlarms[0]);
    fixture.detectChanges();
    const badges = fixture.nativeElement.querySelector('.alarm-header-badges');
    const images = badges.querySelectorAll('img');
    expect(images.length).toEqual(2);
  });

  it('should not show the action badges images when the showActionBadges is false', () => {
    component.showActionBadges = false;
    hostComponent.alarm = Alarm.asAlarm(MockAlarms[0]);
    fixture.detectChanges();
    const badges = fixture.nativeElement.querySelector('.alarm-header-badges');
    const images = badges.querySelectorAll('img');
    expect(images.length).toEqual(0);
  });

  it('should turn on/off the badges according to the ack and shelve values', () => {
    hostComponent.alarm = Alarm.asAlarm(MockAlarms[0]);
    hostComponent.alarm.ack = true;
    hostComponent.alarm.shelved = false;
    fixture.detectChanges();
    let badges = fixture.nativeElement.querySelector('.badges');
    let images = badges.querySelectorAll('img');
    expect(images[0].className).toEqual('badge-icon ack-icon badge-off');
    expect(images[1].className).toEqual('badge-icon shelve-icon badge-off');

    hostComponent.alarm = Alarm.asAlarm(MockAlarms[0]);
    hostComponent.alarm.ack = false;
    hostComponent.alarm.shelved = false;
    fixture.detectChanges();
    badges = fixture.nativeElement.querySelector('.badges');
    images = badges.querySelectorAll('img');
    expect(images[0].className).toEqual('badge-icon ack-icon');
    expect(images[1].className).toEqual('badge-icon shelve-icon badge-off');

    hostComponent.alarm = Alarm.asAlarm(MockAlarms[0]);
    hostComponent.alarm.ack = false;
    hostComponent.alarm.shelved = true;
    fixture.detectChanges();
    badges = fixture.nativeElement.querySelector('.badges');
    images = badges.querySelectorAll('img');
    expect(images[0].className).toEqual('badge-icon ack-icon');
    expect(images[1].className).toEqual('badge-icon shelve-icon');

    hostComponent.alarm = Alarm.asAlarm(MockAlarms[0]);
    hostComponent.alarm.ack = true;
    hostComponent.alarm.shelved = true;
    fixture.detectChanges();
    badges = fixture.nativeElement.querySelector('.badges');
    images = badges.querySelectorAll('img');
    expect(images[0].className).toEqual('badge-icon ack-icon badge-off');
    expect(images[1].className).toEqual('badge-icon shelve-icon');
  });
});

/**
 * Mock host component for the alarm tile to check behaviour on change
 */
@Component({
  selector: 'app-host',
  template: `
    <app-alarm-header
      [alarm]="this.alarm"
    ></app-alarm-header>
  `,
})
class TestHostComponent {
  alarm: Alarm;
}
