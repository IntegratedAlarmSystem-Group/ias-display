import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { WebSocketBridge } from 'django-channels';
import { AlarmService } from '../alarm.service';
import { Alarm } from '../alarm';

@Component({
  selector: 'app-alarms-list',
  templateUrl: './alarms-list.component.html',
  styleUrls: ['./alarms-list.component.css']
})
export class AlarmsListComponent implements OnInit {
  //TODO: Refactor general structure for alarms and components
  alarms: Alarm[];

  constructor(private alarmService: AlarmService) {

  }

  ngOnInit() {
    this.alarms = [
      new Alarm({
        pk:1,
        value:0,
        mode:'1',
        core_id:'ANTENNA_DV1$WVR$AMBIENT_TEMPERATURE',
        running_id:'ANTENNA_DV1$WVR$AMBIENT_TEMPERATURE@ATC',
        core_timestamp:0
      }),
      new Alarm({
        pk:2,
        value:1,
        mode:'2',
        core_id:'ANTENNA_DV2$WVR$AMBIENT_TEMPERATURE',
        running_id:'ANTENNA_DV2$WVR$AMBIENT_TEMPERATURE@ATC',
        core_timestamp:0
      }),
      new Alarm({
        pk:3,
        value:0,
        mode:'3',
        core_id:'ANTENNA_DV3$WVR$AMBIENT_TEMPERATURE',
        running_id:'ANTENNA_DV3$WVR$AMBIENT_TEMPERATURE@ATC',
        core_timestamp:0
      })
    ];
    console.log('this.alarms = ', this.alarms);
    this.connect();
  }

  connect() {
    const ws_path = 'ws://127.0.0.1:8000/stream/';
    console.log("Connecting to " + ws_path);

    const webSocketBridge = new WebSocketBridge();
    webSocketBridge.connect(ws_path);
    webSocketBridge.listen(ws_path);
    let alarm = webSocketBridge.demultiplex('alarms', function(payload, streamName): Observable<Alarm> {
      console.log(payload, streamName);
      let alarm = Alarm.asAlarm(payload.data);
      console.log('Alarm = ', alarm);
      return Observable.of(alarm);
    }).subscribe(resp => {
      console.log('Outside Alarm = ', resp);
    });


    webSocketBridge.socket.addEventListener('open', function() {
      console.log("Connected to WebSocket");
    });
  }

}
