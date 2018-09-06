import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { ClipboardModule } from 'ngx-clipboard';
import { IasMaterialModule } from '../../ias-material/ias-material.module';
import { SharedModule } from '../../shared/shared.module';
import { ActionsModule } from '../../actions/actions.module';
import { DataModule } from '../../data/data.module';
import { MapModule } from '../../map/map.module';
import { WeatherComponent } from './weather.component';
import { WeatherMapComponent } from '../weather-map/weather-map.component';
import { WeatherSidebarComponent } from '../weather-sidebar/weather-sidebar.component';
import { WeatherStationSidebarComponent } from '../weather-station-sidebar/weather-station-sidebar.component';
import { WeatherService } from '../weather.service';
import { Router } from '@angular/router';
import { Map } from '../../map/fixtures';
import { AlarmImageSet } from '../../shared/alarm/alarm.component';

import {
  WeatherBackupWsMarkerComponent
} from '../weather-map-markers/weather-backup-ws-marker/weather-backup-ws-marker.component';
import {
  WeatherPrimaryWsMarkerComponent
} from '../weather-map-markers/weather-primary-ws-marker/weather-primary-ws-marker.component';
import {
  WeatherPrimaryWsConnectorComponent
} from '../weather-map-markers/weather-primary-ws-connector/weather-primary-ws-connector.component';
import {
  WeatherDataMarkerComponent
} from '../weather-map-markers/weather-data-marker/weather-data-marker.component';
import { mockWeatherStationsConfig, mockImagesSets, mockAlarms} from '../test_fixtures';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;
  let componentDataMarker: WeatherDataMarkerComponent;
  let fixtureDataMarker: ComponentFixture<WeatherDataMarkerComponent>;
  let componentMarkerMap: WeatherPrimaryWsMarkerComponent;
  let fixtureMarkerMap: ComponentFixture<WeatherPrimaryWsMarkerComponent>;
  const spyRoutingTable = jasmine.createSpyObj('Router', ['navigate']);
  let weatherService: WeatherService;
  let weatherMap: WeatherMapComponent;
  let weatherSidebar: WeatherSidebarComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WeatherComponent,
        WeatherMapComponent,
        WeatherPrimaryWsMarkerComponent,
        WeatherPrimaryWsConnectorComponent,
        WeatherDataMarkerComponent,
        WeatherBackupWsMarkerComponent,
        WeatherSidebarComponent,
        WeatherStationSidebarComponent,
      ],
      providers: [
        WeatherService,
        { provide: Router, useValue: spyRoutingTable },
      ],
      imports: [
        ClipboardModule,
        IasMaterialModule,
        SharedModule,
        ActionsModule,
        DataModule,
        MapModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(
    inject([WeatherService], (service) => {
      weatherService = service;
      spyOn(weatherService, 'initialize').and.callFake(function() {});
      weatherService.weatherStationsConfig = mockWeatherStationsConfig;
      weatherService.windsImageSet = mockImagesSets['windspeed'];
      weatherService.humidityImageSet = mockImagesSets['humidity'];
      weatherService.tempImageSet = mockImagesSets['temperature'];
      weatherService.windsImageUnreliableSet = mockImagesSets['windspeed-unreliable'];
      weatherService.humidityImageUnreliableSet = mockImagesSets['humidity-unreliable'];
      weatherService.tempImageUnreliableSet = mockImagesSets['temperature-unreliable'];
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherComponent);
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
    componentMarkerMap.iconSet = mockImagesSets['marker'];
    componentMarkerMap.iconUnreliableSet = mockImagesSets['marker-unreliable'];
    weatherMap = fixture.debugElement.query(By.directive(WeatherMapComponent)).componentInstance;
    weatherSidebar = fixture.debugElement.query(By.directive(WeatherSidebarComponent)).componentInstance;
    fixtureDataMarker.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a WeatherMap and a WeatherSidenav', () => {
    expect(weatherMap).toBeTruthy();
    expect(weatherSidebar).toBeTruthy();
  });
});
