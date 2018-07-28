import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherMapComponent } from './weather-map.component';
import { WeatherTestWSDataComponent } from './weather-map.component';
import { WeatherTestWSMarkerComponent } from './weather-map.component';
import { WeatherService } from '../weather.service';
import { DataModule } from '../../data/data.module';
import { of } from 'rxjs';


describe('WeatherMapComponent', () => {
  let component: WeatherMapComponent;
  let fixture: ComponentFixture<WeatherMapComponent>;
  // let weatherService: WeatherService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WeatherMapComponent,
        WeatherTestWSDataComponent,
        WeatherTestWSMarkerComponent
      ],
      imports: [ DataModule ],
      providers: [ WeatherService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherMapComponent);
    // weatherService = fixture.debugElement.injector.get(WeatherService);
    // spyOn(weatherService, 'getMapData').and.returnValue( of(MockMap) );
    // spyOn(weatherService, 'getMapData');//.and.callFake(function() { return of(MockMap); });

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // console.log('MAPDATA: ', component.weatherService.getMapData());
    expect(component).toBeTruthy();
  });
});
