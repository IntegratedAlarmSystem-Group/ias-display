import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { AckModalComponent } from './ack-modal.component';
import { HttpClientService } from '../http-client.service';
import { AlarmService } from '../alarm.service';
import { CdbService } from '../cdb.service';
import { Alarm } from '../alarm';


describe('AckModalComponent', () => {
  let component: AckModalComponent;
  let fixture: ComponentFixture<AckModalComponent>;
  let alarm: Alarm;
  let form: FormGroup;
  let alarmService: AlarmService;
  let modalBody: any;
  let modalHeader: any;
  let modalFooter: any;
  let spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AckModalComponent ],
      providers: [
        NgbActiveModal,
        HttpClientService,
        HttpClient,
        AlarmService,
        CdbService,
      ],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AckModalComponent);
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
      'dependencies': [],
    });
    component.alarm = alarm;
    modalHeader = fixture.nativeElement.querySelector('.modal-header');
    modalBody = fixture.nativeElement.querySelector('.modal-body');
    modalFooter = fixture.nativeElement.querySelector('.modal-footer');
    spy = spyOn(alarmService, 'acknowledgeAlarms').and.returnValue(
        Observable.of([alarm.core_id])
    );
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  // Information
  it('should display the Alarm ID', () => {
    expect(modalBody.textContent).toContain(alarm.core_id);
  });

  // TextArea
  describe('should have an input field', () => {
    it('in the modal body', () => {
      expect(modalBody.querySelector('textarea')).toBeTruthy();
    });
    describe('and when it is empty', () => {
      it('the form should be invalid', () => {
        expect(component.form.valid).toBeFalsy();
      });
    });
    describe('and when the user enter a message', () => {
      it('the form should be valid', () => {
        expect(component.form.valid).toBeFalsy();
        component.form.controls['message'].setValue("Any Message");
        expect(component.form.valid).toBeTruthy();
      });
    });

  });

  // Acknowledge button
  describe('should have an Acknoledge button', () => {
    it('in the modal footer', () => {
      expect(modalFooter.querySelector('#acknowledge')).toBeTruthy();
    });
    describe('and when the user clicks on it,', () => {
      describe('and the user has not entered a message', () => {
        it('it should not call the component acknowledge method', async(() => {
          modalFooter.querySelector('#acknowledge').click();
          fixture.whenStable().then(() => {
            expect(alarmService.acknowledgeAlarms).not.toHaveBeenCalled();
          })
        }));
      });
      describe('and the user has entered a message', () => {
        it('it should call the component acknowledge method', async(() => {
          component.form.controls['message'].setValue("Any message");
          expect(component.form.valid).toBeTruthy();
          fixture.detectChanges();

          modalFooter.querySelector('#acknowledge').click();
          fixture.whenStable().then(() => {
            expect(alarmService.acknowledgeAlarms).toHaveBeenCalled();
          })
        }));
      });
    });
  });
});
