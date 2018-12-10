import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { AntennasSidebarComponent } from './antennas-sidebar.component';
import { AlarmService } from '../../data/alarm.service';
import { Router } from '@angular/router';
import { AntennasService, AntennaConfig } from '../antennas.service';
import { SharedModule } from '../../shared/shared.module';
import { ActionsModule } from '../../actions/actions.module';
import { IasMaterialModule } from '../../ias-material/ias-material.module';
import { AlarmComponent } from '../../shared/alarm/alarm.component';
import { ButtonsComponent } from '../../actions/buttons/buttons.component';
import { Alarm } from '../../data/alarm';
import { DebugElement } from '@angular/core';

const mockAntennasConfig =  [
    {
      'antenna': 'antenna-0',
      'placemark': 'mockAlarm-0',
      'alarm': 'mockAlarm-0',
      'fire': 'mockAlarm-0-device',
      'fire_malfunction': 'mockAlarm-0-device',
      'ups': 'mockAlarm-0-device',
      'hvac': 'mockAlarm-0-device',
      'power': 'mockAlarm-0-device'
    },
    {
      'antenna': 'antenna-1',
      'placemark': 'mockAlarm-1',
      'alarm': 'mockAlarm-1',
      'fire': '',
      'fire_malfunction': '',
      'ups': '',
      'hvac': '',
      'power': ''
    },
    {
      'antenna': 'antenna-2',
      'placemark': 'mockAlarm-2',
      'alarm': 'mockAlarm-2',
      'fire': '',
      'fire_malfunction': '',
      'ups': '',
      'hvac': '',
      'power': ''
    }
  ];

const mockDevicesConfig = [
    {
      'antenna': 'device-1',
      'placemark': 'mockAlarm-3',
      'alarm': 'mockAlarm-3'
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

describe('AntennasSidebarComponent', () => {
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
        { provide: Router, useValue: spyRoutingTable },
        AntennasService
      ],
      imports: [
        SharedModule,
        ActionsModule,
        IasMaterialModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntennasSidebarComponent);
    antennasService = fixture.debugElement.injector.get(AntennasService);
    spyOn(antennasService, 'initialize').and.callFake(function() {});
    antennasService.antennasConfig = mockAntennasConfig;
    antennasService.devicesConfig = mockDevicesConfig;
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

  it('should have a getAntennaName method that return the antenna name', () => {
    const expectedName = 'antenna-0';
    expect(component.getAntennaName(mockAntennasConfig[0])).toEqual(expectedName);
  });

  describe('', () => {
    it('should have a container for the title', () => {
      const title = fixture.nativeElement.querySelector('.antennas-sidebar-title');
      expect(title).toBeTruthy();
    });

    it('should have a container for the content', () => {
      const title = fixture.nativeElement.querySelector('.antennas-sidebar-content');
      expect(title).toBeTruthy();
    });

    // describe('and if there is a selected antenna', () => {
    //   it('should have a link to return back', () => {
    //     component.selectedAntenna = mockAntennasConfig['antennas'][0];
    //     fixture.detectChanges();
    //     const link = fixture.nativeElement.querySelector('.return-link');
    //     expect(link).toBeTruthy();
    //     link.click();
    //     expect(component.selectedAntenna).toBeFalsy();
    //   });
    // //   it('should show antenna details component', () => {
    // //     component.selectedAntenna = mockAntennasConfig['antennas'][0];
    // //   });
    // });

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
