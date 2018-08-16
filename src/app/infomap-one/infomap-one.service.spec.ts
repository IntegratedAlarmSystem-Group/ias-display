import { TestBed, inject } from '@angular/core/testing';
import { DataModule } from '../data/data.module';
import { InfomapOneService } from './infomap-one.service';
import { HttpClientService } from '../data/http-client.service';
import { Map } from '../weather/fixtures';
import { of } from 'rxjs';

describe('InfomapOneService', () => {

  let subject: InfomapOneService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        InfomapOneService
      ],
      imports: [
        DataModule
      ],
    });
  });

  beforeEach(inject([InfomapOneService, HttpClientService], (service, httpClientService) => {
    subject = service;
    spyOn(httpClientService, 'get').and.callFake(function() {
      return of(Map);
    });
  }));

  it('should be created', inject([InfomapOneService], (service: InfomapOneService) => {
    expect(service).toBeTruthy();
  }));
});
