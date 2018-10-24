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


fdescribe('TabularViewComponent', () => {
  let datePipe: DatePipe;
  let component: TabularViewComponent;
  let fixture: ComponentFixture<TabularViewComponent>;
  let debug: DebugElement;
  let html: HTMLElement;
  let filtersToggle: object;
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
  //
  // SET FILTER
  describe('GIVEN the user clicks on the toggle for Set Alarms', () => {
    it('WHEN previously the filter was "temperature", THEN the filter should be "temperature set", and the toggle should be true', () => {
      component.applyFilter('temperature');
      expect(component.filters).toEqual('temperature');
      expect(component.dataSource.filter).toEqual('temperature');
      filtersToggle = component.filtersToggleStatus;
      expect(filtersToggle['setFilter']).toEqual(false);
      component.toggleFilterSetAlarm();
      fixture.detectChanges();
      expect(component.filters).toEqual('temperature set');
      expect(component.dataSource.filter).toEqual('temperature set');
      filtersToggle = component.filtersToggleStatus;
      expect(filtersToggle['setFilter']).toEqual(true);
    });

    it('WHEN previously the filter was "temperature set", THEN the filter should be "temperature", and the toggle should be false', () => {
      component.applyFilter('temperature set');
      expect(component.filters).toEqual('temperature set');
      expect(component.dataSource.filter).toEqual('temperature set');
      filtersToggle = component.filtersToggleStatus;
      expect(filtersToggle['setFilter']).toEqual(true);
      component.toggleFilterSetAlarm();
      fixture.detectChanges();
      expect(component.filters).toEqual('temperature');
      expect(component.dataSource.filter).toEqual('temperature');
      filtersToggle = component.filtersToggleStatus;
      expect(filtersToggle['setFilter']).toEqual(false);
    });

    it('WHEN previously the filter was "set temperature", THEN the filter should be "temperature", and the toggle should be false', () => {
      component.applyFilter('set temperature');
      filtersToggle = component.filtersToggleStatus;
      expect(filtersToggle['setFilter']).toEqual(true);
      expect(component.filters).toEqual('set temperature');
      expect(component.dataSource.filter).toEqual('set temperature');
      component.toggleFilterSetAlarm();
      fixture.detectChanges();
      expect(component.filters).toEqual('temperature');
      expect(component.dataSource.filter).toEqual('temperature');
      filtersToggle = component.filtersToggleStatus;
      expect(filtersToggle['setFilter']).toEqual(false);
    });
  });

  // UNACK FILTER
  describe('GIVEN the user clicks on the toggle for not ack Alarms', () => {
    it(`WHEN previously the filter was "temperature",
        THEN the filter should be "temperature "unack"",
        and the toggle should be true`, () => {
      component.applyFilter('temperature');
      expect(component.filters).toEqual('temperature');
      expect(component.dataSource.filter).toEqual('temperature');
      filtersToggle = component.filtersToggleStatus;
      expect(filtersToggle['unackFilter']).toEqual(false);
      component.toggleFilterUnackAlarm();
      fixture.detectChanges();
      expect(component.filters).toEqual('temperature "unack"');
      expect(component.dataSource.filter).toEqual('temperature "unack"');
      filtersToggle = component.filtersToggleStatus;
      expect(filtersToggle['unackFilter']).toEqual(true);
    });

    it(`WHEN previously the filter was "temperature "unack"",
        THEN the filter should be "temperature",
        and the toggle should be false`, () => {
      component.applyFilter('temperature "unack"');
      expect(component.filters).toEqual('temperature "unack"');
      expect(component.dataSource.filter).toEqual('temperature "unack"');
      filtersToggle = component.filtersToggleStatus;
      expect(filtersToggle['unackFilter']).toEqual(true);
      component.toggleFilterUnackAlarm();
      fixture.detectChanges();
      expect(component.filters).toEqual('temperature');
      expect(component.dataSource.filter).toEqual('temperature');
      filtersToggle = component.filtersToggleStatus;
      expect(filtersToggle['unackFilter']).toEqual(false);
    });

    it(`WHEN previously the filter was "set temperature",
        THEN the filter should be "temperature",
        and the toggle should be false
      `, () => {
      component.applyFilter('"unack" temperature');
      filtersToggle = component.filtersToggleStatus;
      expect(filtersToggle['unackFilter']).toEqual(true);
      expect(component.filters).toEqual('"unack" temperature');
      expect(component.dataSource.filter).toEqual('"unack" temperature');
      component.toggleFilterUnackAlarm();
      fixture.detectChanges();
      expect(component.filters).toEqual('temperature');
      expect(component.dataSource.filter).toEqual('temperature');
      filtersToggle = component.filtersToggleStatus;
      expect(filtersToggle['unackFilter']).toEqual(false);
    });
  });

  // SHELVED FILTER
  describe('GIVEN the user clicks on the toggle for shelved Alarms', () => {
    it(`WHEN previously the filter was "temperature",
        THEN the filter should be "temperature "shelved"",
        and the toggle should be true`, () => {
      component.applyFilter('temperature');
      expect(component.filters).toEqual('temperature');
      expect(component.dataSource.filter).toEqual('temperature');
      filtersToggle = component.filtersToggleStatus;
      expect(filtersToggle['shelvedFilter']).toEqual(false);
      component.toggleFilterShelvedAlarm();
      fixture.detectChanges();
      expect(component.filters).toEqual('temperature "shelved"');
      expect(component.dataSource.filter).toEqual('temperature "shelved"');
      filtersToggle = component.filtersToggleStatus;
      expect(filtersToggle['shelvedFilter']).toEqual(true);
    });

    it(`WHEN previously the filter was "temperature "shelved"",
        THEN the filter should be "temperature",
        and the toggle should be false`, () => {
      component.applyFilter('temperature "shelved"');
      expect(component.filters).toEqual('temperature "shelved"');
      expect(component.dataSource.filter).toEqual('temperature "shelved"');
      filtersToggle = component.filtersToggleStatus;
      expect(filtersToggle['shelvedFilter']).toEqual(true);
      component.toggleFilterShelvedAlarm();
      fixture.detectChanges();
      expect(component.filters).toEqual('temperature');
      expect(component.dataSource.filter).toEqual('temperature');
      filtersToggle = component.filtersToggleStatus;
      expect(filtersToggle['shelvedFilter']).toEqual(false);
    });

    it(`WHEN previously the filter was "set temperature",
        THEN the filter should be "temperature",
        and the toggle should be false
      `, () => {
      component.applyFilter('"shelved" temperature');
      filtersToggle = component.filtersToggleStatus;
      expect(filtersToggle['shelvedFilter']).toEqual(true);
      expect(component.filters).toEqual('"shelved" temperature');
      expect(component.dataSource.filter).toEqual('"shelved" temperature');
      component.toggleFilterShelvedAlarm();
      fixture.detectChanges();
      expect(component.filters).toEqual('temperature');
      expect(component.dataSource.filter).toEqual('temperature');
      filtersToggle = component.filtersToggleStatus;
      expect(filtersToggle['shelvedFilter']).toEqual(false);
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
      'core_timestamp': 1267252440000,
      'state_change_timestamp': 1267252440000,
      'description': 'Description',
      'url': 'https://www.alma.cl',
      'ack': false,
      'shelved': false,
      'mode': '0',
      'validity': '1',
      'dependencies': [],
    });

    it('should be a method to create a string for the table filters', () => {

      const tsString = alarm.formattedTimestamp;
      const alarmString = component.alarmToStringForFiltering(alarm);

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
