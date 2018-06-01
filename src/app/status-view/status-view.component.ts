import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { OperationalMode } from '../alarm';

@Component({
  selector: 'app-status-view',
  templateUrl: './status-view.component.html',
  styleUrls: ['./status-view.component.css']
})
export class StatusViewComponent implements ViewCell, OnInit {

  alarmTags = [];

  @Input() value: string | number;
  @Input() rowData: any;

  /**
  * Status container style
  */
  getContainerStyle(): any{
    let style = ['alarm-status'];

    if (this.hasTag('maintenance') || this.hasTag('shuttedown')) {
      style.push('status-maintenance');
    } else if (this.hasTag('unknown')) {
      style.push('status-unknown');
    } else {
      if (this.hasTag('cleared')) {
        style.push('status-cleared');
      } else if (this.hasTag('set')){
        style.push('status-set');
      } else {
        style.push('status-error');
      }
    }

    if (this.hasTag('unreliable')) {
      style.push('status-unreliable');
    }

    if (!this.hasTag('ack')) {
      style.push('blink');
    }

    return style;
  }

  /**
  * Status symbol style
  *
  * The alarm should have a 'set' or 'clear' status
  */
  getSymbolStyle(): object{

    let color : string;
    let visibility : string;

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

    let styles = {
      'visibility': visibility,
      'color': color
    };

    return styles;

  }

  hasTag(tag){
    return this.alarmTags.indexOf(tag) > -1 ? true : false;
  }

  ngOnInit(){
    let tags = this.value.toString().split("-");
    if (tags.length >= 2) {
        for (let tag of this.value.toString().split("-")){
          this.alarmTags.push(tag);
        }
    } else {
        this.alarmTags = [];
    }
  }

}
