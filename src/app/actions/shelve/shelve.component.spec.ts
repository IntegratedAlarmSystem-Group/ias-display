import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, convertToParamMap, Router } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { of } from 'rxjs';
import { IasMaterialModule } from '../../ias-material/ias-material.module';
import { DataModule } from '../../data/data.module';
import { AlarmService } from '../../data/alarm.service';
import { SidenavService } from '../sidenav.service';
import { CdbService } from '../../data/cdb.service';
import { ShelveComponent } from './shelve.component';
import { Alarm } from '../../data/alarm';
import { Iasio } from '../../data/iasio';

fdescribe('ShelveComponent', () => {
  let component: ShelveComponent;
  let fixture: ComponentFixture<ShelveComponent>;
  let alarmIasio: Iasio;
  let alarmService: AlarmService;
  let componentBody: any;
  let componentHeader: any;
  let componentFooter: any;
  let cdbSubject: CdbService;
  let sidenavService: SidenavService;
  const spyRoutingTable = jasmine.createSpyObj('Router', ['navigate']);
  const mockIasConfiguration = {
    id: 1,
    log_level: 'INFO',
    refresh_rate: 2,
    broadcast_factor: 3,
    tolerance: 1,
    properties: []
  };
  const mockIasAlarmsIasiosResponse = [{
    io_id: 'coreid$1',
    short_desc: 'Short description for mock alarm',
    ias_type: 'ALARM',
    doc_url: 'https://www.alma.cl/'
  }];
  const mockAlarm = Alarm.asAlarm({
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
      declarations: [ ShelveComponent ],
      imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        IasMaterialModule,
        DataModule,
      ],
      providers: [
        HttpClient,
        NgxSpinnerService,
        SidenavService,
        { provide: Router, useValue: spyRoutingTable },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: {
              subscribe: (fn: (value: Params) => void) => fn(
                convertToParamMap({
                  alarmID: ''
                })
              )
            }
          },
        },
      ],
    })
    .compileComponents();
  }));

  beforeEach(
    inject([CdbService], (cdbService) => {
      cdbSubject = cdbService;
      spyOn(cdbSubject, 'initialize')
        .and.callFake(function() {});
      cdbSubject.iasConfiguration = mockIasConfiguration;
      alarmIasio = new Iasio(mockIasAlarmsIasiosResponse[0]);
      cdbSubject.iasAlarmsIasios[alarmIasio['io_id']] = alarmIasio;
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelveComponent);
    alarmService = fixture.debugElement.injector.get(AlarmService);
    sidenavService = fixture.debugElement.injector.get(SidenavService);
    spyOn(alarmService, 'get').and.callFake(function() { return Alarm.asAlarm(mockAlarm); });
    spyOn(alarmService, 'shelveAlarm').and.returnValue( of([mockAlarm.core_id]) );
    spyOn(alarmService, 'unshelveAlarms').and.returnValue( of([mockAlarm.core_id]) );
    spyOn(sidenavService, 'open');
    spyOn(sidenavService, 'close');
    spyOn(sidenavService, 'toggle');
    component = fixture.componentInstance;
    component.alarm_id = mockAlarm['core_id'];
    component.ngOnInit();
    componentHeader = fixture.nativeElement.querySelector('.component-header');
    componentBody = fixture.nativeElement.querySelector('.component-body');
    componentFooter = fixture.nativeElement.querySelector('.component-footer');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Information
  it('should display the Alarm ID', () => {
  expect(componentBody).toBeTruthy();
    expect(componentBody.textContent).toContain(component.alarm_id);
  });

  // it('should display the alarm short description', () => {
  //   const expected = alarmIasio.short_desc;
  //   expect(componentBody.textContent).toContain(expected);
  // });
  //
  // it('should display a link to get more information about the alarms', () => {
  //   const expected = alarmIasio.doc_url;
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('.alarmUrl').href)
  //     .toEqual(expected);
  // });
  //
  // // TextArea
  // describe('should have an input field', () => {
  //   it('in the modal body', () => {
  //     expect(componentBody.querySelector('textarea')).toBeTruthy();
  //   });
  //   describe('such that when it is empty', () => {
  //     it('the form should be invalid', () => {
  //       expect(component.form.valid).toBeFalsy();
  //     });
  //   });
  //   describe('such that when the user enters a message', () => {
  //     it('the form should be valid', () => {
  //       expect(component.form.valid).toBeFalsy();
  //       component.form.controls['message'].setValue('Any Message');
  //       expect(component.form.valid).toBeTruthy();
  //     });
  //   });
  // });
  //
  // // Shelve button
  // describe('WHEN the Alarm is unshelved, it should have a Shelve button', () => {
  //   it('in the modal footer', () => {
  //     const sendButton = componentFooter.querySelector('#send');
  //     expect(sendButton).toBeTruthy();
  //     expect(sendButton.innerText).toEqual('Shelve');
  //   });
  //   describe('and when the user clicks on it,', () => {
  //     describe('and the user has not entered a message', () => {
  //       it('it should not call the component shelve method', async(() => {
  //         componentFooter.querySelector('#send').click();
  //         fixture.whenStable().then(() => {
  //           expect(alarmService.shelveAlarm).not.toHaveBeenCalled();
  //         });
  //       }));
  //     });
  //     describe('and the user has entered a message', () => {
  //       it('it should call the component shelve method', async(() => {
  //         component.form.controls['message'].setValue('Any message');
  //         expect(component.form.valid).toBeTruthy();
  //         fixture.detectChanges();
  //         componentFooter.querySelector('#send').click();
  //         fixture.whenStable().then(() => {
  //           expect(alarmService.shelveAlarm).toHaveBeenCalled();
  //           expect(alarmService.unshelveAlarms).not.toHaveBeenCalled();
  //         });
  //       }));
  //     });
  //   });
  // });
  //
  // // Unshelve button
  // describe('WHEN the Alarm is shelved, it should have an Unshelve button', () => {
  //   it('in the modal footer', () => {
  //     component.alarm.shelve();
  //     fixture.detectChanges();
  //     const sendButton = componentFooter.querySelector('#send');
  //     expect(sendButton).toBeTruthy();
  //     expect(sendButton.innerText).toEqual('Unshelve');
  //   });
  //   describe('and when the user clicks on it,', () => {
  //     it('it should call the component unshelve method', async(() => {
  //       component.alarm.shelve();
  //       fixture.detectChanges();
  //       componentFooter.querySelector('#send').click();
  //       fixture.whenStable().then(() => {
  //         expect(alarmService.unshelveAlarms).toHaveBeenCalled();
  //         expect(alarmService.shelveAlarm).not.toHaveBeenCalled();
  //       });
  //     }));
  //   });
  // });
});
