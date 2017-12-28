import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { WebSocketBridge } from 'django-channels';
import { environment } from '../environments/environment';
import { Alarm } from './alarm';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

/**
* Service that connects and receives {@link Alarm} messages from the
* IAS Webserver through Websockets
*/
@Injectable()
export class AlarmService {

  /**
  * Status of the WebsocketBridge connection
  */
  public bridgeStatus = "invalid";

  /**
  * Dictionary of {@link Alarm} objects, indexed by their primary keys
  */
  public alarms: {[pk: number]: Alarm } = {};

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
  constructor() { }

  /**
  * Sends an {@link Alarm} change event
  *
  * @param {Alarm} alarms the updated dictionary of Alarms to notify
  */
  changeAlarms(alarms: { [pk: number]: Alarm }) {
    this.alarmChangeStream.next(true);
  }

  /**
  * Start connection to the backend through websockets
  */
  initialize() {
    this.connect();
    this.webSocketBridge.socket.addEventListener(
      'open', () => {
        this.bridgeStatus = "valid";
        this.getAlarmList();
      }
    );
    this.webSocketBridge.demultiplex('alarms', (payload, streamName) => {
      console.log('payload = ', payload);
      this.processAlarm(payload.pk, payload.action, payload.data);
    });
    this.webSocketBridge.demultiplex('requests', (payload, streamName) => {
      this.processAlarmsList(payload.data);
    });
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
   * Process the alarm and modifies the service alarms list depending
   * on the action value.
   * @param pk Id of the alarm in the web server database
   * @param action create, update or delete
   * @param alarm dictionary with values for alarm fields
   */
  processAlarm(pk, action, alarm) {
    if ( action === 'create' || action === 'update' ) {
      this.alarms[pk] = Alarm.asAlarm(alarm, pk);
    } else if ( action === 'delete') {
      delete this.alarms[pk];
    }
    this.changeAlarms(this.alarms);
  }

  /**
   * Process a list of alarms and add each one to the service alarms list
   * @param alarmsList list of dictionaries with values for alarm fields
   */
  processAlarmsList(alarmsList) {
    for (let alarm of alarmsList) {
      const pk = alarm['pk'];
      this.alarms[pk] = Alarm.asAlarm(alarm['fields'], pk);
    }
    this.changeAlarms(this.alarms);
  }
}
