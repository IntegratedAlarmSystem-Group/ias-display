import { DatePipe } from '@angular/common';
import { Alarm } from '../alarm';

/** Object used to format the dates as needed */
const datepipe = new DatePipe('en');

/** Fixed date to use on the tests */
const alarms_date = new Date(Date.parse('27 Feb 2010 06:34:00 GMT'));

/** Set of mock IASIOS for the tests */
export const MockIasios = [
  {
      io_id: 'coreid$1',
      short_desc: 'Alarm 1 description',
      ias_type: 'ALARM'
  },
  {
      io_id: 'coreid$2',
      short_desc: 'Alarm 2 description',
      ias_type: 'ALARM'
  },
  {
      io_id: 'coreid$3',
      short_desc: 'Alarm 3 description',
      ias_type: 'ALARM'
  },
  {
      io_id: 'coreid$4',
      short_desc: 'Alarm 4 description',
      ias_type: 'ALARM'
  },
  {
      io_id: 'coreid$5',
      short_desc: 'Alarm 5 description',
      ias_type: 'ALARM'
  },
  {
      io_id: 'coreid$11',
      short_desc: 'Alarm 11 description',
      ias_type: 'ALARM'
  },
  {
      io_id: 'coreid$12',
      short_desc: 'Alarm 12 description',
      ias_type: 'ALARM'
  },
  {
      io_id: 'coreid$13',
      short_desc: 'Alarm 13 description',
      ias_type: 'ALARM'
  },
  {
      io_id: 'coreid$14',
      short_desc: 'Alarm 14 description',
      ias_type: 'ALARM'
  },
  {
      io_id: 'coreid$15',
      short_desc: 'Alarm 15 description',
      ias_type: 'ALARM'
  },
  {
      io_id: 'coreid$21',
      short_desc: 'Alarm 21 description',
      ias_type: 'ALARM'
  },
  {
      io_id: 'coreid$22',
      short_desc: 'Alarm 22 description',
      ias_type: 'ALARM'
  },
  {
      io_id: 'coreid$23',
      short_desc: 'Alarm 23 description',
      ias_type: 'ALARM'
  },
  {
      io_id: 'coreid$24',
      short_desc: 'Alarm 24 description',
      ias_type: 'ALARM'
  },
  {
      io_id: 'coreid$25',
      short_desc: 'Alarm 25 description',
      ias_type: 'ALARM'
  },
  {
      io_id: 'coreid$31',
      short_desc: 'Alarm 31 description',
      ias_type: 'ALARM'
  },
  {
      io_id: 'coreid$32',
      short_desc: 'Alarm 32 description',
      ias_type: 'ALARM'
  },
  {
      io_id: 'coreid$33',
      short_desc: 'Alarm 33 description',
      ias_type: 'ALARM'
  },
  {
      io_id: 'coreid$34',
      short_desc: 'Alarm 34 description',
      ias_type: 'ALARM'
  },
  {
      io_id: 'coreid$35',
      short_desc: 'Alarm 35 description',
      ias_type: 'ALARM'
  },
  {
      io_id: 'coreid$40',
      short_desc: 'Alarm 41 description',
      ias_type: 'ALARM'
  },
  {
      io_id: 'coreid$41',
      short_desc: 'Alarm 41 description',
      ias_type: 'ALARM'
  },
  {
      io_id: 'coreid$42',
      short_desc: 'Alarm 42 description',
      ias_type: 'ALARM'
  },
  {
      io_id: 'coreid$43',
      short_desc: 'Alarm 43 description',
      ias_type: 'ALARM'
  },
  {
      io_id: 'coreid$44',
      short_desc: 'Alarm 44 description',
      ias_type: 'ALARM'
  },
  {
      io_id: 'coreid$45',
      short_desc: 'Alarm 45 description',
      ias_type: 'ALARM'
  },
  {
      io_id: 'coreid$46',
      short_desc: 'Alarm 46 description',
      ias_type: 'ALARM'
  },
  {
      io_id: 'coreid$47',
      short_desc: 'Alarm 47 description',
      ias_type: 'ALARM'
  },
  {
      io_id: 'coreid$48',
      short_desc: 'Alarm 48 description',
      ias_type: 'ALARM'
  },
  {
      io_id: 'coreid$49',
      short_desc: 'Alarm 49 description',
      ias_type: 'ALARM'
  },

];

/** Set of mock Alarms for the tests */
export const MockAlarms = [
  // VALID NOT-ACK
  {
    'value': 4,
    'core_id': 'coreid$1',
    'running_id': 'coreid$1',
    'mode': 5,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 1,
    'ack': false,
    'dependencies': [],
  },
  {
    'value': 3,
    'core_id': 'coreid$2',
    'running_id': 'coreid$2',
    'mode': 5,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 1,
    'ack': false,
    'dependencies': [],
  },
  {
    'value': 2,
    'core_id': 'coreid$3',
    'running_id': 'coreid$3',
    'mode': 5,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 1,
    'ack': false,
    'dependencies': [],
  },
  {
    'value': 1,
    'core_id': 'coreid$4',
    'running_id': 'coreid$4',
    'mode': 5,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 1,
    'ack': false,
    'dependencies': [],
  },
  {
    'value': 0,
    'core_id': 'coreid$5',
    'running_id': 'coreid$5',
    'mode': 5,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 1,
    'ack': false,
    'dependencies': [],
  },

  // VALID ACK
  {
    'value': 4,
    'core_id': 'coreid$11',
    'running_id': 'coreid$11',
    'mode': 5,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 1,
    'ack': true,
    'dependencies': [],
  },
  {
    'value': 3,
    'core_id': 'coreid$12',
    'running_id': 'coreid$12',
    'mode': 5,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 1,
    'ack': true,
    'dependencies': [],
  },
  {
    'value': 2,
    'core_id': 'coreid$13',
    'running_id': 'coreid$13',
    'mode': 5,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 1,
    'ack': true,
    'dependencies': [],
  },
  {
    'value': 1,
    'core_id': 'coreid$14',
    'running_id': 'coreid$14',
    'mode': 5,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 1,
    'ack': true,
    'dependencies': [],
  },
  {
    'value': 0,
    'core_id': 'coreid$15',
    'running_id': 'coreid$15',
    'mode': 5,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 1,
    'ack': true,
    'dependencies': [],
  },

  // INVALID NOT-ACK
  {
    'value': 4,
    'core_id': 'coreid$21',
    'running_id': 'coreid$21',
    'mode': 5,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 0,
    'ack': false,
    'dependencies': [],
  },
  {
    'value': 3,
    'core_id': 'coreid$22',
    'running_id': 'coreid$22',
    'mode': 5,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 0,
    'ack': false,
    'dependencies': [],
  },
  {
    'value': 2,
    'core_id': 'coreid$23',
    'running_id': 'coreid$23',
    'mode': 5,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 0,
    'ack': false,
    'dependencies': [],
  },
  {
    'value': 1,
    'core_id': 'coreid$24',
    'running_id': 'coreid$24',
    'mode': 5,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 0,
    'ack': false,
    'dependencies': [],
  },
  {
    'value': 0,
    'core_id': 'coreid$25',
    'running_id': 'coreid$25',
    'mode': 5,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 0,
    'ack': false,
    'dependencies': [],
  },

  // INVALID ACK
  {
    'value': 4,
    'core_id': 'coreid$31',
    'running_id': 'coreid$31',
    'mode': 5,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 0,
    'ack': true,
    'dependencies': [],
  },
  {
    'value': 3,
    'core_id': 'coreid$32',
    'running_id': 'coreid$32',
    'mode': 5,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 0,
    'ack': true,
    'dependencies': [],
  },
  {
    'value': 2,
    'core_id': 'coreid$33',
    'running_id': 'coreid$33',
    'mode': 5,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 0,
    'ack': true,
    'dependencies': [],
  },
  {
    'value': 1,
    'core_id': 'coreid$34',
    'running_id': 'coreid$34',
    'mode': 5,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 0,
    'ack': true,
    'dependencies': [],
  },
  {
    'value': 0,
    'core_id': 'coreid$35',
    'running_id': 'coreid$35',
    'mode': 5,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 0,
    'ack': true,
    'dependencies': [],
  },

  // Repetitions weith different modes:
  {
    'value': 4,
    'core_id': 'coreid$43',
    'running_id': 'coreid$43',
    'mode': 3,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 1,
    'ack': false,
    'dependencies': [],
  },
  {
    'value': 4,
    'core_id': 'coreid$44',
    'running_id': 'coreid$44',
    'mode': 4,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 1,
    'ack': false,
    'dependencies': [],
  },
  {
    'value': 4,
    'core_id': 'coreid$47',
    'running_id': 'coreid$47',
    'mode': 7,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 1,
    'ack': false,
    'dependencies': [],
  },
];

/** Set of the rows the that the test expects on the Table */
export const ExpectedTableRows = [
  // SET VALID NOT-ACK
  { 'status': '00-maintenance-set-critical-reliable',
    'timestamp': datepipe.transform( alarms_date, 'M/d/yy, h:mm:ss a'),
    'core_id': 'coreid$44',
    'mode': 'maintenance',
    'alarm': Alarm.asAlarm(MockAlarms[21]),
    'short_desc': 'Alarm 44 description',
  },
  { 'status': '00-operational-set-critical-reliable',
    'timestamp': datepipe.transform( alarms_date, 'M/d/yy, h:mm:ss a'),
    'core_id': 'coreid$1',
    'mode': 'operational',
    'alarm': Alarm.asAlarm(MockAlarms[0]),
    'short_desc': 'Alarm 1 description',
  },
  { 'status': '00-shuttedown-set-critical-reliable',
    'timestamp': datepipe.transform( alarms_date, 'M/d/yy, h:mm:ss a'),
    'core_id': 'coreid$43',
    'mode': 'shuttedown',
    'alarm': Alarm.asAlarm(MockAlarms[20]),
    'short_desc': 'Alarm 43 description',
  },
  { 'status': '00-unknown-set-critical-reliable',
    'timestamp': datepipe.transform( alarms_date, 'M/d/yy, h:mm:ss a'),
    'core_id': 'coreid$47',
    'mode': 'unknown',
    'alarm': Alarm.asAlarm(MockAlarms[22]),
    'short_desc': 'Alarm 47 description',
  },
  { 'status': '01-operational-set-high-reliable',
    'timestamp': datepipe.transform( alarms_date, 'M/d/yy, h:mm:ss a'),
    'core_id': 'coreid$2',
    'mode': 'operational',
    'alarm': Alarm.asAlarm(MockAlarms[1]),
    'short_desc': 'Alarm 2 description',
  },
  { 'status': '02-operational-set-medium-reliable',
    'timestamp': datepipe.transform( alarms_date, 'M/d/yy, h:mm:ss a'),
    'core_id': 'coreid$3',
    'mode': 'operational',
    'alarm': Alarm.asAlarm(MockAlarms[2]),
    'short_desc': 'Alarm 3 description',
  },
  { 'status': '03-operational-set-low-reliable',
    'timestamp': datepipe.transform( alarms_date, 'M/d/yy, h:mm:ss a'),
    'core_id': 'coreid$4',
    'mode': 'operational',
    'alarm': Alarm.asAlarm(MockAlarms[3]),
    'short_desc': 'Alarm 4 description',
  },

  // SET VALID ACK
  { 'status': '04-operational-set-critical-reliable-ack',
    'timestamp': datepipe.transform( alarms_date, 'M/d/yy, h:mm:ss a'),
    'core_id': 'coreid$11',
    'mode': 'operational',
    'alarm': Alarm.asAlarm(MockAlarms[5]),
    'short_desc': 'Alarm 11 description',
  },
  { 'status': '05-operational-set-high-reliable-ack',
    'timestamp': datepipe.transform( alarms_date, 'M/d/yy, h:mm:ss a'),
    'core_id': 'coreid$12',
    'mode': 'operational',
    'alarm': Alarm.asAlarm(MockAlarms[6]),
    'short_desc': 'Alarm 12 description',
  },
  { 'status': '06-operational-set-medium-reliable-ack',
    'timestamp': datepipe.transform( alarms_date, 'M/d/yy, h:mm:ss a'),
    'core_id': 'coreid$13',
    'mode': 'operational',
    'alarm': Alarm.asAlarm(MockAlarms[7]),
    'short_desc': 'Alarm 13 description',
  },
  { 'status': '07-operational-set-low-reliable-ack',
    'timestamp': datepipe.transform( alarms_date, 'M/d/yy, h:mm:ss a'),
    'core_id': 'coreid$14',
    'mode': 'operational',
    'alarm': Alarm.asAlarm(MockAlarms[8]),
    'short_desc': 'Alarm 14 description',
  },
  // SET INVALID NOT-ACK
  { 'status': '08-operational-set-critical-unreliable',
    'timestamp': datepipe.transform( alarms_date, 'M/d/yy, h:mm:ss a'),
    'core_id': 'coreid$21',
    'mode': 'operational',
    'alarm': Alarm.asAlarm(MockAlarms[10]),
    'short_desc': 'Alarm 21 description',
  },
  { 'status': '09-operational-set-high-unreliable',
    'timestamp': datepipe.transform( alarms_date, 'M/d/yy, h:mm:ss a'),
    'core_id': 'coreid$22',
    'mode': 'operational',
    'alarm': Alarm.asAlarm(MockAlarms[11]),
    'short_desc': 'Alarm 22 description',
  },
  { 'status': '10-operational-set-medium-unreliable',
    'timestamp': datepipe.transform( alarms_date, 'M/d/yy, h:mm:ss a'),
    'core_id': 'coreid$23',
    'mode': 'operational',
    'alarm': Alarm.asAlarm(MockAlarms[12]),
    'short_desc': 'Alarm 23 description',
  },
  { 'status': '11-operational-set-low-unreliable',
    'timestamp': datepipe.transform( alarms_date, 'M/d/yy, h:mm:ss a'),
    'core_id': 'coreid$24',
    'mode': 'operational',
    'alarm': Alarm.asAlarm(MockAlarms[13]),
    'short_desc': 'Alarm 24 description',
  },

  // SET INVALID ACK
  { 'status': '12-operational-set-critical-unreliable-ack',
    'timestamp': datepipe.transform( alarms_date, 'M/d/yy, h:mm:ss a'),
    'core_id': 'coreid$31',
    'mode': 'operational',
    'alarm': Alarm.asAlarm(MockAlarms[15]),
    'short_desc': 'Alarm 31 description',
  },
  { 'status': '13-operational-set-high-unreliable-ack',
    'timestamp': datepipe.transform( alarms_date, 'M/d/yy, h:mm:ss a'),
    'core_id': 'coreid$32',
    'mode': 'operational',
    'alarm': Alarm.asAlarm(MockAlarms[16]),
    'short_desc': 'Alarm 32 description',
  },
  { 'status': '14-operational-set-medium-unreliable-ack',
    'timestamp': datepipe.transform( alarms_date, 'M/d/yy, h:mm:ss a'),
    'core_id': 'coreid$33',
    'mode': 'operational',
    'alarm': Alarm.asAlarm(MockAlarms[17]),
    'short_desc': 'Alarm 33 description',
  },
  { 'status': '15-operational-set-low-unreliable-ack',
    'timestamp': datepipe.transform( alarms_date, 'M/d/yy, h:mm:ss a'),
    'core_id': 'coreid$34',
    'mode': 'operational',
    'alarm': Alarm.asAlarm(MockAlarms[18]),
    'short_desc': 'Alarm 34 description',
  },

  // CLEARED:
  { 'status': '16-operational-cleared-reliable',
    'timestamp': datepipe.transform( alarms_date, 'M/d/yy, h:mm:ss a'),
    'core_id': 'coreid$5',
    'mode': 'operational',
    'alarm': Alarm.asAlarm(MockAlarms[4]),
    'short_desc': 'Alarm 5 description',
  },
  { 'status': '17-operational-cleared-reliable-ack',
    'timestamp': datepipe.transform( alarms_date, 'M/d/yy, h:mm:ss a'),
    'core_id': 'coreid$15',
    'mode': 'operational',
    'alarm': Alarm.asAlarm(MockAlarms[9]),
    'short_desc': 'Alarm 15 description',
  },
  { 'status': '18-operational-cleared-unreliable',
    'timestamp': datepipe.transform( alarms_date, 'M/d/yy, h:mm:ss a'),
    'core_id': 'coreid$25',
    'mode': 'operational',
    'alarm': Alarm.asAlarm(MockAlarms[14]),
    'short_desc': 'Alarm 25 description',
  },
  { 'status': '19-operational-cleared-unreliable-ack',
    'timestamp': datepipe.transform( alarms_date, 'M/d/yy, h:mm:ss a'),
    'core_id': 'coreid$35',
    'mode': 'operational',
    'alarm': Alarm.asAlarm(MockAlarms[19]),
    'short_desc': 'Alarm 35 description',
  },
];
