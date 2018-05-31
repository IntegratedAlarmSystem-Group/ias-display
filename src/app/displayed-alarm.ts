import { Alarm, OperationalMode, Validity, Value } from './alarm';

/**
* Class to define Alarm objects
*/
export class DisplayedAlarm {

  /** Internal reference to the {@link Alarm} to display*/
  private _alarm: Alarm;

  /** The short description associated to the {@link Alarm}*/
  private _description: string

  /**
  * The "constructor"
  *
  * @param {Alarm} alarm the alarm to display
  */
  constructor(alarm: Alarm, description: string){
    this._alarm = alarm;
    this._description = description;
  }

  /** Reference to the {@link Alarm} to display*/
  set alarm(alarm: Alarm) {
    this._alarm = alarm;
  }

  /** Returns the instance of the {@link Alarm}*/
  get alarm(): Alarm {
    console.log('I am the getter ALARM:', this._alarm);
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

  toStringForFiltering(): string {
    return [
      this.status, this.description, this.name, this.mode, this.timestamp
    ].join(" ");
  }

  /**
  * Return Alarm status tags
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

  getAlarmStatusOrder(value: string, priority: string, validity: string, ack: boolean): string {
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

  getPriorityNumber(priority: string) {
    let priorities = ['critical', 'high', 'medium', 'low'];
    return priorities.indexOf(priority);
  }

  arrayHasElement(array, element) {
    return array.indexOf(element) > -1 ? true : false;
  }
}
