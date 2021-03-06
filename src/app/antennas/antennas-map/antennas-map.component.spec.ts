import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { AntennasMapComponent } from './antennas-map.component';
import { MapModule } from '../../map/map.module';
import { DataModule } from '../../data/data.module';
import { AntennasService } from '../antennas.service';
import { MapService } from '../../map/map.service';
import { Map } from '../../map/fixtures';
import { of } from 'rxjs';
import { AntennaMarkerComponent } from '../antennas-map-markers/antenna-marker/antenna-marker.component';
import { AlarmConfig } from '../../data/alarm-config';


const mockAntennasConfig =  [{
    alarm_id: 'alarmId',
    custom_name: 'DV00',
    type: 'antenna',
    view: 'antennas',
    children: [],
    placemark: 'P000',
    group: 'antennas'
  }
] as AlarmConfig[];

describe('AntennasMapComponent', () => {
  let component: AntennasMapComponent;
  let fixture: ComponentFixture<AntennasMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AntennasMapComponent,
        AntennaMarkerComponent
      ],
      imports: [ MapModule, DataModule ],
      providers: [ AntennasService, MapService ]
    })
    .compileComponents();
  }));

  beforeEach(inject([AntennasService], (service: AntennasService) => {
    spyOn(service, 'initialize').and.callFake(function() {});
    service.antennasConfig = mockAntennasConfig;
    spyOn(service, 'getMapData').and.callFake(function() {
      return of(Map);
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntennasMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
