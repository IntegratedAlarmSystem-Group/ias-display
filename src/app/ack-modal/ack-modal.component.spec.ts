import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { of } from 'rxjs';
import { AckModalComponent } from './ack-modal.component';
import { AckTreeComponent } from '../ack-tree/ack-tree.component';
import { IasMaterialModule } from '../ias-material/ias-material.module';
import { HttpClientService } from '../http-client.service';
import { AlarmService } from '../data/alarm.service';
import { CdbService } from '../cdb.service';
import { Alarm } from '../alarm';
import { Iasio } from '../iasio';


describe('AckModalComponent', () => {
  let component: AckModalComponent;
  let fixture: ComponentFixture<AckModalComponent>;
  let alarmIasio: Iasio;
  let alarmService: AlarmService;
  let modalBody: any;
  let modalHeader: any;
  let modalFooter: any;
  let spy;
  let spyMissingAcks;
  let cdbSubject: CdbService;
  const alarm = Alarm.asAlarm({
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AckModalComponent, AckTreeComponent ],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        NgxSpinnerModule,
        IasMaterialModule
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
    fixture = TestBed.createComponent(AckModalComponent);
    alarmService = fixture.debugElement.injector.get(AlarmService);
    spy = spyOn(alarmService, 'acknowledgeAlarms').and.returnValue(
      of([alarm.core_id])
    );
    spyMissingAcks = spyOn(alarmService, 'getMissingAcks').and.returnValue(
      of( {'coreid$1': [1, 5, 6]} )
    );
    component = fixture.componentInstance;
    component.alarm = alarm;
    component.ngOnInit();
    modalHeader = fixture.nativeElement.querySelector('.modal-header');
    modalBody = fixture.nativeElement.querySelector('.modal-body');
    modalFooter = fixture.nativeElement.querySelector('.modal-footer');
    spyOn(component, 'updateAlarmsToAck');
    fixture.detectChanges();
  });

  it('should be created', () => {
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

  // // Acknowledge button
  describe('should have an Acknowledge button', () => {
    it('in the modal footer', () => {
      expect(modalFooter.querySelector('#acknowledge')).toBeTruthy();
    });
    describe('and when the user clicks on it,', () => {
      describe('and the user has not entered a message', () => {
        it('it should not call the component acknowledge method', async(() => {
          modalFooter.querySelector('#acknowledge').click();
          fixture.whenStable().then(() => {
            expect(alarmService.acknowledgeAlarms).not.toHaveBeenCalled();
          });
        }));
      });
      describe('and the user has entered a message', () => {
        it('it should call the component acknowledge method', async(() => {
          component.alarmsToAck = [alarm.core_id];
          component.form.controls['message'].setValue('Any message');
          expect(component.form.valid).toBeTruthy();
          fixture.detectChanges();

          modalFooter.querySelector('#acknowledge').click();
          fixture.whenStable().then(() => {
            expect(alarmService.acknowledgeAlarms).toHaveBeenCalled();
          });
        }));
      });
    });
  });
});
