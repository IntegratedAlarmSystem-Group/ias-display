import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AlarmTooltipComponent } from './alarm-tooltip.component';
import { Alarm } from '../../data/alarm';

describe('AlarmTooltipComponent', () => {
  let component: AlarmTooltipComponent;
  let fixture: ComponentFixture<AlarmTooltipComponent>;
  let tableBody: any;
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
      declarations: [ AlarmTooltipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmTooltipComponent);
    component = fixture.componentInstance;
    tableBody = fixture.nativeElement.querySelector('table');
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Information
  describe('GIVEN the component has an alarm', () => {
    beforeEach(() => {
      component.alarm = mockAlarm;
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('IT SHOULD display the Alarm ID', () => {
      expect(tableBody).toBeTruthy();
      expect(tableBody.textContent).toContain(mockAlarm.core_id);
    });

    it('IT SHOULD display the Alarm short description', () => {
      expect(tableBody).toBeTruthy();
      expect(tableBody.textContent).toContain(mockAlarm.description);
    });

    it('should display the Alarm last state change timestamp', () => {
      expect(tableBody).toBeTruthy();
      expect(tableBody.textContent).toContain(mockAlarm.formattedTimestamp);
    });

    it('should display the Alarm last state change properties', () => {
      expect(tableBody).toBeTruthy();
      expect(tableBody.textContent).toContain(mockAlarm.formattedProperties);
    });
  });
});
