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
      providers: [AlarmService, ]
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

    const fixtureAlarms = [  // mock alarm messages from webserver
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
      for (const alarm of fixtureAlarms){
        mockStream.send(JSON.stringify(alarm));
      }
      mockStream.stop();
    });

    // Act and assert:

    subject.alarmsObs.subscribe(alarms => {

      if (stage === 0) {  // no messages
        expect(alarms).toEqual({});
        expect(Object.keys(alarms).length).toEqual(0);
      }

      if (stage === 1) {  // create
        expect(Object.keys(alarms).length).toEqual(1);
        const storedAlarm = alarms[1];
        const fixtureAlarmMsg = fixtureAlarms[0]['payload']['data'];
        for (const key of Object.keys(fixtureAlarmMsg)) {
          expect(storedAlarm[key]).toEqual(fixtureAlarmMsg[key]);
        }
      }

      if (stage === 2) {  // update
        expect(Object.keys(alarms).length).toEqual(1);
        const storedAlarm = alarms[1];
        const fixtureAlarmMsg = fixtureAlarms[1]['payload']['data'];
        for (const key of Object.keys(fixtureAlarmMsg)) {
          expect(storedAlarm[key]).toEqual(fixtureAlarmMsg[key]);
        }
      }

      if (stage === 3) {  // last message has delete action, msg should be removed
        expect(alarms).toEqual({});
      }

      stage += 1;
    });

    subject.initialize();

  }));

  it('should get the list of alarms from the webserver', async(() => {

    let stage = 0;  // initial state index with no messages from server

    const fixtureAlarmsList = {
        'stream': 'requests',
        'payload': {
          'data': [  // mock list of alarms from webserver
            { 'pk': 1,
              'model': 'alarms.alarm',
              'fields': {
                'pk': 1,
                'value': 0,
                'core_id': 'coreid$1',
                'running_id': 'coreid$1',
                'mode': 0,
                'core_timestamp': 10000
              }
            },
            { 'pk': 2,
              'model': 'alarms.alarm',
              'fields': {
                'pk': 2,
                'value': 1,
                'core_id': 'coreid$2',
                'running_id': 'coreid$2',
                'mode': 0,
                'core_timestamp': 10000
              }
            },
            { 'pk': 3,
              'model': 'alarms.alarm',
              'fields': {
                'pk': 3,
                'value': 0,
                'core_id': 'coreid$3',
                'running_id': 'coreid$3',
                'mode': 0,
                'core_timestamp': 10000
              }
            }
          ]
        }
      };

    mockStream = new Server(environment.websocketPath);  // mock server

    mockStream.on('connection', server => {  // send mock alarms list from server
      mockStream.send(JSON.stringify(fixtureAlarmsList));
    });

    subject.alarmsObs.subscribe(alarms => {

      if (stage === 0) {
        expect(alarms).toEqual({});
        expect(Object.keys(alarms).length).toEqual(0);
      }

      if (stage === 1) {
        expect(Object.keys(alarms).length).toEqual(3);
        // const storedAlarm = alarms[3];
        // for (const message in fixtureAlarmsList['payload']['data']) {
        //   for (const key of Object.keys(message['fields'])) {
        //     console.log(key);
        //     expect(storedAlarm[key]).toEqual(message[key]);
        //   }
        // }
      }

      stage += 1;

    });

    subject.initialize();

  }));

  it('should be created', inject([AlarmService], (service: AlarmService) => {
    expect(service).toBeTruthy();
  }));
});
