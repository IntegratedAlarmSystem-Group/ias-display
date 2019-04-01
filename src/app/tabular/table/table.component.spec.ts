import { async, tick, fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule, MatSortModule } from '@angular/material';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { IasMaterialModule } from '../../ias-material/ias-material.module';
import { DataModule } from '../../data/data.module';
import { ActionsModule } from '../../actions/actions.module';
import { SharedModule } from '../../shared/shared.module';
import { AlarmService } from '../../data/alarm.service';
import { RoutingService } from '../../app-routing/routing.service';
import { TableComponent } from './table.component';
import { LegendComponent } from '../legend/legend.component';
import { Alarm, Value, Validity, OperationalMode } from '../../data/alarm';
import { DatePipe } from '@angular/common';
import {
  MockAlarms,
  MockAlarmsToDisplay,
  ExpectedTableRows,
  ExpectedFilteredTableRows,
  ExpectedReducedTableRows,
  ChangedAlarm5,
  ChangedAlarm2,
  ExpectedReducedTableRowsAfterChange,
} from './fixtures';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let filtersToggle: object;
  let alarmService: AlarmService;
  const spyRoutingTable = jasmine.createSpyObj('Router', ['navigate']);
  const alarms = MockAlarms;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TableComponent,
        LegendComponent,
      ],
      imports: [
        MatTableModule,
        MatSortModule,
        ActionsModule,
        IasMaterialModule,
        DataModule,
        SharedModule,
      ],
      providers: [
        RoutingService,
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

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    alarmService = fixture.debugElement.injector.get(AlarmService);
    spyOn(alarmService, 'bufferStreamTasks').and.callFake(
      function(change) {
        alarmService.updateAlarmChangeBuffer(change);
        const changes = alarmService.getChangesFromBuffer();
        alarmService.alarmChangeInputStream.next(changes);
      }
    );
    fixture.detectChanges();
  });

  // TEST COMPONENT CREATION
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TEST LOADING AND SORTING
  describe('WHEN the service processes the alarms', () => {
    it('THEN the DataSource of the Table contains those Alarms sorted by status', () => {
      alarmService.readAlarmMessagesList(alarms);
      fixture.detectChanges();
      const sortedData = component.dataSource._orderData(component.dataSource.filteredData);
      expect(sortedData).toEqual(ExpectedTableRows);
    });
  });

  // TEST LOADING WHEN TABLE DISPLAYS SOME ALARMS ONLY
  describe('WHEN the Table shows only some alarms', () => {

    beforeEach(() => {
      component.alarmsToDisplay = MockAlarmsToDisplay;
      fixture.detectChanges();
    });

    describe('AND the service processes all the alarms', () => {
      it('THEN the DataSource of the Table contains those Alarms sorted by status', () => {
        // Act
        alarmService.readAlarmMessagesList(alarms);
        fixture.detectChanges();
        // Assert
        const sortedData = component.dataSource._orderData(component.dataSource.filteredData);
        expect(sortedData).toEqual(ExpectedReducedTableRows);
      });
    });

    describe('AND the service processes only one of the alarms that must be displayed', () => {
      it('THEN the DataSource of the Table updates the change of that Alarm', () => {
        // Arrange
        alarmService.readAlarmMessagesList(alarms);
        fixture.detectChanges();
        // Act
        alarmService.readAlarmMessage('update', ChangedAlarm5);
        fixture.detectChanges();
        // Assert
        const sortedData = component.dataSource._orderData(component.dataSource.filteredData);
        expect(sortedData).toEqual(ExpectedReducedTableRowsAfterChange);
      });
    });

    describe('AND the service processes only one of the alarms that must NOT be displayed', () => {
      it('THEN the DataSource of the Table does not update the change of that Alarm', () => {
        // Arrange
        alarmService.readAlarmMessagesList(alarms);
        fixture.detectChanges();
        // Act
        alarmService.readAlarmMessage('update', ChangedAlarm2);
        fixture.detectChanges();
        // Assert
        const sortedData = component.dataSource._orderData(component.dataSource.filteredData);
        expect(sortedData).toEqual(ExpectedReducedTableRows);
      });
    });
  });

  // TEST LOADING WHEN TABLE DISPLAYS NO ALARMS
  describe('WHEN the Table shows no alarms', () => {

    beforeEach(() => {
      component.alarmsToDisplay = [];
      fixture.detectChanges();
    });

    describe('AND the service processes all the alarms', () => {
      it('THEN the DataSource of the Table contains no Alarms', fakeAsync(() => {
        // Act
        alarmService.readAlarmMessagesList(alarms);
        fixture.detectChanges();
        // Assert
        tick(200);
        const sortedData = component.dataSource._orderData(component.dataSource.filteredData);
        expect(sortedData).toEqual([]);
      }));
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
  describe('GIVEN an alarm, the string generated for the text filter should comply with the following conditions', () => {

    const ackOptions = [true, false];
    const shelvedOptions = [true, false];
    const modeNames = Object.keys(OperationalMode).filter(k => typeof OperationalMode[k as any] === 'number');
    const modeOptions = modeNames.map(k => OperationalMode[k as any]);
    const valueNames = Object.keys(Value).filter(k => typeof Value[k as any] === 'number');
    const valueOptions = valueNames.map(k => Value[k as any]);
    const validityNames = Object.keys(Validity).filter(k => typeof Validity[k as any] === 'number');
    const validityOptions = validityNames.map(k => Validity[k as any]);

    function ackKeyFromValue(value) {
      return value ? '"ack"' : '"unack"';
    }

    function shelvedKeyFromValue(value) {
      return value ? '"shelved"' : '"unshelved"';
    }

    let mockAlarm: Alarm;
    let alarmString = '';

    mockAlarm = Alarm.asAlarm({
      'value': 0,
      'core_id': 'coreid$1',
      'running_id': 'coreid$1',
      'core_timestamp': 1267252440000,
      'state_change_timestamp': 1267252440000,
      'value_change_timestamp': 0,
      'value_change_transition': [0, 0],
      'description': 'Description',
      'url': 'https://www.alma.cl',
      'sound': 'NONE',
      'can_shelve': true,
      'ack': false,
      'shelved': false,
      'mode': '0',
      'validity': '1',
      'dependencies': [],
    });

    it('should contain the description of the alarm', () => {
      const alarm = mockAlarm;
      alarmString = component.alarmToStringForFiltering(alarm);
      expect(alarmString.includes(alarm.description)).toBeTruthy();
    });

    it('should contain the name of the alarm', () => {
      const alarm = mockAlarm;
      alarmString = component.alarmToStringForFiltering(alarm);
      expect(alarmString.includes(alarm.name)).toBeTruthy();
    });

    it('should contain the formatted timestamp of the alarm', () => {
      const alarm = mockAlarm;
      alarmString = component.alarmToStringForFiltering(alarm);
      expect(alarmString.includes(alarm.formattedTimestamp)).toBeTruthy();
    });

    it('should contain the ack state of the alarm', () => {
      const alarm = mockAlarm;
      alarmString = component.alarmToStringForFiltering(alarm);
      for (const property of [
         {'attr': 'ack', 'options': ackOptions}]) {
         const attrName: string = property['attr'];
         const values = property['options'];
         for (const alarmValue of values) {
           alarm[attrName] = alarmValue;
           alarmString = component.alarmToStringForFiltering(alarm);
           expect(alarmString.includes(ackKeyFromValue(alarm.ack))).toBeTruthy();
         }
       }
    });

    it('should contain the shelved state of the alarm', () => {
      const alarm = mockAlarm;
      alarmString = component.alarmToStringForFiltering(alarm);
      for (const property of [
         {'attr': 'shelved', 'options': shelvedOptions}]) {
         const attrName: string = property['attr'];
         const values = property['options'];
         for (const alarmValue of values) {
           alarm[attrName] = alarmValue;
           alarmString = component.alarmToStringForFiltering(alarm);
           expect(alarmString.includes(shelvedKeyFromValue(alarm.shelved))).toBeTruthy();
         }
       }
    });

    it('should contain the mode of the alarm', () => {
      const alarm = mockAlarm;
      alarmString = component.alarmToStringForFiltering(alarm);
      for (const property of [
        {'attr': 'mode', 'options': modeOptions}]) {
          const attrName = property['attr'];
          const values = property['options'];
          for (const value of values) {
            const alarmValue = OperationalMode[value];
            alarm[attrName] = alarmValue;
            alarmString = component.alarmToStringForFiltering(alarm);
            expect(alarmString.includes(OperationalMode[alarm.mode])).toBeTruthy();
          }
      }
    });

    it('should contain the validity of the alarm', () => {
      const alarm = mockAlarm;
      alarmString = component.alarmToStringForFiltering(alarm);
      for (const property of [
        {'attr': 'validity', 'options': validityOptions}]) {
          const attrName = property['attr'];
          const values = property['options'];
          for (const value of values) {
            const alarmValue = Validity[value];
            alarm[attrName] = alarmValue;
            alarmString = component.alarmToStringForFiltering(alarm);
            expect(alarmString.includes(Validity[alarm.validity])).toBeTruthy();
          }
      }
    });

    it('should contain the value of the alarm', () => {
      const alarm = mockAlarm;
      alarmString = component.alarmToStringForFiltering(alarm);
      for (const property of [
        {'attr': 'value', 'options': valueOptions}]) {
          const attrName = property['attr'];
          const values = property['options'];
          for (const value of values) {
            const alarmValue = Value[value];
            alarm[attrName] = alarmValue;
            alarmString = component.alarmToStringForFiltering(alarm);
            expect(alarmString.includes(Value[alarm.value])).toBeTruthy();
          }
      }
    });

  });

});
