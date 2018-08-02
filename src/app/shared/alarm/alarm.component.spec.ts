import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AlarmComponent, AlarmImageSet } from './alarm.component';
import { Alarm, Value, OperationalMode } from '../../data/alarm';
import { MockAlarms, MockImageSet, MockImageUnreliableSet } from './fixtures';

describe('AlarmComponent', () => {
  let component: AlarmComponent;
  let fixture: ComponentFixture<AlarmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.alarm = Alarm.asAlarm(MockAlarms[0]);
    component.images = MockImageSet;
    component.imagesUnreliable = MockImageUnreliableSet;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display the icon according to the alarm properties ', () => {
    for (const alarm of MockAlarms) {
      component.alarm = Alarm.asAlarm(alarm);
      component.images = MockImageSet;
      component.imagesUnreliable = MockImageUnreliableSet;
      const value_validity = alarm.core_id.split('_');
      const value = value_validity[0];
      const validity = value_validity[1];
      fixture.detectChanges();
      expect(component).toBeTruthy();
      if (validity) {
        expect(component.getImage()).toEqual(value + '_' + validity);
      } else {
        expect(component.getImage()).toEqual(value);
      }
    }
  });

  it('should display all shleved alarms accordingly ', () => {
    for (const alarm of MockAlarms) {
      component.alarm = Alarm.asAlarm(alarm);
      component.alarm.shelve();
      component.images = MockImageSet;
      component.imagesUnreliable = MockImageUnreliableSet;
      const value_validity = alarm.core_id.split('_');
      const value = value_validity[0];
      const validity = value_validity[1];
      fixture.detectChanges();
      expect(component).toBeTruthy();
      if (validity) {
        expect(component.getImage()).toEqual('shelved' + '_' + validity);
      } else {
        expect(component.getImage()).toEqual('shelved');
      }
    }
  });

  describe('should have a method to determine if the alarm must be shown as acknoledged or not', () => {
    it('based on the alarm ack value when the showActionBadges is true (by default)', () => {
      component.alarm = Alarm.asAlarm(MockAlarms[0]);
      component.images = MockImageSet;
      component.imagesUnreliable = MockImageUnreliableSet;
      component.alarm.ack = true;
      expect(component.showAsPendingAck()).toEqual(false);
      component.alarm.ack = false;
      expect(component.showAsPendingAck()).toEqual(true);
    });

    it('that return false when the showActionBadges is set to false', () => {
      component.showActionBadges = false;
      component.alarm = Alarm.asAlarm(MockAlarms[0]);
      component.images = MockImageSet;
      component.imagesUnreliable = MockImageUnreliableSet;
      component.alarm.ack = true;
      expect(component.showAsPendingAck()).toEqual(false);
      component.alarm.ack = false;
      expect(component.showAsPendingAck()).toEqual(false);
    });
  });

  describe('should have a method to determine if the alarm must be shown as shelved or not', () => {
    it('based on the alarm shelved value when the showActionBadges is true (by default)', () => {
      component.alarm = Alarm.asAlarm(MockAlarms[0]);
      component.images = MockImageSet;
      component.imagesUnreliable = MockImageUnreliableSet;
      component.alarm.shelved = false;
      expect(component.showAsShelved()).toEqual(false);
      component.alarm.shelved = true;
      expect(component.showAsShelved()).toEqual(true);
    });

    it('that return false when the showActionBadges is set to false', () => {
      component.showActionBadges = false;
      component.alarm = Alarm.asAlarm(MockAlarms[0]);
      component.images = MockImageSet;
      component.imagesUnreliable = MockImageUnreliableSet;
      component.alarm.shelved = false;
      expect(component.showAsShelved()).toEqual(false);
      component.alarm.shelved = true;
      expect(component.showAsShelved()).toEqual(false);
    });
  });

  it('should show the action badges images when the showActionBadges is true (by default)', () => {
    component.alarm = Alarm.asAlarm(MockAlarms[0]);
    component.images = MockImageSet;
    component.imagesUnreliable = MockImageUnreliableSet;
    fixture.detectChanges();
    const badges = fixture.nativeElement.querySelector('.badges');
    expect(badges).toBeTruthy();
    const images = badges.querySelectorAll('img');
    expect(images.length).toEqual(2);
  });

  it('should not show the action badges images when the showActionBadges is false', () => {
    component.showActionBadges = false;
    component.alarm = Alarm.asAlarm(MockAlarms[0]);
    component.images = MockImageSet;
    component.imagesUnreliable = MockImageUnreliableSet;
    fixture.detectChanges();
    const badges = fixture.nativeElement.querySelector('.badges');
    expect(badges).toBeFalsy();
  });

  it('should turn on/off the badges according to the ack and shelve values', () => {
    component.alarm = Alarm.asAlarm(MockAlarms[0]);
    component.images = MockImageSet;
    component.imagesUnreliable = MockImageUnreliableSet;
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
