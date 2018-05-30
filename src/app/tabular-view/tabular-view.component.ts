import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ISubscription } from "rxjs/Subscription";
import { MatTableDataSource } from '@angular/material';
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Alarm, OperationalMode, Validity } from '../alarm';
import { AlarmService } from '../alarm.service';


@Component({
  selector: 'app-tabular-view',
  templateUrl: './tabular-view.component.html',
  styleUrls: ['./tabular-view.component.css']
})
export class TabularViewComponent {

  displayedColumns = ['core_id', 'value', 'validity', 'mode'];
  dataSource: MatTableDataSource<Alarm>;
  private alarmServiceSubscription: ISubscription;
  public alarmsList: Alarm[] = [];

  constructor(private alarmService: AlarmService) {}

  ngOnInit() {
    // this.dataSource = new AlarmsDataSource(this.alarmService);
    this.dataSource = new MatTableDataSource();
    this.alarmServiceSubscription = this.alarmService.alarmChangeStream.subscribe(notification => {
      let self = this.alarmService.alarms;
      this.alarmsList = Object.keys(this.alarmService.alarms).map(function(key){ return self[key]; });
      this.dataSource.data = this.alarmsList;
    });
  }
  //
  // applyFilter(filterValue: string) {
  //   filterValue = filterValue.trim(); // Remove whitespace
  //   filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  //   this.dataSource.filter = filterValue;
  // }
}

// export class AlarmsDataSource extends DataSource<Alarm> {
//
//   private renderData = new BehaviorSubject<Alarm[]>([]);
//   public alarmsList: Alarm[] = [];
//
//   constructor(private alarmService: AlarmService) {
//     super();
//   }
//
//   connect(collectionViewer: CollectionViewer): BehaviorSubject<Alarm[]> {
//       return this.renderData;
//   }
//
//   disconnect(collectionViewer: CollectionViewer): void {
//       this.renderData.complete();
//   }
//
//   loadAlarms(filter = '', sortDirection = 'asc', pageIndex = 0, pageSize = 3) {
//     let self = this.alarmService.alarms;
//     this.alarmsList = Object.keys(this.alarmService.alarms).map(function(key){ return self[key]; });
//     this.renderData.next(this.alarmsList);
//   }
// }
