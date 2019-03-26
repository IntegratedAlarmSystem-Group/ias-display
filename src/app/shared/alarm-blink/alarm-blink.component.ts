import { Component, EventEmitter, OnInit, OnChanges, Input, Output, SimpleChanges } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { Alarm } from '../../data/alarm';

@Component({
  selector: 'app-alarm-blink',
  templateUrl: './alarm-blink.component.html',
  styleUrls: ['./alarm-blink.component.css']
})
export class AlarmBlinkComponent implements OnInit, OnChanges {

  /**
  * Alarm object associated to the component
  */
  @Input() alarm: Alarm;

  /**
  * Variable to enable animation
  */
  @Input() disableBlink = false;

  /** Event emitted to notify when the alarm should start or stop blinking */
  @Output() blinkingStatus = new EventEmitter<boolean>();

  /**
  * Blinking timer
  */
  public blinkingTimer: any;

  /**
  * Maximum blikining time in miliseconds
  */
  maxBlinkInterval = 10000;

  /**
  * Builds a new instance
  */
  constructor(
  ) { }

  /**
  * Executed when the component is initiating
  */
  ngOnInit() {
  }

  /**
  * Method to handle the changes on the alarm values
  * @param {SimpleChanges} changes Object containing the changes in the Inouts of the component
  */
  ngOnChanges(changes: SimpleChanges) {
    if (this.disableBlink) {
      return;
    }

    if (this.alarm) {
      if (this.alarm.shelved) {
        return;
      }
      const currentTime = (new Date).getTime();
      const lastChange = this.alarm.value_change_timestamp;
      const timeDiff = currentTime - lastChange;
      let blinkInterval = this.maxBlinkInterval;

      if ( timeDiff >= 0) {
        blinkInterval = this.maxBlinkInterval - timeDiff;
        if (blinkInterval <= 0) {
          return;
        }
      }

      let previousAlarmValue = 0;
      let currentAlarmValue: number = this.alarm.value;
      let previousAlarmAck = false;
      let currentAlarmAck: boolean = this.alarm.ack;

      if (changes.alarm.previousValue) {
        previousAlarmValue = changes.alarm.previousValue.value;
        currentAlarmValue = changes.alarm.currentValue.value;
        previousAlarmAck = changes.alarm.previousValue.ack;
        currentAlarmAck = changes.alarm.currentValue.ack;
      }

      // unack to ack
      if ( !previousAlarmAck  && currentAlarmAck ) {
        this.stopAnimation();
        return;
      }

      // set to clear transition
      if ( (previousAlarmValue > 0) && (currentAlarmValue === 0) ) {
        this.stopAnimation();
        return;
      }
      // clear to set transition
      if ( (previousAlarmValue === 0) && (currentAlarmValue > 0) ) {
        this.startAnimation(blinkInterval);
        return;
      }
      // set to different priority transition
      if ( (previousAlarmValue > 0) && (currentAlarmValue > 0) && (previousAlarmValue !== currentAlarmValue)) {
        this.startAnimation(blinkInterval);
        return;
      }
    }
  }

  /**
  * Method to start the blinking animation
  * @param {number} blinkTime the time in milliseconds for which the alarm should blink
  */
  public startAnimation(blinkTime: number): void {
    this.blinkingStatus.emit(true);
    this.blinkingTimer = this._startTimer(blinkTime).subscribe( () => {
      this.stopAnimation();
    });
    // this.blinkingTimer = interval(blinkTime).subscribe( () => {
    //   this.stopAnimation();
    // });
  }


  /**
  * Method to go to the normal state to stop the animation
  */
  public stopAnimation(): void {
    this.blinkingStatus.emit(false);
    this._stopTimer();
    // this.blinkingTimer.unsubscribe();
  }

  /**
  * Internal method to start the timer for the animation
  * @param {number} time the time in milliseconds after which the timer should finish
  */
  _startTimer(time: number): Observable<any> {
    return interval(time);
  }

  /**
  * Internal method to stop (unsubscribe from) the timer
  */
  _stopTimer(): void {
    if (this.blinkingTimer) {
      this.blinkingTimer.unsubscribe();
    }
  }
}
