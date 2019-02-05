import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { WeatherDataMarkerComponent } from './weather-data-marker.component';
import { WeatherService } from '../../weather.service';
import { DataModule } from '../../../data/data.module';
import { SharedModule } from '../../../shared/shared.module';
import { mockWeatherStationsConfig, mockImagesSets} from '../../test_fixtures';

describe('WeatherDataMarkerComponent', () => {
  let component: WeatherDataMarkerComponent;
  let fixture: ComponentFixture<WeatherDataMarkerComponent>;
  let weatherService: WeatherService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WeatherDataMarkerComponent,
      ],
      imports: [
        DataModule,
        SharedModule
      ],
      providers: [
        WeatherService
      ]
    })
    .compileComponents();
  }));

  beforeEach(
    inject([WeatherService], (service: WeatherService) => {
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
    fixture = TestBed.createComponent(WeatherDataMarkerComponent);
    component = fixture.componentInstance;
    component.stationConfig = mockWeatherStationsConfig[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
