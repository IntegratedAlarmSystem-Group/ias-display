import { SimpleChange } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of as observableOf } from 'rxjs';
import { AlarmBlinkComponent } from './alarm-blink.component';
import { MockAlarms } from './fixtures';

describe('AlarmBlinkComponent', () => {
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
        for (const b of MockAlarms.slice(1, 5)) {
          if (a === b) {
            continue;
          }
          // Arrange
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

  describe('if the alarm is shelved, when transitioning from any state to any state,', () => {
    it('it should not start blinking', () => {
      for (const a of MockAlarms) {
        for (const b of MockAlarms) {
          // Arrange
          const alarm0 = Object.assign({}, a);
          const alarm1 = Object.assign({}, b);
          alarm0.shelved = true;
          alarm1.shelved = true;
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
      }
    });
  });

  describe('when the alarm is acknowledged,', () => {
    it('it should stop blinking', () => {
      for (const a of MockAlarms.slice(1, 5)) {
        // Arrange
        const alarm0 = Object.assign({}, a);
        const alarm1 = Object.assign({}, a);
        alarm1.ack = true;
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

});


describe('AlarmBlinkComponent', () => {
  let component: AlarmBlinkComponent;
  let fixture: ComponentFixture<AlarmBlinkComponent>;
  let spyStartTimer: any;
  let spyStopTimer: any;
  let spyBlinkingStatus: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmBlinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmBlinkComponent);
    component = fixture.componentInstance;
    spyStartTimer = spyOn(component, '_startTimer').and.returnValue(observableOf({}));
    spyStopTimer = spyOn(component, '_stopTimer');
    spyBlinkingStatus = spyOn(component.blinkingStatus, 'emit');
    fixture.detectChanges();
  });

  it('should create', () => {
    component.alarm = MockAlarms[0];
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('when calling startAnimation,', () => {
    it('it should emit a true blinkingStatus and start the timer', () => {
      const previousStartCalls = spyStartTimer.calls.count();
      const previousStopCalls = spyStopTimer.calls.count();
      component.startAnimation(10000);
      fixture.detectChanges();
      expect(spyBlinkingStatus).toHaveBeenCalledWith(true);
      expect(spyStartTimer.calls.count()).toEqual(previousStartCalls + 1);
      expect(spyStopTimer.calls.count()).toEqual(previousStopCalls + 1); // Called in _startTimer callback
    });
  });

  describe('when calling stopAnimation,', () => {
    it('it should emit a false blinkingStatus and stop the timer', () => {
      const previousStartCalls = spyStartTimer.calls.count();
      const previousStopCalls = spyStopTimer.calls.count();
      component.stopAnimation();
      fixture.detectChanges();
      expect(spyBlinkingStatus).toHaveBeenCalledWith(false);
      expect(spyStartTimer.calls.count()).toEqual(previousStartCalls);
      expect(spyStopTimer.calls.count()).toEqual(previousStopCalls + 1);
    });
  });
});
