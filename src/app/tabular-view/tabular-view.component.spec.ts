import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { DebugElement } from '@angular/core';
import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatSort, MatSortable, MatTableModule, MatSortModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ActivatedRoute, Params, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NbCardModule } from '@nebular/theme';
import { Observable } from 'rxjs/Observable';
import { AlarmService } from '../alarm.service';
import { HttpClientService } from '../http-client.service';
import { CdbService } from '../cdb.service';
import { TabularViewComponent } from './tabular-view.component';
import { StatusViewComponent } from '../status-view/status-view.component';
import { LegendComponent } from '../legend/legend.component';
import { AckButtonComponent } from '../ack-button/ack-button.component';
import { WikiButtonComponent } from '../wiki-button/wiki-button.component';
import { MockIasios, MockAlarms, ExpectedTableRows } from './fixtures';
import { Alarm } from '../alarm';
import { Iasio } from '../iasio';


describe('TabularViewComponent', () => {
  let component: TabularViewComponent;
  let fixture: ComponentFixture<TabularViewComponent>;
  let debug: DebugElement;
  let html: HTMLElement;
  const localOffset = (new Date().getTimezoneOffset()) * 60 * 1000;
  let alarmService: AlarmService;
  let cdbService: CdbService;
  const alarms = MockAlarms;
  const iasios = MockIasios;
  const expectedRows = ExpectedTableRows;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TabularViewComponent,
        StatusViewComponent,
        LegendComponent,
        AckButtonComponent,
        WikiButtonComponent,
      ],
      imports: [
        NbCardModule,
        MatTableModule,
        HttpClientModule,
        MatSortModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                filter: 'temperature'
              })
            }
          },
        },
        HttpClientService,
        HttpClient,
        AlarmService,
        CdbService,
      ]
    })
    .overrideModule( BrowserDynamicTestingModule , {
      set: {
        entryComponents: [  StatusViewComponent ]
      }
    })
    .compileComponents();
  }));

  beforeEach(
    inject([CdbService], (service) => {
      cdbService = service;

      const mockIasConfiguration = {
          id: 1,
          log_level: 'INFO',
          refresh_rate: 2,
          broadcast_factor: 3,
          tolerance: 1,
          properties: []
      };
      spyOn(cdbService, 'initialize')
        .and.callFake(function() {});
      cdbService.iasConfiguration = mockIasConfiguration;

      for (const iasio of iasios) {
        const alarmIasio = new Iasio(iasio);
        cdbService.iasAlarmsIasios[alarmIasio['io_id']] = alarmIasio;
      }
      cdbService.iasDataAvailable.next(true);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TabularViewComponent);
    component = fixture.componentInstance;
    alarmService = fixture.debugElement.injector.get(AlarmService);
    debug = fixture.debugElement;
    html = debug.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TEST SORTING
  describe('AND WHEN the service processes the alarms', () => {
    it('THEN the DataSource of the Table contains those Alarms sorted by status', () => {
      alarmService.readAlarmMessagesList(alarms);
      fixture.detectChanges();
      const sortedData = component.dataSource._orderData(component.dataSource.data);
      expect(sortedData).toEqual(ExpectedTableRows);
    });
  });

  // TEST APPLY_FILTER AND TOGGLE
  describe('GIVEN the user clicks on the toggle for Set Alarms only', () => {
    it('WHEN previously the filter is "temperature", THEN the filter should be "temperature set"', () => {
      expect(component.filters).toEqual('temperature');
      expect(component.dataSource.filter).toEqual('temperature');
      component.toggleFilterOnlySetAlarm();
      fixture.detectChanges();
      expect(component.filters).toEqual('temperature set');
      expect(component.dataSource.filter).toEqual('temperature set');
    });

    it('WHEN previously the filter is "temperature set", THEN the filter should be "temperature"', () => {
      component.applyFilter('temperature set');
      expect(component.filters).toEqual('temperature set');
      expect(component.dataSource.filter).toEqual('temperature set');
      component.toggleFilterOnlySetAlarm();
      fixture.detectChanges();
      expect(component.filters).toEqual('temperature');
      expect(component.dataSource.filter).toEqual('temperature');
    });

    it('WHEN previously the filter is "set temperature", THEN the filter should be "temperature"', () => {
      component.applyFilter('set temperature');
      expect(component.filters).toEqual('set temperature');
      expect(component.dataSource.filter).toEqual('set temperature');
      component.toggleFilterOnlySetAlarm();
      fixture.detectChanges();
      expect(component.filters).toEqual('temperature');
      expect(component.dataSource.filter).toEqual('temperature');
    });
  });

});
