import { TestBed, inject, async } from '@angular/core/testing';
import { AlarmService } from './alarm.service';
import { WebSocketBridge } from 'django-channels';
import { environment } from '../environments/environment';
import { Server } from 'mock-socket';

describe('AlarmService', () => {
  let subject: AlarmService;
  let mockStream: Server;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlarmService,]
    });
  });

  beforeEach(inject([AlarmService], (alarmService) => {
      subject = alarmService;
  }));

  it('should update the alarms dictionary on new alarm messages', async(() => {

    // To use a 3-steps test for alarms messages

    // It is used just one alarm with the following stages:
    // creation (stage 1), update (stage 2) and delete (stage 3) actions
    // from the web Server

    // Arrange:

    let stage = 0;  // initial state index with no messages from server

    let fixtureAlarms = [  // mock alarm messages from webserver
      {
        'stream': 'alarms',
        'payload': {
          'pk' : 1,
          'action': 'create',
          'model': 'alarms.alarm',
          'data': {
            'pk': 1,
            'value': 0,
            'core_id': 'coreid$1',
            'running_id': 'coreid$1',
            'mode': 0,
            'core_timestamp': 10000
          }
        }
      },
      {
        'stream': 'alarms',
        'payload': {
          'pk' : 1,
          'action': 'update',
          'model': 'alarms.alarm',
          'data': {
            'pk': 1,
            'value': 1,
            'core_id': 'coreid$1',
            'running_id': 'coreid$1',
            'mode': 1,
            'core_timestamp': 10000
          }
        }
      },
      {
        'stream': 'alarms',
        'payload': {
          'pk' : 1,
          'action': 'delete',
          'model': 'alarms.alarm',
          'data': {
            'pk': 1,
            'value': 1,
            'core_id': 'coreid$1',
            'running_id': 'coreid$1',
            'mode': 1,
            'core_timestamp': 10000
          }
        }
      }
    ];

    mockStream = new Server(environment.websocketPath);  // mock server

    mockStream.on('connection', server => {  // send mock alarms from server
      for (let alarm of fixtureAlarms){
        mockStream.send(JSON.stringify(alarm));
      }
      mockStream.stop();
    });

    // Act and assert:

    subject.alarmsObs.subscribe(alarms => {

      if (stage == 0){  // no messages
        expect(alarms).toEqual({});
        expect(Object.keys(alarms).length).toEqual(0);
      }

      if (stage == 1){  // create
        expect(Object.keys(alarms).length).toEqual(1);
        let storedAlarm = alarms[1];
        let fixtureAlarmMsg = fixtureAlarms[0]['payload']['data'];
        for (let key in fixtureAlarmMsg){
          expect(storedAlarm[key]).toEqual(fixtureAlarmMsg[key]);
        }
      }

      if (stage == 2){  // update
        expect(Object.keys(alarms).length).toEqual(1);
        let storedAlarm = alarms[1];
        let fixtureAlarmMsg = fixtureAlarms[1]['payload']['data'];
        for (let key in fixtureAlarmMsg){
          expect(storedAlarm[key]).toEqual(fixtureAlarmMsg[key]);
        }
      }

      if (stage == 3){  // last message has delete action, msg should be removed
        expect(alarms).toEqual({});
      }

      stage += 1;
    });

    subject.initialize();

  }));

  it('should be created', inject([AlarmService], (service: AlarmService) => {
    expect(service).toBeTruthy();
  }));
});
