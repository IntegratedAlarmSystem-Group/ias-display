import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { AlarmService } from '../alarm.service';
import { AlarmsTableComponent, StatusViewComponent } from './alarms-table.component';
import { NbCardModule } from '@nebular/theme';

import { Ng2SmartTableModule } from 'ng2-smart-table';

import { DatePipe } from '@angular/common';

describe('GIVEN AlarmsTableComponent', () => {
  let component: AlarmsTableComponent;
  let alarmService: AlarmService;
  let fixture: ComponentFixture<AlarmsTableComponent>;
  let debug: DebugElement;
  let html: HTMLElement;

  let alarms = [
    { 'pk': null,
      'model': 'alarms.alarm',
      'fields': {
        'value': 0,
        'core_id': 'coreid$1',
        'running_id': 'coreid$1',
        'mode': '0',
        'core_timestamp': 1267252440000,
        'validity': '1'
      }
    },
    { 'pk': null,
      'model': 'alarms.alarm',
      'fields': {
        'value': 1,
        'core_id': 'coreid$2',
        'running_id': 'coreid$2',
        'mode': '5',
        'core_timestamp': 1267252440000,
        'validity': '1'
      }
    },
    { 'pk': null,
      'model': 'alarms.alarm',
      'fields': {
        'value': 0,
        'core_id': 'coreid$3',
        'running_id': 'coreid$3',
        'mode': '7',
        'core_timestamp': 1267252440000,
        'validity': '0'
      }
    },
    { 'pk': null,
      'model': 'alarms.alarm',
      'fields': {
        'value': 1,
        'core_id': 'coreid$4',
        'running_id': 'coreid$4',
        'mode': '4',
        'core_timestamp': 1267252440000,
        'validity': '1'
      }
    }
  ];

  let expectedRows = [
    { 'status': 'clear-valid-startup',
      'timestamp': '2/27/10, 3:34:00 AM',
      'core_id': 'coreid$1',
      'mode': 'startup',
    },
    { 'status': 'set-valid-operational',
      'timestamp': '2/27/10, 3:34:00 AM',
      'core_id': 'coreid$2',
      'mode': 'operational',
    },
    { 'status': 'clear-invalid-unknown',
      'timestamp': '2/27/10, 3:34:00 AM',
      'core_id': 'coreid$3',
      'mode': 'unknown',
    },
    { 'status': 'set-valid-maintenance',
      'timestamp': '2/27/10, 3:34:00 AM',
      'core_id': 'coreid$4',
      'mode': 'maintenance',
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AlarmsTableComponent,
        StatusViewComponent
      ],
      imports: [
        NbCardModule,
        Ng2SmartTableModule
      ],
      providers: [
        AlarmService,
        DatePipe
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmsTableComponent);
    component = fixture.componentInstance;
    alarmService = fixture.debugElement.injector.get(AlarmService);
    debug = fixture.debugElement;
    html = debug.nativeElement;
    fixture.detectChanges();
  });

  it('THEN should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('GIVEN the service receives 4 alarms', () => {
    alarmService.processAlarmsList(alarms);
    it('WHEN the service finishes processing the 4 alarms', () => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        it('THEN the Table should contain those 4 Alarms', () => {
          component.source.getAll().then(resp => {
            expect(resp).toEqual(expectedRows);
          });
        });
      });
    });
  });
});
