import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject , SubscriptionLike as ISubscription } from 'rxjs';
import { AlarmComponent, AlarmImageSet } from '../alarm/alarm.component';
import { AlarmService } from '../alarm.service';
import { RoutingService } from '../routing.service';
import { Alarm } from '../alarm';
import { Assets } from '../settings';

/**
 * Summarized state of the IAS health
 */
@Component({
  selector: 'app-ias-health-overview',
  templateUrl: './ias-health-overview.component.html',
  styleUrls: ['./ias-health-overview.component.css']
})
export class IasHealthOverviewComponent implements OnInit, OnDestroy {

  /** Set of icons */
  public iconSet: AlarmImageSet;

  /** Alarm */
  public alarm: Alarm;

  /** ID of the Alarm */
  public alarmId: string;

  /** Subscription to changes in the Alarms stored in the {@link AlarmService} */
  private alarmServiceSubscription: ISubscription;

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
    this.alarmServiceSubscription = this.alarmService.alarmChangeStream.subscribe(notification => {
      if (notification === 'all' || notification === this.alarmId) {
        this.alarm = this.alarmService.get(this.alarmId);
      }
    });
  }

  /**
  * Unsubscribes from  {@link AlarmService} when the component is destroyed
  */
  ngOnDestroy() {
    this.alarmServiceSubscription.unsubscribe();
  }

  /**
  * Define the alarm that the component should listen to and its icons
  */
  defineAlarmsAndIcons() {
    /** Set of Humidity icons */
    this.alarmId = 'Alarmdummy';

    this.iconSet = new AlarmImageSet({
      clear: Assets.ICONS + 'lifeline-ok.svg',
      set_low: Assets.ICONS + 'lifeline-error.svg',
      set_medium: Assets.ICONS + 'lifeline-error.svg',
      set_high: Assets.ICONS + 'lifeline-error.svg',
      set_critical: Assets.ICONS + 'lifeline-error.svg',
      unknown: Assets.ICONS + 'lifeline-ok.svg',
      maintenance: Assets.ICONS + 'lifeline-ok.svg',
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
