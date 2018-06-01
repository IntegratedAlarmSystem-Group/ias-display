import { Component, Injectable, OnInit, ViewChild, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ISubscription } from "rxjs/Subscription";
import { MatTableDataSource, MatSort, MatSortable } from '@angular/material';
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { ActivatedRoute } from '@angular/router';
import { Alarm, OperationalMode, Validity } from '../alarm';
import { DisplayedAlarm } from '../displayed-alarm';
import { AlarmService } from '../alarm.service';
import { CdbService } from '../cdb.service';


@Component({
  selector: 'app-tabular-view',
  templateUrl: './tabular-view.component.html',
  styleUrls: ['./tabular-view.component.css']
})
export class TabularViewComponent {

  @ViewChild(MatSort) sort: MatSort;
  private filterString: string = null;
  private displayedColumns = ['status', 'name',  'mode', 'timestamp', 'description', 'actions'];
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
      if (dataStr.indexOf(filter) == -1) {
        return false;
      }
    }
    return true;
  }


  constructor(
    private alarmService: AlarmService,
    private cdbService: CdbService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.sort.sort(<MatSortable> {
      id: 'status',
      start: 'asc'
    });
    this.dataSource = new MatTableDataSource();
    this.dataSource.filterPredicate = this.filterPredicate;
    this.cdbServiceSubscription = this.cdbService.iasDataAvailable.subscribe(
      value => {
        this.iasDataAvailable.next(value);
        this.loadTable();
      }
    );
    this.alarmServiceSubscription = this.alarmService.alarmChangeStream.subscribe(notification => {
      this.loadTable();
    });
    this.filterString = this.route.snapshot.paramMap.get('filter');
    if (this.filterString){
      this.applyFilter(this.filterString);
    }
  }

  loadTable() {
    let self = this;
    this.alarmsList = Object.keys(this.alarmService.alarms).map(function(key){
      const dataFromCdb = self.getAlarmDataFromCdbService(self.alarmService.alarms[key].core_id);
      return new DisplayedAlarm(
        self.alarmService.alarms[key],
        dataFromCdb.description,
        dataFromCdb.url
      );
    });
    this.dataSource.data = this.alarmsList;
  }

  getAlarmDataFromCdbService(core_id: string) {
    if (this.iasDataAvailable.getValue() === true) {
      return {
        description: this.cdbService.getAlarmDescription(core_id),
        url: this.cdbService.getAlarmsInformationUrl()
      };
    }
    else {
      return "";
    }
  }

  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
