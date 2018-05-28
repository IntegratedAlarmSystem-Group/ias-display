import { DatePipe } from '@angular/common';
import { Alarm } from '../alarm';

let datepipe = new DatePipe('en');
let alarms_date = new Date(Date.parse("27 Feb 2010 06:34:00 GMT"));

export const MockIasios = [
  {
      io_id: "coreid$1",
      short_desc: "Alarm 1 description",
      ias_type: "ALARM"
  },
  {
      io_id: "coreid$2",
      short_desc: "Alarm 2 description",
      ias_type: "ALARM"
  },
  {
      io_id: "coreid$3",
      short_desc: "Alarm 3 description",
      ias_type: "ALARM"
  },
  {
      io_id: "coreid$4",
      short_desc: "Alarm 4 description",
      ias_type: "ALARM"
  },
];

export const MockAlarms = [
  {
    'value': 0,
    'core_id': 'coreid$1',
    'running_id': 'coreid$1',
    'mode': '0',
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': '1',
    'ack': false,
    'dependencies': [],
  },
  {
    'value': 2,
    'core_id': 'coreid$2',
    'running_id': 'coreid$2',
    'mode': '5',
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': '1',
    'ack': false,
    'dependencies': [],
  },
  {
    'value': 0,
    'core_id': 'coreid$3',
    'running_id': 'coreid$3',
    'mode': '7',
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': '0',
    'ack': false,
    'dependencies': [],
  },
  {
    'value': 2,
    'core_id': 'coreid$4',
    'running_id': 'coreid$4',
    'mode': '4',
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': '1',
    'ack': false,
    'dependencies': [],
  }
];

export const ExpectedTableRows = [
  { 'status': '2-maintenance-set-medium-reliable',
    'timestamp': datepipe.transform( alarms_date, "M/d/yy, h:mm:ss a"),
    'core_id': 'coreid$4',
    'mode': 'maintenance',
    'alarm': Alarm.asAlarm(MockAlarms[3]),
    'short_desc': 'Alarm 4 description',
  },
  { 'status': '2-operational-set-medium-reliable',
    'timestamp': datepipe.transform( alarms_date, "M/d/yy, h:mm:ss a"),
    'core_id': 'coreid$2',
    'mode': 'operational',
    'alarm': Alarm.asAlarm(MockAlarms[1]),
    'short_desc': 'Alarm 2 description',
  },
  { 'status': '16-startup-cleared-reliable',
    'timestamp': datepipe.transform( alarms_date, "M/d/yy, h:mm:ss a"),
    'core_id': 'coreid$1',
    'mode': 'startup',
    'alarm': Alarm.asAlarm(MockAlarms[0]),
    'short_desc': 'Alarm 1 description',
  },
  { 'status': '18-unknown-cleared-unreliable',
    'timestamp': datepipe.transform( alarms_date, "M/d/yy, h:mm:ss a"),
    'core_id': 'coreid$3',
    'mode': 'unknown',
    'alarm': Alarm.asAlarm(MockAlarms[2]),
    'short_desc': 'Alarm 3 description',
  },
];
