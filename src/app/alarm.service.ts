import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { WebSocketBridge } from 'django-channels';

@Injectable()
export class AlarmService {

  constructor() { }

  connect(): Observable<any> {
    const ws_path = 'ws://127.0.0.1:8000/stream/';
    console.log("Connecting to " + ws_path);

    const webSocketBridge = new WebSocketBridge();
    webSocketBridge.connect(ws_path);
    webSocketBridge.listen(ws_path);
    return webSocketBridge;
    // const ws_path = 'ws://127.0.0.1:8000/stream/';
    // console.log("Connecting to " + ws_path);
    //
    // const webSocketBridge = new WebSocketBridge();
    // webSocketBridge.connect(ws_path);
    // webSocketBridge.listen(ws_path);
    //
    // let payload = webSocketBridge.demultiplex('alarms', function(payload, streamName) {
    //   console.log('Service, ', payload, streamName);
    //   return payload;
    // });
    //
    // webSocketBridge.socket.addEventListener('open', function() {
    //   console.log("Connected to WebSocket");
    // });
    // return payload;
  }

}
