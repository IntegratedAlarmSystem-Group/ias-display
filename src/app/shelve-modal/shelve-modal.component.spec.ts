import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { of } from 'rxjs';
import { HttpClientService } from '../http-client.service';
import { AlarmService } from '../alarm.service';
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
  let spy;
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
    spy = spyOn(alarmService, 'acknowledgeAlarms').and.returnValue(
        of([alarm.core_id])
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
