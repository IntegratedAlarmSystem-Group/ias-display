import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AlarmImageSet } from '../alarm/alarm.component';
import { Alarm, Value, OperationalMode } from '../../data/alarm';


/**
 * Component used to display alarms as tiles in the overview
 */
@Component({
  selector: 'app-alarm-tile',
  templateUrl: './alarm-tile.component.html',
  styleUrls: ['./alarm-tile.component.scss'],
})
export class AlarmTileComponent implements OnInit {

  /**
  * Alarm object associated to the component
  */
  @Input() alarm: Alarm;

  /**
  * Image set related to the alarm
  */
  @Input() images: AlarmImageSet;

  /**
  * Image set related to unrealiable states for the alarm
  */
  @Input() imagesUnreliable: AlarmImageSet;

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
   * Defines the size of the component, can be either of the options defined by {@link sizeOptions}
   */
  @Input() size = 'md';

  /**
   * Defines the direction of the tooltip
   */
  @Input() tooltipDirection = 'right';

  /**
   * Variable to disable animation
   */
  @Input() disableAnimation = false;

  /**
   * Auxiliary variable to follow the status of the animation
   */
  targetAnimationState: string;

  /**
  * Size options
  */
  sizeOptions = ['xs', 'sm', 'md', 'lg'];

  /**
  * Show badges options
  */
  showBadgesOptions = [true, false];

  /**
  * Tooltip Direction Options
  */
  tooltipDirectionOptions = ['right', 'left'];

  /**
  * Builds a new instance
  * @param {ChangeDetectorRef} cdRef Used for change detection in html
  */
  constructor(
    private cdRef: ChangeDetectorRef
  ) {
    this.targetAnimationState = 'normal';
  }

  /**
  * Executed when the component is initiating
  */
  ngOnInit() {
    if (this.sizeOptions.indexOf(this.size) < 0) {
      this.size = 'md';
    }
    if (this.showBadgesOptions.indexOf(this.showActionBadges) < 0) {
      this.showActionBadges = true;
    }
    if (this.tooltipDirectionOptions.indexOf(this.tooltipDirection) < 0) {
      this.tooltipDirection = 'right';
    }
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
  * Function executed to change the blinking state according to a boolean parameter
  * It is executed when the inner {@link AlarmBlinkComponent} emits a value on its
  * {@link AlarmBlinkComponent#blinkingStatus} {@link EventEmitter}
  * @param {boolean} blinking true if it should blink, false if not
  */
  public changeBlinkingState(blinking: boolean) {
    if (this.disableAnimation) {
      return;
    }
    if (blinking) {
      this.targetAnimationState = 'highlight';
    } else {
      this.targetAnimationState = 'normal';
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
      result.push('alarm-tile-blue');
      result.push('alarm-tile-unreliable');
      return result;
    }
    if (this.alarm.shelved === true) {
      result.push('alarm-tile-green');
    } else if (this.alarm.mode === OperationalMode.unknown) {
      result.push('alarm-tile-blue');
    } else if (this.alarm.showAsMaintenance()) {
      result.push('alarm-tile-gray');
    } else if (this.alarm.value === Value.cleared) {
      result.push('alarm-tile-green');
    } else if (this.alarm.value === Value.set_low) {
      result.push('alarm-tile-yellow');
    } else if (this.alarm.value === Value.set_medium) {
      result.push('alarm-tile-yellow');
    } else if (this.alarm.value === Value.set_high) {
      result.push('alarm-tile-red');
    } else if (this.alarm.value === Value.set_critical) {
      result.push('alarm-tile-red');
    } else {
      result.push('alarm-tile-blue');
    }
    if (this.alarm.validity === 0 && this.alarm.shelved !== true) {
      result.push('alarm-tile-unreliable');
    }
    if (this.targetAnimationState === 'highlight') {
      result.push('highlight');
    } else {
      result.push('normal');
    }
    return result;
  }


}
