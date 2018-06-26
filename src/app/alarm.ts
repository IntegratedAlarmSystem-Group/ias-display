/**
* List of the possible Operational Modes
*/
export enum OperationalMode {
  startup = 0,
  initialization = 1,
  closing = 2,
  shuttedown = 3,
  maintenance = 4,
  operational = 5,
  degraded = 6,
  unknown = 7,
}

/**
* List of the possible Validity values
*/
export enum Validity {
  unreliable = 0,
  reliable = 1
}

/**
* List of the possible Values of an Alarm
*/
export enum Value {
  cleared = 0,
  set_low = 1,
  set_medium = 2,
  set_high = 3,
  set_critical = 4,
}

/**
* Class to define Alarm objects
*/
export class Alarm {

  /**
  * Value that represents the state of the {@link Alarm}.
  * Can be either 0 (CLEARED) or 1 (SET)
  */
  value: Value;

  /** Id used to identify the {@link Alarm} in the IAS Core */
  core_id: string;

  /** Id used to identify the {@link Alarm} and its parents in the IAS Core */
  running_id: string;

  /** Operational mode of the {@link Alarm} */
  mode: OperationalMode;

  /** Validity of the {@link Alarm} */
  validity: Validity;

  /** Timestamp at which the {@link Alarm} was generated by the IAS Core */
  core_timestamp: number;

  /** Timestamp at which the {@link Alarm} changed the state or the mode */
  state_change_timestamp: number;

  /** Acknowledgement status */
  ack: boolean;

  /** Acknowledgement status */
  shelved: boolean;

  /** List of core_id's of dependent alarms **/
  dependencies: string[];

  /**
  * Builds a new Alarm instance
  *
  * @param {Object} attributes a dictionary containing the attributes to
  * create the object
  */
  constructor(attributes: Object = {}) {
    Object.assign(this, attributes);
  }

  /**
  * Class method that checks if an object corresponds to an Alarm object
  *
  * @param {any} json the object to check
  * @returns {boolean} true if it is an {@link Alarm}, false if not
  */
  static isValidAlarm(json: any): boolean {
    return (
      json.hasOwnProperty('value') &&
      json.hasOwnProperty('core_id') &&
      json.hasOwnProperty('running_id') &&
      json.hasOwnProperty('mode') &&
      json.hasOwnProperty('core_timestamp') &&
      // json.hasOwnProperty('state_change_timestamp') &&
      json.hasOwnProperty('validity') &&
      json.hasOwnProperty('ack') &&
      json.hasOwnProperty('shelved') &&
      json.hasOwnProperty('dependencies')
    );
  }

  /**
  * Class method that receives an object and returns copy as an {@link Alarm}
  *
  * @param {any} json the object to convert to an Alarm
  * @param {number} pk the primary key of the Alarm in the database
  * @returns {Alarm} the object as an {@link Alarm} instance
  */
  static asAlarm(json: any): Alarm {
    if (!this.isValidAlarm(json)) {
      return null;
    }
    const value = <number>json['value'];
    const core_id = <string>json['core_id'];
    const running_id = <string>json['running_id'];
    const mode = <number>json['mode'];
    const core_timestamp = <number>json['core_timestamp'];
    const state_change_timestamp = <number>json['state_change_timestamp'];
    const validity = <number>json['validity'];
    const ack = <boolean>json['ack'];
    const shelved = <boolean>json['shelved'];
    const dependencies = <string[]>json['dependencies'];
    return new Alarm({ value, core_id, running_id, mode, core_timestamp,
      state_change_timestamp, validity, ack, shelved, dependencies });
  }

  /**
  * Returns a Date representation of the {@link Alarm.state_change_timestamp}
  * attribute
  *
  * @returns {Date} a date format representation of the Alarm
  * state_change_timestamp
  */
  get timestamp(): Date {
    return this.getStateChangeTimestampAsDate();
  }

  /**
  * Returns a Date representation of the timestamp of the last change of the Alarm
  *
  * @returns {Date} a date format representation of the {@link Alarm.state_change_timestamp} attribute
  */
  getStateChangeTimestampAsDate(): Date {
    const ts = this.state_change_timestamp;
    const date: Date = new Date(ts);
    return date;
  }

  /**
  * Acknowledges the {@link Alarm} and returns the acknowledge status
  *
  * @param {message} string string message of the acknowledgement
  *
  * @returns {boolean} a the acknowledgement status
  */
  acknowledge(): boolean {
    this.ack = true;
    return this.ack;
  }

  /**
  * Returns a string representation of the operational mode of the Alarm
  *
  * @returns {string} a string representation of the {@link Alarm.mode} attribute
  */
  getModeAsString(): string {
    return OperationalMode[this.mode];
  }

  /**
  * Returns a string representation of the value of the Alarm
  *
  * @returns {string} a string representation of the {@link Alarm.value} attribute
  */
  getValueAsString(): string {
    return Value[this.value];
  }

  /**
  * Returns a string representation of the validity of the Alarm
  *
  * @returns {string} a string representation of the {@link Alarm.mode} attribute
  */
  getValidityAsString(): string {
    return Validity[this.validity];
  }

  /**
  * Returns a Date representation of the core_timestamp of the Alarm
  *
  * @returns {Date} a date format representation of the {@link Alarm.core_timestamp} attribute
  */
  getCoreTimestampAsDate(): Date {

    const ts = this.core_timestamp;
    const date: Date = new Date(ts);

    return date;
  }

  /**
  * Shelves the {@link Alarm} and returns the shelve status
  *
  * @param {message} string string message of the shelving
  *
  * @returns {boolean} a the shelving message
  */
  shelve(): boolean {
    this.shelved = true;
    return this.shelved;
  }

  /**
  * Unshelves the {@link Alarm} and returns the shelve status
  *
  * @returns {boolean} a the shelving status
  */
  unshelve(): boolean {
    this.shelved = false;
    return this.shelved;
  }
}
