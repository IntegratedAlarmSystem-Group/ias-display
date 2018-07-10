import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SidenavService } from '../sidenav.service';

@Component({
  selector: 'app-shelve',
  templateUrl: './shelve.component.html',
  styleUrls: ['./shelve.component.css']
})
export class ShelveComponent implements OnInit, OnDestroy {

  alarm_id: string;

  constructor(
    private route: ActivatedRoute,
    public sidenavService: SidenavService
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe( paramMap => {
      this.alarm_id = paramMap.get('alarmID');
    });
    this.sidenavService.open();
  }

  ngOnDestroy() {
    this.sidenavService.close();
  }

}
