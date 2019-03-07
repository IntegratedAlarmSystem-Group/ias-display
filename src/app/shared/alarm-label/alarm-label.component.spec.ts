import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmLabelComponent } from './alarm-label.component';
import { Alarm } from '../../data/alarm';
import { MockAlarms } from './fixtures';

const expected_classes = {
  'critical': ['alarm-label-critical'],
  'high': ['alarm-label-high'],
  'medium': ['alarm-label-medium'],
  'low': ['alarm-label-low'],
  'clear': ['alarm-label-clear', 'hide-label'],
  'unknown_low': ['alarm-label-low'],
  'unknown_clear': ['alarm-label-clear', 'hide-label'],
  'maintenance_low': ['alarm-label-low'],
  'maintenance_clear': ['alarm-label-clear', 'hide-label'],
  'shutteddown_low': ['alarm-label-low'],
  'shutteddown_clear': ['alarm-label-clear', 'hide-label'],
  'malfunctioning_low': ['alarm-label-low'],
  'malfunctioning_clear': ['alarm-label-clear', 'hide-label'],
  'critical_unreliable': ['alarm-label-critical'],
  'high_unreliable': ['alarm-label-high'],
  'medium_unreliable': ['alarm-label-medium'],
  'low_unreliable': ['alarm-label-low'],
  'clear_unreliable': ['alarm-label-clear', 'hide-label'],
  'unknown_low_unreliable': ['alarm-label-low'],
  'unknown_clear_unreliable': ['alarm-label-clear', 'hide-label'],
  'maintenance_low_unreliable': ['alarm-label-low'],
  'maintenance_clear_unreliable': ['alarm-label-clear', 'hide-label'],
  'shutteddown_low_unreliable': ['alarm-label-low'],
  'shutteddown_clear_unreliable': ['alarm-label-clear', 'hide-label'],
  'malfunctioning_low_unreliable': ['alarm-label-low'],
  'malfunctioning_clear_unreliable': ['alarm-label-clear', 'hide-label'],
  'shelved': ['alarm-label-clear',  'hide-label'],
  'shelved_unreliable': ['alarm-label-clear', 'hide-label'],
};

describe('AlarmLabelComponent', () => {
  let component: AlarmLabelComponent;
  let fixture: ComponentFixture<AlarmLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmLabelComponent);
    component = fixture.componentInstance;
    component.showText = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display an uppercase text for the priority of a set low alarm', () => {
    component.alarm = Alarm.asAlarm(MockAlarms[3]);
    fixture.detectChanges();
    const content = fixture.nativeElement.querySelector('.alarm-label');
    const styles = window.getComputedStyle(content);
    expect(content.innerHTML).toEqual('LOW');
    expect(styles.textTransform).toEqual('uppercase');
  });

  it('should display an uppercase text for the priority of a set medium alarm', () => {
    component.alarm = Alarm.asAlarm(MockAlarms[2]);
    fixture.detectChanges();
    const content = fixture.nativeElement.querySelector('.alarm-label');
    const styles = window.getComputedStyle(content);
    expect(content.innerHTML).toEqual('MEDIUM');
    expect(styles.textTransform).toEqual('uppercase');
  });

  it('should display an uppercase text for the priority of a set high alarm', () => {
    component.alarm = Alarm.asAlarm(MockAlarms[1]);
    fixture.detectChanges();
    const content = fixture.nativeElement.querySelector('.alarm-label');
    const styles = window.getComputedStyle(content);
    expect(content.innerHTML).toEqual('HIGH');
    expect(styles.textTransform).toEqual('uppercase');
  });

  it('should display an uppercase text for the priority of a set critical alarm', () => {
    component.alarm = Alarm.asAlarm(MockAlarms[0]);
    fixture.detectChanges();
    const content = fixture.nativeElement.querySelector('.alarm-label');
    const styles = window.getComputedStyle(content);
    expect(content.innerHTML).toEqual('CRITICAL');
    expect(styles.textTransform).toEqual('uppercase');
  });

  it('should display the color of the labels according to each alarm properties', () => {
    for (const alarm of MockAlarms) {
      component.alarm = Alarm.asAlarm(alarm);
      fixture.detectChanges();
      expect(component).toBeTruthy();
      expect(component.getClass()).toEqual(expected_classes[alarm.core_id]);
    }
  });

});
