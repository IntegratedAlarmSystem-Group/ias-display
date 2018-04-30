import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';
import { BackendUrls } from './settings';
import { CdbService } from './cdb.service';
import { HttpClientService } from './http-client.service';
import { environment } from '../environments/environment';


describe('CdbService', () => {

  let subject: CdbService;
  let testController: HttpTestingController;

  let mockIasConfigurationResponse = [{
      id: 1,
      log_level: "INFO",
      refresh_rate: 2,
      broadcast_factor: 3,
      tolerance: 1,
      properties: []
  }];

  let iasCdbUrl = environment.httpUrl + BackendUrls.CDB_IAS;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CdbService, HttpClientService]
    });
  });

  beforeEach(inject(
    [ HttpTestingController, CdbService ],
    ( httpTestingController: HttpTestingController, cdbService: CdbService ) => {
      subject = cdbService;
      testController = httpTestingController;
    })
  );

  it('should be created', inject([CdbService], (service: CdbService) => {
    expect(service).toBeTruthy();
  }));

  it('should be able to get the ias data configuration from the cdb api at initialization', () => {
    /* Act */
    subject.initialize();
    const req = testController.expectOne(iasCdbUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(mockIasConfigurationResponse);
    testController.verify();
    /* Final assert */
    expect(subject.iasConfiguration)
      .toEqual(mockIasConfigurationResponse[0]);
  });

  it('should be able to get the refresh rate after retrieve the configuration data', () => {
    /* Act */
    subject.initialize();
    const req = testController.expectOne(iasCdbUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(mockIasConfigurationResponse);
    testController.verify();
    /* Final assert */
    let pars = subject.getRefreshRateParameters();
    expect(pars['refreshRate']).toEqual(2);
    expect(pars['broadcastFactor']).toEqual(3);
  });

});
