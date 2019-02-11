import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { AlarmImageSet } from '../alarm/alarm.component';
import { Alarm } from '../../data/alarm';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-alarm-tile',
  templateUrl: './alarm-tile.component.html',
  styleUrls: ['./alarm-tile.component.scss'],
  animations: [
    trigger('blinkAnimation', [
      state('highlight', style({backgroundColor: 'rgba(255, 0, 0, 0.0)'})),
      state('normal', style({backgroundColor: 'rgba(255, 0, 0, 0.0)'})),
      transition('highlight => normal', [animate('1s')]),
      transition(
        'normal => highlight',
        [
          animate('2s ease-in', style({backgroundColor: 'rgba(255, 0, 0, 0.0)'})),
          animate('2s ease-out', style({backgroundColor: 'rgba(255, 0, 0, 1.0)'})),
          animate('2s ease-in', style({backgroundColor: 'rgba(255, 0, 0, 0.0)'})),
          animate('2s ease-out', style({backgroundColor: 'rgba(255, 0, 0, 1.0)'})),
          animate('2s ease-in', style({backgroundColor: 'rgba(255, 0, 0, 0.0)'})),
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
   * Auxiliary variable to follow the state of the related alarm
   */
  oldAlarmValue = null;

  /**
   * Auxiliary variable to follow the state of the related alarm
   */
  triggerBlink = false;

  constructor() { }

  ngOnInit() { }

  ngOnChanges() {
    if (this.alarm) {
      if (this.alarm.value > 0) {
        this.triggerBlink = true;
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

}
