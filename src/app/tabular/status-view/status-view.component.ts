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
    const tags = this.value.toString().split('-');
    if (tags.length >= 2) {
        for (const tag of this.value.toString().split('-')) {
          this.alarmTags.push(tag);
        }
    } else {
        this.alarmTags = [];
    }
  }

  /**
  * Return the list of classes that define the main style of the status container
  * @returns {any} list of container classes to apply the style to the component
  */
  getContainerClasses(): any {
    const classes = ['alarm-status'];

    if (this.hasTag('shelved')) {
      classes.push('status-cleared');
      return classes;
    }

    if (this.hasTag('maintenance') || this.hasTag('shuttedown')) {
      classes.push('status-maintenance');
    } else if (this.hasTag('unknown')) {
      classes.push('status-unknown');
    } else {
      if (this.hasTag('cleared')) {
        classes.push('status-cleared');
      } else if (this.hasTag('set')) {
        classes.push('status-set');
      } else {
        classes.push('status-error');
      }
    }

    if (this.hasTag('unreliable')) {
      classes.push('status-unreliable');
    }

    if (!this.hasTag('ack')) {
      classes.push('blink');
    }

    return classes;
  }

  /**
  * Return the status symbol style used to represent if the alarm is SET or
  * CLEARED
  * @returns {object} the style for the symbol
  */
  getSymbolStyle(): object {

    let color: string;
    let visibility: string;

    if (this.hasTag('shelved')) {
      visibility = 'hidden';
      color = 'black';
    } else if (this.hasTag('set')) {
      visibility = 'visible';
      color = 'white';
    } else if (this.hasTag('cleared')) {
      visibility = 'hidden';
      color = 'black';
    } else {
      visibility = 'visible';
      color = 'black';  // error
    }

    const style = {
      'visibility': visibility,
      'color': color
    };

    return style;
  }

  /**
   * Method to search if the component contains an specific tag
   * @param {string} tag String of the searched tag
   * @returns {boolean} true if it has the tag, false if not
   */
  private hasTag(tag): boolean {
    return this.alarmTags.indexOf(tag) > -1 ? true : false;
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
