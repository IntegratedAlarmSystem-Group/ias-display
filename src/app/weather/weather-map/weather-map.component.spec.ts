import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { WeatherMapComponent } from './weather-map.component';
import { WeatherMarkerMapComponent } from '../weather-marker-map/weather-marker-map.component';
import { WeatherDataMapComponent } from '../weather-data-map/weather-data-map.component';
import { WeatherService } from '../weather.service';
import { DataModule } from '../../data/data.module';
import { Map } from '../fixtures';


describe('WeatherMapComponent', () => {
  let component: WeatherMapComponent;
  let fixture: ComponentFixture<WeatherMapComponent>;
  let weatherService: WeatherService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WeatherMapComponent,
        WeatherMarkerMapComponent,
        WeatherDataMapComponent,
      ],
      imports: [ DataModule ],
      providers: [ WeatherService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherMapComponent);
    weatherService = fixture.debugElement.injector.get(WeatherService);
    spyOn(weatherService, 'getMapData').and.callFake(function() {
      return of(Map);
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
