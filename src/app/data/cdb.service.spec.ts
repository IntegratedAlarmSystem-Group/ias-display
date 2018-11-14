import { TestRequest } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';
import { of } from 'rxjs';
import { DataModule } from '../data/data.module';
import { BackendUrls } from '../settings';
import { CdbService } from './cdb.service';
import { HttpClientService } from '../data/http-client.service';
import { Iasio } from '../data/iasio';


describe('CdbService', () => {

  let subject: CdbService;
  let httpClient: HttpClientService;

  const mockIasConfigurationResponse = {
      logLevel: 'INFO',
      refreshRate: '2',
      broadcastFactor: '3',
      tolerance: '1',
      properties: []
  };

  const iasCdbUrl = BackendUrls.CDB_IAS;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DataModule],
      providers: [CdbService]
    });
  });

  beforeEach(inject(
    [ CdbService, HttpClientService ],
    (cdbService: CdbService, httpClientService: HttpClientService) => {
      subject = cdbService;
      httpClient = httpClientService;
      spyOn(httpClient, 'get').and.callFake(function() {
        return of(mockIasConfigurationResponse);
      });
    })
  );

  it('should be created', inject([CdbService], (service: CdbService) => {
    expect(service).toBeTruthy();
  }));

  it('should get the ias data configuration from the cdb api at initialization', () => {
    /* Act */
    subject.initialize();
    expect(httpClient.get).toHaveBeenCalled();
    expect(httpClient.get).toHaveBeenCalledWith(iasCdbUrl);
    /* Final assert */
    expect(subject.iasConfiguration).toEqual(mockIasConfigurationResponse);
  });

  it('should be able to get the refresh rate after retrieve the configuration data', () => {
    /* Arrange */
    subject.initialize();
    expect(httpClient.get).toHaveBeenCalled();
    expect(httpClient.get).toHaveBeenCalledWith(iasCdbUrl);
    /* Act and assert */
    const pars = subject.getRefreshRateParameters();
    expect(pars['refreshRate']).toEqual(2);
    expect(pars['broadcastFactor']).toEqual(3);
  });
});
