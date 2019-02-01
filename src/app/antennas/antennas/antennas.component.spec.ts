import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AntennasComponent } from './antennas.component';
import { AntennasMapComponent } from '../antennas-map/antennas-map.component';
import { AntennasSidebarComponent } from '../antennas-sidebar/antennas-sidebar.component';
import { ActionsModule } from '../../actions/actions.module';
import { DataModule } from '../../data/data.module';
import { IasMaterialModule } from '../../ias-material/ias-material.module';
import { MapModule } from '../../map/map.module';
import { SharedModule } from '../../shared/shared.module';
import { AntennasService } from '../antennas.service';
import { RoutingService } from '../../app-routing/routing.service';
import { MapService } from '../../map/map.service';
import { Map } from '../../map/fixtures';
import { of } from 'rxjs';
import { AntennaMarkerComponent } from '../antennas-map-markers/antenna-marker/antenna-marker.component';
import { AlarmConfig } from '../../data/alarm-config';


const mockAntennasConfig =  [ new AlarmConfig({
  alarm_id: 'alarmId',
  custom_name: 'DV00',
  placemark: 'P000',
  type: 'device',
  view: 'antennas',
  group: 'antennas',
  children: []
})];

const mockDevicesConfig = [ new AlarmConfig({
  alarm_id: 'alarm-Correlator',
  custom_name: 'Correlator',
  placemark: 'Correlator',
  type: 'device',
  view: 'antennas',
  group: 'global_devices',
  children: []
})];

describe('AntennasComponent', () => {
  let component: AntennasComponent;
  let fixture: ComponentFixture<AntennasComponent>;
  let antennasService: AntennasService;
  const spyRoutingTable = jasmine.createSpyObj('RoutingService', ['tableWithFilter']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AntennasComponent,
        AntennasMapComponent,
        AntennasSidebarComponent,
        AntennaMarkerComponent
      ],
      imports: [
        ActionsModule,
        DataModule,
        IasMaterialModule,
        MapModule,
        SharedModule,
      ],
      providers: [
        AntennasService,
        MapService,
        { provide: RoutingService, useValue: spyRoutingTable },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntennasComponent);
    antennasService = fixture.debugElement.injector.get(AntennasService);
    spyOn(antennasService, 'initialize').and.callFake(function() {});
    antennasService.antennasConfig = mockAntennasConfig;
    antennasService.devicesConfig = mockDevicesConfig;
    spyOn(antennasService, 'getMapData').and.callFake(function() {
      return of(Map);
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
