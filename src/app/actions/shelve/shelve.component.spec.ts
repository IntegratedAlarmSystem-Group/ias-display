import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, convertToParamMap } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { of } from 'rxjs';
import { IasMaterialModule } from '../../ias-material/ias-material.module';
import { DataModule } from '../../data/data.module';
import { AlarmService } from '../../data/alarm.service';
import { RoutingService } from '../../app-routing/routing.service';
import { SidenavService } from '../sidenav.service';
import { ShelveComponent } from './shelve.component';
import { Alarm } from '../../data/alarm';

describe('ShelveComponent', () => {
  let component: ShelveComponent;
  let fixture: ComponentFixture<ShelveComponent>;
  let componentBody: any;
  let componentHeader: any;
  let componentFooter: any;
  let alarmService: AlarmService;
  let sidenavService: SidenavService;
  const spyRoutingTable = jasmine.createSpyObj(
    'RoutingService', ['goToShelve', 'cleanActionOutlet', 'goToAcknowledge']
  );
  const mockAlarm = Alarm.asAlarm({
      'value': 0,
      'core_id': 'coreid$1',
      'running_id': 'coreid$1',
      'mode': '0',
      'state_change_timestamp': 1267252440000,
      'core_timestamp': 1267252440000,
      'validity': '1',
      'description': 'Short description for mock alarm',
      'url': 'https://www.alma.cl',
      'sound': 'NONE',
      'can_shelve': true,
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
    fixture = TestBed.createComponent(ShelveComponent);
    alarmService = fixture.debugElement.injector.get(AlarmService);
    sidenavService = fixture.debugElement.injector.get(SidenavService);
    spyOn(alarmService, 'get').and.callFake(function() { return Alarm.asAlarm(mockAlarm); });
    spyOn(alarmService, 'shelveAlarm').and.returnValue( of([mockAlarm.core_id]) );
    spyOn(alarmService, 'unshelveAlarms').and.returnValue( of([mockAlarm.core_id]) );
    spyOn(sidenavService, 'open');
    spyOn(sidenavService, 'closeAndClean');
    spyOn(sidenavService, 'toggle');
    component = fixture.componentInstance;
    spyOn(component, 'onClose');
    component.alarm_id = mockAlarm['core_id'];
    component.ngOnInit();
    component.reload();
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

  // Shelve Panel
  // Form
  describe('should have a form', () => {
    it('with an input field and a select', () => {
      expect(componentBody.querySelector('textarea')).toBeTruthy();
      expect(componentBody.querySelector('mat-select')).toBeTruthy();
    });
    describe('such that when it is empty', () => {
      it('the form should be invalid', () => {
        expect(component.form.valid).toBeFalsy();
      });
    });
    describe('such that when the user selects a timeout but does not enter a message ', () => {
      it('the form should be invalid', () => {
        expect(component.form.valid).toBeFalsy();
        component.form.controls['timeout'].setValue(component.timeouts[0]);
        expect(component.form.valid).toBeFalsy();
      });
    });
    describe('such that when the user completes other fields but does not enter a user ', () => {
      it('the form should be inalid', () => {
        expect(component.form.valid).toBeFalsy();
        component.form.controls['message'].setValue('Any Message');
        component.form.controls['timeout'].setValue(component.timeouts[0]);
        expect(component.form.valid).toBeFalsy();
      });
    });
    describe('such that when the user enters a message and selects a timeout and a user ', () => {
      it('the form should be valid', () => {
        expect(component.form.valid).toBeFalsy();
        component.form.controls['message'].setValue('Any Message');
        component.form.controls['timeout'].setValue(component.timeouts[0]);
        component.form.controls['user'].setValue('any_user');
        expect(component.form.valid).toBeTruthy();
      });
    });
  });
  // Cancel button
  describe('it should have a Cancel button', () => {
    it('in the modal footer', () => {
      // component.alarm.shelve();
      fixture.detectChanges();
      const sendButton = componentFooter.querySelector('#cancel');
      expect(sendButton).toBeTruthy();
      expect(sendButton.innerText).toEqual('Cancel');
    });
    describe('and when the user clicks on it,', () => {
      it('it should call the component onClose method', async(() => {
        // component.alarm.shelve();
        fixture.detectChanges();
        componentFooter.querySelector('#cancel').click();
        fixture.whenStable().then(() => {
          expect(component.onClose).toHaveBeenCalled();
        });
      }));
    });
  });

  // Shelve button
  describe('WHEN the Alarm is unshelved, it should have a Shelve button', () => {
    it('in the modal footer', () => {
      const sendButton = componentFooter.querySelector('#send');
      expect(sendButton).toBeTruthy();
      expect(sendButton.innerText).toEqual('Shelve');
    });
    describe('and when the user clicks on it,', () => {
      describe('and the user has not completed the form fields', () => {
        it('it should not call the component shelve method', async(() => {
          componentFooter.querySelector('#send').click();
          fixture.whenStable().then(() => {
            expect(alarmService.shelveAlarm).not.toHaveBeenCalled();
          });
        }));
      });
      describe('and the user complete the message and timeout fields but not the user field', () => {
        it('it should not call the component shelve method', async(() => {
          component.form.controls['message'].setValue('Any message');
          component.form.controls['timeout'].setValue(component.timeouts[0]);
          expect(component.form.valid).toBeFalsy();
          fixture.detectChanges();
          componentFooter.querySelector('#send').click();
          fixture.whenStable().then(() => {
            expect(alarmService.shelveAlarm).not.toHaveBeenCalled();
            expect(alarmService.unshelveAlarms).not.toHaveBeenCalled();
          });
        }));
      });
      describe('and the user complete all the fields', () => {
        it('it should call the component shelve method', async(() => {
          component.form.controls['message'].setValue('Any message');
          component.form.controls['user'].setValue('any_user');
          component.form.controls['timeout'].setValue(component.timeouts[0]);
          expect(component.form.valid).toBeTruthy();
          fixture.detectChanges();
          componentFooter.querySelector('#send').click();
          fixture.whenStable().then(() => {
            expect(alarmService.shelveAlarm).toHaveBeenCalled();
            expect(alarmService.unshelveAlarms).not.toHaveBeenCalled();
          });
        }));
      });
    });
  });

  // Unshelve Panel
  describe('WHEN the Alarm is shelved,', () => {
    // No form
    it('it should not have a form', () => {
      component.alarm.shelve();
      fixture.detectChanges();
      expect(componentBody.querySelector('textarea')).toBeFalsy();
      expect(componentBody.querySelector('mat-select')).toBeFalsy();
    });
    // Unshelve button
    describe('it should have an Unshelve button', () => {
      it('in the modal footer', () => {
        component.alarm.shelve();
        fixture.detectChanges();
        const sendButton = componentFooter.querySelector('#send');
        expect(sendButton).toBeTruthy();
        expect(sendButton.innerText).toEqual('Unshelve');
      });
      describe('and when the user clicks on it,', () => {
        it('it should call the component unshelve method', async(() => {
          component.alarm.shelve();
          fixture.detectChanges();
          componentFooter.querySelector('#send').click();
          fixture.whenStable().then(() => {
            expect(alarmService.unshelveAlarms).toHaveBeenCalled();
            expect(alarmService.shelveAlarm).not.toHaveBeenCalled();
          });
        }));
      });
    });
    // Cancel button
    describe('it should have a Cancel button', () => {
      it('in the modal footer', () => {
        component.alarm.shelve();
        fixture.detectChanges();
        const sendButton = componentFooter.querySelector('#cancel');
        expect(sendButton).toBeTruthy();
        expect(sendButton.innerText).toEqual('Cancel');
      });
      describe('and when the user clicks on it,', () => {
        it('it should call the component onClose method', async(() => {
          component.alarm.shelve();
          fixture.detectChanges();
          componentFooter.querySelector('#cancel').click();
          fixture.whenStable().then(() => {
            expect(component.onClose).toHaveBeenCalled();
          });
        }));
      });
    });
  });

  // Non-shelvable alarm
  describe('WHEN the Alarm is non-shelvable,', () => {
    // No form
    it('it should not have a form nor a Shelve/Unshleve button', () => {
      component.alarm.can_shelve = false;
      fixture.detectChanges();
      expect(componentBody.querySelector('textarea')).toBeFalsy();
      expect(componentBody.querySelector('mat-select')).toBeFalsy();
      expect(componentFooter.querySelector('#send')).toBeFalsy();
    });
    // Close button
    describe('it should have a Close button', () => {
      it('in the modal footer', () => {
        component.alarm.can_shelve = false;
        fixture.detectChanges();
        const sendButton = componentFooter.querySelector('#close');
        expect(sendButton).toBeTruthy();
        expect(sendButton.innerText).toEqual('Close');
      });
      describe('and when the user clicks on it,', () => {
        it('it should call the component onClose method', async(() => {
          component.alarm.can_shelve = false;
          fixture.detectChanges();
          componentFooter.querySelector('#close').click();
          fixture.whenStable().then(() => {
            expect(component.onClose).toHaveBeenCalled();
          });
        }));
      });
    });
  });
});
