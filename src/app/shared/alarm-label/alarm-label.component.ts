import { Component, OnInit, Input } from '@angular/core';
import { Alarm, Value } from '../../data/alarm';


/**
 * Component used to display a label related to the alarm priority
 */
@Component({
  selector: 'app-alarm-label',
  templateUrl: './alarm-label.component.html',
  styleUrls: ['./alarm-label.component.scss']
})
export class AlarmLabelComponent implements OnInit {

  /**
  * Alarm object associated to the component
  */
  @Input() alarm: Alarm;

  /**
  * Size options
  */
  @Input() size = 'md';

  /**
  * Defines if the priority text should be displayed (if set state for the alarm)
  */
  @Input() showText = true;

  /**
   * Defines the direction of the label
   */
  @Input() noPadding = false;

  /**
  * Show text options
  */
  showTextOptions = [true, false];

  /**
  * Padding Options
  */
  noPaddingOptions = [true, false];

  /**
  * Size Options
  */
  sizeOptions = ['xs', 'sm', 'md', 'lg'];

  /**
  * Builds a new instance
  */
  constructor() { }

  /**
  * Executed when the component is initiating
  */
  ngOnInit() {
    if (this.showTextOptions.indexOf(this.showText) < 0) {
      this.showText = true;
    }
    if (this.showTextOptions.indexOf(this.showText) < 0) {
      this.noPadding = false;
    }
    if (this.sizeOptions.indexOf(this.size) < 0) {
      this.size = 'md';
    }
  }

  /**
  * Returns a string related to the name of the alarm priority
  * @returns {string} alarm prioritity name for the display
  */
  getPriorityText(): string {
    const alarmValue: string = this.alarm.alarmValue;
    const priorityText: string = alarmValue
      .replace('set_', '');
    return priorityText.toUpperCase();
  }

  /**
  * Defines the CSS classes to use depending on the Alarm status
  * @returns {string[]} array with names of the classes to use
  */
  getClass(): string[] {
    const result = [];
    if (!this.alarm) {
      result.push('hide-label');
      return result;
    }
    if (this.alarm.shelved === true) {
      result.push('alarm-label-clear');
    } else if (this.alarm.value === Value.cleared) {
      result.push('alarm-label-clear');
    } else if (this.alarm.value === Value.set_low) {
      result.push('alarm-label-low');
    } else if (this.alarm.value === Value.set_medium) {
      result.push('alarm-label-medium');
    } else if (this.alarm.value === Value.set_high) {
      result.push('alarm-label-high');
    } else if (this.alarm.value === Value.set_critical) {
      result.push('alarm-label-critical');
    }
    if (this.alarm.shelved === true || this.alarm.value === Value.cleared) {
      if (this.showText === true) {
        result.push('hide-label');
      }
    }
    if (this.alarm.validity === 0 && this.alarm.shelved !== true) {
      result.push('unreliable');
    }
    if (this.noPadding === true) {
      result.push('no-padding');
    }
    if (this.showText === false) {
      result.push('hide-text');
    }
    return result;
  }

  /**
  * Defines the CSS classes to use depending on the Alarm status
  * @returns {string[]} array with names of the classes to use
  */
  getPriorityTextClass(): string[] {
    const result = [];
    if (!this.alarm) {
      result.push('hide-text');
      return result;
    }
    if (this.showText === false) {
      result.push('hide-text');
    }
    return result;
  }

  /**
  * Defines the CSS classes to use depending on the Alarm status
  * @returns {string[]} array with names of the classes to use
  */
  getSizeClass(): string[] {
    const result = [];
    result.push('alarm-label-' + this.size);
    return result;
  }



}