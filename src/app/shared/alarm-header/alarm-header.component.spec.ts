import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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
  let component: AlarmHeaderComponent;
  let fixture: ComponentFixture<AlarmHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AlarmHeaderComponent,
        AlarmLabelComponent,
        AlarmTooltipComponent,
        AlarmBlinkComponent,
        PropsTableComponent
      ],
      imports: [ NgbModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmHeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.alarm = Alarm.getMockAlarm(MockAlarms[0]);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display the color of the alarms according to each alarm properties', () => {
    for (const alarm of MockAlarms) {
      component.alarm = Alarm.getMockAlarm(alarm);
      fixture.detectChanges();
      expect(component).toBeTruthy();
      expect(component.getClass()).toContain(expected_classes[alarm.core_id][0]);
    }
  });

  it('should display the shelved alarms accordingly', () => {
    for (const alarm of MockAlarms) {
      component.alarm = Alarm.getMockAlarm(alarm);
      component.alarm.shelve();
      fixture.detectChanges();
      expect(component).toBeTruthy();
      if (component.alarm.validity) {
        expect(component.getClass()).toContain(expected_classes['shelved'][0]);
      } else {
        expect(component.getClass()).toContain(expected_classes['shelved'][0]);
      }
    }
  });

  describe('should have a method to determine if the alarm must be shown as acknoledged or not', () => {
    it('based on the alarm ack value when the showActionBadges is true (by default)', () => {
      component.alarm = Alarm.getMockAlarm(MockAlarms[0]);
      component.alarm.ack = true;
      expect(component.showAsPendingAck()).toEqual(false);
      component.alarm.ack = false;
      expect(component.showAsPendingAck()).toEqual(true);
    });

    it('that return false when the showActionBadges is set to false', () => {
      component.showActionBadges = false;
      component.alarm = Alarm.getMockAlarm(MockAlarms[0]);
      component.alarm.ack = true;
      expect(component.showAsPendingAck()).toEqual(false);
      component.alarm.ack = false;
      expect(component.showAsPendingAck()).toEqual(false);
    });
  });

  describe('should have a method to determine if the alarm must be shown as shelved or not', () => {
    it('based on the alarm shelved value when the showActionBadges is true (by default)', () => {
      component.alarm = Alarm.getMockAlarm(MockAlarms[0]);
      component.alarm.shelved = false;
      expect(component.showAsShelved()).toEqual(false);
      component.alarm.shelved = true;
      expect(component.showAsShelved()).toEqual(true);
    });

    it('that return false when the showActionBadges is set to false', () => {
      component.showActionBadges = false;
      component.alarm = Alarm.getMockAlarm(MockAlarms[0]);
      component.alarm.shelved = false;
      expect(component.showAsShelved()).toEqual(false);
      component.alarm.shelved = true;
      expect(component.showAsShelved()).toEqual(false);
    });
  });

  it('should show the action badges images when the showActionBadges is true (by default)', () => {
    component.alarm = Alarm.getMockAlarm(MockAlarms[0]);
    fixture.detectChanges();
    const badges = fixture.nativeElement.querySelector('.alarm-header-badges');
    const images = badges.querySelectorAll('img');
    expect(images.length).toEqual(2);
  });

  it('should not show the action badges images when the showActionBadges is false', () => {
    component.showActionBadges = false;
    component.alarm = Alarm.getMockAlarm(MockAlarms[0]);
    fixture.detectChanges();
    const badges = fixture.nativeElement.querySelector('.alarm-header-badges');
    const images = badges.querySelectorAll('img');
    expect(images.length).toEqual(0);
  });

  it('should turn on/off the badges according to the ack and shelve values', () => {
    component.alarm = Alarm.getMockAlarm(MockAlarms[0]);
    component.alarm.ack = true;
    component.alarm.shelved = false;
    fixture.detectChanges();
    let badges = fixture.nativeElement.querySelector('.badges');
    let images = badges.querySelectorAll('img');
    expect(images[0].className).toEqual('badge-icon ack-icon badge-off');
    expect(images[1].className).toEqual('badge-icon shelve-icon badge-off');

    component.alarm.ack = false;
    component.alarm.shelved = false;
    fixture.detectChanges();
    badges = fixture.nativeElement.querySelector('.badges');
    images = badges.querySelectorAll('img');
    expect(images[0].className).toEqual('badge-icon ack-icon');
    expect(images[1].className).toEqual('badge-icon shelve-icon badge-off');

    component.alarm.ack = false;
    component.alarm.shelved = true;
    fixture.detectChanges();
    badges = fixture.nativeElement.querySelector('.badges');
    images = badges.querySelectorAll('img');
    expect(images[0].className).toEqual('badge-icon ack-icon');
    expect(images[1].className).toEqual('badge-icon shelve-icon');

    component.alarm.ack = true;
    component.alarm.shelved = true;
    fixture.detectChanges();
    badges = fixture.nativeElement.querySelector('.badges');
    images = badges.querySelectorAll('img');
    expect(images[0].className).toEqual('badge-icon ack-icon badge-off');
    expect(images[1].className).toEqual('badge-icon shelve-icon');
  });

});
