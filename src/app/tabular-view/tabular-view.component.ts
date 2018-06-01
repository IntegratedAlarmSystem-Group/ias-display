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
  styleUrls: ['./tabular-view.component.css', './tabular-view.component.scss']
})
export class TabularViewComponent {

  @ViewChild(MatSort) sort: MatSort;

  // TODO: Bind this with the state of the slide-toggle-switcher when we replace the button
  /**
  * Defines wether the filter for only SET {@link Alarm} is activated or not.
  * When the user writes either "set", " set" or "set " this field becomes true
  * If the user deletes "set" from the input field then this field becomes false
  * This attribute is binded to the state of the toggle slide switch
  */
  private _setFilterActivated = false;

  /** String that stores the test input in the filter textfield */
  private filterString: string = "";

  /**
  * Array that defines which coulmns are going to be displayed and in which order
  */
  private displayedColumns = ['status', 'name',  'mode', 'timestamp', 'description', 'actions'];

  /** String to define the formatting of dates */
  private dateFormat = "M/d/yy, h:mm:ss a";

  /** String to define the keyword to filter SET {@link Alarm} */
  private filterValueForSetAlarms = 'set';

  /** DataSource of the Table */
  private dataSource: MatTableDataSource<DisplayedAlarm>;

  /** Subscription to changes in the Alarms stored in the {@link AlarmService} */
  private alarmServiceSubscription: ISubscription;

  /** Subscription to changes in the Alarms stored in the {@link AlarmService} */
  private cdbServiceSubscription: ISubscription;

  /**
  * Subscription to be notified when there is data available from the
  * IAS Table in the  {@link CdbService}
  */
  public iasDataAvailable = new BehaviorSubject<any>(false);

  /** List of {@link DisplayedAlarm} objects */
  public alarmsList: DisplayedAlarm[] = [];

  /** Function to apply the filtering */
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

  /** The Constructor */
  constructor(
    private alarmService: AlarmService,
    private cdbService: CdbService,
    private route: ActivatedRoute) {}

  /** Method executed when the component is initiated */
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
    let filterValue = this.route.snapshot.paramMap.get('filter');
    if (filterValue && filterValue != ""){
      this.applyFilter(filterValue);
    }
  }

  /** Method executed after the component is initiated */
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  /** Load the table with data */
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

  /**
  * Gets data (short description and url) from the {@link CdbService}
  * for a given {@link Alarm}
  * @param {string} core_id the core_id of the {@link Alarm} for which to retriev info,
  * @returns {JSON} A JSON with 2 key: description and url
  */
  getAlarmDataFromCdbService(core_id: string) {
    if (this.iasDataAvailable.getValue() === true) {
      return {
        description: this.cdbService.getAlarmDescription(core_id),
        url: this.cdbService.getAlarmsInformationUrl()
      };
    }
    else {
      return {
        description: "",
        url: ""
      };
    }
  }

  /**
  * Applies the filter ot the Table
  * @param {string} filterValue the string containing keywords for filtering
  */
  applyFilter(filterValue: string) {
    this.filterString = filterValue;
    // If "set" IS in the field, then it is activated
    if (this.filterString.indexOf(this.filterValueForSetAlarms) >= 0 ) {
      this._setFilterActivated = true;
    }
    // If "set" NOT in the field, then it is deactivated
    else {
      this._setFilterActivated = false;
    }
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  /**
  * Toggle the filtering for only set {@link Alarm} objects ON/OFF
  */
  toggleFilterOnlySetAlarm() {
    // this._setFilterActivated = !this._setFilterActivated;
    if (this.filterString == null) {
      this.filterString = "";
    }
    let filterValue1 = " " + this.filterValueForSetAlarms;
    let filterValue2 = this.filterValueForSetAlarms + " ";

    // If activated then should deactivate:
    if (this._setFilterActivated) {
      // Case when field contains exactly "set":
      if (this.filterString.length == this.filterValueForSetAlarms.length &&
          this.filterString.indexOf(this.filterValueForSetAlarms) >= 0
      ){
        this.filterString = this.filterString.replace(this.filterValueForSetAlarms, "");
      }
      // Case when field contains exactly " set":
      else if( this.filterString.indexOf(filterValue1) >= 0 ) {
        this.filterString = this.filterString.replace(filterValue1, "");
      }
      // Case when field contains exactly "set ":
      else if (this.filterString.indexOf(filterValue2) >= 0 ) {
        this.filterString = this.filterString.replace(filterValue2, "");
      }

    // If deactivated then should activate:
    } else {
      if( this.filterString.indexOf(filterValue1) < 0 &&
          this.filterString.indexOf(filterValue2) < 0
      ) {
        this.filterString =  this.filterString + filterValue1;
      }
    }
    this.applyFilter(this.filterString);
  }
}
