import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ClipboardModule, ClipboardService } from 'ngx-clipboard';
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
import { RoutingService } from '../../app-routing/routing.service';
import { Router } from '@angular/router';
import { Alarm } from '../../data/alarm';
import { mockWeatherStationsConfig, mockImagesSets, mockAlarms, alarm_types} from '../test_fixtures';

const mockAntennas = {
  'group1': ['ANT1', 'ANT2'],
  'group2': ['ANT4']
};

const mockPadsStatus = {
  'group1': {
    'PAD1': 'ANT1',
    'PAD2': 'ANT2',
    'PAD3': null
  },
  'group2': {
    'PAD4': 'ANT4'
  }
};

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
    inject([WeatherService], (service) => {
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
    inject([AlarmService], (service) => {
      alarmService = service;
      spyOn(alarmService, 'get').and.callFake(function(alarm_id) {
        return mockAlarms[alarm_id];
      });
    })
  );

  beforeEach(
    inject([ClipboardService], (service) => {
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
                let alarmIndex;

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

                const statusView = columns[1].query(By.directive(StatusViewComponent)).componentInstance;
                expect(statusView).toBeTruthy();
                expect(statusView.alarm).toEqual(expectedAlarm);
                expect(statusView.showActionBadges).toEqual(false);

                const buttons = columns[2].query(By.directive(ButtonsComponent)).componentInstance;
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
    });

  });

});
