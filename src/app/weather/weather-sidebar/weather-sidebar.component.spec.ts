import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IasMaterialModule } from '../../ias-material/ias-material.module';
import { SharedModule } from '../../shared/shared.module';
import { ActionsModule } from '../../actions/actions.module';
import { DataModule } from '../../data/data.module';
import { WeatherSidebarComponent } from './weather-sidebar.component';
import { WeatherStationSidebarComponent } from '../weather-station-sidebar/weather-station-sidebar.component';
import { AlarmImageSet } from '../../shared/alarm/alarm.component';
import { AlarmComponent } from '../../shared/alarm/alarm.component';
import { StatusViewComponent } from '../../shared/status-view/status-view.component';
import { ButtonsComponent } from '../../actions/buttons/buttons.component';
import { WeatherService } from '../weather.service';
import { AlarmService } from '../../data/alarm.service';
import { CdbService } from '../../data/cdb.service';
import { Router } from '@angular/router';
import { Alarm } from '../../data/alarm';
const mockWeatherStationsConfig = [
  {
    station: 'mockAlarm-0',
    temperature: 'mockAlarm-0',
    windspeed: 'mockAlarm-0',
    humidity: 'mockAlarm-0'
  },
  {
    station: 'mockAlarm-1',
    temperature: 'mockAlarm-1',
    windspeed: 'mockAlarm-1',
    humidity: 'mockAlarm-1'
  },
];

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

const mockAlarms = {
  'mockAlarm-0': Alarm.asAlarm({
    'value': 0,
    'core_id': 'mockAlarm-0',
    'running_id': 'mockAlarm-0',
    'mode': '0',
    'core_timestamp': 1267252440000,
    'validity': '1',
    'ack': false,
    'shelved': false,
    'dependencies': [],
  }),
  'mockAlarm-1': Alarm.asAlarm({
    'value': 0,
    'core_id': 'mockAlarm-1',
    'running_id': 'mockAlarm-1',
    'mode': '0',
    'core_timestamp': 1267252440000,
    'validity': '1',
    'ack': false,
    'shelved': false,
    'dependencies': [],
  })
};

fdescribe('WeatherSidebarComponent', () => {
  let sidebarComponent: WeatherSidebarComponent;
  let fixture: ComponentFixture<WeatherSidebarComponent>;
  const spyRoutingTable = jasmine.createSpyObj('Router', ['navigate']);
  let weatherService: WeatherService;
  let alarmService: AlarmService;
  let cdbService: CdbService;
  let content: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WeatherSidebarComponent,
        WeatherStationSidebarComponent,
      ],
      providers: [
        WeatherService,
        { provide: Router, useValue: spyRoutingTable },
      ],
      imports: [
        IasMaterialModule,
        SharedModule,
        ActionsModule,
        DataModule,
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

  beforeEach(
    inject([AlarmService], (service) => {
      alarmService = service;
      spyOn(alarmService, 'get').and.callFake(function(alarm_id) {
        return mockAlarms[alarm_id];
      });
    })
  );

  beforeEach(
    inject([CdbService], (service) => {
      cdbService = service;
      spyOn(cdbService, 'getAlarmsInformationUrl').and.callFake(function(alarm_id) {
        return 'url-' + alarm_id;
      });
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherSidebarComponent);
    sidebarComponent = fixture.componentInstance;
    content = fixture.nativeElement.querySelector('.weather-sidebar-content');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(sidebarComponent).toBeTruthy();
  });

  describe('Should have a mat accordion', () => {
    it('in the content div', () => {
      expect(content.querySelector('mat-accordion')).toBeTruthy();
    });

    describe('with mat expansion panels', () => {
      it('for each configured station', () => {
        const panels = content.querySelectorAll('mat-expansion-panel');
        expect(panels.length).toBe(2);
      });

      it('Each panel contains a weather station sidebar component as header\
        that receive the weather station configuration as input', () => {
        const panels = fixture.debugElement.queryAll(By.css('mat-expansion-panel'));
        for (const i in panels) {
          if ( panels[i] !== null ) {
            const panel = panels[i];
            const header = panel.query(By.css('mat-expansion-panel-header'));
            expect(header).toBeTruthy();
            const stationSidebarDebugElement = header.query(By.directive(WeatherStationSidebarComponent));
            const stationSidebarComponent = stationSidebarDebugElement.componentInstance;
            expect(stationSidebarComponent).toBeTruthy();
            expect(stationSidebarComponent.stationConfig).toEqual(mockWeatherStationsConfig[i]);
            expect(stationSidebarComponent.selectedAlarm).toEqual('');
          }
        }
      });

      it('Each panel contains a table with the alarms configured for each weather station', () => {
        const panels = fixture.debugElement.queryAll(By.css('mat-expansion-panel'));
        for (const i in panels) {
          if ( panels[i] !== null ) {
            const panel = panels[i];
            const table = panel.query(By.css('table'));
            expect(table).toBeTruthy();
            const tableRows = table.queryAll(By.css('tr'));

            for (const j in tableRows) {
              if (tableRows[j] !== null ) {
                const columns = tableRows[j].queryAll(By.css('td'));

                if ( j !== '0' ) { // Because the first row show the alarm name
                  const index = Number(j) - 1;
                  const alarm = columns[0].query(By.directive(AlarmComponent)).componentInstance;
                  expect(alarm).toBeTruthy();
                  expect(alarm.alarm).toEqual(mockAlarms['mockAlarm-' + i]);
                  expect(alarm.images).toEqual(mockImagesSets[index]);
                  expect(alarm.imagesUnreliable).toEqual(mockImagesSets[index + '-unreliable']);
                }

                const statusView = columns[1].query(By.directive(StatusViewComponent)).componentInstance;
                expect(statusView).toBeTruthy();
                expect(statusView.alarm).toEqual(mockAlarms['mockAlarm-' + i]);
                expect(statusView.showActionBadges).toEqual(false);

                const buttons = columns[2].query(By.directive(ButtonsComponent)).componentInstance;
                expect(buttons).toBeTruthy();
                expect(buttons.alarm).toEqual(mockAlarms['mockAlarm-' + i]);
                expect(buttons.url).toEqual('url-mockAlarm-' + i);
              }
            }
          }
        }
      });
    });

  });

});
