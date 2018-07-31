import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IasMaterialModule } from '../../ias-material/ias-material.module';
import { SharedModule } from '../../shared/shared.module';
import { ActionsModule } from '../../actions/actions.module';
import { DataModule } from '../../data/data.module';
import { WeatherComponent } from './weather.component';
import { WeatherMapComponent } from '../weather-map/weather-map.component';
import { WeatherTestWSDataComponent } from '../weather-map/weather-map.component';
import { WeatherTestWSMarkerComponent } from '../weather-map/weather-map.component';
import { WeatherSidebarComponent } from '../weather-sidebar/weather-sidebar.component';
import { WeatherStationSidebarComponent } from '../weather-station-sidebar/weather-station-sidebar.component';
import { WeatherService } from '../weather.service';
import { Router } from '@angular/router';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;
  const spyRoutingTable = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WeatherComponent,
        WeatherMapComponent,
        WeatherSidebarComponent,
        WeatherTestWSDataComponent,
        WeatherTestWSMarkerComponent,
        WeatherStationSidebarComponent,
      ],
      providers: [
        WeatherService,
        { provide: Router, useValue: spyRoutingTable },
      ],
      imports: [
        IasMaterialModule,
        SharedModule,
        ActionsModule,
        DataModule,
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