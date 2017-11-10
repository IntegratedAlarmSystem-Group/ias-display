import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { WebSocketBridge } from 'django-channels';
import { environment } from '../environments/environment';
import { Alarm } from './alarm';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AlarmService {

  alarms: {[pk: number]: Alarm } = {};
  private _alarmSource = new BehaviorSubject<{ [pk: number]: Alarm }>(this.alarms);
  alarmsObs = this._alarmSource.asObservable();

  changeAlarms(alarm: { [pk: number]: Alarm }) {
    this._alarmSource.next(alarm);
  }

  constructor() { }

  initialize() {
    const connectionPath = environment.websocketPath;
    console.log("Connecting to " + connectionPath);

    const webSocketBridge = new WebSocketBridge();
    webSocketBridge.connect(connectionPath);
    webSocketBridge.listen(connectionPath);

    webSocketBridge.demultiplex('alarms', (payload, streamName) => {
      // console.log('Received message:, ', payload, streamName);
      let pk = payload['pk'];
      payload.data['pk'] = pk;
      if( payload.action == "create" || payload.action == "update" ){
        this.alarms[pk] = Alarm.asAlarm(payload.data);
      }
      else if( payload.action == "delete"){
        delete this.alarms[pk];
      }
      this.changeAlarms(this.alarms);
    });

    webSocketBridge.socket.addEventListener('open', function() {
      console.log("Connected to WebSocket");
    });
  }


}
