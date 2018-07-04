import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable ,  BehaviorSubject } from 'rxjs';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { WebSocketBridge } from 'django-channels';
import { environment } from '../../environments/environment';
import { Alarm, OperationalMode, Validity } from '../data/alarm';
import { BackendUrls, Streams } from '../settings';
import { CdbService } from '../data/cdb.service';
import { HttpClientService } from './http-client.service';


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
  * Dictionary of {@link Alarm} objects, indexed by their core_ids
  */
  public alarms: {[core_id: string]: Alarm } = {};

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
   * Instantiates the service
   * @param {CdbService} cdbService Service used to get complementary alarm information
   * @param {HttpClientService} httpClientService Service used to perform HTTP requests
   */
  constructor(
    private cdbService: CdbService,
    private httpClientService: HttpClientService,
  ) {
    this.connectionStatusStream.subscribe(
      value => {
        if (value === false) {
          this.triggerAlarmsNonValidConnectionState();
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
    const alarmId = 1;
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
      this.updateLastReceivedMessageTimestamp();
      this.readAlarmMessage(payload.action, payload.data);
    });
    this.webSocketBridge.demultiplex(Streams.UPDATES, (payload, streamName) => {
      // console.log('request', payload);
      this.updateLastReceivedMessageTimestamp();
      this.readAlarmMessagesList(payload.data);
    });
    this.startLastReceivedMessageTimestampCheck();
  }

   /**
   *  Start connection to the backend through websockets
   */
  connect() {
    const connectionPath = environment.websocketPath;
    this.webSocketBridge.connect(connectionPath);
    this.webSocketBridge.listen(connectionPath);
    console.log('Connected to webserver at: ' + connectionPath);
  }

  /******* ALARM HANDLING *******/

  /**
   * Returns an Alarm object
   * @param core_id core_id of the Alarm to return
   * @returns {Alarm} Alarm object corresponding to the given core_id
   */
  get(core_id: string): Alarm {
    return this.alarms[core_id] as Alarm;
  }

  /**
   * Acknowledges a list of Alarms with a message
   * @param alarms list of ids of the alarms to acknowledge
   * @param message message of the acknowledgement
   * @returns {json} response of the HTTP request of the acknowledge
   */
  acknowledgeAlarms(alarms_ids, message) {
    const data = {
      'alarms_ids': alarms_ids,
      'message': message,
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
   * Shelves and Alarm with a message
   * @param alarms id of the alarm to shelve
   * @param message message of the shelving
   * @returns {json} response of the HTTP request of the shelve
   */
  shelveAlarm(alarm_id, message) {
    const data = {
      'alarm_id': alarm_id,
      'message': message,
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
   * Shelves and Alarm with a message
   * @param alarms id of the alarm to shelve
   * @param message message of the shelving
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
   * @param action create, update or delete
   * @param alarm dictionary with values for alarm fields (as generic object)
   */
  readAlarmMessage(action, obj) {
    const alarm = Alarm.asAlarm(obj);
    if ( action === 'create' || action === 'update' ) {
      this.alarms[alarm.core_id] = alarm;
    } else if ( action === 'delete') {
      delete this.alarms[alarm.core_id];
    }
    this.changeAlarms(alarm.core_id);
  }

  /**
   * Reads a list of alarm messages form the Core and add them to the
   * service alarms list
   * @param alarmsList list of dictionaries with values for alarm fields (as generic objects)
   */
  readAlarmMessagesList(alarmsList) {
    for (const obj of alarmsList) {
      const alarm = Alarm.asAlarm(obj);
      this.alarms[alarm.core_id] = alarm;
    }
    this.changeAlarms('all');
  }

  /******* PERIODIC CHECK OF VALIDITY OF ALARMS *******/

  /**
   * Set selected state to alarms under an non-valid connection
   */
  triggerAlarmsNonValidConnectionState() {
    for (const core_id in this.alarms) {
      if (this.alarms.hasOwnProperty(core_id)) {
        this.alarms[core_id]['validity'] = Validity.unreliable;
      }
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

    const MAX_SECONDS_WITHOUT_MESSAGES = pars['refreshRate'] * pars['broadcastFactor'] + 1;

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
