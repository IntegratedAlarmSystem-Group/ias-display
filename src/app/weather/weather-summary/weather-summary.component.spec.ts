import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { IasMaterialModule } from '../../ias-material/ias-material.module';
import { DataModule } from '../../data/data.module';
import { SharedModule } from '../../shared/shared.module';
import { WeatherSummaryComponent } from './weather-summary.component';
import { RoutingService} from '../../app-routing/routing.service';
import { AlarmComponent } from '../../shared/alarm/alarm.component';
import { AlarmService } from '../../data/alarm.service';
import { WeatherService } from '../weather.service';
import { mockWeatherSummaryConfig, mockImagesSets} from '../test_fixtures';

describe('WeatherSummaryComponent', () => {
  let component: WeatherSummaryComponent;
  let debug: DebugElement;
  let fixture: ComponentFixture<WeatherSummaryComponent>;
  let alarmService: AlarmService;
  let weatherService: WeatherService;
  const spyRoutingTable = jasmine.createSpyObj('RoutingService', ['tableWithFilter', 'goToWeather']);


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WeatherSummaryComponent,
      ],
      imports: [
        IasMaterialModule,
        DataModule,
        SharedModule,
      ],
      providers: [
        { provide: RoutingService, useValue: spyRoutingTable },
        WeatherService
      ],
    })
    .overrideModule( BrowserDynamicTestingModule , {
      set: {
        entryComponents: [ AlarmComponent ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherSummaryComponent);
    weatherService = fixture.debugElement.injector.get(WeatherService);
    spyOn(weatherService, 'initialize').and.callFake(function() {});
    weatherService.weatherSummaryConfig = mockWeatherSummaryConfig;
    weatherService.windsImageSet = mockImagesSets['windspeed'];
    weatherService.humidityImageSet = mockImagesSets['humidity'];
    weatherService.tempImageSet = mockImagesSets['temperature'];
    weatherService.windsImageUnreliableSet = mockImagesSets['windspeed-unreliable'];
    weatherService.humidityImageUnreliableSet = mockImagesSets['humidity-unreliable'];
    weatherService.tempImageUnreliableSet = mockImagesSets['temperature-unreliable'];
    component = fixture.componentInstance;
    debug = fixture.debugElement;
    alarmService = fixture.debugElement.injector.get(AlarmService);
    fixture.detectChanges();
  });

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  describe('WHEN the component calls goToTableFilteredBy', () => {
    it('THEN the RoutingService.tableWithFilter is called', () => {
      const old_call_count = spyRoutingTable.tableWithFilter.calls.count();
      component.goToTableFilteredBy('mock filter');
      const new_call_count = spyRoutingTable.tableWithFilter.calls.count();
      expect(new_call_count).toBe(old_call_count + 1, 'tableWithFilter() was called once');
      expect(spyRoutingTable.tableWithFilter.calls.mostRecent().args[0]).
        toBe('mock filter', 'tableWithFilter was called with the right parameters');
    });
  });

  describe('WHEN the component calls redirect', () => {
    it('THEN the RoutingService.goToWeather is called', () => {
      const old_call_count = spyRoutingTable.goToWeather.calls.count();
      component.redirect();
      const new_call_count = spyRoutingTable.goToWeather.calls.count();
      expect(new_call_count).toBe(old_call_count + 1, 'goToWeather() was called once');
    });
  });

  describe('AND WHEN the user clicks on it', () => {
    it('THEN the RoutingService.goToWeather is called', () => {
      const old_call_count = spyRoutingTable.goToWeather.calls.count();
      const mainPanel = debug.query(By.css('.content')).nativeElement;
      mainPanel.click();
      const new_call_count = spyRoutingTable.goToWeather.calls.count();
      expect(mainPanel).toBeTruthy();
      expect(new_call_count).toBe(old_call_count + 1, 'goToWeather() was called once');
    });
  });
});
