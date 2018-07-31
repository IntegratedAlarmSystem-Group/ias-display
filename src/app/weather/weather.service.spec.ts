import { TestBed, inject } from '@angular/core/testing';
import { DataModule } from '../data/data.module';
import { WeatherService } from './weather.service';
import { Map } from './fixtures';

describe('WeatherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeatherService],
      imports: [DataModule],
    });
  });

  beforeEach(inject([WeatherService], (weatherService) => {
      spyOn(weatherService, 'getMapData')
        .and.callFake(function() {
          return Map;
        });
  }));

  it('should be created', inject([WeatherService], (service: WeatherService) => {
    expect(service).toBeTruthy();
  }));
});