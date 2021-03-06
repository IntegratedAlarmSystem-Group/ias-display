import { Component, OnInit, OnChanges, AfterViewInit, Input, ElementRef, SimpleChanges } from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { SidenavService } from '../sidenav.service';
import { Alarm } from '../../data/alarm';

/**
 * Button used to trigger the event to open the Acknowledge Modal
 */
@Component({
  selector: 'app-ack-button',
  templateUrl: './ack-button.component.html',
  styleUrls: ['./ack-button.component.css']
})
export class AckButtonComponent implements OnInit, OnChanges, AfterViewInit {

  /**
   * Alarm object associated to the button
   */
  @Input() alarm: Alarm;

  /**
  * Defines wether or not the Acknowledge can be performed
  * It is updated when there are changes in the alarm
  */
  canAcknowledge = true;

  /**
   * Builds an instance of the component
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
   * Initializes the component
   */
  ngOnInit() {
  }

  /**
  * Method to handle the changes on the inputs of the component
  * @param {SimpleChanges} changes Object containing the changes in the Inputs of the component
  */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.alarm && changes.alarm.previousValue !== changes.alarm.currentValue) {
      this.canAcknowledge = this.getCanAcknowledge();
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
   * Define if the alarm can be acknowledged based on if it was acknowledged before.
   * @return {boolean} true if the {@link Alarm} can be acknowledged, false if not.
   */
  getCanAcknowledge(): boolean {
    if (this.alarm != null && this.alarm.state_change_timestamp > 0) {
      return !this.alarm.ack;
    } else {
      return false;
    }
  }

  /**
   * Defines whether or not the button is disabled
   * @returns {boolean} true if the button is disabled, false if not.
   */
  isDisabled(): boolean {
    return !this.sidenavService.canClose || !this.canAcknowledge;
  }

  /**
  * Handle click on ack button, it triggers ack sidenav through the {@link Router} service
  */
  onClick() {
    this.sidenavService.goToAcknowledge(this.alarm.core_id);
  }

}
