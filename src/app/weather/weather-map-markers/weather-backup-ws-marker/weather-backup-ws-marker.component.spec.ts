import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { WeatherService } from '../../weather.service';
import { DataModule } from '../../../data/data.module';
import { SharedModule } from '../../../shared/shared.module';
import { WeatherBackupWsMarkerComponent } from './weather-backup-ws-marker.component';
import { mockWeatherStationsConfig, mockImagesSets} from '../../test_fixtures';

describe('WeatherBackupWsMarkerComponent', () => {
  let component: WeatherBackupWsMarkerComponent;
  let fixture: ComponentFixture<WeatherBackupWsMarkerComponent>;
  let weatherService: WeatherService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WeatherBackupWsMarkerComponent,
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
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherBackupWsMarkerComponent);
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
