import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { WeatherPrimaryWsMarkerComponent } from './weather-primary-ws-marker.component';
import { WeatherService } from '../../weather.service';
import { AlarmComponent } from '../../../shared/alarm/alarm.component';
import { AlarmImageSet } from '../../../shared/alarm/alarm.component';
import { DataModule } from '../../../data/data.module';
import { mockWeatherStationsConfig, mockImagesSets} from '../../test_fixtures';

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
    weatherService.markerImageSet = mockImagesSets['marker'];
    weatherService.markerImageUnreliableSet = mockImagesSets['marker-unreliable'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
