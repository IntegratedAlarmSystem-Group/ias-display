import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusViewComponent } from './status-view.component';
import { AlarmComponent } from '../alarm/alarm.component';
import { Alarm } from '../../data/alarm';
import { By } from '@angular/platform-browser';

describe('StatusViewComponent', () => {
  let component: StatusViewComponent;
  let fixture: ComponentFixture<StatusViewComponent>;
  const alarm = Alarm.asAlarm({
    'value': 1,
    'core_id': 'Dummy-cleared-valid',
    'running_id': 'Dummy-cleared-valid',
    'mode': '5',
    'core_timestamp': 1267252440000,
    'validity': '1',
    'ack': false,
    'dependencies': [],
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusViewComponent, AlarmComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusViewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.value = 'set-reliable-maintenance';
    component.alarm = alarm;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
