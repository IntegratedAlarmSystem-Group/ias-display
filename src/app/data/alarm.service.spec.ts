import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RESOURCE_CACHE_PROVIDER } from '@angular/platform-browser-dynamic';
import { of } from 'rxjs';
import { Alarm, OperationalMode, Validity } from '../data/alarm';
import { HttpClientService } from '../data/http-client.service';
import { AlarmService } from '../data/alarm.service';
import { CdbService } from '../data/cdb.service';
import { WebSocketBridge } from 'django-channels';
import { environment } from '../../environments/environment';
import { Server } from 'mock-socket';
import { AuthService } from '../auth/auth.service';

let subject: AlarmService;
let cdbSubject: CdbService;
let httpSubject: HttpClientService;
let authSubject: AuthService;
let mockStream: Server;
let spyEmitSound;

const alarmsFromWebServer = [  // mock alarm messages from webserver
  {  // same alarm, different actions
  'stream': 'alarms',
  'payload': {
    'action': 'create',
    'data': {
      'value': 0,
      'core_id': 'coreid$1',
      'running_id': 'coreid$1',
      'mode': 0,
      'core_timestamp': 10000,
      'state_change_timestamp': 10000,
      'validity': 0,
      'description': 'my description',
      'url': 'https://www.alma.cl',
      'sound': 'TYPE1',
      'can_shelve': true,
      'ack': false,
      'shelved': false,
      'dependencies': [],
    }
  }
},
{
  'stream': 'alarms',
  'payload': {
    'action': 'update',
    'data': {
      'value': 1,
      'core_id': 'coreid$1',
      'running_id': 'coreid$1',
      'mode': 1,
      'core_timestamp': 10000,
      'state_change_timestamp': 10000,
      'validity': 1,
      'description': 'my description',
      'url': 'https://www.alma.cl',
      'sound': 'TYPE1',
      'can_shelve': true,
      'ack': false,
      'shelved': false,
      'dependencies': [],
    }
  }
},
{
  'stream': 'alarms',
  'payload': {
    'action': 'update',
    'data': {
      'value': 4,
      'core_id': 'coreid$1',
      'running_id': 'coreid$1',
      'mode': 1,
      'core_timestamp': 10000,
      'state_change_timestamp': 10000,
      'validity': 1,
      'description': 'my description',
      'url': 'https://www.alma.cl',
      'sound': 'TYPE3',
      'can_shelve': true,
      'ack': false,
      'shelved': false,
      'dependencies': [],
    }
  }
},
{
  'stream': 'alarms',
  'payload': {
    'action': 'update',
    'data': {
      'value': 4,
      'core_id': 'coreid$2',
      'running_id': 'coreid$2',
      'mode': 1,
      'core_timestamp': 10000,
      'state_change_timestamp': 10000,
      'validity': 1,
      'description': 'my description',
      'url': 'https://www.alma.cl',
      'sound': 'TYPE4',
      'can_shelve': true,
      'ack': false,
      'shelved': false,
      'dependencies': [],
    }
  }
},
{
  'stream': 'alarms',
  'payload': {
    'action': 'update',
    'data': {
      'value': 4,
      'core_id': 'coreid$2',
      'running_id': 'coreid$2',
      'mode': 1,
      'core_timestamp': 10000,
      'state_change_timestamp': 10000,
      'validity': 1,
      'description': 'my description',
      'url': 'https://www.alma.cl',
      'sound': 'TYPE4',
      'can_shelve': true,
      'ack': true,
      'shelved': false,
      'dependencies': [],
    }
  }
},
{
  'stream': 'alarms',
  'payload': {
    'action': 'update',
    'data': {
      'value': 4,
      'core_id': 'coreid$1',
      'running_id': 'coreid$1',
      'mode': 1,
      'core_timestamp': 10000,
      'state_change_timestamp': 10000,
      'validity': 1,
      'description': 'my description',
      'url': 'https://www.alma.cl',
      'sound': 'TYPE3',
      'can_shelve': true,
      'ack': true,
      'shelved': false,
      'dependencies': [],
    }
  }
}
];

const alarms = [
  {
    'value': 0,
    'core_id': 'coreid$1',
    'running_id': 'coreid$1',
    'mode': 0,
    'core_timestamp': 10000,
    'state_change_timestamp': 10000,
    'validity': 1,
    'description': 'my description',
    'url': 'https://www.alma.cl',
    'sound': 'TYPE1',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  },
  {
    'value': 2,
    'core_id': 'coreid$2',
    'running_id': 'coreid$2',
    'mode': 0,
    'core_timestamp': 10000,
    'state_change_timestamp': 10000,
    'validity': 1,
    'description': 'my description',
    'url': 'https://www.alma.cl',
    'sound': 'TYPE2',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  },
  {
    'value': 4,
    'core_id': 'coreid$3',
    'running_id': 'coreid$3',
    'mode': 0,
    'core_timestamp': 10000,
    'state_change_timestamp': 10000,
    'validity': 1,
    'description': 'my description',
    'url': 'https://www.alma.cl',
    'sound': 'TYPE3',
    'can_shelve': true,
    'ack': false,
    'shelved': false,
    'dependencies': [],
  }
];

const fixtureAlarmsList = {
  'stream': 'requests',
  'payload': {
    'data': [  // mock list of alarms from webserver
      alarms[0],
      alarms[1],
      alarms[2],
    ]
  }
};

fdescribe('AlarmService', () => {


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AlarmService, CdbService, HttpClient, HttpClientService]
    });
  });

  beforeEach(inject([AlarmService, CdbService, AuthService], (alarmService, cdbService, authService) => {
      /**
      * Services
      */
      subject = alarmService;
      cdbSubject = cdbService;
      authSubject = authService;

      /**
      * Redefinition of periodic calls in the alarm service for testing
      */
      // TODO: Evaluation to check periodic calls
      spyOn(subject, 'startLastReceivedMessageTimestampCheck')
        .and.callFake(function() {});

      /**
      * Redefinition of the cdb information for the testing environment
      *
      * This is required to set the alarm service validation delay according to
      * the cdb configuration
      *
      */
      const mockIasConfiguration = {
          logLevel: 'INFO',
          refreshRate: '2',
          broadcastFactor: '3',
          tolerance: '1',
          properties: []
      };
      spyOn(cdbSubject, 'initialize').and.callFake(function() {});
      spyOn(authSubject, 'isLoggedIn').and.returnValue(true);
      cdbSubject.iasConfiguration = mockIasConfiguration;
      subject.canSound = true;
      subject.audio = new Audio();
      spyEmitSound = spyOn(subject, 'emitSound');

  }));

  it('should be created', inject([AlarmService], (service: AlarmService) => {
    expect(service).toBeTruthy();
  }));

  it('should update the alarms dictionary on new alarm messages and play sounds when relevant', async(() => {

    // To use a 2-steps test for alarms messages

    // It is used just one alarm with the following stages:
    // creation (stage 1) and update (stage 2) actions
    // from the web Server

    // Arrange:
    let stage = 0;  // initial state index with no messages from server
    const fixtureAlarms = [alarmsFromWebServer[0], alarmsFromWebServer[1]];
    mockStream = new Server(environment.websocketPath);  // mock server

    mockStream.on('connection', server => {  // send mock alarms from server
      for (const alarm of fixtureAlarms) {
        mockStream.send(JSON.stringify(alarm));
      }
      mockStream.stop();
    });

    // Act and assert:

    subject.alarmChangeStream.subscribe(notification => {
      subject.canSound = true;
      subject.audio = new Audio();
      const notified_alarms = subject.alarmsArray;
      if (stage === 0) {  // no messages
        expect(notified_alarms).toEqual([]);
        expect(Object.keys(notified_alarms).length).toEqual(0);
      }

      if (stage === 1) {  // create
        subject.canSound = true;
        subject.audio = new Audio();
        expect(Object.keys(notified_alarms).length).toEqual(1);
        const storedAlarm = notified_alarms[subject.alarmsIndexes['coreid$1']];
        const fixtureAlarmMsg = fixtureAlarms[0]['payload']['data'];
        for (const key of Object.keys(fixtureAlarmMsg)) {
          expect(storedAlarm[key]).toEqual(fixtureAlarmMsg[key]);
        }
      }

      if (stage === 2) {  // update
        subject.canSound = true;
        subject.audio = new Audio();
        expect(Object.keys(notified_alarms).length).toEqual(1);
        const storedAlarm = notified_alarms[subject.alarmsIndexes['coreid$1']];
        const fixtureAlarmMsg = fixtureAlarms[1]['payload']['data'];
        for (const key of Object.keys(fixtureAlarmMsg)) {
          expect(storedAlarm[key]).toEqual(fixtureAlarmMsg[key]);
        }
        expect(spyEmitSound).toHaveBeenCalledWith('TYPE1', false);
        expect(subject.soundingAlarm).toBeUndefined();
      }

      stage += 1;
    });

    subject.initialize();

  }));

  it('should update the alarms dictionary on new alarm messages and play sounds repeatedly for critical alarms', async(() => {

    // To use a 2-steps test for alarms messages

    // It is used just one alarm with the following stages:
    // creation (stage 1) and update (stage 2) actions
    // from the web Server

    // Arrange:
    let stage = 0;  // initial state index with no messages from server
    const fixtureAlarms = [
      alarmsFromWebServer[0], alarmsFromWebServer[2], alarmsFromWebServer[3], alarmsFromWebServer[4],  alarmsFromWebServer[5]
    ];
    mockStream = new Server(environment.websocketPath);  // mock server

    mockStream.on('connection', server => {  // send mock alarms from server
      for (const alarm of fixtureAlarms) {
        mockStream.send(JSON.stringify(alarm));
      }
      mockStream.stop();
    });

    // Act and assert:

    subject.alarmChangeStream.subscribe(notification => {
      subject.canSound = true;
      subject.audio = new Audio();
      const notified_alarms = subject.alarmsArray;
      if (stage === 0) {  // no messages
        expect(notified_alarms).toEqual([]);
        expect(Object.keys(notified_alarms).length).toEqual(0);
      }

      if (stage === 1) {  // create
        subject.canSound = true;
        subject.audio = new Audio();
        expect(Object.keys(notified_alarms).length).toEqual(1);
        const storedAlarm = notified_alarms[subject.alarmsIndexes['coreid$1']];
        const fixtureAlarmMsg = fixtureAlarms[0]['payload']['data'];
        for (const key of Object.keys(fixtureAlarmMsg)) {
          expect(storedAlarm[key]).toEqual(fixtureAlarmMsg[key]);
        }
      }

      if (stage === 2) {  // update with crtical alarm
        subject.canSound = true;
        subject.audio = new Audio();
        expect(Object.keys(notified_alarms).length).toEqual(1);
        const storedAlarm = notified_alarms[subject.alarmsIndexes['coreid$1']];
        const fixtureAlarmMsg = fixtureAlarms[1]['payload']['data'];
        for (const key of Object.keys(fixtureAlarmMsg)) {
          expect(storedAlarm[key]).toEqual(fixtureAlarmMsg[key]);
        }
        expect(spyEmitSound).toHaveBeenCalledWith('TYPE3', true);
        expect(subject.soundingAlarm).toEqual('coreid$1');
      }

      if (stage === 3) {  // update with another critical alarm
        subject.canSound = true;
        subject.audio = new Audio();
        expect(Object.keys(notified_alarms).length).toEqual(2);
        const storedAlarm = notified_alarms[subject.alarmsIndexes['coreid$2']];
        const fixtureAlarmMsg = fixtureAlarms[2]['payload']['data'];
        for (const key of Object.keys(fixtureAlarmMsg)) {
          expect(storedAlarm[key]).toEqual(fixtureAlarmMsg[key]);
        }
        expect(spyEmitSound).toHaveBeenCalledWith('TYPE4', true);
        expect(subject.soundingAlarm).toEqual('coreid$2');
      }

      if (stage === 4) {  // acknowledge the second critical alarm
        subject.canSound = true;
        subject.audio = new Audio();
        expect(Object.keys(notified_alarms).length).toEqual(2);
        const storedAlarm = notified_alarms[subject.alarmsIndexes['coreid$2']];
        const fixtureAlarmMsg = fixtureAlarms[3]['payload']['data'];
        for (const key of Object.keys(fixtureAlarmMsg)) {
          expect(storedAlarm[key]).toEqual(fixtureAlarmMsg[key]);
        }
        expect(subject.soundingAlarm).toEqual('coreid$1');
      }

      if (stage === 5) {  // acknowledge the first critical alarm
        subject.canSound = true;
        subject.audio = new Audio();
        expect(Object.keys(notified_alarms).length).toEqual(2);
        const storedAlarm = notified_alarms[subject.alarmsIndexes['coreid$1']];
        const fixtureAlarmMsg = fixtureAlarms[4]['payload']['data'];
        for (const key of Object.keys(fixtureAlarmMsg)) {
          expect(storedAlarm[key]).toEqual(fixtureAlarmMsg[key]);
        }
        expect(subject.soundingAlarm).toEqual(null);
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
      const notified_alarms = subject.alarmsArray;
      const alarms_indexes = subject.alarmsIndexes;
      if (stage === 0) {
        expect(notified_alarms).toEqual([]);
        expect(notified_alarms.length).toEqual(0);
      }

      if (stage === 1) {
        expect(notified_alarms.length).toEqual(3);
        const receivedAlarms = notified_alarms;
        const fixtureAlarms = fixtureAlarmsList['payload']['data'];
        let index = 0;
        for (const core_id of Object.keys(alarms_indexes)) {
          for (const key of Object.keys(receivedAlarms[alarms_indexes[core_id]])) {
            expect(receivedAlarms[subject.alarmsIndexes[core_id]][key]).toEqual(
              fixtureAlarms[index][key]);
          }
          index += 1;
        }
      }

      stage += 1;

    });

    subject.initialize();

  }));

  it('should have a valid connection status after websocket connection', async(() => {

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
    subject.alarmsArray[0] = Alarm.asAlarm(alarms[0]);
    subject.alarmsArray[0]['validity'] = Validity.reliable;
    subject.alarmsArray[1] = Alarm.asAlarm(alarms[1]);
    subject.alarmsArray[1]['validity'] = Validity.reliable;

    const expected_validity = Validity.unreliable;

    // Act:
    // Change connection status to invalid
    subject.connectionStatusStream.next(false);

    // Assert:
    // All the alarms should have an unknown mode
    for (const alarm of subject.alarmsArray) {
      expect(alarm.validity).toBe(expected_validity);
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

  it('should set invalid state if last received message timestamp has an important delay', function() {

    // Arrange
    const now = (new Date).getTime();
    const pars = cdbSubject.getRefreshRateParameters();
    const maxSecondsWithoutMessages = pars['refreshRate'] * pars['broadcastFactor'] + pars['tolerance'];
    const delayedTimestamp = now - (maxSecondsWithoutMessages * 1000 + 1);

    subject.connectionStatusStream.next(true);
    subject.lastReceivedMessageTimestamp = delayedTimestamp;

    // Act
    subject.compareCurrentAndLastReceivedMessageTimestamp();

    // Assert
    expect(subject.connectionStatusStream.value).toBe(false);

  });
});


describe('GIVEN the AlarmService contains Alarms', () => {

  let httpSpy;
  const alarmsToAck = [alarms[1].core_id, alarms[2].core_id];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AlarmService, CdbService, HttpClient, HttpClientService]
    });
  });

  beforeEach(
    inject([AlarmService, CdbService, HttpClientService],
      (alarmService, cdbService, httpClientService) => {

      subject = alarmService;
      httpSubject = httpClientService;
      const alarmsArray = [];
      const alarmsIndexes = {};
      for (const a in alarms) {
        if (alarms.hasOwnProperty(a)) {
          const index = alarmsArray.push(Alarm.asAlarm(alarms[a]));
          alarmsIndexes[alarms[a].core_id] = index - 1;
        }
      }
      subject.alarmsArray = alarmsArray;
      subject.alarmsIndexes = alarmsIndexes;

      /**
      * Redefinition of acknowledge of Alarms
      */
      httpSpy = spyOn(httpSubject, 'put').and.returnValue(
          of(alarmsToAck)
      );
      }
    )
  );

  it('WHEN a set of Alarm is Acknowledged, they should be updated', () => {
    const ackMessage = 'This is the message';
    const ack_response = subject.acknowledgeAlarms(alarmsToAck, ackMessage).subscribe(
      (response) => {
        expect(response).toEqual(alarmsToAck);
        expect(httpSpy).toHaveBeenCalled();
        for (const a in alarmsToAck) {
          if (alarmsToAck.hasOwnProperty(a)) {
            const alarm = subject.get(alarmsToAck[a]);
            expect(alarm.ack).toEqual(true);
          }
        }
      }
    );
  });
});
