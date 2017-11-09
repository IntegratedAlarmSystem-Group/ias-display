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

  // TODO: add test for initialize
  // describe('initialize', () => {
  //   beforeEach(() => {
  //
  //   })
  // })

  it('should update the alarms dictionary on new alarm messages', async(() => {
    mockStream = new Server(environment.websocketPath);

    // TODO: Add asserts and check AlarmService instance

    // subject.alarmsObs.subscribe(alarms => {
    //   console.log('here');
    //   console.log('alarms = ', alarms);
    //   this.alarmPks = Object.keys(alarms);
    // });
    //
    // subject.initialize();

    mockStream.on('connection', server => {
      let alarms = [
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
        }
      ];
      for (let alarm of alarms){
        mockStream.send(JSON.stringify(alarm));
      }
      mockStream.stop();
    });

  }));

  it('should be created', inject([AlarmService], (service: AlarmService) => {
    expect(service).toBeTruthy();
  }));
});
