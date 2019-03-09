import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StatusViewComponent } from './status-view.component';
import { AlarmComponent } from '../alarm/alarm.component';
import { AlarmLabelComponent } from '../alarm-label/alarm-label.component';
import { AlarmTooltipComponent } from '../alarm-tooltip/alarm-tooltip.component';
import { Alarm } from '../../data/alarm';

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
    'description': 'bla bla',
    'url': 'http://alma.cl',
    'sound': 'NONE',
    'can_shelve': true,
    'ack': false,
    'dependencies': [],
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StatusViewComponent,
        AlarmComponent,
        AlarmLabelComponent,
        AlarmTooltipComponent
      ],
      imports: [ NgbModule ]
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
