import { Alarm } from '../data/alarm';
import { AlarmImageSet } from '../shared/alarm/alarm.component';
import { AlarmConfig } from '../data/alarm-config';

/** Set of mock configurations for WeatherStations */
export const mockWeatherStationsConfig = [
  {
    'alarm_id': 'mockAlarm-0',
    'custom_name': null,
    'type': 'station',
    'view': 'weather',
    'placemark': 'mockAlarm-0',
    'group': 'group1',
    'children': [
      {
        'alarm_id': 'mockAlarm-0-windspeed',
        'custom_name': null,
        'type': 'windspeed',
        'view': 'weather',
        'placemark': '',
        'group': 'group1',
        'children': []
      },
      {
        'alarm_id': 'mockAlarm-0-humidity',
        'custom_name': null,
        'type': 'humidity',
        'view': 'weather',
        'placemark': '',
        'group': 'group1',
        'children': []
      },
      {
        'alarm_id': 'mockAlarm-0-temperature',
        'custom_name': null,
        'type': 'temperature',
        'view': 'weather',
        'placemark': '',
        'group': 'group1',
        'children': []
      }
    ]
  },
  {
    'alarm_id': 'mockAlarm-1',
    'custom_name': null,
    'type': 'station',
    'view': 'weather',
    'placemark': 'mockAlarm-1',
    'group': 'group2',
    'children': [
      {
        'alarm_id': 'mockAlarm-0-windspeed',
        'custom_name': null,
        'type': 'windspeed',
        'view': 'weather',
        'placemark': '',
        'group': 'group2',
        'children': []
      },
      {
        'alarm_id': 'mockAlarm-0-humidity',
        'custom_name': null,
        'type': 'humidity',
        'view': 'weather',
        'placemark': '',
        'group': 'group2',
        'children': []
      },
      {
        'alarm_id': 'mockAlarm-0-temperature',
        'custom_name': null,
        'type': 'temperature',
        'view': 'weather',
        'placemark': '',
        'group': 'group2',
        'children': []
      }
    ]
  },
] as AlarmConfig[];

/** Mock configuration for WeatherSummary */
export const mockWeatherSummaryConfig = [
  {
    'alarm_id': 'mockGlobal-windspeed',
    'custom_name': 'Wind Speed',
    'type': 'windspeed',
    'view': 'weather_summary',
    'placemark': '',
    'group': '',
    'children': []
  },
  {
    'alarm_id': 'mockGlobal-humidity',
    'custom_name': 'Humidity',
    'type': 'humidity',
    'view': 'weather_summary',
    'placemark': '',
    'group': '',
    'children': []
  },
  {
    'alarm_id': 'mockGlobal-temperature',
    'custom_name': 'Temperature',
    'type': 'temperature',
    'view': 'weather_summary',
    'placemark': '',
    'group': '',
    'children': []
  }
] as AlarmConfig[];

/** Set of mock {@link ImageSet} */
export const mockImagesSets = {};

/** Set of mock types of alarms */
export const alarm_types = ['windspeed', 'humidity', 'temperature', 'marker'];
for ( const item of alarm_types) {
  if (alarm_types[item] !== null ) {
    mockImagesSets[item] = new AlarmImageSet({
      clear: alarm_types[item] + 'ImageSet',
      set_low: alarm_types[item] + 'ImageSet',
      set_medium: alarm_types[item] + 'ImageSet',
      set_high: alarm_types[item] + 'ImageSet',
      set_critical: alarm_types[item] + 'ImageSet',
      unknown: alarm_types[item] + 'ImageSet',
      maintenance: alarm_types[item] + 'ImageSet',
      shelved: alarm_types[item] + 'ImageSet',
    });
    mockImagesSets[item + '-unreliable'] = new AlarmImageSet({
      clear: alarm_types[item] + 'UnreliableImageSet',
      set_low: alarm_types[item] + 'UnreliableImageSet',
      set_medium: alarm_types[item] + 'UnreliableImageSet',
      set_high: alarm_types[item] + 'UnreliableImageSet',
      set_critical: alarm_types[item] + 'UnreliableImageSet',
      unknown: alarm_types[item] + 'UnreliableImageSet',
      maintenance: alarm_types[item] + 'UnreliableImageSet',
      shelved: alarm_types[item] + 'UnreliableImageSet',
    });
  }
}

/** Set of mock alarms */
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
    'dependencies': [],
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
    'dependencies': [],
  }),
  'mockAlarm-0-temperature': Alarm.asAlarm({
    'value': 0,
    'core_id': 'mockAlarm-0-temperature',
    'running_id': 'mockAlarm-0-temperature',
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
    'dependencies': [],
  }),
  'mockAlarm-0-windspeed': Alarm.asAlarm({
    'value': 0,
    'core_id': 'mockAlarm-0-windspeed',
    'running_id': 'mockAlarm-0-windspeed',
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
    'dependencies': [],
  }),
  'mockAlarm-0-humidity': Alarm.asAlarm({
    'value': 0,
    'core_id': 'mockAlarm-0-humidity',
    'running_id': 'mockAlarm-0-humidity',
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
    'dependencies': [],
  }),
  'mockAlarm-1-temperature': Alarm.asAlarm({
    'value': 0,
    'core_id': 'mockAlarm-1-temperature',
    'running_id': 'mockAlarm-1-temperature',
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
    'dependencies': [],
  }),
  'mockAlarm-1-windspeed': Alarm.asAlarm({
    'value': 0,
    'core_id': 'mockAlarm-1-windspeed',
    'running_id': 'mockAlarm-1-windspeed',
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
    'dependencies': [],
  }),
  'mockAlarm-1-humidity': Alarm.asAlarm({
    'value': 0,
    'core_id': 'mockAlarm-1-humidity',
    'running_id': 'mockAlarm-1-humidity',
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
    'dependencies': [],
  }),
};
