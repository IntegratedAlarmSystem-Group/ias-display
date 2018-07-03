import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestRequest } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';
import { BackendUrls } from '../settings';
import { CdbService } from './cdb.service';
import { HttpClientService } from '../data/http-client.service';
import { environment } from '../../environments/environment';
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

  const iasCdbUrl = environment.cdbApiUrl + '/ias';
  const iasioCdbUrl = environment.cdbApiUrl + '/iasio';
  const iasioCdbAlarmsUrl = iasioCdbUrl + '/filtered_by_alarm';

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

  it('should get the ias data configuration from the cdb and alarms iasios from api at initialization', () => {
    /* Act */
    subject.initialize();
    // initialization should trigger two get calls
    const calls = testController.match(
        (request) => request.method === 'GET'
    );
    expect(calls.length).toEqual(2);

    const iasCall = calls[0];
    const iasiosCall = calls[1];
    expect(iasCall.request.url).toEqual(iasCdbUrl);
    expect(iasiosCall.request.url).toEqual(iasioCdbAlarmsUrl);

    iasCall.flush(mockIasConfigurationResponse);
    iasiosCall.flush(mockIasAlarmsIasiosResponse);
    testController.verify();

    /* Final assert */

    const expectedIasConfiguration = mockIasConfigurationResponse[0];
    const alarmIasio = new Iasio(mockIasAlarmsIasiosResponse[0]);
    const expectedIasAlarmsIasios = {};
    expectedIasAlarmsIasios[alarmIasio['io_id']] = alarmIasio;
    expect(subject.iasConfiguration).toEqual(expectedIasConfiguration);
    expect(subject.iasAlarmsIasios).toEqual(expectedIasAlarmsIasios);
  });

  it('should be able to get the refresh rate after retrieve the configuration data', () => {
    /* Arrange */
    subject.initialize();
    const iasCalls = testController.match(
        (request) => request.url === iasCdbUrl );
    const iasiosCalls = testController.match(
        (request) => request.url === iasioCdbAlarmsUrl );
    expect(iasCalls.length).toEqual(1);
    expect(iasiosCalls.length).toEqual(1);
    iasCalls[0].flush(mockIasConfigurationResponse);
    iasiosCalls[0].flush(mockIasAlarmsIasiosResponse);
    testController.verify();
    /* Act and assert */
    const pars = subject.getRefreshRateParameters();
    expect(pars['refreshRate']).toEqual(2);
    expect(pars['broadcastFactor']).toEqual(3);
  });

  it('should be able to retrieve the short description and documentation URL for an alarm from the alarm iasio information', () => {
    /* Arrange */
    subject.initialize();
    const iasCalls = testController.match(
        (request) => request.url === iasCdbUrl );
    const iasiosCalls = testController.match(
        (request) => request.url === iasioCdbAlarmsUrl );
    expect(iasCalls.length).toEqual(1);
    expect(iasiosCalls.length).toEqual(1);
    iasCalls[0].flush(mockIasConfigurationResponse);
    iasiosCalls[0].flush(mockIasAlarmsIasiosResponse);
    testController.verify();
    /* Act and assert */
    const targetAlarm = mockIasAlarmsIasiosResponse[0];
    const alarmCoreId = targetAlarm['io_id'];
    const shortDescription = subject.getAlarmDescription(alarmCoreId);
    const docUrl = subject.getAlarmsInformationUrl(alarmCoreId);
    expect(shortDescription).toEqual(targetAlarm['short_desc']);
    expect(docUrl).toEqual(targetAlarm['doc_url']);
  });
});
