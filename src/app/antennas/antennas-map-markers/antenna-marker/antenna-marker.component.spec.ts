import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AntennaMarkerComponent } from './antenna-marker.component';
import { DataModule } from '../../../data/data.module';
import { AntennasService } from '../../../antennas/antennas.service';
import { Alarm } from '../../../data/alarm';

describe('AntennaMarkerComponent', () => {
  let component: AntennaMarkerComponent;
  let fixture: ComponentFixture<AntennaMarkerComponent>;
  const mockAlarm = {
    'value': 4,
    'core_id': 'critical',
    'running_id': 'critical',
    'mode': 5,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 1,
    'description': 'my description',
    'url': 'https://www.alma.cl',
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
});
