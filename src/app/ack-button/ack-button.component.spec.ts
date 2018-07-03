import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NgbModule, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { of } from 'rxjs';
import { DataModule } from '../data/data.module';
import { HttpClientService } from '../http-client.service';
import { AlarmService } from '../data/alarm.service';
import { CdbService } from '../data/cdb.service';
import { AckButtonComponent } from './ack-button.component';
import { AckTreeComponent } from '../ack-tree/ack-tree.component';
import { AckModalComponent } from '../ack-modal/ack-modal.component';
import { IasMaterialModule } from '../ias-material/ias-material.module';
import { Alarm } from '../alarm';
import { Iasio } from '../iasio';


describe('GIVEN an AckButtonComponent', () => {
  let component: AckButtonComponent;
  let fixture: ComponentFixture<AckButtonComponent>;
  let alarmService: AlarmService;
  let debug: DebugElement;
  let html: HTMLElement;
  let modalService: NgbModal;
  let modalRef: NgbModalRef;
  let spyMissingAcks;
  const mockAlarm = {
    'value': 4,
    'core_id': 'coreid$1',
    'running_id': 'coreid$1',
    'mode': 5,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 1,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AckButtonComponent,
        AckModalComponent,
        AckTreeComponent,
      ],
      imports: [
        HttpClientModule,
        NgbModule.forRoot(),
        ReactiveFormsModule,
        NgxSpinnerModule,
        IasMaterialModule,
        DataModule,
      ],
      providers: [
        HttpClientService,
        HttpClient,
        CdbService,
        NgbModal,
        NgxSpinnerService
      ],
    })
    .overrideModule( BrowserDynamicTestingModule , {
      set: {
        entryComponents: [  AckModalComponent ]
      }
    })
    .compileComponents();
  }));

  beforeEach(
    inject([AlarmService], (service) => {
      alarmService = service;
      spyOn(alarmService, 'get').and.callFake(function() {
        return Alarm.asAlarm(mockAlarm);
      });
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AckButtonComponent);
    component = fixture.componentInstance;
    component.alarm_id = 'coreid$1';
    alarmService = fixture.debugElement.injector.get(AlarmService);
    spyMissingAcks = spyOn(alarmService, 'getMissingAcks').and.returnValue(
      of( {'coreid$1': [1, 5, 6]} )
    );
    debug = fixture.debugElement;
    html = debug.nativeElement;
    fixture.detectChanges();
  });

  it('THEN it should be created with the given alarm_id and get the Alarm from AlarmService', () => {
    expect(component).toBeTruthy();
    expect(component.alarm_id).toBe('coreid$1');
    expect(alarmService.get).toHaveBeenCalledWith('coreid$1');
  });

  describe('AND WHEN the user clicks on it', () => {
    it('THEN the modal is opened', async () => {
      const mockEvent = {
        data: {
          alarm: Alarm.asAlarm(mockAlarm)
        }
      };
      modalService = TestBed.get(NgbModal);
      modalRef = modalService.open(AckModalComponent);
      modalRef.componentInstance.alarm = mockEvent.data.alarm;
      spyOn(modalService, 'open').and.returnValue(modalRef);
      spyOn(modalRef.componentInstance, 'getAlarmDescription')
        .and.callFake(function() {
          return 'Short description for the mock alarm from cdb'; });
      spyOn(modalRef.componentInstance, 'getAlarmUrl')
        .and.callFake(function() {
          return 'https://more-information-website/alarm'; });
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const ackModal = component.onClick(mockEvent);
        expect(modalService.open).toHaveBeenCalled();
        expect(ackModal).toBeTruthy();
        expect(ackModal instanceof NgbModalRef).toBeTruthy();
        expect(ackModal.componentInstance.alarm).toEqual(mockEvent.data.alarm);
      });
    });
  });
});
