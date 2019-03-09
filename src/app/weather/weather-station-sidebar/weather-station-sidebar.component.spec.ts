import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SharedModule } from '../../shared/shared.module';
import { WeatherService } from '../weather.service';
import { AlarmService } from '../../data/alarm.service';
import { WeatherStationSidebarComponent } from './weather-station-sidebar.component';
import { AlarmComponent } from '../../shared/alarm/alarm.component';
import { AlarmHeaderComponent } from '../../shared/alarm-header/alarm-header.component';
import { mockWeatherStationsConfig, mockImagesSets, mockAlarms, alarm_types} from '../test_fixtures';

describe('WeatherStationSidebarComponent', () => {
  let component: WeatherStationSidebarComponent;
  let fixture: ComponentFixture<WeatherStationSidebarComponent>;
  let alarmService: AlarmService;
  let weatherService: WeatherService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WeatherStationSidebarComponent,
      ],
      providers: [
        WeatherService,
      ],
      imports: [
        SharedModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(
    inject([WeatherService], (service: WeatherService) => {
      weatherService = service;
      spyOn(weatherService, 'initialize')
        .and.callFake(function() {});
      weatherService.windsImageSet = mockImagesSets['windspeed'];
      weatherService.humidityImageSet = mockImagesSets['humidity'];
      weatherService.tempImageSet = mockImagesSets['temperature'];
      weatherService.windsImageUnreliableSet = mockImagesSets['windspeed-unreliable'];
      weatherService.humidityImageUnreliableSet = mockImagesSets['humidity-unreliable'];
      weatherService.tempImageUnreliableSet = mockImagesSets['temperature-unreliable'];
    })
  );

  beforeEach(
    inject([AlarmService], (service: AlarmService) => {
      alarmService = service;
      spyOn(alarmService, 'get').and.callFake(function(alarm_id: string) {
        return mockAlarms[alarm_id];
      });
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherStationSidebarComponent);
    component = fixture.componentInstance;
    component.stationConfig = mockWeatherStationsConfig[0];
    component.selectedAlarm = null;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a Header Alarm Component to display the station alarm', () => {
    const alarmHeaderDebugElement = fixture.debugElement.query(By.directive(AlarmHeaderComponent));
    const alarmHeader = alarmHeaderDebugElement.componentInstance;
    expect(alarmHeader).toBeTruthy();
    expect(alarmHeader.alarm).toEqual(mockAlarms['mockAlarm-0']);
  });

  it('should have three Alarm Components to display station dependencies alarms', () => {
    const alarmsDebugElements = fixture.debugElement.queryAll(By.directive(AlarmComponent));
    expect(alarmsDebugElements.length).toEqual(3);

    const windAlarm = alarmsDebugElements[0].componentInstance;
    expect(windAlarm).toBeTruthy();
    expect(windAlarm.alarm).toEqual(mockAlarms['mockAlarm-0-windspeed']);
    expect(windAlarm.images).toEqual(mockImagesSets['windspeed']);
    expect(windAlarm.imagesUnreliable).toEqual(mockImagesSets['windspeed-unreliable']);

    const humAlarm = alarmsDebugElements[1].componentInstance;
    expect(humAlarm).toBeTruthy();
    expect(humAlarm.alarm).toEqual(mockAlarms['mockAlarm-0-humidity']);
    expect(humAlarm.images).toEqual(mockImagesSets['humidity']);
    expect(humAlarm.imagesUnreliable).toEqual(mockImagesSets['humidity-unreliable']);

    const tempAlarm = alarmsDebugElements[2].componentInstance;
    expect(tempAlarm).toBeTruthy();
    expect(tempAlarm.alarm).toEqual(mockAlarms['mockAlarm-0-temperature']);
    expect(tempAlarm.images).toEqual(mockImagesSets['temperature']);
    expect(tempAlarm.imagesUnreliable).toEqual(mockImagesSets['temperature-unreliable']);
  });
});
