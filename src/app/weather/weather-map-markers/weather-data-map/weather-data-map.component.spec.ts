import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { WeatherDataMapComponent } from './weather-data-map.component';
import { WeatherService } from '../../weather.service';

import { AlarmComponent } from '../../../shared/alarm/alarm.component';
import { AlarmImageSet } from '../../../shared/alarm/alarm.component';

import { DataModule } from '../../../data/data.module';

const mockWeatherStationsConfig = {
  'mockAlarm-0': {
    placemark: 'mockAlarm-0',
    station: 'mockAlarm-0',
    temperature: 'mockAlarm-0',
    windspeed: 'mockAlarm-0',
    humidity: 'mockAlarm-0'
  },
  'mockAlarm-1': {
    placemark: 'mockAlarm-1',
    station: 'mockAlarm-1',
    temperature: 'mockAlarm-1',
    windspeed: 'mockAlarm-1',
    humidity: 'mockAlarm-1'
  },
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

describe('WeatherDataMapComponent', () => {
  let component: WeatherDataMapComponent;
  let fixture: ComponentFixture<WeatherDataMapComponent>;
  let weatherService: WeatherService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WeatherDataMapComponent,
        AlarmComponent
      ],
      imports: [
        DataModule
      ],
      providers: [
        WeatherService
      ]
    })
    .compileComponents();
  }));

  beforeEach(
    inject([WeatherService], (service) => {
      weatherService = service;
      spyOn(weatherService, 'initialize')
        .and.callFake(function() {});
      weatherService.weatherStationsConfig = mockWeatherStationsConfig;
      weatherService.windsImageSet = mockImagesSets['0'];
      weatherService.humidityImageSet = mockImagesSets['1'];
      weatherService.tempImageSet = mockImagesSets['2'];
      weatherService.windsImageUnreliableSet = mockImagesSets['0-unreliable'];
      weatherService.humidityImageUnreliableSet = mockImagesSets['1-unreliable'];
      weatherService.tempImageUnreliableSet = mockImagesSets['2-unreliable'];
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherDataMapComponent);
    component = fixture.componentInstance;
    component.placemark = 'mockAlarm-0';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component.alarmConfig.placemark).toEqual(component.placemark);
    expect(component).toBeTruthy();
  });

});
