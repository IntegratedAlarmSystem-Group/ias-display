import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ButtonsComponent } from './buttons.component';
import { AckButtonComponent } from '../ack-button/ack-button.component';
import { ShelveButtonComponent } from '../shelve-button/shelve-button.component';
import { WikiButtonComponent } from '../wiki-button/wiki-button.component';
import { RoutingService } from '../../data/routing.service';
import { SidenavService } from '../sidenav.service';
import { Router } from '@angular/router';
import { Alarm } from '../../data/alarm';

describe('ButtonsComponent', () => {
  let component: ButtonsComponent;
  let fixture: ComponentFixture<ButtonsComponent>;
  const spyRoutingService = jasmine.createSpyObj('RoutingService', ['goToAcknowledge', 'goToShelve']);
  const mockAlarm = Alarm.asAlarm({
    'value': 4,
    'core_id': 'coreid$1',
    'running_id': 'coreid$1',
    'mode': 5,
    'core_timestamp': 1267252440000,
    'state_change_timestamp': 1267252440000,
    'validity': 1,
    'description': 'my description',
    'url': 'https://www.alma.cl',
    'sound': 'NONE',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  });
  const mockAlarmUrl = 'https://www.alma.cl';

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
        { provide: RoutingService, useValue: spyRoutingService },
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

  it('should have an AckButtonComponent associated to the alarm', () => {
    const ackButtonComponentDebugElement = fixture.debugElement.query(By.directive(AckButtonComponent));
    const ackButton = ackButtonComponentDebugElement.componentInstance;
    expect(ackButton).toBeTruthy();
    expect(ackButton.alarm).toEqual(mockAlarm);
  });

  it('should have an ShelveButtonComponent associated to the alarm', () => {
    const shelveButtonComponentDebugElement = fixture.debugElement.query(By.directive(ShelveButtonComponent));
    const shelveButton = shelveButtonComponentDebugElement.componentInstance;
    expect(shelveButton).toBeTruthy();
    expect(shelveButton.alarm).toEqual(mockAlarm);
  });

  it('should have an ShelveButtonComponent associated to the alarm', () => {
    const wikiButtonComponentDebugElement = fixture.debugElement.query(By.directive(WikiButtonComponent));
    const wikiButton = wikiButtonComponentDebugElement.componentInstance;
    expect(wikiButton).toBeTruthy();
    expect(wikiButton.url).toEqual(mockAlarmUrl);
  });
});
