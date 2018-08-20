import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { WeatherMapComponent } from './weather-map.component';
import { WeatherMarkerMapComponent } from '../weather-marker-map/weather-marker-map.component';
import { WeatherDataMapComponent } from '../weather-data-map/weather-data-map.component';
import { WeatherService } from '../weather.service';
import { DataModule } from '../../data/data.module';
import { Map } from '../../map/fixtures';

import { AlarmComponent } from '../../shared/alarm/alarm.component';
import { AlarmImageSet } from '../../shared/alarm/alarm.component';

const mockWeatherStationsConfig = {
  'name': {
    placemark: 'name',
    station: 'name-0',
    temperature: 'name-0',
    windspeed: 'name-0',
    humidity: 'name-0'
  },
  'mockAlarm-1': {
    placemark: 'mockAlarm-1',
    station: 'mockAlarm-1',
    temperature: 'mockAlarm-1',
    windspeed: 'mockAlarm-1',
    humidity: 'mockAlarm-1'
  },
};

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


describe('WeatherMapComponent', () => {
  let component: WeatherMapComponent;
  let fixture: ComponentFixture<WeatherMapComponent>;
  let componentDataMap: WeatherDataMapComponent;
  let fixtureDataMap: ComponentFixture<WeatherDataMapComponent>;
  let componentMarkerMap: WeatherMarkerMapComponent;
  let fixtureMarkerMap: ComponentFixture<WeatherMarkerMapComponent>;
  let weatherService: WeatherService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WeatherMapComponent,
        WeatherMarkerMapComponent,
        WeatherDataMapComponent,
        AlarmComponent
      ],
      imports: [ DataModule ],
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

    fixtureDataMap = TestBed.createComponent(WeatherDataMapComponent);
    componentDataMap = fixtureDataMap.componentInstance;
    componentDataMap.placemark = 'name';

    fixtureMarkerMap = TestBed.createComponent(WeatherMarkerMapComponent);
    componentMarkerMap = fixtureMarkerMap.componentInstance;
    componentMarkerMap.placemark = 'name';
    componentMarkerMap.iconSet = mockMarkerImagesSets['set'];
    componentMarkerMap.iconUnreliableSet = mockMarkerImagesSets['set-unreliable'];

    fixtureMarkerMap.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
