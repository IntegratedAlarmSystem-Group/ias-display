import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AntennasSidebarComponent } from './antennas-sidebar.component';
import { AntennasService } from '../antennas.service';
import { ActionsModule } from '../../actions/actions.module';
import { DataModule } from '../../data/data.module';
import { IasMaterialModule } from '../../ias-material/ias-material.module';
import { SharedModule } from '../../shared/shared.module';
import { AlarmService } from '../../data/alarm.service';
import { RoutingService } from '../../app-routing/routing.service';
import { AlarmConfig } from '../../data/alarm-config';
import { mockAntennasConfig, mockDevicesConfig, mockAlarms } from '../tests_fixtures';


describe('AntennasSidebarComponent', () => {
  let component: AntennasSidebarComponent;
  let fixture: ComponentFixture<AntennasSidebarComponent>;
  let antennasService: AntennasService;
  let alarmService: AlarmService;
  const spyRoutingTable = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AntennasSidebarComponent
      ],
      providers: [
        AntennasService,
        RoutingService,
        { provide: Router, useValue: spyRoutingTable },
      ],
      imports: [
        ActionsModule,
        DataModule,
        IasMaterialModule,
        SharedModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntennasSidebarComponent);
    antennasService = fixture.debugElement.injector.get(AntennasService);
    spyOn(antennasService, 'initialize').and.callFake(function() {});
    antennasService.antennasConfig = mockAntennasConfig as AlarmConfig[];
    antennasService.devicesConfig = mockDevicesConfig as AlarmConfig[];
    component = fixture.componentInstance;
    alarmService = fixture.debugElement.injector.get(AlarmService);
    spyOn(alarmService, 'get').and.callFake(function(alarm_id: string) {
      return mockAlarms[alarm_id];
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a getAlarm method', () => {
    expect(component.getAlarm('mockAlarm-0')).toEqual(mockAlarms['mockAlarm-0']);
  });

  describe('', () => {
    it('should have a container for the title', () => {
      const title = fixture.nativeElement.querySelector('.antennas-sidebar-title');
      expect(title).toBeTruthy();
    });

    it('should have a container for the content', () => {
      const title = fixture.nativeElement.querySelector('.antennas-sidebar-content');
      expect(title).toBeTruthy();
    });

    describe('and if there is a selected antenna', () => {
      it('should have a link to return back', () => {
        component.selectedAntenna = mockAntennasConfig[0];
        fixture.detectChanges();
        const link = fixture.nativeElement.querySelector('.return-link');
        expect(link).toBeTruthy();
        link.click();
        expect(component.selectedAntenna).toBeFalsy();
      });
      it('should show antenna details component', () => {
        component.selectedAntenna = mockAntennasConfig[0];
        fixture.detectChanges();
        const alarmInfo = fixture.nativeElement.querySelector('.alarm-info');
        const devicesAlarms = fixture.nativeElement.querySelector('.devices-alarms');
        expect(alarmInfo).toBeTruthy('The alarm-info div does not exist');
        expect(alarmInfo.textContent).toContain(mockAntennasConfig[0].alarm_id, 'The alarmInfo does not contain the alarm id');
        expect(alarmInfo.textContent).toContain(mockAntennasConfig[0].placemark, 'The alarmInfo does not contain the pad');
        expect(alarmInfo.textContent).toContain(mockAntennasConfig[0].custom_name, 'The alarmInfo does not contain the antenna');
        expect(devicesAlarms).toBeTruthy('The devices-alarms div does not contain the alarm');
      });
    });

    describe('and if there is not a selected antenna', () => {
      describe('and an antenna (grid-item with an alarm-header inside) is clicked', () => {
        it('then the corresponding antenna is selected', () => {
          component.selectedAntenna = null;
          const antennas = fixture.nativeElement.querySelectorAll('.grid-item');
          antennas[0].click();
          expect(component.selectedAntenna).toBeTruthy();
          expect(component.selectedAntenna.placemark).toEqual('mockAlarm-0');
          expect(component.selectedAntenna.alarm_id).toEqual('mockAlarm-0');
          expect(component.selectedAntenna.custom_name).toEqual('antenna-0');
        });
      });
    });

  });
});
