import { Injectable, NgZone } from '@angular/core';
import { map, auditTime } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { interval } from 'rxjs';
import { WebSocketBridge } from 'django-channels';
import { environment } from '../../environments/environment';
import { Alarm, Validity, Value } from '../data/alarm';
import { AlarmConfig } from '../data/alarm-config';
import { BackendUrls, Streams, Assets } from '../settings';
import { CdbService } from '../data/cdb.service';
import { HttpClientService } from './http-client.service';
import { AuthService } from '../auth/auth.service';


/**
* Class used to model the different sound options and their corresponding audio files
*/
export class AlarmSounds {

  /** This is the type for alarms with no sound */
  static none = '';

  /** The name of the audio file associated to the sound TYPE1 */
  static type1 = 'Alarm_Sound_1.mp3';

  /** The name of the audio file associated to the sound TYPE2 */
  static type2 = 'Alarm_Sound_2.mp3';

  /** The name of the audio file associated to the sound TYPE3 */
  static type3 = 'Alarm_Sound_3.mp3';

  /** The name of the audio file associated to the sound TYPE4 */
  static type4 = 'Alarm_Sound_4.mp3';

  /**
  * Given a sound type, retruns the associated audiofile
  * @param {string} sound The sound type, e.g. TYPE1, TYPE2, etc.
  * @returns {string} the filepath of the corresponding audio file
  */
  static getSoundsource(sound: string): string {
    if (sound === 'TYPE1') {
      return Assets.SOUNDS + AlarmSounds.type1;
    } else if (sound === 'TYPE2') {
      return Assets.SOUNDS + AlarmSounds.type2;
    } else if (sound === 'TYPE3') {
      return Assets.SOUNDS + AlarmSounds.type3;
    } else if (sound === 'TYPE4') {
      return Assets.SOUNDS + AlarmSounds.type4;
    }
    return null;
  }
}

/**
* Service that connects and receives {@link Alarm} messages from the
* IAS Webserver through Websockets
*/
@Injectable()
export class AlarmService {

  /**
  * Timestamp related with the last received message
  */
  public lastReceivedMessageTimestamp: number = (new Date).getTime();

  /**
  * Stream of notifications of changes in
  * the status of the service connection
  */
  public connectionStatusStream = new BehaviorSubject<any>(false);

  /**
  * Array of {@link Alarm} objects
  */
  public alarmsArray: Alarm[] = [];

  /**
  * Index for the alarmsArray { core_id: arrayIndex }
  */
  public alarmsIndexes: {[core_id: string]: number} = {};

  /**
  * Stream of notifications of changes in
  * the dictionary of {@link Alarm} objects
  */
  public alarmChangeStream = new BehaviorSubject<any>(true);

  /**
  * Stream of notifications to control the delivery of changes in
  * the dictionary of {@link Alarm} objects
  */
  public alarmChangeInputStream = new BehaviorSubject<any>(true);

  /**
  * Django Channels WebsocketBridge,
  * used to connect to Django Channels through Websockets
  */
  public webSocketBridge: WebSocketBridge = new WebSocketBridge();

  /**
  * Defines wether or not the display should emit sounds when alarms are triggered.
  * It is used to avoid sounds when the page is refreshed, and only allow them after that
  */
  public canSound: boolean;

  /**
  * Reference to the audio object used to play the sounds
  */
  public audio = new Audio();

  /**
  * Id of the currenlty sounding Alarm
  */
  public soundingAlarm: string;

  /**
  * Defines wether or not the service is initialized
  */
  public isInitialized = false;

  /**
  * Information about the count of alarms by view
  */
  public countByView = {};

  /**
  * Connection status timer
  */
  public connectionStatusTimer: any;

  /**
   * Builds an instance of the service
   * @param {CdbService} cdbService Service used to get complementary alarm information
   * @param {HttpClientService} httpClientService Service used to perform HTTP requests
   * @param {AuthService} authService Service used for authentication
   * @param {NgZone} ngZone Service used for executing work inside or outside of the Angular Zone
   */
  constructor(
    private cdbService: CdbService,
    private httpClientService: HttpClientService,
    private authService: AuthService,
    private ngZone: NgZone
  ) {
    this.connectionStatusStream.subscribe(
      value => {
        if (value === false) {
          this.triggerAlarmsNonValidConnectionState();
        }
      }
    );
    this.authService.loginStatusStream.subscribe(
      value => {
        if (value === true) {
          this.initialize();
        } else {
          this.destroy();
        }
      }
    );
    this.alarmChangeInputStream.pipe(auditTime(200)).subscribe(
      change => {
        this.ngZone.run(
          () => {
            this.alarmChangeStream.next(change);
          }
        );
      }
    );
  }

  /**
  * Sends an {@link Alarm} change event
  *
  * @param {Any} any the core_id of the updated alarm,
  * or 'all' if all were updated
  */
  changeAlarms(any: any) {
    this.alarmChangeInputStream.next(any);
  }

  /******* SERVICE INITIALIZATION *******/

  /**
  * Start connection to the backend through websockets
  */
  initialize() {
    if (this.isInitialized || !this.authService.loginStatus) {
      return;
    }
    this.cdbService.initialize();
    this.isInitialized = true;
    this.canSound = false;
    this.audio = new Audio();
    this.connect();
    this.ngZone.runOutsideAngular(
      () => {
        this.webSocketBridge.socket.addEventListener(
          'open', () => {
            this.connectionStatusStream.next(true);
            this.getAlarmList();
          }
        );
        this.webSocketBridge.socket.addEventListener(
          'close', () => {
            this.resetCountByView();
          }
        );
        this.webSocketBridge.demultiplex(Streams.ALARMS, (payload: any, streamName: any) => {
        // console.log('notify ', payload);
          if (this.authService.loginStatus) {
            this.resetTimer();
            this.readAlarmMessage(payload.action, payload.data);
          }
        });
        this.webSocketBridge.demultiplex(Streams.UPDATES, (payload: any, streamName: any) => {
          // console.log('request', payload);
          if (this.authService.loginStatus) {
            this.resetTimer();
            this.readAlarmMessagesList(payload.data);
          }
        });
        this.webSocketBridge.demultiplex(Streams.COUNTER, (payload: any, streamName: any) => {
          // console.log('counter ', payload);
          if (this.authService.loginStatus) {
           this.readCountByViewMessage(payload.data);
          }
        });
      }
    );
  }

  /**
  *  Start connection to the backend through websockets
  */
  connect() {
    this.ngZone.runOutsideAngular(
      () => {
        const connectionPath = this.getConnectionPath();
        this.webSocketBridge.connect(connectionPath);
        this.webSocketBridge.listen(connectionPath);
        console.log('Connected to webserver at');
    });
  }

  /**
  *  Connection path using authentication data
  */
  getConnectionPath() {
    return environment.websocketPath + '?token=' + this.authService.getToken();
  }

  /**
  *  Disconnect from the backend
  */
  destroy() {
    // Close connection
    if (this.isInitialized) {
      this.webSocketBridge.stream(Streams.UPDATES).send({
        'action': 'close'
      });
      this.webSocketBridge.socket.close(
        1000, 'User logout', {keepClosed: true});
      this.resetCountByView();
    }
    this.isInitialized = false;
    console.log('Connection to webserver closed');
  }

  /******* ALARM HANDLING *******/

  /**
   * Returns an Alarm object
   * @param core_id core_id of the Alarm to return
   * @returns {Alarm} Alarm object corresponding to the given core_id
   */
  get(core_id: string): Alarm {
    return this.alarmsArray[this.alarmsIndexes[core_id]] as Alarm;
  }

  /**
   * Returns a boolean to check if there is information available about an alarm
   * @param core_id core_id of the Alarm
   * @returns {boolean} true if there is information about the alarm
   */
  isAlarmIndexAvailable(core_id: string): boolean {
    return (core_id in this.alarmsIndexes);
  }

  /**
  * Returns the instance of the {@link Alarm} associated to a given {@link AlarmConfig}
  * @param {AlarmConfig} config the corresponding AlarmConfig from where to get the {@link Alarm}
  * @returns {Alarm} the {@link Alarm} associated to the given {@link AlarmConfig}
  */
  getAlarm(config: AlarmConfig): Alarm {
    if (config) {
      return this.get(config.alarm_id);
    }
  }

  /**
  * Returns the custom_name of the {@link Alarm} given a corresponding {@link AlarmConfig}.
  * If there is no custom_name, it returns the alarm_id
  * @param {AlarmConfig} config the corresponding AlarmConfig from where to get the {@link Alarm}
  * @returns {string} the name associated to the given {@link AlarmConfig}
  */
  getName(config: AlarmConfig): string {
    if (config) {
      if (config.custom_name) {
        return config.custom_name;
      } else {
        return config.alarm_id;
      }
    }
  }

  /**
   * Acknowledges a list of Alarms with a message
   * @param {string[]} alarm_ids list of ids of the alarms to acknowledge
   * @param {string} message message of the acknowledgement
   * @param {string} user user that performs the acknowledgement
   * @returns {json} response of the HTTP request of the acknowledge
   */
  acknowledgeAlarms(alarms_ids: string[], message: string, user: string): any {
    const data = {
      'alarms_ids': alarms_ids,
      'message': message,
      'user': user
    };
    return this.httpClientService.put(BackendUrls.TICKETS_MULTIPLE_ACK, data).pipe(
    map(
      (response) => {
        for (const id of alarms_ids) {
          const alarm = this.get(id);
          alarm.acknowledge();
        }
        return response;
      }
    ));
  }

  /**
   * Get information about old tickets related to a target alarm
   * @param alarm_id id of the target alarm
   * @returns {any[]} response of the HTTP request with a dictionary with information about missing acks
   */
  getMissingAcks(alarm_id: string) {
    const url = BackendUrls.TICKETS_INFO + '?alarm_id=' + alarm_id;
    return this.httpClientService.get(url).pipe(
    map(
      (response) => {
        return response;
      }
    ));
  }

  /**
   * Gets the open {@link ShelveRegistry} for an {@link Alarm}
   * @param {string} alarm_id id of the target alarm
   * @param {number} status id of the target alarm
   * @returns {json} response of the HTTP request with a dictionary with information about missing acks
   */
  getShelveRegistries(alarm_id: string, status: number): any {
    const url = BackendUrls.SHELVE_REGS_FILTER + '?alarm_id=' + alarm_id + '&status=' + status;
    return this.httpClientService.get(url).pipe(
    map(
      (response) => {
        return response;
      }
    ));
  }

  /**
   * Shelves and {@link Alarm} with a message
   * @param {string} alarm_id id of the alarm to shelve
   * @param {string} message message of the shelving
   * @param {string} timeout the timeout for the shelving
   * @param {string} user the user who performed the shelving
   * @returns {json} response of the HTTP request of the shelve
   */
  shelveAlarm(alarm_id: string, message: string, timeout: string, user: string): any {
    const data = {
      'alarm_id': alarm_id,
      'message': message,
      'timeout': timeout,
      'user': user
    };
    return this.httpClientService.post(BackendUrls.SHELVE_API, data).pipe(
    map(
      (response) => {
        if (response['status'] === 201) {
          const alarm = this.get(alarm_id);
          alarm.shelve();
        }
        return response;
      }
    ));
  }

  /**
   * Shelves and {@link Alarm} with a message
   * @param {string[]} alarms_ids id of the alarm to shelve
   * @param {string} message message of the shelving
   * @returns {json} response of the HTTP request of the shelve
   */
  unshelveAlarms(alarms_ids: string[], message: string): any {
    const data = {
      'alarms_ids': alarms_ids,
    };
    return this.httpClientService.put(BackendUrls.UNSHELVE_API, data).pipe(
    map(
      (response) => {
        if (response['status'] === 200) {
          for (const id of alarms_ids) {
            const alarm = this.get(id);
            alarm.unshelve();
          }
        }
        return response;
      }
    ));
  }

  /******* HANDLING OF ALARM MESSAGES FROM THE CORE *******/

  /**
  * Get the complete list of alarms from the webserver database
   * through the websocket
   */
  getAlarmList() {
    this.webSocketBridge.stream(Streams.UPDATES).send({
      'action': 'list'
    });
  }

  /**
   * Reads an alarm message from the Core and modify the service alarms list
   * depending on the action value.
   * @param {string} action create, update or delete
   * @param {Object} obj dictionary with values for alarm fields (as generic object)
   */
  readAlarmMessage(action: string, obj: Object) {
    if ( action === 'create' || action === 'update' ) {
      const alarm = Alarm.asAlarm(obj);
      this.add_or_update_alarm(alarm);
      this.changeAlarms(alarm.core_id);
    }
  }

  /**
   * Reads a list of alarm messages form the Core and add them to the
   * service alarms list
   * @param {Object[]} alarmsList list of dictionaries with values for alarm fields (as generic objects)
   */
  readAlarmMessagesList(alarmsList: Object[]) {
    for (const obj of alarmsList) {
      const alarm = Alarm.asAlarm(obj);
      this.add_or_update_alarm(alarm);
    }
    this.changeAlarms('all');
    this.canSound = true;
  }

  /**
   * Reads the count by view object received from the webserver
   * @param {Object} countByView
   */
  readCountByViewMessage(countByView: Object) {
    this.countByView = countByView;
  }

  /**
   * Method to clear the count by view if there is the ws connection is closed
   */
  resetCountByView() {
    this.countByView = {};
  }

  /**
   * Adds or updates an {@link Alarm} to the AlarmService
   * @param {Alarm} alarm the {@link Alarm} to add or update
   */
  add_or_update_alarm(alarm: Alarm) {
    let old_alarm_value = Value.cleared;
    let old_alarm_ack = true;
    if (alarm.core_id in this.alarmsIndexes) {
      const old_alarm = this.alarmsArray[this.alarmsIndexes[alarm.core_id]];
      old_alarm_value = old_alarm.value;
      old_alarm_ack = old_alarm.ack;
      this.alarmsArray[this.alarmsIndexes[alarm.core_id]] = alarm;
    } else {
      const newLength = this.alarmsArray.push(alarm);
      this.alarmsIndexes[alarm.core_id] = newLength - 1;
    }
    if (old_alarm_value === Value.cleared && alarm.value !== Value.cleared) {
      if (alarm.sound !== 'NONE') {
        this.playAlarmSound(alarm);
      }
    }
    if (!old_alarm_ack && alarm.ack) {
      if (alarm.sound !== 'NONE') {
        this.clearSoundsIfAck(alarm);
      }
    }
  }

  /**
   * Reproduces the sound of a given {@link Alarm}
   * @param {Alarm} alarm the {@link Alarm}
   */
  playAlarmSound(alarm: Alarm) {
    if (!this.canSound || alarm.shelved) {
      return;
    }
    const repeat = alarm.shouldRepeat();
    if (repeat) {
      this.soundingAlarm = alarm.core_id;
      this.audio.pause();
      this.emitSound(alarm.sound, repeat);
    } else if (this.audio.paused) {
      this.emitSound(alarm.sound, repeat);
    }
  }

  /**
   * Reproduces a sound
   * @param {string} sound the type of sound to reproduce
   * @param {boolean} repeat true if the sound should be repeated, false if not
   */
  emitSound(sound: string, repeat: boolean) {
    // console.log('calling emitSound with: ', sound);
    this.audio = new Audio();
    const soundToPlay = AlarmSounds.getSoundsource(sound);
    if (soundToPlay === null || soundToPlay === '') {
      return;
    }
    this.audio.src = soundToPlay;
    if (repeat) {
      this.audio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
      }, false);
    }
    this.audio.load();
    this.audio.play();
  }

  /**
   * Stops the sound of a given {@link Alarm}, only if the sound is being repeated
   * It is intended to be used when critical alarms (repeated) are acknowledged.
   * Once the sound stops, it check there is another non-acknowledged alarm and plays its sound repeatedly,
   * by calling {@link AlarmService.html#playAlarmSound}
   * @param {Alarm} alarm the {@link Alarm}
   */
  clearSoundsIfAck(alarm: Alarm) {
    if (!alarm.shouldRepeat()) {
      return;
    }
    if (this.soundingAlarm === alarm.core_id) {
      this.audio.pause();
      this.soundingAlarm = null;
      for (alarm of this.alarmsArray) {
        if (!alarm.ack && alarm.sound !== 'NONE' && alarm.shouldRepeat()) {
          this.soundingAlarm = alarm.core_id;
          this.playAlarmSound(alarm);
          return;
        }
      }
    }
  }

  /******* PERIODIC CHECK OF VALIDITY OF ALARMS *******/

  /**
   * Set selected state to alarms under an non-valid connection
   */
  triggerAlarmsNonValidConnectionState() {
    for (const alarm of this.alarmsArray) {
      alarm.validity = Validity.unreliable;
      this.add_or_update_alarm(Alarm.asAlarm(Object.assign({}, alarm)));
    }
    this.changeAlarms('all');
  }

  /**
   * Resets the status connection check timer
   * The timer's period is equal to the broadcastThreshold obtained by {@link CdbService.html#getBroadcastRate}
   */
  resetTimer() {
    if (this.connectionStatusTimer) {
      this.connectionStatusTimer.unsubscribe();
      this.connectionStatusStream.next(true);
    }
    const broadcastThreshold = this.cdbService.getBroadcastThreshold();
    this.connectionStatusTimer = interval(1000 * broadcastThreshold).subscribe( () => {
      this.connectionStatusStream.next(false);
    });
  }
}
