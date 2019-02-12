import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { AlarmImageSet } from '../alarm/alarm.component';
import { Alarm, Value, OperationalMode } from '../../data/alarm';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { AnimationEvent } from '@angular/animations';

@Component({
  selector: 'app-alarm-tile',
  templateUrl: './alarm-tile.component.html',
  styleUrls: ['./alarm-tile.component.scss'],
  animations: [
    trigger('blinkAnimation', [
      state(
        'highlighted', style({opacity: '0.45'})
      ),
      state(
        'normal', style({opacity: '0.0'})
      ),
      transition('highlighted => normal', [
          animate('1.0s linear')
        ]),
      transition(
        'normal => highlighted',
        [
          animate('1.0s 0.25s linear', style({opacity: '0.45'})),
          animate('1.0s 0.25s linear', style({opacity: '0.0'})),
          animate('1.0s 0.25s linear', style({opacity: '0.45'})),
          animate('1.0s 0.25s linear', style({opacity: '0.0'})),
          animate('1.0s 0.25s linear', style({opacity: '0.45'})),
          animate('1.0s 0.25s linear', style({opacity: '0.0'})),
          animate('1.0s 0.25s linear', style({opacity: '0.45'})),
          animate('1.0s 0.25s linear', style({opacity: '0.0'})),
          animate('1.0s 0.25s linear', style({opacity: '0.45'})),
        ])
    ])
  ]
})
export class AlarmTileComponent implements OnChanges, OnInit {

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
   * Defines the direction of the tooltip
   */
  @Input() disableBlinking = false;

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

  constructor() {
    this.targetAnimationState = 'normal';
  }

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

  ngOnChanges(changes: SimpleChanges) {
    if (this.alarm) {
      if (changes.alarm.previousValue) {
        const previousAlarmValue: number = changes.alarm.previousValue.value;
        const currentAlarmValue: number = changes.alarm.currentValue.value;
        if ( (previousAlarmValue === 0) && (currentAlarmValue > 0) ) {
          if (this.disableBlinking === false) {
            this.startBlinking();
          }
        }
      }
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
  * Method to start the blinking animation
  */
  public startBlinking(): void {
    const prevAnimationState = this.targetAnimationState;
    if (prevAnimationState === 'normal') {
      this.targetAnimationState = 'highlighted';
    }
    // console.log('Starting animation from:', prevAnimationState, 'to:', this.targetAnimationState);
  }


  /**
  * Method to follow the start of the animation
  */
  public captureStartEvent(event: AnimationEvent): void {

    // console.log('Animation started');
    // console.log('From:', event.fromState);
    // console.log('To:', event.toState);
  }

  /**
  * Method to follow the end of the animation
  */
  public captureDoneEvent(event: AnimationEvent): void {

    // console.log('Animation ended');
    // console.log('From:', event.fromState);
    // console.log('To:', event.toState);

    if ( (this.targetAnimationState !== 'normal') && (this.targetAnimationState === event.toState) ) {
      this.targetAnimationState = 'normal';
    }

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
    return result;
  }


}
