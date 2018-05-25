import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusViewComponent } from './status-view.component';
import { By } from '@angular/platform-browser';

describe('StatusViewComponent', () => {
  let component: StatusViewComponent;
  let fixture: ComponentFixture<StatusViewComponent>;
  let alarms = [
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

  let validities = ['', 'unreliable'];
  let acks = ['', 'ack'];
  let values = ['cleared', 'set-low'];
  let modes = ['operational', 'maintenance', 'unknown'];

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

  for (let mode in modes) {
    for (let val in validities) {
      for (let v in values) {
        for (let a in acks) {
          it('should display the component according to its tags ', () => {
            component.value = values[v] + '-' + validities[val] + '-' + mode + '-' + acks[a];
            fixture.detectChanges();
            expect(component).toBeTruthy();
            const classes = fixture.debugElement.query(By.css('.alarm-status')).classes;
            let expected_classes = {'alarm-status': true};

            if (mode = 'operational'){
              expected_classes['status-' + values[v]] = true;
            } else {
              expected_classes['status-' + mode] = true;
            }

            if (validities[val] == 'unreliable'){
              expected_classes['status-unreliable'] = true;
            }

            if (acks[a] != 'ack'){
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
