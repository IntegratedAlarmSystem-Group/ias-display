import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
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


const mockAntennasConfig =  {
  'DV': [{
    antenna: 'DV00',
    placemark: 'P000',
    alarm: 'alarmId',
  }]
};

describe('AntennasComponent', () => {
  let component: AntennasComponent;
  let fixture: ComponentFixture<AntennasComponent>;
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
        DataModule,
        IasMaterialModule,
        MapModule,
        SharedModule,
        ActionsModule
      ],
      providers: [
        { provide: RoutingService, useValue: spyRoutingTable },
        AntennasService,
        MapService
      ]
    })
    .compileComponents();
  }));

  beforeEach(inject([AntennasService], (service) => {
    spyOn(service, 'initialize').and.callFake(function() {});
    service.antennasConfig = mockAntennasConfig;
    spyOn(service, 'getMapData').and.callFake(function() {
      return of(Map);
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntennasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
