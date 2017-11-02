export class Alarm {
  pk: number;
  value: number;
  core_id: string;
  running_id: string;
  mode: string;
  core_timestamp: number;

  constructor(values: Object = {}){
    Object.assign(this, values)
  }

  static isValidAlarm(json: any): boolean {
    return (
      // json.hasOwnProperty("id") &&
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
    let pk = <number>json['id'];
    let value = <string>json['value'];
    let core_id = <string>json['core_id'];
    let running_id = <string>json['running_id'];
    let mode = <string>json['mode'];
    let core_timestamp = <number>json['core_timestamp'];
    return new Alarm({ pk, value, core_id, running_id, mode, core_timestamp });
  }
}
