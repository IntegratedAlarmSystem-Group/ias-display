import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { AntennasMapComponent } from './antennas-map.component';
import { MapModule } from '../../map/map.module';
import { DataModule } from '../../data/data.module';
import { AntennasService } from '../antennas.service';
import { MapService } from '../../map/map.service';
import { Map } from '../../map/fixtures';
import { of } from 'rxjs';


describe('AntennasMapComponent', () => {
  let component: AntennasMapComponent;
  let fixture: ComponentFixture<AntennasMapComponent>;
  let antennasService: AntennasService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntennasMapComponent ],
      imports: [ MapModule, DataModule ],
      providers: [ AntennasService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntennasMapComponent);
    antennasService = fixture.debugElement.injector.get(AntennasService);
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
