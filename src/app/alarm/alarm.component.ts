import { Component, Input, OnInit } from '@angular/core';
import { Alarm, Value, OperationalMode } from '../alarm';

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

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.css']
})
export class AlarmComponent implements OnInit {

  /**
   * Alarm object associated to the component
   */
  @Input() alarm: Alarm;

  /**
   * Set of names for the images to use
   */
  @Input() images: AlarmImageSet;

  /**
   * Set of names for the images to use for unreliable states
   */
  @Input() imagesUnreliable: AlarmImageSet;

  /**
  * Instantiates the component
  */
  constructor() { }

  ngOnInit() {
  }

  /**
  * Returns the URL of the current image to use depending on the Alarm status
  */
  getImage(): string {
    if (!this.alarm) {
      return this.images.unknown;
    } else if (this.alarm.mode === OperationalMode.unknown) {
      return this.images.unknown;
    } else if (this.alarm.mode === OperationalMode.maintenance || this.alarm.mode === OperationalMode.shuttedown) {
      return this.images.maintenance;
    } else if (this.alarm.value === Value.cleared) {
      return this.images.clear;
    } else if (this.alarm.value === Value.set_low) {
      return this.images.set_low;
    } else if (this.alarm.value === Value.set_medium) {
      return this.images.set_medium;
    } else if (this.alarm.value === Value.set_high) {
      return this.images.set_high;
    } else if (this.alarm.value === Value.set_critical) {
      return this.images.set_critical;
    }
  }

}
