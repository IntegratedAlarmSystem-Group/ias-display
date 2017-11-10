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

export class Alarm {
  pk: number;
  value: number;
  core_id: string;
  running_id: string;
  mode: OperationalMode;
  core_timestamp: number;

  constructor(values: Object = {}){
    Object.assign(this, values)
  }

  static isValidAlarm(json: any): boolean {
    return (
      json.hasOwnProperty("pk") &&
      json.hasOwnProperty("value") &&
      json.hasOwnProperty("core_id") &&
      json.hasOwnProperty("running_id") &&
      json.hasOwnProperty("mode") &&
      json.hasOwnProperty("core_timestamp")
    );
  }

  static asAlarm(json: any): Alarm {
    if (!this.isValidAlarm(json)) {
      return null;
    }
    let pk = <number>json['pk'];
    let value = <string>json['value'];
    let core_id = <string>json['core_id'];
    let running_id = <string>json['running_id'];
    let mode = <number>json['mode'];
    let core_timestamp = <number>json['core_timestamp'];
    return new Alarm({ pk, value, core_id, running_id, mode, core_timestamp });
  }

  getModeAsString(): string {
    return OperationalMode[this.mode];
  }

  getValueAsString(): string {
    if (this.value == 0){
      return 'Cleared';
    }
    else {
      return 'Set';
    }
  }
}
