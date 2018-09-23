import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { AntennasSidebarComponent } from './antennas-sidebar.component';
import { AlarmService } from '../../data/alarm.service';
// import { RoutingService } from '../../data/routing.service';
import { Router } from '@angular/router';
import { AntennasService, AntennaConfig } from '../antennas.service';
import { SharedModule } from '../../shared/shared.module';
import { ActionsModule } from '../../actions/actions.module';
import { AlarmComponent } from '../../shared/alarm/alarm.component';
import { ButtonsComponent } from '../../actions/buttons/buttons.component';
import { Alarm } from '../../data/alarm';

const mockAntennasConfig = {
  'group-0': [
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
    }
  ],
  'group-1': [
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
  ]
};

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
    'ack': false,
    'shelved': false,
    'dependencies': [],
  }),
};

describe('AntennasSidebarComponent', () => {
  let component: AntennasSidebarComponent;
  let fixture: ComponentFixture<AntennasSidebarComponent>;
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
        ActionsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(
    inject([AntennasService], (service) => {
      antennasService = service;
      spyOn(antennasService, 'initialize').and.callFake(function() {});
      antennasService.antennasConfig = mockAntennasConfig;
    })
  );

  beforeEach(
    inject([AlarmService], (service) => {
      alarmService = service;
      spyOn(alarmService, 'get').and.callFake(function(alarm_id) {
        return mockAlarms[alarm_id];
      });
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AntennasSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a getAlarm method', () => {
    expect(component.getAlarm('mockAlarm-0')).toEqual(mockAlarms['mockAlarm-0']);
  });

  it('should have a getAntennaName method that return the antenna (pad) name', () => {
    const expectedName = 'antenna-0 (mockAlarm-0)';
    expect(component.getAntennaName(mockAntennasConfig['group-0'][0])).toEqual(expectedName);
  });

  it('should have a method getAntennasGroups method to return the list of groups', () => {
    const expectedList = ['group-0', 'group-1'];
    expect(component.getAntennasGroups()).toEqual(expectedList);
  });

  it('should have a method getAntennasByGroup method to return the list of antennasConfig objects by group', () => {
    expect(component.getAntennasByGroup('group-0')).toEqual(mockAntennasConfig['group-0']);
    expect(component.getAntennasByGroup('group-1')).toEqual(mockAntennasConfig['group-1']);
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
    //     component.selectedAntenna = mockAntennasConfig['group-0'][0];
    //     fixture.detectChanges();
    //     const link = fixture.nativeElement.querySelector('.return-link');
    //     expect(link).toBeTruthy();
    //     link.click();
    //     expect(component.selectedAntenna).toBeFalsy();
    //   });
    // //   it('should show antenna details component', () => {
    // //     component.selectedAntenna = mockAntennasConfig['group-0'][0];
    // //   });
    // });

    describe('and if there is not a selected antenna', () => {
      it('should have containers for each group of antennas', () => {
        component.selectedAntenna = null;
        const groups = fixture.nativeElement.querySelectorAll('.antennas-group-container');
        expect(groups.length).toBe(2);
      });

      it('should display the list of alarm header components in each group', () => {
        component.selectedAntenna = null;
        const groups = fixture.nativeElement.querySelectorAll('.antennas-group-container');

        const alarmsGroup0 = groups[0].querySelectorAll('app-alarm-header');
        expect(alarmsGroup0.length).toBe(2);

        const alarmGroup1 = groups[1].querySelectorAll('app-alarm-header');
        expect(alarmGroup1.length).toBe(1);
      });

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
