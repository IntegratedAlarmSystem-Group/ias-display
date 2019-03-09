import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmLabelComponent } from './alarm-label.component';
import { Alarm } from '../../data/alarm';
import { MockAlarms } from './fixtures';
import { expectedClassesWhenShowText } from './fixtures';
import { expectedClassesWhenHiddenText } from './fixtures';

describe('AlarmLabelComponent: ', () => {
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get an auxiliary text for the priority of a cleared alarm', () => {
    component.alarm = Alarm.asAlarm(MockAlarms[4]);
    fixture.detectChanges();
    const content = fixture.nativeElement.querySelector('.priority-text');
    expect(content.innerHTML).toEqual('CLEARED');
  });

  it('should get an uppercase text for the priority of a set low alarm', () => {
    component.alarm = Alarm.asAlarm(MockAlarms[3]);
    fixture.detectChanges();
    const content = fixture.nativeElement.querySelector('.priority-text');
    const styles = window.getComputedStyle(content);
    expect(content.innerHTML).toEqual('LOW');
    expect(styles.textTransform).toEqual('uppercase');
  });

  it('should get an uppercase text for the priority of a set medium alarm', () => {
    component.alarm = Alarm.asAlarm(MockAlarms[2]);
    fixture.detectChanges();
    const content = fixture.nativeElement.querySelector('.priority-text');
    const styles = window.getComputedStyle(content);
    expect(content.innerHTML).toEqual('MEDIUM');
    expect(styles.textTransform).toEqual('uppercase');
  });

  it('should get an uppercase text for the priority of a set high alarm', () => {
    component.alarm = Alarm.asAlarm(MockAlarms[1]);
    fixture.detectChanges();
    const content = fixture.nativeElement.querySelector('.priority-text');
    const styles = window.getComputedStyle(content);
    expect(content.innerHTML).toEqual('HIGH');
    expect(styles.textTransform).toEqual('uppercase');
  });

  it('should get an uppercase text for the priority of a set critical alarm', () => {
    component.alarm = Alarm.asAlarm(MockAlarms[0]);
    fixture.detectChanges();
    const content = fixture.nativeElement.querySelector('.priority-text');
    const styles = window.getComputedStyle(content);
    expect(content.innerHTML).toEqual('CRITICAL');
    expect(styles.textTransform).toEqual('uppercase');
  });

  it('should hide labels for a clear value or shelved status even if showText is true', () => {
    component.showText = true;
    component.noPadding = false;
    const expected_classes = Object.assign({}, expectedClassesWhenShowText);
    for (const alarm of MockAlarms) {
      component.alarm = Alarm.asAlarm(alarm);
      fixture.detectChanges();
      expect(component).toBeTruthy();
      expect(component.getClass()).toEqual(expected_classes[alarm.core_id]);
    }
  });

  it('should not hide labels for a clear value or shelved status if showText is false', () => {
    component.showText = false;
    component.noPadding = false;
    const expected_classes = Object.assign({}, expectedClassesWhenHiddenText);
    for (const alarm of MockAlarms) {
      component.alarm = Alarm.asAlarm(alarm);
      fixture.detectChanges();
      expect(component).toBeTruthy();
      expect(component.getClass()).toEqual(expected_classes[alarm.core_id]);
    }
  });

  it('should add a no padding class if noPadding is true, if required showText', () => {
    component.showText = true;
    component.noPadding = true;
    for (const alarm of MockAlarms) {
      component.alarm = Alarm.asAlarm(alarm);
      fixture.detectChanges();
      expect(component).toBeTruthy();
      expect(component.getClass().indexOf('no-padding')).toBeTruthy();
    }
  });

  it('should add a no padding class if noPadding is true, if showText is false', () => {
    component.showText = false;
    component.noPadding = true;
    for (const alarm of MockAlarms) {
      component.alarm = Alarm.asAlarm(alarm);
      fixture.detectChanges();
      expect(component).toBeTruthy();
      expect(component.getClass().indexOf('no-padding')).toBeTruthy();
    }
  });

});
