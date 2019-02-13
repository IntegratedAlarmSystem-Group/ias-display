import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { AlarmImageSet } from '../alarm/alarm.component';
import { Alarm, Value, OperationalMode } from '../../data/alarm';
import {
  animation,
  useAnimation,
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';
import { AnimationEvent } from '@angular/animations';


/**
 * Normal opacity for the background to highlight the tile
 */
const normalStateOpacity = 0.0;

/**
 * Highlighted state opacity for the tile when a set alarm arrives
 */
const highlightedStateOpacity = 0.45;

/**
 * Main transition setup
 */
export const normalToHiglightedAnimation = animation([
    animate(
      '{{ time }} {{ delay }} {{ ease }}',
      keyframes([
        style({opacity: '{{ hide }}'}),
        style({opacity: '{{ show }}'}),
        style({opacity: '{{ hide }}'}),
        style({opacity: '{{ show }}'}),
        style({opacity: '{{ hide }}'}),
        style({opacity: '{{ show }}'}),
        style({opacity: '{{ hide }}'}),
        style({opacity: '{{ show }}'}),
        style({opacity: '{{ hide }}'}),
        style({opacity: '{{ show }}'}),
        style({opacity: '{{ hide }}'}),
      ]))
  ],
  {
    params: {
      time: '10s',
      delay: '0.25s',
      show: highlightedStateOpacity,
      hide: normalStateOpacity,
      ease: 'linear'
    }
  }
);

/**
 * Component animations setup
 */
export const animations = [
  trigger(
    'tileAnimation',
    [
      state('highlighted', style({opacity: `${highlightedStateOpacity}`})),
      state('normal', style({opacity: `${normalStateOpacity}`})),
      transition('highlighted => normal', []),
      transition(
        'normal => highlighted',
        [useAnimation(normalToHiglightedAnimation)]
      )
    ]
  )
];

/**
 * Component used to display alarms as tiles in the overview
 */
@Component({
  selector: 'app-alarm-tile',
  templateUrl: './alarm-tile.component.html',
  styleUrls: ['./alarm-tile.component.scss'],
  animations: animations
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
          if (this.disableAnimation === false) {
            this.startAnimation();
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
  public startAnimation(): void {
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
