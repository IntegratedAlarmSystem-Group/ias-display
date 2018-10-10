import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, convertToParamMap } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { of } from 'rxjs';
import { IasMaterialModule } from '../../ias-material/ias-material.module';
import { DataModule } from '../../data/data.module';
import { AlarmService } from '../../data/alarm.service';
import { RoutingService } from '../../data/routing.service';
import { SidenavService } from '../sidenav.service';
import { AckComponent } from './ack.component';
import { SharedModule } from '../../shared/shared.module';
import { AckTreeComponent } from '../ack-tree/ack-tree.component';
import { Alarm } from '../../data/alarm';

describe('AckComponent', () => {
  let component: AckComponent;
  let fixture: ComponentFixture<AckComponent>;
  let componentBody: any;
  let componentHeader: any;
  let componentFooter: any;
  let alarmService: AlarmService;
  let sidenavService: SidenavService;
  const spyRoutingTable = jasmine.createSpyObj('RoutingService', ['goToAcknowledge']);
  const mockAlarm = Alarm.asAlarm({
    'value': 0,
    'core_id': 'coreid$1',
    'running_id': 'coreid$1',
    'mode': '0',
    'core_timestamp': 1267252440000,
    'validity': '1',
    'state_change_timestamp': 1267252440000,
    'description': 'Short description for mock alarm',
    'url': 'https://www.alma.cl',
    'ack': false,
    'shelved': false,
    'dependencies': [],
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AckComponent,
        AckTreeComponent,
      ],
      imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        IasMaterialModule,
        SharedModule,
      ],
      providers: [
        DataModule,
        HttpClient,
        NgxSpinnerService,
        SidenavService,
        { provide: RoutingService, useValue: spyRoutingTable },
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

  beforeEach(() => {
    fixture = TestBed.createComponent(AckComponent);
    alarmService = fixture.debugElement.injector.get(AlarmService);
    sidenavService = fixture.debugElement.injector.get(SidenavService);
    spyOn(alarmService, 'get').and.callFake(function() { return mockAlarm; });
    spyOn(alarmService, 'acknowledgeAlarms').and.returnValue( of([mockAlarm.core_id]) );
    spyOn(alarmService, 'getMissingAcks').and.returnValue( of({'coreid$1': [1, 5, 6]}) );
    spyOn(sidenavService, 'open');
    spyOn(sidenavService, 'close');
    spyOn(sidenavService, 'toggle');
    component = fixture.componentInstance;
    component.alarm_id = mockAlarm['core_id'];
    component.ngOnInit();
    spyOn(component, 'updateAlarmsToAck');
    componentHeader = fixture.nativeElement.querySelector('.component-header');
    componentBody = fixture.nativeElement.querySelector('.component-body');
    componentFooter = fixture.nativeElement.querySelector('.component-footer');
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Information
  it('should display the Alarm ID', () => {
    expect(componentBody).toBeTruthy();
    expect(componentBody.textContent).toContain(component.alarm_id);
  });

  it('should display the alarm short description', () => {
    const expected = mockAlarm.description;
    expect(componentBody.textContent).toContain(expected);
  });

  // Form
  describe('should have a form', () => {
    it('with an input field and an ack-tree component', () => {
      expect(componentBody.querySelector('textarea')).toBeTruthy();
      expect(componentBody.querySelector('app-ack-tree')).toBeTruthy();
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

  // Acknowledge button
  describe('should have an Acknowledge button', () => {
    it('in the component footer', () => {
      expect(componentFooter.querySelector('#acknowledge')).toBeTruthy();
    });
    describe('and when the user clicks on it,', () => {
      describe('and the user has not entered a message', () => {
        it('it should not call the component acknowledge method', async(() => {
          componentFooter.querySelector('#acknowledge').click();
          fixture.whenStable().then(() => {
            expect(alarmService.acknowledgeAlarms).not.toHaveBeenCalled();
          });
        }));
      });
      describe('and the user has entered a message', () => {
        it('it should call the component acknowledge method', async(() => {
          component.alarmsToAck = [mockAlarm.core_id];
          component.form.controls['message'].setValue('Any message');
          expect(component.form.valid).toBeTruthy();
          fixture.detectChanges();

          componentFooter.querySelector('#acknowledge').click();
          fixture.whenStable().then(() => {
            expect(alarmService.acknowledgeAlarms).toHaveBeenCalled();
          });
        }));
      });
    });
  });


});
