import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { DebugElement } from '@angular/core';
import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableDataSource, MatSort, MatSortable, MatTableModule, MatSortModule } from '@angular/material';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ActivatedRoute, Params, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { IasMaterialModule } from '../../ias-material/ias-material.module';
import { DataModule } from '../../data/data.module';
import { ActionsModule } from '../../actions/actions.module';
import { SharedModule } from '../../shared/shared.module';
import { AlarmService } from '../../data/alarm.service';
import { TabularViewComponent } from './tabular-view.component';
import { LegendComponent } from '../legend/legend.component';
import { MockIasios, MockAlarms, ExpectedTableRows, ExpectedFilteredTableRows } from './fixtures';
import { Alarm } from '../../data/alarm';
import { Iasio } from '../../data/iasio';
import { DatePipe } from '@angular/common';
import { Locale } from '../../settings';


describe('TabularViewComponent', () => {
  let datePipe: DatePipe;
  let component: TabularViewComponent;
  let fixture: ComponentFixture<TabularViewComponent>;
  let debug: DebugElement;
  let html: HTMLElement;
  const localOffset = (new Date().getTimezoneOffset()) * 60 * 1000;
  let alarmService: AlarmService;
  const spyRoutingTable = jasmine.createSpyObj('Router', ['navigate']);
  const alarms = MockAlarms;
  const iasios = MockIasios;
  const expectedRows = ExpectedTableRows;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TabularViewComponent,
        LegendComponent,
      ],
      imports: [
        MatTableModule,
        MatSortModule,
        IasMaterialModule,
        DataModule,
        SharedModule,
        ActionsModule,
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
        { provide: Router, useValue: spyRoutingTable },
        DatePipe
      ]
    })
    .compileComponents();
  }));

  beforeEach(inject(
    [ DatePipe ],
    ( dp: DatePipe ) => {
      datePipe = dp;
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

  // TEST ALARMS STRING FOR FILTERS
  describe('GIVEN an alarm', () => {

    const alarm = Alarm.asAlarm({
      'value': 0,
      'core_id': 'coreid$1',
      'running_id': 'coreid$1',
      'mode': '0',
      'core_timestamp': 1267252440000,
      'validity': '1',
      'state_change_timestamp': 1267252440000,
      'description': 'Description',
      'url': 'https://www.alma.cl',
      'ack': false,
      'shelved': false,
      'dependencies': [],
    });

    it('it should be a method to create a string for the table filters', () => {

      const alarmString = component.alarmToStringForFiltering(alarm);
      const tsString = datePipe.transform(alarm.timestampOffset, Locale.DATE_FORMAT);

      expect(alarmString.includes(alarm.description)).toBeTruthy();
      expect(alarmString.includes(alarm.name)).toBeTruthy();
      expect(alarmString.includes(tsString)).toBeTruthy();
      expect(alarmString.includes('"unack"')).toBeTruthy();
      expect(alarmString.includes('"unshelved"')).toBeTruthy();
      expect(alarmString.includes('"startup"')).toBeTruthy();
      expect(alarmString.includes('"cleared"')).toBeTruthy();
      expect(alarmString.includes('"reliable"')).toBeTruthy();

    });
  });

});
