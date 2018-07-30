import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IasMaterialModule } from '../../ias-material/ias-material.module';
import { SharedModule } from '../../shared/shared.module';
import { ActionsModule } from '../../actions/actions.module';
import { DataModule } from '../../data/data.module';
import { WeatherSidebarComponent } from './weather-sidebar.component';
import { WeatherStationSidebarComponent } from '../weather-station-sidebar/weather-station-sidebar.component';
import { WeatherService } from '../weather.service';
import { AlarmService } from '../../data/alarm.service';
import { Router } from '@angular/router';
import { Alarm } from '../../data/alarm';
const mockWeatherStationsConfig = [
  {
    station: 'MockAlarm1',
    temperature: 'MockAlarm1',
    windspeed: 'MockAlarm1',
    humidity: 'MockAlarm1'
  },
  {
    station: 'MockAlarm2',
    temperature: 'MockAlarm2',
    windspeed: 'MockAlarm2',
    humidity: 'MockAlarm2'
  },
];

const mockAlarm = Alarm.asAlarm({
  'value': 0,
  'core_id': 'coreid$1',
  'running_id': 'coreid$1',
  'mode': '0',
  'core_timestamp': 1267252440000,
  'validity': '1',
  'ack': false,
  'shelved': false,
  'dependencies': [],
});

class SpecService {
  queryAttributes(fixture: ComponentFixture<any>, cssSelector: string): any {
    fixture.detectChanges();

    const debugElement = fixture.debugElement.query(By.css(cssSelector));
    const attributes: any = {};
    if (debugElement) {
      for (let i = 0, length = debugElement.nativeElement.attributes.length; i < length; i++) {
        const attributeName = debugElement.nativeElement.attributes[i].name;
        attributes[this.clean(attributeName)] = debugElement.nativeElement.getAttribute(attributeName);
      }
    }
    return attributes;
  }

  clean(name: string): string {
    let new_name = name.replace('ng-reflect-', '');
    for (let i = 0; i < new_name.length; i++ ) {
      if ( new_name.charAt(i) === '-' ) {
        new_name = new_name.substring(0, i) + new_name.substr(i + 1, 1).toUpperCase() + new_name.substring(i + 2);
      }
    }
    return new_name;
  }
}

const specServ = new SpecService();

fdescribe('WeatherSidebarComponent', () => {
  let component: WeatherSidebarComponent;
  let fixture: ComponentFixture<WeatherSidebarComponent>;
  const spyRoutingTable = jasmine.createSpyObj('Router', ['navigate']);
  let weatherService: WeatherService;
  let alarmService: AlarmService;
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
    })
  );

  beforeEach(
    inject([AlarmService], (service) => {
      alarmService = service;
      spyOn(alarmService, 'get').and.callFake(function() { return mockAlarm; });
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherSidebarComponent);
    component = fixture.componentInstance;
    content = fixture.nativeElement.querySelector('.weather-sidebar-content');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

      it('with a header that contains a weather station sidebar component', () => {
        const panels = content.querySelectorAll('mat-expansion-panel');
        for (const panel of panels) {
          const header = panel.querySelector('mat-expansion-panel-header');
          expect(header.querySelector('app-weather-station-sidebar')).toBeTruthy();
          const attributes = specServ.queryAttributes(fixture, 'app-weather-station-sidebar');
          expect(attributes['selectedAlarm']).toEqual('');
        }
      });

      it('with a body that contains a table with the alarms related to each weather station', () => {
        for (const panel of content.querySelectorAll('mat-expansion-panel')) {
          expect(panel.querySelector('table')).toBeTruthy();
          for (const row of panel.querySelectorAll('tr')) {
            expect(row.querySelector('app-alarm')).toBeTruthy();
            expect(row.querySelector('app-status-view')).toBeTruthy();
            expect(row.querySelector('app-buttons')).toBeTruthy();
          }

        }
      });
    });

  });

});
