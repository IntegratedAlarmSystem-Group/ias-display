import { Component, Input, OnInit } from '@angular/core';
import { Alarm, OperationalMode } from '../../data/alarm';
import { DisplayedAlarm, } from '../../data/displayed-alarm';
import { AlarmComponent, AlarmImageSet } from '../../shared/alarm/alarm.component';
import { Assets } from '../../settings';

/**
 * Reusable component to show the state of an alarm
 */
@Component({
  selector: 'app-status-view',
  templateUrl: './status-view.component.html',
  styleUrls: ['./status-view.component.css']
})
export class StatusViewComponent implements OnInit {

  /**
   * Alarm object associated to the component
   */
  @Input() alarm: Alarm;

  /** Dash-separated string with the tags that define the state of an alarm */
  @Input() value: string;

  /** List of tags that define the state of an alarm */
  private alarmTags = [];

  /** Set of alarm icons */
  public alarmIconsSet: AlarmImageSet;

  /** Set of alarm unreliable icons */
  public alarmIconsUnreliableSet: AlarmImageSet;

  /** Set of alarm priority icons */
  public alarmIconsPrioritySet: AlarmImageSet;

  /**
  * Instantiates the component
  */
  constructor() { }

  /**
   * On init it processes the input and push the tags into the {@link alarmTags}
   */
  ngOnInit() {
    this.defineAlarmsAndImages();
  }

  /**
  * Define the alarms that the component should listen to and their respective icons
  */
  defineAlarmsAndImages() {

    /** Set of icons for reliable statuses */
    this.alarmIconsSet = new AlarmImageSet({
      clear: Assets.ICONS + 'clear-valid.svg',
      set_low: Assets.ICONS + 'set-valid-low.svg',
      set_medium: Assets.ICONS + 'set-valid-low.svg',
      set_high: Assets.ICONS + 'set-valid.svg',
      set_critical: Assets.ICONS + 'set-valid.svg',
      unknown: Assets.ICONS + 'clear-valid.svg',
      maintenance: Assets.ICONS + 'clear-valid.svg',
      shelved: Assets.ICONS + 'clear-valid.svg',
    });

    /** Set of icons for unreliable statuses */
    this.alarmIconsUnreliableSet = new AlarmImageSet({
      clear: Assets.ICONS + 'clear-invalid.svg',
      set_low: Assets.ICONS + 'set-invalid-low.svg',
      set_medium: Assets.ICONS + 'set-invalid-low.svg',
      set_high: Assets.ICONS + 'set-invalid.svg',
      set_critical: Assets.ICONS + 'set-invalid.svg',
      unknown: Assets.ICONS + 'clear-invalid.svg',
      maintenance: Assets.ICONS + 'clear-invalid.svg',
      shelved: Assets.ICONS + 'clear-invalid.svg',
    });

    /** Set of icons for priorities */
    this.alarmIconsPrioritySet = new AlarmImageSet({
      clear: Assets.ICONS + 'priority-0.svg',
      set_low: Assets.ICONS + 'priority-1.svg',
      set_medium: Assets.ICONS + 'priority-2.svg',
      set_high: Assets.ICONS + 'priority-3.svg',
      set_critical: Assets.ICONS + 'priority-4.svg',
      unknown: Assets.ICONS + 'priority-0.svg',
      maintenance: Assets.ICONS + 'priority-0.svg',
      shelved: Assets.ICONS + 'priority-0.svg',
    });
  }

}
