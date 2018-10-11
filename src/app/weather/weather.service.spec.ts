import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { DataModule } from '../data/data.module';
import { WeatherService } from './weather.service';
import { TestRequest } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientService } from '../data/http-client.service';
import { Map } from '../map/fixtures';
import { of } from 'rxjs';
import { mockWeatherStationsConfig, mockWeatherSummaryConfig, mockImagesSets} from './test_fixtures';
import { environment } from '../../environments/environment';
import { BackendUrls } from '../settings';


describe('WeatherService', () => {
  let subject: WeatherService;
  let httpClient: HttpClientService;
  let testController: HttpTestingController;

  const padsStatusUrl = environment.httpUrl + BackendUrls.PADS_STATUS;

  const mockPadsStatusResponse = {
      'group': 'S',
      'members': {
        'PAD1': 'A1',
        'PAD2': null,
      },
      'not_members': {
        'PAD3': null,
        'PAD4': 'A2',
      }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeatherService],
      imports: [DataModule, HttpClientTestingModule],
    });
  });

  beforeEach(
    inject(
      [HttpTestingController, WeatherService, HttpClientService],
      (httpTestingController, weatherService, httpClientService) => {
    subject = weatherService;
    httpClient = httpClientService;
    testController = httpTestingController;
  }));

  it('should be created', () => {
    expect(subject).toBeTruthy();
  });

  it('should retrieve the weather stations config on intialization', () => {
    spyOn(httpClient, 'get').and.callFake(function() {
      return of(mockWeatherStationsConfig);
    });
    expect(subject.weatherStationsConfig).toBeUndefined();
    subject.initialize();
    expect(subject).toBeTruthy();
    expect(subject.weatherStationsConfig).toEqual(mockWeatherStationsConfig);
  });

  it('should retrieve the weather summary config on intialization', () => {
    spyOn(httpClient, 'get').and.callFake(function() {
      return of(mockWeatherSummaryConfig);
    });
    expect(subject.weatherSummaryConfig).toBeUndefined();
    subject.initialize();
    expect(subject).toBeTruthy();
    expect(subject.weatherSummaryConfig).toEqual(mockWeatherSummaryConfig);
  });

  it('should define the icons set on intialization', () => {
    expect(subject.humidityImageSet).toBeUndefined();
    expect(subject.tempImageSet).toBeUndefined();
    expect(subject.windsImageSet).toBeUndefined();
    expect(subject.markerImageSet).toBeUndefined();
    expect(subject.humidityImageUnreliableSet).toBeUndefined();
    expect(subject.tempImageUnreliableSet).toBeUndefined();
    expect(subject.windsImageUnreliableSet).toBeUndefined();
    expect(subject.markerImageUnreliableSet).toBeUndefined();
    spyOn(httpClient, 'get').and.callFake(function() {
      return of(null);
    });
    subject.initialize();
    expect(subject).toBeTruthy();
    expect(subject.humidityImageSet).not.toBeUndefined();
    expect(subject.tempImageSet).not.toBeUndefined();
    expect(subject.windsImageSet).not.toBeUndefined();
    expect(subject.markerImageSet).not.toBeUndefined();
    expect(subject.humidityImageUnreliableSet).not.toBeUndefined();
    expect(subject.tempImageUnreliableSet).not.toBeUndefined();
    expect(subject.windsImageUnreliableSet).not.toBeUndefined();
    expect(subject.markerImageUnreliableSet).not.toBeUndefined();
  });

  it('should have a method to get the Map', () => {
    spyOn(httpClient, 'get').and.callFake(function() {
      return of(Map);
    });
    subject.getMapData().subscribe((mapdata) => {
      expect(mapdata).toEqual(Map);
    });
  });

  it('should have a method to load the pad status in the service', () => {
    const group = 'S';
    subject.loadPadsStatus(group);
    const calls = testController.match(
      (request) => request.method === 'GET'
    );
    expect(calls.length).toEqual(1);
    const padsStatusCall = calls[0];
    expect(padsStatusCall.request.url).toEqual(
      padsStatusUrl + group);
    padsStatusCall.flush(mockPadsStatusResponse);
    testController.verify();
    expect(subject.padsStatus).toEqual(mockPadsStatusResponse);
  });

  it('should have a method to get the antennas associated to a weather station', () => {
    const antennas = subject.getAntennas('station');
    expect(antennas).toEqual(['A001', 'A002', 'A003']);
  });

});
