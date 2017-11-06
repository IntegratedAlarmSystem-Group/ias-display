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

  constructor(private alarmService: AlarmService) { }

  ngOnInit() {
    this.alarmService.initialize();
  }
}
