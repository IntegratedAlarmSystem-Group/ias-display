import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { DebugElement } from '@angular/core';
import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatSort, MatSortable, MatTableModule, MatSortModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ActivatedRoute, Params, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { IasMaterialModule } from '../ias-material/ias-material.module';
import { DataModule } from '../data/data.module';
import { SharedModule } from '../shared/shared.module';
import { AlarmService } from '../data/alarm.service';
import { CdbService } from '../data/cdb.service';
import { TabularViewComponent } from './tabular-view.component';
import { StatusViewComponent } from '../status-view/status-view.component';
import { LegendComponent } from '../legend/legend.component';
import { AckButtonComponent } from '../ack-button/ack-button.component';
import { ShelveButtonComponent } from '../shelve-button/shelve-button.component';
import { MockIasios, MockAlarms, ExpectedTableRows, ExpectedFilteredTableRows } from './fixtures';
import { Alarm } from '../data/alarm';
import { Iasio } from '../data/iasio';


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
        ShelveButtonComponent,
      ],
      imports: [
        MatTableModule,
        HttpClientModule,
        MatSortModule,
        BrowserAnimationsModule,
        NgbModule.forRoot(),
        IasMaterialModule,
        DataModule,
        SharedModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                filter: ''
              })
            }
          },
        },
        HttpClient,
        NgbModal,
      ]
    })
    .overrideModule( BrowserDynamicTestingModule , {
      set: {
        entryComponents: [ StatusViewComponent ]
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

  // TEST COMPONENT CREATION
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TEST SORTING
  describe('WHEN the service processes the alarms', () => {
    it('THEN the DataSource of the Table contains those Alarms sorted by status', () => {
      alarmService.readAlarmMessagesList(alarms);
      fixture.detectChanges();
      const sortedData = component.dataSource._orderData(component.dataSource.filteredData);
      expect(sortedData).toEqual(ExpectedTableRows);
    });
  });

  // TEST APPLICATION OF FILTER AND TOGGLE
  describe('GIVEN the user clicks on the toggle for Set Alarms only', () => {
    it('WHEN previously the filter was "temperature", THEN the filter should be "temperature set", and the toggle should be true', () => {
      component.applyFilter('temperature');
      expect(component.filters).toEqual('temperature');
      expect(component.dataSource.filter).toEqual('temperature');
      expect(component.toggleStatus).toEqual(false);
      component.toggleFilterOnlySetAlarm();
      fixture.detectChanges();
      expect(component.filters).toEqual('temperature set');
      expect(component.dataSource.filter).toEqual('temperature set');
      expect(component.toggleStatus).toEqual(true);
    });

    it('WHEN previously the filter was "temperature set", THEN the filter should be "temperature", and the toggle should be false', () => {
      component.applyFilter('temperature set');
      expect(component.filters).toEqual('temperature set');
      expect(component.dataSource.filter).toEqual('temperature set');
      expect(component.toggleStatus).toEqual(true);
      component.toggleFilterOnlySetAlarm();
      fixture.detectChanges();
      expect(component.filters).toEqual('temperature');
      expect(component.dataSource.filter).toEqual('temperature');
      expect(component.toggleStatus).toEqual(false);
    });

    it('WHEN previously the filter was "set temperature", THEN the filter should be "temperature", and the toggle should be false', () => {
      component.applyFilter('set temperature');
      expect(component.toggleStatus).toEqual(true);
      expect(component.filters).toEqual('set temperature');
      expect(component.dataSource.filter).toEqual('set temperature');
      component.toggleFilterOnlySetAlarm();
      fixture.detectChanges();
      expect(component.filters).toEqual('temperature');
      expect(component.dataSource.filter).toEqual('temperature');
      expect(component.toggleStatus).toEqual(false);
    });
  });

  // TEST THAT THE FILTER ACTUALLY WORKS
  describe('GIVEN the service processes the alarms, WHEN the user sets a filter', () => {
    it('THEN the DataSource of the Table contains the Alarms that match the filter, sorted by status', () => {
      alarmService.readAlarmMessagesList(alarms);
      component.applyFilter('coreid$2');
      component.dataSource._updateChangeSubscription();
      fixture.detectChanges();
      const filteredSortedData = component.dataSource._orderData(component.dataSource.filteredData);
      expect(filteredSortedData).toEqual(ExpectedFilteredTableRows);
    });
  });
});
