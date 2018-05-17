import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestRequest } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';
import { BackendUrls } from './settings';
import { CdbService } from './cdb.service';
import { HttpClientService } from './http-client.service';
import { environment } from '../environments/environment';
import { Iasio } from './iasio';


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

  let mockIasAlarmsIasiosResponse = [{
      io_id: "WS-MeteoTB1-Temperature",
      short_desc: "Temperature reported by the weather station MeteoTB1 out of range",
      ias_type: "ALARM"
  }];

  let iasCdbUrl = environment.cdbApiUrl+'/ias';
  let iasioCdbUrl = environment.cdbApiUrl+'/iasio';
  let iasioCdbAlarmsUrl = iasioCdbUrl+'/filtered_by_alarm';

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
        (request) => { return request.method == 'GET' }
    );
    expect(calls.length).toEqual(2);

    let iasCall = calls[0];
    let iasiosCall = calls[1];
    expect(iasCall.request.url).toEqual(iasCdbUrl);
    expect(iasiosCall.request.url).toEqual(iasioCdbAlarmsUrl);

    iasCall.flush(mockIasConfigurationResponse);
    iasiosCall.flush(mockIasAlarmsIasiosResponse);
    testController.verify();

    /* Final assert */

    let expectedIasConfiguration = mockIasConfigurationResponse[0];
    let alarmIasio = new Iasio(mockIasAlarmsIasiosResponse[0]);
    let expectedIasAlarmsIasios = {};
    expectedIasAlarmsIasios[alarmIasio['io_id']] = alarmIasio;
    expect(subject.iasConfiguration).toEqual(expectedIasConfiguration);
    expect(subject.iasAlarmsIasios).toEqual(expectedIasAlarmsIasios);
  });

  it('should be able to get the refresh rate after retrieve the configuration data', () => {
    /* Arrange */
    subject.initialize();
    const iasCalls = testController.match(
        (request) => { return request.url == iasCdbUrl });
    const iasiosCalls = testController.match(
        (request) => { return request.url == iasioCdbAlarmsUrl });
    expect(iasCalls.length).toEqual(1);
    expect(iasiosCalls.length).toEqual(1);
    iasCalls[0].flush(mockIasConfigurationResponse);
    iasiosCalls[0].flush(mockIasAlarmsIasiosResponse);
    testController.verify();
    /* Act and assert */
    let pars = subject.getRefreshRateParameters();
    expect(pars['refreshRate']).toEqual(2);
    expect(pars['broadcastFactor']).toEqual(3);
  });

  it('should be able to retrieve the short description for an alarm from the alarm iasio information', () => {
    /* Arrange */
    subject.initialize();
    const iasCalls = testController.match(
        (request) => { return request.url == iasCdbUrl });
    const iasiosCalls = testController.match(
        (request) => { return request.url == iasioCdbAlarmsUrl });
    expect(iasCalls.length).toEqual(1);
    expect(iasiosCalls.length).toEqual(1);
    iasCalls[0].flush(mockIasConfigurationResponse);
    iasiosCalls[0].flush(mockIasAlarmsIasiosResponse);
    testController.verify();
    /* Act and assert */
    let targetAlarm = mockIasAlarmsIasiosResponse[0]
    let alarmCoreId = targetAlarm['io_id'];
    let shortDescription = subject.getAlarmDescription(alarmCoreId);
    expect(shortDescription).toEqual(targetAlarm['short_desc']);
  });

});
