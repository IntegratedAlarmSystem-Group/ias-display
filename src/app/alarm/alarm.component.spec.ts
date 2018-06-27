import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AlarmComponent, AlarmImageSet } from './alarm.component';
import { Alarm, Value, OperationalMode } from '../alarm';
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

  for (const alarm of MockAlarms) {
    it('should display the component according to its tags ', () => {
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
    });
  }
});
