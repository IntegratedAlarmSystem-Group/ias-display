import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NgbModule, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { IasMaterialModule } from '../ias-material/ias-material.module';
import { HttpClientService } from '../http-client.service';
import { AlarmService } from '../alarm.service';
import { CdbService } from '../cdb.service';
import { ShelveModalComponent } from '../shelve-modal/shelve-modal.component';
import { ShelveButtonComponent } from './shelve-button.component';
import { Alarm } from '../alarm';
import { Iasio } from '../iasio';

describe('ShelveButtonComponent', () => {
  let component: ShelveButtonComponent;
  let fixture: ComponentFixture<ShelveButtonComponent>;
  let alarmService: AlarmService;
  let debug: DebugElement;
  let html: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ShelveButtonComponent,
        ShelveModalComponent,
      ],
      imports: [
        HttpClientModule,
        NgbModule.forRoot(),
        ReactiveFormsModule,
        NgxSpinnerModule,
        IasMaterialModule,
      ],
      providers: [
        HttpClientService,
        HttpClient,
        AlarmService,
        CdbService,
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
