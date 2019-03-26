import { SimpleChange } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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

  describe('when transitioning from Clear to any of the Set states,', () => {
    it('it should start blinking', () => {
      for (const a of MockAlarms.slice(1, 5)) {
        // Arrange
        const alarm0 = Object.assign({}, MockAlarms[0]);
        const alarm1 = Object.assign({}, a);
        alarm1.value_change_timestamp = (new Date).getTime();
        alarm1.state_change_timestamp = (new Date).getTime();
        const previousStartCalls = spyStartAnimation.calls.count();
        const previousStopCalls = spyStopAnimation.calls.count();
        // Act
        component.alarm = alarm1;
        fixture.detectChanges();
        component.ngOnChanges({
          'alarm': new SimpleChange(alarm0, alarm1, false)
        });
        // Assert
        fixture.detectChanges();
        expect(component).toBeTruthy();
        expect(spyStartAnimation.calls.count()).toEqual(previousStartCalls + 1);
        expect(spyStopAnimation.calls.count()).toEqual(previousStopCalls);
      }
    });
  });

  describe('when transitioning from any of the Set states to Clear,', () => {
    it('it should stop blinking', () => {
      for (const a of MockAlarms.slice(1, 5)) {
        // Arrange
        const alarm0 = Object.assign({}, a);
        const alarm1 = Object.assign({}, MockAlarms[0]);
        alarm1.value_change_timestamp = (new Date).getTime();
        alarm1.state_change_timestamp = (new Date).getTime();
        const previousStartCalls = spyStartAnimation.calls.count();
        const previousStopCalls = spyStopAnimation.calls.count();
        // Act
        component.alarm = alarm1;
        fixture.detectChanges();
        component.ngOnChanges({
          'alarm': new SimpleChange(alarm0, alarm1, false)
        });
        // Assert
        fixture.detectChanges();
        expect(component).toBeTruthy();
        expect(spyStartAnimation.calls.count()).toEqual(previousStartCalls);
        expect(spyStopAnimation.calls.count()).toEqual(previousStopCalls + 1);
      }
    });
  });

  describe('when transitioning from any of the Set states to another of the Set states,', () => {
    it('it should start blinking', () => {
      for (const a of MockAlarms.slice(1, 5)) {
        // Arrange
        for (const b of MockAlarms.slice(1, 5)) {

          if (a === b) {
            continue;
          }
          const alarm0 = Object.assign({}, a);
          const alarm1 = Object.assign({}, b);
          alarm1.value_change_timestamp = (new Date).getTime();
          alarm1.state_change_timestamp = (new Date).getTime();
          const previousStartCalls = spyStartAnimation.calls.count();
          const previousStopCalls = spyStopAnimation.calls.count();
          // Act
          component.alarm = alarm1;
          fixture.detectChanges();
          component.ngOnChanges({
            'alarm': new SimpleChange(alarm0, alarm1, false)
          });
          // Assert
          fixture.detectChanges();
          expect(component).toBeTruthy();
          expect(spyStartAnimation.calls.count()).toEqual(previousStartCalls + 1);
          expect(spyStopAnimation.calls.count()).toEqual(previousStopCalls);
        }
      }
    });
  });

  describe('when receiving a change but no transitioning the alarm value,', () => {
    it('it should not start nor stop blinking', () => {
      for (const a of MockAlarms) {
        // Arrange
        const alarm0 = Object.assign({}, a);
        const alarm1 = Object.assign({}, a);
        alarm1.value_change_timestamp = (new Date).getTime();
        alarm1.state_change_timestamp = (new Date).getTime();
        const previousStartCalls = spyStartAnimation.calls.count();
        const previousStopCalls = spyStopAnimation.calls.count();
        // Act
        component.alarm = alarm1;
        fixture.detectChanges();
        component.ngOnChanges({
          'alarm': new SimpleChange(alarm0, alarm1, false)
        });
        // Assert
        fixture.detectChanges();
        expect(component).toBeTruthy();
        expect(spyStartAnimation.calls.count()).toEqual(previousStartCalls);
        expect(spyStopAnimation.calls.count()).toEqual(previousStopCalls);
      }
    });
  });

});
