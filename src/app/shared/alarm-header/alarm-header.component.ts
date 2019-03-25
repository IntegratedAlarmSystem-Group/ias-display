import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Alarm, Value, OperationalMode } from '../../data/alarm';

/**
 * Component used to display alarms as headers in a table or list
 */
@Component({
  selector: 'app-alarm-header',
  templateUrl: './alarm-header.component.html',
  styleUrls: ['./alarm-header.component.scss']
})
export class AlarmHeaderComponent implements OnInit {

  /**
  * Alarm object associated to the component
  */
  @Input() alarm: Alarm;

  /**
   * Defines wether or not the component will display the action badges ("pending acknowledgement" and "alarm in shelf") besides the icon.
   * This value is "true" by default
   */
  @Input() showActionBadges = true;

  /**
   * Defines the max size of the displayed alarm name. This value is 20 characters by default.
   */
  @Input() alarmNameMaxSize = 20;

  /**
   * Defines an optional alarm name to display. By default it is null and in that case the component use the alarm core_id.
   */
  @Input() optionalAlarmName = null;

  /**
   * Defines the direction of the tooltip
   */
  @Input() tooltipDirection = 'right';

  /**
   * Variable to disable animation
   */
  @Input() disableBlink = false;

  /**
  * Contains the name of the class to add for blinking, if the alarm should blink, otherwise its empty
  */
  blinkingClass = '';

  /**
  * Builds a new instance
  * @param {ChangeDetectorRef} cdRef Used for change detection in html
  */
  constructor(
    private cdRef: ChangeDetectorRef
  ) {}

  /**
   * Method executed when the component is initiated
   */
  ngOnInit() {
  }

  /**
  * Function executed to change the blinking state according to a boolean parameter
  * It is executed when the inner {@link AlarmBlinkComponent} emits a value on its
  * {@link AlarmBlinkComponent#blinkingStatus} {@link EventEmitter}
  * @param {boolean} blinking true if it should blink, false if not
  */
  public changeBlinkingState(blinking: boolean) {
    if (this.disableBlink) {
      return;
    }
    if (blinking) {
      this.blinkingClass = 'blinking';
    } else {
      this.blinkingClass = '';
    }
    this.cdRef.detectChanges();
  }

  /**
  * Defines the CSS classes to use depending on the Alarm status
  * @returns {string[]} array with names of the classes to use
  */
  getClass(): string[] {
    const result = [];
    if (!this.alarm) {
      result.push('blue');
      result.push('unreliable');
      return result;
    }
    if (this.alarm.shelved === true) {
      result.push('green');
    } else if (this.alarm.mode === OperationalMode.unknown) {
      result.push('blue');
    } else if (this.alarm.showAsMaintenance()) {
      result.push('gray');
    } else if (this.alarm.value === Value.cleared) {
      result.push('green');
    } else if (this.alarm.value === Value.set_low) {
      result.push('yellow');
    } else if (this.alarm.value === Value.set_medium) {
      result.push('yellow');
    } else if (this.alarm.value === Value.set_high) {
      result.push('red');
    } else if (this.alarm.value === Value.set_critical) {
      result.push('red');
    } else {
      result.push('blue');
    }
    if (this.alarm.validity === 0 && this.alarm.shelved !== true) {
      result.push('unreliable');
    }
    result.push(this.blinkingClass);
    return result;
  }

  /**
  * Defines wether or not the component should indicate that the alarm has a pending acknowledgement
  * @returns {boolean} true if the alarm has pending acknowledgement, false if not
  */
  showAsPendingAck(): boolean {
    return this.showActionBadges && this.alarm != null && !this.alarm.ack && this.alarm.state_change_timestamp > 0;
  }

  /**
  * Defines wether or not the component should indicate that the alarm is shelved
  * @returns {boolean} true if the alarm is shelved, false if not
  */
  showAsShelved(): boolean {
    return this.showActionBadges && this.alarm != null && this.alarm.shelved;
  }

  /**
  * Returns the name of the alarm that should be displayed in the header.
  * If the input {@link optionalAlarmName} is defined, this is the name that will be displayed
  * If not, the alarm ID is displayed
  * In any case, the name is shortened to a maximum length defined by the {@link alarmNameMaxSize}
  * @returns {string} name to display
  */
  getAlarmName(): string {
    let alarmName = '';
    if (this.optionalAlarmName) {
      alarmName = this.optionalAlarmName;
    } else if (this.alarm && !this.optionalAlarmName) {
        alarmName = this.alarm.core_id;
    }
    if (alarmName.length > this.alarmNameMaxSize) {
      alarmName = alarmName.substring(0, this.alarmNameMaxSize - 3) + '...';
    }
    return alarmName;
  }

}
