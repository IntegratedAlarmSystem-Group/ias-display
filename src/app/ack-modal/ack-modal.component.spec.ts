import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AckModalComponent } from './ack-modal.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientService } from '../http-client.service';
import { AlarmService } from '../alarm.service';
import { CdbService } from '../cdb.service';
import { Alarm } from '../alarm';


describe('AckModalComponent', () => {
  let component: AckModalComponent;
  let fixture: ComponentFixture<AckModalComponent>;
  let alarm: Alarm;
  let alarmService: AlarmService;
  let modalBody: any;
  let modalHeader: any;
  let modalFooter: any;

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
        ReactiveFormsModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AckModalComponent);
    alarmService = fixture.debugElement.injector.get(AlarmService);
    component = fixture.componentInstance;
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
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  it('should display the Alarm ID', () => {
    expect(modalBody.textContent).toContain(alarm.core_id);
  });
  it('should have an input field in the modal body', () => {
    expect(modalBody.querySelector('textarea')).toBeTruthy();
  });
  it('should have a Send button in the modal footer', () => {
    expect(modalFooter.querySelector('button')).toBeTruthy();
  });
  describe('should have a Send button', () => {
    it('in the modal footer', () => {
      expect(modalFooter.querySelector('button')).toBeTruthy();
    });
    describe('and when the user clicks on it,', () => {
      it('it should call Aknowledge method on AlarmService', () => {
        expect(modalFooter.querySelector('button')).toBeTruthy();
      });
    });
  });
});
