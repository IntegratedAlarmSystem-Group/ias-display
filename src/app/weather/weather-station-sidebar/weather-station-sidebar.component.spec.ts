import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SharedModule } from '../../shared/shared.module';
import { WeatherService } from '../weather.service';
import { AlarmService } from '../../data/alarm.service';
import { WeatherStationSidebarComponent } from './weather-station-sidebar.component';
import { AlarmComponent } from '../../shared/alarm/alarm.component';
import { AlarmHeaderComponent } from '../../shared/alarm-header/alarm-header.component';
import { AlarmImageSet } from '../../shared/alarm/alarm.component';
import { Alarm } from '../../data/alarm';

const mockConfiguration = {
  placemark: 'MockStationAlarm',
  station: 'MockStationAlarm',
  windspeed: 'MockWindSpeedAlarm',
  temperature: 'MockTemperatureAlarm',
  humidity: 'MockHumidityAlarm',
};

const mockAlarms = {
  MockStationAlarm: Alarm.asAlarm({
    'value': 0,
    'core_id': 'MockStationAlarm',
    'running_id': 'MockStationAlarm',
    'mode': '0',
    'core_timestamp': 1267252440000,
    'validity': '1',
    'ack': false,
    'shelved': false,
    'dependencies': [],
  }),
  MockWindSpeedAlarm: Alarm.asAlarm({
    'value': 0,
    'core_id': 'MockWindSpeedAlarm',
    'running_id': 'MockWindSpeedAlarm',
    'mode': '0',
    'core_timestamp': 1267252440000,
    'validity': '1',
    'ack': false,
    'shelved': false,
    'dependencies': [],
  }),
  MockTemperatureAlarm: Alarm.asAlarm({
    'value': 0,
    'core_id': 'MockTemperatureAlarm',
    'running_id': 'MockTemperatureAlarm',
    'mode': '0',
    'core_timestamp': 1267252440000,
    'validity': '1',
    'ack': false,
    'shelved': false,
    'dependencies': [],
  }),
  MockHumidityAlarm: Alarm.asAlarm({
    'value': 0,
    'core_id': 'MockHumidityAlarm',
    'running_id': 'MockHumidityAlarm',
    'mode': '0',
    'core_timestamp': 1267252440000,
    'validity': '1',
    'ack': false,
    'shelved': false,
    'dependencies': [],
  })
};

const mockImagesSets = {};
const alarm_types = ['winds', 'hum', 'temp'];
for ( const item in alarm_types) {
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

describe('WeatherStationSidebarComponent', () => {
  let component: WeatherStationSidebarComponent;
  let fixture: ComponentFixture<WeatherStationSidebarComponent>;
  let alarmService: AlarmService;
  let weatherService: WeatherService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WeatherStationSidebarComponent,
      ],
      providers: [
        WeatherService,
      ],
      imports: [
        SharedModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(
    inject([WeatherService], (service) => {
      weatherService = service;
      spyOn(weatherService, 'initialize')
        .and.callFake(function() {});
      weatherService.windsImageSet = mockImagesSets['0'];
      weatherService.humidityImageSet = mockImagesSets['1'];
      weatherService.tempImageSet = mockImagesSets['2'];
      weatherService.windsImageUnreliableSet = mockImagesSets['0-unreliable'];
      weatherService.humidityImageUnreliableSet = mockImagesSets['1-unreliable'];
      weatherService.tempImageUnreliableSet = mockImagesSets['2-unreliable'];
    })
  );

  beforeEach(
    inject([AlarmService], (service) => {
      alarmService = service;
      spyOn(alarmService, 'get').and.callFake(function(alarm_id) {
        return mockAlarms[alarm_id];
      });
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherStationSidebarComponent);
    component = fixture.componentInstance;
    component.stationConfig = mockConfiguration;
    component.selectedAlarm = '';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a getAlarm function', () => {
    expect(component.getAlarm('MockStationAlarm')).toEqual(mockAlarms['MockStationAlarm']);
  });

  it('should have a Header Alarm Component to display the station alarm', () => {
    const alarmHeaderDebugElement = fixture.debugElement.query(By.directive(AlarmHeaderComponent));
    const alarmHeader = alarmHeaderDebugElement.componentInstance;
    expect(alarmHeader).toBeTruthy();
    expect(alarmHeader.alarm).toEqual(mockAlarms['MockStationAlarm']);
  });

  it('should have three Alarm Components to display station dependencies alarms', () => {
    const alarmsDebugElements = fixture.debugElement.queryAll(By.directive(AlarmComponent));
    expect(alarmsDebugElements.length).toEqual(3);

    const windAlarm = alarmsDebugElements[0].componentInstance;
    expect(windAlarm).toBeTruthy();
    expect(windAlarm.alarm).toEqual(mockAlarms['MockWindSpeedAlarm']);
    expect(windAlarm.images).toEqual(mockImagesSets['0']);
    expect(windAlarm.imagesUnreliable).toEqual(mockImagesSets['0-unreliable']);

    const humAlarm = alarmsDebugElements[1].componentInstance;
    expect(humAlarm).toBeTruthy();
    expect(humAlarm.alarm).toEqual(mockAlarms['MockHumidityAlarm']);
    expect(humAlarm.images).toEqual(mockImagesSets['1']);
    expect(humAlarm.imagesUnreliable).toEqual(mockImagesSets['1-unreliable']);

    const tempAlarm = alarmsDebugElements[2].componentInstance;
    expect(tempAlarm).toBeTruthy();
    expect(tempAlarm.alarm).toEqual(mockAlarms['MockTemperatureAlarm']);
    expect(tempAlarm.images).toEqual(mockImagesSets['2']);
    expect(tempAlarm.imagesUnreliable).toEqual(mockImagesSets['2-unreliable']);
  });
});
