/** Set of mock classes to display the alarm label if showText is true */
export const expectedClassesWhenShowText = {
  'critical': ['alarm-label-critical'],
  'high': ['alarm-label-high'],
  'medium': ['alarm-label-medium'],
  'low': ['alarm-label-low'],
  'clear': ['alarm-label-clear', 'hide-label'],
  'unknown_low': ['alarm-label-low'],
  'unknown_clear': ['alarm-label-clear', 'hide-label'],
  'maintenance_low': ['alarm-label-low'],
  'maintenance_clear': ['alarm-label-clear', 'hide-label'],
  'shutteddown_low': ['alarm-label-low'],
  'shutteddown_clear': ['alarm-label-clear', 'hide-label'],
  'malfunctioning_low': ['alarm-label-low'],
  'malfunctioning_clear': ['alarm-label-clear', 'hide-label'],
  'critical_unreliable': ['alarm-label-critical', 'unreliable'],
  'high_unreliable': ['alarm-label-high', 'unreliable'],
  'medium_unreliable': ['alarm-label-medium', 'unreliable'],
  'low_unreliable': ['alarm-label-low', 'unreliable'],
  'clear_unreliable': ['alarm-label-clear', 'hide-label', 'unreliable'],
  'unknown_low_unreliable': ['alarm-label-low', 'unreliable'],
  'unknown_clear_unreliable': ['alarm-label-clear', 'hide-label', 'unreliable'],
  'maintenance_low_unreliable': ['alarm-label-low', 'unreliable'],
  'maintenance_clear_unreliable': ['alarm-label-clear', 'hide-label', 'unreliable'],
  'shutteddown_low_unreliable': ['alarm-label-low', 'unreliable'],
  'shutteddown_clear_unreliable': ['alarm-label-clear', 'hide-label', 'unreliable'],
  'malfunctioning_low_unreliable': ['alarm-label-low', 'unreliable'],
  'malfunctioning_clear_unreliable': ['alarm-label-clear', 'hide-label', 'unreliable'],
  'shelved': ['alarm-label-clear',  'hide-label'],
  'shelved_unreliable': ['alarm-label-clear', 'hide-label'],
};

/** Set of mock classes to display the alarm label if showText is false */
export const expectedClassesWhenHiddenText = {
  'critical': ['alarm-label-critical', 'hide-text'],
  'high': ['alarm-label-high', 'hide-text'],
  'medium': ['alarm-label-medium', 'hide-text'],
  'low': ['alarm-label-low', 'hide-text'],
  'clear': ['alarm-label-clear', 'hide-text'],
  'unknown_low': ['alarm-label-low', 'hide-text'],
  'unknown_clear': ['alarm-label-clear', 'hide-text'],
  'maintenance_low': ['alarm-label-low', 'hide-text'],
  'maintenance_clear': ['alarm-label-clear', 'hide-text'],
  'shutteddown_low': ['alarm-label-low', 'hide-text'],
  'shutteddown_clear': ['alarm-label-clear', 'hide-text'],
  'malfunctioning_low': ['alarm-label-low', 'hide-text'],
  'malfunctioning_clear': ['alarm-label-clear', 'hide-text'],
  'critical_unreliable': ['alarm-label-critical', 'unreliable', 'hide-text'],
  'high_unreliable': ['alarm-label-high', 'unreliable', 'hide-text'],
  'medium_unreliable': ['alarm-label-medium', 'unreliable', 'hide-text'],
  'low_unreliable': ['alarm-label-low', 'unreliable', 'hide-text'],
  'clear_unreliable': ['alarm-label-clear', 'unreliable', 'hide-text'],
  'unknown_low_unreliable': ['alarm-label-low', 'unreliable', 'hide-text'],
  'unknown_clear_unreliable': ['alarm-label-clear', 'unreliable', 'hide-text'],
  'maintenance_low_unreliable': ['alarm-label-low', 'unreliable', 'hide-text'],
  'maintenance_clear_unreliable': ['alarm-label-clear', 'unreliable', 'hide-text'],
  'shutteddown_low_unreliable': ['alarm-label-low', 'unreliable', 'hide-text'],
  'shutteddown_clear_unreliable': ['alarm-label-clear', 'unreliable', 'hide-text'],
  'malfunctioning_low_unreliable': ['alarm-label-low', 'unreliable', 'hide-text'],
  'malfunctioning_clear_unreliable': ['alarm-label-clear', 'unreliable', 'hide-text'],
  'shelved': ['alarm-label-clear', 'hide-text'],
  'shelved_unreliable': ['alarm-label-clear', 'hide-text'],
};

/** Set of mock Alarms for the tests */
export const MockAlarms = [
  {
    'value': 4,
    'core_id': 'critical',
    'running_id': 'critical',
    'mode': 5,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 1,
    'description': 'my description',
    'url': 'https://www.alma.cl',
    'sound': 'sound1',
    'can_shelve': true,
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
    'description': 'my description',
    'url': 'https://www.alma.cl',
    'sound': 'sound1',
    'can_shelve': true,
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
    'description': 'my description',
    'url': 'https://www.alma.cl',
    'sound': 'sound1',
    'can_shelve': true,
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
    'description': 'my description',
    'url': 'https://www.alma.cl',
    'sound': 'sound1',
    'can_shelve': true,
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
    'description': 'my description',
    'url': 'https://www.alma.cl',
    'sound': 'sound1',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  },
  {
    'value': 1,
    'core_id': 'unknown_low',
    'running_id': 'unknown_low',
    'mode': 7,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 1,
    'description': 'my description',
    'url': 'https://www.alma.cl',
    'sound': 'sound1',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  },
  {
    'value': 0,
    'core_id': 'unknown_clear',
    'running_id': 'unknown_clear',
    'mode': 7,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 1,
    'description': 'my description',
    'url': 'https://www.alma.cl',
    'sound': 'sound1',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  },
  {
    'value': 1,
    'core_id': 'maintenance_low',
    'running_id': 'maintenance_low',
    'mode': 4,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 1,
    'description': 'my description',
    'url': 'https://www.alma.cl',
    'sound': 'sound1',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  },
  {
    'value': 0,
    'core_id': 'maintenance_clear',
    'running_id': 'maintenance_clear',
    'mode': 4,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 1,
    'description': 'my description',
    'url': 'https://www.alma.cl',
    'sound': 'sound1',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  },
  {
    'value': 1,
    'core_id': 'shutteddown_low',
    'running_id': 'shutteddown_low',
    'mode': 3,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 1,
    'description': 'my description',
    'url': 'https://www.alma.cl',
    'sound': 'sound1',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  },
  {
    'value': 0,
    'core_id': 'shutteddown_clear',
    'running_id': 'shutteddown_clear',
    'mode': 3,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 1,
    'description': 'my description',
    'url': 'https://www.alma.cl',
    'sound': 'sound1',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  },
  {
    'value': 1,
    'core_id': 'malfunctioning_low',
    'running_id': 'malfunctioning_low',
    'mode': 8,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 1,
    'description': 'my description',
    'url': 'https://www.alma.cl',
    'sound': 'sound1',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  },
  {
    'value': 0,
    'core_id': 'malfunctioning_clear',
    'running_id': 'malfunctioning_clear',
    'mode': 8,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 1,
    'description': 'my description',
    'url': 'https://www.alma.cl',
    'sound': 'sound1',
    'can_shelve': true,
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
    'description': 'my description',
    'url': 'https://www.alma.cl',
    'sound': 'sound1',
    'can_shelve': true,
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
    'description': 'my description',
    'url': 'https://www.alma.cl',
    'sound': 'sound1',
    'can_shelve': true,
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
    'description': 'my description',
    'url': 'https://www.alma.cl',
    'sound': 'sound1',
    'can_shelve': true,
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
    'description': 'my description',
    'url': 'https://www.alma.cl',
    'sound': 'sound1',
    'can_shelve': true,
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
    'description': 'my description',
    'url': 'https://www.alma.cl',
    'sound': 'sound1',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  },
  {
    'value': 1,
    'core_id': 'unknown_low_unreliable',
    'running_id': 'unknown_low_unreliable',
    'mode': 7,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 0,
    'description': 'my description',
    'url': 'https://www.alma.cl',
    'sound': 'sound1',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  },
  {
    'value': 0,
    'core_id': 'unknown_clear_unreliable',
    'running_id': 'unknown_clear_unreliable',
    'mode': 7,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 0,
    'description': 'my description',
    'url': 'https://www.alma.cl',
    'sound': 'sound1',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  },
  {
    'value': 1,
    'core_id': 'maintenance_low_unreliable',
    'running_id': 'maintenance_low_unreliable',
    'mode': 4,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 0,
    'description': 'my description',
    'url': 'https://www.alma.cl',
    'sound': 'sound1',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  },
  {
    'value': 0,
    'core_id': 'maintenance_clear_unreliable',
    'running_id': 'maintenance_clear_unreliable',
    'mode': 4,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 0,
    'description': 'my description',
    'url': 'https://www.alma.cl',
    'sound': 'sound1',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  },
  {
    'value': 1,
    'core_id': 'shutteddown_low_unreliable',
    'running_id': 'shutteddown_low_unreliable',
    'mode': 3,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 0,
    'description': 'my description',
    'url': 'https://www.alma.cl',
    'sound': 'sound1',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  },
  {
    'value': 0,
    'core_id': 'shutteddown_clear_unreliable',
    'running_id': 'shutteddown_clear_unreliable',
    'mode': 3,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 0,
    'description': 'my description',
    'url': 'https://www.alma.cl',
    'sound': 'sound1',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  },
  {
    'value': 1,
    'core_id': 'malfunctioning_low_unreliable',
    'running_id': 'malfunctioning_low_unreliable',
    'mode': 8,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 0,
    'description': 'my description',
    'url': 'https://www.alma.cl',
    'sound': 'sound1',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  },
  {
    'value': 0,
    'core_id': 'malfunctioning_clear_unreliable',
    'running_id': 'malfunctioning_clear_unreliable',
    'mode': 8,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 0,
    'description': 'my description',
    'url': 'https://www.alma.cl',
    'sound': 'sound1',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  },
  {
    'value': 1,
    'core_id': 'shelved',
    'running_id': 'shelved',
    'mode': 5,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 1,
    'description': 'my description',
    'url': 'https://www.alma.cl',
    'sound': 'sound1',
    'can_shelve': true,
    'ack': false,
    'shelved': true,
    'dependencies': [],
  },
  {
    'value': 1,
    'core_id': 'shelved_unreliable',
    'running_id': 'shelved_unreliable',
    'mode': 5,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 0,
    'description': 'my description',
    'url': 'https://www.alma.cl',
    'sound': 'sound1',
    'can_shelve': true,
    'ack': false,
    'shelved': true,
    'dependencies': [],
  }
];