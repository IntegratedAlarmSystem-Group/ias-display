import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlarmComponent } from '../alarm/alarm.component';
import { AlarmLabelComponent } from '../alarm-label/alarm-label.component';
import { AlarmTooltipComponent } from '../alarm-tooltip/alarm-tooltip.component';
import { AlarmBlinkComponent } from '../alarm-blink/alarm-blink.component';
import { AlarmTileComponent } from './alarm-tile.component';
import { PropsTableComponent } from '../props-table/props-table.component';
import { Alarm } from '../../data/alarm';
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
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let component: AlarmTileComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AlarmTileComponent,
        AlarmLabelComponent,
        AlarmComponent,
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
      .debugElement.query(By.directive(AlarmTileComponent))
      .componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display a title with the name of the alarm', () => {
    hostComponent.alarm = Alarm.asAlarm(MockAlarms[0]);
    fixture.detectChanges();
    const content = fixture.nativeElement.querySelector(
      '.alarm-tile-content > .title');
    const styles = window.getComputedStyle(content);
    expect(content.innerHTML).toEqual('critical');
    expect(styles.textTransform).toEqual('uppercase');
  });

  it('should display a shortened title for a long name of the alarm', () => {
    hostComponent.alarm = Alarm.asAlarm(MockAlarms[17]);
    fixture.detectChanges();
    const content = fixture.nativeElement.querySelector(
      '.alarm-tile-content > .title');
    const styles = window.getComputedStyle(content);
    expect(content.innerHTML).toEqual('malfunctioning_un...');
    expect(styles.textTransform).toEqual('uppercase');
  });

  it('should display a title with the optional name if provided', () => {
    hostComponent.alarm = Alarm.asAlarm(MockAlarms[0]);
    component.optionalAlarmName = 'my alarm';
    fixture.detectChanges();
    const content = fixture.nativeElement.querySelector(
      '.alarm-tile-content > .title');
    const styles = window.getComputedStyle(content);
    expect(content.innerHTML).toEqual('my alarm');
    expect(styles.textTransform).toEqual('uppercase');
  });

  it('should display a shortened title for a long optional name', () => {
    hostComponent.alarm = Alarm.asAlarm(MockAlarms[17]);
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
      expectedClasses.push('tile-background-normal');
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
        AlarmLabelComponent,
        AlarmComponent,
        AlarmTooltipComponent,
        AlarmBlinkComponent,
        PropsTableComponent,
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
    ></app-alarm-tile>
  `,
})
class TestHostComponent {
  alarm: Alarm;
  images: AlarmImageSet = MockImageSet;
  imagesUnreliable: AlarmImageSet = MockImageUnreliableSet;
}
