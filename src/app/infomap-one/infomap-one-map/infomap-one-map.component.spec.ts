import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfomapOneMapComponent } from './infomap-one-map.component';
import { DataModule } from '../../data/data.module';

import { MapModule } from '../../map/map.module';
import { MapService } from '../../map/map.service';

import { AntennaMarkerComponent } from '../infomap-one-map-markers/antenna-marker/antenna-marker.component';


describe('InfomapOneMapComponent', () => {
  let component: InfomapOneMapComponent;
  let fixture: ComponentFixture<InfomapOneMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DataModule,
        MapModule
      ],
      providers: [
        MapService
      ],
      declarations: [
        InfomapOneMapComponent,
        AntennaMarkerComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfomapOneMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
