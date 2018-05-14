import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientService } from '../http-client.service';
import { AlarmService } from '../alarm.service';
import { CdbService } from '../cdb.service';
import { AlarmsTableComponent } from './alarms-table.component';
import { StatusViewComponent } from '../status-view/status-view.component';
import { NbCardModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AckModalComponent } from '../ack-modal/ack-modal.component';
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
import { Alarm } from '../alarm';

describe('GIVEN AlarmsTableComponent', () => {
  let component: AlarmsTableComponent;
  let alarmService: AlarmService;
  let fixture: ComponentFixture<AlarmsTableComponent>;
  let debug: DebugElement;
  let html: HTMLElement;
  let localOffset = (new Date().getTimezoneOffset())*60*1000;
  let modalService: NgbModal;
  let modalRef: NgbModalRef;
  let alarms = [
    {
      'value': 0,
      'core_id': 'coreid$1',
      'running_id': 'coreid$1',
      'mode': '0',
      'core_timestamp': 1267252440000,
      'validity': '1',
      'ack': false,
      'dependencies': [],
    },
    {
      'value': 1,
      'core_id': 'coreid$2',
      'running_id': 'coreid$2',
      'mode': '5',
      'core_timestamp': 1267252440000,
      'validity': '1',
      'ack': false,
      'dependencies': [],
    },
    {
      'value': 0,
      'core_id': 'coreid$3',
      'running_id': 'coreid$3',
      'mode': '7',
      'core_timestamp': 1267252440000,
      'validity': '0',
      'ack': false,
      'dependencies': [],
    },
    {
      'value': 1,
      'core_id': 'coreid$4',
      'running_id': 'coreid$4',
      'mode': '4',
      'core_timestamp': 1267252440000,
      'validity': '1',
      'ack': false,
      'dependencies': [],
    }
  ];

  let datepipe = new DatePipe('en');
  let alarms_date = new Date(Date.parse("27 Feb 2010 06:34:00 GMT"));
  let expectedRows = [
    { 'status': 'clear-valid-startup',
      'timestamp': datepipe.transform( alarms_date, "M/d/yy, h:mm:ss a"),// '2/27/10, 6:34:00 AM',
      'core_id': 'coreid$1',
      'mode': 'startup',
      'alarm': Alarm.asAlarm(alarms[0])
    },
    { 'status': 'set-valid-operational',
      'timestamp': datepipe.transform( alarms_date, "M/d/yy, h:mm:ss a"),
      'core_id': 'coreid$2',
      'mode': 'operational',
      'alarm': Alarm.asAlarm(alarms[1])
    },
    { 'status': 'clear-invalid-unknown',
      'timestamp': datepipe.transform( alarms_date, "M/d/yy, h:mm:ss a"),
      'core_id': 'coreid$3',
      'mode': 'unknown',
      'alarm': Alarm.asAlarm(alarms[2])
    },
    { 'status': 'set-valid-maintenance',
      'timestamp': datepipe.transform( alarms_date, "M/d/yy, h:mm:ss a"),
      'core_id': 'coreid$4',
      'mode': 'maintenance',
      'alarm': Alarm.asAlarm(alarms[3])
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AlarmsTableComponent,
        StatusViewComponent,
        AckModalComponent
      ],
      imports: [
        NbCardModule,
        Ng2SmartTableModule,
        HttpClientModule,
        NgbModule.forRoot(),
        ReactiveFormsModule
      ],
      providers: [
        HttpClientService,
        HttpClient,
        AlarmService,
        CdbService,
        DatePipe,
        NgbModal,
      ],
    })
    .overrideModule( BrowserDynamicTestingModule ,{
      set: {
        entryComponents: [  StatusViewComponent, AckModalComponent ]
      }
    }).compileComponents();
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

  describe('AND WHEN the service processes 4 alarms', () => {
    it('THEN the Table contains those 4 Alarms', () => {
      alarmService.readAlarmMessagesList(alarms);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        component.source.getAll().then(resp => {
          expect(resp).toEqual(expectedRows);
        });
      });
    });
  });

  describe('AND the user clicks on a row', () => {
    it('THEN the modal is opened', async () => {
      let mockEvent = {
        data: {
          alarm: Alarm.asAlarm(alarms[0])
        }
      };
      modalService = TestBed.get(NgbModal);
      modalRef = modalService.open(AckModalComponent);
      modalRef.componentInstance.alarm = mockEvent.data.alarm;
      spyOn(modalService, "open").and.returnValue(modalRef);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        let ackModal = component.onUserRowClick(mockEvent);
        expect(modalService.open).toHaveBeenCalled();
        expect(ackModal).toBeTruthy();
        expect(ackModal instanceof NgbModalRef).toBeTruthy();
        expect(ackModal.componentInstance.alarm).toEqual(mockEvent.data.alarm);
      });
    });
  });

});
