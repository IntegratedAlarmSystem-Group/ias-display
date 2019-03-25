import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';
import { AlarmBlinkComponent } from './alarm-blink.component';
import { MockAlarms } from './fixtures';

fdescribe('AlarmBlinkComponent', () => {
  let component: AlarmBlinkComponent;
  let fixture: ComponentFixture<AlarmBlinkComponent>;
  let spyStartAnimation: any;
  let spyStopAnimation: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmBlinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmBlinkComponent);
    component = fixture.componentInstance;
    spyStartAnimation = spyOn(component, 'startAnimation');
    spyStopAnimation = spyOn(component, 'stopAnimation');
    fixture.detectChanges();
  });

  it('should create', () => {
    component.alarm = MockAlarms[0];
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  // it('should blink', () => {
  //   component.alarm = MockAlarms[1];
  //   fixture.detectChanges();
  //   component.ngOnChanges();
  //   expect(component).toBeTruthy();
  //   expect(component.startAnimation).toHaveBeenCalled();
  // });

  describe('If transitioning from Clear to any of the Set states', () => {
    it('should start blinking', () => {
      // Arrange
      for (const a of MockAlarms.splice(1, 4)) {
        const alarm0 = Object.assign({}, MockAlarms[0]);
        const alarm1 = Object.assign({}, a);
        alarm1.value_change_timestamp = (new Date).getTime();
        alarm1.state_change_timestamp = (new Date).getTime();
        component.alarm = alarm1;
        fixture.detectChanges();
        component.ngOnChanges({
          'alarm': new SimpleChange(alarm0, alarm1, false)
        });
        fixture.detectChanges();
        expect(component).toBeTruthy();
        expect(component.startAnimation).toHaveBeenCalled();
        expect(component.stopAnimation).not.toHaveBeenCalled();
      }
    });
  });

  // describe('If transitioning any of the Set states to Clear', () => {
  //   it('should stop blinking', () => {
  //     // Arrange
  //     for (const a of MockAlarms.splice(1, 4)) {
  //       const alarm0 = Object.assign({}, a);
  //       const alarm1 = Object.assign({}, MockAlarms[0]);
  //       alarm1.value_change_timestamp = (new Date).getTime();
  //       alarm1.state_change_timestamp = (new Date).getTime();
  //       component.alarm = alarm1;
  //       fixture.detectChanges();
  //       component.ngOnChanges({
  //         'alarm': new SimpleChange(alarm0, alarm1, false)
  //       });
  //       fixture.detectChanges();
  //       expect(component).toBeTruthy();
  //       spyStartAnimation = spyOn(component, 'startAnimation');
  //       expect(component.startAnimation).toHaveBeenCalled();
  //       expect(component.stopAnimation).not.toHaveBeenCalled();
  //     }
  //   });
  // });
});

// describe('AlarmTileComponent: Animation methods', () => {
//   let hostComponent: TestHostComponent;
//   let fixture: ComponentFixture<TestHostComponent>;
//   let component: AlarmTileComponent;
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         AlarmTileComponent,
//         AlarmComponent,
//         AlarmLabelComponent,
//         AlarmTooltipComponent,
//         TestHostComponent,
//         PropsTableComponent
//       ],
//       imports: [ NgbModule ]
//     })
//     .compileComponents();
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(TestHostComponent);
//     const mockAlarm = Alarm.asAlarm(MockAlarms[0]);
//     hostComponent = fixture.componentInstance;
//     hostComponent.alarm = mockAlarm;
//     hostComponent.images = MockImageSet;
//     hostComponent.imagesUnreliable = MockImageUnreliableSet;
//     component = fixture
//       .debugElement.query(By.directive(AlarmTileComponent))
//       .componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//     expect(component.alarm).toEqual(hostComponent.alarm);
//   });
//
//   it('should have a startAnimation method to update the animation state and class for the alarm', () => {
//     // Arrange:
//     let expectedClasses: string[];
//     hostComponent.alarm =  Alarm.asAlarm(MockAlarms[0]);
//     fixture.detectChanges();
//     component.targetAnimationState = 'normal';
//     expectedClasses = [];
//     for (const c of expected_base_classes[component.alarm.core_id]) {
//       expectedClasses.push(c);
//     }
//     expectedClasses.push('normal');
//     expect(component.getClass()).toEqual(expectedClasses);
//     // Act:
//     component.startAnimation();
//     // Assert:
//     expect(component.targetAnimationState).toEqual('highlight');
//     expectedClasses = [];
//     for (const c of expected_base_classes[component.alarm.core_id]) {
//       expectedClasses.push(c);
//     }
//     expectedClasses.push('highlight');
//     expect(component.getClass()).toEqual(expectedClasses);
//   });
//
//   it('should have a stopAnimation method to update the animation state', () => {
//     // Arrange:
//     let expectedClasses: string[];
//     hostComponent.alarm =  Alarm.asAlarm(MockAlarms[0]);
//     fixture.detectChanges();
//     component.targetAnimationState = 'highlight';
//     expectedClasses = [];
//     for (const c of expected_base_classes[component.alarm.core_id]) {
//       expectedClasses.push(c);
//     }
//     expectedClasses.push('highlight');
//     expect(component.getClass()).toEqual(expectedClasses);
//     // Act:
//     component.stopAnimation();
//     // Assert:
//     expect(component.targetAnimationState).toEqual('normal');
//     expectedClasses = [];
//     for (const c of expected_base_classes[component.alarm.core_id]) {
//       expectedClasses.push(c);
//     }
//     expectedClasses.push('normal');
//     expect(component.getClass()).toEqual(expectedClasses);
//   });
//
//   it('should call startAnimation if "clear-set" transition for its alarm', () => {
//     spyOn(component, 'startAnimation');
//     expect(component.startAnimation).toHaveBeenCalledTimes(0);
//     const mockAlarm = Object.assign({}, MockAlarms[0]);
//     const setValues = Object.keys(Value)
//         .filter(key => isNaN(Number(key)))
//         .filter(x => !(x.indexOf('set') < 0));
//     for (const key of setValues) {
//       // clear component alarm to setup transition
//       component.targetAnimationState = 'normal';
//       hostComponent.alarm = null;
//       fixture.detectChanges();
//       // cleared
//       mockAlarm.value = Value.cleared;
//       hostComponent.alarm = Alarm.asAlarm(mockAlarm);
//       fixture.detectChanges();
//       // set
//       mockAlarm.value = Value[key];
//       hostComponent.alarm = Alarm.asAlarm(mockAlarm);
//       fixture.detectChanges();
//     }
//     expect(component.startAnimation).toHaveBeenCalledTimes(4);
//   });
//
//   it('should call stopAnimation if "set-clear" transition for its alarm', () => {
//     spyOn(component, 'stopAnimation');
//     expect(component.stopAnimation).toHaveBeenCalledTimes(0);
//     const mockAlarm = Object.assign({}, MockAlarms[0]);
//     const setValues = Object.keys(Value)
//         .filter(key => isNaN(Number(key)))
//         .filter(x => !(x.indexOf('set') < 0));
//     for (const key of setValues) {
//       // clear component alarm to setup transition
//       component.targetAnimationState = 'highlight';
//       hostComponent.alarm = null;
//       fixture.detectChanges();
//       // cleared
//       mockAlarm.value = Value[key];
//       hostComponent.alarm = Alarm.asAlarm(mockAlarm);
//       fixture.detectChanges();
//       // set
//       mockAlarm.value = Value.cleared;
//       hostComponent.alarm = Alarm.asAlarm(mockAlarm);
//       fixture.detectChanges();
//     }
//     expect(component.stopAnimation).toHaveBeenCalledTimes(4);
//   });
//
//   it('should not call startAnimation for other transitions for its alarm', () => {
//     spyOn(component, 'startAnimation');
//     expect(component.startAnimation).toHaveBeenCalledTimes(0);
//     const mockAlarm = Object.assign({}, MockAlarms[0]);
//     const alarmValues = Object.keys(Value)
//         .filter(key => isNaN(Number(key)));
//     for (const s of alarmValues) {
//       for (const t of alarmValues) {
//         if ( (s !== 'cleared') || (t.indexOf('set') < 0) ) {
//           // clear component alarm to setup transition
//           hostComponent.alarm = null;
//           fixture.detectChanges();
//           // previous value
//           mockAlarm.value = Value[s];
//           hostComponent.alarm = Alarm.asAlarm(mockAlarm);
//           fixture.detectChanges();
//           // value
//           mockAlarm.value = Value[t];
//           hostComponent.alarm = Alarm.asAlarm(mockAlarm);
//           fixture.detectChanges();
//         }
//       }
//     }
//     expect(component.startAnimation).toHaveBeenCalledTimes(0);
//   });
//
//   it('should not call startAnimation if disableAnimation is "true"', () => {
//     spyOn(component, 'startAnimation');
//     expect(component.startAnimation).toHaveBeenCalledTimes(0);
//     component.disableAnimation = true;
//     const mockAlarm = Object.assign({}, MockAlarms[0]);
//     const alarmValues = Object.keys(Value)
//         .filter(key => isNaN(Number(key)));
//     for (const s of alarmValues) {
//       for (const t of alarmValues) {
//         // clear component alarm to setup transition
//         hostComponent.alarm = null;
//         fixture.detectChanges();
//         // previous value
//         mockAlarm.value = Value[s];
//         hostComponent.alarm = Alarm.asAlarm(mockAlarm);
//         fixture.detectChanges();
//         // value
//         mockAlarm.value = Value[t];
//         hostComponent.alarm = Alarm.asAlarm(mockAlarm);
//         fixture.detectChanges();
//       }
//     }
//     expect(component.startAnimation).toHaveBeenCalledTimes(0);
//   });
//
// });

/**
 * Mock host component for the alarm tile to check behaviour on change
 */
// @Component({
//   selector: 'app-host',
//   template: `
//     <app-alarm-tile
//       [alarm]="this.alarm"
//       [images]="this.images"
//       [imagesUnreliable]="this.imagesUnreliable"
//       [size]="'md'"
//       [alarmNameMaxSize]="10"
//       [optionalAlarmName]="'TEST'"
//       [tooltipDirection]="'left'"
//     ></app-alarm-tile>
//   `,
// })
// class TestHostComponent {
//   alarm: Alarm;
//   images: AlarmImageSet = MockImageSet;
//   imagesUnreliable: AlarmImageSet = MockImageUnreliableSet;
// }
