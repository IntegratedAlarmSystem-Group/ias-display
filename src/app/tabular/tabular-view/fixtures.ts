import { Alarm } from '../../data/alarm';

/** Set of mock IASIOS for the tests */
export const MockIasios = [
  {
      io_id: 'coreid$1',
      short_desc: 'Alarm 1 description',
      ias_type: 'ALARM',
      doc_url: 'https://www.alma.cl/'
  },
  {
      io_id: 'coreid$2',
      short_desc: 'Alarm 2 description',
      ias_type: 'ALARM',
      doc_url: 'https://www.alma.cl/'
  },
  {
      io_id: 'coreid$3',
      short_desc: 'Alarm 3 description',
      ias_type: 'ALARM',
      doc_url: 'https://www.alma.cl/'
  },
  {
      io_id: 'coreid$4',
      short_desc: 'Alarm 4 description',
      ias_type: 'ALARM',
      doc_url: 'https://www.alma.cl/'
  },
  {
      io_id: 'coreid$5',
      short_desc: 'Alarm 5 description',
      ias_type: 'ALARM',
      doc_url: 'https://www.alma.cl/'
  },
  {
      io_id: 'coreid$11',
      short_desc: 'Alarm 11 description',
      ias_type: 'ALARM',
      doc_url: 'https://www.alma.cl/'
  },
  {
      io_id: 'coreid$12',
      short_desc: 'Alarm 12 description',
      ias_type: 'ALARM',
      doc_url: 'https://www.alma.cl/'
  },
  {
      io_id: 'coreid$13',
      short_desc: 'Alarm 13 description',
      ias_type: 'ALARM',
      doc_url: 'https://www.alma.cl/'
  },
  {
      io_id: 'coreid$14',
      short_desc: 'Alarm 14 description',
      ias_type: 'ALARM',
      doc_url: 'https://www.alma.cl/'
  },
  {
      io_id: 'coreid$15',
      short_desc: 'Alarm 15 description',
      ias_type: 'ALARM',
      doc_url: 'https://www.alma.cl/'
  },
  {
      io_id: 'coreid$21',
      short_desc: 'Alarm 21 description',
      ias_type: 'ALARM',
      doc_url: 'https://www.alma.cl/'
  },
  {
      io_id: 'coreid$22',
      short_desc: 'Alarm 22 description',
      ias_type: 'ALARM',
      doc_url: 'https://www.alma.cl/'
  },
  {
      io_id: 'coreid$23',
      short_desc: 'Alarm 23 description',
      ias_type: 'ALARM',
      doc_url: 'https://www.alma.cl/'
  },
  {
      io_id: 'coreid$24',
      short_desc: 'Alarm 24 description',
      ias_type: 'ALARM',
      doc_url: 'https://www.alma.cl/'
  },
  {
      io_id: 'coreid$25',
      short_desc: 'Alarm 25 description',
      ias_type: 'ALARM',
      doc_url: 'https://www.alma.cl/'
  },
  {
      io_id: 'coreid$31',
      short_desc: 'Alarm 31 description',
      ias_type: 'ALARM',
      doc_url: 'https://www.alma.cl/'
  },
  {
      io_id: 'coreid$32',
      short_desc: 'Alarm 32 description',
      ias_type: 'ALARM',
      doc_url: 'https://www.alma.cl/'
  },
  {
      io_id: 'coreid$33',
      short_desc: 'Alarm 33 description',
      ias_type: 'ALARM',
      doc_url: 'https://www.alma.cl/'
  },
  {
      io_id: 'coreid$34',
      short_desc: 'Alarm 34 description',
      ias_type: 'ALARM',
      doc_url: 'https://www.alma.cl/'
  },
  {
      io_id: 'coreid$35',
      short_desc: 'Alarm 35 description',
      ias_type: 'ALARM',
      doc_url: 'https://www.alma.cl/'
  },
  {
      io_id: 'coreid$40',
      short_desc: 'Alarm 41 description',
      ias_type: 'ALARM',
      doc_url: 'https://www.alma.cl/'
  },
  {
      io_id: 'coreid$41',
      short_desc: 'Alarm 41 description',
      ias_type: 'ALARM',
      doc_url: 'https://www.alma.cl/'
  },
  {
      io_id: 'coreid$42',
      short_desc: 'Alarm 42 description',
      ias_type: 'ALARM',
      doc_url: 'https://www.alma.cl/'
  },
  {
      io_id: 'coreid$43',
      short_desc: 'Alarm 43 description',
      ias_type: 'ALARM',
      doc_url: 'https://www.alma.cl/'
  },
  {
      io_id: 'coreid$44',
      short_desc: 'Alarm 44 description',
      ias_type: 'ALARM',
      doc_url: 'https://www.alma.cl/'
  },
  {
      io_id: 'coreid$45',
      short_desc: 'Alarm 45 description',
      ias_type: 'ALARM',
      doc_url: 'https://www.alma.cl/'
  },
  {
      io_id: 'coreid$46',
      short_desc: 'Alarm 46 description',
      ias_type: 'ALARM',
      doc_url: 'https://www.alma.cl/'
  },
  {
      io_id: 'coreid$47',
      short_desc: 'Alarm 47 description',
      ias_type: 'ALARM',
      doc_url: 'https://www.alma.cl/'
  },
  {
      io_id: 'coreid$48',
      short_desc: 'Alarm 48 description',
      ias_type: 'ALARM',
      doc_url: 'https://www.alma.cl/'
  },
  {
      io_id: 'coreid$49',
      short_desc: 'Alarm 49 description',
      ias_type: 'ALARM',
      doc_url: 'https://www.alma.cl/'
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
    'description': 'Alarm 1 description',
    'url': 'https://www.alma.cl',
    'sound': 'NONE',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
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
    'description': 'Alarm 2 description',
    'url': 'https://www.alma.cl',
    'sound': 'NONE',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
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
    'description': 'Alarm 3 description',
    'url': 'https://www.alma.cl',
    'sound': 'NONE',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
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
    'description': 'Alarm 4 description',
    'url': 'https://www.alma.cl',
    'sound': 'NONE',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
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
    'description': 'Alarm 5 description',
    'url': 'https://www.alma.cl',
    'sound': 'NONE',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
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
    'description': 'Alarm 11 description',
    'url': 'https://www.alma.cl',
    'sound': 'NONE',
    'can_shelve': true,
    'ack': true,
    'shelved': false,
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
    'description': 'Alarm 12 description',
    'url': 'https://www.alma.cl',
    'sound': 'NONE',
    'can_shelve': true,
    'ack': true,
    'shelved': false,
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
    'description': 'Alarm 13 description',
    'url': 'https://www.alma.cl',
    'sound': 'NONE',
    'can_shelve': true,
    'ack': true,
    'shelved': false,
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
    'description': 'Alarm 14 description',
    'url': 'https://www.alma.cl',
    'sound': 'NONE',
    'can_shelve': true,
    'ack': true,
    'shelved': false,
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
    'description': 'Alarm 15 description',
    'url': 'https://www.alma.cl',
    'sound': 'NONE',
    'can_shelve': true,
    'ack': true,
    'shelved': false,
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
    'description': 'Alarm 21 description',
    'url': 'https://www.alma.cl',
    'sound': 'NONE',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
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
    'description': 'Alarm 22 description',
    'url': 'https://www.alma.cl',
    'sound': 'NONE',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
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
    'description': 'Alarm 23 description',
    'url': 'https://www.alma.cl',
    'sound': 'NONE',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
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
    'description': 'Alarm 24 description',
    'url': 'https://www.alma.cl',
    'sound': 'NONE',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
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
    'description': 'Alarm 25 description',
    'url': 'https://www.alma.cl',
    'sound': 'NONE',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
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
    'description': 'Alarm 31 description',
    'url': 'https://www.alma.cl',
    'sound': 'NONE',
    'can_shelve': true,
    'ack': true,
    'shelved': false,
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
    'description': 'Alarm 32 description',
    'url': 'https://www.alma.cl',
    'sound': 'NONE',
    'can_shelve': true,
    'ack': true,
    'shelved': false,
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
    'description': 'Alarm 33 description',
    'url': 'https://www.alma.cl',
    'sound': 'NONE',
    'can_shelve': true,
    'ack': true,
    'shelved': false,
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
    'description': 'Alarm 34 description',
    'url': 'https://www.alma.cl',
    'sound': 'NONE',
    'can_shelve': true,
    'ack': true,
    'shelved': false,
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
    'description': 'Alarm 35 description',
    'url': 'https://www.alma.cl',
    'sound': 'NONE',
    'can_shelve': true,
    'ack': true,
    'shelved': false,
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
    'description': 'Alarm 43 description',
    'url': 'https://www.alma.cl',
    'sound': 'NONE',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
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
    'description': 'Alarm 44 description',
    'url': 'https://www.alma.cl',
    'sound': 'NONE',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
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
    'description': 'Alarm 47 description',
    'url': 'https://www.alma.cl',
    'sound': 'NONE',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  },
  {
    'value': 4,
    'core_id': 'coreid$50',
    'running_id': 'coreid$50',
    'mode': 7,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 1,
    'description': 'Alarm 50 description',
    'url': 'https://www.alma.cl',
    'sound': 'NONE',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  },
];


/** Set of the rows the that the test expects on the Table */
export const ExpectedTableRows = [
  // SET VALID NOT-ACK
  Alarm.asAlarm(MockAlarms[21]),
  Alarm.asAlarm(MockAlarms[0]),
  Alarm.asAlarm(MockAlarms[20]),
  Alarm.asAlarm(MockAlarms[22]),
  Alarm.asAlarm(MockAlarms[23]),
  Alarm.asAlarm(MockAlarms[1]),
  Alarm.asAlarm(MockAlarms[2]),
  Alarm.asAlarm(MockAlarms[3]),

  // SET VALID ACK
  Alarm.asAlarm(MockAlarms[5]),
  Alarm.asAlarm(MockAlarms[6]),
  Alarm.asAlarm(MockAlarms[7]),
  Alarm.asAlarm(MockAlarms[8]),

  // SET INVALID NOT-ACK
  Alarm.asAlarm(MockAlarms[10]),
  Alarm.asAlarm(MockAlarms[11]),
  Alarm.asAlarm(MockAlarms[12]),
  Alarm.asAlarm(MockAlarms[13]),

  // SET INVALID ACK
  Alarm.asAlarm(MockAlarms[15]),
  Alarm.asAlarm(MockAlarms[16]),
  Alarm.asAlarm(MockAlarms[17]),
  Alarm.asAlarm(MockAlarms[18]),

  // CLEARED:
  Alarm.asAlarm(MockAlarms[4]),
  Alarm.asAlarm(MockAlarms[9]),
  Alarm.asAlarm(MockAlarms[14]),
  Alarm.asAlarm(MockAlarms[19]),
];

/** Set of the rows the that the test expects on the Table after the filter */
export const ExpectedFilteredTableRows = [
  ExpectedTableRows[5],
  ExpectedTableRows[12],
  ExpectedTableRows[13],
  ExpectedTableRows[14],
  ExpectedTableRows[15],
  ExpectedTableRows[22],
];
