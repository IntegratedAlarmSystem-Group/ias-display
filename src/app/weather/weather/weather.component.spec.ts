import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ClipboardModule } from 'ngx-clipboard';
import { IasMaterialModule } from '../../ias-material/ias-material.module';
import { SharedModule } from '../../shared/shared.module';
import { ActionsModule } from '../../actions/actions.module';
import { DataModule } from '../../data/data.module';
import { MapModule } from '../../map/map.module';
import { WeatherComponent } from './weather.component';
import { WeatherMapComponent } from '../weather-map/weather-map.component';
import { WeatherMainWsMarkerComponent } from '../weather-map-markers/weather-main-ws-marker/weather-main-ws-marker.component';
import { WeatherDataMarkerComponent } from '../weather-map-markers/weather-data-marker/weather-data-marker.component';
import { WeatherSidebarComponent } from '../weather-sidebar/weather-sidebar.component';
import { WeatherBackupWsMarkerComponent } from '../weather-map-markers/weather-backup-ws-marker/weather-backup-ws-marker.component';
import { WeatherStationSidebarComponent } from '../weather-station-sidebar/weather-station-sidebar.component';
import { WeatherService } from '../weather.service';
import { Router } from '@angular/router';
import { Map } from '../../map/fixtures';

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

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;
  let componentDataMarker: WeatherDataMarkerComponent;
  let fixtureDataMarker: ComponentFixture<WeatherDataMarkerComponent>;
  let componentMarkerMap: WeatherMainWsMarkerComponent;
  let fixtureMarkerMap: ComponentFixture<WeatherMainWsMarkerComponent>;
  const spyRoutingTable = jasmine.createSpyObj('Router', ['navigate']);
  let weatherService: WeatherService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WeatherComponent,
        WeatherMapComponent,
        WeatherMainWsMarkerComponent,
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
    fixture = TestBed.createComponent(WeatherComponent);
    weatherService = fixture.debugElement.injector.get(WeatherService);
    spyOn(weatherService, 'getMapData').and.callFake(function() {
      return of(Map);
    });
    component = fixture.componentInstance;

    fixtureDataMarker = TestBed.createComponent(WeatherDataMarkerComponent);
    componentDataMarker = fixtureDataMarker.componentInstance;
    componentDataMarker.placemark = 'name';

    fixtureMarkerMap = TestBed.createComponent(WeatherMainWsMarkerComponent);
    componentMarkerMap = fixtureMarkerMap.componentInstance;
    componentMarkerMap.placemark = 'name';
    componentMarkerMap.iconSet = mockMarkerImagesSets['set'];
    componentMarkerMap.iconUnreliableSet = mockMarkerImagesSets['set-unreliable'];

    fixtureDataMarker.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
