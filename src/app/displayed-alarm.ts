import { Alarm, OperationalMode, Validity, Value } from './alarm';

/**
* Class that stores Alarm information for displaying purposes
*/
export class DisplayedAlarm {

  /** Internal reference to the {@link Alarm} to display*/
  private _alarm: Alarm;

  /** The short description associated to the {@link Alarm}*/
  private _description: string

  /** The url for the documentation associated to the {@link Alarm}*/
  private _url: string

  /**
  * Builds a new instance
  *
  * @param {Alarm} alarm the alarm to display
  * @param {string} description description of the alarm to display
  * @param {string} url url with documentation of the alarm to display
  */
  constructor(alarm: Alarm, description: string, url: string){
    this._alarm = alarm;
    this._description = description;
    this._url = url;
  }

  /** Reference to the {@link Alarm} to display*/
  set alarm(alarm: Alarm) {
    this._alarm = alarm;
  }

  /** Returns the instance of the {@link Alarm}*/
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

  /** Returns the core_id of the {@link Alarm}*/
  get name(): string {
    return this._alarm.core_id;
  }

  /** Returns the operational mode of the {@link Alarm}*/
  get mode(): string {
    return this._alarm.getModeAsString();
  }

  /** Returns the last change timestamp of the {@link Alarm}*/
  get timestamp(): Date {
    return this._alarm.timestamp;
  }

  /** Returns the summarized status of the {@link Alarm}*/
  get status(): string {
    return this.getAlarmStatusTagsString();
  }

  /**
  * Returns a string representation of the {@link Alarm} for filtering purposes
  */
  toStringForFiltering(): string {
    return [
      this.status, this.description, this.name, this.mode, this.timestamp
    ].join(" ");
  }

  /**
  * Returns the {@link Alarm} status tags, needed for the displaying of status
  * through instances of {@link StatusViewComponent}
  */
  getAlarmStatusTagsString(): string {
    let alarm = this._alarm;
    let value_tags = alarm.getValueAsString().split('_');
    let value = value_tags[0];
    let priority = value_tags[1];
    let validity = alarm.getValidityAsString();
    let ack = alarm.ack;
    let order = this.getAlarmStatusOrder(value, priority, validity, ack);

    let tags = [];
    tags.push(order);
    tags.push(alarm.getModeAsString());
    tags.push(value);
    if (priority != undefined) {
      tags.push(priority);
    }
    tags.push(validity);
    if (alarm.ack){
      tags.push('ack');
    }
    return tags.join('-');
  }

  /**
  * Returns a string with a number that defines the place where
  * the {@link Alarm} should be displayed on the Table
  * according to the sorting by "Status" column
  *
   * @param {string} value string representation of the value of the {@link Alarm}
   * @param {string} priority string representation of the priority of the {@link Alarm}
   * @param {string} validity string representation of the validity of the {@link Alarm}
   * @param {boolean} ack the ack status of the {@link Alarm}
  */
  getAlarmStatusOrder(
    value: string, priority: string, validity: string, ack: boolean): string {
    let order = 0;
    let priorities = ['critical', 'high', 'medium', 'low'];

    // SET:
    if (value == 'set') {
      if (validity == 'reliable') {
        if (ack == false) {
          order = priorities.indexOf(priority);
        }
        else {
          order = 4 + priorities.indexOf(priority);
        }
      }
      else {
        if (ack == false) {
          order = 8 + priorities.indexOf(priority);
        }
        else {
          order = 12 + priorities.indexOf(priority);
        }
      }
    }
    // CLEARED:
    else {
      if (validity == 'reliable') {
        if (ack == false) {
          order = 16;
        }
        else {
          order = 17;
        }
      }
      else {
        if (ack == false) {
          order = 18;
        }
        else {
          order = 19;
        }
      }
    }
    if (order < 10) {
      return ("0" + order);
    }
    else {
      return ("" + order);
    }
  }
}
