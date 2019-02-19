import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlarmComponent } from '../alarm/alarm.component';
import { AlarmTooltipComponent } from '../alarm-tooltip/alarm-tooltip.component';
import { AlarmTileComponent } from './alarm-tile.component';
import { Alarm, Value } from '../../data/alarm';
import { AlarmImageSet } from '../alarm/alarm.component';
import { MockAlarms, MockImageSet, MockImageUnreliableSet } from './fixtures';

const expected_base_classes = {
  'critical': ['alarm-tile-red'],
  'high': ['alarm-tile-red'],
  'medium': ['alarm-tile-yellow'],
  'low': ['alarm-tile-yellow'],
  'clear': ['alarm-tile-green'],
  'unknown': ['alarm-tile-blue'],
  'maintenance': ['alarm-tile-gray'],
  'shutteddown': ['alarm-tile-gray'],
  'malfunctioning': ['alarm-tile-gray'],
  'critical_unreliable': ['alarm-tile-red', 'alarm-tile-unreliable'],
  'high_unreliable': ['alarm-tile-red', 'alarm-tile-unreliable'],
  'medium_unreliable': ['alarm-tile-yellow', 'alarm-tile-unreliable'],
  'low_unreliable': ['alarm-tile-yellow', 'alarm-tile-unreliable'],
  'clear_unreliable': ['alarm-tile-green', 'alarm-tile-unreliable'],
  'unknown_unreliable': ['alarm-tile-blue', 'alarm-tile-unreliable'],
  'maintenance_unreliable': ['alarm-tile-gray', 'alarm-tile-unreliable'],
  'shutteddown_unreliable': ['alarm-tile-gray', 'alarm-tile-unreliable'],
  'malfunctioning_unreliable': ['alarm-tile-gray', 'alarm-tile-unreliable'],
  'shelved': ['alarm-tile-green'],
  'shelved_unreliable': ['alarm-tile-green', 'alarm-tile-unreliable'],
};


describe('AlarmTileComponent', () => {
  let component: AlarmTileComponent;
  let fixture: ComponentFixture<AlarmTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AlarmTileComponent, AlarmComponent, AlarmTooltipComponent ],
      imports: [ NgbModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmTileComponent);
    component = fixture.componentInstance;
    component.alarm = Alarm.asAlarm(MockAlarms[0]);
    component.images = MockImageSet;
    component.imagesUnreliable = MockImageUnreliableSet;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display a title with the name of the alarm', () => {
    component.alarm = Alarm.asAlarm(MockAlarms[0]);
    fixture.detectChanges();
    const content = fixture.nativeElement.querySelector(
      '.alarm-tile-content > .title');
    const styles = window.getComputedStyle(content);
    expect(content.innerHTML).toEqual('critical');
    expect(styles.textTransform).toEqual('uppercase');
  });

  it('should display a shortened title for a long name of the alarm', () => {
    component.alarm = Alarm.asAlarm(MockAlarms[17]);
    fixture.detectChanges();
    const content = fixture.nativeElement.querySelector(
      '.alarm-tile-content > .title');
    const styles = window.getComputedStyle(content);
    expect(content.innerHTML).toEqual('malfunctioning_un...');
    expect(styles.textTransform).toEqual('uppercase');
  });

  it('should display a title with the optional name if provided', () => {
    component.alarm = Alarm.asAlarm(MockAlarms[0]);
    component.optionalAlarmName = 'my alarm';
    fixture.detectChanges();
    const content = fixture.nativeElement.querySelector(
      '.alarm-tile-content > .title');
    const styles = window.getComputedStyle(content);
    expect(content.innerHTML).toEqual('my alarm');
    expect(styles.textTransform).toEqual('uppercase');
  });

  it('should display a shortened title for a long optional name', () => {
    component.alarm = Alarm.asAlarm(MockAlarms[17]);
    component.optionalAlarmName = 'this is a large title for the tile';
    fixture.detectChanges();
    const content = fixture.nativeElement.querySelector(
      '.alarm-tile-content > .title');
    const styles = window.getComputedStyle(content);
    expect(content.innerHTML).toEqual('this is a large t...');
    expect(styles.textTransform).toEqual('uppercase');
  });

  it('should display the color of the alarms according to each alarm properties', () => {
    for (const alarm of MockAlarms) {
      const expectedClasses = [];
      for (const c of expected_base_classes[alarm.core_id]) {
        expectedClasses.push(c);
      }
      expectedClasses.push('normal');
      component.alarm = Alarm.asAlarm(alarm);
      fixture.detectChanges();
      expect(component).toBeTruthy();
      expect(component.getClass()).toEqual(expectedClasses);
    }
  });

});


describe('AlarmTileComponent: AlarmComponent', () => {
  let component: AlarmTileComponent;
  let fixture: ComponentFixture<AlarmTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AlarmTileComponent,
        AlarmComponent,
        AlarmTooltipComponent,
      ],
      imports: [ NgbModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmTileComponent);
    component = fixture.componentInstance;
    component.alarm = Alarm.asAlarm(MockAlarms[0]);
    component.images = MockImageSet;
    component.imagesUnreliable = MockImageUnreliableSet;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should contain an Alarm Component', () => {
    const debugElement = fixture.debugElement.query(
      By.directive(AlarmComponent)
    );
    expect(debugElement).not.toBe(null);
  });

  it('should pass selected inputs to the AlarmComponent', () => {
    const debugElement = fixture.debugElement.query(
      By.directive(AlarmComponent)
    );
    expect(debugElement).not.toBe(null);
    const alarmComponent = debugElement.componentInstance;
    component.alarm = Alarm.asAlarm(MockAlarms[4]);
    component.images = MockImageSet;
    component.imagesUnreliable = MockImageUnreliableSet;
    for (const showBadges of component.showBadgesOptions ) {
      for (const size of component.sizeOptions ) {
        for (const tooltipDirection of component.tooltipDirectionOptions ) {
          component.showActionBadges = showBadges;
          component.size = size;
          component.tooltipDirection = tooltipDirection;
          fixture.detectChanges();
          expect(alarmComponent.alarm).toEqual(component.alarm);
          expect(alarmComponent.images).toEqual(component.images);
          expect(alarmComponent.imagesUnreliable).toEqual(component.imagesUnreliable);
          expect(alarmComponent.showActionBadges).toEqual(component.showActionBadges);
          expect(alarmComponent.size).toEqual(component.size);
          expect(alarmComponent.tooltipDirection).toEqual(component.tooltipDirection);
          expect(alarmComponent.text).toEqual('');
        }
      }
    }
  });

});

describe('AlarmTileComponent: Animation methods', () => {
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let component: AlarmTileComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AlarmTileComponent,
        AlarmComponent,
        AlarmTooltipComponent,
        TestHostComponent
      ],
      imports: [ NgbModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    const mockAlarm = Alarm.asAlarm(MockAlarms[0]);
    hostComponent = fixture.componentInstance;
    hostComponent.alarm = mockAlarm;
    hostComponent.images = MockImageSet;
    hostComponent.imagesUnreliable = MockImageUnreliableSet;
    component = fixture
      .debugElement.query(By.directive(AlarmTileComponent))
      .componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.alarm).toEqual(hostComponent.alarm);
  });

  it('should have a startAnimation method to update the animation state and class for the alarm', () => {
    // Arrange:
    let expectedClasses: string[];
    hostComponent.alarm =  Alarm.asAlarm(MockAlarms[0]);
    fixture.detectChanges();
    component.targetAnimationState = 'normal';
    expectedClasses = [];
    for (const c of expected_base_classes[component.alarm.core_id]) {
      expectedClasses.push(c);
    }
    expectedClasses.push('normal');
    expect(component.getClass()).toEqual(expectedClasses);
    // Act:
    component.startAnimation();
    // Assert:
    expect(component.targetAnimationState).toEqual('highlight');
    expectedClasses = [];
    for (const c of expected_base_classes[component.alarm.core_id]) {
      expectedClasses.push(c);
    }
    expectedClasses.push('highlight');
    expect(component.getClass()).toEqual(expectedClasses);
  });

  it('should have a stopAnimation method to update the animation state', () => {
    // Arrange:
    let expectedClasses: string[];
    hostComponent.alarm =  Alarm.asAlarm(MockAlarms[0]);
    fixture.detectChanges();
    component.targetAnimationState = 'highlight';
    expectedClasses = [];
    for (const c of expected_base_classes[component.alarm.core_id]) {
      expectedClasses.push(c);
    }
    expectedClasses.push('highlight');
    expect(component.getClass()).toEqual(expectedClasses);
    // Act:
    component.stopAnimation();
    // Assert:
    expect(component.targetAnimationState).toEqual('normal');
    expectedClasses = [];
    for (const c of expected_base_classes[component.alarm.core_id]) {
      expectedClasses.push(c);
    }
    expectedClasses.push('normal');
    expect(component.getClass()).toEqual(expectedClasses);
  });

  it('should call startAnimation if "clear-set" transition for its alarm', () => {
    spyOn(component, 'startAnimation');
    expect(component.startAnimation).toHaveBeenCalledTimes(0);
    const mockAlarm = Object.assign({}, MockAlarms[0]);
    const setValues = Object.keys(Value)
        .filter(key => isNaN(Number(key)))
        .filter(x => !(x.indexOf('set') < 0));
    for (const key of setValues) {
      // clear component alarm to setup transition
      component.targetAnimationState = 'normal';
      hostComponent.alarm = null;
      fixture.detectChanges();
      // cleared
      mockAlarm.value = Value.cleared;
      hostComponent.alarm = Alarm.asAlarm(mockAlarm);
      fixture.detectChanges();
      // set
      mockAlarm.value = Value[key];
      hostComponent.alarm = Alarm.asAlarm(mockAlarm);
      fixture.detectChanges();
    }
    expect(component.startAnimation).toHaveBeenCalledTimes(4);
  });

  it('should call stopAnimation if "set-clear" transition for its alarm', () => {
    spyOn(component, 'stopAnimation');
    expect(component.stopAnimation).toHaveBeenCalledTimes(0);
    const mockAlarm = Object.assign({}, MockAlarms[0]);
    const setValues = Object.keys(Value)
        .filter(key => isNaN(Number(key)))
        .filter(x => !(x.indexOf('set') < 0));
    for (const key of setValues) {
      // clear component alarm to setup transition
      component.targetAnimationState = 'highlight';
      hostComponent.alarm = null;
      fixture.detectChanges();
      // cleared
      mockAlarm.value = Value[key];
      hostComponent.alarm = Alarm.asAlarm(mockAlarm);
      fixture.detectChanges();
      // set
      mockAlarm.value = Value.cleared;
      hostComponent.alarm = Alarm.asAlarm(mockAlarm);
      fixture.detectChanges();
    }
    expect(component.stopAnimation).toHaveBeenCalledTimes(4);
  });

  it('should not call startAnimation for other transitions for its alarm', () => {
    spyOn(component, 'startAnimation');
    expect(component.startAnimation).toHaveBeenCalledTimes(0);
    const mockAlarm = Object.assign({}, MockAlarms[0]);
    const alarmValues = Object.keys(Value)
        .filter(key => isNaN(Number(key)));
    for (const s of alarmValues) {
      for (const t of alarmValues) {
        if ( (s !== 'cleared') || (t.indexOf('set') < 0) ) {
          // clear component alarm to setup transition
          hostComponent.alarm = null;
          fixture.detectChanges();
          // previous value
          mockAlarm.value = Value[s];
          hostComponent.alarm = Alarm.asAlarm(mockAlarm);
          fixture.detectChanges();
          // value
          mockAlarm.value = Value[t];
          hostComponent.alarm = Alarm.asAlarm(mockAlarm);
          fixture.detectChanges();
        }
      }
    }
    expect(component.startAnimation).toHaveBeenCalledTimes(0);
  });

  it('should not call startAnimation if disableAnimation is "true"', () => {
    spyOn(component, 'startAnimation');
    expect(component.startAnimation).toHaveBeenCalledTimes(0);
    component.disableAnimation = true;
    const mockAlarm = Object.assign({}, MockAlarms[0]);
    const alarmValues = Object.keys(Value)
        .filter(key => isNaN(Number(key)));
    for (const s of alarmValues) {
      for (const t of alarmValues) {
        // clear component alarm to setup transition
        hostComponent.alarm = null;
        fixture.detectChanges();
        // previous value
        mockAlarm.value = Value[s];
        hostComponent.alarm = Alarm.asAlarm(mockAlarm);
        fixture.detectChanges();
        // value
        mockAlarm.value = Value[t];
        hostComponent.alarm = Alarm.asAlarm(mockAlarm);
        fixture.detectChanges();
      }
    }
    expect(component.startAnimation).toHaveBeenCalledTimes(0);
  });

});

/**
 * Mock host component for the alarm tile to check behaviour on change
 */
@Component({
  selector: 'app-host',
  template: `
    <app-alarm-tile
      [alarm]="this.alarm"
      [images]="this.images"
      [imagesUnreliable]="this.imagesUnreliable"
      [size]="'md'"
      [alarmNameMaxSize]="10"
      [optionalAlarmName]="'TEST'"
      [tooltipDirection]="'left'"
    ></app-alarm-tile>
  `,
})
class TestHostComponent {
  alarm: Alarm;
  images: AlarmImageSet = MockImageSet;
  imagesUnreliable: AlarmImageSet = MockImageUnreliableSet;
}