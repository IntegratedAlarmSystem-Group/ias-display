import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { of } from 'rxjs';
import { HttpClientService } from '../http-client.service';
import { AlarmService } from '../data/alarm.service';
import { CdbService } from '../cdb.service';
import { ShelveModalComponent } from './shelve-modal.component';
import { Alarm } from '../alarm';
import { Iasio } from '../iasio';

describe('ShelveModalComponent', () => {
  let component: ShelveModalComponent;
  let fixture: ComponentFixture<ShelveModalComponent>;
  let alarm: Alarm;
  let alarmIasio: Iasio;
  let alarmService: AlarmService;
  let modalBody: any;
  let modalHeader: any;
  let modalFooter: any;
  let spyShelve;
  let spyUnshelve;
  let cdbSubject: CdbService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShelveModalComponent ],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        NgxSpinnerModule
      ],
      providers: [
        NgbActiveModal,
        HttpClientService,
        HttpClient,
        AlarmService,
        CdbService,
        NgxSpinnerService
      ],
    })
    .compileComponents();
  }));

  beforeEach(
    inject([CdbService], (cdbService) => {
      cdbSubject = cdbService;

      const mockIasConfiguration = {
          id: 1,
          log_level: 'INFO',
          refresh_rate: 2,
          broadcast_factor: 3,
          tolerance: 1,
          properties: []
      };
      spyOn(cdbSubject, 'initialize')
        .and.callFake(function() {});
      cdbSubject.iasConfiguration = mockIasConfiguration;

      const mockIasAlarmsIasiosResponse = [{
          io_id: 'coreid$1',
          short_desc: 'Short description for mock alarm',
          ias_type: 'ALARM',
          doc_url: 'https://www.alma.cl/'
      }];

      alarmIasio = new Iasio(mockIasAlarmsIasiosResponse[0]);
      cdbSubject.iasAlarmsIasios[alarmIasio['io_id']] = alarmIasio;

    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelveModalComponent);
    alarmService = fixture.debugElement.injector.get(AlarmService);
    component = fixture.componentInstance;
    component.ngOnInit();
    alarm = Alarm.asAlarm({
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
    component.alarm = alarm;
    modalHeader = fixture.nativeElement.querySelector('.modal-header');
    modalBody = fixture.nativeElement.querySelector('.modal-body');
    modalFooter = fixture.nativeElement.querySelector('.modal-footer');
    spyShelve = spyOn(alarmService, 'shelveAlarm').and.returnValue(
        of([alarm.core_id])
    );
    spyUnshelve = spyOn(alarmService, 'unshelveAlarms').and.returnValue(
        of([alarm.core_id])
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Information
  it('should display the Alarm ID', () => {
    expect(modalHeader.textContent).toContain(alarm.core_id);
  });

  it('should display the alarm short description', () => {
    const expected = alarmIasio.short_desc;
    expect(modalBody.textContent).toContain(expected);
  });

  it('should display a link to get more information about the alarms', () => {
    const expected = alarmIasio.doc_url;
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.alarmUrl').href)
      .toEqual(expected);
  });

  // TextArea
  describe('should have an input field', () => {
    it('in the modal body', () => {
      expect(modalBody.querySelector('textarea')).toBeTruthy();
    });
    describe('such that when it is empty', () => {
      it('the form should be invalid', () => {
        expect(component.form.valid).toBeFalsy();
      });
    });
    describe('such that when the user enters a message', () => {
      it('the form should be valid', () => {
        expect(component.form.valid).toBeFalsy();
        component.form.controls['message'].setValue('Any Message');
        expect(component.form.valid).toBeTruthy();
      });
    });
  });

  // Shelve button
  describe('WHEN the Alarm is unshelved, it should have a Shelve button', () => {
    it('in the modal footer', () => {
      const sendButton = modalFooter.querySelector('#send');
      expect(sendButton).toBeTruthy();
      expect(sendButton.innerText).toEqual('Shelve');
    });
    describe('and when the user clicks on it,', () => {
      describe('and the user has not entered a message', () => {
        it('it should not call the component shelve method', async(() => {
          modalFooter.querySelector('#send').click();
          fixture.whenStable().then(() => {
            expect(alarmService.shelveAlarm).not.toHaveBeenCalled();
          });
        }));
      });
      describe('and the user has entered a message', () => {
        it('it should call the component shelve method', async(() => {
          component.form.controls['message'].setValue('Any message');
          expect(component.form.valid).toBeTruthy();
          fixture.detectChanges();
          modalFooter.querySelector('#send').click();
          fixture.whenStable().then(() => {
            expect(alarmService.shelveAlarm).toHaveBeenCalled();
            expect(alarmService.unshelveAlarms).not.toHaveBeenCalled();
          });
        }));
      });
    });
  });

  // Unshelve button
  describe('WHEN the Alarm is shelved, it should have an Unshelve button', () => {
    it('in the modal footer', () => {
      component.alarm.shelve();
      fixture.detectChanges();
      const sendButton = modalFooter.querySelector('#send');
      expect(sendButton).toBeTruthy();
      expect(sendButton.innerText).toEqual('Unshelve');
    });
    describe('and when the user clicks on it,', () => {
      it('it should call the component unshelve method', async(() => {
        component.alarm.shelve();
        fixture.detectChanges();
        modalFooter.querySelector('#send').click();
        fixture.whenStable().then(() => {
          expect(alarmService.unshelveAlarms).toHaveBeenCalled();
          expect(alarmService.shelveAlarm).not.toHaveBeenCalled();
        });
      }));
    });
  });
});
