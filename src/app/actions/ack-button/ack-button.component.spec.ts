import { DebugElement } from '@angular/core';
import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { Router } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { IasMaterialModule } from '../../ias-material/ias-material.module';
import { DataModule } from '../../data/data.module';
import { AlarmService } from '../../data/alarm.service';
import { SidenavService } from '../sidenav.service';
import { AckButtonComponent } from './ack-button.component';
import { Alarm } from '../../data/alarm';
import { Iasio } from '../../data/iasio';


describe('GIVEN an AckButtonComponent', () => {
  let component: AckButtonComponent;
  let fixture: ComponentFixture<AckButtonComponent>;
  let alarmService: AlarmService;
  let debug: DebugElement;
  let html: HTMLElement;
  const spyRoutingTable = jasmine.createSpyObj('Router', ['navigate']);
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AckButtonComponent,
      ],
      imports: [
        IasMaterialModule,
        DataModule,
      ],
      providers: [
        SidenavService,
        { provide: Router, useValue: spyRoutingTable }
      ],
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
    fixture = TestBed.createComponent(AckButtonComponent);
    component = fixture.componentInstance;
    component.alarm_id = 'coreid$1';
    alarmService = fixture.debugElement.injector.get(AlarmService);
    debug = fixture.debugElement;
    html = debug.nativeElement;
    fixture.detectChanges();
  });

  it('THEN it should be created with the given alarm_id and get the Alarm from AlarmService', () => {
    expect(component).toBeTruthy();
    expect(component.alarm_id).toBe('coreid$1');
    expect(alarmService.get).toHaveBeenCalledWith('coreid$1');
  });

  describe('AND WHEN the user clicks on it', () => {
    it('THEN the sidenav is opened with the AcknowledgeComponent as content', () => {
      const mockEvent = {
        data: {
          alarm: Alarm.asAlarm(mockAlarm)
        }
      };
      component.onClick(null);
      const expectedargs = [{outlets: {actions: ['acknowledge', component.alarm_id]}}];
      expect(spyRoutingTable.navigate.calls.count()).toBe(1, 'spy method was called once');
      expect(spyRoutingTable.navigate.calls.mostRecent().args[0]).
        toEqual(expectedargs, 'spy method was called with the right parameters');
    });
  });
});
