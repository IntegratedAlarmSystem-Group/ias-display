import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestRequest } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';
import { environment } from '../../environments/environment';
import { BackendUrls } from '../settings';
import { CdbService } from './cdb.service';
import { HttpClientService } from '../data/http-client.service';
import { Iasio } from '../data/iasio';


describe('CdbService', () => {

  let subject: CdbService;
  let testController: HttpTestingController;

  const mockIasConfigurationResponse = {
      logLevel: 'INFO',
      refreshRate: '2',
      broadcastFactor: '3',
      tolerance: '1',
      properties: []
  };

  const iasCdbUrl = environment.httpUrl + BackendUrls.CDB_IAS;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CdbService, HttpClientService]
    });
  });

  beforeEach(inject(
    [ HttpTestingController, CdbService ],
    ( httpTestingController: HttpTestingController, cdbService: CdbService) => {
      subject = cdbService;
      testController = httpTestingController;
    })
  );

  it('should be created', inject([CdbService], (service: CdbService) => {
    expect(service).toBeTruthy();
  }));

  it('should get the ias data configuration from the cdb api at initialization', () => {
    /* Act */
    subject.initialize();
    const calls = testController.match(
        (request) => request.method === 'GET'
    );
    expect(calls.length).toEqual(1);
    const iasCall = calls[0];
    expect(iasCall.request.url).toEqual(iasCdbUrl);
    iasCall.flush(mockIasConfigurationResponse);
    testController.verify();
    /* Final assert */
    expect(subject.iasConfiguration).toEqual(mockIasConfigurationResponse);
  });

  it('should be able to get the refresh rate after retrieve the configuration data', () => {
    /* Arrange */
    subject.initialize();
    const iasCalls = testController.match(
        (request) => request.url === iasCdbUrl );
    expect(iasCalls.length).toEqual(1);
    iasCalls[0].flush(mockIasConfigurationResponse);
    testController.verify();
    /* Act and assert */
    const pars = subject.getRefreshRateParameters();
    expect(pars['refreshRate']).toEqual(2);
    expect(pars['broadcastFactor']).toEqual(3);
  });
});
