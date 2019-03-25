import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AntennaMarkerComponent } from './antenna-marker.component';
import { DataModule } from '../../../data/data.module';
import { AntennasService } from '../../../antennas/antennas.service';
import { Alarm, OperationalMode } from '../../../data/alarm';

describe('AntennaMarkerComponent', () => {
  let component: AntennaMarkerComponent;
  let fixture: ComponentFixture<AntennaMarkerComponent>;
  const mockAlarm = {
    'value': 0,
    'core_id': 'alarmID',
    'running_id': 'alarmID',
    'mode': 5,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'value_change_timestamp': 0,
    'value_change_transition': [0, 0],
    'validity': 1,
    'description': 'my description',
    'url': 'https://www.alma.cl',
    'sound': 'NONE',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntennaMarkerComponent ],
      providers: [ AntennasService ],
      imports: [ DataModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntennaMarkerComponent);
    component = fixture.componentInstance;
    component.alarm = Alarm.asAlarm(mockAlarm);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getNgClass should return appropriate values according to Alarm states', () => {
    expect(component.getNgClass()).toEqual(['green']);
    component.alarm.value = 1;
    expect(component.getNgClass()).toEqual(['yellow']);
    component.alarm.shelve();
    expect(component.getNgClass()).toEqual(['green']);
    component.alarm.unshelve();
    expect(component.getNgClass()).toEqual(['yellow']);
    component.alarm.value = 2;
    expect(component.getNgClass()).toEqual(['yellow']);
    component.alarm.value = 3;
    expect(component.getNgClass()).toEqual(['red']);
    component.alarm.value = 4;
    expect(component.getNgClass()).toEqual(['red']);
    component.alarm.mode = OperationalMode.maintenance;
    expect(component.getNgClass()).toEqual(['grey']);
    component.alarm.mode = OperationalMode.shuttedown;
    expect(component.getNgClass()).toEqual(['grey']);
    component.alarm.mode = OperationalMode.degraded;
    expect(component.getNgClass()).toEqual(['red']);
  });

  it('getNgClass should return appropriate values according to Alarm states for invalid alarms', () => {
    component.alarm.validity = 0;
    expect(component.getNgClass()).toEqual(['green', 'unreliable']);
    component.alarm.value = 1;
    expect(component.getNgClass()).toEqual(['yellow', 'unreliable']);
    component.alarm.shelve();
    expect(component.getNgClass()).toEqual(['green', 'unreliable']);
    component.alarm.unshelve();
    expect(component.getNgClass()).toEqual(['yellow', 'unreliable']);
    component.alarm.value = 2;
    expect(component.getNgClass()).toEqual(['yellow', 'unreliable']);
    component.alarm.value = 3;
    expect(component.getNgClass()).toEqual(['red', 'unreliable']);
    component.alarm.value = 4;
    expect(component.getNgClass()).toEqual(['red', 'unreliable']);
    component.alarm.mode = OperationalMode.maintenance;
    expect(component.getNgClass()).toEqual(['grey', 'unreliable']);
    component.alarm.mode = OperationalMode.shuttedown;
    expect(component.getNgClass()).toEqual(['grey', 'unreliable']);
    component.alarm.mode = OperationalMode.degraded;
    expect(component.getNgClass()).toEqual(['red', 'unreliable']);
  });
});
