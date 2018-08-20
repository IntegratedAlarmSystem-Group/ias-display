import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AntennaMarkerComponent } from './antenna-marker.component';

import { DataModule } from '../../../data/data.module';
import { AntennasService } from '../../../antennas/antennas.service';

describe('AntennaMarkerComponent', () => {
  let component: AntennaMarkerComponent;
  let fixture: ComponentFixture<AntennaMarkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntennaMarkerComponent ],
      providers: [ AntennasService ],
      imports: [ DataModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntennaMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
