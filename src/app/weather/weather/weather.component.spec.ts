import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IasMaterialModule } from '../../ias-material/ias-material.module';
import { SharedModule } from '../../shared/shared.module';
import { WeatherComponent } from './weather.component';
import { WeatherMapComponent } from '../weather-map/weather-map.component';
import { WeatherSidebarComponent } from '../weather-sidebar/weather-sidebar.component';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WeatherComponent,
        WeatherMapComponent,
        WeatherSidebarComponent,
      ],
      imports: [
        IasMaterialModule,
        SharedModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
