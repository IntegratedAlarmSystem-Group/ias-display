import { Component, Input, OnInit } from '@angular/core';
import { Alarm, Value, OperationalMode } from '../../data/alarm';

/**
* Class that models the relation of image URLS and Alarm statuses, for displaying purposes
**/
export class AlarmImageSet {
  /** URL of the image to use for the "clear" Alarm value  */
  public clear: string;

  /** URL of the image to use for the "set_low" Alarm value  */
  public set_low: string;

  /** URL of the image to use for the "set_medium" Alarm value  */
  public set_medium: string;

  /** URL of the image to use for the "set_high" Alarm value  */
  public set_high: string;

  /** URL of the image to use for the "set_critical" Alarm value  */
  public set_critical: string;

  /** URL of the image to use for the "unknown" Alarm value  */
  public unknown: string;

  /** URL of the image to use for the "maintenance" Alarm value  */
  public maintenance: string;

  /** URL of the image to use for the "shelved" Alarm value  */
  public shelved: string;

  /**
  * Builds a new AlarmImageSet instance
  *
  * @param {Object} attributes a dictionary containing the attributes to
  * create the object
  */
  constructor(attributes: Object = {}) {
    Object.assign(this, attributes);
  }
}

/**
 * Component that represents an Alarm marker based on an icon, for displaying purposes
 */
@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.scss']
})
export class AlarmComponent implements OnInit {

  /**
   * Alarm object associated to the component
   */
  @Input() alarm: Alarm;

  /**
   * Alarm object associated to the component
   */
  @Input() text = '';

  /**
   * Set of names for the images to use
   */
  @Input() images: AlarmImageSet;

  /**
   * Set of names for the images to use for unreliable states
   */
  @Input() imagesUnreliable: AlarmImageSet;

  /**
   * Defines wether or not the component will display the action badges ("pending acknowledgement" and "alarm in shelf") besides the icon.
   * This value is "true" by default
   */
  @Input() showActionBadges = true;

  /**
   * Defines the size of the component, can be either of the options defined by {@link sizeOptions}
   */
  @Input() size = 'md';

  /**
   * Available sizes for the alarm componet
   */
  private sizeOptions = ['xs', 'sm', 'md', 'lg', 'status'];

  /**
  * Instantiates the component
  */
  constructor() { }

  /**
  * Executed when the component is initiating
  */
  ngOnInit() {
    if (this.sizeOptions.indexOf(this.size) < 0) {
      this.size = 'md';
    }
  }

  /**
   * Returns the style class name based on the optional input size. By default
   * the class is medium size.
   * @return {string} style class name
   */
  getClass(): string {
    return 'alarm-component-' + this.size;
  }

  /**
  * Returns the URL of the current image to use depending on the Alarm status
  * @return {string} url of the image
  */
  getImage(): string {
    if (!this.alarm) {
      return this.imagesUnreliable.unknown;
    }
    let imagesToUse = this.images;
    if (this.alarm.validity === 0) {
      imagesToUse = this.imagesUnreliable;
    }
    if (this.alarm.shelved === true) {
      return imagesToUse.shelved;
    } else if (this.alarm.mode === OperationalMode.unknown) {
      return imagesToUse.unknown;
    } else if (this.alarm.showAsMaintenance()) {
      return imagesToUse.maintenance;
    } else if (this.alarm.value === Value.cleared) {
      return imagesToUse.clear;
    } else if (this.alarm.value === Value.set_low) {
      return imagesToUse.set_low;
    } else if (this.alarm.value === Value.set_medium) {
      return imagesToUse.set_medium;
    } else if (this.alarm.value === Value.set_high) {
      return imagesToUse.set_high;
    } else if (this.alarm.value === Value.set_critical) {
      return imagesToUse.set_critical;
    } else {
      return this.imagesUnreliable.unknown;
    }
  }

  /**
  * Returns the class to be used to display the text
  * @return {string[]} list of css classes
  */
  getTextClass(): string[] {
    const textClass = ['text'];
    if (!this.alarm) {
      textClass.push('unreliable');
      textClass.push('unknown');
      return textClass;
    }
    if (this.alarm.validity === 0) {
      textClass.push('unreliable');
    } else {
      textClass.push('reliable');
    }
    if (this.alarm.shelved === true) {
      textClass.push('shelved');
    } else if (this.alarm.mode === OperationalMode.unknown) {
      textClass.push('unknown');
    } else if (this.alarm.showAsMaintenance()) {
      textClass.push('maintenance');
    } else if (this.alarm.value === Value.cleared) {
      textClass.push('clear');
    } else if (this.alarm.value === Value.set_low) {
      textClass.push('set-low');
    } else if (this.alarm.value === Value.set_medium) {
      textClass.push('set-medium');
    } else if (this.alarm.value === Value.set_high) {
      textClass.push('set-high');
    } else if (this.alarm.value === Value.set_critical) {
      textClass.push('set-critical');
    } else {
      textClass.push('unreliable');
      textClass.push('unknown');
    }
    return textClass;
  }

  /**
   * Check if the alarm must be displayed as a text alarm or as an icon alarm
   * @return {boolean} True if the {@link text}  {@link Input} is defined, false if not
   */
  isTextAlarm(): boolean {
    return this.text !== '';
  }

  /**
   * Check if the alarm must be displayed with the pending ack badge activated
   * @return {boolean} True if the pending ack must be activated, false if it must not
   */
  showAsPendingAck(): boolean {
    return this.showActionBadges && this.alarm != null && !this.alarm.ack && this.alarm.state_change_timestamp > 0;
  }

  /**
   * Check if the alarm must be displayed with the shelve badge activated
   * @return {boolean} True if the alarm is shelved, false if it is not
   */
  showAsShelved(): boolean {
    return this.showActionBadges && this.alarm != null && this.alarm.shelved;
  }
}
