import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { WeatherMapComponent } from './weather-map.component';
import { WeatherService } from '../weather.service';
import { MapModule } from '../../map/map.module';
import { DataModule } from '../../data/data.module';
import { Map } from '../../map/fixtures';
import { AlarmComponent } from '../../shared/alarm/alarm.component';
import { AlarmImageSet } from '../../shared/alarm/alarm.component';

import {
  WeatherDataMarkerComponent
} from '../weather-map-markers/weather-data-marker/weather-data-marker.component';
import {
  WeatherBackupWsMarkerComponent
} from '../weather-map-markers/weather-backup-ws-marker/weather-backup-ws-marker.component';
import {
  WeatherPrimaryWsMarkerComponent
} from '../weather-map-markers/weather-primary-ws-marker/weather-primary-ws-marker.component';
import {
  WeatherPrimaryWsConnectorComponent
} from '../weather-map-markers/weather-primary-ws-connector/weather-primary-ws-connector.component';


const mockWeatherStationsConfig = [
  {
    placemark: 'mockAlarm-0',
    station: 'mockAlarm-0',
    temperature: 'mockAlarm-0',
    windspeed: 'mockAlarm-0',
    humidity: 'mockAlarm-0'
  },
  {
    placemark: 'mockAlarm-1',
    station: 'mockAlarm-1',
    temperature: 'mockAlarm-1',
    windspeed: 'mockAlarm-1',
    humidity: 'mockAlarm-1'
  },
];

const mockMarkerImagesSets = {};
mockMarkerImagesSets['set'] = new AlarmImageSet({
  clear: 'ImageSet',
  set_low: 'ImageSet',
  set_medium: 'ImageSet',
  set_high: 'ImageSet',
  set_critical: 'ImageSet',
  unknown: 'ImageSet',
  maintenance: 'ImageSet',
  shelved: 'ImageSet',
});
mockMarkerImagesSets['set-unreliable'] = new AlarmImageSet({
  clear: 'UnreliableImageSet',
  set_low: 'UnreliableImageSet',
  set_medium: 'UnreliableImageSet',
  set_high: 'UnreliableImageSet',
  set_critical: 'UnreliableImageSet',
  unknown: 'UnreliableImageSet',
  maintenance: 'UnreliableImageSet',
  shelved: 'UnreliableImageSet',
});

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


fdescribe('WeatherMapComponent', () => {
  let component: WeatherMapComponent;
  let fixture: ComponentFixture<WeatherMapComponent>;
  let componentDataMarker: WeatherDataMarkerComponent;
  let fixtureDataMarker: ComponentFixture<WeatherDataMarkerComponent>;
  let componentMarkerMap: WeatherPrimaryWsMarkerComponent;
  let fixtureMarkerMap: ComponentFixture<WeatherPrimaryWsMarkerComponent>;
  let weatherService: WeatherService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WeatherMapComponent,
        WeatherPrimaryWsMarkerComponent,
        WeatherPrimaryWsConnectorComponent,
        WeatherDataMarkerComponent,
        WeatherBackupWsMarkerComponent,
        AlarmComponent
      ],
      imports: [ DataModule, MapModule ],
      providers: [ WeatherService ]
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

    fixture = TestBed.createComponent(WeatherMapComponent);
    weatherService = fixture.debugElement.injector.get(WeatherService);
    spyOn(weatherService, 'getMapData').and.callFake(function() {
      return of(Map);
    });
    component = fixture.componentInstance;

    fixtureDataMarker = TestBed.createComponent(WeatherDataMarkerComponent);
    componentDataMarker = fixtureDataMarker.componentInstance;
    componentDataMarker.stationConfig = mockWeatherStationsConfig[0];

    fixtureMarkerMap = TestBed.createComponent(WeatherPrimaryWsMarkerComponent);
    componentMarkerMap = fixtureMarkerMap.componentInstance;
    componentMarkerMap.stationConfig = mockWeatherStationsConfig[0];
    componentMarkerMap.iconSet = mockMarkerImagesSets['set'];
    componentMarkerMap.iconUnreliableSet = mockMarkerImagesSets['set-unreliable'];

    fixtureMarkerMap.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
