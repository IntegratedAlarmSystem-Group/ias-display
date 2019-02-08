import { Component, OnInit, Input } from '@angular/core';
import { Alarm, Value, OperationalMode } from '../../data/alarm';

/**
 * Component used to display alarms as cards with text support for the
 * priority of the alarm
 */
@Component({
  selector: 'app-alarm-card',
  templateUrl: './alarm-card.component.html',
  styleUrls: ['./alarm-card.component.scss']
})
export class AlarmCardComponent implements OnInit {

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
   * Builds an instance of the component
   */
  constructor() { }

  /**
   * Method executed when the component is initiated
   */
  ngOnInit() {
  }

  /**
  * Defines the CSS classes to use depending on the Alarm status
  * @returns {string[]} array with names of the classes to use
  */
  getClass(): string[] {
    const result = [];
    if (!this.alarm) {
      result.push('alarm-card-blue');
      result.push('alarm-card-unreliable');
      return result;
    }
    if (this.alarm.shelved === true) {
      result.push('alarm-card-green');
    } else if (this.alarm.mode === OperationalMode.unknown) {
      result.push('alarm-card-blue');
    } else if (this.alarm.showAsMaintenance()) {
      result.push('alarm-card-gray');
    } else if (this.alarm.value === Value.cleared) {
      result.push('alarm-card-green');
    } else if (this.alarm.value === Value.set_low) {
      result.push('alarm-card-yellow');
    } else if (this.alarm.value === Value.set_medium) {
      result.push('alarm-card-yellow');
    } else if (this.alarm.value === Value.set_high) {
      result.push('alarm-card-red');
    } else if (this.alarm.value === Value.set_critical) {
      result.push('alarm-card-red');
    } else {
      result.push('alarm-card-blue');
    }
    if (this.alarm.validity === 0 && this.alarm.shelved !== true) {
      result.push('alarm-card-unreliable');
    }
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

  /**
  * Returns a string related to the name of the alarm priority
  * @returns {string} alarm prioritity name for the display
  */
  getPriorityText(): string {
    const alarmValue: string = this.alarm.alarmValue;
    const priorityText: string = alarmValue
      .replace('cleared', '')
      .replace('set_', '');
    return priorityText;
  }

}
