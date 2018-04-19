import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpEvent, HttpEventType } from '@angular/common/http';

import { TestBed, inject } from '@angular/core/testing';

import { CdbService } from './cdb.service';

import { environment } from '../environments/environment'


describe('CdbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CdbService]
    });
  });

  it('should be created', inject([CdbService], (service: CdbService) => {
    expect(service).toBeTruthy();
  }));

  it('should get the ias data from the cdb api',
    inject(
      [ HttpTestingController, CdbService ],
      (
        httpTestingController: HttpTestingController,
        cdbService: CdbService
      ) => {

        const testData = [{
            id: 1,
            log_level: "INFO",
            refresh_rate: 3,
            tolerance: 1,
            properties: []
        }];

        cdbService.getData()
        .subscribe(
          data => {
            expect(cdbService.iasData).toEqual(data);
          }
        );

        const req = httpTestingController.expectOne(environment.apiUrl);
        expect(req.request.method).toEqual('GET');
        req.flush(testData);
        httpTestingController.verify();

      }
    )
  );

});
