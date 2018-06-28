import { Alarm } from '../alarm';
import { AlarmImageSet } from './alarm.component';

export const MockImageSet = new AlarmImageSet({
  clear: 'clear',
  set_low: 'low',
  set_medium: 'medium',
  set_high: 'high',
  set_critical: 'critical',
  unknown: 'unknown',
  maintenance: 'maintenance',
  shelved: 'shelved',
});

export const MockImageUnreliableSet = new AlarmImageSet({
  clear: 'clear_unreliable',
  set_low: 'low_unreliable',
  set_medium: 'medium_unreliable',
  set_high: 'high_unreliable',
  set_critical: 'critical_unreliable',
  unknown: 'unknown_unreliable',
  maintenance: 'maintenance_unreliable',
  shelved: 'shelved_unreliable',
});

export const MockAlarms = [
  {
    'value': 4,
    'core_id': 'critical',
    'running_id': 'critical',
    'mode': 5,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 1,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  },
  {
    'value': 3,
    'core_id': 'high',
    'running_id': 'high',
    'mode': 5,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 1,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  },
  {
    'value': 2,
    'core_id': 'medium',
    'running_id': 'medium',
    'mode': 5,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 1,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  },
  {
    'value': 1,
    'core_id': 'low',
    'running_id': 'low',
    'mode': 5,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 1,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  },
  {
    'value': 0,
    'core_id': 'clear',
    'running_id': 'clear',
    'mode': 5,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 1,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  },
  {
    'value': 0,
    'core_id': 'unknown',
    'running_id': 'unknown',
    'mode': 7,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 1,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  },
  {
    'value': 0,
    'core_id': 'maintenance',
    'running_id': 'maintenance',
    'mode': 4,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 1,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  },
  {
    'value': 4,
    'core_id': 'critical_unreliable',
    'running_id': 'critical_unreliable',
    'mode': 5,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 0,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  },
  {
    'value': 3,
    'core_id': 'high_unreliable',
    'running_id': 'high_unreliable',
    'mode': 5,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 0,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  },
  {
    'value': 2,
    'core_id': 'medium_unreliable',
    'running_id': 'medium_unreliable',
    'mode': 5,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 0,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  },
  {
    'value': 1,
    'core_id': 'low_unreliable',
    'running_id': 'low_unreliable',
    'mode': 5,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 0,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  },
  {
    'value': 0,
    'core_id': 'clear_unreliable',
    'running_id': 'clear_unreliable',
    'mode': 5,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 0,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  },
  {
    'value': 0,
    'core_id': 'unknown_unreliable',
    'running_id': 'unknown_unreliable',
    'mode': 7,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 0,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  },
  {
    'value': 0,
    'core_id': 'maintenance_unreliable',
    'running_id': 'maintenance_unreliable',
    'mode': 4,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 0,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  }
];
