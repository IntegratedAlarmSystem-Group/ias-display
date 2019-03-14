import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { AntennasSidebarComponent } from './antennas-sidebar.component';
import { AntennasService } from '../antennas.service';
import { ActionsModule } from '../../actions/actions.module';
import { DataModule } from '../../data/data.module';
import { IasMaterialModule } from '../../ias-material/ias-material.module';
import { SharedModule } from '../../shared/shared.module';
import { TabularModule } from '../../tabular/tabular.module';
import { TableComponent } from '../../tabular/table/table.component';
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
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                filter: ''
              })
            }
          },
        },
      ],
      imports: [
        ActionsModule,
        DataModule,
        IasMaterialModule,
        SharedModule,
        TabularModule,
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
    spyOn(alarmService, 'getAlarm').and.callFake(function(config: AlarmConfig) {
      return mockAlarms[config.alarm_id];
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
        component.selectedAntenna = mockAntennasConfig[0] as AlarmConfig;
        fixture.detectChanges();
        const link = fixture.nativeElement.querySelector('.return-link');
        expect(link).toBeTruthy();
        link.click();
        expect(component.selectedAntenna).toBeFalsy();
      });
      describe('it should show antenna details component', () => {
        it('with the alarm info', () => {
          component.selectedAntenna = mockAntennasConfig[0] as AlarmConfig;
          fixture.detectChanges();
          const alarmInfo = fixture.nativeElement.querySelector('.alarm-info');
          expect(alarmInfo).toBeTruthy('The alarm-info div does not exist');
          expect(alarmInfo.textContent).toContain(mockAntennasConfig[0].alarm_id, 'The alarmInfo does not contain the alarm id');
          expect(alarmInfo.textContent).toContain(mockAntennasConfig[0].placemark, 'The alarmInfo does not contain the pad');
          expect(alarmInfo.textContent).toContain(mockAntennasConfig[0].custom_name, 'The alarmInfo does not contain the antenna');
        });
        it('and a TableComponent with the alarms of the children of the selectedAntenna plus its dependencies', () => {
          component.selectedAntenna = mockAntennasConfig[0] as AlarmConfig;
          component.ngOnChanges();
          fixture.detectChanges();
          const tableComponent = fixture.debugElement.query(By.directive(TableComponent)).componentInstance;
          expect(tableComponent).toBeTruthy('There is no TableComponent');
          const expectedAlarmsToDisplay = [
            'mockAlarm-0-child-0',
            'mockAlarm-0-child-1',
            'mockAlarm-0-child-2',
          ];
          expect(new Set(tableComponent.alarmsToDisplay)).toEqual(new Set(expectedAlarmsToDisplay),
            'The table did not receive the expected sub alarms'
          );
        });
        it('or a TableComponent with no alarms if the selectedAntenna does not have children', () => {
          component.selectedAntenna = mockAntennasConfig[2] as AlarmConfig;
          fixture.detectChanges();
          const tableComponent = fixture.debugElement.query(By.directive(TableComponent)).componentInstance;
          expect(tableComponent).toBeTruthy('There is no TableComponent');
          const expectedAlarmsToDisplay = [];
          expect(tableComponent.alarmsToDisplay).toEqual(expectedAlarmsToDisplay, 'The table did not receive an empty list of sub alarms');
        });
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
