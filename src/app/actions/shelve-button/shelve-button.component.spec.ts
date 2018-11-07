import { DebugElement } from '@angular/core';
import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { IasMaterialModule } from '../../ias-material/ias-material.module';
import { DataModule } from '../../data/data.module';
import { AppModule } from '../../app.module';
import { appRoutes } from '../../app-routing/app-routing.module';
import { RoutingService } from '../../app-routing/routing.service';
import { SidenavService } from '../sidenav.service';
import { ShelveButtonComponent } from './shelve-button.component';
import { Alarm } from '../../data/alarm';
import { Iasio } from '../../data/iasio';

describe('GIVEN a ShelveButtonComponent', () => {
  let component: ShelveButtonComponent;
  let fixture: ComponentFixture<ShelveButtonComponent>;
  let debug: DebugElement;
  let html: HTMLElement;
  const spyRoutingTable = jasmine.createSpyObj('RoutingService', ['goToShelve']);
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ShelveButtonComponent,
      ],
      imports: [
        IasMaterialModule,
        DataModule,
      ],
      providers: [
        SidenavService,
        { provide: RoutingService, useValue: spyRoutingTable },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelveButtonComponent);
    component = fixture.componentInstance;
    component.alarm = mockAlarm;
    debug = fixture.debugElement;
    html = debug.nativeElement;
    fixture.detectChanges();
  });

  it('THEN it should be created with the given Alarm', () => {
    const shelveButton = debug.query(By.css('.shelve-button')).nativeElement;
    expect(component).toBeTruthy();
    expect(component.alarm.core_id).toBe('coreid$1');
  });

  describe('AND WHEN the Alarm is unshelved', () => {
    it('THEN its tooltip should be "Shelve"', () => {
      component.alarm.shelved = false;
      const shelveButton = debug.query(By.css('.shelve-button')).nativeElement;
      fixture.detectChanges();
      expect(component).toBeTruthy();
      expect(component.alarm.core_id).toBe('coreid$1');
      expect(shelveButton.title).toEqual('Shelve');
    });
  });

  describe('AND WHEN the Alarm is shelved', () => {
    it('THEN its tooltip should be "Unshelve"', () => {
      component.alarm.shelve();
      const shelveButton = debug.query(By.css('.shelve-button')).nativeElement;
      fixture.detectChanges();
      expect(component).toBeTruthy();
      expect(component.alarm.core_id).toBe('coreid$1');
      expect(shelveButton.title).toEqual('Unshelve');
    });
  });

  describe('AND WHEN the user clicks on it', () => {
    it('THEN the sidenav is opened with ShelveComponent as content', () => {
      const mockEvent = {
        data: {
          alarm: Alarm.asAlarm(mockAlarm)
        }
      };
      component.onClick(null);
      const expectedargs = component.alarm.core_id;
      expect(spyRoutingTable.goToShelve.calls.count()).toBe(1, 'spy method was called once');
      expect(spyRoutingTable.goToShelve.calls.mostRecent().args[0]).
        toEqual(expectedargs, 'spy method was called with the right parameters');
    });
  });
});
