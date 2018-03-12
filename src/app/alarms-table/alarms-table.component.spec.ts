import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { AlarmService } from '../alarm.service';
import { AlarmsTableComponent, StatusViewComponent } from './alarms-table.component';
import { NbCardModule } from '@nebular/theme';

import { Ng2SmartTableModule } from 'ng2-smart-table';

import { DatePipe } from '@angular/common';

describe('AlarmsTableComponent', () => {
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
        'core_timestamp': 10000,
        'validity': '1'
      }
    },
    { 'pk': null,
      'model': 'alarms.alarm',
      'fields': {
        'value': 1,
        'core_id': 'coreid$2',
        'running_id': 'coreid$2',
        'mode': '0',
        'core_timestamp': 10000,
        'validity': '1'
      }
    },
    { 'pk': null,
      'model': 'alarms.alarm',
      'fields': {
        'value': 0,
        'core_id': 'coreid$3',
        'running_id': 'coreid$3',
        'mode': '0',
        'core_timestamp': 10000,
        'validity': '1'
      }
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('WHEN the service processes 3 alarms', () => {
    it('THEN the Table contains those 3 Alarms', () => {
      console.log('***alarms***= ', alarms);
      alarmService.processAlarmsList(alarms);
      fixture.detectChanges();
      // fixture.whenStable().then(() => {
      //   expect(html.textContent).toContain('coreid$1');
      // })
      fixture.whenStable().then(() => {
        console.log('***component.data*** = ', component.source.getElements());
        expect(component.source.count()).toEqual(3);
        component.source.getAll().then(resp => {
          console.log(resp);
          expect(resp).toContain('coreid$1');
        });
      })
    });
  });
});
