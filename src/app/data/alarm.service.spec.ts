import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Howl, Howler} from 'howler';
import { Alarm, Validity } from '../data/alarm';
import { HttpClientService } from '../data/http-client.service';
import { AlarmService, AlarmSounds } from '../data/alarm.service';
import { CdbService } from '../data/cdb.service';
import { environment } from '../../environments/environment';
import { Server } from 'mock-socket';
import { AuthService } from '../auth/auth.service';
import {alarmSequence, shelvedAlarmSequence, alarms, alarmsUpdates} from '../data/alarm.service.fixtures';

let subject: AlarmService;
let cdbService: CdbService;
let httpSubject: HttpClientService;
let authService: AuthService;
let mockStream: Server;
let spyEmitSound: any;


fdescribe('GIVEN the AlarmService establishes a Websocket connection with the Webserver', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AlarmService, CdbService, HttpClient, HttpClientService]
    });
  });

  beforeEach(
    inject([AlarmService, CdbService, AuthService], (_alarmService: AlarmService, _cdbService: CdbService, _authService: AuthService) => {
      /**
      * Services
      */
      subject = _alarmService;
      cdbService = _cdbService;
      authService = _authService;

      /**
      * Redefinition of connection path with authentication token
      */
      spyOn(subject, 'getConnectionPath').and.returnValue(
        environment.websocketPath + '?token=tokenFromServer'
      );

      /**
      * Redefinition of periodic calls in the alarm service for testing
      */
      // TODO: Evaluation to check periodic calls
      spyOn(subject, 'resetTimer')
        .and.callFake(function() {});

      /**
      * Redefinition of periodic pull from buffer
      */
      spyOn(subject, 'setPeriodicalPullFromBuffer')
        .and.callFake(function() {});

      /**
      * Redefinition of the buffer stream tasks
      */
      spyOn(subject, 'bufferStreamTasks').and.callFake(
        function(change) {
          subject.updateAlarmChangeBuffer(change);
          const changes = this.getChangesFromBuffer();
          subject.alarmChangeInputStream.next(changes);
        }
      );

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
        broadcastRate: '10',
        broadcastThreshold: '11',
        tolerance: '1',
        properties: []
      };
      spyOn(cdbService, 'initialize').and.callFake(function() {});
      authService.loginStatus = true;
      cdbService.iasConfiguration = mockIasConfiguration;
      subject.canSound = true;
      // subject.sound = new Howl({src: ['']});
      spyEmitSound = spyOn(subject, 'emitSound');
      // spyOn(AlarmSounds, 'getSoundsource').and.callFake(
      //   function(sound: string): string {
      //     return sound;
      //   }
      // );
  }));

  it('should be created', inject([AlarmService], (service: AlarmService) => {
    expect(service).toBeTruthy();
  }));

  it('should update the alarms dictionary on new alarm messages in the requests and alarms stream', async(() => {
    // It is used just one alarm with the following stages:
    // creation (stage 1) and update (stage 2) actions
    // from the web Server

    // Arrange:
    let stage = 0;  // initial state index with no messages from server
    mockStream = new Server(subject.getConnectionPath());  // mock server
    mockStream.on('connection', server => {  // send mock alarms from server
      mockStream.send(JSON.stringify(
        {
          'payload': {
            'alarms': alarms,
            'counters': {}
          },
          'stream': 'requests',
        }
      ));
      mockStream.send(JSON.stringify(
        {
          'payload': {
            'alarms': alarmsUpdates,
            'counters': {}
          },
          'stream': 'alarms',
        }
      ));
      mockStream.stop();
      mockStream.close();
    });

    // Act and assert:
    subject.alarmChangeStream.subscribe(notification => {
      subject.canSound = true;
      // subject.sound = new Howl({src: ['']});
      const notified_alarms = subject.alarmsArray;
      if (stage === 0) {  // no messages
        expect(notified_alarms).toEqual([]);
        expect(Object.keys(notified_alarms).length).toEqual(0);
      }

      if (stage === 1) {  // Alarm list from request stream
        subject.canSound = true;
        // subject.sound = new Howl({src: ['']});
        expect(notified_alarms.length).toEqual(3);
        for (const index of [0, 1, 2]) {
          expect(notified_alarms[index]).toEqual(Alarm.asAlarm(alarms[index]));
        }
        expect(subject.alarmChangeInputStream.value).toEqual(['all']);
      }

      if (stage === 2) {  // Alarm list with a subset of updates fro alarms, from alarms stream
        subject.canSound = true;
        // subject.sound = new Howl({src: ['']});
        const expectedAlarms = [
          alarmsUpdates[0],
          alarms[1],
          alarmsUpdates[1],
        ];
        expect(notified_alarms.length).toEqual(3);
        for (const index of [0, 1, 2]) {
          expect(notified_alarms[index]).toEqual(Alarm.asAlarm(expectedAlarms[index]));
        }
        expect(subject.alarmChangeStream.value).toEqual([alarmsUpdates[0].core_id, alarmsUpdates[1].core_id]);
      }

      stage += 1;
    });
    subject.initialize();
  }));

  it('should update the alarms dictionary on new alarm messages and play sounds when relevant', async(() => {
    // It is used just one alarm with the following stages:
    // creation (stage 1) and update (stage 2) actions
    // from the web Server

    // Arrange:
    let stage = 0;  // initial state index with no messages from server
    const fixtureAlarms = [alarmSequence[0], alarmSequence[1]];
    mockStream = new Server(subject.getConnectionPath());  // mock server
    mockStream.on('connection', server => {  // send mock alarms from server
      for (const alarm of fixtureAlarms) {
        mockStream.send(JSON.stringify(
          {
            'payload': {
              'alarms': [alarm],
              'counters': {}
            },
            'stream': 'alarms',
          }
        ));
      }
      mockStream.stop();
      mockStream.close();
    });

    // Act and assert:

    subject.alarmChangeStream.subscribe(notification => {
      subject.canSound = true;
      // subject.sound = new Howl({src: ['']});
      const notified_alarms = subject.alarmsArray;
      if (stage === 0) {  // no messages
        expect(notified_alarms).toEqual([]);
        expect(Object.keys(notified_alarms).length).toEqual(0);
      }

      if (stage === 1) {  // create
        subject.canSound = true;
        // subject.sound = new Howl({src: ['']});
        expect(Object.keys(notified_alarms).length).toEqual(1);
        const storedAlarm = notified_alarms[subject.alarmsIndexes['coreid$1']];
        const fixtureAlarmMsg = fixtureAlarms[0];
        for (const key of Object.keys(fixtureAlarmMsg)) {
          expect(storedAlarm[key]).toEqual(fixtureAlarmMsg[key]);
        }
      }

      if (stage === 2) {  // update
        subject.canSound = true;
        // subject.sound = new Howl({src: ['']});
        expect(Object.keys(notified_alarms).length).toEqual(1);
        const storedAlarm = notified_alarms[subject.alarmsIndexes['coreid$1']];
        const fixtureAlarmMsg = fixtureAlarms[1];
        for (const key of Object.keys(fixtureAlarmMsg)) {
          expect(storedAlarm[key]).toEqual(fixtureAlarmMsg[key]);
        }
        // expect(spyEmitSound).toHaveBeenCalledWith('TYPE1', false);
        expect(subject.soundingAlarm).toEqual('coreid$1');
      }

      stage += 1;
    });
    subject.initialize();
  }));

  it('should update the alarms dictionary on new alarm messages and not play sounds for shelved alarms', async(() => {

    // It is used just one alarm with the following stages:
    // creation (stage 1) and update (stage 2) actions
    // from the web Server

    // Arrange:
    let stage = 0;  // initial state index with no messages from server
    const fixtureAlarms = [shelvedAlarmSequence[0], shelvedAlarmSequence[1]];
    mockStream = new Server(subject.getConnectionPath());  // mock server

    mockStream.on('connection', server => {  // send mock alarms from server
      for (const alarm of fixtureAlarms) {
        mockStream.send(JSON.stringify(
          {
            'payload': {
              'alarms': [alarm],
              'counters': {}
            },
            'stream': 'alarms',
          }
        ));
      }
      mockStream.stop();
      mockStream.close();
    });

    // Act and assert:
    subject.alarmChangeStream.subscribe(notification => {
      subject.canSound = true;
      // subject.sound = new Howl({src: ['']});
      const notified_alarms = subject.alarmsArray;
      if (stage === 0) {  // no messages
        expect(notified_alarms).toEqual([]);
        expect(Object.keys(notified_alarms).length).toEqual(0);
      }

      if (stage === 1) {  // create
        subject.canSound = true;
        // subject.sound = new Howl({src: ['']});
        expect(Object.keys(notified_alarms).length).toEqual(1);
        const storedAlarm = notified_alarms[subject.alarmsIndexes['coreid$1']];
        const fixtureAlarmMsg = fixtureAlarms[0];
        for (const key of Object.keys(fixtureAlarmMsg)) {
          expect(storedAlarm[key]).toEqual(fixtureAlarmMsg[key]);
        }
      }

      if (stage === 2) {  // update
        subject.canSound = true;
        // subject.sound = new Howl({src: ['']});
        expect(Object.keys(notified_alarms).length).toEqual(1);
        const storedAlarm = notified_alarms[subject.alarmsIndexes['coreid$1']];
        const fixtureAlarmMsg = fixtureAlarms[1];
        for (const key of Object.keys(fixtureAlarmMsg)) {
          expect(storedAlarm[key]).toEqual(fixtureAlarmMsg[key]);
        }
        expect(spyEmitSound).not.toHaveBeenCalled();
        expect(subject.soundingAlarm).toBeUndefined();
      }

      stage += 1;
    });
    subject.initialize();
  }));

  it('should update the alarms dictionary on new alarm messages and play sounds repeatedly for critical alarms', async(() => {
    // It is used just one alarm with the following stages:
    // creation (stage 1) and update (stage 2) actions
    // from the web Server

    // Arrange:
    let stage = 0;  // initial state index with no messages from server
    const fixtureAlarms = [
      alarmSequence[0], alarmSequence[2], alarmSequence[3], alarmSequence[4],  alarmSequence[5]
    ];
    mockStream = new Server(subject.getConnectionPath());  // mock server

    mockStream.on('connection', () => {  // send mock alarms from server
      for (const alarm of fixtureAlarms) {
        mockStream.send(JSON.stringify(
          {
            'payload': {
              'alarms': [alarm],
              'counters': {}
            },
            'stream': 'alarms',
          }
        ));
      }
      mockStream.stop();
      mockStream.close();
    });

    // Act and assert:
    subject.alarmChangeStream.subscribe( () => {
      subject.canSound = true;
      // subject.sound = new Howl({src: ['']});
      const notified_alarms = subject.alarmsArray;
      if (stage === 0) {  // no messages
        expect(notified_alarms).toEqual([]);
        expect(Object.keys(notified_alarms).length).toEqual(0);
      }

      if (stage === 1) {  // create
        subject.canSound = true;
        // subject.sound = new Howl({src: ['']});
        expect(Object.keys(notified_alarms).length).toEqual(1);
        const storedAlarm = notified_alarms[subject.alarmsIndexes['coreid$1']];
        const fixtureAlarmMsg = fixtureAlarms[0];
        for (const key of Object.keys(fixtureAlarmMsg)) {
          expect(storedAlarm[key]).toEqual(fixtureAlarmMsg[key]);
        }
      }

      if (stage === 2) {  // update with crtical alarm
        subject.canSound = true;
        // subject.sound = new Howl({src: ['']});
        expect(Object.keys(notified_alarms).length).toEqual(1);
        const storedAlarm = notified_alarms[subject.alarmsIndexes['coreid$1']];
        const fixtureAlarmMsg = fixtureAlarms[1];
        for (const key of Object.keys(fixtureAlarmMsg)) {
          expect(storedAlarm[key]).toEqual(fixtureAlarmMsg[key]);
        }
        // expect(spyEmitSound).toHaveBeenCalledWith('TYPE3', true);
        expect(subject.soundingAlarm).toEqual('coreid$1');
      }

      if (stage === 3) {  // update with another critical alarm
        subject.canSound = true;
        // subject.sound = new Howl({src: ['']});
        expect(Object.keys(notified_alarms).length).toEqual(2);
        const storedAlarm = notified_alarms[subject.alarmsIndexes['coreid$2']];
        const fixtureAlarmMsg = fixtureAlarms[2];
        for (const key of Object.keys(fixtureAlarmMsg)) {
          expect(storedAlarm[key]).toEqual(fixtureAlarmMsg[key]);
        }
        // expect(spyEmitSound).toHaveBeenCalledWith('TYPE4', true);
        expect(subject.soundingAlarm).toEqual('coreid$2');
      }

      if (stage === 4) {  // acknowledge the second critical alarm
        subject.canSound = true;
        // subject.sound = new Howl({src: ['']});
        expect(Object.keys(notified_alarms).length).toEqual(2);
        const storedAlarm = notified_alarms[subject.alarmsIndexes['coreid$2']];
        const fixtureAlarmMsg = fixtureAlarms[3];
        for (const key of Object.keys(fixtureAlarmMsg)) {
          expect(storedAlarm[key]).toEqual(fixtureAlarmMsg[key]);
        }
        expect(subject.soundingAlarm).toEqual('coreid$1');
      }

      if (stage === 5) {  // acknowledge the first critical alarm
        subject.canSound = true;
        // subject.sound = new Howl({src: ['']});
        expect(Object.keys(notified_alarms).length).toEqual(2);
        const storedAlarm = notified_alarms[subject.alarmsIndexes['coreid$1']];
        const fixtureAlarmMsg = fixtureAlarms[4];
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
    mockStream = new Server(subject.getConnectionPath());  // mock server

    // Act
    mockStream.on('connection', () => {  // send mock alarms list from server
      mockStream.send(JSON.stringify(
        {
          'stream': 'requests',
          'payload': {
            'alarms': alarms,
            'counters': {}
          }
        }
      ));
      mockStream.stop();
      mockStream.close();
    });

    // Assert
    subject.alarmChangeStream.subscribe( () => {
      const notified_alarms = subject.alarmsArray;
      const alarms_indexes = subject.alarmsIndexes;
      if (stage === 0) {
        expect(notified_alarms).toEqual([]);
        expect(notified_alarms.length).toEqual(0);
      }
      if (stage === 1) {
        expect(notified_alarms.length).toEqual(3);
        const receivedAlarms = notified_alarms;
        let index = 0;
        for (const core_id of Object.keys(alarms_indexes)) {
          for (const key of Object.keys(receivedAlarms[alarms_indexes[core_id]])) {
            expect(receivedAlarms[subject.alarmsIndexes[core_id]][key]).toEqual(
              alarms[index][key]);
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
    mockStream = new Server(subject.getConnectionPath());  // mock server
    mockStream.on('connection', () => {
      expect(subject.connectionStatusStream.value).toBe(true);
      mockStream.stop();
      mockStream.close();
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

  it('should call resetTimer after message from "requests" stream', async(() => {
    mockStream = new Server(subject.getConnectionPath());  // mock server
    mockStream.on('connection', () => {  // send mock alarms list from server
      // Act:
      // mock get alarms list from webserver
      mockStream.send(JSON.stringify(
        {
          'stream': 'requests',
          'payload': {
            'alarms': alarms,
            'counters': {}
          }
        }
      ));
      // Assert:
      expect(subject.resetTimer).toHaveBeenCalled();
      mockStream.stop();
      mockStream.close();
    });
    subject.initialize();
  }));

  xit('should call resetTimer after message from "alarms" stream', async(() => {


    mockStream = new Server(subject.getConnectionPath());  // mock server

    mockStream.on('connection', () => {  // send mock alarm from server
      // Act:
      // mock alarm message from webserver
      mockStream.send(JSON.stringify(
        {
          'payload': {
            'alarms': [alarmSequence[0]],
            'counters': {}
          },
          'stream': 'alarms',
        }
      ));
      // Assert:
      expect(subject.resetTimer).toHaveBeenCalled();
      mockStream.stop();
      mockStream.close();
    });

    subject.initialize();

  }));

  xit('should set invalid state if last received message timestamp has an important delay', function() {
    // Arrange
    subject.alarmsArray = [Alarm.asAlarm(alarms[1]), Alarm.asAlarm(alarms[2])];
    subject.connectionStatusStream.next(true);
    spyOn(subject, 'triggerAlarmsNonValidConnectionState').and.callThrough();
    for (const alarm of subject.alarmsArray) {
      expect(alarm.validity).toEqual(Validity.reliable);
    }
    // Act
    subject.connectionStatusStream.next(false);

    // Assert
    expect(subject.triggerAlarmsNonValidConnectionState).toHaveBeenCalled();
    for (const alarm of subject.alarmsArray) {
      expect(alarm.validity).toEqual(Validity.unreliable);
    }
    expect(subject.alarmChangeStream.value).toEqual(['all']);
  });

  xit(`should update a local counter after receiving the count per view from the 'alarms' stream`, async(() => {
      const mockCountByView = {
        'stream': 'alarms',
        'payload': {
          'alarms': alarms,
          'counters': {
            'weather': 2,
            'antenna': 1,
          }
        }
      };
      mockStream = new Server(subject.getConnectionPath());  // mock server
      mockStream.on('connection', () => {  // send mock count from server
        mockStream.send(JSON.stringify(mockCountByView));
        expect(subject.countByView).toEqual(mockCountByView.payload.counters);
        mockStream.stop();
        mockStream.close();
      });
      subject.initialize();
  }));

  xit(`should update a local counter after receiving the count per view from the 'requests' stream`, async(() => {
      const mockCountByView = {
        'stream': 'requests',
        'payload': {
          'alarms': alarms,
          'counters': {
            'weather': 2,
            'antenna': 1,
          }
        }
      };
      mockStream = new Server(subject.getConnectionPath());  // mock server
      mockStream.on('connection', () => {  // send mock count from server
        mockStream.send(JSON.stringify(mockCountByView));
        expect(subject.countByView).toEqual(mockCountByView.payload.counters);
        mockStream.stop();
        mockStream.close();
      });
      subject.initialize();
  }));
});


describe('GIVEN the AlarmService contains Alarms', () => {

  let httpSpy: any;
  const alarmsToAck = [alarms[1].core_id, alarms[2].core_id];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AlarmService, CdbService, HttpClient, HttpClientService]
    });
  });

  beforeEach(
    inject([AlarmService, CdbService, HttpClientService],
      (_alarmService: AlarmService, _cdbService: CdbService, httpClientService: HttpClientService) => {

      subject = _alarmService;
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
    const username = 'username';
    subject.acknowledgeAlarms(alarmsToAck, ackMessage, username).subscribe(
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

describe('AlarmService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AlarmService, CdbService, HttpClient, HttpClientService]
    });
  });

  beforeEach(
    inject([AlarmService, CdbService, AuthService], (_alarmService: AlarmService, _cdbService: CdbService, _authService: AuthService) => {
      /**
      * Services
      */
      subject = _alarmService;
      cdbService = _cdbService;
      authService = _authService;

      /**
      * Redefinition of connection path with authentication token
      */
      spyOn(subject, 'getConnectionPath').and.returnValue(
        environment.websocketPath + '?token=tokenFromServer'
      );

      /**
      * Redefinition of periodic calls in the alarm service for testing
      */
      // TODO: Evaluation to check periodic calls
      spyOn(subject, 'resetTimer')
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
          broadcastRate: '10',
          broadcastThreshold: '11',
          tolerance: '1',
          properties: []
      };
      spyOn(cdbService, 'initialize').and.callFake(function() {});
      spyOn(subject, 'destroy');
      spyOn(subject.webSocketBridge, 'connect');
      spyOn(subject.webSocketBridge, 'listen');
      cdbService.iasConfiguration = mockIasConfiguration;
      subject.canSound = true;
      // subject.sound = new Howl({src: ['']});
      spyEmitSound = spyOn(subject, 'emitSound');

  }));

  it('should not be initialized if the user is not logged in', () => {
    spyOn(authService, 'hasValidToken').and.returnValue(of(false));
    expect(subject).toBeTruthy();
    subject.initialize();
    expect(subject.webSocketBridge.connect).not.toHaveBeenCalled();
    expect(subject.webSocketBridge.listen).not.toHaveBeenCalled();
  });

  it('should call the destroy function if the user logs out', () => {
    expect(subject).toBeTruthy();
    authService.loginStatusStream.next(false);
    expect(subject.destroy).toHaveBeenCalled();
  });

});
