import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IasMaterialModule } from '../../ias-material/ias-material.module';

import { InfomapOneComponent } from './infomap-one.component';
import { InfomapOneMapComponent } from '../infomap-one-map/infomap-one-map.component';
import { InfomapOneSidebarComponent } from '../infomap-one-sidebar/infomap-one-sidebar.component';
import { DataModule } from '../../data/data.module';

import { MapModule } from '../../map/map.module';
import { MapService } from '../../map/map.service';

import { AntennaMarkerComponent } from '../infomap-one-map-markers/antenna-marker/antenna-marker.component';


describe('InfomapOneComponent', () => {
  let component: InfomapOneComponent;
  let fixture: ComponentFixture<InfomapOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InfomapOneComponent,
        InfomapOneMapComponent,
        InfomapOneSidebarComponent,
        AntennaMarkerComponent
      ],
      providers: [
        MapService
      ],
      imports: [
        DataModule,
        IasMaterialModule,
        MapModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfomapOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
