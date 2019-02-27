import {Alarm} from './alarm';

describe('Alarm', () => {
  const alarm: Alarm = Alarm.asAlarm({
    'value': 4,
    'core_id': 'alarm_1',
    'running_id': 'alarm_1',
    'mode': 5,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 1,
    'description': 'my description',
    'url': 'https://www.alma.cl',
    'sound': 'TYPE1',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
    'dependencies': [],
    'properties': null,
  });
  it('should create an instane of an Alarm', () => {
    expect(new Alarm()).toBeTruthy();
  });

  it('should display properties as an empty string if the Alarm has no properties', () => {
    alarm.properties = null;
    expect(alarm).toBeTruthy();
    expect(alarm.formattedProperties).toEqual('');
  });

  it('should display properties in a single line if the Alarm has 1 property which is not an Object or list', () => {
    alarm.properties = {
      'prop1': 'value1'
    };
    expect(alarm).toBeTruthy();
    expect(alarm.formattedProperties).toEqual('{ "prop1": "value1" }');
  });

  it('should display properties indented if the Alarm has 1 property which is an Object', () => {
    const expectedJson: any = {
      'prop1': {
        'subProp1': 'subValue1',
        'subProp2': 'subValue2',
      }
    };
    alarm.properties = expectedJson;
    expect(alarm).toBeTruthy();
    const expectedString: string = JSON.stringify(expectedJson, null, 2);
    expect(alarm.formattedProperties).toEqual(expectedString);
  });

  it('should display properties indented if the Alarm has 1 property which is a list', () => {
    const expectedJson: any = {
      'prop1': [
        'subValue1',
        'subValue2',
      ]
    };
    alarm.properties = expectedJson;
    expect(alarm).toBeTruthy();
    const expectedString: string = JSON.stringify(expectedJson, null, 2);
    expect(alarm.formattedProperties).toEqual(expectedString);
  });

  it('should display properties indented if the Alarm has more than 1 property', () => {
    const expectedJson: any = {
      'prop1': 'value1',
      'prop2': {
        'subProp1': 'subValue1',
        'subProp2': 'subValue2',
      }
    };
    alarm.properties = expectedJson;
    expect(alarm).toBeTruthy();
    const expectedString: string = JSON.stringify(expectedJson, null, 2);
    expect(alarm.formattedProperties).toEqual(expectedString);
  });
});
