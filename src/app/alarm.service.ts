import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { WebSocketBridge } from 'django-channels';
import { environment } from '../environments/environment';
import { Alarm } from './alarm';

@Injectable()
export class AlarmService {

  alarms: Alarm[] = [];

  constructor() { }

  initialize() {
    const connectionPath = environment.websocketPath;
    console.log("Connecting to " + connectionPath);

    const webSocketBridge = new WebSocketBridge();
    webSocketBridge.connect(connectionPath);
    webSocketBridge.listen(connectionPath);

    webSocketBridge.demultiplex('alarms', (payload, streamName) => {
      console.log('Received message:, ', payload, streamName);
      let pk = payload['pk'];
      payload.data['pk'] = pk;
      // this.alarms[pk] = Alarm.asAlarm(payload.data);
      this.alarms.push(Alarm.asAlarm(payload.data));
      // console.log(this.alarms);
    });

    webSocketBridge.socket.addEventListener('open', function() {
      console.log("Connected to WebSocket");
    });
  }

}
