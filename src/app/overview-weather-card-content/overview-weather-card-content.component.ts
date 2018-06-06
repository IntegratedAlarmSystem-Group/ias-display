import { Component, OnInit } from '@angular/core';
import { RoutingService} from '../routing.service';

/**
 * Summarized state of the weather alarm subsystem
 */
@Component({
  selector: 'app-overview-weather-card-content',
  templateUrl: './overview-weather-card-content.component.html',
  styleUrls: ['./overview-weather-card-content.component.css']
})
export class OverviewWeatherCardContentComponent implements OnInit {

  /**
   * @param {RoutingService} routing Service used to redirect to weather specialized views
   */
  constructor(private routing: RoutingService) { }

  ngOnInit() {
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
