import { Component, Injectable, OnInit, ViewChild, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { Observable ,  BehaviorSubject ,  SubscriptionLike as ISubscription } from 'rxjs';
import { MatTableDataSource, MatSort, MatSortable, MatTable } from '@angular/material';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { ActivatedRoute } from '@angular/router';
import { Alarm, OperationalMode, Validity } from '../../data/alarm';
import { DisplayedAlarm } from '../../data/displayed-alarm';
import { AlarmService } from '../../data/alarm.service';
import { CdbService } from '../../data/cdb.service';
import { Locale } from '../../settings';

/**
* Component that dispays all the Alarms in a table
*
* The user can change the default sorting by clicking on the headers and filter
* by typing in an input field
*/
@Component({
  selector: 'app-tabular-view',
  templateUrl: './tabular-view.component.html',
  styleUrls: ['./tabular-view.component.css', './tabular-view.component.scss']
})
export class TabularViewComponent implements OnInit, OnDestroy, AfterViewInit {

  /** Reference to the MatTable, the component that defines the table */
  @ViewChild(MatTable) table: MatTable<DisplayedAlarm>;

  /** Reference to the MatSort, the component that defines the sorting of the table */
  @ViewChild(MatSort) sort: MatSort;

  /**
  * Defines wether the filter for only SET {@link Alarm} is activated or not.
  * When the user writes either "set", " set" or "set " this field becomes true
  * If the user deletes "set" from the input field then this field becomes false
  * This attribute is binded to the state of the toggle slide switch
  */
  public _setFilterActivated = false;

  /** String that stores the test input in the filter textfield */
  public filterString = '';

  /**
  * Array that defines which coulmns are going to be displayed and in which order
  */
  public displayedColumns = ['status', 'name',  'mode', 'timestamp', 'description', 'actions'];

  /** String to store the formatting of dates, read form the settings */
  private dateFormat: string;

  /** String to store the timezone to display dates, read from the settings */
  private timezone: string;

  /** String to define the keyword to filter SET {@link Alarm} */
  private filterValueForSetAlarms = 'set';

  /** DataSource of the Table */
  public dataSource: MatTableDataSource<DisplayedAlarm>;

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

  /**
  * Custom function to apply the filtering to the Table rows. Compares a row of the table with the filter values
  * @returns {boolean} true if the row matches the filter, false if not
  */
  public filterPredicate: (
    (data: DisplayedAlarm, filterString: string) => boolean) = (data: DisplayedAlarm, filterString: string): boolean => {
    const dataStr = data.toStringForFiltering().toLowerCase();
    const filters = filterString.toLowerCase().split(' ');
    for (const filter of filters) {
      if (dataStr.indexOf(filter) === -1) {
        return false;
      }
    }
    return true;
  }

  /**
   * Instantiates the service
   * @param {AlarmService} alarmService Service used to get the Alarms
   * @param {CdbService} cdbService Service used to get complementary alarm information
   * @param {Route} route Reference to the url that triggered the initialization
   * of this component
   */
  constructor(
    private alarmService: AlarmService,
    private cdbService: CdbService,
    private route: ActivatedRoute
  ) {}

  /**
   * Create the table when the component is initializated
   * Subscribes to IAS configuration information from the {@link CdbService}
   * Subscribes to new alarms from the {@link AlarmService}
   * Retrieves filter values passed by the URL and applies them to the table
   */
  ngOnInit() {
    this.dateFormat = Locale.DATE_FORMAT;
    this.timezone = Locale.TIMEZONE;
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
    if (filterValue && filterValue !== '') {
      filterValue = filterValue.replace('_', ' ');
      this.applyFilter(filterValue);
    }
  }

  /** Applies the table's default sorting after its initialization */
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  /**
  * Unsubscribes from {@link CdbService} and {@link AlarmService}
  * when the component is destroyed
  */
  ngOnDestroy() {
    this.cdbServiceSubscription.unsubscribe();
    this.alarmServiceSubscription.unsubscribe();
  }


  /**
  * Loads the table with data from {@link CdbService} and {@link AlarmService}
  */
  loadTable() {
    const self = this;
    this.alarmsList = Object.keys(this.alarmService.alarms).map(function(key) {
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
        url: this.cdbService.getAlarmsInformationUrl(core_id)
      };
    } else {
      return {
        description: '',
        url: ''
      };
    }
  }

  /**
  * Applies the filter ot the Table
  * @param {string} filterValue the string containing keywords for filtering
  */
  applyFilter(filter: string) {
    this.filterString = filter;
    const arrayOfFilters = filter.split(' ');
    // If "set" IS in the array, then it is activated
    if (arrayOfFilters.indexOf(this.filterValueForSetAlarms) >= 0 ) {
      this._setFilterActivated = true;

    } else { // If "set" NOT in the field, then it is deactivated
      this._setFilterActivated = false;
    }
    filter = filter.trim();
    filter = filter.toLowerCase();
    this.dataSource.filter = filter;
  }

  /**
  * Toggle the filtering for only set {@link Alarm} objects ON/OFF
  */
  toggleFilterOnlySetAlarm() {
    if (this.filterString == null) {
      this.filterString = '';
    }
    const arrayOfFilters = this.filterString.split(' ');
    const indexOfSet = arrayOfFilters.indexOf(this.filterValueForSetAlarms);

    // If activated then should deactivate:
    if (this._setFilterActivated) {
      if ( indexOfSet >= 0 ) {
        arrayOfFilters.splice(indexOfSet, 1);
      }
    } else { // If deactivated then should activate:
      if ( indexOfSet < 0 ) {
        arrayOfFilters.push(this.filterValueForSetAlarms);
      }
    }
    this.filterString = arrayOfFilters.join(' ');
    this.applyFilter(this.filterString);
  }

  /**
  * Returns the filters applied to the Table
  * @returns {string} filters applied
  */
  get filters(): string {
    return this.filterString;
  }

  /**
  * Returns the status of the Toggle for the filtering of set Alarms
  * @returns {boolean} filters applied
  */
  get toggleStatus(): boolean {
    return this._setFilterActivated;
  }
}
