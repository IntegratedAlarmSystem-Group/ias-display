import { Component, OnInit } from '@angular/core';
import { AlarmComponent, AlarmImageSet } from '../../shared/alarm/alarm.component';
import { AlarmService } from '../../data/alarm.service';
import { RoutingService } from '../../data/routing.service';
import { Alarm } from '../../data/alarm';
import { Assets } from '../../settings';

/**
 * Summarized state of the IAS health
 */
@Component({
  selector: 'app-health-summary',
  templateUrl: './health-summary.component.html',
  styleUrls: ['./health-summary.component.css']
})
export class HealthSummaryComponent implements OnInit {

  /** Set of icons */
  public iconSet: AlarmImageSet;

  /** Set of Unreliable icons */
  public iconUnreliableSet: AlarmImageSet;

  /** ID of the Alarm */
  public alarmId: string;

  /**
   * Builds an instance of the component
   * @param {AlarmService} alarmService Service used to get the Alarms
   * @param {RoutingService} routing Service used to redirect to weather specialized views
   */
  constructor(
    private alarmService: AlarmService,
    private routing: RoutingService,
  ) { }

  /**
   * Creates the component
   * Subscribes to new alarms from the {@link AlarmService}
   */
  ngOnInit() {
    this.defineAlarmsAndIcons();
  }

  /** Returns the instance of the {@link Alarm}
  * @returns {Alarm} the {@link Alarm}
  */
  get alarm(): Alarm {
    return this.alarmService.get(this.alarmId);
  }

  /**
  * Define the alarm that the component should listen to and its icons
  */
  defineAlarmsAndIcons() {
    this.alarmId = 'IAS-Health-Global';

    /** Set of icons */
    this.iconSet = new AlarmImageSet({
      clear: Assets.ICONS + 'ias_health-valid-clear.svg',
      set_low: Assets.ICONS + 'ias_health-valid-low.svg',
      set_medium: Assets.ICONS + 'ias_health-valid-low.svg',
      set_high: Assets.ICONS + 'ias_health-valid-critical.svg',
      set_critical: Assets.ICONS + 'ias_health-valid-critical.svg',
      unknown: Assets.ICONS + 'ias_health-valid-unkn.svg',
      maintenance: Assets.ICONS + 'ias_health-valid-maint.svg',
      shelved: Assets.ICONS + 'ias_health-valid-clear.svg',
    });

    /** Set of Unreliable icons */
    this.iconUnreliableSet = new AlarmImageSet({
      clear: Assets.ICONS + 'ias_health-invalid-clear.svg',
      set_low: Assets.ICONS + 'ias_health-invalid-low.svg',
      set_medium: Assets.ICONS + 'ias_health-invalid-low.svg',
      set_high: Assets.ICONS + 'ias_health-invalid-critical.svg',
      set_critical: Assets.ICONS + 'ias_health-invalid-critical.svg',
      unknown: Assets.ICONS + 'ias_health-invalid-unkn.svg',
      maintenance: Assets.ICONS + 'ias_health-invalid-maint.svg',
      shelved: Assets.ICONS + 'ias_health-invalid-clear.svg',
    });
  }

  /**
   * Redirect to table view applying the specified filter
   * @param filter Space-separated String that contains words used to
   * filter the alarms in the table view
   */
  goToTableFilteredBy(filter: string) {
    this.routing.tableWithFilter(filter);
  }
}