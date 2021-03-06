import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, Input } from '@angular/core';
import { MatTableDataSource, MatSort, MatSortable, MatTable, MatPaginator } from '@angular/material';
import { ChangeDetectorRef } from '@angular/core';
import { SubscriptionLike as ISubscription, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Alarm } from '../../data/alarm';
import { AlarmService } from '../../data/alarm.service';
import { Locale } from '../../settings';

/**
* Component that dispays all the Alarms in a table
*
* The user can change the default sorting by clicking on the headers and filter
* by typing in an input field
*/
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy, AfterViewInit {

  /**
  * Array that defines which coulmns are going to be displayed and in which order
  */
  @Input() displayedColumns = ['status', 'name',  'mode', 'timestamp', 'description', 'properties', 'actions'];

  /**
  * Array that defines which alarms are going to be displayed in the table.
  * If it is not specified (empty array by default), all the alarms are shown.
  */
  @Input() alarmsToDisplay = null;

  /**
  * Array that defines the options for the number of element to diplay in each page of the table
  */
  @Input() pageSizeOptions = [12, 25, 50, 100];

  /** Reference to the MatTable, the component that defines the table */
  @ViewChild(MatTable) table: MatTable<Alarm>;

  /** Reference to the MatPaginator, the component that defines the paginator of the table*/
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /** Reference to the MatSort, the component that defines the sorting of the table */
  @ViewChild(MatSort) sort: MatSort;

  /**
  * Defines whether the filter for SET {@link Alarm} is activated or not.
  * When the user writes either "set", " set" or "set " this field becomes true
  * If the user deletes "set" from the input field then this field becomes false
  * This attribute is binded to the state of the toggle slide switch
  * Analogous for the unack and shelved filter,
  * with the keys '"unack"' and '"shelved"' instead.
  */
  public _setFilterActivated = false;

  /**
  * Defines whether the filter for UNACK {@link Alarm} is activated or not.
  */
  public _unackFilterActivated = false;

  /**
  * Defines whether the filter for SHELVED {@link Alarm} is activated or not.
  */
  public _shelvedFilterActivated = false;

  /** String to define the keyword to filter SET {@link Alarm} */
  private filterValueForSetAlarms = 'set';

  /** String to define the keyword to filter UNACK {@link Alarm} */
  private filterValueForUnackAlarms = '"unack"';

  /** String to define the keyword to filter SHELVED {@link Alarm} */
  private filterValueForShelvedAlarms = '"shelved"';

  /** Stream to notify changes in the filter input, in order to update the filter in the table with a debouncet time */
  public filterChange = new Subject<any>();

  /** String that stores the test input in the filter textfield */
  public filterString = '';

  /** String to store the formatting of dates, read form the settings */
  private dateFormat: string;

  /** String to store the timezone to display dates, read from the settings */
  private timezone: string;

  /** DataSource of the Table */
  public dataSource: MatTableDataSource<Alarm>;

  /** Subscription to changes in the Alarms stored in the {@link AlarmService} */
  private alarmServiceSubscription: ISubscription;

  /**
  * Custom function to apply the filtering to the Table rows. Compares a row of the table with the filter values
  * @returns {boolean} true if the row matches the filter, false if not
  */
  public filterPredicate: (
    (data: Alarm, filterString: string) => boolean) = (data: Alarm, filterString: string): boolean => {
    const dataStr = this.alarmToStringForFiltering(data).toLowerCase();
    const filters = filterString.toLowerCase().split(' ');
    for (const filter of filters) {
      if (dataStr.indexOf(filter) === -1) {
        return false;
      }
    }
    return true;
  }

  /**
   * Instantiates the component
   * @param {AlarmService} alarmService Service used to get the Alarms
   * @param {Route} route Reference to the url that triggered the initialization of this component
   * @param {ChangeDetectorRef} cdRef Used for change detection in html
   */
  constructor(
    private alarmService: AlarmService,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef
  ) {}

  /**
   * Create the table when the component is initializated
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
    let filterValue = this.route.snapshot.paramMap.get('filter');
    if (filterValue && filterValue !== '') {
      filterValue = filterValue.replace('_', ' ');
      this.applyFilter(filterValue);
    }
  }

  /** Applies the table's default sorting after its initialization */
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.reloadData();
    this.alarmServiceSubscription = this.alarmService.alarmChangeStream.subscribe( changes => {
      this.reloadData(changes);
    });
    this.filterChange.pipe(debounceTime(200)).subscribe(
      event => {
        if (event.key === 'Escape') {
          this.clearFilter();
        } else {
          this.applyFilter(event.target.value);
        }
      }
    );
  }

  /**
  * Unsubscribes from {@link CdbService} and {@link AlarmService}
  * when the component is destroyed
  */
  ngOnDestroy() {
    this.alarmServiceSubscription.unsubscribe();
  }

  /**
  * Get Data for Table DataSource, triggered whenever alarms are updated in the {@link AlarmService}
  * @param {any} changes the {@link Alarm} that changed, it could be 1 {@link Alarm} or the string 'all' (for all the alarms)
  * @returns {Alarm[]} array of {@link Alarm} objects
  */
  getData(changes: any = ['all']): Alarm[] {
    if (this.alarmsToDisplay === null || this.alarmsToDisplay === undefined) {
      return this.alarmService.alarmsArray;
    }
    let update = false;
    if (changes.length > 0 && changes[0] === 'all') {
      update = true;
    } else {
      for (const change of changes) {
        if (this.alarmsToDisplay.indexOf(change) >= 0) {
          update = true;
          break;
        }
      }
    }
    if (update) {
      const alarms: Alarm[] = [];
      for (const alarm_id of this.alarmsToDisplay) {
        const alarm: Alarm = this.alarmService.get(alarm_id);
        alarms.push(alarm);
      }
      return alarms;
    }
  }

  /**
  * Reloads Data of the Table DataSource, triggered whenever alarms are updated in the {@link AlarmService}
  * @param {any} changes the {@link Alarm} that changed, it could be 1 {@link Alarm} or the string 'all' (for all the alarms)
  */
  reloadData(changes: any = ['all']) {
    const updatedData = this.getData(changes);
    if (updatedData) {
      this.dataSource.data = updatedData;
      this.cdRef.detectChanges();
    }
  }

  /**
  * This function is executed after a key is pressed in the keywords input box
  * If the user pressed "Escape", then the filters are cleared by calling {@link clearFilter}, if not, the filters are applied normally
  * @param {any} event the event that triggered the function
  */
  onKeyUp(event: KeyboardEvent) {
    this.filterChange.next(event);
  }

  /**
  * Clears the filter and applies this empty filtering (i.e. no filtering)
  */
  clearFilter() {
    this.filterString = '';
    this.applyFilter(this.filterString);
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
    // If '"unack"' IS in the array, then it is activated
    if (arrayOfFilters.indexOf(this.filterValueForUnackAlarms) >= 0 ) {
      this._unackFilterActivated = true;
    } else { // If '"unack"' NOT in the field, then it is deactivated
      this._unackFilterActivated = false;
    }
    // If '"shelved"' IS in the array, then it is activated
    if (arrayOfFilters.indexOf(this.filterValueForShelvedAlarms) >= 0 ) {
      this._shelvedFilterActivated = true;
    } else { // If '"shelved"' NOT in the field, then it is deactivated
      this._shelvedFilterActivated = false;
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
  * Toggle the filtering based on selected filter value
  */
  _toggleFilter(filterStatus: boolean, filterValue: string) {

    if (this.filterString == null) {
      this.filterString = '';
    }
    const arrayOfFilters = this.filterString.split(' ');
    const indexOfValue = arrayOfFilters.indexOf(filterValue);

    // If activated then should deactivate:
    if ( filterStatus ) {
      if ( indexOfValue >= 0 ) {
        arrayOfFilters.splice(indexOfValue, 1);
      }
    } else { // If deactivated then should activate:
      if ( indexOfValue < 0 ) {
        arrayOfFilters.push(filterValue);
      }
    }
    this.filterString = arrayOfFilters.join(' ');
    this.applyFilter(this.filterString);

  }

  /**
  * Toggle the filtering for only set {@link Alarm} objects ON/OFF
  */
  toggleFilterSetAlarm() {
    const filterStatus = this._setFilterActivated;
    const filterValue = this.filterValueForSetAlarms;
    this._toggleFilter(filterStatus, filterValue);
  }

  /**
  * Toggle the filtering for only unack {@link Alarm} objects ON/OFF
  */
  toggleFilterUnackAlarm() {
    const filterStatus = this._unackFilterActivated;
    const filterValue = this.filterValueForUnackAlarms;
    this._toggleFilter(filterStatus, filterValue);
  }

  /**
  * Toggle the filtering for only shelved {@link Alarm} objects ON/OFF
  */
  toggleFilterShelvedAlarm() {
    const filterStatus = this._shelvedFilterActivated;
    const filterValue = this.filterValueForShelvedAlarms;
    this._toggleFilter(filterStatus, filterValue);
  }

  /**
  * Returns the filters applied to the Table
  * @returns {string} filters applied
  */
  get filters(): string {
    return this.filterString;
  }

  /**
  * Returns the status of the Toggle for the filters
  * @returns {object} with filters applied by key
  */
  get filtersToggleStatus(): object {
    return {
      'setFilter': this._setFilterActivated,
      'unackFilter': this._unackFilterActivated,
      'shelvedFilter': this._shelvedFilterActivated
    };
  }

  /**
  * Returns a string representation of the {@link Alarm} for filtering purposes
  * @returns {string} info of the {@link Alarm} for filtering purposes, joined by " "
  */
  alarmToStringForFiltering(alarm: Alarm): string {

    const ackKey = alarm.ack ? '"ack"' : '"unack"';
    const shelveKey = alarm.shelved ? '"shelved"' : '"unshelved"';
    const modeKey = `"${alarm.operationalMode}"`;
    const valueKey = `"${alarm.alarmValue}"`;
    const validityKey = `"${alarm.alarmValidity}"`;

    const formattedTimestamp = alarm.formattedTimestamp;

    return [
      alarm.description,
      alarm.name,
      formattedTimestamp,
      ackKey,
      shelveKey,
      modeKey,
      valueKey,
      validityKey
    ].join(' ');
  }
}
