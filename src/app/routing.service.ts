import { Injectable } from '@angular/core';
import { Router} from '@angular/router';

@Injectable()
export class RoutingService {

  constructor(private router: Router) { }

  tableWithFilter(filter: string) {
    filter.replace(' ', '_'); // TODO: This is wrong, fix it
    this.router.navigate(['/tabular/' + filter]);
  }

}
