import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
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
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AckModalComponent } from '../ack-modal/ack-modal.component';
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
import { Alarm } from '../alarm';
import { Iasio } from '../iasio';
import { MockIasios, MockAlarms, ExpectedTableRows } from './fixtures';
import { LegendComponent } from '../legend/legend.component';


describe('GIVEN AlarmsTableComponent', () => {
  let component: AlarmsTableComponent;
  let alarmService: AlarmService;
  let cdbService: CdbService;
  let fixture: ComponentFixture<AlarmsTableComponent>;
  let debug: DebugElement;
  let html: HTMLElement;
  let localOffset = (new Date().getTimezoneOffset())*60*1000;
  let modalService: NgbModal;
  let modalRef: NgbModalRef;
  let alarms = MockAlarms;
  let mockIasAlarmsIasiosResponse = MockIasios;

  let datepipe = new DatePipe('en');
  let alarms_date = new Date(Date.parse("27 Feb 2010 06:34:00 GMT"));
  let expectedRows = ExpectedTableRows;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AlarmsTableComponent,
        StatusViewComponent,
        AckModalComponent,
        LegendComponent
      ],
      imports: [
        NbCardModule,
        Ng2SmartTableModule,
        HttpClientModule,
        NgbModule.forRoot(),
        ReactiveFormsModule,
        NgxSpinnerModule
      ],
      providers: [
        HttpClientService,
        HttpClient,
        AlarmService,
        CdbService,
        DatePipe,
        NgbModal,
        NgxSpinnerService
      ],
    })
    .overrideModule( BrowserDynamicTestingModule ,{
      set: {
        entryComponents: [  StatusViewComponent, AckModalComponent ]
      }
    }).compileComponents();
  }));

  beforeEach(
    inject([CdbService], (service) => {
      cdbService = service

      let mockIasConfiguration = {
          id: 1,
          log_level: "INFO",
          refresh_rate: 2,
          broadcast_factor: 3,
          tolerance: 1,
          properties: []
      };
      spyOn(cdbService, 'initialize')
        .and.callFake(function(){});
      cdbService.iasConfiguration = mockIasConfiguration;

      for (let iasio of mockIasAlarmsIasiosResponse) {
        let alarmIasio = new Iasio(iasio);
        cdbService.iasAlarmsIasios[alarmIasio['io_id']] = alarmIasio;
      }

      cdbService.iasDataAvailable.next(true);

    })
  );

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

  describe('AND WHEN the service processes the alarms', () => {
    it('THEN the Table contains those Alarms sorted', () => {
      alarmService.readAlarmMessagesList(alarms);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        component.source.getFilteredAndSorted().then(resp => {
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
      spyOn(modalRef.componentInstance, "getAlarmDescription")
        .and.callFake(function(){
          return "Short description for the mock alarm from cdb"});
      spyOn(modalRef.componentInstance, "getAlarmUrl")
        .and.callFake(function(){
          return "https://more-information-website/alarm"});
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
