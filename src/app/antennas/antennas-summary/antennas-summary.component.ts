import { Component, OnInit } from '@angular/core';
import { AlarmComponent, AlarmImageSet } from '../../shared/alarm/alarm.component';
import { AlarmService } from '../../data/alarm.service';
import { RoutingService } from '../../data/routing.service';
import { AntennasService } from '../antennas.service';
import { Alarm } from '../../data/alarm';
import { Assets } from '../../settings';

/**
 * Summarized state of the Antennas Arrays
 */
@Component({
  selector: 'app-antennas-summary',
  templateUrl: './antennas-summary.component.html',
  styleUrls: ['./antennas-summary.component.scss']
})
export class AntennasSummaryComponent implements OnInit {

  /**
   * Builds an instance of the component
   * @param {AlarmService} alarmService Service used to get the Alarms
   * @param {RoutingService} routing Service used to redirect to weather specialized views
   */
  constructor(
    private alarmService: AlarmService,
    public antennasService: AntennasService,
    private routing: RoutingService,
  ) { }

  /**
   * Creates the component
   * Subscribes to new alarms from the {@link AlarmService}
   */
  ngOnInit() {
    this.antennasService.initialize();
  }

  /** Returns the instance of the {@link Alarm}
  * @returns {Alarm} the {@link Alarm}
  */
  get alarm(): Alarm {
    return this.alarmService.get(this.antennasService.antennasSummaryConfig);
  }

  /**
   * Redirect to table view applying the specified filter
   * @param filter Space-separated String that contains words used to
   * filter the alarms in the table view
   */
  goToTableFilteredBy(filter: string) {
    this.routing.tableWithFilter(filter);
  }

  /**
   * Redirect to the Antennas View
   */
  redirect() {
    this.routing.goToAntennas();
  }
}
