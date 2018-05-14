export enum OperationalMode {
  startup = 0,
  initialization = 1,
  closing = 2,
  shuttedown = 3,
  maintenance = 4,
  operational = 5,
  degraded = 6,
  unknown = 7,
};

export enum Validity {
  unreliable = 0,
  reliable = 1
};


/**
* Class to define Alarm objects
*/
export class Alarm {

  /**
  * Value that represents the state of the {@link Alarm}.
  * Can be either 0 (CLEARED) or 1 (SET)
  */
  value: number;

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

  /** Acknowledgement message */
  ack: boolean;

  /** List of core_id's of dependent alarms **/
  dependencies: string[];

  /**
  * The "constructor"
  *
  * @param {Object} attributes a dictionary containing the attributes to
  * create the object
  */
  constructor(attributes: Object = {}){
    Object.assign(this, attributes)
  }

  /**
  * Class method that checks if an object corresponds to an Alarm object
  *
  * @param {any} json the object to check
  * @returns {boolean} true if it is an {@link Alarm}, false if not
  */
  static isValidAlarm(json: any): boolean {
    return (
      json.hasOwnProperty("value") &&
      json.hasOwnProperty("core_id") &&
      json.hasOwnProperty("running_id") &&
      json.hasOwnProperty("mode") &&
      json.hasOwnProperty("core_timestamp") &&
      json.hasOwnProperty("validity") &&
      json.hasOwnProperty("ack") &&
      json.hasOwnProperty("dependencies")
    );
  }

  /**
  * Class method that receives an object and returns copy as an {@link Alarm}
  *
  * @param {any} json the object to convert to an Alarm
  * @param {number} pk the primary key of the Alarm in the database
  */
  static asAlarm(json: any): Alarm {
    if (!this.isValidAlarm(json)) {
      return null;
    }
    let value = <string>json['value'];
    let core_id = <string>json['core_id'];
    let running_id = <string>json['running_id'];
    let mode = <number>json['mode'];
    let core_timestamp = <number>json['core_timestamp'];
    let validity = <number>json['validity'];
    let ack = <boolean>json['ack'];
    let dependencies = <string[]>json['dependencies'];
    return new Alarm({ value, core_id, running_id, mode, core_timestamp,
      validity, ack, dependencies });
  }

  /**
  * Acknowledges the {@link Alarm} and returns the acknowledge message
  *
  * @param {message} string string message of the acknowledgement
  *
  * @returns {string} a the acknowledgement message
  */
  acknowledge(): boolean {
    this.ack = true;
    return this.ack
  }

  /**
  * Returns a string representation of the {@link Alarm.mode} attribute
  *
  * @returns {string} a string representation of the operational mode of the Alarm
  */
  getModeAsString(): string {
    return OperationalMode[this.mode];
  }

  /**
  * Returns a string representation of the {@link Alarm.value} attribute
  *
  * @returns {string} a string representation of the value of the Alarm
  */
  getValueAsString(): string {
    if (this.value == 0){
      return 'Cleared';
    }
    else {
      return 'Set';
    }
  }

  /**
  * Returns a string representation of the {@link Alarm.mode} attribute
  *
  * @returns {string} a string representation of the validity of the Alarm
  */
  getValidityAsString(): string {
    return Validity[this.validity];
  }

  /**
  * Returns a Date representation of the {@link Alarm.mode} attribute
  *
  * @returns {Date} a date format representation of the Alarm core_timestamp
  */
  getCoreTimestampAsDate(): Date {

    let ts = this.core_timestamp;
    let date: Date = new Date(ts);

    return date;
  }

}
