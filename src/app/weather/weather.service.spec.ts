import { TestBed, inject } from '@angular/core/testing';
import { DataModule } from '../data/data.module';
import { WeatherService } from './weather.service';
import { HttpClientService } from '../data/http-client.service';
import { Map } from './fixtures';
import { of } from 'rxjs';

let subject: WeatherService;

describe('WeatherService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeatherService],
      imports: [DataModule],
    });
  });

  beforeEach(inject([WeatherService, HttpClientService], (weatherService, httpClientService) => {
    subject = weatherService;
    spyOn(httpClientService, 'get').and.callFake(function() {
      return of(Map);
    });
  }));

  it('should be created', () => {
    expect(subject).toBeTruthy();
  });

  it('should have a method to get the Map', () => {
    subject.getMapData().subscribe((mapdata) => {
      expect(mapdata).toEqual(Map);
    });
  });

});
