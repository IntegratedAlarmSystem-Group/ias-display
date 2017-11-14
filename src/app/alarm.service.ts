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
  alarms: {[pk: number]: Alarm } = {};

  /**
  * Private attribute that defines the source of a stream to notify changes
  * to the dictionary of {@link Alarm} objects
  */
  private _alarmSource = new BehaviorSubject<{ [pk: number]: Alarm }>(this.alarms);

  /**
  * Observable used to subscribe to changes in the dictionary of
  * {@link Alarm} objects
  *
  * It is created from the _alarmSource attribute
  */
  alarmsObs = this._alarmSource.asObservable();

  /** The "constructor" */
  constructor() { }

  /**
  * Sends an {@link Alarm} change event
  *
  * @param {Alarm} alarms the updated dictionary of Alarms to notify
  */
  changeAlarms(alarms: { [pk: number]: Alarm }) {
    this._alarmSource.next(alarms);
  }

  /**
  * Start connection to the backend through websockets
  */
  initialize() {
    const connectionPath = environment.websocketPath;
    console.log('Connecting to ' + connectionPath);

    const webSocketBridge = new WebSocketBridge();
    webSocketBridge.connect(connectionPath);
    webSocketBridge.listen(connectionPath);

    webSocketBridge.demultiplex('alarms', (payload, streamName) => {
      // console.log('Received message:, ', payload, streamName);
      const pk = payload['pk'];
      payload.data['pk'] = pk;
      if ( payload.action === 'create' || payload.action === 'update' ) {
        this.alarms[pk] = Alarm.asAlarm(payload.data);
      } else if ( payload.action === 'delete') {
        delete this.alarms[pk];
      }
      this.changeAlarms(this.alarms);
    });

    webSocketBridge.socket.addEventListener('open', function() {
      console.log('Connected to WebSocket');
      webSocketBridge.stream('alarms').send({
        "pk": 350,
        "action": "update",
        "data": {
          "mode": 0,
        }
      });
      // webSocketBridge.stream('alarms').send({
      //   "action": "create",
      //   "data": {
      //     "mode": 0,
      //     "value": 2,
      //     "core_id": "core_iddddd",
      //     "running_id": "running_iddddd",
      //     "core_timestamp": 666,
      //   }
      // });
      // webSocketBridge.stream('alarms').send({
      //   "action": "delete",
      //   "pk": 339,
      // });
    });
  }
}
