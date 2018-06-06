import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { OperationalMode } from '../alarm';

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
   * Dash-separated string with the tags that define the state of an alarm
   */
  @Input() value: string;

  /**
   * List of tags that define the state of an alarm
   */
  private alarmTags = [];

  /**
  * Instantiates the component
  */
  constructor() { }

  /**
   * On init it processes the input and push the tags into the {@link alarmTags}
   */
  ngOnInit() {
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

    if (this.hasTag('set')) {
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

}
