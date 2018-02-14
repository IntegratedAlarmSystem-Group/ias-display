import { TestBed, inject, async } from '@angular/core/testing';
import { Alarm, OperationalMode, Validity } from './alarm';
import { AlarmService } from './alarm.service';
import { WebSocketBridge } from 'django-channels';
import { environment } from '../environments/environment';
import { Server } from 'mock-socket';
import { RESOURCE_CACHE_PROVIDER } from '@angular/platform-browser-dynamic';

describe('AlarmService', () => {
  let subject: AlarmService;
  let mockStream: Server;

  let alarmsFromWebServer = [  // mock alarm messages from webserver
    {
      'stream': 'alarms',
      'payload': {
        'pk' : null,  // same alarm, different actions
        'action': 'create',
        'model': 'alarms.alarm',
        'data': {
          'value': 0,
          'core_id': 'coreid$1',
          'running_id': 'coreid$1',
          'mode': '0',
          'core_timestamp': 10000,
          'validity': '0'
        }
      }
    },
    {
      'stream': 'alarms',
      'payload': {
        'pk' : null,
        'action': 'update',
        'model': 'alarms.alarm',
        'data': {
          'value': 1,
          'core_id': 'coreid$1',
          'running_id': 'coreid$1',
          'mode': '1',
          'core_timestamp': 10000,
          'validity': '1'
        }
      }
    },
    {
      'stream': 'alarms',
      'payload': {
        'pk' : null,
        'action': 'delete',
        'model': 'alarms.alarm',
        'data': {
          'value': 1,
          'core_id': 'coreid$1',
          'running_id': 'coreid$1',
          'mode': '1',
          'core_timestamp': 10000,
          'validity': '1'
        }
      }
    }
  ];

  let alarms = [
    { 'pk': null,
      'model': 'alarms.alarm',
      'fields': {
        'value': 0,
        'core_id': 'coreid$1',
        'running_id': 'coreid$1',
        'mode': '0',
        'core_timestamp': 10000,
        'validity': '1'
      }
    },
    { 'pk': null,
      'model': 'alarms.alarm',
      'fields': {
        'value': 1,
        'core_id': 'coreid$2',
        'running_id': 'coreid$2',
        'mode': '0',
        'core_timestamp': 10000,
        'validity': '1'
      }
    },
    { 'pk': null,
      'model': 'alarms.alarm',
      'fields': {
        'value': 0,
        'core_id': 'coreid$3',
        'running_id': 'coreid$3',
        'mode': '0',
        'core_timestamp': 10000,
        'validity': '1'
      }
    }
  ];

  const fixtureAlarmsList = {
      'stream': 'requests',
      'payload': {
        'data': [  // mock list of alarms from webserver
          alarms[0],
          alarms[1],
          alarms[2]
        ]
      }
    };


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlarmService, ]
    });
  });

  beforeEach(inject([AlarmService], (alarmService) => {
      subject = alarmService;
      // TODO: Evaluation to check periodic calls
      spyOn(subject, 'startLastReceivedMessageTimestampCheck')
        .and.callFake(function(){});
      spyOn(subject, 'startAlarmListPeriodicalUpdate')
        .and.callFake(function(){});
  }));

  it('should update the alarms dictionary on new alarm messages', async(() => {

    // To use a 3-steps test for alarms messages

    // It is used just one alarm with the following stages:
    // creation (stage 1), update (stage 2) and delete (stage 3) actions
    // from the web Server

    // Arrange:

    let stage = 0;  // initial state index with no messages from server

    const fixtureAlarms = alarmsFromWebServer;

    mockStream = new Server(environment.websocketPath);  // mock server

    mockStream.on('connection', server => {  // send mock alarms from server
      for (const alarm of fixtureAlarms){
        mockStream.send(JSON.stringify(alarm));
      }
      mockStream.stop();
    });

    // Act and assert:

    subject.alarmChangeStream.subscribe(notification => {
      let alarms = subject.alarms;
      if (stage === 0) {  // no messages
        expect(alarms).toEqual({});
        expect(Object.keys(alarms).length).toEqual(0);
      }

      if (stage === 1) {  // create
        expect(Object.keys(alarms).length).toEqual(1);
        const storedAlarm = alarms['coreid$1'];
        const fixtureAlarmMsg = fixtureAlarms[0]['payload']['data'];
        for (const key of Object.keys(fixtureAlarmMsg)) {
          expect(storedAlarm[key]).toEqual(fixtureAlarmMsg[key]);
        }
      }

      if (stage === 2) {  // update
        expect(Object.keys(alarms).length).toEqual(1);
        const storedAlarm = alarms['coreid$1'];
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

    // Arrange
    let stage = 0;  // initial state index with no messages from server

    mockStream = new Server(environment.websocketPath);  // mock server

    // Act
    mockStream.on('connection', server => {  // send mock alarms list from server
      mockStream.send(JSON.stringify(fixtureAlarmsList));
      mockStream.stop();
    });

    // Assert
    subject.alarmChangeStream.subscribe(notification => {
      let alarms = subject.alarms;
      if (stage === 0) {
        expect(alarms).toEqual({});
        expect(Object.keys(alarms).length).toEqual(0);
      }

      if (stage === 1) {
        expect(Object.keys(alarms).length).toEqual(3);
        const receivedAlarms = alarms;
        const fixtureAlarms = fixtureAlarmsList['payload']['data'];
        let index = 0;
        for ( const core_id of Object.keys(receivedAlarms) ) {
          for (const key of Object.keys(receivedAlarms[core_id])) {
            expect(receivedAlarms[core_id][key]).toEqual(
              fixtureAlarms[index]['fields'][key]);
          }
          index += 1;
        }
      }

      stage += 1;

    });

    subject.initialize();

  }));


  it('should be created', inject([AlarmService], (service: AlarmService) => {
    expect(service).toBeTruthy();
  }));


  it('should be a valid connection status after websocket connection', async(() => {

    expect(subject.connectionStatusStream.value).toBe(false);

    mockStream = new Server(environment.websocketPath);  // mock server

    mockStream.on('connection', server => {
      expect(subject.connectionStatusStream.value).toBe(true);
      mockStream.stop();
    });

    subject.initialize();

  }));

  it('should update the alarms validity to unreliable if connection status is invalid', () => {

    // Arrange:
    subject.connectionStatusStream.next(true);
    // Initial alarms dictionary
    subject.alarms[0] = Alarm.asAlarm(alarms[0]['fields']);
    subject.alarms[0]['validity'] = Validity.reliable;
    subject.alarms[1] = Alarm.asAlarm(alarms[1]['fields']);
    subject.alarms[1]['validity'] = Validity.reliable;

    let expected_validity = Validity.unreliable;

    // Act:
    // Change connection status to invalid
    subject.connectionStatusStream.next(false);

    // Assert:
    // All the alarms should have an unknown mode
    for (let pk in subject.alarms){
      expect(subject.alarms[pk]['validity']).toBe(expected_validity);
    }

  });

  it('should store a timestamp after message from "requests" stream', async(() => {

    let millisecondsDelta: number;
    let getListExpectedTimestamp: number;

    mockStream = new Server(environment.websocketPath);  // mock server

    mockStream.on('connection', server => {  // send mock alarms list from server
      // Act:
      // mock get alarms list from webserver
      mockStream.send(JSON.stringify(fixtureAlarmsList));
      // Assert:
      getListExpectedTimestamp = (new Date()).getTime();
      millisecondsDelta = Math.abs(
        subject.lastReceivedMessageTimestamp - getListExpectedTimestamp);
      expect(millisecondsDelta).toBeLessThan(5);
      mockStream.stop();
    });

    subject.initialize();

  }));

  it('should store a timestamp after message from "alarms" stream', async(() => {

    let millisecondsDelta: number;
    let webserverMsgExpectedTimestamp: number;

    mockStream = new Server(environment.websocketPath);  // mock server

    mockStream.on('connection', server => {  // send mock alarm from server
      // Act:
      // mock alarm message from webserver
      mockStream.send(JSON.stringify(alarmsFromWebServer[0]));
      // Assert:
      webserverMsgExpectedTimestamp = (new Date()).getTime();
      millisecondsDelta = Math.abs(
        subject.lastReceivedMessageTimestamp - webserverMsgExpectedTimestamp);
      expect(millisecondsDelta).toBeLessThan(5);
      mockStream.stop();
    });

    subject.initialize();

  }));

  it('should set invalid state if last received message timestamp is two seconds behind', function() {

    // Arrange
    let now = (new Date).getTime();
    let maxSecondsWithoutMessages = 2;
    let delayedTimestamp = now - (maxSecondsWithoutMessages*1000 + 1);

    subject.connectionStatusStream.next(true);
    subject.lastReceivedMessageTimestamp = delayedTimestamp;

    // Act
    subject.compareCurrentAndLastReceivedMessageTimestamp();

    // Assert
    expect(subject.connectionStatusStream.value).toBe(false);

  });
});
