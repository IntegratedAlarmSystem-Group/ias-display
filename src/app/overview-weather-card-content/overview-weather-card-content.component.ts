import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-overview-weather-card-content',
  templateUrl: './overview-weather-card-content.component.html',
  styleUrls: ['./overview-weather-card-content.component.css']
})
export class OverviewWeatherCardContentComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToTableFilteredBy(filter: string) {
    // filter.replace(' ', '_'); // TODO: This is wrong, fix it
    this.router.navigate(['/tabular/' + filter]);
  }

}
