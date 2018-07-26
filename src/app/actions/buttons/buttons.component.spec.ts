import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonsComponent } from './buttons.component';
import { AckButtonComponent } from '../ack-button/ack-button.component';
import { ShelveButtonComponent } from '../shelve-button/shelve-button.component';
import { WikiButtonComponent } from '../wiki-button/wiki-button.component';
import { SidenavService } from '../sidenav.service';
import { Router } from '@angular/router';
import { Alarm } from '../../data/alarm';

describe('ButtonsComponent', () => {
  let component: ButtonsComponent;
  let fixture: ComponentFixture<ButtonsComponent>;
  const spyRoutingTable = jasmine.createSpyObj('Router', ['navigate']);
  const mockAlarm = Alarm.asAlarm({
    'value': 4,
    'core_id': 'coreid$1',
    'running_id': 'coreid$1',
    'mode': 5,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 1,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ButtonsComponent,
        AckButtonComponent,
        ShelveButtonComponent,
        WikiButtonComponent,
      ],
      providers: [
        SidenavService,
        { provide: Router, useValue: spyRoutingTable },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonsComponent);
    component = fixture.componentInstance;
    component.alarm = mockAlarm;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
