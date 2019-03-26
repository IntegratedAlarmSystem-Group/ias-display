import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlarmComponent } from './alarm.component';
import { AlarmLabelComponent } from '../alarm-label/alarm-label.component';
import { AlarmTooltipComponent } from '../alarm-tooltip/alarm-tooltip.component';
import { AlarmBlinkComponent } from '../alarm-blink/alarm-blink.component';
import { PropsTableComponent } from '../props-table/props-table.component';
import { Alarm } from '../../data/alarm';
import { AlarmImageSet } from '../alarm/alarm.component';
import { MockAlarms, MockImageSet, MockImageUnreliableSet } from './fixtures';

describe('AlarmComponent', () => {
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let component: AlarmComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AlarmComponent,
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
    hostComponent.images = MockImageSet;
    hostComponent.imagesUnreliable = MockImageUnreliableSet;
    component = fixture
      .debugElement.query(By.directive(AlarmComponent))
      .componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display the icon according to the alarm properties ', () => {
    for (const alarm of MockAlarms) {
      hostComponent.alarm = Alarm.asAlarm(alarm);
      const value_validity = alarm.core_id.split('_');
      const value = value_validity[0];
      const validity = value_validity[1];
      fixture.detectChanges();
      expect(component).toBeTruthy();
      if (validity) {
        if (hostComponent.alarm.showAsMaintenance()) {
          expect(component.getImage()).toEqual('maintenance_' + validity);
        } else {
          expect(component.getImage()).toEqual(value + '_' + validity);
        }
      } else {
        if (hostComponent.alarm.showAsMaintenance()) {
          expect(component.getImage()).toEqual('maintenance');
        } else {
          expect(component.getImage()).toEqual(value);
        }
      }
    }
  });

  it('should display the text according to the alarm properties ', () => {
    for (const alarm of MockAlarms) {
      hostComponent.alarm = Alarm.asAlarm(alarm);
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
      if (hostComponent.alarm.showAsMaintenance()) {
        expect(component.getTextClass()).toEqual(['text', validity, 'maintenance']);
      } else {
        expect(component.getTextClass()).toEqual(['text', validity, value]);
      }
    }
  });

  it('should display all shelved alarms accordingly ', () => {
    for (const alarm of MockAlarms) {
      hostComponent.alarm = Alarm.asAlarm(alarm);
      hostComponent.alarm.shelve();
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
      hostComponent.alarm = Alarm.asAlarm(Object.assign({}, component.alarm));
      hostComponent.alarm.ack = true;
      fixture.detectChanges();
      expect(component.showAsPendingAck).toEqual(false);
      hostComponent.alarm = Alarm.asAlarm(Object.assign({}, component.alarm));
      hostComponent.alarm.ack = false;
      fixture.detectChanges();
      expect(component.showAsPendingAck).toEqual(true);
    });

    it('that return false when the alarms state_change_timestamp is 0', () => {
      hostComponent.alarm = Alarm.asAlarm(Object.assign({}, component.alarm));
      hostComponent.alarm.ack = false;
      hostComponent.alarm.state_change_timestamp = 0;
      fixture.detectChanges();
      expect(component.showAsPendingAck).toEqual(false);
      hostComponent.alarm = Alarm.asAlarm(Object.assign({}, component.alarm));
      hostComponent.alarm.ack = false;
      hostComponent.alarm.state_change_timestamp = 1231231;
      fixture.detectChanges();
      expect(component.showAsPendingAck).toEqual(true);
    });

    it('that return false when the showActionBadges is set to false', () => {
      component.showActionBadges = false;
      hostComponent.alarm = Alarm.asAlarm(Object.assign({}, component.alarm));
      hostComponent.alarm.ack = true;
      fixture.detectChanges();
      expect(component.showAsPendingAck).toEqual(false);
      hostComponent.alarm = Alarm.asAlarm(Object.assign({}, component.alarm));
      hostComponent.alarm.ack = false;
      fixture.detectChanges();
      expect(component.showAsPendingAck).toEqual(false);
    });
  });

  describe('should have an attribute to determine if the alarm must be shown as shelved or not', () => {
    it('based on the alarm shelved value when the showActionBadges is true (by default)', () => {
      hostComponent.alarm = Alarm.asAlarm(Object.assign({}, component.alarm));
      hostComponent.alarm.shelved = false;
      fixture.detectChanges();
      expect(component.showAsShelved).toEqual(false);
      hostComponent.alarm = Alarm.asAlarm(Object.assign({}, component.alarm));
      hostComponent.alarm.shelved = true;
      fixture.detectChanges();
      expect(component.showAsShelved).toEqual(true);
    });

    it('that return false when the showActionBadges is set to false', () => {
      component.showActionBadges = false;
      hostComponent.alarm = Alarm.asAlarm(Object.assign({}, component.alarm));
      hostComponent.alarm.shelved = false;
      fixture.detectChanges();
      expect(component.showAsShelved).toEqual(false);
      hostComponent.alarm = Alarm.asAlarm(Object.assign({}, component.alarm));
      hostComponent.alarm.shelved = true;
      fixture.detectChanges();
      expect(component.showAsShelved).toEqual(false);
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
    <app-alarm
      [alarm]="this.alarm"
      [images]="this.images"
      [imagesUnreliable]="this.imagesUnreliable"
      [size]="'md'"
      [tooltipDirection]="'left'"
    ></app-alarm>
  `,
})
class TestHostComponent {
  alarm: Alarm;
  images: AlarmImageSet = MockImageSet;
  imagesUnreliable: AlarmImageSet = MockImageUnreliableSet;
}
