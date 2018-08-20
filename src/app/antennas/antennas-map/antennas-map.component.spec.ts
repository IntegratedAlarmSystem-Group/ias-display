import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AntennasMapComponent } from './antennas-map.component';
import { MapModule } from '../../map/map.module';

describe('AntennasMapComponent', () => {
  let component: AntennasMapComponent;
  let fixture: ComponentFixture<AntennasMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntennasMapComponent ],
      imports: [ MapModule ]
    })
    .compileComponents();
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
