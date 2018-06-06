import { Alarm, OperationalMode, Validity, Value } from './alarm';

/**
* Class that stores Alarm information for displaying purposes
*/
export class DisplayedAlarm {

  /** Internal reference to the {@link Alarm} to display*/
  private _alarm: Alarm;

  /** The short description associated to the {@link Alarm}*/
  private _description: string;

  /** The url for the documentation associated to the {@link Alarm}*/
  private _url: string;

  /**
  * Builds a new instance
  *
  * @param {Alarm} alarm the alarm to display
  * @param {string} description description of the alarm to display
  * @param {string} url url with documentation of the alarm to display
  */
  constructor(alarm: Alarm, description: string, url: string) {
    this._alarm = alarm;
    this._description = description;
    this._url = url;
  }

  /** Sets the reference to the {@link Alarm} to display*/
  set alarm(alarm: Alarm) {
    this._alarm = alarm;
  }

  /** Returns the instance of the {@link Alarm}
  * @returns {Alarm} the {@link Alarm}
  */
  get alarm(): Alarm {
    return this._alarm;
  }

  /** Reference to the short description associated to the {@link Alarm}*/
  set description(description: string) {
    this._description = description;
  }

  /** Returns the short description of the {@link Alarm}*/
  get description(): string {
    return this._description;
  }

  /** Reference to the url associated to the {@link Alarm}*/
  set url(url: string) {
    this._url = url;
  }

  /** Returns the url of the documentation for the {@link Alarm}*/
  get url(): string {
    return this._url;
  }

  /**
  * Returns the core_id of the {@link Alarm}*/
  get name(): string {
    return this._alarm.core_id;
  }

  /** Returns the operational mode of the {@link Alarm}*/
  get mode(): string {
    return this._alarm.getModeAsString();
  }

  /**
  * Returns the last change timestamp of the {@link Alarm}
  * @returns {Date} last change timestamp of the {@link Alarm}
  */
  get timestamp(): Date {
    return this._alarm.timestamp;
  }

  /**
  * Getter that returns the {@link Alarm} status tags, needed for the displaying of status
  * through instances of {@link StatusViewComponent}. Calls getAlarmStatusTagsString()
  * @returns {string} tags of the {@link Alarm} joined by "-"
  */
  get status(): string {
    return this.getAlarmStatusTagsString();
  }

  /**
  * Returns a string representation of the {@link Alarm} for filtering purposes
  * @returns {string} info of the {@link Alarm} for filtering purposes, joined by " "
  */
  toStringForFiltering(): string {
    return [
      this.status, this.description, this.name, this.mode, this.timestamp
    ].join(' ');
  }

  /**
  * Returns the {@link Alarm} status tags, needed for the displaying of status
  * through instances of {@link StatusViewComponent}
  * @returns {string} tags of the {@link Alarm} joined by "-"
  */
  getAlarmStatusTagsString(): string {
    const alarm = this._alarm;
    const value_tags = alarm.getValueAsString().split('_');
    const value = value_tags[0];
    const priority = value_tags[1];
    const validity = alarm.getValidityAsString();
    const ack = alarm.ack;
    const order = this.getAlarmStatusOrder(value, priority, validity, ack);

    const tags = [];
    tags.push(order);
    tags.push(alarm.getModeAsString());
    tags.push(value);
    if (priority !== undefined) {
      tags.push(priority);
    }
    tags.push(validity);
    if (alarm.ack) {
      tags.push('ack');
    }
    return tags.join('-');
  }

  /**
  * Returns a string with a number that defines the place where the {@link Alarm} should be displayed on the Table according to the
  * sorting by "Status" column
  *
  * @param {string} value string representation of the value of the {@link Alarm}
  * @param {string} priority string representation of the priority of the {@link Alarm}
  * @param {string} validity string representation of the validity of the {@link Alarm}
  * @param {boolean} ack the ack status of the {@link Alarm}
  * @returns {string} order for the {@link Alarm} in the Table
  */
  getAlarmStatusOrder(
    value: string, priority: string, validity: string, ack: boolean): string {
    let order = 0;
    const priorities = ['critical', 'high', 'medium', 'low'];

    // SET:
    if (value === 'set') {
      if (validity === 'reliable') {
        if (ack === false) {
          order = priorities.indexOf(priority);
        } else {
          order = 4 + priorities.indexOf(priority);
        }
      } else {
        if (ack === false) {
          order = 8 + priorities.indexOf(priority);
        } else {
          order = 12 + priorities.indexOf(priority);
        }
      }
    } else {
    // CLEARED:
      if (validity === 'reliable') {
        if (ack === false) {
          order = 16;
        } else {
          order = 17;
        }
      } else {
        if (ack === false) {
          order = 18;
        } else {
          order = 19;
        }
      }
    }
    if (order < 10) {
      return ('0' + order);
    } else {
      return ('' + order);
    }
  }
}
