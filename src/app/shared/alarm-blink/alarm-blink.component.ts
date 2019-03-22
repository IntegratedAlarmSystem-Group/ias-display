import { Component, EventEmitter, OnInit, OnChanges, Input, Output, SimpleChanges } from '@angular/core';
import { interval } from 'rxjs';
import { Alarm, Value, OperationalMode } from '../../data/alarm';

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
   * Variable to enable animation
   */
  @Input() disableAnimation = false;

  /**
  * Builds a new instance
  */
  constructor() { }

  /**
  * Executed when the component is initiating
  */
  ngOnInit() {
  }

  /**
  * Method to handle the changes on the alarm values
  */
  ngOnChanges(changes: SimpleChanges) {
    if (this.disableAnimation) {
      return;
    }

    if (this.alarm) {
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

      if (changes.alarm.previousValue) {
        previousAlarmValue = changes.alarm.previousValue.value;
        currentAlarmValue = changes.alarm.currentValue.value;
      }

      // clear to set transition
      if ( (previousAlarmValue === 0) && (currentAlarmValue > 0) ) {
        this.startAnimation(blinkInterval);
      }
      // set to clear transition
      if ( (previousAlarmValue > 0) && (currentAlarmValue === 0) ) {
        this.stopAnimation();
      }
    }
  }

  /**
  * Method to start the blinking animation
  */
  public startAnimation(blinkTime: number): void {
    console.log('Starting animation for: ', blinkTime);
    this.blinkingStatus.emit(true);
    this.blinkingTimer = interval(blinkTime).subscribe( () => {
      this.stopAnimation();
    });
  }

  /**
  * Method to go to the normal state to stop the animation
  */
  public stopAnimation(): void {
    this.blinkingStatus.emit(false);
  }

}
