import { Component, OnInit, Input } from '@angular/core';
import { Alarm, Value } from '../data/alarm';
import { AlarmImageSet } from '../shared/alarm/alarm.component';
import { Assets } from '../settings';

/**
* Main component to display some Angular Material Elements.
* Useful to check how the application would look if it includes those elements
*/
@Component({
  selector: 'app-material-sandbox',
  templateUrl: './material-sandbox.components.html',
  styleUrls: ['./material-sandbox.components.scss']
})
export class MaterialSandboxComponent {

}

/**
* Component that displays color palletes for Angular Material Elements.
*/
@Component({
  selector: 'app-material-colors',
  template: `
    <div class="title">{{palette}}</div>
    <div fxLayout="row wrap" class="panels">
      <span *ngFor="let item of this.palettes[palette]" id={{item[0]}}>
        {{item[1]}}
      </span>
    </div>
  `,
  styleUrls: ['./material-sandbox.components.scss']
})
export class MaterialColorsComponent {

  /**
  * List of grouped pairs (materialId, innerHTMLTextValue)
  */
  palettes = {
    'Primary': [
      ['panel900', '900'],
      ['panel800', '800'],
      ['panel700', '700'],
      ['panel600', '600'],
      ['panel500', '500'],
      ['panel400', '400'],
      ['panel300', '300'],
      ['panel200', '200'],
      ['panel100', '100'],
      ['panel50', '50'],
      ['panelA700', 'A700'],
      ['panelA400', 'A400'],
      ['panelA100', 'A100']
    ],
    'Accent': [
      ['panel900accent', '900'],
      ['panel800accent', '800'],
      ['panel700accent', '700'],
      ['panel600accent', '600'],
      ['panel500accent', '500'],
      ['panel400accent', '400'],
      ['panel300accent', '300'],
      ['panel200accent', '200'],
      ['panel100accent', '100'],
      ['panel50accent', '50'],
      ['panelA700accent', 'A700'],
      ['panelA400accent', 'A400'],
      ['panelA100accent', 'A100']
    ],
    'Warn': [
      ['panel900warn', '900'],
      ['panel800warn', '800'],
      ['panel700warn', '700'],
      ['panel600warn', '600'],
      ['panel500warn', '500'],
      ['panel400warn', '400'],
      ['panel300warn', '300'],
      ['panel200warn', '200'],
      ['panel100warn', '100'],
      ['panel50warn', '50'],
      ['panelA700warn', 'A700'],
      ['panelA400warn', 'A400'],
      ['panelA100warn', 'A100']
    ],
    'Background': [
      ['status-bar', 'status-bar'],
      ['app-bar', 'app-bar'],
      ['background', 'background'],
      ['hover', 'hover'],
      ['card', 'card'],
      ['dialog', 'dialog'],
      ['disabled-button', 'disabled-button'],
      ['warning', 'warning'],
      ['raised-button', 'raised-button'],
      ['focused-button', 'focused-button'],
      ['selected-button', 'selected-button'],
      ['selected-disabled-button', 'selected-disabled-button'],
      ['disabled-button-toggle', 'disabled-button-toggle'],
      ['unselected-chip', 'unselected-chip'],
      ['disabled-list-option', 'disabled-list-option']
    ],
    'Foreground': [
      ['base', 'base'],
      ['divider', 'divider'],
      ['dividers', 'dividers'],
      ['disabled', 'disabled'],
      ['disabled-button', 'disabled-button'],
      ['disabled-text', 'disabled-text'],
      ['hint-text', 'hint-text'],
      ['secondary-test', 'secondary-test'],
      ['icon', 'icon'],
      ['icons', 'icons'],
      ['text', 'text'],
      ['slider-min', 'slider-min'],
      ['slider-off', 'slider-off'],
      ['slider-off-active', 'slider-off-active']
    ]
  };

  /**
   * Name for the color pallete
   */
  @Input() palette = 'palette';

}

/**
* Component to display material toggle colors
*/
@Component({
  selector: 'app-material-toggle-colors',
  template: `
    <div class="title">Material Toggle</div>
    <mat-slide-toggle >Default</mat-slide-toggle> <br>
    <mat-slide-toggle color="primary">Primary</mat-slide-toggle> <br>
    <mat-slide-toggle color="accent">Accent</mat-slide-toggle> <br>
    <mat-slide-toggle color="warn">Warn</mat-slide-toggle>
  `,
  styleUrls: ['./material-sandbox.components.scss']
})
export class MaterialToggleColorsComponent {

}

/**
* Component to display colors for different sets of material buttons
*/
@Component({
  selector: 'app-material-buttons-colors',
  template: `
  <div class="title">Basic Buttons</div>
  <div class="button-row">
    <button mat-button>Basic</button>
    <button mat-button color="primary">Primary</button>
    <button mat-button color="accent">Accent</button>
    <button mat-button color="warn">Warn</button>
    <button mat-button disabled>Disabled</button>
    <a mat-button routerLink=".">Link</a>
  </div>

  <div class="title">Raised Buttons</div>
  <div class="button-row">
    <button mat-raised-button>Basic</button>
    <button mat-raised-button color="primary">Primary</button>
    <button mat-raised-button color="accent">Accent</button>
    <button mat-raised-button color="warn">Warn</button>
    <button mat-raised-button disabled>Disabled</button>
    <a mat-raised-button routerLink=".">Link</a>
  </div>

  <div class="title">Flat Buttons</div>
  <div class="button-row">
    <button mat-flat-button>Basic</button>
    <button mat-flat-button color="primary">Primary</button>
    <button mat-flat-button color="accent">Accent</button>
    <button mat-flat-button color="warn">Warn</button>
    <button mat-flat-button disabled>Disabled</button>
    <a mat-flat-button routerLink=".">Link</a>
  </div>

  <div class="title">Fab Buttons</div>
  <div class="button-row">
    <button mat-fab>Basic</button>
    <button mat-fab color="primary">Primary</button>
    <button mat-fab color="accent">Accent</button>
    <button mat-fab color="warn">Warn</button>
    <button mat-fab disabled>Disabled</button>
    <button mat-fab>
      <mat-icon aria-label="Example icon-button with a heart icon">favorite</mat-icon>
    </button>
    <a mat-fab routerLink=".">Link</a>
  </div>

  <div class="title">Mini Fab Buttons</div>
  <div class="button-row">
    <button mat-mini-fab>Basic</button>
    <button mat-mini-fab color="primary">Primary</button>
    <button mat-mini-fab color="accent">Accent</button>
    <button mat-mini-fab color="warn">Warn</button>
    <button mat-mini-fab disabled>Disabled</button>
    <button mat-mini-fab>
      <mat-icon aria-label="Example icon-button with a heart icon">favorite</mat-icon>
    </button>
    <a mat-mini-fab routerLink=".">Link</a>
  </div>

  <div class="title">Icon Buttons</div>
  <div class="button-row">
    <button mat-icon-button>
      <mat-icon aria-label="Example icon-button with a heart icon">favorite</mat-icon>
    </button>
    <button mat-icon-button color="primary">
      <mat-icon aria-label="Example icon-button with a heart icon">favorite</mat-icon>
    </button>
    <button mat-icon-button color="accent">
      <mat-icon aria-label="Example icon-button with a heart icon">favorite</mat-icon>
    </button>
    <button mat-icon-button color="warn">
      <mat-icon aria-label="Example icon-button with a heart icon">favorite</mat-icon>
    </button>
    <button mat-icon-button disabled>
      <mat-icon aria-label="Example icon-button with a heart icon">favorite</mat-icon>
    </button>
  </div>
  `,
  styleUrls: ['./material-sandbox.components.scss']
})
export class MaterialButtonsColorsComponent {

}

/**
* Component to display an example with the material card
*/
@Component({
  selector: 'app-material-sample-card',
  template: `
    <mat-card class="example-card">
      <mat-card-header class="example-card__header">
        <div mat-card-avatar class="example-card__header-image"></div>
        <mat-card-title>Shiba Inu</mat-card-title>
        <mat-card-subtitle>Dog Breed</mat-card-subtitle>
      </mat-card-header>
      <img mat-card-image src="https://material.angular.io/assets/img/examples/shiba2.jpg" alt="Photo of a Shiba Inu">
      <mat-card-content>
        <p>
          The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.
          A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally
          bred for hunting.
        </p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-button>LIKE</button>
        <button mat-button>SHARE</button>
      </mat-card-actions>
    </mat-card>
  `,
  styleUrls: ['./material-sandbox.components.scss']
})
export class MaterialCardSampleComponent {

}

/**
* Component to display ias components in different scenarios
* according to the values related to an alarm
*/
@Component({
  selector: 'app-sandbox-alarm-label',
  template: `
    <div style="padding: 20px;">
      <div class="sandbox-title"> {{componentName}} </div>
      <div style="padding: 20px;" fxLayout="row wrap" fxLayoutGap="40px">
        <div class="sandbox-alarm-container" *ngFor="let alarm of alarms">
          <div class="sandbox-alarm-values">
            {{alarm.alarmValue}}
            <br>
            {{alarm.operationalMode}}
            <br>
            {{alarm.alarmValidity}}
            <br>
            shelved?({{alarm.shelved}})
          </div>
          <div class="sandbox-component">
            <span class="sandbox-marker">+</span>
            <app-alarm-label [alarm]="alarm"></app-alarm-label>
            <span class="sandbox-marker">+</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./material-sandbox.components.scss']
})
export class SandboxAlarmLabelComponent implements OnInit {

  componentName = 'AlarmLabel';

  alarms: Alarm[] = [];

  getMockAlarm(
    value: number,
    core_id: string,
    mode: number,
    validity: number,
    ack: boolean,
    shelved: boolean
  ): Alarm {
    return Alarm.asAlarm(
      {
        'value': value,
        'core_id': core_id,
        'running_id': core_id,
        'mode': mode,
        'core_timestamp': 1267252440000,
        'state_change_timestamp': 1267252440000,
        'validity': validity,
        'description': 'my description',
        'url': 'https://www.alma.cl',
        'sound': 'sound1',
        'can_shelve': true,
        'ack': ack,
        'shelved': shelved,
        'dependencies': [],
      }
    );
  }

  /**
   * Alarms generation to check the component
   */
  generateAlarmsList() {
    for (const shelved of [false]) {
      for (const value of [0, 1, 2, 3, 4]) {
        for (const validity of [0, 1]) {
          for (const mode of [0, 1, 2, 3, 4, 5, 6, 7, 8]) {
            const alarm = this.getMockAlarm(
              value, 'test', mode, validity, false, shelved);
            this.alarms.push(alarm);
          }
        }
      }
    }
  }

  /**
   * Executed after the component is instantiated.
   */
  ngOnInit() {
    this.generateAlarmsList();
  }

}

/**
* Component to display ias components in different scenarios
* according to the values related to an alarm
*/
@Component({
  selector: 'app-sandbox-alarm',
  template: `
    <div style="padding: 20px;">
      <div class="sandbox-title">
        {{componentName}} - labelMode: {{labelMode}} - size: {{size}}
      </div>
      <div style="padding: 20px;" fxLayout="row wrap" fxLayoutGap="40px">
        <div class="sandbox-alarm-container" *ngFor="let alarm of alarms">
          <div class="sandbox-alarm-values">
            {{alarm.alarmValue}}
            <br>
            {{alarm.operationalMode}}
            <br>
            {{alarm.alarmValidity}}
            <br>
            shelved?({{alarm.shelved}})
          </div>
          <div class="sandbox-component">
            <span class="sandbox-marker">+</span>
            <app-alarm
              [alarm]="alarm"
              [images]="alarmIconsSet"
              [imagesUnreliable]="alarmIconsUnreliableSet"
              [labelMode]="labelMode"
              [size]="size"
              [labelLocation]="labelLocation"
            ></app-alarm>
            <span class="sandbox-marker">+</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./material-sandbox.components.scss']
})
export class SandboxAlarmComponent implements OnInit {

  componentName = 'Alarm';

  alarms: Alarm[] = [];

  /** Set of alarm icons */
  public alarmIconsSet: AlarmImageSet;

  /** Set of alarm unreliable icons */
  public alarmIconsUnreliableSet: AlarmImageSet;

  /** Show or hide label text */
  @Input() labelMode = 'text';

  /** Size category */
  @Input() size = 'md';

  /** Label location */
  @Input() labelLocation = 'right';

  getMockAlarm(
    value: number,
    core_id: string,
    mode: number,
    validity: number,
    ack: boolean,
    shelved: boolean
  ): Alarm {
    const alarm = Alarm.asAlarm(
      {
        'value': value,
        'core_id': core_id,
        'running_id': core_id,
        'mode': mode,
        'core_timestamp': 1267252440000,
        'state_change_timestamp': 1267252440000,
        'validity': validity,
        'description': 'my description',
        'url': 'https://www.alma.cl',
        'sound': 'sound1',
        'can_shelve': true,
        'ack': ack,
        'shelved': shelved,
        'dependencies': [],
      }
    );
    alarm.properties = {};
    return alarm;
  }

  /**
   * Executed after the component is instantiated.
   */
  ngOnInit() {
    console.log(this.labelLocation);
    this.defineAlarmsAndImages();
    this.generateAlarmsList();
  }

  /**
   * Alarms generation to check the component
   */
  generateAlarmsList() {
    for (const shelved of [false]) {
      for (const value of [0, 4]) {
        for (const validity of [1]) {
          for (const mode of [5, 7, 8]) {
            const alarm = this.getMockAlarm(
              value, 'test', mode, validity, false, shelved);
            this.alarms.push(alarm);
          }
        }
      }
    }
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
      set_high: Assets.ICONS + 'set-valid-critical.svg',
      set_critical: Assets.ICONS + 'set-valid-critical.svg',
      unknown: Assets.ICONS + 'clear-valid-unknown.svg',
      maintenance: Assets.ICONS + 'clear-valid-maintenance.svg',
      shelved: Assets.ICONS + 'clear-valid.svg',
    });

    /** Set of icons for unreliable statuses */
    this.alarmIconsUnreliableSet = new AlarmImageSet({
      clear: Assets.ICONS + 'clear-invalid.svg',
      set_low: Assets.ICONS + 'set-invalid-low.svg',
      set_medium: Assets.ICONS + 'set-invalid-low.svg',
      set_high: Assets.ICONS + 'set-invalid-critical.svg',
      set_critical: Assets.ICONS + 'set-invalid-critical.svg',
      unknown: Assets.ICONS + 'clear-invalid-unknown.svg',
      maintenance: Assets.ICONS + 'clear-invalid-maintenance.svg',
      shelved: Assets.ICONS + 'clear-valid.svg',
    });

  }

}

/**
* Component to display ias components in different scenarios
* according to the values related to an alarm
*/
@Component({
  selector: 'app-sandbox-alarm-tile',
  template: `
    <div style="padding: 20px;">
      <div class="sandbox-title"> {{componentName}} </div>
      <div style="padding: 20px;" fxLayout="row wrap" fxLayoutGap="40px">
        <div class="sandbox-alarm-container" *ngFor="let alarm of alarms">
          <div class="sandbox-alarm-values">
            {{alarm.alarmValue}}
            <br>
            {{alarm.operationalMode}}
            <br>
            {{alarm.alarmValidity}}
            <br>
            shelved?({{alarm.shelved}})
          </div>
          <div class="sandbox-component">
            <span class="sandbox-marker">+</span>
            <app-alarm-tile
              [alarm]="alarm"
              [images]="alarmIconsSet"
              [imagesUnreliable]="alarmIconsUnreliableSet"
              [size]="'lg'"
            ></app-alarm-tile>
            <span class="sandbox-marker">+</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./material-sandbox.components.scss']
})
export class SandboxAlarmTileComponent implements OnInit {

  componentName = 'Alarm Tile';

  alarms: Alarm[] = [];

  /** Set of alarm icons */
  public alarmIconsSet: AlarmImageSet;

  /** Set of alarm unreliable icons */
  public alarmIconsUnreliableSet: AlarmImageSet;


  getMockAlarm(
    value: number,
    core_id: string,
    mode: number,
    validity: number,
    ack: boolean,
    shelved: boolean
  ): Alarm {
    const alarm = Alarm.asAlarm(
      {
        'value': value,
        'core_id': core_id,
        'running_id': core_id,
        'mode': mode,
        'core_timestamp': 1267252440000,
        'state_change_timestamp': 1267252440000,
        'validity': validity,
        'description': 'my description',
        'url': 'https://www.alma.cl',
        'sound': 'sound1',
        'can_shelve': true,
        'ack': ack,
        'shelved': shelved,
        'dependencies': [],
      }
    );
    alarm.properties = {};
    return alarm;
  }

  /**
   * Executed after the component is instantiated.
   */
  ngOnInit() {
    this.defineAlarmsAndImages();
    this.generateAlarmsList();
  }

  /**
   * Alarms generation to check the component
   */
   generateAlarmsList() {
     for (const shelved of [false]) {
       for (const value of [0, 1]) {
         for (const validity of [1]) {
           for (const mode of [5, 7, 8]) {
             const alarm = this.getMockAlarm(
               value, 'test', mode, validity, false, shelved);
             this.alarms.push(alarm);
           }
         }
       }
     }
   }

  /**
  * Define the alarms that the component should listen to and their respective icons
  */
  defineAlarmsAndImages() {

    /** Set of icons for reliable statuses */
    this.alarmIconsSet = new AlarmImageSet({
      clear: Assets.ICONS + 'antenna-valid-clear.svg',
      set_low: Assets.ICONS + 'antenna-valid-low.svg',
      set_medium: Assets.ICONS + 'antenna-valid-low.svg',
      set_high: Assets.ICONS + 'antenna-valid-critical.svg',
      set_critical: Assets.ICONS + 'antenna-valid-critical.svg',
      unknown: Assets.ICONS + 'antenna-valid-unknown.svg',
      maintenance: Assets.ICONS + 'antenna-valid-maintenance.svg',
      shelved: Assets.ICONS + 'antenna-valid-clear.svg',
    });

    /** Set of icons for unreliable statuses */
    this.alarmIconsUnreliableSet = new AlarmImageSet({
      clear: Assets.ICONS + 'antenna-invalid-clear.svg',
      set_low: Assets.ICONS + 'antenna-invalid-low.svg',
      set_medium: Assets.ICONS + 'antenna-invalid-low.svg',
      set_high: Assets.ICONS + 'antenna-invalid-critical.svg',
      set_critical: Assets.ICONS + 'antenna-invalid-critical.svg',
      unknown: Assets.ICONS + 'antenna-invalid-unknown.svg',
      maintenance: Assets.ICONS + 'antenna-invalid-maintenance.svg',
      shelved: Assets.ICONS + 'antenna-valid-clear.svg',
    });

  }

}
