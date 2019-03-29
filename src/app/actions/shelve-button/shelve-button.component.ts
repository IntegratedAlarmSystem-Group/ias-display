import { Component, OnInit, OnChanges, AfterViewInit, Input, ElementRef, SimpleChanges } from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { SidenavService } from '../sidenav.service';
import { Alarm } from '../../data/alarm';

/**
 * Button used to trigger the event to open the Shelve Modal
 */
@Component({
  selector: 'app-shelve-button',
  templateUrl: './shelve-button.component.html',
  styleUrls: ['./shelve-button.component.css']
})
export class ShelveButtonComponent implements OnInit, OnChanges, AfterViewInit {

  /**
   * Alarm object associated to the button
   */
  @Input() alarm: Alarm;

  /**
  * The text to display in the button tooltip
  */
  buttonTooltipText = 'Shelve';


  /**
   * Instantiates the component
   * @param {SidenavService} sidenavService service to manage the Acknowledge and Shelve sidenav
   * @param {FocusMonitor} focusMonitor system service used to monitor focus of components
   * @param {ElementRef} elementRef reference to this component in the DOM
   */
  constructor(
    public sidenavService: SidenavService,
    private focusMonitor: FocusMonitor,
    private elementRef: ElementRef
  ) { }

  /**
   * Initialize the component
   */
  ngOnInit() {
  }

  /**
  * Method to handle the changes on the inputs of the component
  * @param {SimpleChanges} changes Object containing the changes in the Inputs of the component
  */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.alarm && changes.alarm.previousValue !== changes.alarm.currentValue) {
      this.buttonTooltipText = this.getButtonTooltipText();
    }
  }

  /**
  * Method executed after the component is initialized.
  * It is used here to stop focus monitoring of the button, in order to fix some visual issues
  */
  ngAfterViewInit() {
    const buttonRef = this.elementRef.nativeElement.children[0];
    this.focusMonitor.stopMonitoring(buttonRef);
  }

  /**
   * Returns the text to display in the shelve/unshelve button tooltip, either "Shelve" or "Unshelve"
   * @returns {string} the text to display in the button
   */
  getButtonTooltipText(): string {
    if (!this.alarm) {
      return null;
    }
    if (this.alarm.shelved) {
      return 'Unshelve';
    } else {
      return 'Shelve';
    }
  }

  /**
   * Defines whether or not the button is disabled
   * @returns {boolean} true if the button is disabled, false if not.
   */
  isDisabled(): boolean {
    return !this.sidenavService.canClose;
  }

  /**
  * Handle click on shelve button, it triggers the shelve sidebar
  */
  onClick(): void {
    this.sidenavService.goToShelve(this.alarm.core_id);
  }

}
