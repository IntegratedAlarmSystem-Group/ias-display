import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AlarmHeaderComponent } from './alarm-header.component';
import { Alarm, Value, OperationalMode } from '../../data/alarm';
import { MockAlarms } from './fixtures';

const expected_classes = {
  'critical': ['red'],
  'high': ['red'],
  'medium': ['yellow'],
  'low': ['yellow'],
  'clear': ['green'],
  'unknown': ['blue'],
  'maintenance': ['gray'],
  'critical_unreliable': ['red', 'unreliable'],
  'high_unreliable': ['red', 'unreliable'],
  'medium_unreliable': ['yellow', 'unreliable'],
  'low_unreliable': ['yellow', 'unreliable'],
  'clear_unreliable': ['green', 'unreliable'],
  'unknown_unreliable': ['blue', 'unreliable'],
  'maintenance_unreliable': ['gray', 'unreliable'],
};

describe('AlarmHeaderComponent', () => {
  let component: AlarmHeaderComponent;
  let fixture: ComponentFixture<AlarmHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmHeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.alarm = Alarm.asAlarm(MockAlarms[0]);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  for (const alarm of MockAlarms) {
    it('should display the color of the alarm according to the alarm properties', () => {
      component.alarm = Alarm.asAlarm(alarm);
      fixture.detectChanges();
      expect(component).toBeTruthy();
      expect(component.getClass()).toEqual(expected_classes[alarm.core_id]);
    });
  }

});
