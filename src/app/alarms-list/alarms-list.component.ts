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
  alarms: Alarm[] = [];
  webSocketBridge: WebSocketBridge;

  constructor(private alarmService: AlarmService) {
    this.webSocketBridge = alarmService.connect();
  }

  ngOnInit() {
    // this.alarms = [
    //   new Alarm({
    //     pk:1,
    //     value:0,
    //     mode:'1',
    //     core_id:'ANTENNA_DV1$WVR$AMBIENT_TEMPERATURE',
    //     running_id:'ANTENNA_DV1$WVR$AMBIENT_TEMPERATURE@ATC',
    //     core_timestamp:0
    //   }),
    //   new Alarm({
    //     pk:2,
    //     value:1,
    //     mode:'2',
    //     core_id:'ANTENNA_DV2$WVR$AMBIENT_TEMPERATURE',
    //     running_id:'ANTENNA_DV2$WVR$AMBIENT_TEMPERATURE@ATC',
    //     core_timestamp:0
    //   }),
    //   new Alarm({
    //     pk:3,
    //     value:0,
    //     mode:'3',
    //     core_id:'ANTENNA_DV3$WVR$AMBIENT_TEMPERATURE',
    //     running_id:'ANTENNA_DV3$WVR$AMBIENT_TEMPERATURE@ATC',
    //     core_timestamp:0
    //   })
    // ];
    //console.log('this.alarms = ', this.alarms);
    //let webSocketBridge = this.connect();
    this.appendAlarm(this.webSocketBridge);
    console.log(this.alarms);
  }

  connect() {
    const ws_path = 'ws://127.0.0.1:8000/stream/';
    console.log("Connecting to " + ws_path);

    const webSocketBridge = new WebSocketBridge();
    webSocketBridge.connect(ws_path);
    webSocketBridge.listen(ws_path);
    return webSocketBridge;
  }

  appendAlarm(webSocketBridge) {
    webSocketBridge.demultiplex('alarms', (payload, streamName) => {
      console.log('component, ', payload, streamName);
      this.alarms.push(new Alarm({
        pk:payload.pk,
        value:payload.data.value,
        mode:payload.data.mode,
        core_id:payload.data.core_id,
        running_id:payload.data.running_id,
        core_timestamp:0
      }));
      console.log(this.alarms);
    })
  }

}
