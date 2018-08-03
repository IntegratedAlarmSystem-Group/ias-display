import { Component, OnInit, Input } from '@angular/core';
import { Alarm, Value, OperationalMode } from '../../data/alarm';

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

  constructor() { }

  ngOnInit() {
  }

  /**
  * Returns the URL of the current image to use depending on the Alarm status
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
    } else if (this.alarm.mode === OperationalMode.maintenance || this.alarm.mode === OperationalMode.shuttedown) {
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
    if (this.alarm.validity === 0) {
      result.push('unreliable');
    }
    return result;
  }

  showAsPendingAck(): boolean {
    return this.showActionBadges && this.alarm != null && !this.alarm.ack;
  }

  showAsShelved(): boolean {
    return this.showActionBadges && this.alarm != null && this.alarm.shelved;
  }

  getAlarmName(): string {
    const maxSize = 10;
    if (this.alarm) {
      if (this.alarm.core_id.length > maxSize) {
        return this.alarm.core_id.substring(0, maxSize) + '...';
      } else {
        return this.alarm.core_id;
      }
    }
  }

}
