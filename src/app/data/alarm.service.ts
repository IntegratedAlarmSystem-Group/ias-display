import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable ,  BehaviorSubject } from 'rxjs';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { WebSocketBridge } from 'django-channels';
import { environment } from '../../environments/environment';
import { Alarm, OperationalMode, Validity, Value } from '../data/alarm';
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
  * Django Channels WebsocketBridge,
  * used to connect to Django Channels through Websockets
  */
  private webSocketBridge: WebSocketBridge = new WebSocketBridge();

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
   * Builds an instance of the service
   * @param {CdbService} cdbService Service used to get complementary alarm information
   * @param {HttpClientService} httpClientService Service used to perform HTTP requests
   * @param {AuthService} authService Service used for authentication
   */
  constructor(
    private cdbService: CdbService,
    private httpClientService: HttpClientService,
    private authService: AuthService,
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
  }

  /**
  * Sends an {@link Alarm} change event
  *
  * @param {Any} any the core_id of the updated alarm,
  * or 'all' if all were updated
  */
  changeAlarms(any) {
    this.alarmChangeStream.next(any);
  }

  /******* SERVICE INITIALIZATION *******/

  /**
  * Start connection to the backend through websockets
  */
  initialize() {
    if (this.isInitialized || !this.authService.isLoggedIn()) {
      return;
    }
    this.isInitialized = true;
    this.canSound = false;
    this.audio = new Audio();
    this.connect();
    this.webSocketBridge.socket.addEventListener(
      'open', () => {
        this.connectionStatusStream.next(true);
        /* TODO: Evaluate function for webserver requests */
        this.getAlarmList();
        this.cdbService.initialize();
      }
    );
    this.webSocketBridge.demultiplex(Streams.ALARMS, (payload, streamName) => {
      // console.log('notify ', payload);
      if (this.authService.isLoggedIn()) {
        this.updateLastReceivedMessageTimestamp();
        this.readAlarmMessage(payload.action, payload.data);
      }
    });
    this.webSocketBridge.demultiplex(Streams.UPDATES, (payload, streamName) => {
      // console.log('request', payload);
      if (this.authService.isLoggedIn()) {
        this.updateLastReceivedMessageTimestamp();
        this.readAlarmMessagesList(payload.data);
      }
    });
    this.startLastReceivedMessageTimestampCheck();
  }

  /**
  *  Start connection to the backend through websockets
  */
  connect() {
    const connectionPath = this.getConnectionPath();
    this.webSocketBridge.connect(connectionPath);
    this.webSocketBridge.listen(connectionPath);
    console.log('Connected to webserver at: ' + environment.websocketPath);
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
    }
    this.isInitialized = false;
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
   * Acknowledges a list of Alarms with a message
   * @param alarms list of ids of the alarms to acknowledge
   * @param message message of the acknowledgement
   * @param user user that performs the acknowledgement
   * @returns {json} response of the HTTP request of the acknowledge
   */
  acknowledgeAlarms(alarms_ids, message, user) {
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
   * @returns {json} response of the HTTP request with a dictionary with information about missing acks
   */
  getMissingAcks(alarm_id) {
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
   * @param {int} status id of the target alarm
   * @returns {json} response of the HTTP request with a dictionary with information about missing acks
   */
  getShelveRegistries(alarm_id, status) {
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
   * @returns {json} response of the HTTP request of the shelve
   */
  shelveAlarm(alarm_id, message, timeout) {
    const data = {
      'alarm_id': alarm_id,
      'message': message,
      'timeout': timeout,
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
   * @param {string} alarms_ids id of the alarm to shelve
   * @param {string} message message of the shelving
   * @returns {json} response of the HTTP request of the shelve
   */
  unshelveAlarms(alarms_ids, message) {
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
  readAlarmMessage(action, obj) {
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
  readAlarmMessagesList(alarmsList) {
    for (const obj of alarmsList) {
      const alarm = Alarm.asAlarm(obj);
      this.add_or_update_alarm(alarm);
    }
    this.changeAlarms('all');
    this.canSound = true;
  }

  /**
   * Adds or updates an {@link Alarm} to the AlarmService
   * @param {Alarm} alarm the {@link Alarm} to add or update
   */
  add_or_update_alarm(alarm) {
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
    if (!this.canSound) {
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
    console.log('calling emit with: ', sound);
    this.audio = new Audio();
    this.audio.src = AlarmSounds.getSoundsource(sound);
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
    }
    this.changeAlarms('all');
  }

  /**
   * Method to update the last received message timestamp
   */
  updateLastReceivedMessageTimestamp() {
    this.lastReceivedMessageTimestamp = (new Date()).getTime();
  }

  /**
   * Method to check the last received message timestamp
   * Note: If non-valid, the connection state is non-valid
   * TODO: Review the life cycle of the connection status.
   */
  compareCurrentAndLastReceivedMessageTimestamp() {

    /* Refresh rate parameters */
    let pars;

    /* TODO: Evaluate try exception. Here for debug options. */
    try {
      pars = this.cdbService.getRefreshRateParameters();
    } catch (e) {
      pars = {'refreshRate': 5, 'broadcastFactor': 1};
    }

    const MAX_SECONDS_WITHOUT_MESSAGES = pars['refreshRate'] * pars['broadcastFactor'] + pars['tolerance'];

    const now = (new Date).getTime();
    let millisecondsDelta;

    millisecondsDelta = now - this.lastReceivedMessageTimestamp;
    if (millisecondsDelta >= 1000 * MAX_SECONDS_WITHOUT_MESSAGES ) {
      this.connectionStatusStream.next(false);
    }
  }

  /**
   * Method to update the last received message timestamp
   * @returns {InternalObservable} for notifications to check the last received message
   */
  startLastReceivedMessageTimestampCheck() {
    return IntervalObservable.create(1000 * 10)
      .subscribe(() => {
      this.compareCurrentAndLastReceivedMessageTimestamp();
    });
  }
}
