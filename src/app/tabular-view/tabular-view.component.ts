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
  dataSource: ElementsDataSource;
  private alarmServiceSubscription: ISubscription;
  public alarmsList: Alarm[] = [];

  constructor(private alarmService: AlarmService) {}

  ngOnInit() {
    this.dataSource = new ElementsDataSource(this.alarmService);
    this.alarmServiceSubscription = this.alarmService.alarmChangeStream.subscribe(notification => {
      let self = this.alarmService.alarms
      this.alarmsList = Object.keys(this.alarmService.alarms).map(function(key){ return self[key]; });
      console.log("AlarmsList: ", this.alarmsList);
      this.dataSource.loadElements(this.alarmsList);
    });
  }

  // applyFilter(filterValue: string) {
  //   filterValue = filterValue.trim(); // Remove whitespace
  //   filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  //   this.dataSource.filter = filterValue;
  // }
}

export class ElementsDataSource implements DataSource<Alarm> {

  private elementsSubject = new BehaviorSubject<Alarm[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(private alarmService: AlarmService) {}

  connect(collectionViewer: CollectionViewer): Observable<Alarm[]> {
      return this.elementsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
      this.elementsSubject.complete();
      this.loadingSubject.complete();
  }

  loadElements(alarms: Alarm[], filter = '',
              sortDirection = 'asc', pageIndex = 0, pageSize = 3) {

    this.loadingSubject.next(true);
    this.elementsSubject.next(alarms);

    // this.alarmService.getObservableOfAlarms(id, filter, sortDirection, pageIndex, pageSize)
    // // .pipe(
    // //   catchError(() => of([])),
    // //   finalize(() => this.loadingSubject.next(false))
    // // )
    // .subscribe(elements => this.elementsSubject.next(elements));
  }
}
