import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { OperationalMode } from '../alarm';

@Component({
  selector: 'app-status-view',
  templateUrl: './status-view.component.html',
  styleUrls: ['./status-view.component.css']
})
export class StatusViewComponent implements ViewCell, OnInit {

  /**
  * Auxiliary list with non principal alarm modes
  */
  secondaryModes = [
    OperationalMode.startup,
    OperationalMode.initialization,
    OperationalMode.closing,
    OperationalMode.shuttedown
  ];

  secondaryModesTags = [];

  alarmTags = [];

  @Input() value: string | number;
  @Input() rowData: any;

  /**
  * Status container style
  */
  getContainerStyle(): object{

    let color: string;
    let background: string;
    let opacity: number;

    if (this.hasTag('maintenance')) {
      color = '#9b9797';
    } else if (this.hasTag('unknown')) {
      color = '#73adf0';
    } else {
      if (this.hasTag('clear')) {
        color = '#95ff95';
      } else if (this.hasTag('set')){
        color = 'red';
      } else {
        color = 'black';  // error
      }
    }

    if (this.hasTag('valid')) {
      background = color;
    } else if (this.hasTag('invalid')){
      background = 'none';
    } else {
      background = 'black';  // error
    }

    if (this.hasSecondaryOperationalModeTag()){
      opacity = 0.5;
    } else {
      opacity = 1.0;
    }

    let styles = {
      'border': `2px solid ${color}`,
      'background': background,
      'opacity': opacity
    }

    return styles;

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
    } else if (this.hasTag('clear')) {
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

  hasSecondaryOperationalModeTag(){
    let found = false;
    for (let tag of this.alarmTags){
      if (this.secondaryModesTags.indexOf(tag) > -1){
        found = true;
      }
    }
    return found;
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
    for (let mode of this.secondaryModes){
      this.secondaryModesTags.push(OperationalMode[mode]);
    }  // TODO: Evaluate refactor to get secondary modes names
  }

}
