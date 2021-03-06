import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ClipboardModule, ClipboardService } from 'ngx-clipboard';
import { IasMaterialModule } from '../../ias-material/ias-material.module';
import { SharedModule } from '../../shared/shared.module';
import { ActionsModule } from '../../actions/actions.module';
import { DataModule } from '../../data/data.module';
import { WeatherSidebarComponent } from './weather-sidebar.component';
import { WeatherStationSidebarComponent } from '../weather-station-sidebar/weather-station-sidebar.component';
import { AlarmComponent } from '../../shared/alarm/alarm.component';
import { StatusViewComponent } from '../../shared/status-view/status-view.component';
import { ButtonsComponent } from '../../actions/buttons/buttons.component';
import { WeatherService } from '../weather.service';
import { Alarm } from '../../data/alarm';
import { AlarmService } from '../../data/alarm.service';
import { RoutingService } from '../../app-routing/routing.service';
import { Router } from '@angular/router';
import { mockWeatherStationsConfig, mockImagesSets, mockAlarms, alarm_types, mockAntennas, mockPadsStatus} from '../test_fixtures';


describe('WeatherSidebarComponent', () => {
  let sidebarComponent: WeatherSidebarComponent;

  let fixture: ComponentFixture<WeatherSidebarComponent>;
  const spyRoutingTable = jasmine.createSpyObj('Router', ['navigate']);
  let weatherService: WeatherService;
  let alarmService: AlarmService;
  let clipboardService: ClipboardService;
  let content: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WeatherSidebarComponent,
        WeatherStationSidebarComponent,
      ],
      providers: [
        WeatherService,
        RoutingService,
        { provide: Router, useValue: spyRoutingTable },
      ],
      imports: [
        ClipboardModule,
        IasMaterialModule,
        SharedModule,
        ActionsModule,
        DataModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(
    inject([WeatherService], (service: WeatherService) => {
      weatherService = service;
      spyOn(weatherService, 'initialize').and.callFake(function() {});
      weatherService.padsStatus = mockPadsStatus;
      weatherService.weatherStationsConfig = mockWeatherStationsConfig;
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

  beforeEach(
    inject([ClipboardService], (service: ClipboardService) => {
      clipboardService = service;
      spyOn(clipboardService, 'copyFromContent').and.callFake(function() { return true; });
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
            const wskeys = Object.keys(mockWeatherStationsConfig);
            expect(stationSidebarComponent.stationConfig).toEqual(mockWeatherStationsConfig[wskeys[i]]);
            expect(stationSidebarComponent.selectedAlarm).toEqual(null);
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

                const index = alarm_types[Number(j) - 1];
                let alarmIndex: string;

                if ( j === '0' ) {
                  alarmIndex = 'mockAlarm-' + i;
                } else {
                  alarmIndex = 'mockAlarm-' + i + '-' + index;
                }
                const expectedAlarm = mockAlarms[alarmIndex];

                if ( j !== '0' ) { // Because the first row shows the alarm name
                  const alarmComponent = columns[0].query(By.directive(AlarmComponent)).componentInstance;
                  expect(alarmComponent).toBeTruthy();
                  expect(alarmComponent.alarm).toEqual(expectedAlarm);
                  expect(alarmComponent.images).toEqual(mockImagesSets[index]);
                  expect(alarmComponent.imagesUnreliable).toEqual(mockImagesSets[index + '-unreliable']);
                }

                const buttons = columns[1].query(By.directive(ButtonsComponent)).componentInstance;
                expect(buttons).toBeTruthy();
                expect(buttons.alarm).toEqual(expectedAlarm);
              }
            }
          }
        }
      });

      it('Each panel contains a list with the names of nearby antennas', () => {
        const panels = fixture.debugElement.queryAll(By.css('mat-expansion-panel'));
        for (const i in panels) {
          if ( panels[i] !== null ) {
            const expectedAntennas = mockAntennas[mockWeatherStationsConfig[i].group];
            const panel = panels[i];
            const list = panel.nativeElement.querySelector('.antennas-list');
            expect(list).toBeTruthy();
            for (const antenna of expectedAntennas) {
              expect(list.textContent).toContain(antenna);
            }
          }
        }
      });

      it('Each panel contains a button to copy the names of nearby antennas', () => {
        const panels = fixture.debugElement.queryAll(By.css('mat-expansion-panel'));
        for (const i in panels) {
          if ( panels[i] !== null ) {
            const expectedAntennas = mockAntennas[mockWeatherStationsConfig[i].group];
            const panel = panels[i];
            const button = panel.nativeElement.querySelector('.copy-antennas-button');
            expect(button).toBeTruthy();
            button.click();
            expect(clipboardService.copyFromContent).toHaveBeenCalledWith(expectedAntennas.join(','));
          }
        }
      });

      it('Each panel contains a button to copy the names of affected antennas', () => {
        weatherService.affectedAntennaHighPriorityAlarm = {
          'ANT1': Alarm.asAlarm({
            'value': 3,
            'core_id': 'WSAlarmOne',
            'running_id': 'WSAlarmOne',
            'mode': 0,
            'core_timestamp': 1267252440000,
            'state_change_timestamp': 1267252440000,
            'value_change_timestamp': 1267252440000,
            'value_change_transition': [0, 0],
            'validity': 1,
            'description': 'my description',
            'url': 'https://www.alma.cl',
            'sound': 'sound1',
            'can_shelve': true,
            'ack': false,
            'shelved': false,
            'dependencies': [],
            'properties': {
              'affectedAntennas': 'A00,A01,A02,A03'
            }
          })
        };
        sidebarComponent.affectedAntennas = ['ANT1'];
        sidebarComponent.groupHasAffectedAntennas = {
          'group1': true,
          'group2': false,
        };
        const mockAffectedAntennas = {
          'group1': ['ANT1'],
          'group2': []
        };
        fixture.detectChanges();
        const panels = fixture.debugElement.queryAll(By.css('mat-expansion-panel'));
        for (const i in panels) {
          if ( panels[i] !== null ) {
            const expectedAntennas = mockAffectedAntennas[mockWeatherStationsConfig[i].group];
            const panel = panels[i];
            if (expectedAntennas.length > 0) {
              const button = panel.nativeElement.querySelector('.copy-affected-antennas-button');
              expect(button).toBeTruthy();
              button.click();
              expect(clipboardService.copyFromContent).toHaveBeenCalledWith(expectedAntennas.join(','));
            } else {
              const button = panel.nativeElement.querySelector('.copy-affected-antennas-button');
              expect(button).toBeNull();
            }
          }
        }
      });

    });

  });

});
