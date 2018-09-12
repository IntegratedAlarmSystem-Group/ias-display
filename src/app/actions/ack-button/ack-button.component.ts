import { Component, OnInit, AfterViewInit, Input, ElementRef } from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { SidenavService } from '../sidenav.service';
import { Router } from '@angular/router';
import { Alarm } from '../../data/alarm';

/**
 * Button used to trigger the event to open the Acknowledge Modal
 */
@Component({
  selector: 'app-ack-button',
  templateUrl: './ack-button.component.html',
  styleUrls: ['./ack-button.component.css']
})
export class AckButtonComponent implements OnInit, AfterViewInit {

  /**
   * Alarm object associated to the button
   */
  @Input() alarm: Alarm;

  /**
   * Instantiates the component
   * @param {SidenavService} sidenavService Service to manage the Acknowledge and Shelve sidenav
   * @param {Router} router system Router to handle navigation
   * @param {FocusMonitor} focusMonitor system service used to monitor focus of components
   * @param {ElementRef} elementRef reference to this component in the DOM
   */
  constructor(
    public sidenavService: SidenavService,
    private router: Router,
    private focusMonitor: FocusMonitor,
    private elementRef: ElementRef
  ) { }

  /**
   * Initializes the component
   */
  ngOnInit() {
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
  canAcknowledge() {
    if (this.alarm != null) {
      return !this.alarm.ack;
    } else {
      return false;
    }
  }

  /**
   * Defines wether or not the button is disabled
   * @returns {boolean} true if the button is disabled, false if not.
   */
  isDisabled() {
    return !this.sidenavService.canClose || !this.canAcknowledge();
  }

  /**
  * Handle click on ack button, it triggers ack sidenav through the {@link Router} service
  * @param {MouseEvent} event Object that represent the click DOM event
  */
  onClick(event: MouseEvent) {
    this.router.navigate([{outlets: {actions: ['acknowledge', this.alarm.core_id]}}]);
  }

}
