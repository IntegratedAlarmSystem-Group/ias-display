import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AlarmComponent, AlarmImageSet } from './alarm.component';
import { Alarm, Value, OperationalMode } from '../alarm';

describe('AlarmComponent', () => {
  let component: AlarmComponent;
  let fixture: ComponentFixture<AlarmComponent>;
  const alarm = Alarm.asAlarm({
    'value': 0,
    'core_id': 'Dummy-cleared-valid',
    'running_id': 'Dummy-cleared-valid',
    'mode': '5',
    'core_timestamp': 1267252440000,
    'validity': '1',
    'ack': false,
    'dependencies': [],
  });
  const location = '/assets/img/';
  const imageSet = new AlarmImageSet({
    clear: this.location + 'temp-1.svg',
    set_low: this.location + 'temp-2.svg',
    set_medium: this.location + 'temp-2.svg',
    set_high: this.location + 'temp-3.svg',
    set_critical: this.location + 'temp-3.svg',
    unknown: this.location + 'temp-0.svg',
    maintenance: this.location + 'temp-0.svg',
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.alarm = alarm;
    component.images = imageSet;
    component.imagesUnreliable = imageSet;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
