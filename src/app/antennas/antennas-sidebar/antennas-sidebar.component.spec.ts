import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { AntennasSidebarComponent } from './antennas-sidebar.component';
import { AlarmService } from '../../data/alarm.service';
import { AntennasService, MapAlarmConfig } from '../antennas.service';
import { SharedModule } from '../../shared/shared.module';
import { Alarm } from '../../data/alarm';

const mockMapAlarmsConfig = {
  'mockAlarm-0': {
    placemark: 'mockAlarm-0',
    alarm: 'mockAlarm-0'
  },
  'mockAlarm-1': {
    placemark: 'mockAlarm-1',
    alarm: 'mockAlarm-1'
  },
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
    'dependencies': [],
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
  })
};

describe('AntennasSidebarComponent', () => {
  let component: AntennasSidebarComponent;
  let fixture: ComponentFixture<AntennasSidebarComponent>;
  let antennasService: AntennasService;
  let alarmService: AlarmService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AntennasSidebarComponent
      ],
      providers: [
        AntennasService
      ],
      imports: [
        SharedModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(
    inject([AntennasService], (service) => {
      antennasService = service;
      spyOn(antennasService, 'initialize').and.callFake(function() {});
      antennasService.mapAlarmsConfig = mockMapAlarmsConfig;
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
});
