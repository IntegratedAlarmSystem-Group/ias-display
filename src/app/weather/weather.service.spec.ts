import { TestBed, inject } from '@angular/core/testing';
import { of } from 'rxjs';
import { DataModule } from '../data/data.module';
import { WeatherService } from './weather.service';
import { TestRequest } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientService } from '../data/http-client.service';
import { Map } from '../map/fixtures';
import { mockWeatherStationsConfig, mockWeatherSummaryConfig, mockImagesSets} from './test_fixtures';
import { BackendUrls } from '../settings';
import { Alarm } from '../data/alarm';
import { AlarmService } from '../data/alarm.service';


const mockAlarmBaseOne = {
  'value': 1,
  'core_id': 'WSAlarmOne',
  'running_id': 'WSAlarmOne',
  'mode': 0,
  'core_timestamp': 1267252440000,
  'state_change_timestamp': 1267252440000,
  'value_change_timestamp': 1267252440000,
  'value_change_transition': [0, 0],
  'validity': 1,
  'description': 'my description',
  'url': 'https://www.alma.cl',
  'sound': 'sound1',
  'can_shelve': true,
  'ack': false,
  'shelved': false,
  'dependencies': [],
  'properties': {
    'affectedAntennas': 'A00,A01,A02,A03'
  }
};

describe('WeatherService', () => {
  let subject: WeatherService;
  let alarmService: AlarmService;
  let httpClient: HttpClientService;

  const padsStatusUrl = BackendUrls.PADS_STATUS;

  const mockPadsStatusResponse = {
      'S': {
        'PAD1': 'A1',
        'PAD2': null,
      },
      'W': {
        'PAD3': null,
        'PAD4': 'A2',
      },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeatherService],
      imports: [DataModule],
    });
  });

  beforeEach(
    inject([AlarmService], (service: AlarmService) => {
      alarmService = service;
    })
  );

  beforeEach(
    inject(
      [ WeatherService, HttpClientService],
      (weatherService, httpClientService) => {
    subject = weatherService;
    httpClient = httpClientService;
  }));

  it('should be created', () => {
    expect(subject).toBeTruthy();
  });

  it('should retrieve the weather stations config on intialization', () => {
    spyOn(httpClient, 'get').and.callFake(function() {
      return of(mockWeatherStationsConfig);
    });
    expect(subject.weatherStationsConfig).toBeUndefined();
    subject.initialize();
    expect(subject).toBeTruthy();
    expect(subject.weatherStationsConfig).toEqual(mockWeatherStationsConfig);
  });

  it('should retrieve the weather summary config on intialization', () => {
    spyOn(httpClient, 'get').and.callFake(function() {
      return of(mockWeatherSummaryConfig);
    });
    expect(subject.weatherSummaryConfig).toBeUndefined();
    subject.initialize();
    expect(subject).toBeTruthy();
    expect(subject.weatherSummaryConfig).toEqual(mockWeatherSummaryConfig);
  });

  it('should define the icons set on intialization', () => {
    expect(subject.humidityImageSet).toBeUndefined();
    expect(subject.tempImageSet).toBeUndefined();
    expect(subject.windsImageSet).toBeUndefined();
    expect(subject.markerImageSet).toBeUndefined();
    expect(subject.humidityImageUnreliableSet).toBeUndefined();
    expect(subject.tempImageUnreliableSet).toBeUndefined();
    expect(subject.windsImageUnreliableSet).toBeUndefined();
    expect(subject.markerImageUnreliableSet).toBeUndefined();
    spyOn(httpClient, 'get').and.callFake(function() {
      return of(mockWeatherSummaryConfig);
    });
    expect(subject.weatherSummaryConfig).toBeUndefined();
    subject.initialize();
    expect(subject).toBeTruthy();
    expect(subject.humidityImageSet).not.toBeUndefined();
    expect(subject.tempImageSet).not.toBeUndefined();
    expect(subject.windsImageSet).not.toBeUndefined();
    expect(subject.markerImageSet).not.toBeUndefined();
    expect(subject.humidityImageUnreliableSet).not.toBeUndefined();
    expect(subject.tempImageUnreliableSet).not.toBeUndefined();
    expect(subject.windsImageUnreliableSet).not.toBeUndefined();
    expect(subject.markerImageUnreliableSet).not.toBeUndefined();
  });

  it('should have a method to get the Map', () => {
    spyOn(httpClient, 'get').and.callFake(function() {
      return of(Map);
    });
    subject.getMapData().subscribe((mapdata) => {
      expect(mapdata).toEqual(Map);
    });
  });

  it('should have a method to load the pad status in the service', () => {
    const group = 'S';
    spyOn(httpClient, 'get').and.callFake(function() {
      return of(mockPadsStatusResponse);
    });
    subject.loadPadsStatus(group);
    expect(httpClient.get).toHaveBeenCalled();
    expect(httpClient.get).toHaveBeenCalledWith(padsStatusUrl + group);
    expect(subject.padsStatus).toEqual(mockPadsStatusResponse);
  });

  it('should be able to get a flattenned list of alarm configurations', () => {
    const mockConfig = [
      {
        'alarm_id': 'WSAlarm', 'children': [
          {'alarm_id': 'WSAlarmOne', children: []},
          {'alarm_id': 'WSAlarmTwo', children: []},
        ]
      }
    ];
    const flattenedList = subject.getFlattennedList(mockConfig);
    expect(flattenedList).toEqual(['WSAlarm', 'WSAlarmOne', 'WSAlarmTwo']);
  });

  it('should be able to update antennas and alarms relation maps from alarm properties', () => {
    const mockAlarmBaseTwo = Object.assign({}, mockAlarmBaseOne);
    mockAlarmBaseTwo.core_id = 'WSAlarmTwo';
    const mockAlarmOne = Alarm.asAlarm(mockAlarmBaseOne);
    const mockAlarmTwo = Alarm.asAlarm(mockAlarmBaseTwo);
    spyOn(alarmService, 'isAlarmIndexAvailable').and.returnValue(true);
    spyOn(alarmService, 'get').and.callFake(
      function (alarmId) {
        return (alarmId === 'WSAlarmOne' ? mockAlarmOne : mockAlarmTwo);
      }
    );
    subject.updateAntennasRelationMaps('WSAlarmOne');
    subject.updateAntennasRelationMaps('WSAlarmTwo');
    expect(subject.alarmIdToAffectedAntennasMap).toEqual(
      {
        'WSAlarmOne' : ['A00', 'A01', 'A02', 'A03'],
        'WSAlarmTwo' : ['A00', 'A01', 'A02', 'A03'],
      }
    );
    expect(subject.affectedAntennasToAlarmIdsMap).toEqual(
      {
        'A00': ['WSAlarmOne', 'WSAlarmTwo'],
        'A01': ['WSAlarmOne', 'WSAlarmTwo'],
        'A02': ['WSAlarmOne', 'WSAlarmTwo'],
        'A03': ['WSAlarmOne', 'WSAlarmTwo'],
      }
    );
  });

  it('should get a color for an affected antenna related to the alarm with higher priority', () => {
    const mockAlarmBaseTwo = Object.assign({}, mockAlarmBaseOne);
    mockAlarmBaseTwo.core_id = 'WSAlarmTwo';
    mockAlarmBaseTwo.value = 3;
    const mockAlarmBaseThree = Object.assign({}, mockAlarmBaseOne);
    mockAlarmBaseThree.core_id = 'WSAlarmThree';
    mockAlarmBaseThree.value = 2;
    const mockAlarmOne = Alarm.asAlarm(mockAlarmBaseOne);
    const mockAlarmTwo = Alarm.asAlarm(mockAlarmBaseTwo);
    const mockAlarmThree = Alarm.asAlarm(mockAlarmBaseThree);
    spyOn(alarmService, 'isAlarmIndexAvailable').and.returnValue(true);
    spyOn(alarmService, 'get').and.callFake(
      function (alarmId: string) {
        switch (alarmId) {
          case mockAlarmOne.core_id:
            return mockAlarmOne;
          case mockAlarmTwo.core_id:
            return mockAlarmTwo;
          default:
            return mockAlarmThree;
        }
      }
    );
    subject.updateAntennasRelationMaps('WSAlarmOne');
    subject.updateAntennasRelationMaps('WSAlarmTwo');
    subject.updateAntennasRelationMaps('WSAlarmThree');
    subject.updateAntennaHighPriorityAlarm('A02');
    expect(subject.affectedAntennaHighPriorityAlarm['A02'].core_id).toEqual(
      mockAlarmTwo.core_id);
    expect(subject.affectedAntennaHighPriorityAlarm['A02'].value).toEqual(
      mockAlarmTwo.value);
  });

});
