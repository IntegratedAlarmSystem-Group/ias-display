import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AntennasSidebarComponent } from './antennas-sidebar.component';
import { AntennasService } from '../antennas.service';
import { ActionsModule } from '../../actions/actions.module';
import { DataModule } from '../../data/data.module';
import { IasMaterialModule } from '../../ias-material/ias-material.module';
import { SharedModule } from '../../shared/shared.module';
import { AlarmService } from '../../data/alarm.service';
import { RoutingService } from '../../app-routing/routing.service';
import { AlarmComponent } from '../../shared/alarm/alarm.component';
import { ButtonsComponent } from '../../actions/buttons/buttons.component';
import { Alarm } from '../../data/alarm';
import { AlarmConfig } from '../../data/alarm-config';

const mockAntennasConfig =  [
    {
      'alarm_id': 'mockAlarm-0',
      'custom_name': 'antenna-0',
      'type': 'antenna',
      'view': 'antennas',
      'placemark': 'mockAlarm-0',
      'group': 'antennas',
      'children': [],
    },
    {
      'alarm_id': 'mockAlarm-1',
      'custom_name': 'antenna-1',
      'type': 'antenna',
      'view': 'antennas',
      'placemark': 'mockAlarm-1',
      'group': 'antennas',
      'children': []
    },
    {
      'alarm_id': 'mockAlarm-2',
      'custom_name': 'antenna-2',
      'type': 'antenna',
      'view': 'antennas',
      'placemark': 'mockAlarm-2',
      'group': 'antennas',
      'children': []
    }
  ];

const mockDevicesConfig = [
    {
      'alarm_id': 'mockAlarm-3',
      'custom_name': 'device-1',
      'placemark': '',
      'type': 'device',
      'view': 'antennas',
      'children': []
    }
  ];

const mockAlarms = {
  'mockAlarm-0': Alarm.asAlarm({
    'value': 0,
    'core_id': 'mockAlarm-0',
    'running_id': 'mockAlarm-0',
    'mode': '0',
    'core_timestamp': 1267252440000,
    'validity': '1',
    'state_change_timestamp': 1267252440000,
    'description': 'Short description for mock alarm',
    'url': 'https://www.alma1.cl',
    'sound': 'NONE',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
    'dependencies': ['mockAlarm-0-device'],
  }),
  'mockAlarm-1': Alarm.asAlarm({
    'value': 0,
    'core_id': 'mockAlarm-1',
    'running_id': 'mockAlarm-1',
    'mode': '0',
    'core_timestamp': 1267252440000,
    'validity': '1',
    'state_change_timestamp': 1267252440000,
    'description': 'Short description for mock alarm',
    'url': 'https://www.alma2.cl',
    'sound': 'NONE',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  }),
  'mockAlarm-2': Alarm.asAlarm({
    'value': 0,
    'core_id': 'mockAlarm-2',
    'running_id': 'mockAlarm-2',
    'mode': '0',
    'core_timestamp': 1267252440000,
    'validity': '1',
    'state_change_timestamp': 1267252440000,
    'description': 'Short description for mock alarm',
    'url': 'https://www.alma2.cl',
    'sound': 'NONE',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  }),
  'mockAlarm-0-device': Alarm.asAlarm({
    'value': 0,
    'core_id': 'mockAlarm-0-device',
    'running_id': 'mockAlarm-0-device',
    'mode': '0',
    'core_timestamp': 1267252440000,
    'validity': '1',
    'state_change_timestamp': 1267252440000,
    'description': 'Short description for mock alarm device',
    'url': 'https://www.alma1.cl',
    'sound': 'NONE',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  }),
  'mockAlarm-3': Alarm.asAlarm({
    'value': 0,
    'core_id': 'mockAlarm-3',
    'running_id': 'mockAlarm-3',
    'mode': '0',
    'core_timestamp': 1267252440000,
    'validity': '1',
    'state_change_timestamp': 1267252440000,
    'description': 'Short description for mock alarm',
    'url': 'https://www.alma2.cl',
    'sound': 'NONE',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  })
};

fdescribe('AntennasSidebarComponent', () => {
  let component: AntennasSidebarComponent;
  let fixture: ComponentFixture<AntennasSidebarComponent>;
  let debug: DebugElement;
  let antennasService: AntennasService;
  let alarmService: AlarmService;

  // const spyRoutingTable = jasmine.createSpyObj('RoutingService', ['tableWithFilter']);
  const spyRoutingTable = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AntennasSidebarComponent
      ],
      providers: [
        AntennasService,
        RoutingService,
        { provide: Router, useValue: spyRoutingTable },
      ],
      imports: [
        ActionsModule,
        DataModule,
        IasMaterialModule,
        SharedModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntennasSidebarComponent);
    antennasService = fixture.debugElement.injector.get(AntennasService);
    spyOn(antennasService, 'initialize').and.callFake(function() {});
    antennasService.antennasConfig = mockAntennasConfig as AlarmConfig[];
    antennasService.devicesConfig = mockDevicesConfig as AlarmConfig[];
    component = fixture.componentInstance;
    debug = fixture.debugElement;
    alarmService = fixture.debugElement.injector.get(AlarmService);
    spyOn(alarmService, 'get').and.callFake(function(alarm_id) {
      return mockAlarms[alarm_id];
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a getAlarm method', () => {
    expect(component.getAlarm('mockAlarm-0')).toEqual(mockAlarms['mockAlarm-0']);
  });

  // it('should have a getAntennaName method that return the antenna name', () => {
  //   const expectedName = 'antenna-0';
  //   expect(component.getAntennaName(mockAntennasConfig[0])).toEqual(expectedName);
  // });

  describe('', () => {
    it('should have a container for the title', () => {
      const title = fixture.nativeElement.querySelector('.antennas-sidebar-title');
      expect(title).toBeTruthy();
    });

    it('should have a container for the content', () => {
      const title = fixture.nativeElement.querySelector('.antennas-sidebar-content');
      expect(title).toBeTruthy();
    });

    describe('and if there is a selected antenna', () => {
      it('should have a link to return back', () => {
        component.selectedAntenna = mockAntennasConfig[0];
        fixture.detectChanges();
        const link = fixture.nativeElement.querySelector('.return-link');
        expect(link).toBeTruthy();
        link.click();
        expect(component.selectedAntenna).toBeFalsy();
      });
      it('should show antenna details component', () => {
        component.selectedAntenna = mockAntennasConfig[0];
        fixture.detectChanges();
        const alarmInfo = fixture.nativeElement.querySelector('.alarm-info');
        const devicesAlarms = fixture.nativeElement.querySelector('.devices-alarms');
        expect(alarmInfo).toBeTruthy('The alarm-info div does not exist');
        expect(alarmInfo.textContent).toContain(mockAntennasConfig[0].alarm_id, 'The alarmInfo does not contain the alarm id');
        expect(alarmInfo.textContent).toContain(mockAntennasConfig[0].placemark, 'The alarmInfo does not contain the pad');
        expect(alarmInfo.textContent).toContain(mockAntennasConfig[0].custom_name, 'The alarmInfo does not contain the antenna');
        expect(devicesAlarms).toBeTruthy('The devices-alarms div does not contain the alarm');
      });
    });

    describe('and if there is not a selected antenna', () => {
      describe('and an antenna (grid-item with an alarm-header inside) is clicked', () => {
        it('then the correspoding antenna is selected', () => {
          component.selectedAntenna = null;
          const antennas = fixture.nativeElement.querySelectorAll('.grid-item');
          antennas[0].click();
          expect(component.selectedAntenna).toBeTruthy();
          expect(component.selectedAntenna.placemark).toEqual('mockAlarm-0');
          expect(component.selectedAntenna.alarm).toEqual('mockAlarm-0');
          expect(component.selectedAntenna.antenna).toEqual('antenna-0');
        });
      });
    });

  });
});
