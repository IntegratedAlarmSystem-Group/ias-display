/** Data expected to be contained by the tree in tests */
export const expectedTreeData = {
  'parent': {
    'child_1': {
      'grandChild_11': null,
      'grandChild_12': null,
      'grandChild_13': null,
    },
    'child_2': {
      'grandChild_21': null,
      'grandChild_23': null,
    },
  }
};

/** Mock alarms data to be used in tests */
export const mockAlarmData = [
  {
    'value': 0,
    'core_id': 'parent',
    'running_id': '',
    'mode': '',
    'core_timestamp': 1,
    'state_change_timestamp': 1,
    'value_change_timestamp': 0,
    'value_change_transition': [0, 0],
    'description': 'Short description for mock alarm',
    'url': 'www.alma.cl',
    'sound': 'TYPE1',
    'can_shelve': true,
    'validity': '0',
    'ack': false,
    'shelved': false,
    'dependencies': [
      'child_1',
      'child_2',
    ],
  },
  {
    'value': 0,
    'core_id': 'child_1',
    'running_id': '',
    'mode': '',
    'core_timestamp': 1,
    'state_change_timestamp': 1,
    'value_change_timestamp': 0,
    'value_change_transition': [0, 0],
    'description': 'Short description for mock alarm',
    'url': 'www.alma.cl',
    'sound': 'TYPE1',
    'can_shelve': true,
    'validity': '0',
    'ack': false,
    'shelved': false,
    'dependencies': [
      'grandChild_11',
      'grandChild_12',
      'grandChild_13',
    ],
  },
  {
    'value': 0,
    'core_id': 'child_2',
    'running_id': '',
    'mode': '',
    'core_timestamp': 1,
    'state_change_timestamp': 1,
    'value_change_timestamp': 0,
    'value_change_transition': [0, 0],
    'description': 'Short description for mock alarm',
    'url': 'www.alma.cl',
    'sound': 'TYPE1',
    'can_shelve': true,
    'validity': '0',
    'ack': false,
    'shelved': false,
    'dependencies': [
      'grandChild_21',
      'grandChild_22',
      'grandChild_23',
    ],
  },
  {
    'value': 0,
    'core_id': 'grandChild_11',
    'running_id': '',
    'mode': '',
    'core_timestamp': 1,
    'state_change_timestamp': 1,
    'value_change_timestamp': 0,
    'value_change_transition': [0, 0],
    'description': 'Short description for mock alarm',
    'url': 'www.alma.cl',
    'sound': 'TYPE1',
    'can_shelve': true,
    'validity': '0',
    'ack': false,
    'shelved': false,
    'dependencies': [],
  },
  {
    'value': 0,
    'core_id': 'grandChild_12',
    'running_id': '',
    'mode': '',
    'core_timestamp': 1,
    'state_change_timestamp': 1,
    'value_change_timestamp': 0,
    'value_change_transition': [0, 0],
    'description': 'Short description for mock alarm',
    'url': 'www.alma.cl',
    'sound': 'TYPE1',
    'can_shelve': true,
    'validity': '0',
    'ack': false,
    'shelved': false,
    'dependencies': [],
  },
  {
    'value': 0,
    'core_id': 'grandChild_13',
    'running_id': '',
    'mode': '',
    'core_timestamp': 1,
    'state_change_timestamp': 1,
    'value_change_timestamp': 0,
    'value_change_transition': [0, 0],
    'description': 'Short description for mock alarm',
    'url': 'www.alma.cl',
    'sound': 'TYPE1',
    'can_shelve': true,
    'validity': '0',
    'ack': false,
    'shelved': false,
    'dependencies': [],
  },
  {
    'value': 0,
    'core_id': 'grandChild_21',
    'running_id': '',
    'mode': '',
    'core_timestamp': 1,
    'state_change_timestamp': 1,
    'value_change_timestamp': 0,
    'value_change_transition': [0, 0],
    'description': 'Short description for mock alarm',
    'url': 'www.alma.cl',
    'sound': 'TYPE1',
    'can_shelve': true,
    'validity': '0',
    'ack': false,
    'shelved': false,
    'dependencies': [],
  },
  {
    'value': 0,
    'core_id': 'grandChild_22',
    'running_id': '',
    'mode': '',
    'core_timestamp': 1,
    'state_change_timestamp': 1,
    'value_change_timestamp': 0,
    'value_change_transition': [0, 0],
    'description': 'Short description for mock alarm',
    'url': 'www.alma.cl',
    'sound': 'TYPE1',
    'can_shelve': true,
    'validity': '0',
    'ack': true,
    'shelved': false,
    'dependencies': [],
  },
  {
    'value': 0,
    'core_id': 'grandChild_23',
    'running_id': '',
    'mode': '',
    'core_timestamp': 1,
    'state_change_timestamp': 1,
    'value_change_timestamp': 0,
    'value_change_transition': [0, 0],
    'description': 'Short description for mock alarm',
    'url': 'www.alma.cl',
    'sound': 'TYPE1',
    'can_shelve': true,
    'validity': '0',
    'ack': false,
    'shelved': false,
    'dependencies': [],
  },
];
