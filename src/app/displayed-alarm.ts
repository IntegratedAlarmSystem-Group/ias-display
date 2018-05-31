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
    return this._alarm.getValueAsString();
  }

  toStringForFiltering(): string {
    return [
      this.status, this.description, this.name, this.mode, this.timestamp
    ].join(" ");
  }
}
