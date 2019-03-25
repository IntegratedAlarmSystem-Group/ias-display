import { Component, Input, OnInit, OnChanges, ChangeDetectorRef } from '@angular/core';
import { AlarmTooltipComponent } from '../alarm-tooltip/alarm-tooltip.component';
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
export class AlarmComponent implements OnInit, OnChanges {

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
   * Defines wether or not the component will display the text of the label
   * with the alarm priority
   */
  @Input() labelMode = 'text';

  /**
   * Defines the size of the component, can be either of the options defined by {@link sizeOptions}
   */
  @Input() size = 'md';

  /**
   * Defines the direction of the tooltip
   */
  @Input() tooltipDirection = 'right';

  /**
   * Defines the direction of the label
   */
  @Input() labelLocation = 'right';

  /**
   * Variable to disable animation
   */
  @Input() disableBlink = false;

  blinkingClass = '';

  /**
   * Available sizes for the alarm componet
   */
  private sizeOptions = ['xs', 'sm', 'md', 'lg', 'status'];

  /**
   * Available locations for the label component
   */
  private labelLocationOptions = ['right', 'bottom'];

  /**
  * Builds a new instance
  * @param {ChangeDetectorRef} cdRef Used for change detection in html
  */
  constructor(
    private cdRef: ChangeDetectorRef
  ) {}

  /**
  * Executed when the component is initiating
  * Checks and corrects some of the components inputs
  */
  ngOnInit() {
    if (this.sizeOptions.indexOf(this.size) < 0) {
      this.size = 'md';
    }
    if (this.labelLocationOptions.indexOf(this.labelLocation) < 0) {
      this.labelLocation = 'right';
    }
  }

  /**
  * Executed when one of the component's inputs is changing
  */
  ngOnChanges() {
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
      console.log('Start blinking');
    } else {
      this.blinkingClass = '';
      console.log('Stop blinking');
    }
    this.cdRef.detectChanges();
  }

  /**
   * Returns the style class name based on the optional input size. By default
   * the class is medium size.
   * @return {string[]} style class name
   */
  getClass(): string[] {
    return ['alarm-component-' + this.size, this.blinkingClass];
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

  getCorrectedText(): string {
    return this.text.replace(' ', '&nbsp;');
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

  /**
   * Check if the alarm should display the priority text in the related label
   * @return {boolean} True if mode is 'text' else False
   */
   showPriorityLevelText(): boolean {
     if (this.labelMode === 'text') {
       return true;
     } else if (this.labelMode === 'line') {
       return false;
     } else {
       return false;
     }
   }

}
