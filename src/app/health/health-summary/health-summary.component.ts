import { Component, OnInit } from '@angular/core';
import { AlarmImageSet } from '../../shared/alarm/alarm.component';
import { AlarmService } from '../../data/alarm.service';
import { RoutingService } from '../../app-routing/routing.service';
import { HttpClientService } from '../../data/http-client.service';
import { BackendUrls } from '../../settings';
import { Alarm } from '../../data/alarm';
import { AlarmConfig } from '../../data/alarm-config';
import { Assets } from '../../settings';

/**
 * Summarized state of the IAS health
 */
@Component({
  selector: 'app-health-summary',
  templateUrl: './health-summary.component.html',
  styleUrls: ['./health-summary.component.scss']
})
export class HealthSummaryComponent implements OnInit {

  /** Set of icons */
  public iconSet: AlarmImageSet;

  /** Set of Unreliable icons */
  public iconUnreliableSet: AlarmImageSet;

  /** Configuration for displaying the {@link Alarm} */
  public alarmConfig: AlarmConfig[];

  /**
   * Builds an instance of the component
   * @param {AlarmService} alarmService Service used to get the Alarms
   * @param {RoutingService} routing Service used to redirect to weather specialized views
   */
  constructor(
    private alarmService: AlarmService,
    private routing: RoutingService,
    private httpClient: HttpClientService
  ) { }

  /**
   * Creates the component
   * Subscribes to new alarms from the {@link AlarmService}
   */
  ngOnInit() {
    this.loadAlarmsConfig();
    this.defineAlarmsAndIcons();
  }

  /** Returns the instance of the {@link Alarm}
  * @returns {Alarm} the {@link Alarm}
  */
  get alarm(): Alarm {
    if (this.alarmConfig && this.alarmConfig[0]) {
      return this.alarmService.get(this.alarmConfig[0].alarm_id);
    } else {
      return null;
    }
  }

  /**
  * Define the IDs of the alarms that the component should listen to
  */
  loadAlarmsConfig(): void {

    const summary_url = BackendUrls.HEALTH_SUMMARY;
    this.httpClient.get(summary_url).subscribe((response) => {
      for (const key in response) {
        if (key) {
          this.alarmConfig = response as AlarmConfig[];
        }
      }
    });
  }

  /**
  * Define the alarm that the component should listen to and its icons
  */
  defineAlarmsAndIcons() {

    /** Set of icons */
    this.iconSet = new AlarmImageSet({
      clear: Assets.ICONS + 'ias_health-clear-valid.svg',
      set_low: Assets.ICONS + 'ias_health-others-valid.svg',
      set_medium: Assets.ICONS + 'ias_health-others-valid.svg',
      set_high: Assets.ICONS + 'ias_health-critical-valid.svg',
      set_critical: Assets.ICONS + 'ias_health-critical-valid.svg',
      unknown: Assets.ICONS + 'ias_health-clear-valid-unknown.svg',
      maintenance: Assets.ICONS + 'ias_health-clear-valid-maintenance.svg',
      shelved: Assets.ICONS + 'ias_health-clear-valid.svg',
    });

    /** Set of Unreliable icons */
    this.iconUnreliableSet = new AlarmImageSet({
      clear: Assets.ICONS + 'ias_health-clear-invalid.svg',
      set_low: Assets.ICONS + 'ias_health-others-invalid.svg',
      set_medium: Assets.ICONS + 'ias_health-others-invalid.svg',
      set_high: Assets.ICONS + 'ias_health-critical-invalid.svg',
      set_critical: Assets.ICONS + 'ias_health-critical-invalid.svg',
      unknown: Assets.ICONS + 'ias_health-clear-invalid-unknown.svg',
      maintenance: Assets.ICONS + 'ias_health-clear-invalid-maintenance.svg',
      shelved: Assets.ICONS + 'ias_health-clear-valid.svg',
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
