import { Component, OnInit} from '@angular/core';
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
  alarmPks = [];

  // @Input alarms;

  constructor(private alarmService: AlarmService) { }

  ngOnInit() {
    this.alarmService.initialize();
    this.alarmService.alarmsObs.subscribe(alarms => {
      this.alarmPks = Object.keys(alarms);
    });
    console.log('***** Change!! **** ', this.alarmPks);
  }

  ngOnChanges() {
    this.alarmPks = Object.keys(this.alarmService.alarms);
    console.log('***** Change!! **** ', this.alarmPks);
  }
}
