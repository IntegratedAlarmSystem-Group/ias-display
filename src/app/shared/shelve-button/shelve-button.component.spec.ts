import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NgbModule, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { IasMaterialModule } from '../../ias-material/ias-material.module';
import { DataModule } from '../../data/data.module';
import { AlarmService } from '../../data/alarm.service';
import { ShelveModalComponent } from '../shelve-modal/shelve-modal.component';
import { ShelveButtonComponent } from './shelve-button.component';
import { Alarm } from '../../data/alarm';
import { Iasio } from '../../data/iasio';

describe('GIVEN a ShelveButtonComponent', () => {
  let component: ShelveButtonComponent;
  let fixture: ComponentFixture<ShelveButtonComponent>;
  let alarmService: AlarmService;
  let debug: DebugElement;
  let html: HTMLElement;
  let modalService: NgbModal;
  let modalRef: NgbModalRef;
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
  const mockShelvedAlarm = {
    'value': 4,
    'core_id': 'coreid$1',
    'running_id': 'coreid$1',
    'mode': 5,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 1,
    'ack': false,
    'shelved': true,
    'dependencies': [],
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ShelveButtonComponent,
        ShelveModalComponent,
      ],
      imports: [
        HttpClientModule,
        NgbModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        IasMaterialModule,
        DataModule,
      ],
      providers: [
        HttpClient,
        NgbModal,
        NgxSpinnerService
      ],
    })
    .overrideModule( BrowserDynamicTestingModule , {
      set: {
        entryComponents: [ ShelveModalComponent ]
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
    fixture = TestBed.createComponent(ShelveButtonComponent);
    component = fixture.componentInstance;
    component.alarm_id = 'coreid$1';
    alarmService = fixture.debugElement.injector.get(AlarmService);
    debug = fixture.debugElement;
    html = debug.nativeElement;
    fixture.detectChanges();
  });

  it('THEN it should be created with the given alarm_id and get the Alarm from AlarmService', () => {
    const shelveButton = debug.query(By.css('.shelve-button')).nativeElement;
    expect(component).toBeTruthy();
    expect(component.alarm_id).toBe('coreid$1');
    expect(alarmService.get).toHaveBeenCalledWith('coreid$1');
    expect(shelveButton.title).toEqual('Shelve');
  });

  describe('AND WHEN the Alarm is shelved', () => {
    it('THEN its tooltip should be "Unshelve"', () => {
      component.alarm.shelve();
      const shelveButton = debug.query(By.css('.shelve-button')).nativeElement;
      fixture.detectChanges();
      expect(component).toBeTruthy();
      expect(component.alarm_id).toBe('coreid$1');
      expect(alarmService.get).toHaveBeenCalledWith('coreid$1');
      expect(shelveButton.title).toEqual('Unshelve');
    });
  });

  describe('AND WHEN the user clicks on it', () => {
    it('THEN the modal is opened', async () => {
      const mockEvent = {
        data: {
          alarm: Alarm.asAlarm(mockAlarm)
        }
      };
      modalService = TestBed.get(NgbModal);
      modalRef = modalService.open(ShelveModalComponent);
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
        const shelveModal = component.onClick(mockEvent);
        // expect(modalService.open).toHaveBeenCalled();
        expect(shelveModal).toBeTruthy();
        expect(shelveModal instanceof NgbModalRef).toBeTruthy();
        expect(shelveModal.componentInstance.alarm).toEqual(mockEvent.data.alarm);
      });
    });
  });
});
