import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PropsTableComponent } from './props-table.component';
import { Alarm } from '../../data/alarm';

describe('PropsTableComponent', () => {
  let component: PropsTableComponent;
  let fixture: ComponentFixture<PropsTableComponent>;
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
    'properties': {
      'key1': 'value1',
      'key2': ['value21', 'value22', 'value23'],
      'key3': 'value3',
    }
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
    tableBody = fixture.nativeElement.querySelector('table');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Information
  describe('GIVEN the component has an alarm', () => {
    beforeEach(() => {
      component.alarm = mockAlarm;
      component.ngOnInit();
      tableBody = fixture.nativeElement.querySelector('table');
      fixture.detectChanges();
    });

    it('IT SHOULD display Alarm properties in a Table', () => {
      expect(tableBody).toBeTruthy();
      expect(tableBody.textContent.replace(/\s/g, '')).toContain('key1:value1');
      expect(tableBody.textContent.replace(/\s/g, '')).toContain('key2:value21,value22,value23');
      expect(tableBody.textContent.replace(/\s/g, '')).toContain('key2:value21,value22,value23');
      expect(tableBody.textContent.replace(/\s/g, '')).toContain('key3:value3');
    });
  });
});
