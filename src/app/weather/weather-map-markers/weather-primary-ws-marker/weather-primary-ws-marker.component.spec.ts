import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { WeatherPrimaryWsMarkerComponent } from './weather-primary-ws-marker.component';
import { WeatherService } from '../../weather.service';
import { AlarmComponent } from '../../../shared/alarm/alarm.component';
import { AlarmImageSet } from '../../../shared/alarm/alarm.component';
import { DataModule } from '../../../data/data.module';

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

const mockImagesSets = {};

mockImagesSets['set'] = new AlarmImageSet({
  clear: 'ImageSet',
  set_low: 'ImageSet',
  set_medium: 'ImageSet',
  set_high: 'ImageSet',
  set_critical: 'ImageSet',
  unknown: 'ImageSet',
  maintenance: 'ImageSet',
  shelved: 'ImageSet',
});

mockImagesSets['set-unreliable'] = new AlarmImageSet({
  clear: 'UnreliableImageSet',
  set_low: 'UnreliableImageSet',
  set_medium: 'UnreliableImageSet',
  set_high: 'UnreliableImageSet',
  set_critical: 'UnreliableImageSet',
  unknown: 'UnreliableImageSet',
  maintenance: 'UnreliableImageSet',
  shelved: 'UnreliableImageSet',
});


describe('WeatherPrimaryWsMarkerComponent', () => {
  let component: WeatherPrimaryWsMarkerComponent;
  let fixture: ComponentFixture<WeatherPrimaryWsMarkerComponent>;
  let weatherService: WeatherService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WeatherPrimaryWsMarkerComponent,
        AlarmComponent
      ],
      imports: [
        HttpClientModule,
        DataModule
      ],
      providers: [
        HttpClient,
        WeatherService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherPrimaryWsMarkerComponent);
    weatherService = fixture.debugElement.injector.get(WeatherService);
    spyOn(weatherService, 'initialize').and.callFake(function() {
    });
    weatherService.weatherStationsConfig = mockWeatherStationsConfig;
    component = fixture.componentInstance;
    component.stationConfig = mockWeatherStationsConfig[0];
    component.iconSet = mockImagesSets['set'];
    component.iconUnreliableSet = mockImagesSets['set-unreliable'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
