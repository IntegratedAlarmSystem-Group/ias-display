import { Injectable } from '@angular/core';
import { WebSocketBridge } from 'django-channels';

@Injectable()
export class AlarmService {

  constructor() { }

  connect() {
    const ws_path = 'ws://127.0.0.1:8000/stream/';
    console.log("Connecting to " + ws_path);

    const webSocketBridge = new WebSocketBridge();
    webSocketBridge.connect(ws_path);
    webSocketBridge.listen(ws_path);

    webSocketBridge.demultiplex('alarms', function(payload, streamName) {
      console.log(payload, streamName);
    });

    webSocketBridge.socket.addEventListener('open', function() {
      console.log("Connected to WebSocket");
    })
  }

}
