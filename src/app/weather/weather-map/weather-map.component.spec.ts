import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { WeatherMapComponent } from './weather-map.component';
import { WeatherService } from '../weather.service';
import { MapModule } from '../../map/map.module';
import { DataModule } from '../../data/data.module';
import { SharedModule } from '../../shared/shared.module';
import { Map } from '../../map/fixtures';
import { AlarmConfig } from '../../data/alarm-config';

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
import { mockWeatherStationsConfig, mockImagesSets, mockAlarms} from '../test_fixtures';

describe('WeatherMapComponent', () => {
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
      ],
      imports: [ DataModule, MapModule, SharedModule ],
      providers: [ WeatherService ]
    })
    .compileComponents();
  }));

  beforeEach(
    inject([WeatherService], (service: WeatherService) => {
      weatherService = service;
      spyOn(weatherService, 'initialize')
        .and.callFake(function() {});
      weatherService.weatherStationsConfig = mockWeatherStationsConfig as AlarmConfig[];
      weatherService.windsImageSet = mockImagesSets['windspeed'];
      weatherService.humidityImageSet = mockImagesSets['humidity'];
      weatherService.tempImageSet = mockImagesSets['temperature'];
      weatherService.windsImageUnreliableSet = mockImagesSets['windspeed-unreliable'];
      weatherService.humidityImageUnreliableSet = mockImagesSets['humidity-unreliable'];
      weatherService.tempImageUnreliableSet = mockImagesSets['temperature-unreliable'];
      weatherService.markerImageSet = mockImagesSets['marker'];
      weatherService.markerImageUnreliableSet = mockImagesSets['marker-unreliable'];
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
    fixtureMarkerMap.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
