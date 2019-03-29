import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Alarm, Value } from '../../data/alarm';


/**
 * Component used to display a label related to the alarm priority
 */
@Component({
  selector: 'app-alarm-label',
  templateUrl: './alarm-label.component.html',
  styleUrls: ['./alarm-label.component.scss']
})
export class AlarmLabelComponent implements OnInit, OnChanges {

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
   * Defines the presentation of the label
   */
  @Input() fluidText = false;

  /**
   * Defines the presentation of the label
   */
  @Input() noPadding = false;

  /**
  * Show text options
  */
  showTextOptions = [true, false];

  /**
  * Show fluid text options
  */
  showFluidTextOptions = [true, false];

  /**
  * Padding Options
  */
  noPaddingOptions = [true, false];

  /**
  * Size Options
  */
  sizeOptions = ['xs', 'sm', 'md', 'lg'];

  /**
  * Contains the current classes for displaying the component.
  */
  currentClass = [];

  /**
  * Contains the current class for the for displaying size
  */
  currentSizeClass: string = null;

  /**
  * The text that will display the priority of the alarm
  */
  priorityText = '';

  /**
  * The class used to display the priority of the alarm
  */
  priorityTextClass = [];

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
    if (this.showFluidTextOptions.indexOf(this.fluidText) < 0) {
      this.fluidText = false;
    }
    if (this.noPaddingOptions.indexOf(this.noPadding) < 0) {
      this.noPadding = false;
    }
    if (this.sizeOptions.indexOf(this.size) < 0) {
      this.size = 'md';
      this.currentSizeClass = 'alarm-label-md';
    }
  }

  /**
  * Method to handle the changes on the inputs of the component
  * @param {SimpleChanges} changes Object containing the changes in the Inputs of the component
  */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.size && changes.size.previousValue !== changes.size.currentValue) {
      this.currentSizeClass = 'alarm-label-' + this.size;
    }
    if (changes.alarm && changes.alarm.previousValue !== changes.alarm.currentValue) {
      this.currentClass = this.getClass();
      this.priorityText = this.getPriorityText();
      this.priorityTextClass = this.getPriorityTextClass();
    }
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
  * Returns a string related to the name of the alarm priority
  * @returns {string} alarm prioritity name for the display
  */
  getPriorityText(): string {
    if ( !this.alarm ) {
      return '';
    }
    const alarmValue: string = this.alarm.alarmValue;
    const priorityText: string = alarmValue
      .replace('set_', '');
    return priorityText.toUpperCase();
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
    if (this.fluidText === true) {
      result.push('fluid-text');
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
