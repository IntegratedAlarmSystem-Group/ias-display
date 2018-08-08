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

  const mockIasConfigurationResponse = [{
      id: 1,
      log_level: 'INFO',
      refresh_rate: 2,
      broadcast_factor: 3,
      tolerance: 1,
      properties: []
  }];

  const mockIasAlarmsIasiosResponse = [{
      io_id: 'WS-MeteoTB1-Temperature',
      short_desc: 'Temperature reported by the weather station MeteoTB1 out of range',
      ias_type: 'ALARM',
      doc_url: 'https://www.alma.cl/'
  }];

  const iasCdbUrl = environment.httpUrl + BackendUrls.CDB_IAS;
  const iasioCdbUrl = environment.httpUrl + BackendUrls.CDB_IASIO;
  const iasioCdbAlarmsUrl = iasioCdbUrl + 'filtered_by_alarm';

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

  it('should get the ias data configuration from the cdb and alarms iasios from api at initialization', () => {
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
    const expectedIasConfiguration = mockIasConfigurationResponse[0];
    expect(subject.iasConfiguration).toEqual(expectedIasConfiguration);
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
