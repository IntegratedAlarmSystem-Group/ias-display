import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlarmLabelComponent } from './alarm-label.component';
import { Alarm } from '../../data/alarm';
import { MockAlarms } from './fixtures';
import { expectedClassesWhenShowText } from './fixtures';
import { expectedClassesWhenHiddenText } from './fixtures';

describe('AlarmLabelComponent: ', () => {
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let component: AlarmLabelComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmLabelComponent, TestHostComponent ],
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
      .debugElement.query(By.directive(AlarmLabelComponent))
      .componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get an auxiliary text for the priority of a cleared alarm', () => {
    hostComponent.alarm = Alarm.asAlarm(MockAlarms[4]);
    fixture.detectChanges();
    const content = fixture.nativeElement.querySelector('.priority-text');
    expect(content.innerHTML).toEqual('CLEARED');
  });

  it('should get an uppercase text for the priority of a set low alarm', () => {
    hostComponent.alarm = Alarm.asAlarm(MockAlarms[3]);
    fixture.detectChanges();
    const content = fixture.nativeElement.querySelector('.priority-text');
    const styles = window.getComputedStyle(content);
    expect(content.innerHTML).toEqual('LOW');
    expect(styles.textTransform).toEqual('uppercase');
  });

  it('should get an uppercase text for the priority of a set medium alarm', () => {
    hostComponent.alarm = Alarm.asAlarm(MockAlarms[2]);
    fixture.detectChanges();
    const content = fixture.nativeElement.querySelector('.priority-text');
    const styles = window.getComputedStyle(content);
    expect(content.innerHTML).toEqual('MEDIUM');
    expect(styles.textTransform).toEqual('uppercase');
  });

  it('should get an uppercase text for the priority of a set high alarm', () => {
    hostComponent.alarm = Alarm.asAlarm(MockAlarms[1]);
    fixture.detectChanges();
    const content = fixture.nativeElement.querySelector('.priority-text');
    const styles = window.getComputedStyle(content);
    expect(content.innerHTML).toEqual('HIGH');
    expect(styles.textTransform).toEqual('uppercase');
  });

  it('should get an uppercase text for the priority of a set critical alarm', () => {
    hostComponent.alarm = Alarm.asAlarm(MockAlarms[0]);
    fixture.detectChanges();
    const content = fixture.nativeElement.querySelector('.priority-text');
    const styles = window.getComputedStyle(content);
    expect(content.innerHTML).toEqual('CRITICAL');
    expect(styles.textTransform).toEqual('uppercase');
  });

  it('should hide labels for a clear value or shelved status even if showText is true', () => {
    component.showText = true;
    const expected_classes = Object.assign({}, expectedClassesWhenShowText);
    for (const alarm of MockAlarms) {
      hostComponent.alarm = Alarm.asAlarm(alarm);
      fixture.detectChanges();
      expect(component).toBeTruthy();
      expect(component.getClass()).toEqual(expected_classes[alarm.core_id]);
    }
  });

  it('should not hide labels for a clear value or shelved status if showText is false', () => {
    component.showText = false;
    const expected_classes = Object.assign({}, expectedClassesWhenHiddenText);
    for (const alarm of MockAlarms) {
      hostComponent.alarm = Alarm.asAlarm(alarm);
      fixture.detectChanges();
      expect(component).toBeTruthy();
      expect(component.getClass()).toEqual(expected_classes[alarm.core_id]);
    }
  });

  it('should add a fluid-text class if fluidText is true, when showText is true', () => {
    component.showText = true;
    component.fluidText = true;
    for (const alarm of MockAlarms) {
      hostComponent.alarm = Alarm.asAlarm(alarm);
      fixture.detectChanges();
      expect(component).toBeTruthy();
      expect(component.getPriorityTextClass().indexOf('fluid-text') > -1).toBeTruthy();
    }
  });

  it('should add a fluid-text class if fluidText is true, even if showText is false', () => {
    component.showText = false;
    component.fluidText = true;
    for (const alarm of MockAlarms) {
      hostComponent.alarm = Alarm.asAlarm(alarm);
      fixture.detectChanges();
      expect(component).toBeTruthy();
      expect(component.getPriorityTextClass().indexOf('fluid-text') > -1).toBeTruthy();
    }
  });

  it('should add a no-padding class if noPadding is true, when showText is true', () => {
    component.showText = true;
    component.noPadding = true;
    for (const alarm of MockAlarms) {
      hostComponent.alarm = Alarm.asAlarm(alarm);
      fixture.detectChanges();
      expect(component).toBeTruthy();
      expect(component.getClass().indexOf('no-padding') > -1).toBeTruthy();
    }
  });

  it('should add a no-padding class if noPadding is true, even if showText is false', () => {
    component.showText = false;
    component.noPadding = true;
    for (const alarm of MockAlarms) {
      hostComponent.alarm = Alarm.asAlarm(alarm);
      fixture.detectChanges();
      expect(component).toBeTruthy();
      expect(component.getClass().indexOf('no-padding')  > -1).toBeTruthy();
    }
  });

});

/**
 * Mock host component for the alarm tile to check behaviour on change
 */
@Component({
  selector: 'app-host',
  template: `
    <app-alarm-label
      [alarm]="this.alarm"
    ></app-alarm-label>
  `,
})
class TestHostComponent {
  alarm: Alarm;
}
