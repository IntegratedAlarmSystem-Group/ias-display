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
  * Dictionary of {@link Alarm} objects, indexed by their primary keys
  */
  public alarms: {[pk: number]: Alarm } = {};

  /**
  * Stream of alarms to notify changes
  * of the dictionary of {@link Alarm} objects
  */
  public alarmStream = new BehaviorSubject<{ [pk: number]: Alarm }>(this.alarms);

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
    this.alarmStream.next(alarms);
  }

  /**
  * Start connection to the backend through websockets
  */
  initialize() {

    this.connect();

    this.webSocketBridge.demultiplex('alarms', (payload, streamName) => {
      console.log('payload = ', payload);
      this.processAlarm(payload.pk, payload.action, payload.data);
    });
    this.webSocketBridge.demultiplex('requests', (payload, streamName) => {
      this.processAlarms(payload.data);
    });
    this.webSocketBridge.socket.addEventListener(
      'open', () => this.getAlarmList()
    );

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
   * @param alarmList list of dictionaries with values for alarm fields
   */
  processAlarms(alarmList) {
    for (let alarm of alarmList) {
      const pk = alarm['pk'];
      this.alarms[pk] = Alarm.asAlarm(alarm['fields'], pk);
    }
    this.changeAlarms(this.alarms);
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

}
