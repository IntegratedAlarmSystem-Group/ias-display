import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ViewCell , LocalDataSource } from 'ng2-smart-table';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { WebSocketBridge } from 'django-channels';
import { AlarmService } from '../alarm.service';
import { Alarm, OperationalMode, Validity } from '../alarm';

import { ISubscription } from "rxjs/Subscription";

/**
* Component for the graphical alarm status indicator
*
* Note: This component is defined according to the ng2-smart-table component
*/
@Component({
  selector: 'status-view',
  template: `
    <div class="alarm-status" [ngStyle]="getContainerStyle()">
      <span [ngStyle]="getSymbolStyle()"> &#9650;  </span>
    </div>
  `,
  styles: [
    `.alarm-status {
        text-align: center;
        margin: auto;
        width: 65px;
        padding-top: 2px;
        padding-bottom: 2px;
    }`
  ]
})
export class StatusViewComponent implements ViewCell, OnInit {

  /**
  * Auxiliary list with non principal alarm modes
  */
  secondaryModes = [
    OperationalMode.startup,
    OperationalMode.initialization,
    OperationalMode.closing,
    OperationalMode.shuttedown
  ];

  secondaryModesTags = [];

  alarmTags = [];

  @Input() value: string | number;
  @Input() rowData: any;

  /**
  * Status container style
  */
  getContainerStyle(): object{

    let color: string;
    let background: string;
    let opacity: number;

    if (this.hasTag('maintenance')) {
      color = '#9b9797';
    } else if (this.hasTag('unknown')) {
      color = '#73adf0';
    } else {
      if (this.hasTag('clear')) {
        color = '#95ff95';
      } else if (this.hasTag('set')){
        color = 'red';
      } else {
        color = 'black';  // error
      }
    }

    if (this.hasTag('valid')) {
      background = color;
    } else if (this.hasTag('invalid')){
      background = 'none';
    } else {
      background = 'black';  // error
    }

    if (this.hasSecondaryOperationalModeTag()){
      opacity = 0.5;
    } else {
      opacity = 1.0;
    }

    let styles = {
      'border': `2px solid ${color}`,
      'background': background,
      'opacity': opacity
    }

    return styles;

  }

  /**
  * Status symbol style
  *
  * The alarm should have a 'set' or 'clear' status
  */
  getSymbolStyle(): object{

    let color : string;
    let visibility : string;

    if (this.hasTag('set')) {
      visibility = 'visible';
      color = 'white';
    } else if (this.hasTag('clear')) {
      visibility = 'hidden';
      color = 'black';
    } else {
      visibility = 'visible';
      color = 'black';  // error
    }

    let styles = {
      'visibility': visibility,
      'color': color
    };

    return styles;

  }

  hasTag(tag){
    return this.alarmTags.indexOf(tag) > -1 ? true : false;
  }

  hasSecondaryOperationalModeTag(){
    let found = false;
    for (let tag of this.alarmTags){
      if (this.secondaryModesTags.indexOf(tag) > -1){
        found = true;
      }
    }
    return found;
  }

  ngOnInit(){
    let tags = this.value.toString().split("-");
    if (tags.length >= 2) {
        for (let tag of this.value.toString().split("-")){
          this.alarmTags.push(tag);
        }
    } else {
        this.alarmTags = [];
    }
    for (let mode of this.secondaryModes){
      this.secondaryModesTags.push(OperationalMode[mode]);
    }  // TODO: Evaluate refactor to get secondary modes names
  }

}

/**
* Basic component to display alarms
*
* Note: This component is defined according to the ng2-smart-table component
*/
@Component({
  selector: 'app-alarms-table',
  templateUrl: './alarms-table.component.html',
  styleUrls: ['./alarms-table.component.css', './alarms-table.component.scss']
})
export class AlarmsTableComponent implements OnInit, OnDestroy {

  //TODO: Refactor general structure for alarms and components

  /**
  * Variable to follow the subscription of the component to the alarms
  */
  private subscription: ISubscription;

  /**
  * Locasl data source for the alarms table
  */
  source: LocalDataSource;

  /**
  * Auxiliary list used to store the core_ids of alarms,
  * for displaying purposes
  */
  alarmIds = [];

  /**
  * Data table list
  */
  data = [];

  /**
  * Smart table settings
  */
  settings = {
    hideSubHeader: false,
    pager:{
      perPage: 50,
    },
    actions: false,
    columns: {
      status: {
        title: 'Status',
        type: 'custom',
        renderComponent: StatusViewComponent
      },
      core_id: {
        title: 'Monitor Point',
      },
      mode: {
        title: 'Mode'
      }
    }
  };

  /**
  * The "constructor", injects the {@link AlarmService}
  *
  * @param {AlarmService} alarmService An instance of the AlarmService
  */
  constructor(private alarmService: AlarmService, private datePipe: DatePipe){
  }

  /**
  * Function executed when the component is initiated
  *
  * Starts the {@link AlarmService} and subscribes to its messages
  */
  ngOnInit() {
    this.source = new LocalDataSource(this.data);
    this.subscription = this.alarmService.alarmChangeStream.subscribe(notification => {
      this.alarmIds = Object.keys(this.alarmService.alarms);
      this.loadTableData(this.getTableData());  // TODO: Data load evaluation
    });
  }

  /**
  * Function executed when the component is destroyed
  */
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  /**
  * Function to build data according to the smart table format
  */
  getTableData(){
    this.clearTableData();
    for (let core_id of this.alarmIds){
      let item = {
        status: this.getAlarmStatusTagsString(
          this.alarmService.alarms[core_id]
        ),
        timestamp: this.dateFormat(
          this.alarmService.alarms[core_id].getCoreTimestampAsDate()
        ),
        core_id: this.alarmService.alarms[core_id].core_id,
        mode: this.alarmService.alarms[core_id].getModeAsString()
      };
      this.data.push(item);
    }
    return this.data;
  }

  /**
  * Clear data table
  */
  clearTableData(){
    this.data = []; // clear data
  }

  /**
  * Load data in the table
  */
  loadTableData(data){
    this.source.load(data);
  }

  /**
  * Date format
  */
  dateFormat(date){
    let stringDate = this.datePipe.transform(date, 'M/d/yy, h:mm:ss a');
    return stringDate;
  }

  /**
  * Alarm status tags
  */
  getAlarmStatusTagsString(alarm: Alarm): string{

    let tags = [];

    if (alarm.value == 0){
      tags.push('clear');
    } else {
      tags.push('set');
    }

    if (alarm.validity == Validity.reliable){
      tags.push('valid');
    } else {
      tags.push('invalid');
    }

    tags.push(OperationalMode[alarm.mode]);

    return tags.join('-');

  }

}
