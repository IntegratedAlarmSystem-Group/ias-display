import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ViewCell , LocalDataSource } from 'ng2-smart-table';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { WebSocketBridge } from 'django-channels';
import { AlarmService } from '../alarm.service';
import { Alarm, OperationalMode, Validity } from '../alarm';
import { ISubscription } from "rxjs/Subscription";
import { StatusViewComponent } from '../status-view/status-view.component';

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
