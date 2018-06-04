import { Component, OnInit } from '@angular/core';
import { RoutingService} from '../routing.service';

@Component({
  selector: 'app-overview-weather-card-content',
  templateUrl: './overview-weather-card-content.component.html',
  styleUrls: ['./overview-weather-card-content.component.css']
})
export class OverviewWeatherCardContentComponent implements OnInit {

  constructor(private routing: RoutingService) { }

  ngOnInit() {
  }

  goToTableFilteredBy(filter: string) {
    this.routing.tableWithFilter(filter);
  }

}
