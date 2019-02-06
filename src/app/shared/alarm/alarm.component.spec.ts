import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlarmComponent } from './alarm.component';
import { AlarmTooltipComponent } from '../alarm-tooltip/alarm-tooltip.component';
import { Alarm } from '../../data/alarm';
import { MockAlarms, MockImageSet, MockImageUnreliableSet } from './fixtures';

describe('AlarmComponent', () => {
  let component: AlarmComponent;
  let fixture: ComponentFixture<AlarmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmComponent, AlarmTooltipComponent ],
      imports: [ NgbModule ]
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
        if (component.alarm.showAsMaintenance()) {
          expect(component.getImage()).toEqual('maintenance_' + validity);
        } else {
          expect(component.getImage()).toEqual(value + '_' + validity);
        }
      } else {
        if (component.alarm.showAsMaintenance()) {
          expect(component.getImage()).toEqual('maintenance');
        } else {
          expect(component.getImage()).toEqual(value);
        }
      }
    }
  });

  it('should display the text according to the alarm properties ', () => {
    for (const alarm of MockAlarms) {
      component.alarm = Alarm.asAlarm(alarm);
      component.images = MockImageSet;
      component.imagesUnreliable = MockImageUnreliableSet;
      const value_validity = alarm.core_id.split('_');
      let value = value_validity[0];
      if (value === 'low' || value === 'medium' || value === 'high' || value === 'critical') {
        value = 'set-' + value;
      }
      let validity = value_validity[1];
      if (validity === undefined) {
        validity = 'reliable';
      }
      fixture.detectChanges();
      expect(component).toBeTruthy();
      if (component.alarm.showAsMaintenance()) {
        expect(component.getTextClass()).toEqual(['text', validity, 'maintenance']);
      } else {
        expect(component.getTextClass()).toEqual(['text', validity, value]);
      }
    }
  });

  it('should display all shelved alarms accordingly ', () => {
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

    it('that return false when the alarms state_change_timestamp is 0', () => {
      component.alarm = Alarm.asAlarm(MockAlarms[0]);
      component.images = MockImageSet;
      component.imagesUnreliable = MockImageUnreliableSet;
      component.alarm.ack = false;
      component.alarm.state_change_timestamp = 0;
      expect(component.showAsPendingAck()).toEqual(false);
      component.alarm.ack = false;
      component.alarm.state_change_timestamp = 1231231;
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

  it('should hide the action badges images when the showActionBadges is false', () => {
    component.showActionBadges = false;
    component.alarm = Alarm.asAlarm(MockAlarms[0]);
    component.images = MockImageSet;
    component.imagesUnreliable = MockImageUnreliableSet;
    fixture.detectChanges();
    const badges = fixture.nativeElement.querySelector('.badges');
    expect(badges).toBeTruthy();
    expect(badges.className).toContain('hidden');
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
