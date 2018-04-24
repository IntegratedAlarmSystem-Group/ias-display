import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpEvent, HttpEventType } from '@angular/common/http';

import { TestBed, inject } from '@angular/core/testing';

import { HttpClientService } from './http-client.service';

describe('HttpClientService', () => {

  let subject: HttpClientService;
  let testController: HttpTestingController;

  let testData = { id: 1, name : 'Test Data'};
  let testDataList = [ testData ];

  let testUrl = '/testUrl';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClientService]
    });
  });

  beforeEach(inject(
    [ HttpTestingController, HttpClientService ],
    ( httpTestingController: HttpTestingController, httpClientService: HttpClientService ) => {
      subject = httpClientService;
      testController = httpTestingController;

    })
  );

  it('should be created', inject([HttpClientService], (service: HttpClientService) => {
    expect(service).toBeTruthy();
  }));

  describe('CRUD calls', () => {

    it('can test HttpClientService.get', () => {

      subject.get(testUrl).subscribe(
        data => { expect(data).toEqual(testDataList); }
      );
      const req = testController.expectOne({ url: testUrl });
      expect(req.request.headers.get('Content-Type')).toEqual('application/json');
      expect(req.request.method).toEqual('GET');
      req.flush(testDataList);
      testController.verify();

    });

    it('can test HttpClientService.post', () => {

      subject.post(testUrl, testData).subscribe(
        data => { expect(data).toEqual(testData); }
      );
      const req = testController.expectOne({ url: testUrl });
      expect(req.request.headers.get('Content-Type')).toEqual('application/json');
      expect(req.request.method).toEqual('POST');
      req.flush(testData);
      testController.verify();

    });

    it('can test HttpClientService.put', () => {

      subject.put(testUrl, testData).subscribe(
        data => { expect(data).toEqual(testData); }
      );
      const req = testController.expectOne({ url: testUrl });
      expect(req.request.headers.get('Content-Type')).toEqual('application/json');
      expect(req.request.method).toEqual('PUT');
      req.flush(testData);
      testController.verify();

    });

    it('can test HttpClientService.delete', () => {

      subject.delete(testUrl+'/1').subscribe();
      const req = testController.expectOne({ url: testUrl+'/1' });
      expect(req.request.headers.get('Content-Type')).toEqual('application/json');
      expect(req.request.method).toEqual('DELETE');
      testController.verify();

    });

  });

});
