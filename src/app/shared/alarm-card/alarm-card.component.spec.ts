import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlarmCardComponent } from './alarm-card.component';
import { AlarmLabelComponent } from '../alarm-label/alarm-label.component';
import { AlarmTooltipComponent } from '../alarm-tooltip/alarm-tooltip.component';
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
  let component: AlarmCardComponent;
  let fixture: ComponentFixture<AlarmCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AlarmCardComponent,  AlarmTooltipComponent, AlarmLabelComponent, PropsTableComponent],
      imports: [ NgbModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.alarm = Alarm.asAlarm(MockAlarms[0]);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display a text with the name of the alarm', () => {
    component.alarm = Alarm.asAlarm(MockAlarms[0]);
    fixture.detectChanges();
    const content = fixture.nativeElement.querySelector(
      '.alarm-card-content > .alarm-name');
    expect(content.innerHTML).toEqual('critical');
  });

  it('should display a shortened text for a long name of the alarm', () => {
    component.alarm = Alarm.asAlarm(MockAlarms[17]);
    fixture.detectChanges();
    const content = fixture.nativeElement.querySelector(
      '.alarm-card-content > .alarm-name');
    expect(content.innerHTML).toEqual('malfunctioning_un...');
  });

  it('should display the color of the alarms according to each alarm properties', () => {
    for (const alarm of MockAlarms) {
      component.alarm = Alarm.asAlarm(alarm);
      fixture.detectChanges();
      expect(component).toBeTruthy();
      expect(component.getClass()).toEqual(expected_classes[alarm.core_id]);
    }
  });

  it('should display the shelved alarms accordingly', () => {
    for (const alarm of MockAlarms) {
      component.alarm = Alarm.asAlarm(alarm);
      component.alarm.shelve();
      fixture.detectChanges();
      expect(component).toBeTruthy();
      if (component.alarm.validity) {
        expect(component.getClass()).toEqual(expected_classes['shelved']);
      } else {
        expect(component.getClass()).toEqual(expected_classes['shelved']);
      }
    }
  });

  describe('should have a method to determine if the alarm must be shown as acknoledged or not', () => {
    it('based on the alarm ack value when the showActionBadges is true (by default)', () => {
      component.alarm = Alarm.asAlarm(MockAlarms[0]);
      component.alarm.ack = true;
      expect(component.showAsPendingAck()).toEqual(false);
      component.alarm.ack = false;
      expect(component.showAsPendingAck()).toEqual(true);
    });

    it('that return false when the showActionBadges is set to false', () => {
      component.showActionBadges = false;
      component.alarm = Alarm.asAlarm(MockAlarms[0]);
      component.alarm.ack = true;
      expect(component.showAsPendingAck()).toEqual(false);
      component.alarm.ack = false;
      expect(component.showAsPendingAck()).toEqual(false);
    });
  });

  describe('should have a method to determine if the alarm must be shown as shelved or not', () => {
    it('based on the alarm shelved value when the showActionBadges is true (by default)', () => {
      component.alarm = Alarm.asAlarm(MockAlarms[0]);
      component.alarm.shelved = false;
      expect(component.showAsShelved()).toEqual(false);
      component.alarm.shelved = true;
      expect(component.showAsShelved()).toEqual(true);
    });

    it('that return false when the showActionBadges is set to false', () => {
      component.showActionBadges = false;
      component.alarm = Alarm.asAlarm(MockAlarms[0]);
      component.alarm.shelved = false;
      expect(component.showAsShelved()).toEqual(false);
      component.alarm.shelved = true;
      expect(component.showAsShelved()).toEqual(false);
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
    component.alarm = Alarm.asAlarm(MockAlarms[0]);
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
