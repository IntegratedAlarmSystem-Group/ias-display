import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PropsTableComponent } from './props-table.component';
import { Alarm } from '../../data/alarm';

describe('PropsTableComponent', () => {
  let component: PropsTableComponent;
  let fixture: ComponentFixture<PropsTableComponent>;
  const mockAlarm: Alarm = Alarm.asAlarm({
    'value': 4,
    'core_id': 'alarm_1',
    'running_id': 'alarm_1',
    'mode': 5,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 1,
    'description': 'my description',
    'url': 'https://www.alma.cl',
    'sound': 'TYPE1',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
    'dependencies': [],
    'properties': null,
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropsTableComponent);
    component = fixture.componentInstance;
    component.alarm = mockAlarm;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
