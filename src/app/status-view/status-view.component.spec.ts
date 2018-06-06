import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusViewComponent } from './status-view.component';
import { By } from '@angular/platform-browser';

describe('StatusViewComponent', () => {
  let component: StatusViewComponent;
  let fixture: ComponentFixture<StatusViewComponent>;
  const alarms = [
    {
      'value': 0,
      'core_id': 'Dummy-cleared-valid',
      'running_id': 'Dummy-cleared-valid',
      'mode': '5',
      'core_timestamp': 1267252440000,
      'validity': '1',
      'ack': false,
      'dependencies': [],
    },
    {
      'value': 1,
      'core_id': 'Dummy-set-valid',
      'running_id': 'Dummy-set-valid',
      'mode': '5',
      'core_timestamp': 1267252440000,
      'validity': '1',
      'ack': false,
      'dependencies': [],
    },
    {
      'value': 0,
      'core_id': 'Dummy-cleared-unreliable',
      'running_id': 'Dummy-cleared-unreliable',
      'mode': '5',
      'core_timestamp': 1267252440000,
      'validity': '0',
      'ack': false,
      'dependencies': [],
    },
    {
      'value': 1,
      'core_id': 'Dummy-set-unreliable',
      'running_id': 'Dummy-set-unreliable',
      'mode': '5',
      'core_timestamp': 1267252440000,
      'validity': '0',
      'ack': false,
      'dependencies': [],
    }
  ];

  const validities = ['', 'unreliable'];
  const acks = ['', 'ack'];
  const values = ['cleared', 'set_low', 'set_medium', 'set_high', 'set_critical'];
  const modes = ['operational', 'maintenance', 'unknown'];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusViewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.value = 'set-reliable-maintenance';
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  for (const mode of modes) {
    for (const validity of validities) {
      for (const value of values) {
        for (const ack of acks) {
          it('should display the component according to its tags ', () => {
            const processed_value = value.split('_')[0];
            component.value = processed_value + '-' + validity + '-' + mode + '-' + ack;
            fixture.detectChanges();
            expect(component).toBeTruthy();
            const classes = fixture.debugElement.query(By.css('.alarm-status')).classes;
            const expected_classes = {'alarm-status': true};

            if (mode === 'operational') {
              expected_classes['status-' + processed_value] = true;
            } else {
              expected_classes['status-' + mode] = true;
            }

            if (validity === 'unreliable') {
              expected_classes['status-unreliable'] = true;
            }

            if (ack !== 'ack') {
              expected_classes['blink'] = true;
            }

            expect(classes).toBeTruthy();
            expect(classes).toEqual(expected_classes);
          });
        }
      }
    }
  }
});
