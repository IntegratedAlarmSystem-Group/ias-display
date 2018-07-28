import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../../shared/shared.module';
import { WeatherService } from '../weather.service';
import { WeatherStationSidebarComponent } from './weather-station-sidebar.component';

describe('WeatherStationSidebarComponent', () => {
  let component: WeatherStationSidebarComponent;
  let fixture: ComponentFixture<WeatherStationSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WeatherStationSidebarComponent,
      ],
      providers: [
        WeatherService,
      ],
      imports: [
        SharedModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherStationSidebarComponent);
    component = fixture.componentInstance;
    component.stationConfig = {
      station: 'Alarmdummy',
      temperature: 'Alarmdummy',
      windspeed: 'Alarmdummy',
      humidity: 'Alarmdummy',
    };
    component.selectedAlarm = 'Alarmdummy';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
