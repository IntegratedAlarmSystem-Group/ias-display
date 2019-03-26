import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlarmCardComponent } from './alarm-card.component';
import { AlarmLabelComponent } from '../alarm-label/alarm-label.component';
import { AlarmTooltipComponent } from '../alarm-tooltip/alarm-tooltip.component';
import { AlarmBlinkComponent } from '../alarm-blink/alarm-blink.component';
import { PropsTableComponent } from '../props-table/props-table.component';
import { Alarm } from '../../data/alarm';
import { MockAlarms } from './fixtures';

const expected_classes = {
  'critical': ['alarm-card-red'],
  'high': ['alarm-card-red'],
  'medium': ['alarm-card-yellow'],
  'low': ['alarm-card-yellow'],
  'clear': ['alarm-card-green'],
  'unknown': ['alarm-card-blue'],
  'maintenance': ['alarm-card-gray'],
  'shutteddown': ['alarm-card-gray'],
  'malfunctioning': ['alarm-card-gray'],
  'critical_unreliable': ['alarm-card-red', 'alarm-card-unreliable'],
  'high_unreliable': ['alarm-card-red', 'alarm-card-unreliable'],
  'medium_unreliable': ['alarm-card-yellow', 'alarm-card-unreliable'],
  'low_unreliable': ['alarm-card-yellow', 'alarm-card-unreliable'],
  'clear_unreliable': ['alarm-card-green', 'alarm-card-unreliable'],
  'unknown_unreliable': ['alarm-card-blue', 'alarm-card-unreliable'],
  'maintenance_unreliable': ['alarm-card-gray', 'alarm-card-unreliable'],
  'shutteddown_unreliable': ['alarm-card-gray', 'alarm-card-unreliable'],
  'malfunctioning_unreliable': ['alarm-card-gray', 'alarm-card-unreliable'],
  'shelved': ['alarm-card-green'],
  'shelved_unreliable': ['alarm-card-green', 'alarm-card-unreliable'],
};

describe('AlarmCardComponent', () => {
  let hostComponent: TestHostComponent;
  let component: AlarmCardComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AlarmCardComponent,
        AlarmTooltipComponent,
        AlarmLabelComponent,
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
      .debugElement.query(By.directive(AlarmCardComponent))
      .componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    hostComponent.alarm = Alarm.asAlarm(MockAlarms[0]);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display a text with the name of the alarm', () => {
    hostComponent.alarm = Alarm.asAlarm(MockAlarms[0]);
    fixture.detectChanges();
    const content = fixture.nativeElement.querySelector(
      '.alarm-card-content > .alarm-name');
    expect(content.innerHTML).toEqual('critical');
  });

  it('should display a shortened text for a long name of the alarm', () => {
    hostComponent.alarm = Alarm.asAlarm(MockAlarms[17]);
    fixture.detectChanges();
    const content = fixture.nativeElement.querySelector(
      '.alarm-card-content > .alarm-name');
    expect(content.innerHTML).toEqual('malfunctioning_un...');
  });

  it('should display the color of the alarms according to each alarm properties', () => {
    for (const alarm of MockAlarms) {
      hostComponent.alarm = Alarm.asAlarm(alarm);
      fixture.detectChanges();
      expect(component).toBeTruthy();
      expect(component.getClass()).toEqual(expected_classes[alarm.core_id]);
    }
  });

  it('should display the shelved alarms accordingly', () => {
    for (const alarm of MockAlarms) {
      hostComponent.alarm = Alarm.asAlarm(alarm);
      hostComponent.alarm.shelve();
      fixture.detectChanges();
      expect(component).toBeTruthy();
      if (component.alarm.validity) {
        expect(component.getClass()).toEqual(expected_classes['shelved']);
      } else {
        expect(component.getClass()).toEqual(expected_classes['shelved']);
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
    component.alarm = Alarm.asAlarm(MockAlarms[0]);
    fixture.detectChanges();
    const badges = fixture.nativeElement.querySelector('.alarm-card-badges');
    const images = badges.querySelectorAll('img');
    expect(images.length).toEqual(2);
  });

  it('should not show the action badges images when the showActionBadges is false', () => {
    component.showActionBadges = false;
    component.alarm = Alarm.asAlarm(MockAlarms[0]);
    fixture.detectChanges();
    const badges = fixture.nativeElement.querySelector('.alarm-card-badges');
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
    <app-alarm-card
      [alarm]="this.alarm"
    ></app-alarm-card>
  `,
})
class TestHostComponent {
  alarm: Alarm;
}
