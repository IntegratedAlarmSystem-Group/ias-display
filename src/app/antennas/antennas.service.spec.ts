import { of } from 'rxjs';
import { TestBed, inject } from '@angular/core/testing';
import { AntennasService } from './antennas.service';
import { HttpClientService } from '../data/http-client.service';
import { DataModule } from '../data/data.module';
import { Map } from '../map/fixtures';


describe('AntennasService', () => {

  let subject: AntennasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AntennasService],
      imports: [DataModule]
    });
  });

  beforeEach(inject([AntennasService, HttpClientService], (service, httpClientService) => {
    subject = service;
    spyOn(httpClientService, 'get').and.callFake(function() {
      return of(Map);
    });
  }));

  it('should be created', inject([AntennasService], (service: AntennasService) => {
    expect(service).toBeTruthy();
  }));
});
