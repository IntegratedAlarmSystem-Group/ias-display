import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ISubscription } from "rxjs/Subscription";
import { MatTableDataSource, MatSort } from '@angular/material';
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Alarm, OperationalMode, Validity } from '../alarm';
import { DisplayedAlarm } from '../displayed-alarm';
import { AlarmService } from '../alarm.service';
import { CdbService } from '../cdb.service';


@Component({
  selector: 'app-tabular-view',
  templateUrl: './tabular-view.component.html',
  styleUrls: ['./tabular-view.component.css', './tabular-view.component.scss']
})
export class TabularViewComponent {

  private displayedColumns = ['status', 'name',  'mode', 'timestamp', 'description'];
  private dateFormat = "M/d/yy, h:mm:ss a";
  private dataSource: MatTableDataSource<DisplayedAlarm>;
  private alarmServiceSubscription: ISubscription;
  private cdbServiceSubscription: ISubscription;
  public iasDataAvailable = new BehaviorSubject<any>(false);

  public alarmsList: DisplayedAlarm[] = [];

  public filterPredicate: ((data: DisplayedAlarm, filterString: string) => boolean) = (data: DisplayedAlarm, filterString: string): boolean => {
    const dataStr = data.toStringForFiltering().toLowerCase();
    const filters = filterString.toLowerCase().split(" ");
    for (let filter of filters) {
      if (dataStr.indexOf(filter) == -1){
        return false;
      }
    }
    return true;
  }


  constructor(
    private alarmService: AlarmService,
    private cdbService: CdbService) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.filterPredicate = this.filterPredicate;
    this.cdbServiceSubscription = this.cdbService.iasDataAvailable.subscribe(
      value => {
        this.iasDataAvailable.next(value);
      }
    );
    this.alarmServiceSubscription = this.alarmService.alarmChangeStream.subscribe(notification => {
      let self = this;
      this.alarmsList = Object.keys(this.alarmService.alarms).map(function(key){
        return new DisplayedAlarm(
          self.alarmService.alarms[key],
          self.getAlarmDescription(self.alarmService.alarms[key].core_id));
      });
      this.dataSource.data = this.alarmsList;
    });
  }

  getAlarmDescription(core_id: string) {
    if (this.iasDataAvailable.getValue() === true) {
      return this.cdbService.getAlarmDescription(core_id);
    }
    else {
      return "";
    }
  }

  @ViewChild(MatSort) sort: MatSort;

  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
