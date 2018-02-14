import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { WebSocketBridge } from 'django-channels';
import { environment } from '../environments/environment';
import { Alarm, OperationalMode, Validity } from './alarm';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';


/**
* Service that connects and receives {@link Alarm} messages from the
* IAS Webserver through Websockets
*/
@Injectable()
export class AlarmService {

  /**
  * Timestamp related with the last received message
  */
  public lastReceivedMessageTimestamp : number = (new Date).getTime();

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

  /** The "constructor" */
  constructor() {
    this.connectionStatusStream.subscribe(
      value => {
        if (value === false){
          this.triggerAlarmsNonValidConnectionState();
        }
      }
    );
  }

  /**
  * Sends an {@link Alarm} change event
  *
  * @param {Alarm} alarms the updated dictionary of Alarms to notify
  */

  // TODO: Review args to changeAlarms
  changeAlarms(any) {
    this.alarmChangeStream.next(any);
  }

  /**
  * Start connection to the backend through websockets
  */
  initialize() {
    this.connect();
    this.webSocketBridge.socket.addEventListener(
      'open', () => {
        this.connectionStatusStream.next(true);
        this.getAlarmList();
      }
    );
    this.webSocketBridge.demultiplex('alarms', (payload, streamName) => {
      this.updateLastReceivedMessageTimestamp();
      console.log('payload = ', payload);
      this.processAlarm(payload.action, payload.data);
    });
    this.webSocketBridge.demultiplex('requests', (payload, streamName) => {
      this.updateLastReceivedMessageTimestamp();
      this.processAlarmsList(payload.data);
    });
    this.startAlarmListPeriodicalUpdate();
    this.startLastReceivedMessageTimestampCheck();
  }

   /**
   *  Start connection to the backend through websockets
   */
  connect() {
    const connectionPath = environment.websocketPath;
    this.webSocketBridge.connect(connectionPath);
    this.webSocketBridge.listen(connectionPath);
    console.log('Listening on ' + connectionPath);
  }

  /**
   * Get the complete list of alarms from the webserver database
   * through the websocket
   */
  getAlarmList() {
    this.webSocketBridge.stream('requests').send({
      'action': 'list'
    });
  }

  /**
   * Set selected state to alarms under an non-valid connection
   */
  triggerAlarmsNonValidConnectionState() {
    for (let core_id in this.alarms) {
      this.alarms[core_id]['validity'] = Validity.unreliable;
    }
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

    const MAX_SECONDS_WITHOUT_MESSAGES = 2;

    let now = (new Date).getTime();
    let millisecondsDelta;

    millisecondsDelta = now - this.lastReceivedMessageTimestamp;
    if (millisecondsDelta >= 1000 * MAX_SECONDS_WITHOUT_MESSAGES ){
      this.connectionStatusStream.next(false);
    }
  }

  /**
   * Method to update the last received message timestamp
   */
  startLastReceivedMessageTimestampCheck() {
    return IntervalObservable.create(1000 * 2)
      .subscribe(() => {
      this.compareCurrentAndLastReceivedMessageTimestamp();
    });
  }

  /**
   * Method to start a periodical update
   */
  startAlarmListPeriodicalUpdate() {
    return IntervalObservable.create(1000 * 2)
      .subscribe(() => {
      this.getAlarmList();
    });
  }


  /**
   * Process the alarm and modifies the service alarms list depending
   * on the action value.
   * @param action create, update or delete
   * @param alarm dictionary with values for alarm fields
   */
  processAlarm(action, obj) {
    let alarm = Alarm.asAlarm(obj);
    if ( action === 'create' || action === 'update' ) {
      this.alarms[alarm.core_id] = alarm;
    } else if ( action === 'delete') {
      delete this.alarms[alarm.core_id];
    }
    this.changeAlarms(alarm.core_id);
  }

  /**
   * Process a list of alarms and add each one to the service alarms list
   * @param alarmsList list of dictionaries with values for alarm fields
   */
  processAlarmsList(alarmsList) {
    for (let obj of alarmsList) {
      let alarm = Alarm.asAlarm(obj['fields']);
      this.alarms[alarm.core_id] = alarm;
    }
    this.changeAlarms('all');
  }
}
