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
}
