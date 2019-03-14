import { AlarmImageSet } from '../shared/alarm/alarm.component';
import { Alarm } from '../data/alarm';
import { AlarmConfig } from '../data/alarm-config';

/** Mock configuration for the displaying of antennas alarms */
export const mockAntennasConfig =  [
    {
      'alarm_id': 'mockAlarm-0',
      'custom_name': 'antenna-0',
      'type': 'antenna',
      'view': 'antennas',
      'placemark': 'mockAlarm-0',
      'group': 'antennas',
      'children': [
        {
          'alarm_id': 'mockAlarm-0-child-2',
          'custom_name': '',
          'type': '',
          'view': '',
          'placemark': '',
          'group': 'antennas',
          'children': []
        },
      ]
    },
    {
      'alarm_id': 'mockAlarm-1',
      'custom_name': 'antenna-1',
      'type': 'antenna',
      'view': 'antennas',
      'placemark': 'mockAlarm-1',
      'group': 'antennas',
      'children': []
    },
    {
      'alarm_id': 'mockAlarm-2',
      'custom_name': 'antenna-2',
      'type': 'antenna',
      'view': 'antennas',
      'placemark': 'mockAlarm-2',
      'group': 'antennas',
      'children': []
    },
    {
      'alarm_id': 'mockAlarm-3',
      'custom_name': 'antenna-3',
      'type': 'antenna',
      'view': 'antennas',
      'placemark': 'mockAlarm-3',
      'group': 'antennas',
      'children': [],
    },
  ];

/** Mock configuration for the displaying of general devices alarms */
export const mockDevicesConfig = [
    {
      'alarm_id': 'mockAlarm-3',
      'custom_name': 'device-1',
      'placemark': '',
      'type': 'device',
      'view': 'antennas',
      'children': []
    }
  ];

/** Mock alarms for the test */
export const mockAlarms = {
  'mockAlarm-0': Alarm.asAlarm({
    'value': 0,
    'core_id': 'mockAlarm-0',
    'running_id': 'mockAlarm-0',
    'mode': '0',
    'core_timestamp': 1267252440000,
    'validity': '1',
    'state_change_timestamp': 1267252440000,
    'description': 'Short description for mock alarm',
    'url': 'https://www.alma1.cl',
    'sound': 'NONE',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
    'dependencies': ['mockAlarm-0-child-0', 'mockAlarm-0-child-1'],
  }),
  'mockAlarm-1': Alarm.asAlarm({
    'value': 0,
    'core_id': 'mockAlarm-1',
    'running_id': 'mockAlarm-1',
    'mode': '0',
    'core_timestamp': 1267252440000,
    'validity': '1',
    'state_change_timestamp': 1267252440000,
    'description': 'Short description for mock alarm',
    'url': 'https://www.alma2.cl',
    'sound': 'NONE',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
    'dependencies': ['mockAlarm-1-child-0', 'mockAlarm-1-child-1'],
  }),
  'mockAlarm-2': Alarm.asAlarm({
    'value': 0,
    'core_id': 'mockAlarm-2',
    'running_id': 'mockAlarm-2',
    'mode': '0',
    'core_timestamp': 1267252440000,
    'validity': '1',
    'state_change_timestamp': 1267252440000,
    'description': 'Short description for mock alarm',
    'url': 'https://www.alma2.cl',
    'sound': 'NONE',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  }),
  'mockAlarm-0-child-0': Alarm.asAlarm({
    'value': 0,
    'core_id': 'mockAlarm-0-child-0',
    'running_id': 'mockAlarm-0-child-0',
    'mode': '0',
    'core_timestamp': 1267252440000,
    'validity': '1',
    'state_change_timestamp': 1267252440000,
    'description': 'Short description for mock alarm device',
    'url': 'https://www.alma1.cl',
    'sound': 'NONE',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  }),
  'mockAlarm-0-child-1': Alarm.asAlarm({
    'value': 0,
    'core_id': 'mockAlarm-0-child-1',
    'running_id': 'mockAlarm-0-child-1',
    'mode': '0',
    'core_timestamp': 1267252440000,
    'validity': '1',
    'state_change_timestamp': 1267252440000,
    'description': 'Short description for mock alarm device',
    'url': 'https://www.alma1.cl',
    'sound': 'NONE',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  }),
  'mockAlarm-0-child-2': Alarm.asAlarm({
    'value': 0,
    'core_id': 'mockAlarm-0-child-2',
    'running_id': 'mockAlarm-0-child-2',
    'mode': '0',
    'core_timestamp': 1267252440000,
    'validity': '1',
    'state_change_timestamp': 1267252440000,
    'description': 'Short description for mock alarm device',
    'url': 'https://www.alma1.cl',
    'sound': 'NONE',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  }),
  'mockAlarm-2-child-0': Alarm.asAlarm({
    'value': 0,
    'core_id': 'mockAlarm-2-child-0',
    'running_id': 'mockAlarm-2-child-0',
    'mode': '0',
    'core_timestamp': 1267252440000,
    'validity': '1',
    'state_change_timestamp': 1267252440000,
    'description': 'Short description for mock alarm device',
    'url': 'https://www.alma1.cl',
    'sound': 'NONE',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  }),
  'mockAlarm-2-child-1': Alarm.asAlarm({
    'value': 0,
    'core_id': 'mockAlarm-2-child-1',
    'running_id': 'mockAlarm-2-child-1',
    'mode': '0',
    'core_timestamp': 1267252440000,
    'validity': '1',
    'state_change_timestamp': 1267252440000,
    'description': 'Short description for mock alarm device',
    'url': 'https://www.alma1.cl',
    'sound': 'NONE',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  }),
  'mockAlarm-3': Alarm.asAlarm({
    'value': 0,
    'core_id': 'mockAlarm-3',
    'running_id': 'mockAlarm-3',
    'mode': '0',
    'core_timestamp': 1267252440000,
    'validity': '1',
    'state_change_timestamp': 1267252440000,
    'description': 'Short description for mock alarm',
    'url': 'https://www.alma2.cl',
    'sound': 'NONE',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  })
};

/** Mock sets of images for the icons of antennas alarms */
export const mockImagesSets = new AlarmImageSet({
  clear: 'antennaImageSet',
  set_low: 'antennaImageSet',
  set_medium: 'antennaImageSet',
  set_high: 'antennaImageSet',
  set_critical: 'antennaImageSet',
  unknown: 'antennaImageSet',
  maintenance: 'antennaImageSet',
  shelved: 'antennaImageSet',
});

/** Mock sets of images for the icons of antennas unreliable alarms */
export const mockImagesUnreliableSets = new AlarmImageSet({
  clear: 'antennaUnreliableImageSet',
  set_low: 'antennaUnreliableImageSet',
  set_medium: 'antennaUnreliableImageSet',
  set_high: 'antennaUnreliableImageSet',
  set_critical: 'antennaUnreliableImageSet',
  unknown: 'antennaUnreliableImageSet',
  maintenance: 'antennaUnreliableImageSet',
  shelved: 'antennaUnreliableImageSet',
});

/** Mock configuration for the Antennas Summary (to be displayed in Overview) */
export const mockSummaryConfig = [new AlarmConfig({
  alarm_id: 'antenna-dummy-alarm',
  custom_name: '',
  type: 'antenna',
  view: 'antennas',
  placemark: '',
  group: 'antennas',
  children: []
})];
