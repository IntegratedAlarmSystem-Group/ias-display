import { Alarm } from '../data/alarm';
import { AlarmImageSet } from '../shared/alarm/alarm.component';

/** Set of mock configurations for WeatherStations */
export const mockWeatherStationsConfig = [
  {
    placemark: 'mockAlarm-0',
    group: 'group1',
    station: 'mockAlarm-0',
    temperature: 'mockAlarm-0-temperature',
    windspeed: 'mockAlarm-0-windspeed',
    humidity: 'mockAlarm-0-humidity'
  },
  {
    placemark: 'mockAlarm-1',
    group: 'group2',
    station: 'mockAlarm-1',
    temperature: 'mockAlarm-1-temperature',
    windspeed: 'mockAlarm-1-windspeed',
    humidity: 'mockAlarm-1-humidity'
  },
];

/** Mock configuration for WeatherSummary */
export const mockWeatherSummaryConfig = {
  placemark: '',
  group: '',
  station: '',
  temperature: 'mockGlobal-temperature',
  windspeed: 'mockGlobal-windspeed',
  humidity: 'mockGlobal-humidity'
};

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
    'ack': false,
    'shelved': false,
    'dependencies': [],
  }),
};
